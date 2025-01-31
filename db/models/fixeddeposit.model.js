
import mongoose, { Types } from "mongoose";
import Accountmodel from './account.model.js';

const FixedDepositSchema = new mongoose.Schema({

    accountID:{
        type:Types.ObjectId,
        ref:"Account",
        required:true
    },
    accounttypeID:{
        type:Types.ObjectId,
        ref:"AccountType",
        required:true
    },
    DepositType:{
        type:String,
        required:true,
       enum:['F06-1300', 'F12-1450', 'F36-1500']
    },
    amount:{
        type:Number,
        required:true,
        min:1000

    }
},{
    timestamps:true,
    versionKey:false
});

const FixedDepositmodel = mongoose.model("FixedDeposit",FixedDepositSchema)

FixedDepositmodel.createDeposit = async(fd)=>{
    
    const account = await Accountmodel.findById(fd.accountID)
    
    if(account.TypeID != fd.accounttypeID){

       return ("please create saving account")
 }
const fixeddeposit = new FixedDepositmodel(fd)

await fixeddeposit.save()

return fixeddeposit

}

FixedDepositmodel.getAll = async()=>{

    const FD = await FixedDepositmodel.find({}).populate([
        {path:"accountID",select:"BranchID",populate:{path:"CustomerID",select:"name email"}}
    ]);
    return FD
}
FixedDepositmodel.getfromId = async(id)=>{

    const FD = await FixedDepositmodel.findById(id).populate([
        {path:"accountID",select:"BranchID",populate:{path:"CustomerID",select:"name email"}}
    ]);
    return FD
}

export default FixedDepositmodel