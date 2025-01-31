
import Accountmodel from './../../../db/models/account.model.js';
import StatusCodes from 'http-status-codes';

export const createaccount = async(req,res)=>{

    const{CustomerID,TypeID,BranchID,balance}=req.body

    const account = await Accountmodel.createaccount(CustomerID,{
        CustomerID,TypeID,BranchID,balance
    });
  res.status(StatusCodes.OK).json({msg:"done",account})

};

export const getaccount = async(req,res)=>{
    const{id}= req.params 

    const account = await Accountmodel.getfromId(id)
    
   res.status(StatusCodes.OK).json({msg:"done",account})

};
 