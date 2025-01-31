import { Router } from "express";
import * as FC from "./FD.controler.js";
 

const router = Router()

router.post("/",FC.createfixedDeposit)

router.get("/",FC.getalldeposit)

router.get("/:id",FC.GetFromID)


export default router