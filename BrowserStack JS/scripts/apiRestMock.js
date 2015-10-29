var express = require('express');
var app = express();

app.get('/data', function (req, res) {
  res.send('Hello World!');
});

app.post('/api/values',
	function(req, res)
	{
		res.send("Copiado");
	}
);

var server = app.listen(2000);
