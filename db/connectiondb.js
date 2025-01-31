
import mongoose from "mongoose";


 const connectionDB =async()=>{

    return await mongoose.connect(process.env.DB_url)
      .then(()=>{
        console.log("connection database  online successfully");
        
     }).catch((err)=>{

        console.log(err);
        
    })
};

export default connectionDB