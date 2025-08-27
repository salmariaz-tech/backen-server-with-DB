import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import dotenv from "dotenv";

import Product from "./models/product.js";

const app = express();
dotenv.config();
// allow trafic from anywhere
app.use(cors());

app.use(express.json());

// connection to mongodb

const ConnectDb = async () => {
  try {

  await mongoose.connect(process.env.MONGO_URI)
 console.log("MOngo Db CONNECTED")

  } catch (error) {
console.log(error)
  }
};
ConnectDb();
let products = [
  {
    id: 1,
    name: "Beautiful HEADPHONES",
    price: 4500,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    desc: "BLACK HEADSET WITH FREQUENCY.",
  },
  {
    id: 2,
    name: "A beautiful HEADSET with white and black combo",
    price: 9300,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7DMu-7O2189abNd7fPJCirKtnE_NiO93s_g&s",
    desc: "A beautiful cord set with white and black combo comfortable in wearing and affordable sset casual for office use.",
  },
];

app.get("/products",  async(req, res) => {

 try {
  const prodcutsFormDB= await Product.find();
   res.status(201).json(prodcutsFormDB);

  
 } catch (err) {
  res.status(500).json("something went wrong");
 }
});

app.post("/products", async(req, res) => {
  const newProduct = req.body;
 console.log(newProduct);
 try {
  
  const newDBProduct= new Product({

    id:newProduct.id,
    name:newProduct.name,
    price:newProduct.price,
    imageUrl:newProduct.imageUrl,
    desc:newProduct.desc,
  });
  await newDBProduct.save();
  res.status(201).json("ok all ");
 } catch (err) {
   res.status(500).json("something went wrong");
 }

});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  console.log(id);
  console.log(updatedProduct);
  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});




app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((product) => product.id !== parseInt(id));
  res.status(204).send();
});


app.listen(5050, () => {
  console.log("Server is running on PORT 5050");
});
