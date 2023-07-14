import utils from "../../utils.js"
import ProductManager from "./ProductManager.js";

const miProducto = new ProductManager.ProductManager("./productos.json")
export class CartManager {
    carts;
    constructor(path) {
        this.path = path;
        this.carts = [];
    }

    async addCart(cart) {
        const products = []
        this.carts = await this.getCarts();
        /* 
        const validarCode = this.products.some((e) => e.code === productoBody.code)
        if (validarCode) {
            let error = new Error(`Ya existe el producto con el ID: ${productoBody.code}`);
            error.statusCode = 400
            throw error;
        }        
        */
        this.carts.push({ id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1, products })
        await utils.write(this.path, this.carts);
    };

    async getCarts() {
        try {
            let data = await utils.read(this.path)
            return data
        }
        catch (error) {
            return console.log(error);
        }
    }

    async getCartsById(id) {
        this.carts = await this.getCarts();
        const cartFilter = this.carts.find((c) => c.id == id)
        if (cartFilter == undefined) {
            let error = new Error(`No existe el carrito con el ID: ${id}`)
            error.statusCode = 400
            throw error;
        }

        return cartFilter

    }

    async addProductToCart(cid,pid) {
        this.carts = await this.getCarts()
        let carrito = this.carts.find((e)=>e.id===cid)
        let productos = await miProducto.getProducts()
        let productoAgregar = productos.find((producto) => producto.id === pid)
        
        if (carrito === undefined) {
            let error = new Error(`No existe el carrito con el ID: ${cid}`)
            error.statusCode = 400
            throw error;
        }
        
        if (productoAgregar === undefined) {
            let error = new Error(`No existe el producto con el ID: ${pid}`)
            error.statusCode = 400
            throw error;
        }
        
        
        const verificarCantidad = carrito.products.some((e)=> e.id === productoAgregar.id )
        const productIndex = carrito.products.findIndex((e)=> e.id === productoAgregar.id )

        if (verificarCantidad){
            carrito.products[productIndex].quantity++;
            
        } else {
            carrito.products.push({id: productoAgregar.id, quantity: 1})
        }

        await utils.write(this.path, this.carts);
        /*
        this.carts.push({...carrito, products : [{id: productoAgregar.id, title: productoAgregar.title}]})
        */

    }


}

export default {
    CartManager
}