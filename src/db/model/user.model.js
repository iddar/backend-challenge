const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
  first: String,
  last: String,
});

const friendSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const userSchema = new mongoose.Schema({
  _id: String,
  index: Number,
  guid: String,
  isActive: Boolean,
  balance: String,
  picture: String,
  age: Number,
  eyeColor: String,
  name: [nameSchema],
  company: String,
  email: String,
  phone: String,
  address: String,
  about: String,
  registered: String,
  latitude: String,
  longitude: String,
  tags: Array,
  range: Array,
  friends: [friendSchema],
  greeting: String,
  favoriteFruit: String,
});

module.exports = mongoose.model("User", userSchema);
