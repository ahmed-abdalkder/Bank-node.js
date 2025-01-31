
import mongoose, { Types } from 'mongoose';

 
const  LoanInstallmentSchema = new mongoose.Schema({

  InstallmentID: { type: String, required: true, unique: true },

  LoanID: { type: Types.ObjectId, ref: 'onlineloan', required: true }, 

  Amount: { type: Number, required: true },  

  DueDate: { type: String, required: true  },  

  Paid: { type: Boolean, default: false },  

  CustomerID: { type: Types.ObjectId, ref: 'customer', required: true }, 

  Penalty: { type: Number, default: 0 }, 
   
  PaidDate: { type: String },  
},{
    timestamps:true,
    versionKey:false
});

 
const  LoanInstallmentmodel = mongoose.model("LoanInstallment", LoanInstallmentSchema);

  LoanInstallmentmodel.createinstallment = async(installment)=>{

    const Installmentexist = await LoanInstallmentmodel.findOne({InstallmentID:installment.InstallmentID})
    if(Installmentexist){
      return "InstallmentID is exist"
    }
      const InstallMent = new LoanInstallmentmodel(installment)
     
     await InstallMent.save()
     

     return InstallMent
    }

    LoanInstallmentmodel.getall = async(lim)=>{

        const query = {};

        if (lim.DueDate) {
          query.DueDate = lim.DueDate;
        }
        if (typeof lim.Paid !== "undefined") {
          query.Paid = lim.Paid;
        }
        if (lim.InstallmentID) {
          query.InstallmentID = lim.InstallmentID;
        }
    
         const installments = await LoanInstallmentmodel.find(query);
    
        return installments;
    }

    LoanInstallmentmodel.getfromid = async(id)=>{

     const installments = await LoanInstallmentmodel.findById(id);
    
    if(!installments){
        return "installment dose not found"
    }
      return installments;
    }

    
export default  LoanInstallmentmodel;