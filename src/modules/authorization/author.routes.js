
import { Router } from "express";
import * as AC from "./auth.controler.js";
 


const router = Router()

router.post("/customer",AC.customerlogin);

router.post("/employee",AC.employeelogin);
 


export default router