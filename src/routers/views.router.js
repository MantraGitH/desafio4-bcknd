import { Router } from "express";
import { ProductManager } from "../managers/ProductManager.js";
import { ioServer } from "../server.js";

const router = Router();
const productManager = new ProductManager("../data/products.json");

router.get("/index", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const product = req.body;
    await productManager.addProduct(product);
    ioServer.emit("newProduct", product);
    const products = await productManager.getProducts();
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
