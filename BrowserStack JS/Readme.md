
# E2E y  Browserstack

## Links de referencia

[Automatizacion protractor y Browserstack - pasos](http://stackoverflow.com/questions/25537919/running-protractor-tests-on-browserstack-automate)

[Ejemplo de Protractor y Browserstack usando server local](https://github.com/browserstack/protractor-browserstack)

[De donde se tomo el test basico y se encuentran otros ejemplos de uso](https://github.com/angular/protractor/blob/master/docs/tutorial.md)

[Blog donde muestran la configuracion a varios navegadores y un ejemplo de configuracion de grunt](https://groups.google.com/forum/#!topic/angular/vTDfvfLCnlg)

## Protractor configuracion

Cuando ya esta todo configurado solo usar

`npm install`

### Cuando se realiza todo desde cero

Crear y configurar archivo **package.json**

`npm init`

Instalar protactor

`npm install protractor --save-dev`

[Porque no usar karma y protractor a la vez](http://stackoverflow.com/questions/17070522/can-protractor-and-karma-be-used-together)

Instalar Browserstack Selenium web driver

`npm install browserstack-webdriver --save-dev`

### Archivo de configuracion

1. protactor.conf.js

```javascript
exports.config = {
    multiCapabilities: [
    {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_KEY,
    // Needed for testing localhost
    'browserstack.local' : 'true',
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
  'browserstack.local' : 'true',
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

```

### Configurando autenticacion a browserstack

La cual se termina colocando en el archivo **Credentials.cmd**

`SET BROWSERSTACK_USERNAME=edwinalejandrobe1`

`SET BROWSERSTACK_KEY=8TCw23SoLnrWjLdVY4PV`

### Corriendo prueba

`protractor protractor.conf.js`

#### Para ver resultados de la prueba
[Automate en browserStack](https://www.browserstack.com/automate)

## Grunt configuracion

Instalar grunt

`npm install grunt --save-dev`

Instalar grunt-cli

`npm install grunt-cli --save-dev`

Instalar grunt-bg-shell

[Documentacion bg-shell](https://www.npmjs.com/package/grunt-bg-shell)

`npm install grunt-bg-shell --save-dev`

### Archivo de configuracion

```javascript
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
              BROWSERSTACK_USERNAME : 'user',
              BROWSERSTACK_KEY  : 'key'
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

```

## Configuracion de pruebas locales

Instalar express
`npm install express --save-dev`

Instalar gruntProxie

`npm install grunt-connect-proxy --save-dev`

`npm install grunt-contrib-connect --save-dev`

[Ejemplo minimo de gruntProxie](http://stackoverflow.com/questions/25068221/minimal-example-of-using-grunt-connect-proxy/)

[Usar gruntProxy como frontEnd server](http://gregbabiars.com/using-grunt-as-your-front-end-dev-server/)

Instalar wrapper para browserStackLocal (*Este solicita permisos del firewall la primera vez que se ejecuta*)

`npm install browserstacktunnel-wrapper --save-dev`

**Para las variables de ambiente**

`npm install grunt-env --save-dev`

[Documentacion oficial](https://www.npmjs.com/package/grunt-env)

[Informacion acerca de las variables de ambiente](http://stackoverflow.com/questions/15554215/nodejs-environment-variables-in-grunt)

[En caso de requerir concurrencia en el grunt u otro caso complejo](https://www.safaribooksonline.com/blog/2013/12/17/grunt-tricks/)
