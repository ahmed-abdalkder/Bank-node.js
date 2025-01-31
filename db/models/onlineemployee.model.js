
import  mongoose, { Types }  from 'mongoose';
import  bcrypt  from 'bcrypt';

const onlineemployeeSchema = new mongoose.Schema({

    employeeID:{
        type:Types.ObjectId,
        ref:"Employee",
        required:true
    },
    branchID:{
        type:Types.ObjectId,
        ref:"Branch",
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
    },
  
},{
    timestamps:true,
    versionKey:false
});

onlineemployeeSchema.pre('save', function(next) {
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
const onlineemployeemodel = mongoose.model("Onlineemployee",onlineemployeeSchema)

onlineemployeemodel.createonline = async(newemployee)=>{

    const employee = await onlineemployeemodel.findOne({username:newemployee.username})
    if(employee){
        return "onlineemployee alredy exist"
    }

    const onlineemployee = await onlineemployeemodel.create(newemployee )

    return onlineemployee
};

onlineemployeemodel.findID = async(id)=>{

    const employee = await onlineemployeemodel.findById({_id:id})
    if(!employee){
        return "employee dose not found"
    }
    return employee
};

onlineemployeemodel.deleteemployee = async(id)=>{

    const employee = await onlineemployeemodel.findByIdAndDelete(id)
    if(!employee){
        return "employee dose not found"
    }
    return employee
};

onlineemployeemodel.Update = async(id,data)=>{
    
    const employeeexist = await onlineemployeemodel.findById(id)
    if(!employeeexist){
      return("employee dose not found")
    }
    const employee = await onlineemployeemodel.findByIdAndUpdate(
        id,{$set:data},{new:true,runValidators:true}
    );
     
    return employee
  };

export default onlineemployeemodel