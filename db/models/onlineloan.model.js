
import  mongoose, { Types } from 'mongoose';
import FixedDepositmodel from './fixeddeposit.model.js';
import LoanInstallmentmodel from './installment.model.js';
 
 
 
const onlineLoanSchema = new mongoose.Schema({

    loantype:{ type:String,required:true},

    customerID:{type:Types.ObjectId, ref:"customer", required:true},

    accountID:{type:Types.ObjectId,ref:"Account",required:true },

    fixeddepositID:{type:Types.ObjectId,ref:"FixedDeposit",required:true},

    amount:{ type:Number,required:true },

    Duration:{ type:Number, required:true},

    InterestRate:{ type:Number, required:true},
},{
    timestamps:true,
    versionKey:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
onlineLoanSchema.virtual("LoanInstallment",{
    ref:"LoanInstallment",
    localField:"_id",
    foreignField:"LoanID"
   })
const  onlineloanmodel  = mongoose.model("onlineloan",onlineLoanSchema)

onlineloanmodel.createloan = async(newloan)=>{

    if(newloan.amount > 500000){
        return("Limit exceeded")
    }
    const FD = await FixedDepositmodel.findById(newloan.fixeddepositID)
    if(FD.amount * 0.6 < newloan.amount){
        return 'FD Amount is not sufficient'
    }
    const loan = new onlineloanmodel(newloan)

    await loan.save()

     return loan
};

onlineloanmodel.getInstallmentsByAccountID = async(accountID)=>{

    const loan = await onlineloanmodel.find({accountID})
    .populate({path:"LoanInstallment"});
    if(!loan){
        return "account is not a loan worker"
    }
    if (loan[0].LoanInstallment.length === 0) {
        return "Loan exists but no installments are linked.";
    }
    return loan
};

onlineloanmodel.getall = async( )=>{

     const loan = await onlineloanmodel.find().populate({path:"LoanInstallment"});
    if(!loan){
        return "loans are not  found"
    }
    return loan

};

onlineloanmodel.getfromID = async(id)=>{

     const loan = await LoanInstallmentmodel.findById(id);
    if(!loan){
        return "LoanInstallment is not  found"
    }
    return loan

};

onlineloanmodel.payInstallMent = async(id)=>{
      
  const installment =await LoanInstallmentmodel.findById(id)
  if(!installment){
    return "instament not found"
  }
  if(installment.Paid){
    return "Installment already paid"
  }
  installment.Paid=true

  if(installment.DueDate < installment.PaidDate){
        
    installment.Penalty = 100
}
await installment.save()
return installment
};

export default onlineloanmodel