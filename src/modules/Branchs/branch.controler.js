import Branchmodel from "../../../db/models/branch.model.js"
import StatusCodes from 'http-status-codes';
import cloudinary from "../../service/cloudinary.js";
import { nanoid } from "nanoid";

export const createbranch = async(req,res)=>{

    const{name,address,phone}=req.body
    const branch = await Branchmodel.findOne({name})
    if(branch){
        res.status(StatusCodes.BAD_REQUEST).json("branch alredy exist")
    }
    
    if(!req.files){
        return next(new AppError("please inter images"))
  
       }
    const customId = nanoid(5)

     let list =[]
    for (const file of req.files.coverimages) {
         const{secure_url,public_id}= await cloudinary.uploader.upload(file.path,
            {folder:`bank/branch/${customId}`})

         list.push({secure_url,public_id})
    }

    const{secure_url,public_id}= req.files.image[0]

    const newbranch =new Branchmodel ({
        name,address,phone,
        coverimages:list,
        image:{secure_url,public_id},
        customId
    });
    
   await newbranch.save()

  res.status(StatusCodes.OK).json(newbranch)

    };

    export const getallbranch = async(req,res)=>{

        const branch = await Branchmodel.find({})

       res.status(StatusCodes.OK).json(branch)

    };

    export const updatebranch = async(req,res)=>{
        const{id} = req.params

        const{ address,phone}=req.body
        
        const branch = await Branchmodel.findById(id)
        if(!branch){
            res.status(StatusCodes.BAD_REQUEST).json("branch dose not found")
        }
        const newbranch =await Branchmodel.findByIdAndUpdate( id,
           {  address,phone},{new:true
        });
        
          res.status(StatusCodes.OK).json(newbranch)
    
    };