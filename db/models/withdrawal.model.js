
import  mongoose, { Types }  from 'mongoose';
import Accountmodel from './account.model.js';

const withdrawalSchema = new mongoose.Schema({

    accountID:{
        type:Types.ObjectId,
        ref:"Account",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    remark:{
        type:String,
        default:"",
    },
},{
    timestamps:true,
    versionKey:false
});
const Withdrawalmodel = mongoose.model("WithDrawal",withdrawalSchema)

Withdrawalmodel.addwithdrawal = async(newwithdrawal)=>{

const account = await Accountmodel.findOne({_id:newwithdrawal.accountID})

if(account.balance < newwithdrawal.amount){
    return "Insufficient balance"
}
    const withdrawal =new Withdrawalmodel(newwithdrawal)

    await withdrawal.save()
    return withdrawal
    
};

Withdrawalmodel.getall = async()=>{

    const withdrawals = await Withdrawalmodel.find()
    if(!withdrawals){
        return "withdrawal dose not found"
    }
    return withdrawals
};

Withdrawalmodel.findbyaccount = async(accountID)=>{

    const withdrawals = await Withdrawalmodel.find({accountID})
    if(!withdrawals){
        return "withdrawal dose not found"
    }
    return withdrawals
};



export default Withdrawalmodel