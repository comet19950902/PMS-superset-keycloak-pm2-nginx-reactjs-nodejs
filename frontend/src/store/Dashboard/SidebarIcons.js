import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'
const SidebarIcons = () => {
  const location = useLocation()
  // var walletIdAddress = location.pathname.slice(8);
  const getId = localStorage.getItem('sub_Id')
  const [result, setResult] = useState([])
  const [routeId, setRouteId] = useState('')
  useEffect(() => {
    axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllWalletsofUSer', { params: { user_id: getId } })
      .then(response => {
        setResult(response.data)
        setRouteId(response.data[0].walletId)
      })
  }, [])
  console.log(routeId)
  return (
    <div className="dashboard maindashboard" style={{ width: '10%' }}>
      <aside>
        <ul className="sidebar" style={{ marginLeft: '4%' }}>
          <li>
            <Link to="/PMS/dashboard" className="active" style={{ marginLeft: '25%', paddingLeft: '8%' }}>
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
          <li>
            <Link to="/PMS/Assets/:4a47bdd9-a3c5-4ef9-b584-85042ca5aa8c" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
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
            <Link to="/PMS/AddWallet" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
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
          {/* <li style={{marginTop:"-10%"}}>
          <Link to="/AddInvestment" className="active" style={{padding:"2%"}}>
            <span>Add Investment</span>
          </Link>
        </li>
        <li style={{marginTop:"-12%"}}>
          <Link to="/AddExchange" className="active" style={{padding:"2%"}}>
            <span> Add Exchange</span>
          </Link>
        </li>
        <li style={{marginTop:"-12%"}}>
          <Link to="/AddWallet" className="active" style={{padding:"2%"}}>
            <span>Add Wallet</span>
          </Link>
        </li> */}
          <li>
            <Link to="/PMS/Investments" className="active" style={{ marginLeft: '25%', marginTop: '0.1%', paddingLeft: '8%' }}>
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
            <Link to="/PMS/AllAssets" style={{ marginLeft: '25%', marginTop: '0.2%', paddingLeft: '8%' }} className="active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.654"
                height="22.654"
                viewBox="0 0 22.14 22.209"
                style={{ width: '18px' }}
              >
                <g id="Activity" transform="translate(-0.028 -0.028)">
                  <path
                    id="Path_33966"
                    d="M0,5.639l3.064-4.4,3.5,3.032L9.558,0"
                    transform="translate(5.828 8.745)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  />
                  <circle
                    id="Ellipse_741"
                    cx="2.173"
                    cy="2.173"
                    r="2.173"
                    transform="translate(17.072 0.778)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Path"
                    d="M13.072,0H5.25C2.01,0,0,2.295,0,5.535v8.7c0,3.24,1.97,5.525,5.25,5.525h9.26c3.241,0,5.25-2.285,5.25-5.525V6.658"
                    transform="translate(0.778 1.73)"
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
          <li>
            <Link to="/PMS/Transactions/:4a47bdd9-a3c5-4ef9-b584-85042ca5aa8c" style={{ marginLeft: '25%', marginTop: '-0.2%', paddingLeft: '8%' }} className="active">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22.654"
                height="22.654"
                viewBox="0 0 22.449 22.25"
                style={{ width: '18px' }}
              >
                <g id="Discount" transform="translate(0 0)">
                  <path
                    id="Stroke_1"
                    data-name="Stroke 1"
                    d="M2.293,4.829A2.537,2.537,0,0,1,4.829,2.292H5.983A2.537,2.537,0,0,0,7.77,1.555L8.576.747A2.537,2.537,0,0,1,12.163.738l.01.009.808.808a2.533,2.533,0,0,0,1.787.737h1.153a2.538,2.538,0,0,1,2.537,2.537V5.981a2.535,2.535,0,0,0,.737,1.788L20,8.576a2.537,2.537,0,0,1,.01,3.587l-.01.01-.808.808a2.53,2.53,0,0,0-.737,1.786v1.154a2.537,2.537,0,0,1-2.537,2.536H14.768a2.534,2.534,0,0,0-1.787.738L12.173,20a2.536,2.536,0,0,1-3.587.01L8.576,20l-.806-.806a2.538,2.538,0,0,0-1.787-.738H4.829a2.536,2.536,0,0,1-2.536-2.536V14.767a2.531,2.531,0,0,0-.738-1.786l-.806-.808a2.536,2.536,0,0,1-.01-3.587l.01-.01.806-.808a2.537,2.537,0,0,0,.738-1.788V4.829"
                    transform="translate(0.75 0.751)"
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
                    d="M0,5.765,5.765,0"
                    transform="translate(8.243 8.242)"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                  />
                  <path
                    id="Fill_5"
                    data-name="Fill 5"
                    d="M.841,1.671a.84.84,0,0,1-.594-.247.921.921,0,0,1-.179-.28A.749.749,0,0,1,0,.83.8.8,0,0,1,.067.5.87.87,0,0,1,.247.236a.868.868,0,0,1,1.189,0A.9.9,0,0,1,1.626.5,1.042,1.042,0,0,1,1.682.83a.968.968,0,0,1-.056.314.955.955,0,0,1-.191.28.84.84,0,0,1-.594.247"
                    transform="translate(13.163 13.18)"
                    fill="#200E32"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                  <path
                    id="Fill_7"
                    data-name="Fill 7"
                    d="M.841,1.672A.754.754,0,0,1,.527,1.6a.918.918,0,0,1-.28-.178,1.08,1.08,0,0,1-.179-.28A.756.756,0,0,1,0,.831.8.8,0,0,1,.067.506.756.756,0,0,1,.247.236a.866.866,0,0,1,1.189,0,.838.838,0,0,1,.247.594.747.747,0,0,1-.056.314,1.129,1.129,0,0,1-.191.28.867.867,0,0,1-.269.178.806.806,0,0,1-.325.068"
                    transform="translate(7.398 7.415)"
                    fill="#200E32"
                    stroke="#fff"
                    strokeWidth="1"
                  />
                </g>
              </svg>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
export default SidebarIcons
