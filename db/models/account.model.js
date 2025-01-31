 
import mongoose, { Types } from "mongoose";


const AccountSchema = new mongoose.Schema({

    CustomerID:{
        type: Types.ObjectId,
        ref: "customer",
        required: true,
    },
    TypeID: {
        type: Types.ObjectId,
        ref: "AccountType",
        required: true,
    },
    BranchID: {
        type: Types.ObjectId,
        ref: "Branch",
        required: true,
    },
     
    balance: {
        type: Number,
        required: true,
        default: 0
    },
     
    WCount: {
        type: Number,
        required: true,
        default: 0
    }
},{
    timestamps: true,
    versionKey: false
})
AccountSchema.pre('save', async function (next) {
    if (this.isNew) {
      const accountType = await mongoose.model('AccountType').findById(this.TypeID);
      this.WCount = accountType ? accountType.withdrawallimit: 0;
    }
    next();
  });
const Accountmodel = mongoose.model("Account",AccountSchema)

Accountmodel.getAll = async(customerId)=>{

    const account = await Accountmodel.findById(customerId)
    if(!account){
        return("account dose not found")
    }
    if(account.length === 0){
        return("The account is empty")
    }
    return account
}

Accountmodel.getfromId = async(id)=>{

    const account = await Accountmodel.findById(id).populate([
        { path: "TypeID" },
        { path: "CustomerID" },
        { path: "BranchID" ,select: "name address phone -_id" },
      ]);
    if(!account){
        return("account dose not found")
    }
     
    return account
}

Accountmodel.createaccount = async(customerId,newaccount)=>{

    const accountexist = await Accountmodel.findOne({customerId})
    if(accountexist){
        return("account alredy exist")
    }
    const account = await Accountmodel.create(newaccount)
    return account
}


Accountmodel.updateaccount = async(id,amount)=>{

    const account = await Accountmodel.findByIdAndUpdate(
        id,{$inc: {balance:amount}},{new: true
     });
    if(!account){
        return("account dose not found")  
    }
        return account
}



export default Accountmodel