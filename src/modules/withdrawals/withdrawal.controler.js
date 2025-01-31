import Withdrawalmodel from "../../../db/models/withdrawal.model.js"
import StatusCodes from 'http-status-codes';


export const createWithdrawal = async(req,res)=>{

    const{accountID,amount,remark,} = req.body

    const withdrawal = await Withdrawalmodel.addwithdrawal(
        {accountID,amount,remark}
    );

    res.status(StatusCodes.OK).json({msg:"done",withdrawal})

};

export const getAll = async(req,res)=>{
     
    const withdrawals = await Withdrawalmodel.getall()

    res.status(StatusCodes.OK).json({msg:"done",withdrawals})

};

export const findByAccount = async(req,res)=>{
    
     const{accountID} = req.body

    const withdrawals = await Withdrawalmodel.findbyaccount(accountID)

    res.status(StatusCodes.OK).json({msg:"done",withdrawals})

};