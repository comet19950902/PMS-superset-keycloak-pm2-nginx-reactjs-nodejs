import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Modal, Form } from 'react-bootstrap'
import '../../common/Modal.css'
import axios from 'axios'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import cx from 'classnames'
import Spinner from '../../common/spinner'
import moment from 'moment'
import Loader from '../../common/loader';
import InputLabel from '@mui/material/InputLabel' 
import  { read, utils, writeFile } from 'xlsx';
import FormControl from '@mui/material/FormControl'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Select from '@mui/material/Select'
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import MenuItem from '@mui/material/MenuItem'
import CommonTableWallet from '../../common/CommonTable/CommonTableWallet'
import Header from '../../common/Header/Header'
import SearchBox from '../../common/SearchBox/SearchBox'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Snackbar from '@mui/material/Snackbar'
 import elliptic from '../../config/env.js'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Autocomplete from '@mui/material/Autocomplete'
import Tooltip from '@mui/material/Tooltip'
import { Alert, TextField } from '@mui/material'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { TireRepair } from '@mui/icons-material'

const useStyles = makeStyles({
  paper: {
    background: 'rgb(31, 33, 37) !important',
    color: 'white !important'
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
  },
  option: {
    '&:hover': {
      backgroundColor: 'grey !important',
      color: 'white !important'
    }
  }
})
let tronD =[]
let btcD=[]
let elliptic_data=process.env.REACT_APP_ELLIPTIC
const wallet_sample_data = JSON.parse(elliptic_data)
//  localStorage.setItem('json',elliptic_data )
const MainManageAssetsWallets = () => {
  const styles = useStyles()
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const location = useLocation()
  const port_id = location.state?.data?.portfolio_id
  const [result, setResult] = useState([])
  const [loadData, setLoadData] =useState(false)
  const [disabledButton, setDisabledButton]=useState('')
  const [result2, setResult2] = useState([])
  const [result3, setResult3] = useState([])
  const [dataId, setDataId] = useState('')
  const [loading,setLoading]=useState(true)
  const [wallet, setWallet] = useState([])
  const [show, setShow] = useState(false)
  const [alertDownload, setAlertDownload] = useState(true)
  const [showAddress, setShowAddress] = useState(false)
  const handleCloseAddress = () => setShowAddress(false)
 
  const handleClose = () => setShow(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [alertNoRecord, setAlertNoRecord]=useState(false)
  const [m, setm] = useState('-10%')
  const [wid, setWid] = useState('159%')
  const [mar, setmar] = useState('0%')
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [w_data, setW_data] = useState([])
  const [wall, setwall] = useState('')
  const [portN, setPortN] = useState('')
  const [portI, setPortI] = useState('')
  const [walletJson, setWalletJson] = useState([])
  const navigate = useNavigate()
  const from = location?.state?.from
  console.log(from)
  const [walletDataInfo, setWalletDataInfo] = useState([])
  // })
  
  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setWid('180%')
      setmar('-20%')
      setm('-9%')
      setMargin('8%')
      setWidthData('-4%')
    } else {
      setNewWidth('10')
      setm('2.5%')
      setWid('159%')
      setmar('0%')
      setW('100%')
      setMargin('22%')
      setWidthData('6%')
    }
  }
  const trondata=async(ab)=>{
    var config = {
    method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
      params: {
        portfolio_id: ab,
        address_type:'TRON'
      },
    };
     await axios(config).then(function (response1) {
      tronD = response1.data
      console.log(tronD)
    });
  }
  const btcdata=async(ab)=>{
    var config = {
    method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: ab,
        address_type:'BTC',
      },
    };
     await axios(config).then(function (response2) {
       btcD = response2.data
    });
  }
  const handleShow = (id) => {
    setShow(true)
    setW_data(id)
  }
  const handleDeleteUpdate2 = async () => {
    if(addressTypeCheck=='TRON' || undefined){
      var config = {
        method: "delete",
        url: `${process.env.REACT_APP_BASE_URL}/deleteAddressData`,
        params: {
          address_id: dataId,
          address_type:'TRON'
        },
      };
      await axios(config)
        .then(function (response) {
          btcdata(portI)
          trondata(portI)
          walletData(portI);
        })
        .catch(function (error) {
          // console.log(error);
        });
    }  else if (addressTypeCheck=='BTC'){
      const config = {
        method: 'delete',
        url: `${process.env.REACT_APP_BASE_URL}/deletebtcAddressData`,
        params: {
          btc_address_id: dataId,
          address_type:'BTC'
        }
      }
      await axios(config)
        .then(function (response) {
          btcdata(portI)
          trondata(portI)
          walletData(portI)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }else{
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/deleteAddressAllData`,
      params: {
        address_id: dataId
      }
    }
    await axios(config)
      .then(function (response) {
        btcdata(portI)
        trondata(portI)
        walletData(portI)
      })
      .catch(function (error) {
        // console.log(error)
      })
  }
}
  const portfolioData = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    await axios(config)
      .then(function (response) {
        const rs = response.data
        const arr = []
        if (roleId.includes('accountant') === true && roleId.includes('admin') === false) {
          const a = acdata?.filter(i => i.accountant_id == getId)
          a?.forEach(el => {
            const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
            if(m.length>0){
            const me = { ...m }
            arr.push(Object.values(me)[0])
            }
          })
          setPortN(arr?.[0].portfolio_name)
          setResult(arr)
          btcdata(arr?.[0]?.portfolio_id)
          trondata(arr?.[0]?.portfolio_id)
         walletData(arr?.[0]?.portfolio_id)
        }else if(roleId.includes('admin')==true){
          setResult(rs);
          if (from!=undefined) {
            const p = rs?.filter((i) => i.portfolio_name == from)
            const pi = p?.[0]?.portfolio_id
            btcdata(pi)
           trondata(pi)
          walletData(pi)
            setPortN(from)
          } else{
         let d = rs?.[0]?.portfolio_id;
         setPortN(rs?.[0].portfolio_name)
         btcdata(d)
         trondata(d)
        walletData(d)
          }
    }
        const fr = rs?.filter((i) => i.portfolio_name == from)
        const fr1 = fr?.[0]?.portfolio_id
        const d = rs?.[0]?.portfolio_id
        // if (port_id!=undefined) { 
        //   const p = rs?.filter((i) => i.portfolio_id == port_id)
        //   setPortN(p?.[0]?.portfolio_name)
        //   const pi = p?.[0]?.portfolio_id
        //   walletData(p?.[0]?.portfolio_id)
        // } else
        
      })
      .catch(function (error) {
        // console.log(error)
      })
  }
  const handleChange = async (k) => {
    setPortN(k);
    var x = result.filter((p) => p.portfolio_name == k);
    let pi = x?.[0]?.portfolio_id
   await  trondata(pi)
    await btcdata(pi)
    await walletData(pi)
    
    
  };
  let acdata = []
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
      .then(function (response) {
        const p_data = response.data
        acdata = p_data
      })
  }
  useEffect(async () => {
    await accountant()
    await portfolioData()
    await wallet_data_json()
    // await handleAddWalletData()
      // if(loadData){
      //   document.body.style.opacity = 0.5;
      // } else {
      //   document.body.style.opacity = 1;
      // }
    
  }, [])

  const [walletIdAdd, setWalletIdAdd] = useState('')
  const [portfolioIdAdd, setPortfolioIdAdd] = useState('')
  const handleChangeWallet = (event) => {
    const x = walletDataInfo.filter((p) => p.wallet_name == event)
    setWalletIdAdd(x[0]?.walletId)
    setPortfolioIdAdd(x[0]?.portfolio_id)
  }
  
  const walletData = async (d) => {
    setLoading(true)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/portfolio_wallet_address`,
        params: {
          portfolio_id: d,
        },
      };
    await  axios(config).then(function (response1) {
      console.log(response1.data,tronD)
        if(response1.data!='error'){
        for(let a of response1.data){
          for(let b of tronD){
            if(a.wallet_id==b.wallet_id){
              a.address_list.push(b)
            }
          }
          for(let c of btcD){
            if(a.wallet_id==c.wallet_id){
              a.address_list.push(c)
            }
          }
        }
        // console.log('1',response1.data)
        if(response1.data.length==0){
          setResult3([])
          setLoading(false)
          setAlertNoRecord(true)
        }else{
            response1.data.sort((a, b) => {
              const x = new Date(a.timeStamp).getTime() / 1000
              const y = new Date(b.timeStamp).getTime() / 1000
              return x > y ? -1 : x < y ? 1 : 0
            })
          // console.log('1',response1.data)
          setResult3(response1.data)
          setLoading(false)
        }
        }else{
          setResult3([])
        }
      });
  };
  const addBtcTransaction=async(aid)=>{
    var config = {
      method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/btc_tranjaction`,
        data: {
          btc_address_id: aid,
          address_type:'BTC'
        },
      };
      await axios(config).then(function (response1) {
        if(response1.data){
          setLoadData(true)
          document.body.style.opacity = 1;
        setShowWallet(false)
        }
        
      })
  }
  const AddTronTransaction=(aid)=>{
  var config = {
  method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/all_trondata_transaction`,
    data: {
      address_id: aid,
      address_type:'TRON'
    },
  };
   axios(config).then(function (response1) {
    
        if(response1.data){
           document.body.style.opacity = 1;
          setLoadData(false)
          
            setShowWallet(false)
        }
  });
}
  const delete_asset = async () => {
    const d_id = w_data.portfolio_id
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/delete_wallet`,
      params: {
        walletId: w_data.wallet_id
      }
    }
    await axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        // console.log(error)
      })
    walletData(d_id)
  }
  
  const [dataSetWallet, setDataSetWallet] = useState([])
  const [walletEditAlert, setWalletEditAlert] = useState(false)
  const [alertWalletName, setAlertWalletName] = useState(false)
  const [addressTypeCheck, setAddressTypeCheck] = useState("")
  const [walletName, setWalletName] = useState('')
  const [walletPurpose, setWalletPurpose] = useState('')
  const handleWalletNameEdit = (row) => {
    setDataSetWallet(row)
    setWalletName(row.wallet_name)
    setWalletPurpose(row.wallet_purpose)
    setWalletEditAlert(true)
    setValidated(false)
  }
  const [isHoveringColor, setIsHoveringColor] = useState(false)
  const handleMouseEnterColor = () => {
    setIsHoveringColor(true)
  }
  const handleMouseLeaveColor = () => {
    setIsHoveringColor(false)
  }
  let walletArray=[]
  const wallet_data_json=async()=>{
    const js = localStorage.getItem('json')
    // console.log(js) 
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_elliptic_report`,
    };
  await  axios(config).then(function (response1) {
      let c=[]
      let d=[]
 for(const a of wallet_sample_data){
  const b = response1.data?.filter(i=>i.address_id==a?.Address)
  if(b.length>0){
  c.push(b[0])
  }
 }
 
  response1.data = response1.data.filter((_) =>  _.address_id != (c.filter((item) =>  _.address_id == item.address_id ))?.[0]?.['address_id'] )
//  for(let a of response1.data){
//   walletArray.push({'address_name':a.address_name,'address':a.address_id,'address_type':a.address_type,'date_updated':moment(a.date_updated).format('DD-MM-YYYY')})
//  }

      setWalletJson(walletArray)
 setAlertDownload(true)
      setTimeout(()=>{
        setAlertDownload(false)
  },3000)

  })
  }
  if(result3){

      for(let ab of result3){
        for(let a of ab.address_list){
  walletArray.push({'Wallet_name': ab.wallet_name,'wallet_purpose':ab.wallet_purpose,'Address_name':a.address_name,'Address':a.address_type=='BTC' ? a.btc_address_id : a.address_id,'Address_type':a.address_type,'Date':moment(a.date_updated).format('DD-MM-YYYY')})
 }
}
//  console.log(result3)
  }
  const elliptic_report=()=>{
      const headings = [[
           'Address_name','Address','Address_type','Date'
      ]];
      const wb = utils.book_new({cellText:true});
      const ws = utils.json_to_sheet([]);
       utils.sheet_add_aoa(ws, headings);
      utils.sheet_add_json(ws,  walletArray, { origin: 'A1', skipHeader:false ,cellDates:false,cellText:true, raw:false });
      utils.book_append_sheet(wb, ws,'Report');
       writeFile(wb, 'elliptic report.xlsx');
   
  }
//   console.log(walletJson, wallet_sample_data)
//   let c=[]
//  for(const a of wallet_sample_data){
//   const b = walletJson?.filter(i=>i.address_id==a.Address)
//   if(b.length>0){
//   c.push(b[0])
//   }
//  }
//  let d = walletJson.filter((_) =>  _.address_id != (c.filter((item) =>  _.address_id == item.address_id ))?.[0]?.['address_id'] )
//  console.log(d)
  const WalletNameEdit = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else if(walletName.trim()==='' || walletPurpose.trim()===''){
       setSpaceError(true)
       setTimeout(()=>{
        setSpaceError(false)
       },3000)
    }else {
      const m = result3?.filter(
        (i) =>
          i.wallet_name === walletName && i.wallet_id === dataSetWallet.wallet_id
      )
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/renameWallet`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          wallet_id: dataSetWallet.wallet_id,
          wallet_name: walletName, 
          wallet_purpose: walletPurpose
        }
      }
      await axios(config)
        .then(function (response) {
          if (response.data === 'Unable to Add Address.') {
            setAlreadyExist(true)
            setTimeout(() => {
              setAlreadyExist(false)
            }, 3000)
          } else {

            setAlertWalletName(true)
            setTimeout(() => {
              setAlertWalletName(false)
              setWalletEditAlert(false)
            }, 3000)
            trondata(dataSetWallet.portfolio_id)
            btcdata(dataSetWallet.portfolio_id)
            walletData(dataSetWallet.portfolio_id)
            // const config = {
            //   method: 'get',
            //   url: `${process.env.REACT_APP_BASE_URL}/portfolio_wallet_address`,
            //   params: {
            //     user_id: getId,
            //     portfolio_id: dataSetWallet?.portfolio_id
            //   }
            // }
            // axios(config).then(function (response1) {
            //   if (response1.data !== 'Cant Find') {
            //     setResult3(response1.data)
            //   } else {
            //     setResult3([])
            //   }
            // })
          }
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
  }
  const handleShowAddress = (id) => {
    const m = result?.filter((i) => i.portfolio_name == portN)
    setPortI(m?.[0]?.portfolio_id)
    let idx = id.id
    setAddressTypeCheck(id.address_type)
    setDataId(idx);
    setShowAddress(true)
  }
  const columns2 = [
    {
      dataField: 'wallet_name',
      text: 'Name',
       sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span >
            {row.wallet_name}
          </span>
        )
      }
    },
    {
      dataField: 'wallet_purpose',
      text: 'Purpose',
       sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            <span
              style={{ cursor: 'pointer', marginTop: '-2%' }}
            >
              {row.wallet_purpose.charAt(0).toUpperCase()+row.wallet_purpose.slice(1)}
            </span>
          </div>
        )
      }
    },
    {
      dataField: 'address_list',
      text: 'Address',
       sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul id="list_item">
            {row.address_list?.map((i) => (
              <li style={{ marginBottom:"3em", width:'99%' }}>
                <span style={{ display: 'flex' }}>
                  <span style={{ color: '#FFC107', marginLeft: '3%' }} >
                    {i.address_name}
                  </span>
                  <span style={{ marginLeft: '3%', cursor: 'pointer' }} onClick={() =>
                    navigate('/PMS/Admin/Transactions', { state: [{ id: 1, data: row, value: i.address_id }] })
                  }>{i.address_type==='TRON' || i.address_type==null ? i.tron_address_id  : (i.address_type==='BTC' ? i.btc_address_id : i.address_id)}</span>
                  <span style={{ color: '#FFC107', marginLeft: '3%' }}>
                    {' '}
                    ({i.address_type})
                  </span>
                  {roleId.includes('admin') === true
                    ? (
                      <span
                        style={{
                          cursor: 'pointer',
                          color: 'red',
                          marginLeft: '3%'
                        }}
                        onClick={() =>  handleShowAddress({'id':i.address_type==='TRON' || i.address_type==null ? i.tron_address_id : (i.address_type==='BTC' ? i.btc_address_id : i.address_id), 'address_type':i.address_type})}
                      >
                        <DeleteOutlineOutlinedIcon style={{ fontSize: '20px' }} />
                      </span>
                      )
                    : (
                      <></>
                      )}
                </span>
              </li>
            ))}
          </ul>
        )
      }
    },
    {
      dataField: 'wallet_risk',
      text: 'Wallet-risk',
      //  sort: true,
      style:{paddingLeft:'8rem'},
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{marginTop:"-1.7em"}}>
          {
          row.address_list?.map(e=>
            e.address_type=="ETH" ?
            wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk!=undefined ? 
              <div style={{width:'2.5rem',marginLeft:'10%',marginTop:"1.8em"}}>
                 {parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)>=8.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=10.00 ?
              <CircularProgressbar  styles={buildStyles({
                 pathColor: `#b30000`,
                 textColor: '#b30000',
                 
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> :
                parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)>=5.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=7.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#E7AF0F`,
                  textColor: '#E7AF0F',
                
                })}
                 text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> :
                 parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)>=1.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=4.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#0B8903`,
                  textColor: '#0B8903',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> :
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#FFFBFB`,
                  textColor: '#FFFBFB',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> 

              } 
              
              </div>
              :
              <div style={{width:'10%',marginLeft:'10%',marginTop:"1.8em"}}>
              <BlockOutlinedIcon style={{fontSize:'2.5rem'}}/>
                  </div>
          : e.address_type=="BTC" ?
          wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk!=undefined ? 
          <div style={{width:'2.5rem',marginLeft:'10%',marginTop:"1.8em"}}>
             {parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)>=8.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)<=10.00 ?
          <CircularProgressbar  styles={buildStyles({
             pathColor: `#b30000`,
             textColor: '#b30000',
             
            })}
            text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> :
            parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)>=5.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)<=7.00 ?
            <CircularProgressbar   styles={buildStyles({
              pathColor: `#E7AF0F`,
              textColor: '#E7AF0F',
            
            })}
             text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> :
             parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)>=1.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)<=4.00 ?
            <CircularProgressbar   styles={buildStyles({
              pathColor: `#0B8903`,
              textColor: '#0B8903',
            })}
            text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> :
            <CircularProgressbar   styles={buildStyles({
              pathColor: `#FFFBFB`,
              textColor: '#FFFBFB',
            })}
            text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> 

          } 
          
          </div>
          :
          <div style={{width:'10%',marginLeft:'10%',marginTop:"1.8em"}}>
          <BlockOutlinedIcon style={{fontSize:'2.5rem'}}/>
              </div> :
              wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk!=undefined ? 
              <div style={{width:'2.5rem',marginLeft:'10%',marginTop:"1.8em"}}>
                 {parseInt(wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk)>=8.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=10.00 ?
              <CircularProgressbar  styles={buildStyles({
                 pathColor: `#b30000`,
                 textColor: '#b30000',
                 
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> :
                parseInt(wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk)>=5.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=7.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#E7AF0F`,
                  textColor: '#E7AF0F',
                
                })}
                 text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> :
                 parseInt(wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk)>=1.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=4.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#0B8903`,
                  textColor: '#0B8903',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> :
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#FFFBFB`,
                  textColor: '#FFFBFB',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> 
    
              } 
              
              </div>
              :
              <div style={{width:'10%',marginLeft:'10%',marginTop:"1.8em"}}>
              <BlockOutlinedIcon style={{fontSize:'2.5rem'}}/>
                  </div> 
          )}
        
          </div> 
        )
      }
    }, 
  ]

  const columns = [
    {
      dataField: 'wallet_name',
      text: 'Name',
       sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            <span style={{ cursor: 'pointer', marginTop: '-2%' }}>
              {row.wallet_name.charAt(0).toUpperCase()+row.wallet_name.slice(1)}
            </span>
          </div>
        )
      }
    },
    {
      dataField: 'wallet_purpose',
      text: 'Purpose',
       sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            <span
              style={{  cursor: 'pointer', marginTop: '-2%' }}
            >
              {row.wallet_purpose.charAt(0).toUpperCase()+row.wallet_purpose.slice(1)}
            </span>
          </div>
        )
      }
    },
    {
      dataField: 'address_list',
      text: 'Address',
       sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {row.address_list?.map((i) => (
              <li style={{  color: '#FFC107',marginBottom:"3em", width:'99%',whiteSpace:'nowrap' }}>
                <span style={{ color: '#FFC107' }} >{i.address_name.charAt(0).toUpperCase()+i.address_name.slice(1)} </span>
                <span className="namePortData" style={{ cursor: 'pointer', marginLeft: '3%' }}
                  onClick={() => navigate('/PMS/Admin/Transactions', { state: { id: 1, data: row, value: i.address_type==='BTC' ? i.btc_address_id : i.address_id } })}>
                 {i.address_type==='TRON' || i.address_type==null ? i.tron_address_id : (i.address_type==='ETH' ? i.address_id : i.btc_address_id)}
                </span>
                <span style={{ color: '#FFC107', marginLeft:'3%' }}>
                  {' '}
                  ({i.address_type})
                </span>
                <Tooltip title="Delete Address">
                  <span
                    style={{
                      cursor: 'pointer',
                      color: '#b30000',
                       float:'right',
                       marginRight:'-10px'
            
                    }}
                    onClick={() => handleShowAddress({'id':i.address_type==='TRON' || i.address_type==null ? i.address_id : (i.address_type==='BTC' ? i.btc_address_id : i.address_id), 'address_type':i.address_type})}
                  >
                    <DeleteOutlineOutlinedIcon style={{ fontSize: '20px' }} />
                  </span>
                </Tooltip>
              </li>
            ))}
          </ul>
        )
      }
    },
    {
      dataField: 'wallet_risk',
      text: 'Wallet-risk',
      // sort: true,
      width:150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
      // let a = wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk
        return (
          <div style={{marginTop:"-1.7em"}}>
          {
          row.address_list?.map(e=>
            e.address_type=="ETH" ?
            wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk!=undefined ? 
              <div style={{width:'2.5rem',marginLeft:'10%',marginTop:"1.8em"}}>
                 {parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)>=8.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=10.00 ?
              <CircularProgressbar  styles={buildStyles({
                 pathColor: `#b30000`,
                 textColor: '#b30000',
                 
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> :
                parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)>=5.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=7.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#E7AF0F`,
                  textColor: '#E7AF0F',
                
                })}
                 text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> :
                 parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)>=1.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=4.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#0B8903`,
                  textColor: '#0B8903',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> :
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#FFFBFB`,
                  textColor: '#FFFBFB',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk}`} /> 

              } 
              
              </div>
              :
              <div style={{width:'10%',marginLeft:'10%',marginTop:"1.8em"}}>
              <BlockOutlinedIcon style={{fontSize:'2.5rem'}}/>
                  </div>
          : e.address_type=="BTC" ?
          wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk!=undefined ? 
          <div style={{width:'2.5rem',marginLeft:'10%',marginTop:"1.8em"}}>
             {parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)>=8.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)<=10.00 ?
          <CircularProgressbar  styles={buildStyles({
             pathColor: `#b30000`,
             textColor: '#b30000',
             
            })}
            text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> :
            parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)>=5.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)<=7.00 ?
            <CircularProgressbar   styles={buildStyles({
              pathColor: `#E7AF0F`,
              textColor: '#E7AF0F',
            
            })}
             text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> :
             parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)>=1.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk)<=4.00 ?
            <CircularProgressbar   styles={buildStyles({
              pathColor: `#0B8903`,
              textColor: '#0B8903',
            })}
            text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> :
            <CircularProgressbar   styles={buildStyles({
              pathColor: `#FFFBFB`,
              textColor: '#FFFBFB',
            })}
            text={`${wallet_sample_data.filter(obj=> obj.Address===e.btc_address_id)[0]?.WalletRisk}`} /> 

          } 
          
          </div>
          :
          <div style={{width:'10%',marginLeft:'10%',marginTop:"1.8em"}}>
          <BlockOutlinedIcon style={{fontSize:'2.5rem'}}/>
              </div> :
              wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk!=undefined ? 
              <div style={{width:'2.5rem',marginLeft:'10%',marginTop:"1.8em"}}>
                 {parseInt(wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk)>=8.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=10.00 ?
              <CircularProgressbar  styles={buildStyles({
                 pathColor: `#b30000`,
                 textColor: '#b30000',
                 
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> :
                parseInt(wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk)>=5.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=7.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#E7AF0F`,
                  textColor: '#E7AF0F',
                
                })}
                 text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> :
                 parseInt(wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk)>=1.00 &&  parseInt(wallet_sample_data.filter(obj=> obj.Address===e.address_id)[0]?.WalletRisk)<=4.00 ?
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#0B8903`,
                  textColor: '#0B8903',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> :
                <CircularProgressbar   styles={buildStyles({
                  pathColor: `#FFFBFB`,
                  textColor: '#FFFBFB',
                })}
                text={`${wallet_sample_data.filter(obj=> obj.Address===e.tron_address_id)[0]?.WalletRisk}`} /> 
    
              } 
              
              </div>
              :
              <div style={{width:'10%',marginLeft:'10%',marginTop:"1.8em"}}>
              <BlockOutlinedIcon style={{fontSize:'2.5rem'}}/>
                  </div> 
          )}
        
          </div> 
        )
      }
    }, 
    {
      dataField: 'action',
      text: 'Action',
      // sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div
              style={{
                cursor: 'pointer',
                lineHeight: 'normal',
                // textAlign:'center'
              }}
            >
              <Dropdown alignRight={true}>
                <Dropdown.Toggle
                  id={'options-button'}
                  variant="borderless-dark"
                  bsPrefix="no-chevron"
                  style={{ color: '#FFC107', fontSize: '25px' }}
                >
                  ...
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    willChange: 'transform',
                     background: '#222429',
                     borderColor: 'white'
                  }}
                >
                  {roleId.includes('admin') === true
                    ? (
                      <Dropdown.Item
                        href="#"
                        onClick={() => handleWalletNameEdit(row)}
                      >
                        <EditOutlinedIcon
                          style={{
                            fontSize: '14px',
                            color: '#FFC107',
                            marginRight: '4px',
                            marginLeft: '-15px',
                            marginTop: '-3px'
                          }}
                        />
                        <span>Edit wallet</span>
                      </Dropdown.Item>
                      )
                    : (
                      <></>
                      )}
                  {roleId.includes('admin') === true
                    ? (
                      <Dropdown.Item href="#" onClick={() => handleShow(row)}>
                        <DeleteOutlineOutlinedIcon
                          style={{
                            fontSize: '14px',
                            color: '#FFC107',
                            marginRight: '4px',
                            marginLeft: '-15px',
                            marginTop: '-3px'
                          }}
                        />
                        <span>Delete wallet</span>
                      </Dropdown.Item>
                      )
                    : (
                      <></>
                      )}
                  {roleId.includes('admin') === true
                    ? (
                      <Dropdown.Item href="#" onClick={() => handleAddress(row)}>
                        <AddCircleOutlineOutlinedIcon
                          style={{
                            fontSize: '14px',
                            color: '#FFC107',
                            marginRight: '4px',
                            marginLeft: '-15px',
                            marginTop: '-3px'
                          }}
                        />
                        <span>Add address</span>
                      </Dropdown.Item>
                      )
                    : (
                      <></>
                      )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>
        )
      }
    }
  ]
  const [alert, setAlert] = useState(false)
  const [alertN, setAlertN] = useState(false)
  const [alert2, setAlert2] = useState(false)
  const [addr_id, setAddr_id] = useState('')
  const [addressT, setAddressT] = useState("");
  const [addr_name, setAddr_name] = useState('')
  const [showWallet, setShowWallet] = useState(false)
  const [validated, setValidated] = useState(false)
  const [alreadyExist, setAlreadyExist] = useState(false)
  const [spaceError, setSpaceError]= useState(false)
  const handleCloseExit = () => {
    setAlreadyExist(false)
  }

  const handleAddress = (id) => {
    setWalletIdAdd(id.wallet_id)
    setPortfolioIdAdd(id.portfolio_id)
    setShowWallet(true)
    setAddressT('')
    setDisabledButton('')
    setValidated(false)
  }
  const handleClose2 = () => {
    setAlert(false)
  }
  const handleClose3 = () => {
    setAlert2(false)
  }
  const handleCloseWallet = () => {
    setShowWallet(false)
  }
  const [alertAddressValidate, setAlertAddressValidate] = useState(false)
  const handleClose2Validate = () => {
    setAlertAddressValidate(false)
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/address_validate`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          address_id: addr_id,
          address_type:addressT=='TRON' ? 'TRX' : addressT=='ETH' ? 'ETH' : 'BTC',
        }
      }
      await axios(config)
        .then(function (response) {
          setDisabledButton('This is a valid address')
          if (response.data === 'This is a valid address') {
            if (addressT == 'ETH') {
              setLoadData(true)
              document.body.style.opacity = 0.5;
              setAddr_id('')
              const config = {
                method: 'post',
                url: `${process.env.REACT_APP_BASE_URL}/debank_fetch/add_address`,
                headers: {
                  'Content-Type': 'application/json'
                }, 
                data: {
                  portfolio_id: portfolioIdAdd,
                  wallet_id: walletIdAdd,
                  address_id: addr_id,
                  address_name: addr_name,
                  address_type: addressT
                }
              }
              axios(config).then(function (response1) {
                if (response1.data!='Address Already Exist With Another Wallet') {
                  document.body.style.opacity = 1;
                  setAlert(true)
                  trondata(portfolioIdAdd)
                  walletData(portfolioIdAdd)
                  setLoadData(false)
                  add_elliptic_report(portfolioIdAdd,walletIdAdd,addr_id,addr_name,addressT)
                  setTimeout(() => setAlert(false), 3000)
                  setTimeout(() => setShowWallet(false), 5000)
                } 
                else if (
                  response1.data === 'Address Already Exist With Another Wallet'
                ) {
                  document.body.style.opacity = 1;
                  setAlert2(true)
                  setLoadData(false)
                  trondata(portfolioIdAdd)
                  walletData(portfolioIdAdd)
                 
                  setTimeout(() => setAlert2(false), 3000)
                  setTimeout(() => setShowWallet(false), 3000)
                } else if (response1.data != 'Updated') {
                  trondata(portfolioIdAdd)
                  walletData(portfolioIdAdd)
                  setTimeout(() => setShowWallet(false), 3000)
                }
              })
            } else if (addressT == 'TRON') {
              let t = tronD.filter(i=>i.address_id==addr_id)
              // if(t.length>0){
              //   setAlert2(true)
              //   trondata(portfolioIdAdd)
              //   btcdata(portfolioIdAdd)
              //   walletData(portfolioIdAdd)
              //   setTimeout(() => setAlert2(false), 3000)
              //   setTimeout(() => setShowWallet(false), 3000)
              // }
              // else{
              const config = {
                method: 'post',
                url: `${process.env.REACT_APP_BASE_URL}/add_tron_balance`,
                headers: {
                  'Content-Type': 'application/json'
                },
                data: {
                  portfolio_id: portfolioIdAdd,
                  wallet_id: walletIdAdd,
                  address_id: addr_id,
                  address_name: addr_name,
                  address_type: addressT
                }
              }
              axios(config).then(function (response1) {
                if(response1.data=='Address Already Exist With Another Wallet or Portfolio'){
                    setAlert2(true)
                    setTimeout(() => setAlert2(false), 3000)
                    setTimeout(() => setShowWallet(false), 3000)
                }else{
                  setAlert(true)
                   document.body.style.opacity = 0.5;
                  setAddr_id('')
                  setLoadData(true)
                trondata(portfolioIdAdd)
                btcdata(portfolioIdAdd)
                walletData(portfolioIdAdd)
                AddTronTransaction(addr_id)
                add_elliptic_report(portfolioIdAdd,walletIdAdd,addr_id,addr_name,addressT)
                setTimeout(() => setAlert(false), 3000)
               
                }
              })
            // }
            }else if (addressT == 'BTC') {
              // let b = btcD.filter(i=>i.btc_address_id==addr_id)
              // if(b.length>0){
              //   // console.log(b)
              //   setAlert2(true)
              //     trondata(portfolioIdAdd)
              //     btcdata(portfolioIdAdd)
              //     walletData(portfolioIdAdd)
                 
              //     setTimeout(() => setAlert2(false), 3000)
              //     setTimeout(() => setShowWallet(false), 3000)
              // }else{
              const config = {
                method: 'post',
                url: `${process.env.REACT_APP_BASE_URL}/add_btc_balance`,
                headers: {
                  'Content-Type': 'application/json'
                },
                data: {
                  portfolio_id: portfolioIdAdd,
                  wallet_id: walletIdAdd,
                  btc_address_id: addr_id,
                  address_name: addr_name,
                  address_type: addressT
                }
              }
              axios(config).then(function (response2) {
                if(response2.data=='Address Already Exist With Another Wallet or Portfolio'){
                  setAlert2(true)
                  setTimeout(() => setAlert2(false), 3000)
                  setTimeout(() => setShowWallet(false), 3000)
              }else{
                setAlert(true)
                document.body.style.opacity = 0.5;
                setAddr_id('')
                setLoadData(true)
                btcdata(portfolioIdAdd)
                trondata(portfolioIdAdd)
                walletData(portfolioIdAdd)
                addBtcTransaction(addr_id)
                // AddTronTransaction(addr_id)
                add_elliptic_report(portfolioIdAdd,walletIdAdd,addr_id,addr_name,addressT)
                setTimeout(() => setAlert(false), 3000)
               
              }
              })
            }
            // }
          } else {
            setAlertAddressValidate(true)
            setTimeout(() => {
              setAlertAddressValidate(false)
              // setShowWallet(false)
            }, 3000)
          }
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    setValidated(true)
  }
  const add_elliptic_report=(pi,wi,ai,an,at)=>{
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/elliptic_report`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        portfolio_id: pi,
        wallet_id: wi,
        address_id: ai,
        address_name: an,
        address_type: at
      }
    }
    axios(config).then(function (response1) {
    })
  }
  const [showWalletsData, setShowWalletsData] = useState(false)
  const handleCloseWalletsData = () => setShowWalletsData(false)
  const handleSubmitFormWallet = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
  }
  const [alertWallet, setAlertWallet] = useState(false)
  const handleCloseWallet2 = () => {
    setAlertWallet(false)
  }
  const [w_name, setw_name] = useState('')
  const [w_purpose, setw_purpose] = useState('')
  const handleShowWallets = () => {
    const x = result?.filter((i) => i.portfolio_name == portN)
    setPortI(x?.[0]?.portfolio_id)
    setDisabledButton('')
    setShowWalletsData(true)
    setValidated(false)
    setw_purpose('')
  }
  const handleAddWalletData = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else if( w_name.trim()=='' || w_purpose.trim()=='' ) {
      // console.log('no')
      setSpaceError(true)
            setTimeout(() => setSpaceError(false), 3000)
            // setTimeout(() => setShowWalletsData(false), 3000)
      // setTimeout(() => setSpaceError(false), 3000)
      // setTimeout(() => setShowWalletsData(false), 3000)
    }else{
      const configPostCreateWallet = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/create_wallet`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          portfolio_id: portI,
          walletName: w_name,
          wallet_purpose: w_purpose
        }
      }
      await axios(configPostCreateWallet)
        .then(function (response) {
          if (response.data === 'ALREADY EXIST') {
            // walletData(portI)
            // trondata(portfolioIdAdd)
            setAlreadyExist(true)
            setTimeout(() => setAlreadyExist(false), 3000)
            // setTimeout(() => setShowWalletsData(false), 3000)
          } else {
            walletData(portI)
            trondata(portfolioIdAdd)
            setAlertWallet(true)
             setTimeout(() => setAlertWallet(false), 3000)
            setTimeout(() => setShowWalletsData(false), 3000)
          }
        })
        .catch(function (error) {
          // console.log(error)
        })
      // const configGetPortfolioWalletAddress = {
      //   method: 'get',
      //   url: `${process.env.REACT_APP_BASE_URL}/portfolio_wallet_address`,
      //   params: {
      //     user_id: getId,
      //     portfolio_id: portN
      //   }
      // }
      // await axios(configGetPortfolioWalletAddress).then(function (response1) {
      //   setResult3(response1.data)
      // })
    }
  }

  return (
    <React.Fragment>
      <Container fluid>
        {/* <Row className="justify-content-end">
          <Header />
        </Row> */}
        <Row>
          {/* <Col md={2} className="justify-content-md-center">
            <SidebarAdmin />
          </Col> */}
          <Col lg={12}>
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Wallets</h3>
              </span>
              {roleId.includes('admin') === true
                ? (
                  <span className="p-2 pageheader">
                    <Link
                      to="#"
                      style={{
                        marginLeft: '9px',
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'none',
                        color: '#FFC107',
                        top:'11px',
                        position:'relative'
                      }}
                      onClick={handleShowWallets}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Link>
                  </span>
                  )
                : (
                  <></>
                  )}
              <span
                className="p-2 pageheader" 
                onClick={() =>
                  navigate('/PMS/Admin/Transactions', {
                    state: { id: 1, data2: portN }
                  })
                }
                onMouseEnter={handleMouseEnterColor}
                onMouseLeave={handleMouseLeaveColor}
                style={{
                  background: 'transparent',
                  color: '#FFC107',
                  cursor:'pointer',
                  top:'11px',
                  position:'relative'
                }}
              >
                <Tooltip title="Transaction History">
                  <ReceiptLongIcon />
                </Tooltip>
              </span>
                
              <Autocomplete
                className="p-2 pageheader"
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper
                    style={{
                      background: 'rgb(31, 33, 37)',
                      color: 'white'
                    }}
                  >
                    {children}
                  </Paper>
                )}
                value={portN}
                id="combo-box-demo"
                options={result?.map((e) => e.portfolio_name)}
                style={{
                  fill: '#d9d9d9 !important',
                  boxShadow: 'none',
                  borderRadius: '30%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '239px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid #d9d9d9 !important',
                    left: '4px'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                   top:'-6px'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: '#d9d9d9' }}
                    label="Portfolios"
                  />
                )}
                onChange={(e, k) => {
                  handleChange(k)
                }}
              />
              {/* <div  className=" p-2 pageheader" style={{right:'13rem', position:'fixed'}} >
              <Badge badgeContent={4} color="primary" >
              <MailIcon color="action" style={{color:'#F1C40F'}} />
              </Badge>
              </div> */}
              {/* <div  className=" p-2 pageheader" >
              <Dropdown alignRight={true}>
                <Dropdown.Toggle
                  id={'options-button'}
                  variant="borderless-dark"
                  bsPrefix="no-chevron"
                  style={{ color: '#F1C40F', fontSize: '25px', right:'12rem',marginTop:'-0.4em', position:'fixed' }}
                >
                  <Badge badgeContent={4} color="primary" >
              <MailIcon color="action" style={{color:'#F1C40F'}} />
              </Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    willChange: 'transform',
                    background: '#1f2125',
                    borderColor: 'white'
                  }}
                >
                      <span style={{color:'white'}}>new Address added</span>
                </Dropdown.Menu>
              </Dropdown>
            </div>  */}
              <div  className=" p-2 pageheader"
              style={{color:'#FFC107', cursor:'pointer', right:'10rem', position:'fixed', top:'46px'}}
              onClick={elliptic_report} >
              <SystemUpdateAltOutlinedIcon/>
              </div>
              <SearchBox
               
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = result3?.filter((i) =>
                    i.wallet_name.toLowerCase().includes(event.target.value.toLowerCase())
                  ||  i.wallet_purpose.toLowerCase().includes(event.target.value.toLowerCase())
                 || i.address_list?.[0]?.address_name.toLowerCase().includes(event.target.value.toLowerCase())
                 || i.address_list?.[1]?.address_name.toLowerCase().includes(event.target.value.toLowerCase())
                 )
                  setSearch(x)
                }}
              />
            </Row>
            
            {alertDownload
            ? (
              <Snackbar
                open={alertDownload}
                onClose={()=>setAlertDownload(false)}
                 anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
              >
                <Alert
                  onClose={setAlertDownload(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Elliptic report downloaded
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
             {loading
              ? (
                <Spinner
                  style={{
                  position:'fixed',
                  top:'20em',
                  left:'59%',
                    height: '70px',
                    width: '70px'
                  }}
                  animation="border"
                  variant="primary"
                />
                )
              : null}
            {sea
              ? (
                <CommonTableWallet
                  data={search}
                  loading={loading}
                  columns={roleId.includes('admin') === true ? columns : columns2}
                />
                )
              : (
                <CommonTableWallet
                  data={result3}
                  loading={loading}
                  columns={roleId.includes('admin') === true ? columns : columns2}
                />
                )}
          </Col>
        </Row>
      </Container>
      <Modal
        show={showAddress}
        onHide={handleCloseAddress}
        style={{
          width: '30rem',
          marginTop: '17rem',
          overflow: 'hidden',
          marginLeft: '35%',
          backgroundColor: '#222429',
          height: '8rem',
          border: '1px solid white',
          borderRadius: '15px'
        }}
      >
        <Modal.Header
          style={{ backgroundColor: '#222429', border: 'none' }}
        >
          <Modal.Title
            style={{
              color: 'white',
              fontSize: '18px',
              marginTop: '-5%',
              marginLeft: '11%'
            }}
          >
            Are you sure you want to Delete this Address ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: '#222429',
            borderTop: 'none',
            paddingRight: '34%',
            marginTop: '-4%'
          }}
        >
          <Button
           variant="success"
            style={{ width: '25%',backgroundColor: '#006400' }}
            onClick={() => {
              handleDeleteUpdate2()
              handleCloseAddress()
            }}
          >
            Yes
          </Button>
          <Button
           variant="danger"
            onClick={handleCloseAddress}
            style={{ width: '25%', backgroundColor: '#b30000' }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          width: '30rem',
          marginTop: '17rem',
          overflow: 'hidden',
          marginLeft: '35%',
          backgroundColor: '#222429',
          height: '8rem',
          border: '1px solid white',
          borderRadius: '15px'
        }}
      >
        <Modal.Header
          style={{ backgroundColor: '#222429', border: 'none' }}
        >
          <Modal.Title
            style={{
              color: 'white',
              fontSize: '18px',
              marginTop: '-5%',
              marginLeft: '11%'
            }}
          >
            Are you sure you want to Delete this wallet ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: '#222429',
            borderTop: 'none',
            paddingRight: '34%',
            marginTop: '-4%'
          }}
        >
          <Button
            variant="success"
            style={{ width: '25%',backgroundColor: '#006400'
          
          }}
            onClick={() => {
              delete_asset()
              handleClose()
            }}
          >
            Yes
          </Button>
          <Button
             variant="danger"
            onClick={handleClose}
            style={{ width: '25%',backgroundColor: '#b30000'  }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showWallet}
        // onHide={handleCloseWallet}
        style={{ width: '28%', marginLeft: '35%' }} >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header style={{ background: '#222429', border: 'none' }}>
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
               disabled={disabledButton=='This is a valid address'}
              onClick={() => setShowWallet(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form form-flow"
              noValidate
              validated={validated}
              onSubmit={handleSubmitForm} >
              <h4>
                Add Address
              </h4>

              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': addr_name
                })}
                style={{ width: '17rem' }}>
                <Form.Control
                  type="text"
                  id="name"
                  name="address_id"
                  placeholder="Name"
                  onChange={(e) => setAddr_name(e.target.value)}
                  required />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: '25%' }} >
                  Address Name Required.
                </Form.Control.Feedback>
              </Form.Label>
              <FormControl
                style={{
                  width: '17rem',
                  marginBottom: '23px'
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '17px',
                    overflow: 'visible',
                    color: 'grey'
                  }}
                >
                  {' '}
                  Type
                </InputLabel>

                <Select
                  MenuProps={{
                    classes: {
                      paper: styles.paper
                    },
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root:hover': {
                          backgroundColor: 'lightgrey',
                          color: 'black'
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                          backgroundColor: 'lightgrey',
                          color: 'black'
                        }
                      }
                    }
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addressT}
                  label="Select"
                  style={{
                    // width:"239px",
                    height: '54px',
                    borderRadius: '15px',
                    boxShadow: 'none'
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                       borderRadius: '0px',
                        height:'54px',
                         border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset',
                        
                    },
                    '.MuiInputLabel-root': {
                      color: 'white !important'
                    },
                    '.MuiSelect-icon': {
                      fill: 'white !important'
                    },
                    ".MuiOutlinedInput-input": {
                      color: "white !important",
                       fontSize: "15px",
                      //  backgroundColor:'white',
                       paddingBottom:'13px',
                       paddingRight:'61%',
                       paddingTop:'12px',
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={(e) => setAddressT(e.target.value)}
                >
                  <MenuItem value={'BTC'}>BTC</MenuItem>
                  <MenuItem value={'ETH'}>ERC20/ETH</MenuItem>
                  <MenuItem value={'TRON'}>TRC20/TRON</MenuItem>
                </Select>
              </FormControl>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': addr_id
                })}
                style={{ width: '17rem' }}>
                <Form.Control
                  type="text"
                  id="name"
                  name="address_id"
                  placeholder="Address-id"
                  onChange={(e) => setAddr_id(e.target.value)}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ marginLeft: '25%' }}
                >
                  Address Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                disabled={disabledButton=='This is a valid address'}
                variant=""
                className="btn-gray"
                style={{ width: '50%', boxShadow: 'none' }}
              >
                Save
              </Button>
            </Form>
            
             {loadData ? 
             <Loader/>  
             : <></> 
              }
          </Modal.Body>
          {alert
            ? (
              <Snackbar
                open={alert}
                onClose={handleClose2}
                  anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
              >
                <Alert
                  onClose={handleClose2}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                 Address added successfully
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
          {alertN ? (
            <Snackbar
              open={alertN}
              // autoHideDuration={4000}
              onClose={handleClose2}
                anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
            >
              <Alert
                onClose={handleClose2}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                please try again later
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
          {alert2 ? (
            <Snackbar
              open={alert2}
              // autoHideDuration={4000}
              onClose={handleClose3}
               anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
            >
              <Alert
                onClose={handleClose3}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Address already exist with another wallet/portfolio
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
          {alertAddressValidate ? (
            <Snackbar
              open={alertAddressValidate}
              // autoHideDuration={4000}
              onClose={handleClose2Validate}
                anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
            >
              <Alert
                onClose={handleClose2Validate}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Invalid Address
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
              
        </div>
      </Modal>
      <Modal
        show={walletEditAlert}
        style={{ width: '28%', marginLeft: '35%' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header style={{ background: '#222429', border: 'none' }}>
            {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
              onClick={() => setWalletEditAlert(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={WalletNameEdit}
            >
              <h4>
                Update Wallet
              </h4>
              <span
                style={{
                  color: 'white',
                  // marginLeft: '52px',
                  fontWeight: '600'
                }}
              >
                Portfolio name -{' '}
                <span style={{ marginLeft: '2px' }}>{portN}</span>
              </span>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': walletName
                })}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="address_id"
                  placeholder="wallet name"
                  value={walletName}
                  onChange={(e) => setWalletName(e.target.value)}
                  required
                  style={{ width: '72%', marginLeft: '15%' }}
                />

                <Form.Control.Feedback
                  type="invalid"
                >
                  Wallet name is required
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': walletName
                })}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="address_id"
                  placeholder="wallet purpose"
                  value={walletPurpose}
                  onChange={(e) => setWalletPurpose(e.target.value)}
                  required
                  style={{ width: '72%', marginLeft: '15%' }}
                />

                <Form.Control.Feedback
                  type="invalid"
                >
                  Wallet purpose is required
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                // onClick={WalletNameEdit}
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  boxShadow: 'none'
                }}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
          {alertWalletName ? (
            <Snackbar
              open={alertWalletName}
              // autoHideDuration={4000}
              onClose={() => setAlertWalletName(false)}
                anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
            >
              <Alert
                onClose={() => setAlertWalletName(false)}
                severity="success"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Wallet Updated successfully
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
              {spaceError ? (
            <Snackbar
              open={spaceError}
              // autoHideDuration={4000}
              onClose={() => setSpaceError(false)}
                anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                      
            >
              <Alert
                onClose={() => setSpaceError(false)}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Please enter valid input
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
          {alreadyExist ? (
            <Snackbar
              open={alreadyExist}
              // autoHideDuration={4000}
              onClose={() => setAlreadyExist(false)}
               anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
            >
              <Alert
                onClose={() => setAlreadyExist(false)}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Wallet name already exist
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
             
        </div>
      </Modal>
      <Modal
        show={showWalletsData}
        onHide={handleCloseWalletsData}
        style={{ width: '28%', marginLeft: '35%' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
              onClick={() => setShowWalletsData(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleAddWalletData}
            >
              <h4>
                Add Wallet
              </h4>
              <span
                style={{
                  color: 'white',
                  // marginLeft: '52px',
                  fontWeight: '600'
                }}
              >
                Portfolio name -{' '}
                <span style={{ marginLeft: '2px' }}>{portN}</span>
              </span>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': w_name
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="walletName"
                  placeholder="Name"
                  onChange={(e) => setw_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Wallet name is required
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': w_purpose
                })}
                style={{
                  width: '72%',
                  marginBottom: '10%',
                  marginLeft: '15%',
                  marginTop: '-2%'
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="wallet_purpose"
                  placeholder="Purpose"
                  onChange={(e) => setw_purpose(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Wallet purpose is  required
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  marginTop: '-3%',
                  boxShadow: 'none'
                }}
              //  onClick={handleAddWalletData}
              >
                Save
              </Button>
              {alertWallet ? (
                <Snackbar
                  open={alertWallet}
                  // autoHideDuration={4000}
                  onClose={handleCloseWallet2}
                   anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                >
                  <Alert
                    onClose={handleCloseWallet2}
                    severity="success"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                  Wallet added successfully
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
                   {spaceError ? (
            <Snackbar
              open={spaceError}
              // autoHideDuration={4000}
              onClose={() => setSpaceError(false)}
                anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                      
            >
              <Alert
                onClose={() => setSpaceError(false)}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Please enter valid input
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
              {alreadyExist ? (
                <Snackbar
                  open={alreadyExist}
                  // autoHideDuration={4000}
                  onClose={handleCloseExit}
                   anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                >
                  <Alert
                    onClose={handleCloseExit}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Wallet Already Exist
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
            </Form>
          </Modal.Body>
        </div>
      </Modal> 
      {/* <Modal
        show={alertNoRecord}
        onHide={()=>setAlertNoRecord(false)}
        style={{
          width: '14rem',
          marginTop: '17rem',
          overflow: 'hidden',
          marginLeft: '45%',
          backgroundColor: '#222429',
          height: '8rem',
          border: '1px solid white',
          borderRadius: '15px'
        }}
      >
        <Modal.Header
          style={{ backgroundColor: '#222429', border: 'none' }}
        >
          <Modal.Title
            style={{
              color: 'white',
              fontSize: '18px',
              marginTop: '-13%',
              marginLeft: '15%',
              fontWeight:'bold'
            }}
          >
            No record found.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: '#222429',
            borderTop: 'none',
            paddingRight: '34%',
            paddingTop:'0%',
            // marginTop: '-10%',
            width:'19.5em',
            justifyContent:'center'
          }}
        >
          <button
          //  variant="success"
           className='no-record-found'
          
            onClick={() => {
              setAlertNoRecord(false)
            }}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal> */}
    </React.Fragment>
  )
}

export default MainManageAssetsWallets