exports.config = {
  modules: [
    'babel',
    'copy',
    'server',
    'stylus',
    'jshint',
    'minify-js',
    'minify-css',
    'live-reload'
  ],

  watch: {
    sourceDir: 'src',
    compiledDir: 'lib',
    javascriptDir: null
  },

  server: {
    views: {
      compileWith: 'html',
      extension: 'html',
      path: '.'
    },

    packageJSONDir: __dirname
  },

  liveReload: {
    additionalDirs: ['lib']
  },

  babel: {
    options: {
      modules: 'system',
      stage: 1,
      optional: [
        'es7.classProperties'
      ],
      plugins: ['aurelia-babel-plugin']
    }
  }
};