/*global define*/
define([
  'jquery',
  'backbone',
  'js/config',
  'js/collections/Repo.Collection',
  'js/views/App.View'
], function ($, Backbone, Config, RepoCollection, AppView) {
  'use strict';

  var AppV = null,
    RepoC = null,
    RepoCtmp = null;

  return Backbone.Router.extend({
    routes: {
        '': 'repo',
        ':user' : 'repo',
        ':user/' : 'repo',
        ':user/:repo': 'repoDetails',
        ':user/:repo/': 'repoDetails'
    },
    init: function() {
      RepoCtmp = new RepoCollection();
      AppV = new AppView({collection: RepoCtmp});
      this.listenTo(RepoCtmp, "loadOk", function () {
        RepoC = RepoCtmp;
      }, this);
    },
    repo: function (user) {
      var userChanged = this.checkUserChanged(user);

      if (AppV === null || RepoCtmp === null || userChanged) {
        this.init();
      } else {
        $('#back').hide();
        $('.repo').show();
        $('.repoDetails').html('');
      }
    },
    checkUserChanged: function(user) {
      if (user) {
        if (user !== Config.User) {
          RepoCtmp = null;
          RepoC = null;
          Config.User = user;
          return true;
        }
      }
      return false;
    },
    repoDetails: function (user, repo) {
      var userChanged = this.checkUserChanged(user);

      if (AppV === null || RepoCtmp === null || userChanged) {
        this.init();
        this.getDetailsWhenRepoCInit(repo);
      } else {
        if (RepoC === null)
          this.getDetailsWhenRepoCInit(repo);
        else
          this.getDetails(Config.User, repo);
      }
    },
    getDetailsWhenRepoCInit: function(repo) {
      var self = this;
      this.listenTo(RepoCtmp, "loadOk", function () {
        RepoC = RepoCtmp;
        self.getDetails(Config.User, repo);
      }, this);
    },
    getDetails: function(user,repo) {
      var model = RepoC.get(user+"/"+repo),
        maxVal = 0;
      if (!model.get('languagesUsed')) {
        $.getJSON(model.get('languages_url'), function(data) {
          $.each(data, function (key, value) { maxVal += parseInt(value); });
          $.each(data, function (key, value) { data[key] = Math.round(value*1000/maxVal)/10; });
          model.set('languagesUsed', data);
          AppV.getDetails(user, repo, model);
        });
      } else {
        AppV.getDetails(user, repo, model);
      }
    }
  });
});
