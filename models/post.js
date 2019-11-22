const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
  poster: { type: Schema.Types.ObjectId, ref: "user" },
  title: String,
  sub: String,
  img: String,
  content: String,
  comments: Array,
  likes: Number
});

// const good = mongoose.collection('goods', goodSchema);
const post = mongoose.model("post", postsSchema);

module.exports = post;
