
import  mongoose, { Types }  from 'mongoose';
import  bcrypt  from 'bcrypt';

const onlinecustomerSchema = new mongoose.Schema({

    customerID:{
        type:Types.ObjectId,
        ref:"customer",
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    versionKey:false
});

onlinecustomerSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
      bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;
        next();
      });
    } else {
      next();
    }
  });
const onlinecustomermodel = mongoose.model("Onlinecustomer",onlinecustomerSchema)

onlinecustomermodel.createonline = async(newcustomer)=>{

    const customer = await onlinecustomermodel.findOne({username:newcustomer.username})
    if(customer){
        return "onlinecustomer alredy exist"
    }

    const onlinecustomer = await onlinecustomermodel.create(newcustomer )

    return onlinecustomer
};

onlinecustomermodel.findID = async(username)=>{

    const customer = await onlinecustomermodel.findById(username)
    if(!customer){
        return "customer dose not found"
    }
    return customer
};

onlinecustomermodel.deletecustomer = async(id)=>{

    const customer = await onlinecustomermodel.findByIdAndDelete(id)
    if(!customer){
        return "customer dose not found"
    }
    return customer
};

export default onlinecustomermodel