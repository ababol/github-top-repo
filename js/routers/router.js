/*global define*/
define([
  'jquery',
  'backbone',
  'app/common',
  'app/collections/Repo.Collection',
  'app/views/App.View'
], function ($, Backbone, Common, RepoCollection, AppView) {
  'use strict';

  var AppV = null,
    RepoC = null;

  return Backbone.Router.extend({
    routes: {
        '': 'repo',
        ':user' : 'repo',
        ':user/:repo': 'repoDetails'
    },
    repo: function () {
      if (AppV === null) {
        RepoC = new RepoCollection();
        AppV = new AppView({collection: RepoC});
      } else {
        $('#back').hide();
        $('.view').show();
        $('.repoDetails').html('');
      }
    },
    repoDetails: function (user, repo) {
      if (AppV === null) {
        var self = this;
        this.repo();
        this.listenTo(RepoC, "loadOk", function () {
          self.getDetails(user, repo);
        }, this);
      } else {
        this.getDetails(user, repo);
      }
    },
    getDetails: function(user,repo) {
      var model = RepoC.get(user+"/"+repo);
      $.getJSON(model.get('languages_url'), function(data) {
        model.set('languagesUsed', data);
        AppV.getDetails(user, repo, model);
      });
    }
  });
});
