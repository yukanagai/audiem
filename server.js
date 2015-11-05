
// Dependencies and NPM's
var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

// Configure
app.use(express.static(__dirname + '/client'));

// Config Body Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get('/', function(){
  res.sendFile(__dirname + '/client/index.html');
});

// Server
var port = process.env.PORT || '8080';
app.listen(port, function(){
  console.log('listening on ' + port + '...')
})
