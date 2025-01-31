
import transactionmodel from "../../../db/models/transaction.model.js"
import StatusCodes from 'http-status-codes';


export const createtransaction = async(req,res)=>{

    const{accountID,fromToAccountID,typeaction,remark,amount} = req.body 

    const transaction = await transactionmodel.createaction(

        {accountID,fromToAccountID,typeaction,remark,amount}
    );

    res.status(StatusCodes.OK).json({msg:"done",transaction})

};

export const getalltrans = async(req,res)=>{

    const transaction = await transactionmodel.getall()

    res.status(StatusCodes.OK).json({msg:"done",transaction})

};

export const getAccountID = async(req,res)=>{

     const{accountID} = req.params

    const transaction = await transactionmodel.getall(accountID)
    
    res.status(StatusCodes.OK).json({msg:"done",transaction})

};

export const getFromToAccountID = async(req,res)=>{

    const{fromToAccountID} = req.params
    
   const transaction = await transactionmodel.getall(fromToAccountID)
   
   res.status(StatusCodes.OK).json({msg:"done",transaction})

};

export const getID = async(req,res)=>{

    const{id} = req.params
    
   const transaction = await transactionmodel.findID(id)
   
   res.status(StatusCodes.OK).json({msg:"done",transaction})

};

export const getBranchInReport = async (req, res) => {
    
    const {branchID} = req.body
    
    const transaction = await transactionmodel.getBranchInReport(branchID);

   res.status(StatusCodes.OK).json({msg:"done",transaction})


};