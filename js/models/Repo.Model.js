define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  return Backbone.Model.extend({

    constructor: function(data, opts){
      // Id overriding
      data.id = data.full_name;
      Backbone.Model.prototype.constructor.call(this, data);
    },

    initialize: function() {
      this.set('idAttribute', this.get('full_name'));
    }
  });
});