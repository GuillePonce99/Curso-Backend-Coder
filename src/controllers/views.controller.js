import { ProductManager } from "../dao/fileSystem/ProductManager.js"
import { productsController } from "./product.controller.js"
import { cartsController } from "./carts.controller.js"


const miProducto = new ProductManager("productos.json")


export class viewsController {

    static home = async (req, res) => {
        const productos = await miProducto.getProducts()
        res.render("home", { productos, style: "styles.css", title: "PRODUCTOS" })
    }

    static realtimeproducts = async (req, res) => {
        res.render("realTimeProducts", { style: "styles.css", title: "PRODUCTOS-REAL-TIME" })
    }

    static chat = async (req, res) => {
        res.render("chat", { style: "chat.css", title: "CHAT" })
    }

    static multer = (req, res) => {
        res.render("multer", { style: "styles.css" })
    }

    static realtimeproductsDB = async (req, res) => {
        res.render("realTimeProductsDB", { style: "styles.css", title: "PRODUCTOS-REAL-TIME-DB" })
    }

    static products = async (req, res) => {
        const data = await productsController.getProductsView(req, res)

        res.render("products", { style: "styles.css", title: "PRODUCTOS", data })
    }

    static carts = async (req, res) => {
        const data = await cartsController.getCartByIdView(req, res)

        res.render("carts", { style: "styles.css", title: "CARRITO", data })
    }
}



