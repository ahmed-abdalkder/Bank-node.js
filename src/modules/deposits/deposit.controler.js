
import Depositmodel from './../../../db/models/deposit.model.js';
import StatusCodes from 'http-status-codes';

export const createDeposit = async(req,res)=>{
    
    const{accountID,amount,Remark}= req.body 

    const deposit = await Depositmodel.createDeposit(
        {accountID,amount,Remark

        });
         
   res.status(StatusCodes.OK).json(deposit)

};

export const getall = async(req,res)=>{

    const deposits = await Depositmodel.getAll()

    res.status(StatusCodes.OK).json(deposits)

};

export const getfromID= async(req,res)=>{
    const{id} = req.params

    const deposit = await Depositmodel.getfromId(id) 
     
    res.status(StatusCodes.OK).json(deposit)
    
};

export const getbyaccountID= async(req,res)=>{
    const{accountID} = req.params

    const deposit = await Depositmodel.getByAccountID(accountID) 
     
    res.status(StatusCodes.OK).json(deposit)
    
};