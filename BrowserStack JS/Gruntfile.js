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
