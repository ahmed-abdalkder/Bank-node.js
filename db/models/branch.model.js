import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
     customId: String,

     coverimages: [{secure_url:String,public_id:String}],

     image: {secure_url:String,public_id:String},

},{timestamps: true,
    versionKey: false
})
const Branchmodel = mongoose.model("Branch",BranchSchema)
export default Branchmodel