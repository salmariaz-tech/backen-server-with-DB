import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";

dotenv.config();
const app = express();

// ✅ Proper CORS Config
app.use(cors({
  origin: ["https://e-comerice-frontend.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.log("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
connectDB();

// ✅ GET Products API
app.get("/products", async (req, res) => {
  try {
    const productsFromDB = await Product.find();
    res.status(200).json(productsFromDB);
  } catch (err) {
    console.log("❌ GET /products Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ POST Product API
app.post("/products", async (req, res) => {
  try {
    const { id, name, price, imageUrl, desc } = req.body;

    const newProduct = new Product({ id, name, price, imageUrl, desc });
    await newProduct.save();

    res.status(201).json({ message: "Product Added Successfully!" });
  } catch (err) {
    console.log("❌ POST /products Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ UPDATE Product API
app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findOneAndUpdate({ id }, req.body);
    res.status(200).json({ message: "Product Updated Successfully!" });
  } catch (err) {
    console.log("❌ PUT /products Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ DELETE Product API
app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ id });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully!" });
  } catch (err) {
    console.log("❌ DELETE /products Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// ✅ Use Railway PORT
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
