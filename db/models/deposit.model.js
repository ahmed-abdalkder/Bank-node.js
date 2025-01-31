import mongoose, { Types } from "mongoose";
 


const depositSchema = new mongoose.Schema({
    accountID: {
        type: Types.ObjectId,
        ref: "Account",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    Remark: {
        type: String,
        default: ""
    }
},{
    timestamps: true,
    versionKey: false
});

const Depositmodel = mongoose.model("Deposit",depositSchema)

Depositmodel.createDeposit = async(newdeposit)=>{

    const deposit = await Depositmodel.create(newdeposit)

    const account = await mongoose.model("Account").findById(deposit.accountID);
    if(!account){
    return("account dose not found")
    }
 
     account.balance += deposit.amount 

  await account.save()

return  deposit

}

Depositmodel.getAll = async()=>{

    const deposits = await Depositmodel.find({}).populate("accountID")
    if(!deposits){
        return ("deposits do not found")
    }
    return deposits
}
Depositmodel.getfromId = async(id)=>{

    const deposit = await Depositmodel.findById(id).populate("accountID")
    if(!deposit){
        return ("deposits do not found")
    }
    return deposit
}
Depositmodel.getByAccountID = async(accountID)=>{

    const deposit = await Depositmodel.find({accountID}).populate("accountID")
    if( deposit.length === 0 ){
        return (" do not deposits")
    }
    return deposit
}





export default Depositmodel