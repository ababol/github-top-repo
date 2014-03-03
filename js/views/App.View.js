define([
  'jquery',
  'backbone',
  'js/views/Repo.View',
  'js/views/RepoDetails.View',
  'js/views/Top.View',
  'js/util'
], function ($, Backbone, RepoView, RepoDetailsView, TopView, Util) {
  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.listenTo(this.collection, 'reset sort', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
    },

    addOne: function (repo, repoEl) {
      var view = new RepoView({model: repo});
      repoEl.append(view.render().el);
    },

    getDetails: function(user, repo, repoDetails) {
      var viewDetails = new RepoDetailsView({model: repoDetails}),
        repoEl = $('#'+user+'_'+repo);

      repoEl.children('.repoDetails.info').append(viewDetails.render().el);
      repoEl.children('.repoDetails.date').html("• Last updated "+Util.convertDate(repoDetails.get('updated_at')));
      $('.repo').hide();
      repoEl.parent().show();
      $('#back').show();
    },

    addAll: function () {
      this.collection.trigger('loadOk');

      var self = this,
        view = new TopView({model: this.collection.models[0]}),
        repoEl = $("#repo-list");

      $("#top").find(".content").html(view.render().el);
      repoEl.html('');
      this.collection.each(function(repo) {
        self.addOne(repo, repoEl);
      });
    }
  });
});