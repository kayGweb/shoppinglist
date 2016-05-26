require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var itemRoutes = require('./routes/items');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', itemRoutes);
app.use('*', function(request, response){
    response.status(404).json({ message: 'Not Found'})
});

app.listen(process.env.PORT, process.env.IP);

exports.app = app;