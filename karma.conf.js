module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    /**
     * Frameworks are loaded in reverse order.
     *
     * 1. Used to test DOM element. ie. expect($('#foo')).to.have.attr('foo')
     * 2. Stubs, Spys and Mocks.
     * 3. Load HTML into tests.
     **/
    frameworks: [
      'chai-jquery', /* 1 */
      'jquery-1.8.3', /* 1 */
      'chai',
      'mocha',
      'chai-sinon', /* 2 */
      'sinon', /* 2 */
      'fixture' /* 3 */
    ],
    files: [
      'bower_components/zepto/zepto.min.js',
      'bower_components/lodash/lodash.min.js',
      'bower_components/parse-js-sdk/lib/parse.min.js',
      'lib/meetup-friends.js',
      'test/helpers.js',
      'test/fixtures/index.html',
      'test/*_test.js'
    ],
    /**
     * 1. HTML files must be converted to js strings
     **/
    preprocessors: {
      'test/fixtures/index.html': 'html2js' /* 1 */
    },

    // list of files to exclude
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: false
  });
};
