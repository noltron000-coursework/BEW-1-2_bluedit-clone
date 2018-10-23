// Requirements
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

// Other Variables
const User = mongoose.model('User', UserSchema);

const UserSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
	let user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	})
});

// Export
module.exports = User;