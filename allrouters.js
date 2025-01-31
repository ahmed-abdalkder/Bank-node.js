
import branchrouter from './src/modules/Branchs/branch.routes.js';
import accountrouter from './src/modules/accounts/account.routes.js';
import depositrouter from './src/modules/deposits/deposit.routes.js';
import employeerouter from './src/modules/employees/employee.routes.js';
import FDrouter from './src/modules/fixeddeposits/FD.routes.js';
import loanrouter from './src/modules/onlineloans/loan.routes.js';
import customerrouter from './src/modules/customers/customer.routes.js';
import authorizationrouter from './src/modules/authorization/author.routes.js';
import AccountTypeRouter from './src/modules/accountTypes/accountType.routes.js';
import withdrawalrouter from './src/modules/withdrawals/withdrawal.routes.js';
import transactionrouter from './src/modules/transactions/transaction.routes.js';
import onlineemployeerouter from './src/modules/onlineemployees/online.routes.js';
import onlinecustomerrouter from './src/modules/onlinecustomer/onlinecustomer.routes.js';
import installmentsrouter from './src/modules/loaninstallments/loaninstallment.routes.js';
 



export{
customerrouter,
AccountTypeRouter,
branchrouter,
accountrouter,
 depositrouter,
 employeerouter,
 FDrouter,
 loanrouter,
 installmentsrouter,
 withdrawalrouter,
 transactionrouter,
 onlineemployeerouter,
 onlinecustomerrouter,
 authorizationrouter
}