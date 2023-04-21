import React, { useState, useEffect } from 'react'
import CommonTable from '../../common/CommonTable/CommonTable'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import cx from 'classnames'
import Spinner from '../../common/spinner'
import { v4 as uuidv4 } from 'uuid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Header from '../../common/Header/Header'
import SearchBox from '../../common/SearchBox/SearchBox'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
import moment from 'moment'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import { Alert, TextField, Tooltip } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Snackbar from '@mui/material/Snackbar'
import Paper from '@material-ui/core/Paper'
import { styled, lighten, darken } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles'
const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
   color: 'white',
   fontWeight:'bold'
  // backgroundColor: 'darkgrey'
    // theme.palette.mode === 'light'
      // ? lighten(theme.palette.primary.light, 0.85)
      // : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled('li')({
  padding: 0,
  paddingLeft:'2rem'
});
const useStyles = makeStyles({
  option: {
    '&:hover': {
      backgroundColor: 'rgb(31, 33, 37) !important',
      color: 'white !important'
    }
  }
})
let record
function Investment () {
  const location = useLocation()
   let investData = location.state?.invData
  //  console.log(investData)
  const styles = useStyles()
  const navigate = useNavigate()
  const getName = localStorage.getItem('name')
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  // console.log(roleId)

  const handleCloseInvestment = () => setShowInvestUpdateModal(false)

  const portId = location.state?.data?.portfolio_id
  const from = location?.state?.from
  console.log(from)
const [alertQtyError,setAlertQtyError]=useState(false)
  const [dataId, setDataId] = useState([])
  const [blankInvestError, setBlankInvestError]=useState(false)
  const [show, setShow] = useState(false)
  const [investCheck, setInvestCheck]=useState('')
  const [search, setSearch] = useState([])
  const [currencyValue,setCurrencyValue]=useState()
  const [editSellDate, setEditSellDate]=useState()
  const [editSellNav,setEditSellNav]=useState('')
  const [marketType, setMarketType]=useState('')
  const [alertDeleteError, setAlertDeleteError]=useState(false)
  const [alertInvestQtyError, setAlertInvestQtyError]=useState(false)
  const [disabled, setDisabled]=useState(false)
  const [editCurrentNav, setEditCurrentNav]=useState('')
  const [alertAl, setAlertAl] = useState(false)
  const [sellQuantity, setSellQuantity]=useState('')
  const [alertForInvestName, setAlertForInvestName] = useState(false)
  const [alertForInvestType, setAlertForInvestType] = useState(false)
  const [showInvestment, setShowInvestment] = useState(false)
  const [alertInvest, setAlertInvest] = useState(false)
  const [spaceError, setSpaceError]= useState(false)
  const [editCurrentDate,setEditCurrentDate]=useState()
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [investHide, setInvestHide]=useState(false)
  const [alertForInvestValue, setAlertForInvestValue] = useState(false)
  const [alertInvestmentAdd, setAlertInvestmentAdd] = useState(false)
  const [selectInvest,setSelectInvest]=useState('')
  function investFormatter(column, colIndex) {
    console.log(column)
    return (
      <>
      { column.dataField=='investment_name' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Investment-Name'><p>Name</p></Tooltip>
      <span className='order-4'></span> 
      </div> : column.dataField=='investment_type' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Asset'><p>Asset</p></Tooltip>
      <span className='order-4'></span> </div> :
      column.dataField=='date_of_investment' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Buy Date'><p>Buy Date</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='quantity' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Quantity'><p>Quantity</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='purchase_price' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Buy NAV'><p>Buy Nav</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='current_nav' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Current NAV'><p>Current Nav</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='buy_value' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Buy Value'><p>Buy Value</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='current_value' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='current_value'><p>Current Value</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='pnl' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Profit & Loss'><p>PNL</p></Tooltip>
      <span className='order-4'></span>
      </div> : column.dataField=='comments' ?
      <div style={{display:'flex',flexDirection:'row'}}>
      <Tooltip title='Comments'><p>Comments</p></Tooltip>
      <span className='order-4'></span>
      </div>
       : <></>
    }
    </>
    );
  }
  const handleCloseAddInvest = () => {
    setAlertInvestmentAdd(false)
  }
  const [editExchangeRate,setEditExchangeRate]=useState()
  const [currencyValueEdit,setCurrencyValueEdit]=useState('')
  const [sea, setSea] = useState('')
  const [loading, setLoading]= useState(true)
  const [alertInvestError, setAlertInvestError]=useState(false)
  const [portN, setPortN] = useState('')
  const [credentialsInfoInvest, setCredentialsInfoInvest] = useState({
    portfolio_id: portId,
    userId: getId,
    created_by_name:localStorage.getItem('name'),
    date_of_invest: new Date(Date.now()).toISOString().split('T')[0],
    // sell_date: new Date(Date.now()).toISOString().split('T')[0],
    created_date: new Date(Date.now()).toISOString().split('T')[0],
  })
  const currencyList = [
    // { title: 'BTC', type:'Crypto:' },{ title: 'ETH',type:'Crypto:'},{ title: 'USDT',type:'Crypto:' },{ title: 'USDC',type:'Crypto:' },
    { title: 'USD', type:'FIAT:' },{ title: 'EUR',type:'FIAT:'},{ title: 'GBP',type:'FIAT:' },{ title: 'HKD',type:'FIAT:' },
    { title: 'AED', type:'FIAT:' },{ title: 'CNY',type:'FIAT:'},{ title: 'VND',type:'FIAT:' },{ title: 'MYR',type:'FIAT:' },
    { title: 'PHP', type:'FIAT:' },{ title: 'THB',type:'FIAT:'},{ title: 'AUD',type:'FIAT:' },{ title: 'CAD',type:'FIAT:' },
    { title: 'CAD', type:'FIAT:' },{ title: 'BNY',type:'FIAT:'},{ title: 'MMK',type:'FIAT:' },{ title: 'DKK',type:'FIAT:' },
    { title: 'HRK', type:'FIAT:' },{ title: 'HUF',type:'FIAT:'},{ title: 'INR',type:'FIAT:' },{ title: 'ISK',type:'FIAT:' },
    { title: 'JPY', type:'FIAT:' },{ title: 'CHF',type:'FIAT:'},{ title: 'MXN',type:'FIAT:' },{ title: 'NOK',type:'FIAT:' },
    { title: 'NZD', type:'FIAT:' },{ title: 'PLN',type:'FIAT:'},{ title: 'CZK',type:'FIAT:' },{ title: 'RON',type:'FIAT:' },
    { title: 'RUB', type:'FIAT:' },{ title: 'LKR',type:'FIAT:'},{ title: 'TWD',type:'FIAT:' },{ title: 'TRY',type:'FIAT:' },
  ]
  const options = currencyList.map((option) => {
    const currencyType = option.type;
    return {
        firstLetter: /[0-9]/.test(currencyType) ? 'FIAT:' : '',
      ...option,
    };
  });
  const handleChangeInvest=(e,k)=>{
    // console.log(selectInvest)
    setMarketType('Purchase')
    let res_type= result.filter(i=>i.investment_name==k)
    // console.log(res_type)
    if(res_type.length>0){
      setBlankInvestError(false)
    setCredentialsInfoInvest({...credentialsInfoInvest,invest_name:k,invest_type:res_type?.[0]?.investment_type, investment_id:res_type?.[0]?.investment_id})
    }else{
      setCredentialsInfoInvest({...credentialsInfoInvest,invest_type:''})
    }
  }
  const handleInputChangeInvest = (event) => {
    const { name, value } = event.target
     if((!value || value.match(/^(?:[1-9]\d*|\d)$/) && name=='quantity' && parseInt(value)>0)){
      setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }else if ((!value || value.match(/^\d{1,}(\.\d{0,2})?$/) && name=='exchange_rate')) {
      // console.log(name,value)
      setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }else if ((!value || value.match(/^\d{1,}(\.\d{0,2})?$/) && name=='sell_nav')) {
      // console.log(name,value)
      setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }
   else if ((!value || value.match(/^\d{1,}(\.\d{0,2})?$/) && name=='purchase_price')) {
      // console.log(name,value)
      setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }
    else if((!value || value.match(/^\d{1,}(\.\d{0,2})?$/) && name=='sell_nav')){
      // setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }
    else if((!value || value.match(/^\d{1,}(\.\d{0,2})?$/) && name=='current_nav')){
      setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }
    else if(name!='purchase_price' && name!='sell_nav' && name!='current_nav' && name!='quantity' && name!='exchange_rate'  ){
    setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    }
    //  else if(name!='sell_nav' && name!='purchase_price' ){
    //   setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    //   }else if(name!='current_nav' && name!='purchase_price'){
    //     setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    //     }
  }

  const handleClose = () => setShow(false)
  const handleShow = (id) => { 
    // console.log(id)
    setDataId(id)
    setShow(true)
    
  }

  const handleShowInvestment = () => {
    setInvestHide(false)
    setValidated(false)
    setDisabled(false)
    setBlankInvestError(false)
    setCurrencyValue('USD')
    setSellQuantity('')
    setPurchaseQuantity('')
    setAlertInvestError(false)
    setMarketType('Purchase')
    const x = result3?.filter((i) => i.portfolio_name === portN)
    credentialsInfoInvest.portfolio_id = x?.[0]?.portfolio_id
     credentialsInfoInvest.purchase_price = ''
     credentialsInfoInvest.sell_nav = ''
     credentialsInfoInvest.invest_type = ''
     credentialsInfoInvest.current_nav = ''
     credentialsInfoInvest.quantity = ''
     credentialsInfoInvest.invest_name = ''
    //  credentialsInfoInvest.comments=''
     credentialsInfoInvest.comment=''
     credentialsInfoInvest.purchase_type='Purchase',
     credentialsInfoInvest.currency='USD'
     credentialsInfoInvest.exchange_rate=''
     credentialsInfoInvest.created_date=new Date(Date.now()).toISOString().split('T')[0]
     credentialsInfoInvest.sell_date=new Date(Date.now()).toISOString().split('T')[0]
     credentialsInfoInvest.date_of_invest=new Date(Date.now()).toISOString().split('T')[0]
    setShowInvestment(true)
    
   
  }
 
  const handleInvestForm = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget

    // if (form.checkValidity() === false) {
    //   e.preventDefault()
    //   e.stopPropagation()
    // } 
    // else
   
    if( credentialsInfoInvest.invest_name=='' ) {
      setBlankInvestError(true)
     }else if( credentialsInfoInvest.invest_type=='' ) {
      setValidated(true)
     }
    else if(credentialsInfoInvest.invest_name.replace(/\s/g, '').length == 0 || credentialsInfoInvest?.invest_type.replace(/\s/g, '').length == 0 ) {
      setSpaceError(true)
            setTimeout(() => setSpaceError(false), 3000)
     }
     else if( (marketType=='Sell'  && credentialsInfoInvest.sell_nav!='' && purchaseQuantity=='0') || (marketType=='Sell'  && credentialsInfoInvest.sell_nav!='' && purchaseQuantity=='') ){
      //  console.log('err')
      setAlertInvestError(true)
      setTimeout(()=>{setAlertInvestError(false)},2000)
     }
    //  else if( marketType=='Sell'  && credentialsInfoInvest.sell_nav!='' && purchaseQuantity==0){
    //   console.log('err1')
    //    setAlertInvestError(true)
    //    setTimeout(()=>{setAlertInvestError(false)},2000)
    //  }
    else if(marketType=='Sell'){
        console.log('true',credentialsInfoInvest.sell_nav,sellQuantity)
      if( credentialsInfoInvest.sell_nav=='' || sellQuantity==undefined || sellQuantity=='' || (credentialsInfoInvest.currency!='USD' && credentialsInfoInvest.exchange_rate=='') ){
        console.log('no')
        setValidated(true)
      }else{
      let req_data= result.filter(i=>i.investment_name==credentialsInfoInvest.invest_name)
      let reqCredentialInfo = [{sell_id:uuidv4(), comment:'', purchase_type: marketType=='Purchase' ? 'Purchase' : null,sell_type:marketType=='Sell' ? 'Sell' : null,quantity:marketType=='Purchase' ? credentialsInfoInvest.quantity : sellQuantity,updated_by_name:localStorage.getItem('name'),currency:credentialsInfoInvest.currency,current_nav:credentialsInfoInvest.current_nav,exchange_rate:credentialsInfoInvest.exchange_rate,
    investment_id:credentialsInfoInvest.investment_id,sell_date:credentialsInfoInvest.sell_date,created_date:credentialsInfoInvest.created_date,purchase_price:req_data?.[0].purchase_price,userId:credentialsInfoInvest.userId,sell_nav:credentialsInfoInvest.sell_nav,portfolio_id:credentialsInfoInvest.portfolio_id,
    date_of_invest:credentialsInfoInvest.date_of_invest,invest_name:credentialsInfoInvest.invest_name,invest_type:credentialsInfoInvest.invest_type,created_by_name:localStorage.getItem('name')
    }]
      //  console.log(reqCredentialInfo[0])
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: Object.values(reqCredentialInfo)[0]
      }
      console.log(Object.values(reqCredentialInfo)[0])
      await axios(config)
        .then(function (response) {
          if (response.data === 'Investment Already Exist with this name.') {
            setAlertAl(true)
            setTimeout(() => { 
              setAlertAl(false)
            }, 3000)
          } else {
            setAlertInvestmentAdd(true)
            setTimeout(() => {
              setAlertInvestmentAdd(false)
              setShowInvestment(false)
            }, 3000)
            const p = response.data?.[0]?.portfolio_id
            invest(p)
            setDisabled(true)
          }
        })
        .catch(function (error) {
          // console.log(error)
        })
      }
     }else if(marketType=='Purchase') {
     if( credentialsInfoInvest.invest_name=='' || credentialsInfoInvest?.invest_type=='' || credentialsInfoInvest.purchase_price=='' || credentialsInfoInvest.currency!='USD' ? credentialsInfoInvest.exchange_rate=='' : credentialsInfoInvest.exchange_rate ) {
        setValidated(true)
      }else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/add_investment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentialsInfoInvest
      }
      await axios(config)
        .then(function (response) {
          // console.log('clicked')
          // console.log(response)
          if (response.data === 'Investment Already Exist with this name.') {
            setAlertAl(true)
            setTimeout(() => { 
              setAlertAl(false)
            }, 3000)
          } else {
            setAlertInvestmentAdd(true)
            setTimeout(() => {
              setAlertInvestmentAdd(false)
              setShowInvestment(false)
            }, 3000)
            const p = response.data?.[0]?.portfolio_id
            invest(p)
            setDisabled(true)
          }
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
  }
  }
  const handleDeleteUpdate = () => {
    handleDelete(dataId)
  }
  const [result, setResult] = useState([])
  const [result3, setResult3] = useState([])

  const loadFunction = async () => {
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
            const m = rs?.filter(j => j.portfolio_id === el.portfolio_id)
            if(m.length>0){
            const me = { ...m }
            arr.push(Object.values(me)[0]) 
            }
          })
          invest(arr?.[0]?.portfolio_id)
          setResult3(arr)
          setPortN(arr?.[0]?.portfolio_name)
        } else {
        const port = rs?.[0]?.portfolio_id
        const fr = rs?.filter((i) => i.portfolio_name === from)
        const frm = fr?.[0]?.portfolio_id
        if (portId!=undefined && from==undefined) {
          const p = rs?.filter((i) => i.portfolio_id === portId)
          const pi = p?.[0]?.portfolio_id
          setPortN(p?.[0]?.portfolio_name)
          invest(pi)
          setResult3(rs)
        } else if (investData?.portfolio_id) {
          // console.log(rs)
          let p_name = rs?.filter((i) => i.portfolio_id === investData.portfolio_id)
          // console.log(p_name)
          setPortN(p_name?.[0]?.portfolio_name)
          invest(investData?.portfolio_id)
          setResult3(rs)
        } 
         else if (from!=undefined) {
          // console.log(from)
          setPortN(from)
          setResult3(rs)
          // console.log(frm?.[0]?.portfolio_id,frm)
          invest(frm)
        }
         else{
          setResult3(rs)
          invest(rs?.[0]?.portfolio_id)
          setPortN(rs?.[0]?.portfolio_name)
        }
      }
      })
      .catch(function (error) {
        // console.log(error)
      })
  }

  const invest = async (portId) => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
        params: { portfolio_id: portId }
      })
      .then((response) => {
        if(response.data.filter(i=>i.status==='Active').length==0 || response.data.length==0 ){
          setResult([])
          setLoading(false)
          setAlertNoRecord(true)
        }else{
          const temp1 = response.data.map(record=>{
            return {...record, created_date: moment(record.created_date).format('YYYY-MM-DD'), quantity: parseInt(record.quantity),
          purchase_price:parseFloat(record.purchase_price), current_value:record.current_value==null ? null : parseFloat(record.current_value), buy_value:parseFloat(record.buy_value),
          current_nav: record.current_nav==null ? null : parseFloat(record.current_nav), pnl: record.pnl==null ? '-' : parseFloat(record.pnl)
          }
        })
        if (temp1) {
          temp1.sort((a, b) => {
            const x = new Date(a.updated_date).getTime() / 1000
            const y = new Date(b.updated_date).getTime() / 1000
            return x > y ? -1 : x < y ? 1 : 0
          })
        }
        setLoading(false)
        setResult(temp1.filter(i=>i.status==='Active'))
        }
      })
  }
  const handleChange = async (k) => {
    const x = result3?.filter((i) => i.portfolio_name == k)
    setPortN(k)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
        params: { portfolio_id: x?.[0]?.portfolio_id }
      })
      .then((response) => {
        if(response.data.filter(i=>i.status==='Active').length==0 || response.data.length==0 ){
          setResult([])
          setAlertNoRecord(true)
        }else{
          const temp1 = response.data.map(record=>{
            return {...record, created_date: moment(record.created_date).format('YYYY-MM-DD'), quantity: parseInt(record.quantity),
          purchase_price:parseFloat(record.purchase_price), current_value:record.current_value==null ? null : parseFloat(record.current_value), buy_value:parseFloat(record.buy_value),
          current_nav: record.current_nav==null ? null : parseFloat(record.current_nav), pnl: record.pnl==null ? '-' : parseFloat(record.pnl)
          }
        })
          if (temp1) {
            temp1.sort((a, b) => {
              const x = new Date(a.updated_date).getTime() / 1000
              const y = new Date(b.updated_date).getTime() / 1000
              return x > y ? -1 : x < y ? 1 : 0
            })
          }
          setResult(temp1.filter(i=>i.status==='Active'))
        }
        
      })
  }
  const handleDelete = async (del) => {
    // console.log(del)
    const portId = del.portfolio_id
    const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/getNewInvestment`,{
      params:{
        portfolio_id: portId ,
        investment_name:del.investment_name
    }
  }
)
let sum1 = res1.data.filter(i=>i.sell_type=='Sell' && i.status==='Active').reduce(
  (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity),
  0,
);
let purch1 = res1.data.filter(i=>i.purchase_type=='Purchase' && i.status==='Active').reduce(
  (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity),
  0,
);
// console.log(sum1,res1,purch1)
if(sum1!=purch1 && sum1>0){
setAlertDeleteError(true)
setTimeout(()=>setAlertDeleteError(false),3000)
}else{
  // console.log('allowed')
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/update_investment_status`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        investment_id: del.investment_id,
        user_name:getName
      }
    }
    await axios(config)
      .then(function (response) {
        invest(portId)
      })
      .catch(function (error) {
        // console.log(error)
      })
    }
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
  }
  const handleUpdateComment = async (comments) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/comment_investment`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        comment: comments,
        investment_id: investmentId,
        userId: getId
      }
    }
    await axios(config)
      .then(function (response) {
        // console.log(response.data)
      })
      .catch(function (error) {
        // console.log(error)
      })
  }
  const handleUpdateInvestment = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    let p_id=result?.filter(i=>i.investment_name===investCheck)
    let res=[]
     const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/getNewInvestment`,{
      params:{
        portfolio_id: p_id?.[0]?.portfolio_id,
        investment_name:investCheck
    }
  }
)

     let investArray=[]
    // console.log(investName)
    for(let a of result){
      if(a.investment_name==investName){
   investArray.push(a)
      }
    }
    let currentQty=investArray.filter(i=>i.investment_id===investmentId)
    // console.log(currentQty)
     let sum1 = res1.data.filter(i=>i.sell_type=='Sell' && i.status==='Active').reduce(
        (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity),
        0,
      );
       let purchaseQty1 = investArray.reduce(
        (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity),
        0,
      );
      let availableQty=parseInt(purchaseQty1)-parseInt(sum1)
      // console.log(purchaseQty1,editQuantity,sum1,parseInt(editQuantity)+parseInt(availableQty))
    // if( investType=='' || editPurchasePrice=='' || editQuantity=='' ) {
    //   setValidated(true)
      
    // }
    // console.log('yes',result.filter(i=>i.investment_id===investmentId)?.[0]?.quantity)
    // console.log(investName)
    if(investName==''){
      setBlankInvestError(true)
    }  else if( investType=='' || editPurchasePrice=='' || editQuantity=='' ) {
       setValidated(true)
       }
    else if( investName.replace(/\s/g, '').length == 0 || investType.replace(/\s/g, '').length == 0 || editPurchasePrice=='' || editQuantity=='' ) {
      setSpaceError(true)
            setTimeout(() => setSpaceError(false), 3000)
    }
    // else if( parseInt(availableQty)===0){
    //   setAlertInvestError(true)
    //   setTimeout(()=>{
    //     setAlertInvestError(false)
    //   },3000)
    // } 
    // else if(parseInt(sum1)>(parseInt(editQuantity)+parseInt(availableQty))){
    //   //  console.log('purchase cannot less than sale')
    //   setAlertQtyError(true)
    //   setTimeout(()=>{
    //     setAlertQtyError(false)
    //   },3000)
    // }
   
    
    else if(currentQty.length==0 && currentQty.filter(i=>i.investment_type===investType).length==0 &&  parseInt(editQuantity)>=parseInt(sum1) && parseInt(sum1)==0){
      console.log('else if',result.filter(i=>i.investment_id===investmentId && parseInt(i.quantity)===parseInt(editQuantity)),parseInt(editQuantity),sum1)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          investment_id: investmentId,
          invest_name: investName,
          invest_type: investType,
          date_of_invest: dateOfInvest,
          quantity: editQuantity,
          purchase_price: editPurchasePrice,
          sell_nav:editSellNav,
          current_nav:editCurrentNav,
          created_date:editCurrentDate,
          sell_date:editSellDate,
          comment:comment,
           sell_type: marketType==='Sell' ? marketType : null,
            purchase_type: marketType==='Purchase' ? marketType : '',
          currency:currencyValueEdit,
          exchange_rate:currencyValueEdit=='USD' ? '' : editExchangeRate,
          userId:userId,
          updated_by_name:localStorage.getItem('name')
        }
      }
      // console.log(config)
      await axios(config)
        .then(function (response) {
          invest(dataNew?.portfolio_id )
          setDisabled(true)
          setAlertInvest(true)
          setTimeout(() => {
            setAlertInvest(false)
            setShowInvestUpdateModal(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
          params: { portfolio_id: dataNew?.portfolio_id }
        })
        .then((response) => {
          const temp1 = response.data.map(record=>{
            return {...record, created_date: moment(record.created_date).format('YYYY-MM-DD'), quantity: parseInt(record.quantity),
          purchase_price:parseFloat(record.purchase_price), current_value:record.current_value==null ? null : parseFloat(record.current_value), buy_value:parseFloat(record.buy_value),
          current_nav: record.current_nav==null ? null : parseFloat(record.current_nav), pnl: record.pnl==null ? '-' : parseFloat(record.pnl)
          }
        })
          if (temp1) {
            temp1.sort((a, b) => {
              const x = new Date(a.updated_date).getTime() / 1000
              const y = new Date(b.updated_date).getTime() / 1000
              return x > y ? -1 : x < y ? 1 : 0
            })
          }
        
          setResult(temp1.filter(i=>i.status==='Active'))
        })

    }
    else if(currentQty.length==0 && parseInt(sum1)>0){
      console.log('purchase cannot',parseInt(sum1),parseInt(editQuantity))
     setAlertInvestQtyError(true)
     setTimeout(()=>{
       setAlertInvestQtyError(false)
     },3000)
    
   // } 
   }
  else if(currentQty.length==0 && currentQty.filter(i=>i.investment_type===investType).length==0 ){
     console.log('yes',result.filter(i=>i.investment_id===investmentId)?.[0]?.quantity,parseInt(editQuantity))
    // const config = {
    //     method: 'post',
    //     url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       investment_id: investmentId,
    //       invest_name: investName,
    //       invest_type: investType,
    //       date_of_invest: dateOfInvest,
    //       quantity: editQuantity,
    //       purchase_price: editPurchasePrice,
    //       sell_nav:editSellNav,
    //       current_nav:editCurrentNav,
    //       created_date:editCurrentDate,
    //       sell_date:editSellDate,
    //       comment:comment,
    //        sell_type: marketType==='Sell' ? marketType : null,
    //         purchase_type: marketType==='Purchase' ? marketType : '',
    //       currency:currencyValueEdit,
    //       exchange_rate:currencyValueEdit=='USD' ? '' : editExchangeRate,
    //       userId:userId,
    //       updated_by_name:localStorage.getItem('name')
    //     }
    //   }
    //   // console.log(config)
    //   await axios(config)
    //     .then(function (response) {
    //       invest(dataNew?.portfolio_id )
    //       setDisabled(true)
    //       setAlertInvest(true)
    //       setTimeout(() => {
    //         setAlertInvest(false)
    //         setShowInvestUpdateModal(false)
    //       }, 3000)
    //     })
    //     .catch(function (error) {
    //       // console.log(error)
    //     })
    //   await axios
    //     .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
    //       params: { portfolio_id: dataNew?.portfolio_id }
    //     })
    //     .then((response) => {
    //       const temp1 = response.data.map(record=>{
    //         return {...record, created_date: moment(record.created_date).format('YYYY-MM-DD'), quantity: parseInt(record.quantity),
    //       purchase_price:parseFloat(record.purchase_price), current_value:record.current_value==null ? null : parseFloat(record.current_value), buy_value:parseFloat(record.buy_value),
    //       current_nav: record.current_nav==null ? null : parseFloat(record.current_nav), pnl: record.pnl==null ? '-' : parseFloat(record.pnl)
    //       }
    //     })
    //       if (temp1) {
    //         temp1.sort((a, b) => {
    //           const x = new Date(a.updated_date).getTime() / 1000
    //           const y = new Date(b.updated_date).getTime() / 1000
    //           return x > y ? -1 : x < y ? 1 : 0
    //         })
    //       }
        
    //       setResult(temp1.filter(i=>i.status==='Active'))
    //     })

    } 
    else if( parseInt(availableQty)==0){
      setAlertInvestError(true)
      setTimeout(()=>{
        setAlertInvestError(false)
      },3000)
    }
    else if((parseInt(purchaseQty1)+parseInt(editQuantity)-currentQty?.[0]?.quantity)<=parseInt(sum1)){
      //  console.log('purchase cannot')
      setAlertQtyError(true)
      setTimeout(()=>{
        setAlertQtyError(false)
      },3000)
     
    // } 
    }
   
        // else if(currentQty.length==0){
    //   const config = {
    //     method: 'post',
    //     url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       investment_id: investmentId,
    //       invest_name: investName,
    //       invest_type: investType,
    //       date_of_invest: dateOfInvest,
    //       quantity: editQuantity,
    //       purchase_price: editPurchasePrice,
    //       sell_nav:editSellNav,
    //       current_nav:editCurrentNav,
    //       created_date:editCurrentDate,
    //       sell_date:editSellDate,
    //       comment:comment,
    //        sell_type: marketType==='Sell' ? marketType : null,
    //         purchase_type: marketType==='Purchase' ? marketType : '',
    //       currency:currencyValueEdit,
    //       exchange_rate:currencyValueEdit=='USD' ? '' : editExchangeRate,
    //       userId:userId,
    //       updated_by_name:localStorage.getItem('name')
    //     }
    //   }
    //   // console.log(config)
    //   await axios(config)
    //     .then(function (response) {
    //       invest(dataNew?.portfolio_id )
    //       setDisabled(true)
    //       setAlertInvest(true)
    //       setTimeout(() => {
    //         setAlertInvest(false)
    //         setShowInvestUpdateModal(false)
    //       }, 3000)
    //     })
    //     .catch(function (error) {
    //       // console.log(error)
    //     })
    //   await axios
    //     .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
    //       params: { portfolio_id: dataNew?.portfolio_id }
    //     })
    //     .then((response) => {
    //       const temp1 = response.data.map(record=>{
    //         return {...record, created_date: moment(record.created_date).format('YYYY-MM-DD'), quantity: parseInt(record.quantity),
    //       purchase_price:parseFloat(record.purchase_price), current_value:record.current_value==null ? null : parseFloat(record.current_value), buy_value:parseFloat(record.buy_value),
    //       current_nav: record.current_nav==null ? null : parseFloat(record.current_nav), pnl: record.pnl==null ? '-' : parseFloat(record.pnl)
    //       }
    //     })
    //       if (temp1) {
    //         temp1.sort((a, b) => {
    //           const x = new Date(a.updated_date).getTime() / 1000
    //           const y = new Date(b.updated_date).getTime() / 1000
    //           return x > y ? -1 : x < y ? 1 : 0
    //         })
    //       }
        
    //       setResult(temp1.filter(i=>i.status==='Active'))
    //     })

    // }
   
   
    else{
          console.log('else')
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          investment_id: investmentId,
          invest_name: investName,
          invest_type: investType,
          date_of_invest: dateOfInvest,
          quantity: editQuantity,
          purchase_price: editPurchasePrice,
          sell_nav:editSellNav,
          current_nav:editCurrentNav,
          created_date:editCurrentDate,
          sell_date:editSellDate,
          comment:comment,
           sell_type: marketType==='Sell' ? marketType : null,
          purchase_type: marketType==='Purchase' ? marketType : '',
          currency:currencyValueEdit,
          exchange_rate:currencyValueEdit=='USD' ? '' : editExchangeRate,
          userId:userId,
          updated_by_name:localStorage.getItem('name')
        }
      }
      // console.log(config)
      await axios(config)
        .then(function (response) {
          invest(dataNew?.portfolio_id )
          setDisabled(true)
          setAlertInvest(true)
          setTimeout(() => {
            setAlertInvest(false)
            setShowInvestUpdateModal(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
          params: { portfolio_id: dataNew?.portfolio_id }
        })
        .then((response) => {
          const temp1 = response.data.map(record=>{
            return {...record, created_date: moment(record.created_date).format('YYYY-MM-DD'), quantity: parseInt(record.quantity),
          purchase_price:parseFloat(record.purchase_price), current_value:record.current_value==null ? null : parseFloat(record.current_value), buy_value:parseFloat(record.buy_value),
          current_nav: record.current_nav==null ? null : parseFloat(record.current_nav), pnl: record.pnl==null ? '-' : parseFloat(record.pnl)
          }
        })
          if (temp1) {
            temp1.sort((a, b) => {
              const x = new Date(a.updated_date).getTime() / 1000
              const y = new Date(b.updated_date).getTime() / 1000
              return x > y ? -1 : x < y ? 1 : 0
            })
          }
        
          setResult(temp1.filter(i=>i.status==='Active'))
        })
     }
  }
  let acdata = []
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
      .then(function (response) {
        // console.log(response.data)
        const pData = response.data
        acdata = pData
      })
  }
  useEffect(async () => {
    await accountant()
    await loadFunction()
  }, [])
  const data2 = result
  const [validated, setValidated] = useState(false)
  const [dataNew, setDataNew] = useState([])
  const [investmentId, setInvestmentId] = useState('')
  const [editQuantity,setEditQuantity]=useState('')
  const [editPurchasePrice,setEditPurchasePrice]=useState('')
  const [investName, setInvestName] = useState('')
  const [purchaseQuantity,setPurchaseQuantity]=useState('')
  const [investType, setInvestType] = useState('')
  const [dateOfInvest, setDateOfInvest] = useState('')
  const [investValue, setInvestValue] = useState('')
  const [comment, setComment] = useState('')
  const [userId, setUserId] = useState(getId)
  const [showInvestUpdateModal, setShowInvestUpdateModal] = useState(false)
  
  const handleEdit = (data) => {
    setDisabled(false)
    setInvestHide(false)
    setDataNew(data)
    setBlankInvestError(false)
    setInvestmentId(data.investment_id)
    setInvestName(data.investment_name)
    setDateOfInvest(data.date_of_investment)
    setInvestType(data.investment_type)
    setComment(data.comments)
    // setPurchaseQuantity(data.quantity)
    setMarketType('Purchase')
    setSellQuantity(0)
    setInvestCheck(data.investment_name)
    setEditPurchasePrice(data.purchase_price)
    setEditQuantity(data.quantity)
    setEditCurrentNav(data.current_nav)
    setEditSellNav(data.sell_nav)
    setCurrencyValueEdit(data.currency)
    setEditExchangeRate(data.exchange_rate)
    setEditCurrentDate(data.created_date)
    setEditSellDate(data.sell_date)
    setUserId(getId)

    setShowInvestUpdateModal(true)
    setValidated(false)
  }
  const handleMarketTypeHandler=(k)=>{
    let investArray=[]
    // console.log(k,credentialsInfoInvest.invest_name)
    for(let a of result){
      if(a.investment_name==credentialsInfoInvest.invest_name){
   investArray.push(a)
      }
    }
    // console.log(investArray)
    setMarketType(k)
    let res=[]
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getNewInvestment`,
      params: {
        portfolio_id: credentialsInfoInvest.portfolio_id,
        investment_name:credentialsInfoInvest.invest_name
      }
    }
     axios(config).then(function (response) {
      // console.log(response.data)
      for(let a of response.data){
        if(a.investment_name===credentialsInfoInvest.invest_name){
            res.push(a)
        }
      }
      // console.log(res.filter(i=>i.purchase_type=='Purchase' && i.status==='Active')?.[0]?.quantity)
      const sumPurchaseQty = investArray.reduce(
        (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity),
        0,
      );
      // console.log(sumPurchaseQty)
      const sum = res.filter(i=>i.sell_type=='Sell' && i.status==='Active').reduce(
        (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.quantity),
        0,
      );
      // console.log(sum)
      // console.log(res.filter(i=>i.investment_name==investCheck))
      if(k==='Sell'){
        if(res.filter(i=>i.sell_type=='Sell' && i.status==='Active').length>0){
        let diffQty= parseInt(sumPurchaseQty) - parseInt(sum)
        // console.log(diffQty)
        // console.log(diffQty,parseInt(res.filter(i=>i.sell_type==='Sell').slice(-1)[0]?.quantity))
        setPurchaseQuantity(diffQty==0 ? '0' : diffQty)
        setSellQuantity()
      }
      else{
        if(investArray.length==0){ 
          setPurchaseQuantity('0')
          setSellQuantity()
        }else{
         setPurchaseQuantity(parseInt(sumPurchaseQty))
        setSellQuantity()
        }
      }
      
    }else{
      credentialsInfoInvest.quantity==''
    }
      // setResultAuditHistory(res)
    })
    
}
  const columnsTwo = [
    {
      dataField: 'investment_name',
      text: 'Name',
      sort: true
    },
    {
      dataField: 'investment_type',
      text: 'Type',
      sort: true
    },

    {
      dataField: 'date_of_investment',
      text: 'Date',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
            {moment(row.date_of_investment).format('DD-MM-YYYY')}
          </p>
        )
      }
    },
    {
      dataField: 'quantity',
      text: 'Quantity',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.quantity}
          </p>
        )
      }
    },
    {
      dataField: 'purchase_price',
      text: 'Purchase Price',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {parseInt(row.purchase_price).toLocaleString()}
          </p>
        )
      }
    },
    {
      dataField: 'purchase_value',
      text: 'Purchase Value',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
             {parseInt(row.quantity * row.purchase_price).toLocaleString()} 
          </p>
        )
      }
    },
    {
      dataField: 'comments',
      text: 'Comments',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.comments == null
              ? (
                <p style={{ color: 'white', fontSize: '12px' }}>
                  N/A
                </p>
                )
              : (
                <p style={{ color: 'white', fontSize: '12px' }}>
                  {row.comments}
                </p>
                )}
          </p>
        )
      }
    },
    {
      dataField: '',
      text: 'Manage',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            <span
              style={{ cursor: 'pointer', color: '#F1C40F' }}
              onClick={() => handleEdit(row)}
            >
              <EditOutlinedIcon />
            </span>
          </div>
        )
      }
    }
  ]
  
  const columns2 = [
    {
      dataField: 'investment_name',
      text:'Name',
      headerFormatter: investFormatter,
      // text: <Tooltip title='Investment-Name'><p>Name</p></Tooltip>,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}>
            {row.investment_name}
          </p>
        )
      }
    },
    {
      dataField: 'investment_type',
      text:'Asset',
      // text: <Tooltip title='Investment-Asset'><p>Asset</p></Tooltip>,
      sort: true,
      headerFormatter: investFormatter,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap'}}>
            {row.investment_type}
          </p>
        )
      }
    },

    {
      dataField: 'date_of_investment',
      text:'Buy Date',
      // text: <Tooltip title='Buy Date'><p>Buy Date</p></Tooltip>,
      sort: true,
      headerFormatter: investFormatter,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
            {moment(row.date_of_investment).format('Do MMMM YYYY')}
          </p>
        )
      }
    },
    {
      dataField: 'quantity',
      text: 'Qty',
      sort: true,
      headerFormatter: investFormatter,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white' }}>
            {row.quantity}
          </p>
        )
      }
    },
    {
      dataField: 'purchase_price',
      text: 'Buy Nav',
      headerFormatter: investFormatter,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white' }}>
            {'$'+parseFloat(row.purchase_price).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'current_nav',
      text: 'Current Nav',
      headerFormatter: investFormatter,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white' }}>
            { row.current_nav==null ? '-' : '$'+parseFloat(row.current_nav).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'buy_value',
      text: 'Buy Value',
      headerFormatter: investFormatter,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
             {'$'+parseFloat(row.buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')} 
          </p>
        )
      }
    },
    {
      dataField: 'current_value',
      text:'Current Value',
      headerFormatter: investFormatter,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>

             { row.current_value==null ? '-' : '$'+parseFloat(row.current_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')} 
          </p>
        )
      }
    },
    {
      dataField: 'pnl',
      text: 'PNL',
      headerFormatter: investFormatter,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
             {row.pnl!='-' ? (row.pnl=== 0 ? <span style={{color:'rgb(0, 255, 0)'}}> {'$'+row.pnl}</span> :
              row.pnl>0 ? 
            <span style={{color:'rgb(0, 255, 0)'}}> {'$'+parseFloat(row.pnl).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
            :  <span style={{color:'#ff0000'}}>{'-'+''+'$'+parseFloat(row.pnl).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')?.split('-')[1]}</span>)
            : '-'
            } 
          </div> 
        )
      }
    },
    {
      dataField: 'comments',
      text:'Comments',
      headerFormatter: investFormatter,
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            {row.comments == null
              ? (
                <p style={{ color: 'white', fontSize: '14px',marginLeft:'2em' }}>
                 -
                </p>
                )
              : (
                <p style={{ color: 'white', fontSize: '14px',marginLeft:'2em' }}>
                  {row.comments}
                </p>
                )}
          </p>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{ cursor: 'pointer', color: '#FFC107' }}
              onClick={() => handleEdit(row)}
            >
              <EditOutlinedIcon />
            </span>
            <span
              style={{ cursor: 'pointer', color: '#b30000' }}
              onClick={() => handleShow(row)}
            >
              {' '}
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        )
      }
    }
  ]
  // console.log(result)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  const [isHoveringColor, setIsHoveringColor] = useState(false)
  const handleMouseEnterColor = () => {
    setIsHoveringColor(true)
  }
  const handleMouseLeaveColor = () => {
    setIsHoveringColor(false)
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
                <h3 className="pagetitle">Investments</h3>
              </span>
              {roleId.includes('admin') === true
                ? (
                  <Link
                    to="#"
                    className="p-2 pageheader btn btn-gray"
                    style={{
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      color: '#FFC107',
                      top:'11px',
                      position:'relative'
                    }}
                    onClick={() => handleShowInvestment()}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Link>
                  )
                : (
                  <></>
                  )}
              <span
                className="p-2 pageheader"
                onClick={() =>
                  navigate('/PMS/TransactionInvestmentHistory', {
                    state: { id: 1, dataI: portN }
                  })
                }
                onMouseEnter={handleMouseEnterColor}
                onMouseLeave={handleMouseLeaveColor}
                style={{
                  background: 'transparent',
                  color: '#FFC107',
                  cursor: "pointer",
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
                value={portN}
                options={result3?.map((e) => e.portfolio_name)}
                onChange={(e, k) => {
                  handleChange(k)
                }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '200px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid #d9d9d9 !important',
                    left: '4px',
                   
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
                    style={{ color: 'white' }}
                    label="Portfolios"
                  />
                )}
              />
              <SearchBox 
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = data2?.filter((i) =>
                    i.investment_name.toLowerCase().includes(event.target.value.toLowerCase())
                  ||  i.investment_type.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.quantity==Number(event.target.value)
                  || i.purchase_price==Number(event.target.value)
                  || i.buy_value==Number(event.target.value)
                  || i.current_nav!=null && i.current_nav==Number(event.target.value)
                  || i.current_value!=null && i.current_value==Number(event.target.value)
                  || i.pnl!=null && i.pnl>0 ? parseFloat(i.pnl).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')==event.target.value
                  : parseFloat(i.pnl).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')==-event.target.value
                  || i.comments!=null && i.comments.toLowerCase().includes(event.target.value.toLowerCase())
                  || moment(i.date_of_investment).format('Do MMMM YYYY')==event.target.value
                  )
                  setSearch(x)
                }}
              />
            </Row>
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
            <div >
              {sea
                ? (
                  <CommonTable
                    data={search}
                    loading={loading}
                    columns={roleId.includes('admin') === true ? columns2 : columnsTwo}
                  />
                  )
                  :
                
                (
                  <CommonTable
                    data={data2}
                    loading={loading}
                    columns={roleId.includes('admin') === true ? columns2 : columnsTwo}
                  />
                  ) 
                }
            </div>
          </Col>
        </Row>
        <Modal
          show={showInvestUpdateModal}
          onHide={handleCloseInvestment}
          style={{ width: '28%', marginLeft: '35%', overflowY: 'auto' }}
        >
          <div style={{ border: '1px solid white' }}>
            <Modal.Header
              style={{ backgroundColor: '#222429', border: 'none' }}
            >
              <IconButton
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  color: 'white'
                }}
                onClick={() => setShowInvestUpdateModal(false)} >
                <CloseIcon />
              </IconButton>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#222429' }}>
              <Form
                className="custom-form"
                noValidate
                validated={validated}
                style={{ marginBottom: '4%' }}
                onSubmit={handleSubmitForm}
              >
                {alertInvest
                  ? (
                    <Snackbar
                      open={alertInvest}
                      onClose={() => setAlertInvest(false)}
                      anchorOrigin={{
                        vertical: "top",
                         horizontal: "center"
                     }}
                     sx={{
                      width:'20em'
                    }}
                    >
                      <Alert
                        onClose={() => setAlertInvest(false)}
                        severity="success"
                        sx={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: 'black'
                        }}
                      >
                      Investment updated successfully
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
              sx={{
                width:'20em'
              }}
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
                {alertAl
                  ? (
                    <Snackbar
                      open={alertAl}
                      onClose={() => setAlertAl(false)}
                      anchorOrigin={{
                        vertical: "top",
                         horizontal: "center"
                     }}
                     sx={{
                      width:'20em'
                    }}
                    >
                      <Alert
                        onClose={() => setAlertAl(false)}
                        severity="error"
                        sx={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: 'black'
                        }}
                      >
                        Investment name already exist
                      </Alert>
                    </Snackbar>
                    )
                  : (
                    <></>
                    )}
                    {alertInvestQtyError
                  ? (
                    <Snackbar
                      open={alertInvestQtyError}
                      onClose={() => setAlertInvestQtyError(false)}
                      anchorOrigin={{
                        vertical: "top",
                         horizontal: "center"
                     }}
                     sx={{
                      width:'20em'
                    }}
                    >
                      <Alert
                        onClose={() => setAlertInvestQtyError(false)}
                        severity="error"
                        sx={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: 'black'
                        }}
                      >
                        Partial quantity of this investment is sold, you can not update this investment
                      </Alert>
                    </Snackbar>
                    )
                  : (
                    <></>
                    )}
                    {alertQtyError
                  ? (
                    <Snackbar
                      open={alertQtyError}
                      onClose={() => setAlertQtyError(false)}
                      anchorOrigin={{
                        vertical: "top",
                         horizontal: "center"
                     }}
                     sx={{
                      width:'20em'
                    }}
                    >
                      <Alert
                        onClose={() => setAlertQtyError(false)}
                        severity="error"
                        sx={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: 'black'
                        }}
                      >
                        Total purchase quantity must be greater than total sale quantity
                      </Alert>
                    </Snackbar>
                    )
                  : (
                    <></>
                    )}
                  {alertInvestError
                    ? (
                      <Snackbar
                        open={alertInvestError}
                        onClose={() => setAlertInvestError(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertInvestError(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                          All  the quantity of this investment is sold you can not update this investment
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                <h4>
                  Update Investment
                </h4>
                <span
                  style={{
                    color: 'white',
                    // marginLeft: '52px',
                    fontWeight: 'bold',
                    // whiteSpace:'nowrap'
                  }}
                >
                  Portfolio name -{' '}
                  <span style={{ marginLeft: '2px' }}>{portN}</span>
                </span>
                <Autocomplete
                // className="p-2 pageheader"
                 value={investName}
                 freeSolo
                options={[...new Set(result.map(e=>e.investment_name))]}
                onChange={(e, k) => {
                  let res_type= result.filter(i=>i.investment_name==k)
                 if(res_type.length>0){
                  setBlankInvestError(false)
                  setInvestType(res_type?.[0]?.investment_type)
                  setInvestName(k)
                  // setInvestCheck(k)
                 }else{ 
                  setBlankInvestError(false)
                  //  setInvestType('')
                   setInvestName('')
                 }
                  
                }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'84%',
                  marginTop:'2%',
                  marginLeft:'14%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '84%',
                    height: '50px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid grey !important',
                    left: '4px',
                    paddingTop:'14px !important'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    top: '1px',
                    left: '-8px',
                    fontSize: '10px',
                    background: '#1f2125'
                  }
                
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e)=>{
                      // console.log(e.target.value,result.filter(i=>i.investment_name.includes(e.target.value)))
                      if(result.filter(i=>i.investment_name===e.target.value).length==0){
                        setInvestHide(true)
                        // setInvestType('')
                        setBlankInvestError(false)
                        setInvestName(e.target.value)
                      }else{
                        setBlankInvestError(false)
                      setInvestName(e.target.value)
                      // setInvestCheck(e.target.value)
                      setInvestType(result.filter(i=>i.investment_name==e.target.value)?.[0]?.investment_type)
                      }
                      
                    }}
                    style={{ color: 'white' }}
                    label="Investment"
                  />
                )}
              />
                {blankInvestError==true ? <span style={{width: '100%',
               marginTop: '0.25rem',fontSize: '.875em',color: '#dc3545'}}>Investment name is required</span> : <></>} 
                <Form.Label
                  htmlFor="type"
                  className={cx('custom-form-box', {
                    'focus-add': investType
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                   {/* {roleId.includes('admin') === true
                    
                    ? */}
                     <Form.Control
                      type="text"
                      id="type"
                      name="invest_type"
                      value={investType}
                      onChange={(e) => setInvestType(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    /> 
                    
                    {/* : 
                    <Form.Control
                      type="text"
                      id="type"
                      name="invest_type"
                      value={investType}
                      required
                      style={{ color: 'white' }}
                    /> */}
                    <span className='label_text'>Asset</span>
                    {/* } */}

                  <Form.Control.Feedback type="invalid">
                    Asset Required.
                  </Form.Control.Feedback>
                
                </Form.Label>
                <Autocomplete
                // className="p-2 pageheader"
                 value={marketType}
                options={['Purchase']?.map((e) => e)}
                // onChange={(e, k) => {
                //   handleMarketTypeHandler(k)
                //   setMarketType(k)
                // }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'84%',
                  marginTop:'8%',
                  marginLeft:'14%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '84%',
                    height: '50px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid grey !important',
                    left: '4px',
                    paddingTop:'14px !important'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    top: '1px',
                    left: '-8px',
                    fontSize: '14px',
                    background: '#1f2125'
                  }
                
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Type"
                  />
                )}
              />
                {marketType=='Purchase' ?
                <LocalizationProvider className='p-2' dateAdapter={AdapterDayjs} style={{height:'20px'}}>
                <DatePicker
                  label="Buy Date"
                  className='p-2'
                  
                  value={dateOfInvest}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    // console.log(typeof(new Date(newValue).toISOString().split('T')[0]))
                     setDateOfInvest(new Date(newValue).toISOString().split('T')[0])
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                     
                      style={{
                        borderRadius: '15px',
                        color: 'white',
                        width: '84%',
                        marginTop: '8%',
                        marginBottom:'-2%',
                        marginLeft: '10%'
                      }}
                      sx={{

                        '.MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          width: '90%',
                          height: '50px',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          border: '1px solid grey !important',
                         

                        },
                        '.MuiInputBase-input': {
                          height: '0rem',
                        
                        },
                        '.MuiSvgIcon-root': {
                          fill: 'white'
                        },
                        '.MuiInputLabel-root':{
                          top: '9px',
                          left: '-8px',
                          fontSize: '14px',
                          background: '#1f2125'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider> : <></>}
                {marketType==='Purchase' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': editQuantity
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="quantity"
                    name="quantity"
                    // placeholder="Quantity"
                    value={editQuantity}
                    onChange={(e)=>{
                      const qtyValue=e.target.value
                      if(!qtyValue || qtyValue.match(/^(?:[1-9]\d*|\d)$/)){
                        setEditQuantity(qtyValue)
                      }
                     
                    }}
                    required
                    style={{ color: 'white' }}
                  />
                   <span className='label_text'>Quantity</span>
                  <Form.Control.Feedback type="invalid">
                    Quantity Required.
                  </Form.Control.Feedback>
                </Form.Label> : <></>}
                
                <Autocomplete
                // className="p-2 pageheader"
                 value={currencyValueEdit}
                options={currencyList?.map((e) => e.title)}
                onChange={(e, k) => {
                  setCurrencyValueEdit(k)
                }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'84%',
                  marginTop:'8%',
                  marginLeft:'14%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '84%',
                    height: '50px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid grey !important',
                    left: '4px',
                    paddingTop:'14px !important'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    top: '1px',
                    left: '-8px',
                    fontSize: '14px',
                    background: '#1f2125'
                  }
                
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Currency"
                  />
                )}
              />

                {currencyValueEdit!=null && currencyValueEdit!='USD' ? 
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': editExchangeRate
                  })}
                  style={{
                    width: '72%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="exchange_rate"
                    name="exchange_rate"
                    // placeholder="Buy-NAV"
                    value={editExchangeRate}
                    onChange={(e)=>{
                      const exchVal= e.target.value
                      if(!exchVal || exchVal.match(/^\d{1,}(\.\d{0,2})?$/)){
                      setEditExchangeRate(e.target.value)
                      }
                    }}
                    required
                    style={{ color: 'white' }}
                  /> 
                   <span className='label_text'>Exchange Rate</span>
                   <Form.Control.Feedback type="invalid">
                   Exchange Rate Required.
                  </Form.Control.Feedback> 
                </Form.Label> : <></>}
                {marketType==='Purchase' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': editPurchasePrice
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="purchase_price"
                    name="purchase_price"
                    // placeholder="Buy-NAV"
                    value={editPurchasePrice}
                    onChange={(e)=>{
                      const purchaseVal = e.target.value
                      if (!purchaseVal || purchaseVal.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setEditPurchasePrice(purchaseVal)
                    }}
                    }
                    required
                    style={{ color: 'white' }}
                  />
                   <span className='label_text'>Buy NAV</span>
                  <Form.Control.Feedback type="invalid">
                    Buy NAV Required.
                  </Form.Control.Feedback>
                </Form.Label> : <></>}
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': editCurrentNav
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="current_nav"
                    name="purchase_price"
                    // placeholder="Current-NAV"
                    value={editCurrentNav}
                    onChange={(e)=>{
                      const currentVal = e.target.value
                      if (!currentVal || currentVal.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setEditCurrentNav(currentVal)
                    }}
                    }
                    required
                    style={{ color: 'white' }}
                  />
                  <span className='label_text'>Current NAV</span>
                </Form.Label>
                
                {marketType==='Sell' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': editSellNav
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="sell_nav"
                    name="sell_nav"
                    // placeholder="sell-NAV"
                    value={editSellNav}
                    onChange={(e)=>{
                      const sellVal = e.target.value
                      if (!sellVal || sellVal.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setEditSellNav(sellVal)
                    }}
                    }
                    required
                    style={{ color: 'white' }}
                  />
                  <span className='label_text'>Sell NAV</span>
                </Form.Label> : <></>}
                {marketType==='Sell' ?
                 <LocalizationProvider className='p-2' dateAdapter={AdapterDayjs}>
                 <DatePicker
                   label="Sell Date"
                   className='p-2'
                   value={editSellDate}
                   inputFormat="DD/MM/YYYY"
                   onChange={(newValue) => {
                     // console.log(newValue)
                     setEditSellDate(newValue)
                   }}
                   renderInput={(params) => (
                     <TextField
                       {...params}
                       style={{
                         borderRadius: '15px',
                         color: 'white',
                         width: '84%',
                         marginBottom:'6%',
                         marginLeft: '10%'
                       }}
                       sx={{
                         '.MuiOutlinedInput-root': {
                           borderRadius: '4px',
                           width: '90%',
                           height: '50px',
                           // backgroundColor: '#fff',
                           fontSize: '14px',
                           border: '1px solid grey !important',
 
                         },
                         '.MuiInputBase-input': {
                           height: '0rem'
                         },
                         '.MuiSvgIcon-root': {
                           fill: 'white'
                         },
                         '.MuiInputLabel-root':{
                           top: '9px',
                           left: '-8px',
                           fontSize: '14px',
                           background: '#1f2125'
                         }
                       }}
                     />
                   )}
                 />
               </LocalizationProvider>: <></>}
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': comment
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="comment"
                    name="comment"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                    style={{ color: 'white' }}
                  />
                  <span className='label_text'>Comment</span>
                </Form.Label>
                <Button
                  type="submit"
                  variant=""
                  disabled={disabled}
                  className="btn btn-gray"
                  onClick={handleUpdateInvestment}
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
          </div>
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
            border: '1px solid grey',
            borderRadius: '15px'
          }}
        >
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <Modal.Title
              style={{
                color: 'white',
                fontSize: '16px',
                marginTop: '-5%',
                marginLeft: '11%'
              }}
            >
              Are you sure you want to Delete this Investment ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-3%'
            }}
          >
            <Button
              variant="success"
              style={{ width: '25%', backgroundColor: '#006400', marginBottom: '2%',  }}
              onClick={() => {
                handleDeleteUpdate()
                handleClose()
              }}
            >
              Yes
            </Button>
            <Button
            variant="danger"
              onClick={handleClose}
              style={{ width: '25%', backgroundColor: '#b30000' }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showInvestment}
          onHide={handleCloseInvestment}
          style={{
            width: '29%',
            marginLeft: '35%',
            overflowY: 'auto'
          }}
        >
          <div style={{ border: '1px solid white' }}>
            <Modal.Header
              style={{ backgroundColor: '#222429', border: 'none' }}
            >
              
              <IconButton
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  color: 'white'
                }}
                onClick={() => setShowInvestment(false)}
              >
                <CloseIcon />
              </IconButton>
            </Modal.Header>
            
            <Modal.Body style={{ backgroundColor: '#222429' }}>
              <Form
                className="custom-form"
                noValidate
                validated={validated}
                onSubmit={handleInvestForm}
              >
                <h4>
                  Add Investment
                </h4>
                <span
                  style={{
                    color: 'white',
                    // marginLeft: '52px',
                    fontWeight: 'bold',
                    // whiteSpace:'nowrap'
                  }}
                >
                  Portfolio name -{' '}
                  <span style={{ marginLeft: '2px' }}>{portN}</span>
                </span>
                <Autocomplete
                // className="p-2 pageheader"
                freeSolo
                 value={credentialsInfoInvest.invest_name}
                options={[...new Set(result.map(e=>e.investment_name))]}
                onChange={(e, k) => {
                  handleChangeInvest(e,k)
                }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'85%',
                  marginTop:'2%',
                  marginLeft:'14%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '84%',
                    height: '50px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid grey !important',
                    left: '4px',
                    paddingTop:'14px !important'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    top: '1px',
                    left: '-8px',
                    fontSize: '14px !important',
                    background: '#1f2125',
                    fontWeight:'500 !important'
                  }
                
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e)=>{
                      // console.log(e)
                      // console.log(e.target.value,result.filter(i=>i.investment_name.includes(e.target.value)))
                      let filtData=result.filter(i=>i.investment_name===e.target.value)
                      if(filtData.length==0){
                        setInvestHide(true)
                        // setInvestCheck(e.target.value)
                        setMarketType('Purchase')
                        setBlankInvestError(false)
                        setCredentialsInfoInvest({...credentialsInfoInvest,invest_name:e.target.value,invest_type:'',currency:'USD'})
                      }else{
                        // console.log(filtData)
                        setBlankInvestError(false)
                        setCredentialsInfoInvest({...credentialsInfoInvest,invest_name:e.target.value,invest_type:filtData?.[0]?.investment_type,currency:'USD'})
                      }
                      
                    }}
                    style={{ color: 'white' }}
                    label="Investment"
                  />
                )}
              />
               {blankInvestError==true ? <span style={{width: '100%',
    marginTop: '0.25rem',fontSize: '.875em',color: '#dc3545'}}>Investment name is required</span> : <></>} 
                <Form.Label
                  htmlFor="type"
                   className={cx('custom-form-box', {
                     'focus-add': credentialsInfoInvest.invest_type
                   })}
                  
                  style={{
                    width: '72%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="type"
                    // className='label_input'
                    name="invest_type"
                    value={credentialsInfoInvest.invest_type}
                    // placeholder="Investment-Asset"
                    onChange={handleInputChangeInvest}
                    required
                    style={{ color: 'white' }}
                  />
                  <span className='label_text'>Asset</span>
                  <Form.Control.Feedback type="invalid">
                    Asset Required.
                  </Form.Control.Feedback>
                </Form.Label>
                <Autocomplete
                // className="p-2 pageheader"
                 value={marketType}
                options={['Purchase','Sell']?.map((e) => e)}
                onChange={(e, k) => {
                  handleMarketTypeHandler(k)
                  // setMarketType(k)
                  // setCredentialsInfoInvest({...credentialsInfoInvest,purchase_type:k})
                }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'85%',
                  marginTop:'10%',
                  marginLeft:'14%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '84%',
                    height: '50px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid grey !important',
                    left: '4px',
                    paddingTop:'14px !important'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    top: '1px',
                    left: '-8px',
                    fontSize: '14px',
                    background: '#1f2125'
                  }
                
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Type"
                  />
                )}
              />
              {marketType==='Purchase' ?
                  <LocalizationProvider className='p-2' dateAdapter={AdapterDayjs} style={{transform:'none'}}>
                <DatePicker
                  label="Buy Date"
                  className='p-2'
                  inputFormat="DD/MM/YYYY"
                  autoOk
                  value={credentialsInfoInvest.date_of_invest}
                  onChange={(newValue) => {
                    // console.log(newValue)
                     setCredentialsInfoInvest({...credentialsInfoInvest, date_of_invest:newValue})
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        borderRadius: '15px',
                        color: 'white',
                        width: '84%',
                        marginTop: '8%',
                        marginBottom:'-2%',
                        marginLeft: '10%'
                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          width: '90%',
                          height: '50px',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          border: '1px solid grey !important',

                        },
                        '.MuiInputBase-input': {
                          height: '0rem'
                        },
                        '.MuiSvgIcon-root': {
                          fill: 'white'
                        },
                        '.MuiInputLabel-root':{
                          top: '9px',
                          left: '-8px',
                          fontSize: '14px',
                          background: '#1f2125'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider> : <></>
              }
                {marketType==='Sell' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                     'focus-add': purchaseQuantity
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="available_quantity"
                    name="quantity"
                    // placeholder="Quantity"
                    value={purchaseQuantity}
                    // onChange={(e)=>{
                    //   const qtyValue=e.target.value
                    //   if(!qtyValue || qtyValue.match(/^(?:[1-9]\d*|\d)$/)){
                    //     setPurchaseQuantity('')
                    //   }
                    // }}
                    required
                    style={{ color: 'white' }}
                  />
                   <span className='label_text'>Available Quantity</span>
                  {/* <Form.Control.Feedback type="invalid">
                    Quantity Required.
                  </Form.Control.Feedback> */}
                </Form.Label> : <></>}
                {marketType==='Sell' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': sellQuantity
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                    // marginTop: '-2%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="sell_quantity"
                    min='1'
                    name="quantity"
                    // placeholder="Quantity"
                    value={parseInt(sellQuantity)<=parseInt(purchaseQuantity) ? sellQuantity : ''}
                    onChange={(e)=>{
                      const qtyValue=e.target.value
                      // console.log(typeof(qtyValue),qtyValue)
                      if(!qtyValue || qtyValue.match(/^(?:[1-9]\d*|\d)$/) && parseInt(qtyValue)<=parseInt(purchaseQuantity) && parseInt(qtyValue)>0){
                        setSellQuantity(qtyValue)
                      }
                     
                    }}
                    required
                    style={{ color: 'white' }}
                  />
                   <span className='label_text'>Sell Quantity</span>
                  <Form.Control.Feedback type="invalid">
                    Sell Quantity Required.
                  </Form.Control.Feedback>
                </Form.Label> : <></>}
                {marketType==='Purchase' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': credentialsInfoInvest.quantity
                  })}
                  style={{
                    width: '72%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="quantity"
                    name="quantity"
                    // placeholder="Quantity"
                    value={credentialsInfoInvest.quantity}
                    onChange={handleInputChangeInvest}
                    required
                    style={{ color: 'white' }}
                  />
                   <span className='label_text'>Quantity</span>
                  <Form.Control.Feedback type="invalid">
                    Quantity Required.
                  </Form.Control.Feedback>
                </Form.Label> : <></>}
                <Autocomplete
                // className="p-2 pageheader"
                 value={credentialsInfoInvest.currency}
                options={currencyList?.map((e) => e.title)}
                onChange={(e, k) => {
                  setCurrencyValue(k)
                  setCredentialsInfoInvest({...credentialsInfoInvest,currency:k})
                }}
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
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'85%',
                  marginTop:'10%',
                  marginLeft:'14%'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '84%',
                    height: '50px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid grey !important',
                    left: '4px',
                    paddingTop:'14px !important'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    top: '1px',
                    left: '-8px',
                    fontSize: '14px',
                    background: '#1f2125'
                  }
                
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Currency"
                  />
                )}
              />
                {currencyValue!=null && currencyValue!='USD' ? 
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': credentialsInfoInvest.exchange_rate
                  })}
                  style={{
                    width: '72%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="exchange_rate"
                    name="exchange_rate"
                    // placeholder="Buy-NAV"
                    value={credentialsInfoInvest.exchange_rate}
                    onChange={handleInputChangeInvest}
                    required
                    style={{ color: 'white' }}
                  />
                  <span className='label_text'>Exchange Rate</span>
                   <Form.Control.Feedback type="invalid">
                   Exchange Rate Required.
                  </Form.Control.Feedback> 
                </Form.Label> : <></>}
                {marketType==='Purchase' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': credentialsInfoInvest.purchase_price
                  })}
                  style={{
                    width: '72%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="purchase_price"
                    name="purchase_price"
                    // placeholder="Buy-NAV"
                    value={credentialsInfoInvest.purchase_price}
                    onChange={handleInputChangeInvest}
                    required
                    style={{ color: 'white' }}
                  />
                    <span className='label_text'>Buy NAV</span>
                  <Form.Control.Feedback type="invalid">
                    Buy NAV Required.
                  </Form.Control.Feedback>
                </Form.Label> : <></>}
                {marketType==='Purchase' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': credentialsInfoInvest.current_nav
                  })}
                  style={{
                    width: '72%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="current_nav"
                    name="current_nav"
                    // placeholder="Current-NAV"
                    value={credentialsInfoInvest.current_nav}
                    onChange={handleInputChangeInvest}
                    required
                    style={{ color: 'white' }}
                  />
                   <span className='label_text'>Current NAV</span>
                  {/* <Form.Control.Feedback type="invalid">
                    Buy NAV Required.
                  </Form.Control.Feedback> */}
                </Form.Label> : <></>}
                {marketType==='Purchase' ?
                <LocalizationProvider className='p-2' dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Current Date"
                  className='p-2'
                  value={credentialsInfoInvest.created_date}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    // console.log(newValue)
                    setCredentialsInfoInvest({...credentialsInfoInvest, created_date:newValue})
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        borderRadius: '15px',
                        color: 'white',
                        width: '84%',
                        marginBottom:'-2%',
                        marginLeft: '10%'
                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          width: '90%',
                          height: '50px',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          border: '1px solid grey !important',

                        },
                        '.MuiInputBase-input': {
                          height: '0rem'
                        },
                        '.MuiSvgIcon-root': {
                          fill: 'white'
                        },
                        '.MuiInputLabel-root':{
                          top: '9px',
                          left: '-8px',
                          fontSize: '14px',
                          background: '#1f2125'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider> : <></>}
                {marketType==='Sell' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': credentialsInfoInvest.sell_nav
                  })}
                  style={{
                    width: '72%',
                    marginTop: '10%',
                    marginLeft: '15%',
                  }} 
                >
                  {' '}
                  <Form.Control 
                    type="text"
                    id="sell_nav"
                    name="sell_nav"
                    // placeholder="Sell_NAV"
                    value={credentialsInfoInvest.sell_nav}
                    onChange={handleInputChangeInvest}
                    required
                    style={{ color: 'white' }}
                  />
                  <span className='label_text'>Sell NAV</span>
                  <Form.Control.Feedback type="invalid">
                   Sell NAV Required.
                  </Form.Control.Feedback>
                </Form.Label> : <></>}
                { marketType==='Sell' ?
                  <LocalizationProvider className='p-2' dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Sell Date"
                    className='p-2'
                    value={credentialsInfoInvest.sell_date}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                      // console.log(newValue)
                      setCredentialsInfoInvest({...credentialsInfoInvest, sell_date:newValue})
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{
                          borderRadius: '15px',
                          color: 'white',
                          width: '84%',
                          marginBottom:'6%',
                          marginLeft: '10%'
                        }}
                        sx={{
                          '.MuiOutlinedInput-root': {
                            borderRadius: '4px',
                            width: '90%',
                            height: '50px',
                            // backgroundColor: '#fff',
                            fontSize: '14px',
                            border: '1px solid grey !important',
  
                          },
                          '.MuiInputBase-input': {
                            height: '0rem'
                          },
                          '.MuiSvgIcon-root': {
                            fill: 'white'
                          },
                          '.MuiInputLabel-root':{
                            top: '9px',
                            left: '-8px',
                            fontSize: '14px',
                            background: '#1f2125'
                          }
                        }}
                      />
                    )}
                  />
                </LocalizationProvider> : <></>}
                {marketType==='Purchase' ?
                <Form.Label
                  htmlFor="value"
                  className={cx('custom-form-box', {
                    'focus-add': credentialsInfoInvest.comment
                  })}
                  style={{
                    width: '72%',
                    // marginBottom: '10%',
                    marginLeft: '15%',
                    marginTop: '10%'
                  }}
                >
                  {' '}
                  <Form.Control
                    type="text"
                    id="comment"
                    name="comment"
                    required
                    // placeholder="Comment"
                    onChange={handleInputChangeInvest}
                    style={{ color: 'white' }}
                  />
                    <span className='label_text'>Comment</span>
                </Form.Label> : <></>}
                <Button
                  type="submit"
                  variant=""
                  disabled={disabled}
                  className="btn btn-gray"
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
          </div>
          {alertInvestmentAdd
                    ? (
                      <Snackbar
                        open={alertInvestmentAdd}
                        onClose={handleCloseAddInvest}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={handleCloseAddInvest}
                          severity="success"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                      Investment added successfully
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
              sx={{
                width:'20em'
              }}
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
                  {alertAl
                    ? (
                      <Snackbar
                        open={alertAl}
                        onClose={() => setAlertAl(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertAl(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            // backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                          Investment name already exist
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                       {alertInvestError
                    ? (
                      <Snackbar
                        open={alertInvestError}
                        onClose={() => setAlertInvestError(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertInvestError(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                          Available quantity is 0 you can not sell this investment 
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                  {alertForInvestName
                    ? (
                      <Snackbar
                        open={alertForInvestName}
                        onClose={() => setAlertForInvestName(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertForInvestName(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                          Investment Name cannot be more than 20 Characters
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                  
                  {alertForInvestType
                    ? (
                      <Snackbar
                        open={alertForInvestType}
                        onClose={() => setAlertForInvestType(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertForInvestType(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            // backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                          Investment Type cannot be more than 5 Characters
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
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
      {alertDeleteError
                    ? (
                      <Snackbar
                        open={alertDeleteError}
                        onClose={() => setAlertDeleteError(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertDeleteError(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                           Partial quantity of investment is sold you can not delete the investment
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                  
      </Container>
    </React.Fragment >
  )
}
export default Investment
