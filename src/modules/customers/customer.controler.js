
import jwt from 'jsonwebtoken'
import StatusCodes from 'http-status-codes';
import { SendEmail } from './../../service/sendemail.js';
import Customermodel from './../../../db/models/customer.model.js';

export const CreateCustomer = async(req,res)=>{

    const{name,email,phone,address,occupation,dateOfBrth} = req.body

  const customerexist = await Customermodel.findOne({phone,email})
  if(customerexist){
  res.status(StatusCodes.BAD_REQUEST).json("customer dose not found")
}
  const token = jwt.sign(email,"destination")
  const link = `http://localhost:3000/customers/verify/${token}`
  await SendEmail(email,"check link",`<a href="${link}"> click her your link </a>`)

    const customer =  await Customermodel.create({
        name,email,phone,address,occupation,dateOfBrth
    } );
   

   res.status(StatusCodes.OK).json(customer)

};

export const GetAll = async(req,res)=>{
  const {name} = req.body 
  const customer = await Customermodel.getall(name)

  res.status(StatusCodes.OK).json({msg:"done",customer})
};

export const GetFromID = async(req,res)=>{
  

  const customer = await Customermodel.getFromID({_id:req.user.id})
   
  res.status(StatusCodes.OK).json({msg:"done",customer})
};

export const UpdateCustomer = async(req,res)=>{
  const{id}=req.params 
  const{name,email,phone,address,occupation,dateOfBrth,role}= req.body 
  
  const customer = await Customermodel.Update(
    id,{name,email,phone,
    address,occupation,dateOfBrth,role},
     
  )
  res.status(StatusCodes.OK).json( {msg:"done",customer})

};