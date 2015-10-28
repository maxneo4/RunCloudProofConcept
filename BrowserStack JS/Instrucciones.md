
# E2E y  Browserstack

## Links de referencia

[Automatizacion protractor y Browserstack - pasos](http://stackoverflow.com/questions/25537919/running-protractor-tests-on-browserstack-automate)

[Ejemplo de Protractor y Browserstack usando server local](https://github.com/browserstack/protractor-browserstack)

[De donde se tomo el test basico y se encuentran otros ejemplos de uso](https://github.com/angular/protractor/blob/master/docs/tutorial.md)

[Blog donde muestran la configuracion a varios navegadores y un ejemplo de configuracion de grunt](https://groups.google.com/forum/#!topic/angular/vTDfvfLCnlg)

## Protractor configuracion

Cuando ya esta todo configurado solo usar

`npm install`

Si no esta creado el archivo package.json

`npm init`

Instalar protactor

`npm install protractor --save-dev`

[Porque no usar karma y protractor a la vez](http://stackoverflow.com/questions/17070522/can-protractor-and-karma-be-used-together)

Instalar Browserstack Selenium web driver

`npm install browserstack-webdriver --save-dev`

### Archivo de configuracion

1. protactor.conf.js

```
exports.config = {
  capabilities: {
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

   framework: 'jasmine2',
  // Browserstack's selenium server address
  seleniumAddress: 'http://hub.browserstack.com/wd/hub',

  // Pattern for finding test spec files
  specs: ['test/**/*.spec.js']
}
```

### Configurando autenticacion a browserstack

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

```
module.exports = function(grunt) {

  grunt.initConfig({
    bgShell: {
                runProtractor: {
                    cmd: 'protractor protractor.conf.js',
                    bg: false
                },
                setCredentials: {
                    cmd: 'Credentials.cmd"',
                    bg: false
                }
            }
  });

  grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('e2e', ['bgShell:setCredentials', 'bgShell:runProtractor']);

};
```
