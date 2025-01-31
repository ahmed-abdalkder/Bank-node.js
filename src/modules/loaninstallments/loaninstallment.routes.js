import { Router } from "express";
import * as IC from "./loaninstallment.controler.js";

const router = Router()

router.post("/",IC.createdInstallMent)

router.get("/",IC.findAll)

router.get("/:id",IC.getFromID)


export default router