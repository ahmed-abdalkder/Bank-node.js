
import { Router } from "express";
import  * as AC from "./account.controler.js";

const router = Router()

router.post("/",AC.createaccount);

router.get("/:id",AC.getaccount);

export default router