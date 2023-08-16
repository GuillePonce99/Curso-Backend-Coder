import { Router } from "express";
import { home, realtimeproducts, realtimeproductsDB, chat, multer, products, carts } from "../controllers/views.controller.js";

const router = Router()

router.get("/home", home)

router.get("/realtimeproducts", realtimeproducts)

router.get("/realtimeproductsdb", realtimeproductsDB)

router.get("/chat", chat)

router.get("/multer", multer)

router.get("/products", products)

router.get("/carts/:cid", carts)

export default router