var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var protractor = require('protractor');
var child_process = require('child_process');

var browserStackTunnel = new BrowserStackTunnel({
  key: process.env.BROWSERSTACK_KEY,
  hosts: [{
    name: 'localhost',
    port: 3000,
    sslFlag: 0
  }]
});
