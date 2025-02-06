// models/User.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
