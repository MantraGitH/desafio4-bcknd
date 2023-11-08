import express from "express";
import { __dirname } from "./utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productRouter from "./routers/productRouter.js";
import cartRouter from "./routers/CartRouter.js";
import viewRouter from "./routers/views.router.js";
import { ProductManager } from "./managers/ProductManager.js";
const productManager = new ProductManager(__dirname + "./data/products.json");

const server = express();
// const PORT = 8080;

server.use(express.static("data"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(express.static(__dirname + "/public"));
server.engine("handlebars", handlebars.engine());

server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");

server.use("/api/products", productRouter);
server.use("/api/carts", cartRouter);

server.use("/", viewRouter);

const PORT = 8080;
const httpServer = server.listen(PORT, () =>
  console.log(`🚀 Server ok en el puerto ${PORT}`)
);

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("🟢 ¡New Connection", socket.id);
  socketServer.emit("products", await productManager.getProducts());
});
