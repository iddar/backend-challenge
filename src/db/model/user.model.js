
global.TextEncoder = require("util").TextEncoder;

global.TextDecoder = require("util").TextDecoder;

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
  registered: {
    type: Date,
    set: date => new Date(date),
    get: date => date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' }),
  },
  latitude: String,
  longitude: String,
  tags: Array,
  range: Array,
  friends: [friendSchema],
  greeting: String,
  favoriteFruit: String,
},{
  toObject: {getters: true, setters: true},
  toJSON: {getters: true, setters: true},
});


module.exports = mongoose.model("User", userSchema);
