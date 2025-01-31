
 
import StatusCodes from 'http-status-codes';
import onlineemployeemodel from "../../../db/models/onlineemployee.model.js";
 

export const CreateonlineEmployee = async(req,res)=>{

    const{employeeID,branchID,username,password,role } = req.body 

    const employee = await onlineemployeemodel.createonline(

     {employeeID,branchID,username,password,role }
    );
    res.status(StatusCodes.OK).json({msg:"created",employee})

};

export const deleteonlineemployee = async(req,res)=>{

     const{id} = req.prames
     
    const employee = await onlineemployeemodel.deleteemployee(id);

    res.status(StatusCodes.OK).json({msg:"done",employee})

};

export const getfromId = async(req,res)=>{
    
     const b = req.user.id

    const employee = await onlineemployeemodel.findID(b);

    res.status(StatusCodes.OK).json({msg:"done",employee})

};

export const UpdateOnlineEmployee = async(req,res)=>{
    const{id}=req.params 
    
    const{employeeID,branchID,username,password,role}= req.body 
    
    const employee = await onlineemployeemodel.Update(

      id,{employeeID,branchID,username,password,role},
       
    )
    res.status(StatusCodes.OK).json({msg:"done",employee})
  
  };