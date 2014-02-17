define([
  'jquery',
  'underscore',
  'backbone',
  'app/views/Repo.View',
  'app/views/RepoDetails.View',
  'app/views/Top.View'
], function ($, _, Backbone, RepoView, RepoDetailsView, TopView) {
  return Backbone.View.extend({
    initialize: function () {
      this.listenTo(this.collection, 'reset sort', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      var self = this;
      this.collection.fetch();
    },

    addOne: function (repo) {
      console.log("addoner");
      var view = new RepoView({model: repo});
      $("#repo-list").append(view.render().el);
    },

    getDetails: function(user, repo, repoDetails) {
      var viewDetails = new RepoDetailsView({model: repoDetails});
      var repoEl = $('#'+user+'_'+repo);
      repoEl.children('.repoDetails').append(viewDetails.render().el);
      $('.view').hide();
      repoEl.show();
      $('#back').show();
    },

    addAll: function () {
      console.log("addAll");
      this.collection.trigger('loadOk');
      var view = new TopView({model: this.collection.models[0]});
      $("#repo-list").append(view.render().el);
      this.collection.each(this.addOne);
    }
  });
});