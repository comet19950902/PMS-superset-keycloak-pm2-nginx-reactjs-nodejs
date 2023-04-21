import React, { useState, useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import HistoryIcon from '@mui/icons-material/History'
import GroupsIcon from '@mui/icons-material/Groups'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import InventoryIcon from '@mui/icons-material/Inventory'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'

import { Link, useLocation } from 'react-router-dom'
const SidebarIconsAdmin = () => {
  const location = useLocation()
  // var walletIdAddress = location.pathname.slice(8);
  const getId = localStorage.getItem('sub_Id')
  return (
    <>
      {
        (getId == '39d9a7d0-025c-44d3-9209-99c6c1f5aa8b')
          ? <div className="dashboard maindashboard" style={{ width: '1%' }}>
            <aside>
              <ul className="sidebar"
              //  style={{marginLeft:"4%"}}
              >
                <li>
                  <Link to="/PMS/Admin_dashboard" className="active" style={{ marginLeft: '25%', paddingLeft: '8%' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22.654"
                      height="22.654"
                      viewBox="0 0 22.654 22.654"
                      style={{ width: '18px' }}
                    >
                      <g id="Category" transform="translate(0.75 0.75)">
                        <path
                          id="Stroke_1"
                          data-name="Stroke 1"
                          d="M2.59,0H6.045A2.6,2.6,0,0,1,8.634,2.613V6.1A2.6,2.6,0,0,1,6.045,8.709H2.59A2.6,2.6,0,0,1,0,6.1V2.613A2.6,2.6,0,0,1,2.59,0Z"
                          transform="translate(12.52 0)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Stroke_3"
                          data-name="Stroke 3"
                          d="M2.59,0H6.044a2.6,2.6,0,0,1,2.59,2.613V6.1a2.6,2.6,0,0,1-2.59,2.613H2.59A2.6,2.6,0,0,1,0,6.1V2.613A2.6,2.6,0,0,1,2.59,0Z"
                          transform="translate(0 0)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Stroke_5"
                          data-name="Stroke 5"
                          d="M2.59,0H6.044a2.6,2.6,0,0,1,2.59,2.614V6.1a2.6,2.6,0,0,1-2.59,2.613H2.59A2.6,2.6,0,0,1,0,6.1V2.614A2.6,2.6,0,0,1,2.59,0Z"
                          transform="translate(0 12.445)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                        <path
                          id="Stroke_7"
                          data-name="Stroke 7"
                          d="M2.59,0H6.045A2.6,2.6,0,0,1,8.634,2.614V6.1A2.6,2.6,0,0,1,6.045,8.709H2.59A2.6,2.6,0,0,1,0,6.1V2.614A2.6,2.6,0,0,1,2.59,0Z"
                          transform="translate(12.52 12.445)"
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeWidth="1.5"
                        />
                      </g>
                    </svg>
                  </Link>
                </li>
                {/* <li>
           <Link to="/PMS/Admin/Portfolio" className="active" style={{marginLeft:"25%", marginTop:"0.1%",paddingLeft:"8%"}}>
             <svg
               id="Wallet"
               xmlns="http://www.w3.org/2000/svg"
               width="22.654"
               height="22.654"
               viewBox="0 0 21.77 19.593"
               style={{width:"18px"}}
             >
               <path
                 id="Wallet-2"
                 data-name="Wallet"
                 d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
                 transform="translate(0 0)"
                 fill="#fff"
               />
             </svg>
           </Link>
         </li> */}
                {/* <li>
           <Link to="/PMS/Admin/Party" className="active" style={{marginLeft:'25%', marginTop:"0.1%",paddingLeft:"8%"}}>
             <svg
               id="Wallet"
               xmlns="http://www.w3.org/2000/svg"
               width="22.654"
               height="22.654"
               viewBox="0 0 21.77 19.593"
               style={{width:"18px"}}
             >
               <path
                 id="Wallet-2"
                 data-name="Wallet"
                 d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
                 transform="translate(0 0)"
                 fill="#fff"
               />
             </svg>
           </Link>
         </li> */}
                <li>
                  <Link to="/PMS/Admin/Person" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                    <PersonIcon style={{ fontSize: '23px', color: 'white' }} />
                  </Link>
                </li>
                <li>
                  <Link to="/PMS/Admin/Organisation" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                    <GroupsIcon style={{ fontSize: '23px', color: 'white' }} />
                  </Link>
                </li>
                <li>
                  <Link to="/PMS/Admin/Transactions" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                    <svg
                      id="Wallet"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22.654"
                      height="22.654"
                      viewBox="0 0 21.77 19.593"
                      style={{ width: '18px' }}
                    >
                      <path
                        id="Wallet-2"
                        data-name="Wallet"
                        d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
                        transform="translate(0 0)"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="/PMS/MainManageAssetsWallets" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                    <AccountBalanceWalletIcon style={{ fontSize: '23px', color: 'white' }} />

                  </Link>
                </li>
                <li>
                  <Link to="/PMS/Investments" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                    <InventoryIcon style={{ fontSize: '23px', color: 'white' }} />
                  </Link>
                </li>
                <li>
                  <Link to="/PMS/ViewExchanges" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                    <CurrencyExchangeIcon style={{ fontSize: '23px', color: 'white' }} />
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
          : (getId == '951e7fdc-6ea9-4e59-8f49-98a4349ca20d')
              ? <div className="dashboard maindashboard" style={{ width: '10%' }}>
              <aside>
                <ul className="sidebar" style={{ marginLeft: '4%' }}>
                  <li>
                    <Link to="/PMS/UserPortfolios" className="active" style={{ marginLeft: '25%', paddingLeft: '8%' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.654"
                        height="22.654"
                        viewBox="0 0 22.654 22.654"
                        style={{ width: '18px' }}
                      >
                        <g id="Category" transform="translate(0.75 0.75)">
                          <path
                            id="Stroke_1"
                            data-name="Stroke 1"
                            d="M2.59,0H6.045A2.6,2.6,0,0,1,8.634,2.613V6.1A2.6,2.6,0,0,1,6.045,8.709H2.59A2.6,2.6,0,0,1,0,6.1V2.613A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(12.52 0)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                          <path
                            id="Stroke_3"
                            data-name="Stroke 3"
                            d="M2.59,0H6.044a2.6,2.6,0,0,1,2.59,2.613V6.1a2.6,2.6,0,0,1-2.59,2.613H2.59A2.6,2.6,0,0,1,0,6.1V2.613A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(0 0)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                          <path
                            id="Stroke_5"
                            data-name="Stroke 5"
                            d="M2.59,0H6.044a2.6,2.6,0,0,1,2.59,2.614V6.1a2.6,2.6,0,0,1-2.59,2.613H2.59A2.6,2.6,0,0,1,0,6.1V2.614A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(0 12.445)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                          <path
                            id="Stroke_7"
                            data-name="Stroke 7"
                            d="M2.59,0H6.045A2.6,2.6,0,0,1,8.634,2.614V6.1A2.6,2.6,0,0,1,6.045,8.709H2.59A2.6,2.6,0,0,1,0,6.1V2.614A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(12.52 12.445)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                        </g>
                      </svg>
                    </Link>
                  </li>
                  {/* <li>
         <Link to="/PMS/Admin/Portfolio" className="active" style={{marginLeft:"25%", marginTop:"0.1%",paddingLeft:"8%"}}>
           <svg
             id="Wallet"
             xmlns="http://www.w3.org/2000/svg"
             width="22.654"
             height="22.654"
             viewBox="0 0 21.77 19.593"
             style={{width:"18px"}}
           >
             <path
               id="Wallet-2"
               data-name="Wallet"
               d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
               transform="translate(0 0)"
               fill="#fff"
             />
           </svg>
         </Link>
       </li> */}
                  {/* <li>
         <Link to="/PMS/Admin/Party" className="active" style={{marginLeft:'25%', marginTop:"0.1%",paddingLeft:"8%"}}>
           <svg
             id="Wallet"
             xmlns="http://www.w3.org/2000/svg"
             width="22.654"
             height="22.654"
             viewBox="0 0 21.77 19.593"
             style={{width:"18px"}}
           >
             <path
               id="Wallet-2"
               data-name="Wallet"
               d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
               transform="translate(0 0)"
               fill="#fff"
             />
           </svg>
         </Link>
       </li> */}
                  <li>
                    <Link to="/PMS/Accountant/Person" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <PersonIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Admin/Organisation" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <GroupsIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Accountant/Transactions" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <svg
                        id="Wallet"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.654"
                        height="22.654"
                        viewBox="0 0 21.77 19.593"
                        style={{ width: '18px' }}
                      >
                        <path
                          id="Wallet-2"
                          data-name="Wallet"
                          d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
                          transform="translate(0 0)"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/MainManageAssetsWallets/Accoutant" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <AccountBalanceWalletIcon style={{ fontSize: '23px', color: 'white' }} />

                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Investments/Accountant" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <InventoryIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/ViewExchanges/Accountant" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <CurrencyExchangeIcon style={{ fontSize: '23px', color: 'white' }} />

                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Investment/LogHistory" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <HistoryIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
              : <div className="dashboard maindashboard" style={{ width: '10%' }}>
              <aside>
                <ul className="sidebar" style={{ marginLeft: '4%' }}>
                  <li>
                    <Link to="/PMS/UsersPortfolios" className="active" style={{ marginLeft: '25%', paddingLeft: '8%' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.654"
                        height="22.654"
                        viewBox="0 0 22.654 22.654"
                        style={{ width: '18px' }}
                      >
                        <g id="Category" transform="translate(0.75 0.75)">
                          <path
                            id="Stroke_1"
                            data-name="Stroke 1"
                            d="M2.59,0H6.045A2.6,2.6,0,0,1,8.634,2.613V6.1A2.6,2.6,0,0,1,6.045,8.709H2.59A2.6,2.6,0,0,1,0,6.1V2.613A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(12.52 0)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                          <path
                            id="Stroke_3"
                            data-name="Stroke 3"
                            d="M2.59,0H6.044a2.6,2.6,0,0,1,2.59,2.613V6.1a2.6,2.6,0,0,1-2.59,2.613H2.59A2.6,2.6,0,0,1,0,6.1V2.613A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(0 0)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                          <path
                            id="Stroke_5"
                            data-name="Stroke 5"
                            d="M2.59,0H6.044a2.6,2.6,0,0,1,2.59,2.614V6.1a2.6,2.6,0,0,1-2.59,2.613H2.59A2.6,2.6,0,0,1,0,6.1V2.614A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(0 12.445)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                          <path
                            id="Stroke_7"
                            data-name="Stroke 7"
                            d="M2.59,0H6.045A2.6,2.6,0,0,1,8.634,2.614V6.1A2.6,2.6,0,0,1,6.045,8.709H2.59A2.6,2.6,0,0,1,0,6.1V2.614A2.6,2.6,0,0,1,2.59,0Z"
                            transform="translate(12.52 12.445)"
                            fill="none"
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5"
                          />
                        </g>
                      </svg>
                    </Link>
                  </li>
                  {/* <li>
       <Link to="/PMS/Admin/Portfolio" className="active" style={{marginLeft:"25%", marginTop:"0.1%",paddingLeft:"8%"}}>
         <svg
           id="Wallet"
           xmlns="http://www.w3.org/2000/svg"
           width="22.654"
           height="22.654"
           viewBox="0 0 21.77 19.593"
           style={{width:"18px"}}
         >
           <path
             id="Wallet-2"
             data-name="Wallet"
             d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
             transform="translate(0 0)"
             fill="#fff"
           />
         </svg>
       </Link>
     </li> */}
                  {/* <li>
       <Link to="/PMS/Admin/Party" className="active" style={{marginLeft:'25%', marginTop:"0.1%",paddingLeft:"8%"}}>
         <svg
           id="Wallet"
           xmlns="http://www.w3.org/2000/svg"
           width="22.654"
           height="22.654"
           viewBox="0 0 21.77 19.593"
           style={{width:"18px"}}
         >
           <path
             id="Wallet-2"
             data-name="Wallet"
             d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
             transform="translate(0 0)"
             fill="#fff"
           />
         </svg>
       </Link>
     </li> */}
                  <li>
                    <Link to="/PMS/Accountant/Person" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <PersonIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Admin/Organisation" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <GroupsIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Accountant/Transactions" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <svg
                        id="Wallet"
                        xmlns="http://www.w3.org/2000/svg"
                        width="22.654"
                        height="22.654"
                        viewBox="0 0 21.77 19.593"
                        style={{ width: '18px' }}
                      >
                        <path
                          id="Wallet-2"
                          data-name="Wallet"
                          d="M15.8,19.593H5.97a6.139,6.139,0,0,1-4.393-1.536A5.794,5.794,0,0,1,0,13.782V5.811A5.794,5.794,0,0,1,1.577,1.536,6.139,6.139,0,0,1,5.97,0H15.8a6.115,6.115,0,0,1,4.393,1.542A5.869,5.869,0,0,1,21.77,5.858H17.165V5.9A3.9,3.9,0,0,0,14.429,7a3.7,3.7,0,0,0-1.135,2.666,3.827,3.827,0,0,0,3.871,3.774H21.77v.339a5.794,5.794,0,0,1-1.577,4.275A6.139,6.139,0,0,1,15.8,19.593ZM5.157,4.236a.824.824,0,0,0-.832.8.834.834,0,0,0,.832.821H11.3a.811.811,0,1,0,0-1.622Zm15.8,7.584H17.219a2.28,2.28,0,0,1-2.241-1.735,2.152,2.152,0,0,1,.471-1.8,2.274,2.274,0,0,1,1.715-.805h3.792a.8.8,0,0,1,.813.793v2.755A.816.816,0,0,1,20.957,11.82ZM17.318,8.754a.824.824,0,0,0-.577.231.8.8,0,0,0-.245.57.834.834,0,0,0,.833.821h.358a.811.811,0,1,0,0-1.622h-.368Z"
                          transform="translate(0 0)"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/MainManageAssetsWallets/Accoutant" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <AccountBalanceWalletIcon style={{ fontSize: '23px', color: 'white' }} />

                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/Investments/Accountant" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <InventoryIcon style={{ fontSize: '23px', color: 'white' }} />
                    </Link>
                  </li>
                  <li>
                    <Link to="/PMS/ViewExchanges/Accountant" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
                      <CurrencyExchangeIcon style={{ fontSize: '23px', color: 'white' }} />

                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
      }
    </>
  )
}
export default SidebarIconsAdmin
