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
    // we need 2 RepoC var because we need to be sure that one of the variable contains the fetched collection (RepoC)
    // why ? If the user want to access to the website http://localhost/github-top-repo, the website will create an instance of
    // RepoCtmp && AppV but if the user change the url to access to a specify repository like #jashkenas/backbone
    // there is a delay to fetch the collection RepoCtmp and there will be an error because RepoCtmp will not be null (so it will pass the check) and consider as a fetched RepoCollection
    // so to be sure that the collection is fetched, we use RepoC variable!

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
      RepoCtmp.fetch();
      this.listenTo(RepoCtmp, "loadOk", function () {
        RepoC = RepoCtmp;
      }, this);
    },
    repo: function (user) {
      var userChanged = this.checkUserChanged(user);

      if (AppV === null || RepoCtmp === null || userChanged) {
        this.init();
      } else {
        $('.repo').show();
        $('.repoDetails').html('');
      }
      $('#back').hide();
    },
    repoDetails: function (user, repo) {
      var userChanged = this.checkUserChanged(user);

      // Check if AppV/RepoCtmp and userChanged are init
      // (not always the case if we directly access to the #user/repo url)
      if (AppV === null || RepoCtmp === null || userChanged) {
        this.init();
        this.getDetailsWhenRepoCWillBeInit(repo);
      } else {
        if (RepoC === null)
          this.getDetailsWhenRepoCWillBeInit(repo);
        else
          this.getDetails(Config.User, repo);
      }
    },
    getDetailsWhenRepoCWillBeInit: function(repo) {
      var self = this;
      this.listenTo(RepoCtmp, "loadOk", function () {
        RepoC = RepoCtmp;
        self.getDetails(Config.User, repo);
      }, this);
    },
    getDetails: function(user,repo) {
      var model = RepoC.get(user+"/"+repo),
        maxVal = 0;
      // if languagesUsed is not initialize
      if (!model.get('languagesUsed')) {
        // Need to call another JSON if we want the languages Used in the project
        $.getJSON(model.get('languages_url'), function(data) {
          $.each(data, function (key, value) { maxVal += parseInt(value); });
          $.each(data, function (key, value) { data[key] = Math.round(value*1000/maxVal)/10; });
          model.set('languagesUsed', data);
          AppV.getDetails(user, repo, model);
        });
      } else {
        AppV.getDetails(user, repo, model);
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
    }
  });
});
