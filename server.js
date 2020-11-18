const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const path = require('path');
const datahandler = require('./modules/datahandler');
const encrypt = require('./modules/crypt');
const pg = require('pg');

server.use(bodyParser.json());

server.use(express.static('public'));

server.get("/"),(req, res) => {
    res (style);
}


server.set('port', (process.env.PORT || 8080));
server.listen(server.get('port'), function() {
    console.log('server running', server.get('port'));
}); 