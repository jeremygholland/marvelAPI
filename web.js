var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var router = express.Router();
var app = express();

app.get('/', "index.html");

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || port)

// router.get('/', function(req, res) {
//   res.send('Birds home page');
// });