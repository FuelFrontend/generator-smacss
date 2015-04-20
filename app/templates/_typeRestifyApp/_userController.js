//This Controller deals with all functionalities of User

function userController () {
	var User = require('../models/userSchema');
	
	// Creating New User
	this.createUser = function (req, res, next) {
		var name = req.params.name;
		var email = req.params.email;
		var age = req.params.age;
		var city = req.params.city;
		
		User.create({name:name,email:email,age:age,city:city}, function(err, result) {
			if (err) {
				console.log(err);
				return res.send({'error':err});	
			}
			else {
				return res.send({'result':result,'status':'successfully saved'});
			}
		});
	};
return this;

};

module.exports = new userController();