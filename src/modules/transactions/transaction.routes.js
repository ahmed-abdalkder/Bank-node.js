import { Router } from "express";
import * as TC from "./transaction.controler.js";


const router = Router()

router.post("/",TC.createtransaction)

router.get("/",TC.getalltrans)

router.get("/me/:AccountID",TC.getAccountID)

router.get("/:FromToAccountID",TC.getFromToAccountID)

router.get("/id/:id",TC.getID)

router.patch("/",TC.getBranchInReport)

export default router