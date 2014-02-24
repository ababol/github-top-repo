require.config({
  baseUrl: "..",
  paths: {
    app: 'js',
    underscore: 'vendor/underscore-1.5.2.min',
    backbone: 'vendor/backbone-1.1.0.min',
    jquery: 'vendor/jquery-2.0.3.min',
    text: 'vendor/require-text'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});
