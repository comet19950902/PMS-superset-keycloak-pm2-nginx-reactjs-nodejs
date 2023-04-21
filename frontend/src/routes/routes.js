import React from 'react'
import AddWallet from '../modules/AddWallet/AddWallet'
import AddInvestment from '../modules/AddInvestment/AddInvestment'
import FinalDashboard from '../modules/FinalDashboard/FinalDashboard'
import AssetPage from '../modules/FinalDashboard/AssetPage'
import ManageAssets from '../modules/ManageAssets/ManageAssets'
import MyAssets from '../modules/MyAssets/MyAssets'
import Transactions from '../modules/Transactions/Transactions'
import AddExchange from '../modules/AddExchange/AddExchange'
import SuccessMessage from '../modules/SuccessMessage/SuccessMessage'
import AddAssets from '../modules/AddAssets/AddAssets'
import MainManageAssets from '../modules/MainManageAssets/MainManageAssets'
import MyAssets1 from '../modules/MyAssets1/MyAssets1'
import Assets from '../modules/Assets/Assets'
import Investment from '../modules/Investment/Investment'
import MainManageAssetsWallets from '../modules/MainManageAssetsWallets/MainManageAssetsWallets'
import MainManageAssetsSubWallets from '../modules/MainManageAssetsSubWallets/MainManageAssetsSubWallets'
import AddAddress from '../modules/AddAddress/AddAddress'
import MainAdmin from '../Admin/DashboardAdmin/mainAdmin.js'
import ViewWalletsAdmin from '../Admin/ViewWalletsAdmin/ViewWalletsAdmin'
import Exchange from '../store/Dashboard/Exchange'
import SinglePortFolioPage from '../Admin/SinglePortFolioPage'
import Person from '../Admin/DashboardAdmin/person'
import ViewExchanges from '../Admin/DashboardAdmin/ViewExchange'
import Organisation from '../Admin/DashboardAdmin/organisation'
import TransactionInvestment from '../modules/Transactions/TransactionInvestment'
import PartyPageMain from '../Admin/DashboardAdmin/PartyPages/PartyPageMain'
import ViewExchangesDetail from '../Admin/DashboardAdmin/ViewExchangeDetail'
import AdminTransactions from '../Admin/AdminTransactions'
import InvestmentAccountantHistory from '../Accountant/ViewInvestmentTransactionHistory'
import InvestmentLogHistory from '../Accountant/ViewInvestmentLogHistory'
import AdminAssets from '../Admin/DashboardAdmin/AdminAssets'
import Otp from '../modules/Login/Otp'
import UserPortfolios from '../Users/UsersDashboard'
import WalletTransactionHistory from '../modules/MainManageAssetsWallets/WalletTransactionHistory'
import Layout from '../container/Layout/Layout'
import ExchangeHistory from '../Admin/DashboardAdmin/ExchangeTransactionHistory'
import Accountant from '../Admin/DashboardAdmin/Accountant'
import Accountancy from "../accountancy/Accountancy";
import ShareholderTableData from '../accountancy/shareholderTableData'
import AccountingData from '../AccountingData/AccountingData'
import AccountingInput from '../AccountingInputSection/AccountingPage'
import Payments from '../Payments/Payments'
import Ledger from '../Ledger/Ledger'
import Balance from '../Balance/Balance'
import DeletedAccountancyData from '../DeletedAccountancyData/DeletedAccountancyData'
import ShareEntity from '../accountancy/shareEntity/shareEntity'
import PaymentLogs from '../PaymentLogs/PaymentLogs'
// import { Payment } from '@mui/icons-material'

const roleId = localStorage.getItem('role')?.split(',')
const routes = [

  {
    name: 'Layout',
    path: '*',
    component: <Layout />,
    showInHeader: true
  },

  {
    name: 'Login',
    path: '/PMS/otp',
    component: <Otp />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/MyAssets',
    component: <MyAssets />,
    showInHeader: true
  },

  {
    name: "User's Portfolios",
    path: '/PMS/UsersPortfolios',
    component: <UserPortfolios />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: roleId?.includes('user') === true || (roleId?.includes('user') === true && roleId?.includes('admin') === true) ? '/PMS/dashboard' : '*',
    component: <FinalDashboard />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: roleId?.includes('user') === true || (roleId?.includes('user') === true && roleId?.includes('admin') === true) ? '/PMS/UsersAsset' : '*',
    component: <AssetPage />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/PartyMainPage/:id/:id',
    component: <PartyPageMain />,
    showInHeader: true
  },
  {
    name:'Accountancy',
    path:'/PMS/accountancy',
    component:<Accountancy/>,
    showInHeader:true
  },
  {
    name:'Shareholders',
    path:'/PMS/shareholders',
    component:<ShareholderTableData/>,
    showInHeader:true
  },
  {
    name:'Entity',
    path:'/PMS/entity',
    component:<ShareEntity/>,
    showInHeader:true
  },
 
  {
    name:'Accounting Data',
    path:'/PMS/Accounting_data',
    component:<AccountingData/>,
    showInHeader:true
  },
  {
    name:"Deleted Data",
    path:"/PMS/deleted_entries",
    component:<DeletedAccountancyData/>,
    showInHeader:true,
  },
  {
    name:'Accounting Input',
    path:'/PMS/Accounting_input',
    component:<AccountingInput/>,
    showInHeader:true
  },
  {
    name:'Payments',
    path:'/PMS/payments',
    component:<Payments/>,
    showInHeader:true
  },
  {
    name:'Payment Logs',
    path:'/PMS/payment_logs',
    component:<PaymentLogs/>,
    showInHeader:true
  },
  {
    name:'Ledges',
    path:'/PMS/ledger',
    component:<Ledger/>,
    showInHeader:true
  },
  {
    name:'Ledges',
    path:'/PMS/balance',
    component:<Balance/>,
    showInHeader:true
  },
  {
    name: 'My Assets',
    path: '/PMS/Transactions/:id/:id',
    component: <Transactions />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/Admin/Transactions',
    component: <AdminTransactions />,
    showInHeader: true
  },

  {
    name: 'My Assets',
    path: '/PMS/Admin/Assets/:id',
    component: <AdminAssets />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/dashboard/Transactions/:id',
    component: <Transactions />,
    showInHeader: true
  },
  {
    name: 'Transaction Investment',
    path: '/PMS/TransactionInvestment/:id',
    component: <TransactionInvestment />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/ManageAssets',
    component: <ManageAssets />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/dashboard/Assets/AddWallet',
    component: <AddWallet />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/AddWallet',
    component: <AddWallet />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/dashboard/Assets/AddInvestment',
    component: <AddInvestment />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/AddInvestment',
    component: <AddInvestment />,
    showInHeader: true
  },
  {
    name: 'Investment',
    path: '/PMS/Investments',
    component: <Investment />,
    showInHeader: true
  },
  {
    name: 'Exchange',
    path: '/PMS/Exchange',
    component: <Exchange />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/dashboard/Assets/AddExchange',
    component: <AddExchange />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/PMS/AddExchange',
    component: <AddExchange />,
    showInHeader: true
  },
  // {
  //   name: "My Assets",
  //   path: "/PMS/dashboard/Assets/SuccessMessage",
  //   component: <SuccessMessage />,
  //   showInHeader: true,
  // },
  {
    name: 'My Assets',
    path: '/PMS/SuccessMessage',
    component: <SuccessMessage />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/AddAssets',
    component: <AddAssets />,
    showInHeader: true
  },
  {
    name: 'Manage Wallets',
    path: '/PMS/MainManageAssetsWallets',
    component: <MainManageAssetsWallets />,
    showInHeader: true
  },
  {
    name: 'Manage Exchanges',
    path: '/PMS/ViewExchanges',
    component: <ViewExchanges />,
    showInHeader: true
  },
  {
    name: 'Manage Exchanges',
    path: '/PMS/ViewExchangesDetail/:id',
    component: <ViewExchangesDetail />,
    showInHeader: true
  },
  {
    name: 'Manage Sub Wallets',
    path: '/PMS/MainManageAssetsSubWallets/:id/:id',
    component: <MainManageAssetsSubWallets />,
    showInHeader: true
  },
  {
    name: 'Transaction Investment',
    path: '/PMS/TransactionInvestment/:id',
    component: <TransactionInvestment />,
    showInHeader: true
  },
  {
    name: 'Transaction Investment History',
    path: '/PMS/TransactionInvestmentHistory',
    component: <InvestmentAccountantHistory />,
    showInHeader: true
  },
  {
    name: 'Transaction wallet History',
    path: '/PMS/TransactionWalletHistory',
    component: <WalletTransactionHistory />,
    showInHeader: true
  },
  {
    name: 'Transaction exchange History',
    path: '/PMS/TransactionExchangeHistory',
    component: <ExchangeHistory />,
    showInHeader: true
  },
  {
    name: 'Transaction Investment Log History',
    path: '/PMS/Investment/LogHistory',
    component: <InvestmentLogHistory />,
    showInHeader: true
  },
  {
    name: 'Add Address',
    path: '/PMS/AddAddress',
    component: <AddAddress />,
    showInHeader: true
  },
  {
    name: 'View Wallets Admin',
    path: '/PMS/ViewWalletsAdmin/:id',
    component: <ViewWalletsAdmin />,
    showInHeader: true
  },
  {
    name: 'accountant',
    path: '/PMS/Accountant',
    component: <Accountant />,
    showInHeader: true
  },

  // {
  //   name: "Dashboard Admin",
  //   path: "/PMS/Admin_dashboard",
  //   component: <DashboardAdmin/>,
  //   showInHeader: true,
  // },
  {
    name: 'Dashboard Admin',
    path: roleId?.includes('admin') === true || roleId?.includes('accountant') === true ? '/PMS/Admin_dashboard' : '*',
    component: <MainAdmin />,
    showInHeader: true
  },

  {
    name: 'Single PortFolio Admin',
    path: '/PMS/Admin/SinglePortfolioPage/:id',
    component: <SinglePortFolioPage />,
    showInHeader: true
  },

  {
    name: 'Party Admin',
    path: '/PMS/Admin/Person',
    component: <Person />,
    showInHeader: true
  },

  // accountant role

  {
    name: 'Party Admin',
    path: '/PMS/Admin/Organisation',
    component: <Organisation />,
    showInHeader: true
  },

  {

    name: 'My Assets',
    path: '/PMS/MainManageAssets',
    component: <MainManageAssets />,
    showInHeader: true
  },
  {
    name: 'My Assets',
    path: '/MyAssets1',
    component: <MyAssets1 />,
    showInHeader: true
  },

  {
    name: 'My Assets',
    path: '/PMS/Assets/:id',
    component: <Assets />,
    showInHeader: true
  },

  {
    name: 'My Assets',
    path: '/PMS/dashboard/Assets',
    component: <Assets />,
    showInHeader: true
  },
  {
    name: 'Manage Exchanges',
    path: '/PMS/ViewExchanges/:id',
    component: <ViewExchanges />,
    showInHeader: true
  }

]

export default routes