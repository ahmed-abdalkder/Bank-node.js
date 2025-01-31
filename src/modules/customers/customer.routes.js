import { Router } from "express";
import * as CC from './customer.controler.js';
import auth from "../../middleware/auth.js";

const router = Router()

router.post("/",CC.CreateCustomer);

router.get("/",CC.GetAll);

router.get("/ID",auth(['customer']),CC.GetFromID);

router.put("/:id",CC.UpdateCustomer);


export default router