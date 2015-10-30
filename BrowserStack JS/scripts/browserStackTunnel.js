var BrowserStackTunnel = require('browserstacktunnel-wrapper');

var browserStackTunnel = new BrowserStackTunnel({
  key: process.env.BROWSERSTACK_KEY,
  hosts: [{
    name: 'localhost',
    port: 3000,
    sslFlag: 0
  }]
});

browserStackTunnel.start(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("tunnel has started");    
    }
  });
