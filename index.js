import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve('config/.env')})
 import express from 'express'
 import connectionDB from './db/connectiondb.js';
import * as routers from './allrouters.js';
const app = express()
 const port = 3000
 
 app.use(express.json())

 connectionDB()
app.use("/customers",routers.customerrouter)
app.use("/AccountTypes",routers.AccountTypeRouter)
app.use("/Branchs",routers.branchrouter)
app.use("/Accounts",routers.accountrouter)
app.use("/Deposits",routers.depositrouter)
app.use("/Employees",routers.employeerouter)
app.use("/FixedDeposits",routers.FDrouter)
app.use("/OnLineLoans",routers.loanrouter)
app.use("/LoanInstallMents",routers.installmentsrouter)
app.use("/Withdrawals",routers.withdrawalrouter)
app.use("/Transactions",routers.transactionrouter)
app.use("/OnLineEmployee",routers.onlineemployeerouter)
app.use("/OnLineCustomer",routers.onlinecustomerrouter)
app.use("/Authorization",routers.authorizationrouter)

 app.get('*', (req, res) => res.json(' hello world !'))

 app.listen(port, () => console.log(`Example app listening on port ${port}!`))