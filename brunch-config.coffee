exports.config =
  files:
    javascripts:
      joinTo: 'app.js'
    stylesheets:
      joinTo: 'app.css'
  plugins:
    sass:
      options:
        includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']
  npm:
    enabled: true
    globals:
      $: 'jquery'
      jQuery: 'jquery'
      bootstrap: 'bootstrap-sass'
