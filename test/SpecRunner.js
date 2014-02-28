require.config({
  baseUrl: '..',
  paths: {
    underscore: 'bower_components/underscore/underscore',
    backbone: 'bower_components/backbone/backbone',
    jquery: 'bower_components/jquery/dist/jquery',
    text: 'bower_components/requirejs-text/text'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});
