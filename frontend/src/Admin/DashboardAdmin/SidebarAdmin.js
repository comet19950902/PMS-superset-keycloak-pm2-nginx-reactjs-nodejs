import React, { useState,useEffect,useRef } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import HistoryIcon from '@mui/icons-material/History'
import GroupsIcon from '@mui/icons-material/Groups'
import InventoryIcon from '@mui/icons-material/Inventory'
import GridViewIcon from '@mui/icons-material/GridView'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import "./SidebarAdmin.css";
import { current } from '@reduxjs/toolkit'
let load=false
let loadUpper=true
const SidebarAdmin = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const portfolioRef=useRef(null)
  
  const roleId = localStorage.getItem('role')?.split(',');
  const[showPortfolioDetails,setShowPortfolioDetails]=useState(true);
  const[showAccountancyDetails,setShowAccountancyDetails]=useState(true);
  const [active, setActive] = useState(false)
 
  return (
    <div>
      <aside className='sidebar-admin-container' style={{overflowY:"auto",overflowX:'hidden',height:'100vh', position:'sticky'}}>
        {
          (roleId.includes('admin') === true) && (roleId.includes('user') === false)
            ? <ul    className="sidebar">
              <li  >
                <NavLink  to="/PMS/Admin_dashboard" className="nav-link" activeClassName="active" 
                 onClick={()=>{
                  
                      setShowPortfolioDetails(!showPortfolioDetails)
                    setTimeout(()=>{
                      navigate("/PMS/Admin_dashboard");
                    },500)
                }}
                >

                  <GridViewIcon style={{ fontSize: '24px', color: '#FFC107' }} />
                  <span style={{ padding: '4%' }}>Portfolios</span>
                </NavLink>
              </li>
              {
                    (showPortfolioDetails==true)
                    ?
                   <>
                     <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/MainManageAssetsWallets" className="nav-link" activeClassName="active" >
                      <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Wallets</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/Investments" className="nav-link" activeClassName="active" >
                      <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Investments</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink  to="/PMS/ViewExchanges" className="nav-link" activeClassName="active" >
                      <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Exchanges</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink  to="/PMS/Admin/Transactions" className="nav-link" activeClassName="active" >
                      <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Transactions</span>
                    </NavLink>
                  </li>
                   </>
                  :
                  <></>
                   }
              <hr id="separator"/>
              <li>
                <NavLink  to="/PMS/Admin/Person" className="nav-link" activeClassName="active">
                  <PersonIcon style={{ fontSize: '26px', color: '#FFC107' }} />
                  <span style={{ padding: '4%' }}>Person</span>
                </NavLink>
              </li>
              <li>
                <NavLink  to="/PMS/Admin/Organisation" className="nav-link" activeClassName="active">
                  <GroupsIcon style={{ fontSize: '26px', color: '#FFC107' }} />
                  <span style={{ padding: '4%' }}>Organisation</span>
                </NavLink>
              </li>
              <li>
                <NavLink  to="/PMS/Accountant" className="nav-link" activeClassName="active" >
                  <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                  <span style={{ padding: '2%' }}>Accountant</span>
                </NavLink>
              </li>
              <li>
              <hr id="separator"/>
                <NavLink  to="/PMS/Accounting_Data" className="nav-link" activeClassName="active" 
                onClick={()=>{
                  setShowAccountancyDetails(!showAccountancyDetails)}}
                  >
                  <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                  <span style={{ padding: '2%' }}>Accountancy</span>
                </NavLink>
              </li>
              {
                      (showAccountancyDetails==true)
                      ?
                      <>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/Accounting_data" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Accounts</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink  to="/PMS/deleted_entries" className="nav-link" activeClassName="active" >
                            <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Trash</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/payments" className="nav-link" activeClassName="active" >
                            <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Payments</span>
                          </NavLink>
                        </li>
                        {/* <li style={{marginLeft:"2.5em"}}>
                          <NavLink  to="/PMS/payment_logs" className="nav-link" activeClassName="active" >
                            <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Payment Logs</span>
                          </NavLink>
                        </li> */}
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink  to="/PMS/ledger" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Ledgers</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/balance" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Balance</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/shareholders" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Shareholders</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink  to="/PMS/entity" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Entity</span>
                          </NavLink>
                        </li>
                      </>
                      :
                      <></>
                    }
              <hr id="separator"/>
              <li style={{marginBottom:"3em"}}>
                <NavLink  to="/PMS/Investment/LogHistory" className="nav-link" activeClassName="active" >
                  <HistoryIcon style={{ fontSize: '23px', color: '#FFC107'}} />
                  <span style={{ padding: '2%' }}>Audit Info</span>
                </NavLink>
              </li>
            </ul>
            : (roleId.includes('accountant') === true) && (roleId.includes('user') === false)
                ? <ul className="sidebar">
                <li>
                  <NavLink to={'/PMS/Admin_dashboard'} className="nav-link" activeClassName="active" onClick={()=>{
                    setShowPortfolioDetails(!showPortfolioDetails)
                    setTimeout(()=>{
                      navigate("/PMS/Admin_dashboard");
                    },500)
                }}>
                    <GridViewIcon style={{ fontSize: '24px', color: '#FFC107' }} />
                    <span style={{ padding: '4%' }}>Portfolios</span>
                  </NavLink>
                </li>
                {
                    (showPortfolioDetails==true)
                    ?
                   <>
                     <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/MainManageAssetsWallets" className="nav-link" activeClassName="active" >
                      <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Wallets</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/Investments" className="nav-link" activeClassName="active" >
                      <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Investments</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/ViewExchanges" className="nav-link" activeClassName="active" >
                      <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Exchanges</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/Admin/Transactions" className="nav-link" activeClassName="active" >
                      <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Transactions</span>
                    </NavLink>
                  </li>
                   </>
                  :
                  <></>
                   }
              <hr id="separator"/>
                <li>
                <NavLink to="/PMS/shareholders" className="nav-link" activeClassName="active" onClick={()=>{
                        setShowAccountancyDetails(!showAccountancyDetails)}} >
                  <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                  <span style={{ padding: '2%' }}>Accountancy</span>
                </NavLink>
              </li>
              {
                      (showAccountancyDetails==true)
                      ?
                      <>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/Accounting_data" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Accounts</span>
                          </NavLink>
                        </li>
                        {/* <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/Accounting_input" className="nav-link" activeClassName="active" >
                            <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Accounting</span>
                          </NavLink>
              </li> */}
                       <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/deleted_entries" className="nav-link" activeClassName="active" >
                            <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Trash</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/payments" className="nav-link" activeClassName="active" >
                            <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Payments</span>
                          </NavLink>
                        </li>
                        {/* <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/payment_logs" className="nav-link" activeClassName="active" >
                            <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Payment Logs</span>
                          </NavLink>
                        </li> */}
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/ledger" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Ledgers</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/balance" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Balance</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/shareholders" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Shareholders</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/entity" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Entity</span>
                          </NavLink>
                        </li>
                      </>
                      :
                      <></>
                    }
              <hr id="separator"/>
               
                <li style={{marginBottom:"3em"}}>
                  <NavLink to="/PMS/Investment/LogHistory" className="nav-link" activeClassName="active">
                    <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                    <span style={{ padding: '2%' }}>Audit Info</span>
                  </NavLink>
                </li>
              </ul>
                : (roleId.includes('user') === true) && (roleId.includes('admin') === false)
                    ? <ul className="sidebar" >
                  <li>
                    <NavLink to={'/PMS/dashboard'} className="nav-link" activeClassName="active" >

                      <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Dashboard</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/PMS/UsersAsset" className="nav-link" activeClassName="active">
                      <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Assets</span>
                    </NavLink>
                  </li>
                </ul>
                    : ((roleId.includes('admin') === true) && (roleId.includes('user') === true))
                        ? <ul className="sidebar">
                    <li>
                      <NavLink to={'/PMS/dashboard'} className="nav-link" activeClassName="active" >

                        <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                        <span style={{ padding: '4%' }}>Dashboard</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/PMS/UsersAsset" className="nav-link" activeClassName="active">
                        <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                        <span style={{ padding: '4%' }}>Assets</span>
                      </NavLink>
                    </li>
                    <hr id="separator"/>
                    <li>
                      <NavLink to="/PMS/Admin_dashboard"  className="nav-link" activeClassName="active" onClick={()=>{
                        setShowPortfolioDetails(!showPortfolioDetails)
                        setTimeout(()=>{
                          navigate("/PMS/Admin_dashboard");
                        },500)
                      }} >

                        <GridViewIcon style={{ fontSize: '24px', color: '#FFC107' }} />
                        <span style={{ padding: '4%' }}>Portfolios</span>
                      </NavLink>
                    </li>
                   {
                    (showPortfolioDetails==true)
                    ?
                   <>
                     <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/MainManageAssetsWallets" className="nav-link" activeClassName="active" >
                      <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Wallets</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/Investments" className="nav-link" activeClassName="active" >
                      <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Investments</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/ViewExchanges" className="nav-link" activeClassName="active" >
                      <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Exchanges</span>
                    </NavLink>
                  </li>
                  <li style={{marginLeft:"2.5em"}}>
                    <NavLink to="/PMS/Admin/Transactions" className="nav-link" activeClassName="active" >
                      <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                      <span style={{ padding: '4%' }}>Transactions</span>
                    </NavLink>
                  </li>
                   </>
                  :
                  <></>
                   }
                    <hr id="separator"/>
                    <li>
                      <NavLink to="/PMS/Admin/Person" className="nav-link" activeClassName="active" >
                        <PersonIcon style={{ fontSize: '26px', color: '#FFC107' }} />
                        <span style={{ padding: '4%' }}>Person</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/PMS/Admin/Organisation" className="nav-link" activeClassName="active" >
                        <GroupsIcon style={{ fontSize: '26px', color: '#FFC107' }} />
                        <span style={{ padding: '4%' }}>Organisation</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/PMS/Accountant" className="nav-link" activeClassName="active">
                        <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                        <span style={{ padding: '2%' }}>Accountant</span>
                      </NavLink>
                    </li>
                    <hr id="separator"/>
                    <li>
                      <NavLink to="/PMS/Accounting_data" className="nav-link" activeClassName="active" onClick={()=>{
                        setShowAccountancyDetails(!showAccountancyDetails)
                      }} >
                        <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                        <span style={{ padding: '2%' }}>Accountancy</span>
                      </NavLink>
                    </li>
                    {
                      (showAccountancyDetails==true)
                      ?
                      <>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/Accounting_data" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Accounts</span>
                          </NavLink>
                        </li>
                        {/* <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/Accounting_input" className="nav-link" activeClassName="active" >
                            <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Accounting</span>
                          </NavLink>
                        </li> */}
                         <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/deleted_entries" className="nav-link" activeClassName="active" >
                            <InventoryIcon style={{ fontSize: '25px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Trash</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/payments" className="nav-link" activeClassName="active" >
                            <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Payments</span>
                          </NavLink>
                        </li>
                        {/* <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/payment_logs" className="nav-link" activeClassName="active" >
                            <CurrencyExchangeIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Payment Logs</span>
                          </NavLink>
                        </li> */}
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/ledger" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Ledgers</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/balance" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Balance</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/shareholders" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Shareholders</span>
                          </NavLink>
                        </li>
                        <li style={{marginLeft:"2.5em"}}>
                          <NavLink to="/PMS/entity" className="nav-link" activeClassName="active" >
                            <AccountBalanceWalletIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                            <span style={{ padding: '4%' }}>Entity</span>
                          </NavLink>
                        </li>
                      </>
                      :
                      <></>
                    }
                    <hr id="separator"/>
                    <li style={{marginBottom:"3em"}}>
                      <NavLink to="/PMS/Investment/LogHistory" className="nav-link" activeClassName="active">
                        <HistoryIcon style={{ fontSize: '23px', color: '#FFC107' }} />
                        <span style={{ padding: '2%' }}>Audit Info</span>
                      </NavLink>
                    </li>
                  </ul>
                        : <></>
        }
      </aside>
    </div>
  )
}
export default SidebarAdmin