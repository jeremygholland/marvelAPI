var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var router = express.Router();
var app = express();

app.use(express.static(__dirname + '/public'));

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || port)

// router.get('/', function(req, res) {
//   res.send('Birds home page');
// });