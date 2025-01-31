
import mongoose from "mongoose";

const AccontTypeSchema = new mongoose.Schema({

    typeName:{
        type: String,
        required: true
    },
    description: String,
     
    withdrawallimit: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    allowedOperation: {
        type: [String],
       default: ['deposit','withdraw','transfer']
    },
    minimumBalance: {
        type: Number,
        required: true
    },
},{timestamps: true,
    versionKey: false
})

const AccountTypemodel = mongoose.model('AccountType',AccontTypeSchema)

export default AccountTypemodel