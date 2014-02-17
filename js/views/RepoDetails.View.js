define([
  'jquery',
  'underscore',
  'backbone',
  'text!app/templates/RepoDetails.Template.html'
], function ($, _, Backbone, RepoTemplate) {
  return Backbone.View.extend({
    template: _.template(RepoTemplate),

    initialize: function() {
      var maxVal = 0,
        lUsed = this.model.get('languagesUsed');
      $.each(lUsed, function (key, value) { maxVal += parseInt(value); });
      $.each(lUsed, function (key, value) { lUsed[key] = Math.round(value*1000/maxVal)/10; });
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});