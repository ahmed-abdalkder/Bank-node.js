import { Router } from "express";
import * as WC from "./withdrawal.controler.js";


const router = Router()

router.post("/",WC.createWithdrawal)

router.get("/",WC.getAll)

router.get("/account",WC.findByAccount)

export default router