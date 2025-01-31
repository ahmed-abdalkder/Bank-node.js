
import { Router } from "express";
import  * as OC from './onlinecustomer.controler.js';

const router = Router()

router.post("/",OC.Createonlinecustomer)
 

export default router