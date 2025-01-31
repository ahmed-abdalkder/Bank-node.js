
import  jwt  from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';
import Employeemodel from '../../db/models/employee.model.js';
import Customermodel from '../../db/models/customer.model.js';
 
 
 

  const tokenValidation = (roles=[])=>{
    try {
    return async(req,res,next)=>{

        const{token} = req.headers

        if(!token){
           return res.status(StatusCodes.BAD_REQUEST).json("token not exist")

        };
        if(!token.startsWith("token__")){
            return res.status(StatusCodes.BAD_REQUEST).json("invalid token")

        };
        const newtoken = token.split("token__")[1]
        if(!newtoken){
            return res.status(StatusCodes.BAD_REQUEST).json("token not exist")

        };
        const decoded = jwt.verify(newtoken,process.env.token_io)
        if(!decoded?.id ){
            return res.status(StatusCodes.BAD_REQUEST).json("invalid newtoken")
         };
      let user;
 
    if (decoded.role === "customer") {
        user = await Customermodel.findById(decoded.id);
      } else if (decoded.role === "employee" || decoded.role === "manager") {
        user = await Employeemodel.findById(decoded.id);
      };
  
      if (!user) {
        return res
          .status(404)
          .json({ status: 404, message: "User not found in the database" });
      };
        req.user = user

        next()
    };

} catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
 
}
 const auth = tokenValidation

 export default auth