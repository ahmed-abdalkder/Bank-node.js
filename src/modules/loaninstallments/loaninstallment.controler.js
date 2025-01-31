
import LoanInstallmentmodel from "../../../db/models/installment.model.js"
import StatusCodes from 'http-status-codes';


export const createdInstallMent = async(req,res)=>{

    const{LoanID,Amount,DueDate, CustomerID, InstallmentID,PaidDate} = req.body

    const installment = await LoanInstallmentmodel.createinstallment(

        {LoanID,Amount,DueDate,CustomerID,InstallmentID,PaidDate} 
    );

    res.status(StatusCodes.OK).json(installment)

};

export const findAll = async(req,res)=>{

    const {DueDate,Paid,InstallmentID} = req.body

    const installment = await LoanInstallmentmodel.getall({DueDate,Paid,InstallmentID} )
    
    res.status(StatusCodes.OK).json(installment)

};

export const getFromID = async(req,res)=>{

    const {id} = req.params

    const installment = await LoanInstallmentmodel.getfromid(id)

    res.status(StatusCodes.OK).json(installment)

};