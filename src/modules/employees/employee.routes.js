
import { Router } from "express";
import * as EC from "./employee.controler.js";
import auth from './../../middleware/auth.js';

const router = Router()

router.post("/",EC.CreateEmployee)

router.get("/",EC.GetAll)

router.get("/:id",auth(["employee"]),EC.getfromId)

router.put("/:id",auth(),EC.Updateemployee)

export default router