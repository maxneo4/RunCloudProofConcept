var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/values',
	function(req, res)
	{
		res.send("Copiado");
	}
);

var server = app.listen(2000);
