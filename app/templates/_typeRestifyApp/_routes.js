module.exports = function(app) {
	var user = require('./controllers/userController');

	app.get('/', function(req, res, next) {
		return res.send("WELCOME TO REST API");
	});

	app.post('/createUser', user.createUser);
};
