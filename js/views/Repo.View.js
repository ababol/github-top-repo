define([
  'jquery',
  'underscore',
  'backbone',
  'text!app/templates/Repo.Template.html'
], function ($, _, Backbone, RepoTemplate) {
  return Backbone.View.extend({
    template: _.template(RepoTemplate),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});