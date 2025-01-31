
 
import StatusCodes from 'http-status-codes';
import AccountTypemodel from './../../../db/models/accountType.model.js';


export const createAccountType = async (req,res)=>{

    const {typeName,description,withdrawallimit,interestRate,allowedOperation,minimumBalance} = req.body

    const accountname = await AccountTypemodel.findOne({typeName})
      if(accountname){
        res.status(StatusCodes.BAD_REQUEST).json("accountType alredy exist")
     }
    const accountType = new AccountTypemodel({
        typeName,description,
        withdrawallimit,interestRate,
        allowedOperation,minimumBalance
    });

    const newaccounttype = await accountType.save()

    res.status(StatusCodes.OK).json({msg:"done",newaccounttype})

};


export const getAllAccountType = async(req,res)=>{

    const accounttype = await AccountTypemodel.find()
    if(!accounttype){
        res.status(StatusCodes.BAD_REQUEST).json("accountType dose not  found")
    }
    res.status(StatusCodes.OK).json({msg:"done",accounttype})

};

export const updateAccountType = async(req,res)=>{
    const{id} = req.params
    const {typeName,description,withdrawallimit,interestRate,allowedOperation,minimumBalance} = req.body
    
    const accounttype = await AccountTypemodel.findById(id)
      if(!accounttype){
        res.status(StatusCodes.BAD_REQUEST).json("accountType dose not  found")
      }
    const updateAccountType =await AccountTypemodel.findByIdAndUpdate(id,{
        typeName,description,
        withdrawallimit,interestRate,
        allowedOperation,minimumBalance 
    },{new:true});

  

    res.status(StatusCodes.OK).json({msg:"done",updateAccountType});

};
