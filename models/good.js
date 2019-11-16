const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goodsSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  qty: Number
});

// const good = mongoose.collection('goods', goodSchema);
const good = mongoose.model("good", goodsSchema);

module.exports = good;
