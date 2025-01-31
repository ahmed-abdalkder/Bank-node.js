
import  mongoose  from 'mongoose';
 
 

const CustomerSchema = new mongoose.Schema({

    name: {
        type: String,
        min: 3,
        max: 20,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: Array,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    dateOfBrth: {
        type: Date,
        required: true
    },
    role: {
        type: String,
     }
},{timestamps: true,
    versionKey: false
})
const Customermodel = mongoose.model("customer",CustomerSchema)

Customermodel.create = async(customerdata)=>{
    const customer =  new Customermodel(customerdata)
    return await customer.save()
}

Customermodel.getall = async(name )=>{

    const fillter = name ? {name : { $regex: name,$options: "i"}}:{}

    const customer = await Customermodel.find(fillter)
    return customer
}
Customermodel.getFromID = async( id )=>{

  const customer = await Customermodel.findById(id)
  if(!customer){
     return("customer dose not found")
  }
  return customer
}

Customermodel.Remove = async(id )=>{

    const customer = await Customermodel.findByIdAndDelete(id)
    if(!customer){
       return("customer dose not found")
    }
    return customer
  }

  Customermodel.RemoveAll = async( )=>{

    const customer = await Customermodel.deleteMany({})
    
    return customer
  }

  Customermodel.Update = async(id,data)=>{
    
    const customerexist = await Customermodel.findById(id)
    if(!customerexist){
      return("customer dose not found")
    }
    const customer = await Customermodel.findByIdAndUpdate(
        id,{$set: data},{new: true,runValidators: true}
    );
     
    return customer
  }


export default Customermodel