var restify = require('restify');
var config = require('./config');
var app = restify.createServer({name:'<%= site_name %>'});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());

app.listen(config.port, function() {
	console.log('server listening on port number', config.port);
});
var routes = require('./routes')(app);