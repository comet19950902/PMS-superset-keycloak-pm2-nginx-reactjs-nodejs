import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col,Modal,Form } from 'react-bootstrap';
import cx from 'classnames';
import Header from '../common/Header/Header';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CommonTable from '../common/CommonTable/CommonTable';
import SearchBox from '../common/SearchBox/SearchBox';
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import "./accountancy.css";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Payments from '../Payments/Payments';
import Ledger from '../Ledger/Ledger';
import ShareholderTableData from './shareholderTableData';
import AccountingData from '../AccountingData/AccountingData';
import AccountingInput from '../AccountingInputSection/AccountingPage';

function Shareholder() {
  const getId = localStorage.getItem('sub_Id')
  const [result4, setResult4] = useState([])
  const [sea, setSea] = useState('');
  const[tabBarStatus,setTabBarStatus]=useState("Shareholders");
  const [search, setSearch] = useState([]);
  const [w_name, setw_name] = useState('');
  const[showWalletsData,setShowWalletsData]=useState(false);
  const[validated,setValidated]=useState(false);
  const [showWallet, setShowWallet] = useState(false)
  const [alertWallet, setAlertWallet] = useState(false)
  const handleCloseWallet2 = () => {
    setAlertWallet(false)
  }
  const handleCloseWalletsData = () => {
    setShowWallet(false)
  }
  const [resultUser, setResultUser] = useState([]);
  const handleShowShareholders=()=>{
    setShowWalletsData(true)
    setValidated(false)
  }
  const [alreadyExist, setAlreadyExist] = useState(false)
  const handleCloseExit = () => {
    setAlreadyExist(false)
  }
 
  const shareholderListData = async () => {
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/share_holder`, {
        data: { share_holder_name: w_name }
      })
      .then(function (response) {
       console.log(response);
            })
        }
  const handleAddWalletData = async (e) => {
    setValidated(true)
    e.preventDefault()
    await shareholderListData()
  }
  useEffect(async () => {
    
  }, [])
  console.log(tabBarStatus);
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-end">
          <Header />
        </Row>
        <Row>
          <Col lg={2} className="justify-content-md-center">
            {/* <SidebarAdmin /> */}
          </Col>
          <Col lg={10} style={{marginTop:"3%"}}>
              <Row id="flex-tabbar">
                <span onClick={()=>{
                  setTabBarStatus("Shareholders")
                }}>
                  <NavLink to="/PMS/accountancy" className="nav-link-new" activeClassName="active">Shareholders</NavLink>
                </span>
                <span onClick={()=>{
                  setTabBarStatus("Payments")
                }}> 
                  <NavLink to="/PMS/accountancy" className="nav-link-new" activeClassName="active">Payments</NavLink>
                </span>
                <span onClick={()=>{
                  setTabBarStatus("Ledger")
                }}>
                  <NavLink to="/PMS/accountancy" className="nav-link-new" activeClassName="active">Ledger</NavLink>
                </span>
                <span onClick={()=>{
                  setTabBarStatus("Accounting Data")
                }}>
                  <NavLink to="/PMS/accountancy" className="nav-link-new" activeClassName="active">Accounting Data</NavLink>
                </span>
                <span onClick={()=>{
                  setTabBarStatus("Accounting")
                }}>
                  <NavLink to="/PMS/accountancy" className="nav-link-new" activeClassName="active">Accounting</NavLink>
                </span>
              </Row>
              {
                (tabBarStatus=="Shareholders")
                ?
                <div style={{marginLeft:"3em"}}>
                <ShareholderTableData/>
                </div>
                :
                (tabBarStatus=="Payments")
                ?
                <div style={{marginTop:"1.5em"}}>
                  <Payments/>
                </div>
                :
                (tabBarStatus=="Ledger")
                ?
                <div style={{marginTop:"1.5em"}}>
                  <Ledger/>
                </div>
                :
                (tabBarStatus=="Accounting Data")
                ?
                <div style={{marginTop:"1.7em",marginLeft:"1.5em",width:"80em"}}>
                  <AccountingData/>
                </div>
                :
                (tabBarStatus=="Accounting")
                ?
                <div style={{marginTop:"1.7em",marginLeft:"4em"}}>
                  <AccountingInput/>
                </div>
                :
                <>
                </>
              }
            </Col>
        </Row>
      </Container>
    </React.Fragment >
  )
}

export default Shareholder;