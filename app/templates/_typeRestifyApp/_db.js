var mongoose = require('mongoose');
var config = require('./config');

console.log('config data',config);

mongoose.connect(config.dbPath);
var db = mongoose.connection;

db.on('error', function () {
	console.log('error occured from db');
});

db.once('open', function dbOpen() {
	console.log('successfully opened the db');
});

exports.mongoose = mongoose;