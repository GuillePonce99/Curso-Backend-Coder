import express from "express"
import routerProducts from "./router/products.router.js"
import routerCarts from "./router/carts.router.js"
import routerFiles from "./router/files.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
import routerViews from "./router/views.router.js"
import { Server } from "socket.io"

const messages = []
const app = express()
const port = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)
app.use(express.static("public"))

// MULTER
app.use("/api/files",routerFiles)

//HANDLEBARS

app.engine("handlebars", handlebars.engine())

app.set("views", __dirname +"/views" )

app.set("view engine", "handlebars")

app.use("/views", routerViews)

//app.use("/",routerViews)

//Socket.io

/*
const httpServer = app.listen(port, () => {
    console.log("SERVIDOR FUNCIONANDO EN PUERTO "+ port);
});

const socketServer = new Server(httpServer);
socketServer.on("connection",socket => {
    console.log("nueva conexion");
    socket.on("nuevo_usuario", data=>{
        socket.id = data.id
        socket.user = data.user
        socketServer.emit("nuevo_usuario_conectado", {
            user: socket.user,
            id: socket.id
        });
        socket.on("messages", (data)=>{
            messages.push(data)
            socketServer.emit("messageLogs",messages)
        })
    })
    socket.emit("todos","DESDE EL SERVIDOR")
})
*/ 

app.listen(port, () => {
    console.log("SERVIDOR FUNCIONANDO EN PUERTO "+ port);
});
