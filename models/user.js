const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: String,
  posts: Array,
  subs: Array
});

const user = mongoose.model("user", userSchema);

module.exports = user;
