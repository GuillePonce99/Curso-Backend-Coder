import express from "express"
import routerProducts from "./router/products.router.js"
import routerCarts from "./router/carts.router.js"
import routerFiles from "./router/files.router.js"
import routerViews from "./router/views.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import socket from "./socket.js"
import { Server } from "socket.io"

dotenv.config()
const app = express()
const port = process.env.PORT

//CONEXION A BASE DE DATOS

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DB = process.env.MONGO_DB

const environment = async () => {
    await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@coder.amwd2xp.mongodb.net/${MONGO_DB}`)
        .then(() => {
            console.log("DB IS CONNECTED");
        })
        .catch((error) => {
            console.log(error);
            process.exit()
        })
}
environment()

//CONFIG

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

//HANDLEBARS

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

//ENDPOINTS

app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use("/", routerViews)
// MULTER
app.use("/api/files", routerFiles)

//SOCKET IO

const httpServer = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
})

const io = new Server(httpServer)
socket(io)