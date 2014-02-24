define([
  'backbone',
  'js/models/Repo.Model',
  'js/config'
], function (Backbone, RepoModel, Config) {
  'use strict';

  return Backbone.Collection.extend({
    model: RepoModel,

    initialize: function(){
      this.on('add', function(repo){
        this.restrictCollectionSize(repo);
      })
    },
    restrictCollectionSize: function(repo){
      if(this.length > Config.Top){
        this.pop(repo);
      }
    },

    url: function () {
      return "https://api.github.com/users/"+Config.User+"/repos";
    },

    comparator: function (repo) {
      var watchers_stars_sum = repo.get('watchers_count')+repo.get('stargazers_count');
      return -watchers_stars_sum;
    }
  });
});