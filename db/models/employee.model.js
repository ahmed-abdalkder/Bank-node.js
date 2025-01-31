
import  mongoose, { Types }  from 'mongoose';
import  bcrypt  from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import { SendEmail } from '../../src/service/sendemail.js';
 

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    onlineID: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    BranchID: {
        type: Types.ObjectId,
        ref: "Branch",
        required: true
    },
    managerID: {
        type: Types.ObjectId,
        ref: "Employee",
        default: null,
    },
    role: {
        type: String,
        enum: ["employee","maneger"]
       }
},{
    timestamps: true,
    versionKey: false
});
const Employeemodel = mongoose.model("Employee", employeeSchema)

Employeemodel.createemployee = async(EmployeeData)=>{

    const employee = await Employeemodel.findOne({email: EmployeeData.email})
    if(employee){
        return("employee already exist")
    }
     
    EmployeeData.password = bcrypt.hashSync(EmployeeData.password,10)

    const token = jwt.sign(EmployeeData.email,"destination")
      const link = `http://localhost:3000/Employees/verify/${token}`
      await SendEmail(EmployeeData.email,"check link",`<a href="${link}"> click her your link </a>`)

      const newemployee = new Employeemodel(EmployeeData)

      await newemployee.save()

      return newemployee
}


Employeemodel.getall = async()=>{
    const employees = await Employeemodel.find() 
    return employees
}

Employeemodel.GetFromID = async(ID)=>{
    const employee = await Employeemodel.findById(ID) 
    if(!employee){
        return ("employee dose not found")
    }
    return employee
}
Employeemodel.Update = async(id,data)=>{
    
    const employeeexist = await Employeemodel.findById(id)
    if(!employeeexist){
      return("employee dose not found")
    }
    const employee = await Employeemodel.findByIdAndUpdate(
        id,{$set:data},{new:true,runValidators:true}
    );
     
    return employee
  }


 export default Employeemodel