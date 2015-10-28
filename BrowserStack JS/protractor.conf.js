exports.config = {
    multiCapabilities: [
    {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
   'browserstack.key': process.env.BROWSERSTACK_KEY,
    // Needed for testing localhost
    'browserstack.local' : 'false',
    // Settings for the browser you want to test
    // (check docs for difference between `browser` and `browserName`
    'browserName' : 'Chrome',
    'browser' : 'Chrome',
    'browser_version' : '36.0',
    'os' : 'OS X',
    'os_version' : 'Mavericks',
    'resolution' : '1024x768'
  },
  {
  'browserstack.user': process.env.BROWSERSTACK_USERNAME,
  'browserstack.key': process.env.BROWSERSTACK_KEY,
  // Needed for testing localhost
  'browserstack.local' : 'false',
  // Settings for the browser you want to test
  // (check docs for difference between `browser` and `browserName`
  'browser' : 'IE',
  'browserName': 'IE',
  'browser_version': '11.0',
  'os': 'Windows',
  'resolution' : '1024x768'
}
],

   framework: 'jasmine2',
  // Browserstack's selenium server address
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',

  // Pattern for finding test spec files
  specs: ['test/**/*.spec.js']
}
