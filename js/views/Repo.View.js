define([
  'jquery',
  'underscore',
  'backbone',
  'text!js/templates/Repo.Template.html'
], function ($, _, Backbone, RepoTemplate) {
  'use strict';

  return Backbone.View.extend({
    tagName: 'li',
    className: 'repo',
    template: _.template(RepoTemplate),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});