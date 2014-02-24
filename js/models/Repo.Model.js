define([
  'backbone'
], function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    defaults: function () {
      return {
        name: "",
        full_name: "",
        owner: {
          login: ""
        },
        stargazers_count: 0,
        watchers_count: 0,
        forks_count: 0,
        description: "",
        languagesUsed: null
      };
    },

    constructor: function(data){
      // Id overriding
      data.id = data.full_name;
      Backbone.Model.prototype.constructor.call(this, data);
    },

    initialize: function() {
      this.set('idAttribute', this.get('full_name'));
    }
  });
});