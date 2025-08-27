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

app.put("/products/:id", async(req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
   try {
    
    await Product.findOneAndUpdate({id:id},{...updatedProduct});
    res.json("succesfully updated")
   } catch (error) {
    
    res.status(500).json("something went wrong")
   }

});


app.delete("/products/:id",  async (req, res) => {
  const { id } = req.params;
  try {
     const deleteProduct=await Product.findOneAndDelete({id:id});
     if(deleteProduct){
      return res.status(200).json("succesfully delted");
     }
     else{
      return  res.status(400).json("product not found");
     }
  } catch (error) {
     res.status(500).json("something went wrong");
  }
 
 
});

app.listen(5050, () => {
  console.log("Server is running on PORT 5050");
});

