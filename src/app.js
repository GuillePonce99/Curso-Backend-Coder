import express from "express"
import routerProducts from "./router/products.router.js"
import routerCarts from "./router/carts.router.js"

const app = express()
const port = 8080
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use(express.static("public"))

app.listen(port, () => {
    console.log("SERVIDOR FUNCIONANDO EN PUERTO "+ port);
});