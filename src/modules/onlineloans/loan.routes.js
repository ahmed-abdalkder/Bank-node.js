import { Router } from "express";
import * as LC from "./loan.controler.js";

const router = Router()

router.post("/",LC.createdLoin)

router.get("/accountID",LC.getaccountloaninstallment)

router.get("/all",LC.getloans)

router.get("/:id",LC.getInstallmentsByID)

router.put("/:id",LC.payInstallMentloan)

export default router