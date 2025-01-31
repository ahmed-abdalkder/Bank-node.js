
import { Router } from "express";
import  * as OC from './online.controler.js';
import auth from "../../middleware/auth.js";

const router = Router()
router.post("/",OC.CreateonlineEmployee)

router.put("/:id",OC.UpdateOnlineEmployee)

router.get("/",auth(["employee"]),OC.getfromId)
 

export default router