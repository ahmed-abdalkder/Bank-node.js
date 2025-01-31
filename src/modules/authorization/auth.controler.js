
 
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import Employeemodel from "../../../db/models/employee.model.js";
import Customermodel from "../../../db/models/customer.model.js";
 

export const customerlogin = async(req,res)=>{

    const{ email} = req.body 

    const customer = await Customermodel.findOne({email})
    if(!customer){
        res.status(StatusCodes.BAD_REQUEST).json("customer dose not found")

    }
       
    const token = jwt.sign({id:customer._id,role:customer.role },"destination")

      res.status(StatusCodes.OK).json({msg:"done",token})

    
};


export const employeelogin = async(req,res)=>{

    const{password,onlineID} = req.body 

    const employee = await Employeemodel.findOne({onlineID})
      if(!employee){
        res.status(StatusCodes.BAD_REQUEST).json("employee dose not found")

     }
    const passwordmatch = bcrypt.compareSync(password,employee.password)
        if(!passwordmatch){
         res.status(StatusCodes.BAD_REQUEST).json("invaled password")

    }

    const token = jwt.sign({id:employee._id,
    BranchID:employee.BranchID,role:employee.role},process.env.token_io)

      res.status(StatusCodes.OK).json({msg:"done",token})

    
};