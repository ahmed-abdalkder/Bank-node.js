import onlineloanmodel from "../../../db/models/onlineloan.model.js"
import StatusCodes from 'http-status-codes';
 


export const createdLoin = async(req,res)=>{
const{loantype,customerID,accountID,fixeddepositID,
    amount,Duration,InterestRate} = req.body

    const loan = await onlineloanmodel.createloan({
        loantype,customerID,
         accountID,fixeddepositID,
         amount,Duration,
        InterestRate
    });

  res.status(StatusCodes.OK).json({msg:"done",loan})

};

export const getaccountloaninstallment = async(req,res)=>{

  const{accountID} = req.params

  const loan = await onlineloanmodel.getInstallmentsByAccountID(accountID)

  res.status(StatusCodes.OK).json({msg:"done",loan})

};

export const getloans = async(req,res)=>{
 
  
    const loan = await onlineloanmodel.getall()
  
    res.status(StatusCodes.OK).json({msg:"done",loan})
  
  };

    export function calculateInterestRate (amount,duration){
    let interestRate = 20 ;
    if(amount > 10000){
      interestRate += 5;
    };
    if(amount > 100000){
      interestRate += 10;
    };
    if(amount > 1000000){
      interestRate += 15;
    };
    if(duration > 6){
      interestRate += 5;
    };
    if(duration > 12){
      interestRate += 10;
    };
    if(duration > 36){
      interestRate += 15;
    };
    return interestRate

  };

  export const payInstallMentloan = async(req,res)=>{

      const{id} = req.params 

    const installment = await onlineloanmodel.payInstallMent(id)

    res.status(StatusCodes.OK).json({msg:"done",installment})

  };
  
  export const  getInstallmentsByID = async(req,res)=>{

     const{id} = req.params 

    const installment = await onlineloanmodel.getfromID(id)

    res.status(StatusCodes.OK).json({msg:"done",installment})

  };