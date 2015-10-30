module.exports = function(grunt) {
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  grunt.initConfig({
    bgShell: {
                runProtractor: {
                    cmd: 'protractor protractor.conf.js',
                    bg: false
                },
                setCredentials: {
                    cmd: 'Credentials.cmd"',
                    bg: false
                },
                runLocalServer: {
                    cmd: 'node ./scripts/server.js',
                    bg: true
                },
                runApiRestMock: {
                    cmd:'node ./scripts/apiRestMock.js',
                    bg: true
                },
                runBrowserStackTunnel: {
                    cmd:'node ./scripts/browserStackTunnel.js',
                    bg: true
                }
            },
    connect: {
              server: {
                  options: {
                      hostname: 'localhost',
                      keepalive: true,
                      port: 8000,
                      open: false,
                      middleware: function (connect, options) {
                          return [proxySnippet];
                      }
                  },
                  proxies: [{
                      context: '/',
                      host: 'localhost',
                      port: 2000
                  }]
              }
          }  }
);

  grunt.loadNpmTasks('grunt-bg-shell');

  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('pree2e', ['bgShell:runLocalServer', 'bgShell:runApiRestMock', 'configureProxies:server',  'connect:server' ]);

  grunt.registerTask('e2e', ['bgShell:setCredentials', 'bgShell:runProtractor' ]);

};
