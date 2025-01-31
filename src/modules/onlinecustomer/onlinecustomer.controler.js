
 
import StatusCodes from 'http-status-codes';
import onlinecustomermodel from "../../../db/models/onlinecustomer.model.js";
 

export const Createonlinecustomer = async(req,res)=>{

    const{customerID,username,password } = req.body 

    const customer = await onlinecustomermodel.createonline(

     {customerID,username,password }
    );
    res.status(StatusCodes.OK).json({msg:"created",customer})

};

export const deleteonlinecustomer = async(req,res)=>{

     const{id} = req.prames
     
    const customer = await onlinecustomermodel.deletecustomer(id);

    res.status(StatusCodes.OK).json({msg:"done",customer})

};

export const getfromId = async(req,res)=>{
    
    const{id }=req.params 

    const customer = await onlinecustomermodel.findID(id);

    res.status(StatusCodes.OK).json({msg:"done",customer})

};