import { Router } from "express";
import * as DC from "./deposit.controler.js";

const router = Router()

router.post("/",DC.createDeposit);

router.get("/",DC.getall);

router.get("/:id",DC.getfromID);

router.get("/account/:accountID",DC.getbyaccountID);

export default router