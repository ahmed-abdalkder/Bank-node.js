import Router from "express";
import  * as AC from "./accounttype.controler.js";
 

const router = Router();

router.post("/",AC.createAccountType);

router.get("/",AC.getAllAccountType);

router.put("/:id",AC.updateAccountType);

export default router