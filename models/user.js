const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
  subs: Array
});

const user = mongoose.model("user", userSchema);

module.exports = user;
