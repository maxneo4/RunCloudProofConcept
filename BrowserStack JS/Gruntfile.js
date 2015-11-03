module.exports = function(grunt) {
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
  grunt.initConfig({
    bgShell: {
                runProtractor: {
                    cmd: 'protractor protractor.conf.js',
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
                },
                sleep5: {
                cmd: 'node -e "setTimeout(new Function(), 5000)"',
                bg: false
                }
            },
    connect: {
              server: {
                  options: {
                      hostname: 'localhost',
                      keepalive: false,
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
          },
          env : {
            options : {
              //Shared Options Hash
            },
            dev : {
              BROWSERSTACK_USERNAME : 'edwinalejandrobe1',
              BROWSERSTACK_KEY  : '8TCw23SoLnrWjLdVY4PV'
            }
          }
        }
);

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('e2e', ['configureProxies:server',  'connect:server', 'bgShell:runLocalServer', 'bgShell:runApiRestMock', 'env', 'bgShell:runBrowserStackTunnel', 'bgShell:sleep5', 'bgShell:runProtractor' ]);

};
