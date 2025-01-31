 
import FixedDepositmodel from "../../../db/models/fixeddeposit.model.js"
import StatusCodes from 'http-status-codes';
 


export const createfixedDeposit = async(req,res)=>{

    const{accounttypeID,accountID,DepositType,amount} = req.body
 
    const FD = await FixedDepositmodel.createDeposit(
        {accounttypeID,accountID,DepositType,amount}
    );
    res.status(StatusCodes.OK).json(FD)

};

export const getalldeposit = async(req,res,)=>{

    const fD = await FixedDepositmodel.getAll()

    res.status(StatusCodes.OK).json(fD)

};

export const GetFromID = async(req,res,)=>{
    const{id} = req.params
    
    const fD = await FixedDepositmodel.getfromId(id)
    
    res.status(StatusCodes.OK).json(fD)

};
