import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  imgeUrl: {
    type: String,
  },
  desc: {
    type: String,
  },
});
const Product = mongoose.model("prodcuts", ProductSchema);

export default Product;
