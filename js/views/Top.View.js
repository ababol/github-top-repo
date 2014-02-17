define([
  'jquery',
  'underscore',
  'backbone',
  'text!app/templates/Top.Template.html'
], function ($, _, Backbone, TopTemplate) {
  return Backbone.View.extend({
    template: _.template(TopTemplate),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});