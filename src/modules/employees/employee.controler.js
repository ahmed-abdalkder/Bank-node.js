import Employeemodel from "../../../db/models/employee.model.js"
import StatusCodes from 'http-status-codes';
 

export const CreateEmployee = async(req,res)=>{

    const{name,email,password,position,BranchID,managerID,onlineID} = req.body 

    const employee = await Employeemodel.createemployee(

     {name,email,password,position,BranchID,managerID,onlineID}
    );

    res.status(StatusCodes.OK).json({msg:"created",employee})

};
export const GetAll = async(req,res)=>{

    const employee = await Employeemodel.getall();

    res.status(StatusCodes.OK).json({msg:"done",employee})

};

export const getfromId = async(req,res)=>{
    const{id }=req.params 

    const employee = await Employeemodel.GetFromID(id);

    res.status(StatusCodes.OK).json({msg:"done",employee})

};

export const Updateemployee = async(req,res)=>{
    const{id}=req.params 
    const{name,email,password,position,BranchID,
        managerID,onlineID,role}= req.body 
    
    const employee = await Employeemodel.Update(

      id,{name,email,password,position,
        BranchID,managerID,onlineID,role},
       
    )
    res.status(StatusCodes.OK).json({msg:"done",employee})
  
  };