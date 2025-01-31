
import  mongoose, { Types }  from 'mongoose';
import Accountmodel from './account.model.js';

const transactionschema = new mongoose.Schema({

    accountID:{type:Types.ObjectId,ref:"Account",required:true},

    fromToAccountID:{ type:Types.ObjectId,ref:"Account" },

    typeaction:{ type:String,enum:["credit","debit"],required:true},

    remark:String,

    amount:{type:Number,required:true}
},{
    timestamps:true,
    versionKey:false
});
 
const transactionmodel = mongoose.model("Transaction",transactionschema)

transactionmodel.createaction = async(newtransaction)=>{
    const account = await Accountmodel.findById(newtransaction.accountID)
    const fromtoaccount = await Accountmodel.findById(newtransaction.fromToAccountID)

    const transaction = new transactionmodel(newtransaction)
    if(account.balance < newtransaction.amount){
        return "insufficient balance"
    }
    if(newtransaction.typeaction === 'credit'){
      ( account.balance += newtransaction.amount)&&
       (fromtoaccount.balance -= newtransaction.amount)
    }
    if(fromtoaccount.balance < newtransaction.amount){
        return "insufficient balance"
    }
    if(newtransaction.typeaction === 'debit'){
       account.balance -= newtransaction.amount
       fromtoaccount.balance += newtransaction.amount

    }
     
   await account.save()
   await fromtoaccount.save()
    await transaction.save()
    return transaction
};

transactionmodel.getall = async()=>{

    const transaction = await transactionmodel.find()
    if(!transaction){
        return "transaction dose not found"
    }
    return transaction
};

transactionmodel.getallaccountID = async(accountID)=>{

    const transaction = await transactionmodel.findById(accountID)
    if(!transaction){
        return "transaction dose not found"
    }
    return transaction
};

transactionmodel.getallfromtoaccountID = async(fromToAccountID)=>{

    const transaction = await transactionmodel.findById(fromToAccountID)
    if(!transaction){
        return "transaction dose not found"
    }
    return transaction
};

transactionmodel.findID = async(ID)=>{

    const transaction = await transactionmodel.findById(ID)
    if(!transaction){
        return "transaction dose not found"
    }
    return transaction
};



transactionmodel.getBranchInReport = async (branchID) => {
   
    
      const transactions = await transactionmodel.aggregate([
        {
          $lookup: {
            from: 'Account',  
            localField: 'fromToAccountID',  
            foreignField: 'accountID',  
            as: 'cashAccountDetails',  
          },
        },
        {
          $unwind: '$cashAccountDetails',  
        },
        {
          $match: { 'cashAccountDetails.BranchID': branchID }, 
        },
      ]);
  
       
      if (!transactions.length) {
        return 'not_found' 
      }
  
      return   transactions 
};


export default transactionmodel