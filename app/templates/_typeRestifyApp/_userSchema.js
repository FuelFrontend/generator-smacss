// Model for the Student
module.exports = (function userSchema () {

	var mongoose = require('../db').mongoose;

	var schema = {
		name: {type: String, required: true},
		email: {type: String, required: true},
		age: {type: String, required: true},
		city: {type: String, required: true}
	};
	var collectionName = 'user';
	var userSchema = mongoose.Schema(schema);
	var User = mongoose.model(collectionName, userSchema);

	return User;
})();