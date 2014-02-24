define([
  'jquery',
  'underscore',
  'backbone',
  'text!js/templates/Top.Template.html'
], function ($, _, Backbone, TopTemplate) {
  'use strict';

  return Backbone.View.extend({
    template: _.template(TopTemplate),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});