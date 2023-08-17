import { Router } from "express";
import { viewsController } from "../controllers/views.controller.js";

const router = Router()

router.get("/home", viewsController.home)

router.get("/realtimeproducts", viewsController.realtimeproducts)

router.get("/realtimeproductsdb", viewsController.realtimeproductsDB)

router.get("/chat", viewsController.chat)

router.get("/multer", viewsController.multer)

router.get("/products", viewsController.products)

router.get("/carts/:cid", viewsController.carts)

export default router