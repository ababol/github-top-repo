define([
  'jquery',
  'underscore',
  'backbone',
  'text!js/templates/RepoDetails.Template.html'
], function ($, _, Backbone, RepoTemplate) {
  'use strict';

  return Backbone.View.extend({
    template: _.template(RepoTemplate),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});