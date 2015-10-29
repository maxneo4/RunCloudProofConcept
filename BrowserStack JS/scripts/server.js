var express = require('express');

var localServer = express();
localServer.use(express.static(__dirname + '/../public'));

localServer.listen(3000);
