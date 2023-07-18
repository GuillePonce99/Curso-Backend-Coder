import { Router } from "express";
import food from "../dato.js"

const router = Router()

router.get("/users", (req,res)=>{
    let testUser = {
        nombre:"Guillermo",
        apellido:"Ponce de leon",
        role:"admin",
    }

    res.render("users", {user : testUser, food , isAdmin: testUser.role === "admin",styles: "styles.css"})
})

router.get("/multer", (req,res)=>{
    let testUser = {
        nombre:"Guillermo",
        apellido:"Ponce de leon",
        role:"admin",
    }

    res.render("multer", {user : testUser, food , isAdmin: testUser.role === "admin",styles: "styles.css"})
})


export default router