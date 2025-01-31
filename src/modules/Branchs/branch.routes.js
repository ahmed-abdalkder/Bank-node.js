import { Router } from "express";
import  * as BC from "./branch.controler.js";
import { hostmulter, localmulter, validextintion } from "../../service/multer.js";


const router = Router()

router.post("/",hostmulter(validextintion.image).fields([
    {name:"coverimages",MaxCount:3},{name:"image",MaxCount:1}
]),BC.createbranch);

router.get("/",BC.getallbranch);

router.put("/:id",BC.updatebranch);


export default router