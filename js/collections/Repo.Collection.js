define([
  'jquery',
  'underscore',
  'backbone',
  'app/models/Repo.Model',
  'app/common'
], function ($, _, Backbone, RepoModel, Common) {
  return Backbone.Collection.extend({
    model: RepoModel,

    initialize: function(){
      this.on('add', function(repo){
        this.restrictCollectionSize(repo);
      })
    },
    restrictCollectionSize: function(repo){
      if( this.length > 20 ){
        this.pop(repo);
      }
    },

    url: function () {
      return "https://api.github.com/users/"+Common.User+"/repos";
    },

    comparator: function (repo) {
      var watchers_stars_sum = repo.get('watchers_count')+repo.get('stargazers_count')
      return -watchers_stars_sum;
    }
  });
});