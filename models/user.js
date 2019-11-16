const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: String,
  shopping_cart: Array
});

// const good = mongoose.collection('goods', goodSchema);
const user = mongoose.model("user", userSchema);

module.exports = user;
