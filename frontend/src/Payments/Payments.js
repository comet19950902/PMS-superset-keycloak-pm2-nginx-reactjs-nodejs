import React, { useState, useEffect } from 'react'
import CommonAccountantTable from "../common/CommonTable/CommonAccountantTable";
import axios from 'axios'
import cx from 'classnames';
import Spinner from '../common/spinner'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import { useSelector, useDispatch } from "react-redux";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FormControl from '@mui/material/FormControl'
import Autocomplete from '@mui/material/Autocomplete'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Select from '@mui/material/Select'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import { Alert, TextField, Tooltip } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton';
import { v4 as uuidv4 } from 'uuid';
import { Link,useNavigate } from 'react-router-dom'
import { textFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter'
import Snackbar from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close';
import Header from '../common/Header/Header'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin'
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SearchBox from '../common/SearchBox/SearchBox'
import { LegendToggleRounded } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
import { styled, lighten, darken } from '@mui/system';
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
  paper: {
    background: 'rgb(31, 33, 37) !important',
    color: 'white !important'
  },
  option: {
    '&:hover': {
      backgroundColor: 'grey !important',
      color: 'white !important'
    }
  }
})

function Payments () {
  const styles = useStyles()
    const navigate = useNavigate()
  const getId = localStorage.getItem('sub_Id')
  const { selectedColumnId } = useSelector((store) => store.app);
  const [result4, setResult4] = useState([])
  const[validated,setValidated]=useState(false);
  const [alertPayment, setAlertPayment] = useState(false)
  const [showPopupDeletePayment, setShowPopupDeletePayment] = useState(false)
  const [sea, setSea] = useState('')
  const [loading,setLoading]=useState(false)
  const [currencyError,setCurrencyError]=useState(false)
  const [payment, setPayment]=useState('')
    const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [sender, setSender]=useState('')
  const [receiver, setReceiver]=useState('')
  const [amount, setAmount]=useState('')
  const [currency, setCurrency]=useState('')
  const [exchangeRate, setExchangeRate]=useState('')
  const [result, setResult]=useState('')
  const [paymentType, setPaymentType]=useState('')
  const [paymentId, setPaymentId]=useState('')
  const [comment, setComment]=useState('')
  const [commentEdit, setCommentEdit]=useState('')
  const [senderEdit, setSenderEdit]=useState('')
  const [receiverEdit, setReceiverEdit]=useState('')
  const [spaceError, setSpaceError] = useState(false)
  const [amountEdit, setAmountEdit]=useState('')
  const [currencyEdit, setCurrencyEdit]=useState('')
  const [exchangeRateEdit, setExchangeRateEdit]=useState('')
  const [resultEdit, setResultEdit]=useState('')
  const [paymentTypeEdit, setPaymentTypeEdit]=useState('')
const [fullPaymentData,setFullPaymentData]=useState([])
  const [search, setSearch] = useState([])
  const [paymentData, setPaymentData] = useState([])
  const [alertPaymentSuccess, setAlertPaymentSuccess] = useState(false)
  const [alertPaymentEditSuccess, setAlertPaymentEditSuccess] = useState(false)
  const [showPopupPayment, setShowPopupPayment] = useState(false)
  const [showEditPopupPayment, setShowEditPopupPayment] = useState(false)
  const [currencyValue,setCurrencyValue]=useState()
  let senderFilter
  const currencyList = [
    { title: 'BTC', type:'Crypto:' },{ title: 'ETH',type:'Crypto:'},{ title: 'USDT',type:'Crypto:' },{ title: 'USDC',type:'Crypto:' },
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
      firstLetter: /[0-9]/.test(currencyType) ? 'FIAT:' : currencyType,
      ...option,
    };
  });
  // const options = currencyList.map((option) => {
  //   const firstLetter = option.title[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //     ...option,
  //   };
  // });

  const handleShowPayment=()=>{
    setValidated(false);
    setExchangeRate('')
    setCurrencyValue('')
    setAmount('')
    setReceiver()
    setComment('')
    setSender()
    setCurrencyError(false)
    setShowPopupPayment(true);
    
  }
  const handleChangePayment=(e)=>{
    setPaymentType(e.target.value)
    console.log(e.target.value)
  }
  const handleChangePaymentEdit=(e)=>{
    setPaymentTypeEdit(e.target.value)
    console.log(e.target.value)
  }
  const handleEditPopupPayment=(row)=>{
    setShowEditPopupPayment(true)
    setPaymentId(row.payment_id)
    setSenderEdit(row.sender)
    setReceiverEdit(row.reciever)
    setAmountEdit(row.amount)
    setCurrencyEdit(row.currency)
    setAmountEdit(row.amount)
    setCurrencyError(false)
    setResultEdit(row.result_usd)
    setExchangeRateEdit(row.exchange_rate)
    setPaymentTypeEdit(row.payment_type)
    setCommentEdit(row.comment)

    console.log(row)
  }
  const handleDeletePopupPayment=(row)=>{
    setShowPopupDeletePayment(true)
    setPaymentId(row.payment_id)
    console.log(row)
  }
  const handleClose=()=>{
    setShowPopupDeletePayment(false)
  }
  const paymentApi=async()=>{
    setLoading(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/get_payment`
    ).then(function (response) {
      console.log(response.data)
      const temp2 = response.data?.map(record => {
        let type
        if(record.currency==="BTC" || record.currency==="ETH" || record.currency==="USDT" || record.currency==="USDC"){
          type="Crypto"
        }else{
           type="FIAT"
        }
        let res = parseFloat(record.amount) / parseFloat(record.exchange_rate)
        return { ...record,payment_id:parseInt(record.payment_id), payment_type:type, result:res, date_updated:moment(record.date_updated).format('YYYY-MM-DD'),amount:parseFloat(record.amount),exchange_rate:parseFloat(record.exchange_rate), date:record.date_updated }
      })
      if (temp2) {
        temp2.sort((a, b) => {
          const x = new Date(a.date).getTime() / 1000
          const y = new Date(b.date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      if(temp2.length==0){
        setLoading(false)
         setAlertNoRecord(true)
         setPaymentData([])
      }
      setLoading(false)
      setFullPaymentData(temp2)
      setPaymentData(temp2.filter(i=>i.status=='Active'|| i.status==null))
    })
  }
  const AddPaymentApi=async(e)=>{
    e.preventDefault()
    setValidated(true)
   console.log(sender, receiver,payment,currencyValue)
    const form = e.currentTarget
    // if (form.checkValidity() === false) {
    //   e.preventDefault()
    //   e.stopPropagation()
    // }  
    if(sender=='' || receiver==''  || amount==='' || exchangeRate==''){
     setValidated(true)
     if(currencyValue=='' || currencyValue==null ){
      setCurrencyError(true)
     }
    }else if(currencyValue==null || currencyValue==''){
      setCurrencyError(true)
      console.log('currency',currencyValue)
    }
    else if(sender.trim()=='' || receiver.trim()==''){
      setSpaceError(true)
    setTimeout(()=>{
      setSpaceError(false)
      // setShowPopupPayment(false)
    },3000)
    }
    else
    { 
      // console.log(paymentData)
      fullPaymentData?.sort((a, b) => {
        const x = parseInt(a.payment_id)
        const y = parseInt(b.payment_id)
        return x < y ? -1 : x > y ? 1 : 0
      })
      // console.log(parseInt(paymentData.slice(-1)[0].payment_id)+1)
       for(let i=1;i<100000;i++){
        let  m = fullPaymentData.filter(f=>f.payment_id==i)
        if(m.length===0 || fullPaymentData.length==0 ){
          const config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/create_payment`,
            data:
            {
              "user_id":getId,
              "payment_id":fullPaymentData.length==0 ? 1 : parseInt(fullPaymentData.slice(-1)[0]?.payment_id)+1,
              "payment":payment,
              "sender":sender,
              "reciever":receiver,
              "amount":amount,
              "currency":currencyValue,
              "exchange_rate":exchangeRate,
              "payment_type":currencyValue==='BTC' || currencyValue==='ETH' || currencyValue==='USDT' || currencyValue==='USDT' ? "Crypto" : "FIAT",
              "result_usd":result,
              "comment":comment
            }
          }
          console.log(config.data)
          await axios(config).then(function (response) {
    
            console.log(response)
            console.log(response.data);
            paymentApi()
             setAlertPaymentSuccess(true)
              setTimeout(()=>{
                setAlertPaymentSuccess(false)
                setShowPopupPayment(false)
              }, 2000)
          }).catch(function (error) {
            console.log(error)
          })
         break
        }
        }
      }
      
  }
  const EditPaymentApi=async(e)=>{
    e.preventDefault()
    setValidated(true)
   console.log(sender, receiver,payment)
    const form = e.currentTarget
    // if (form.checkValidity() === false) {
    //   e.preventDefault()
    //   e.stopPropagation()
    // }
    if(senderEdit=='' || receiverEdit==''  ||  commentEdit==''  || amountEdit==='' || exchangeRateEdit==''){
      setValidated(true)
      if(currencyEdit=='' || currencyEdit==null ){
       setCurrencyError(true)
      }
     }else if(currencyEdit==null || currencyEdit==''){
       setCurrencyError(true)
      
     }
     else if(senderEdit.trim()=='' || receiverEdit.trim()==''){
       setSpaceError(true)
     setTimeout(()=>{
       setSpaceError(false)
       // setShowPopupPayment(false)
     },3000)
     }
    else
    {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_payment`,
        data:
        {
          "user_id":getId,
          "payment_id":paymentId,
          "sender":senderEdit,
          "reciever":receiverEdit,
          "amount":amountEdit,
          "currency":currencyEdit,
          "exchange_rate":exchangeRateEdit,
          "payment_type":paymentTypeEdit,
          "result_usd":resultEdit,
          "comment":commentEdit
        }
      }
      console.log(config.data)
      await axios(config).then(function (response) {

        console.log(response)
        console.log(response.data);
        paymentApi()
         setAlertPaymentEditSuccess(true)
          setTimeout(()=>{
            setAlertPaymentEditSuccess(false)
            setShowEditPopupPayment(false)
          }, 2000)
      }).catch(function (error) {
        console.log(error)
      })
     
    }
  }
  const DeletePaymentApi=async()=>{
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/update_payment_status`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        payment_id: paymentId,
        user_id:getId

      }
  }
    await axios(config)
      .then(function (response) {
          paymentApi()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  useEffect(async () => {
    await paymentApi()
    //await accountant()
    //await allportfolioUser()
  }, [])
  console.log(paymentData)
  const columns4 = [
    // {
    //   dataField: 'payment',
    //   text: 'Name',
    //   sort: true
    // },
    {
      dataField: "payment_id",
      text: "Id",
      sort: true,
      hidden: (selectedColumnId?.includes("payment_id") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'id',
        // getFilter: filter => {
        //   idFilter = filter
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.payment_id}
              </span>
            </div>
          </>
        )
      }
    },
    {
      dataField: 'date_updated',
      text: 'Date',
      sort: true,
      hidden: (selectedColumnId?.includes("date_updated") == true),
      filter: dateFilter({
        placeholder: 'date',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {moment(row.date_updated).format('Do MMMM YYYY')}
          </span>
        )
      }
    },
    {
      dataField: 'sender',
      text: 'Sender',
      sort: true,
      hidden: (selectedColumnId?.includes("sender") == true),
      filter: textFilter({
        placeholder: 'sender',
      })
    }, 
    {
      dataField: 'reciever',
      text: 'Receiver',
      sort: true,
      hidden: (selectedColumnId?.includes("reciever") == true),
      filter: textFilter({
        placeholder: 'receiver',
      })
    }, 
    {
      dataField: 'payment_type',
      text: 'Payment Type',
      sort: true,
      hidden: (selectedColumnId?.includes("payment_type") == true),
      filter: textFilter({
        placeholder: 'payment-type',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {row.currency==="BTC" || row.currency==="ETH" || row.currency==="USDT" || row.currency==="USDC" ? "Crypto" : "FIAT"}
          </span>
        )
      }
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: true,
      hidden: (selectedColumnId?.includes("amount") == true),
      filter: textFilter({
        placeholder: 'amount',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
          {parseInt(row.amount)>0 ?
          <span style={{color:'#00ff00'}}>
             {parseFloat(row.amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </span> : 
           <span style={{color:'#ff0000'}}>
            {parseFloat(row.amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
         </span>}
          </>
        )
      }
    },
    {
      dataField: 'currency',
      text: 'Currency',
      sort: true,
      hidden: (selectedColumnId?.includes("currency") == true),
      filter: textFilter({
        placeholder: 'currency',
      })

    }, 
    {
      dataField: 'exchange_rate',
      text: 'Exchange Rate($)',
      sort: true,
      hidden: (selectedColumnId?.includes("exchange_rate") == true),
      filter: textFilter({
        placeholder: 'exchange-rate',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {parseFloat(row.exchange_rate).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </span>
        )
      }
    },
    {
      dataField: 'result',
      text: 'Result($)',
      sort: true,
      hidden: (selectedColumnId?.includes("result") == true),
      filter: textFilter({
        placeholder: 'result',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const res = parseFloat(row.amount) / parseFloat(row.exchange_rate)
        // console.log(res)
        return (
          <>
          {parseFloat(row.result)>0 ?
          <span style={{color:'#00ff00'}} >
            {parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </span> : 
          <span style={{color:'#ff0000'}}>
            {parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </span>}
          </>
        )
      }
    }, 
    {
      dataField: 'comment',
      text: 'Remarks',
      sort: true,
      hidden: (selectedColumnId?.includes("comment") == true),
      filter: textFilter({
        placeholder: 'remarks',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {row.comment != undefined ? <p style={{ color: 'white' }}>{row.comment}</p> : <p style={{ color: 'white',marginLeft:'2em' }}>-</p>}
          </span>
        )
      }
    }, 
   
    {
      dataField: 'action',
      text: 'Action',
      sort: false,
      hidden: (selectedColumnId?.includes("action") == true),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{ cursor: 'pointer', color: '#F1C40F' }}
              onClick={() => handleEditPopupPayment(row)}
            >
              <EditOutlinedIcon />
            </span>
            <span
              style={{ cursor: 'pointer', color: '#b30000' }}
              onClick={() => handleDeletePopupPayment(row)}
            >
              {' '}
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        )
      }
    },
    // {
    //   dataField: 'portfolio',
    //   text: 'Portfolios',
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //         {row.portfolio?.[0]?.map(i =>
    //           <li>{i.portfolio_name}</li>
    //         )}
    //       </>
    //     )
    //   }
    // }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row >
          <Col lg={12}>
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Payments</h3>
              </span>
              <span className="p-2 pageheader">
                    <Link
                      to="#"
                      style={{
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'none',
                        color: '#FFC107',
                        top:'13px',
                        position:'relative'
                      }}
                      onClick={handleShowPayment}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Link>
                  </span>
                  <span
                className="p-2 pageheader"
                onClick={() =>
                  navigate('/PMS/payment_logs')
                }
                // onMouseEnter={handleMouseEnterColor}
                // onMouseLeave={handleMouseLeaveColor}
                style={{
                  background: 'transparent',
                  color: '#FFC107',
                  cursor: "pointer",
                  top:'11px',
                  position:'relative'
                }}
              >
                <Tooltip title="Payment Logs">
                  <ReceiptLongIcon />
                </Tooltip>
              </span>
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = paymentData?.filter((i) =>
                  String(i.payment_id).includes(event.target.value) ||
                   String(i.result).includes(event.target.value) ||
                    String(i.amount).includes(event.target.value) ||
                      i.sender.toLowerCase().includes(event.target.value.toLowerCase())
                       || i.reciever.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.payment_type.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.currency.toLowerCase().includes(event.target.value.toLowerCase())
                       || i.comment!=null && i.comment.toLowerCase().includes(event.target.value.toLowerCase())
                        || parseFloat(i.exchange_rate).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')==event.target.value
                        || moment(i.date).format('Do MMMM YYYY')==event.target.value
                  );
                  if(x.length==0){
                    //  setAlertNoRecord([])
                      setSearch([])
                  }else{
                  setSearch(x)
                  }
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
            {sea
              ? (
                <CommonAccountantTable
                  data={search}
                  columns={columns4}
                />
                )
              : (
                <CommonAccountantTable
                loading={loading}
                  data={paymentData}
                  columns={columns4}
                />
                )}
          </Col>
        </Row>
        <Modal
        show={showPopupPayment}
        // onHide={()=>setShowPopupPayment(false)}
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
              onClick={()=>setShowPopupPayment(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={AddPaymentApi}
            >
              <h4>
                Add Payment
              </h4>
              {/* <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': payment
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="payment"
                  placeholder="name"
                  onChange={(e) => setPayment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                   Name Required.
                </Form.Control.Feedback>
              </Form.Label> */}
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': sender
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="sender"
                  name="sender"
                  // placeholder="Sender"
                  onChange={(e) => setSender(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                   <span className='label_text'>Sender</span>
                <Form.Control.Feedback type="invalid">
                   Sender Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': receiver
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="receiver"
                  name="receiver"
                  // placeholder="Receiver"
                  onChange={(e) => setReceiver(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                   <span className='label_text'>Receiver</span>
                <Form.Control.Feedback type="invalid">
                   Receiver Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Autocomplete
                  id="grouped-demo"
                  // value={currencyValue}
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.title}
                  classes={{
                    option: styles.option
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }} >
                      {children}
                    </Paper>
                  )}
                  onChange={(e,k)=>{
                    if(k==null){
                      setCurrencyError(false)
                      setCurrencyValue(null)
                    }else{
                    setCurrencyError(false)
                    setCurrencyValue(k.title)
                    }
                  }}
                  style={{
                    fill: 'white',
                    boxShadow: 'none',
                    fontSize: '14px',
                    borderRadius: '30%',
                    marginLeft:'15%',
                    marginBottom:'1em'
                  }}
                  sx={{
                    // width: '200px',
                    // height: '32px',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                    '.MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      width: '84%',
                      height: '47px',
                      // backgroundColor: '#fff',
                      fontSize: '14px',
                      border:'1px solid grey !important',
                      marginBottom:'1em',
                        paddingTop:'12px !important',
                    },
                    '.MuiInputBase-input': {
                      height: '1rem'
                    },
                    '.MuiInputLabel-root':{
                      top:'1px',
                      left:'-8px',
                      background:'#1f2125'
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Currency" />}
                  renderGroup={(params) => (
                <li>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
                  )}
                />
                 {currencyError==true  ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center',marginTop:'-22px',marginBottom:'20px'}}>Currency is required.</span> : <></>} 
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': amount
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  // placeholder="Amount"
                  onChange={(e) => {
                    const amt1 = e.target.value
                    if (!amt1 || amt1.match(/^-\d{1,}(\.\d{0,2})?$/) || amt1.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setAmount(amt1)
                    }
                  }}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                 <span className='label_text'>Amount</span>
                <Form.Control.Feedback type="invalid">
                   Amount Required.
                </Form.Control.Feedback>
              </Form.Label>
               
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': exchangeRate
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="exchange_rate"
                  name="exchangeRate"
                  value={exchangeRate}
                  // placeholder="Exchange-Rate"
                  onChange={(e) => {
                    const exchPer1 = e.target.value
                    if (!exchPer1 || exchPer1.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setExchangeRate(exchPer1)
                    }
                  }}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                 <span className='label_text'>Exchange Rate</span>
                <Form.Control.Feedback type="invalid">
                   Exchange-rate Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': comment
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="comment"
                  name="comment"
                  // placeholder="Remarks"
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                  <span className='label_text'>Comment</span>
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                {/* <Form.Control.Feedback type="invalid">
                   Remarks Required.
                </Form.Control.Feedback> */}
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
              >
                Save
              </Button>
              {alertPaymentSuccess ? (
                <Snackbar
                  open={alertPaymentSuccess}
                  // autoHideDuration={4000}
                  onClose={()=>setAlertPaymentSuccess(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlertPaymentSuccess(false)}
                    severity="success"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Payment added successfully
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
                marginLeft: '35%',
                marginBottom: '38%',
                width: '25%'
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
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        show={showEditPopupPayment}
        // onHide={()=>setShowEditPopupPayment(false)}
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
              onClick={()=>setShowEditPopupPayment(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={EditPaymentApi}
            >
              <h4>
                Update Payment
              </h4>
              {/* <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': paymentEdit
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="payment"
                  placeholder="name"
                  onChange={(e) => setPaymentEdit(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
             
                <Form.Control.Feedback type="invalid">
                   Name Required.
                </Form.Control.Feedback>
              </Form.Label> */}
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': senderEdit
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="sender"
                  name="sender"
                  value={senderEdit}
                  // placeholder="Sender"
                  onChange={(e) => setSenderEdit(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                  <span className='label_text'>Sender</span>
                <Form.Control.Feedback type="invalid">
                   Sender Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': receiverEdit
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="receiver"
                  name="receiver"
                  value={receiverEdit}
                  placeholder="Receiver"
                  onChange={(e) => setReceiverEdit(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                 <span className='label_text'>Receiver</span>
                <Form.Control.Feedback type="invalid">
                   Receiver Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Autocomplete
                  id="grouped-demo"
                   value={options.find((option) => option.title === currencyEdit)}
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.title}
                  classes={{
                    option: styles.option
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }} >
                      {children}
                    </Paper>
                  )}
                  onChange={(e,k)=>{
                    
                     if(k==null){
                      setCurrencyError(false)
                      setCurrencyEdit(null)
                    }else{
                    setCurrencyError(false)
                    setCurrencyEdit(k.title)
                    }
                  }}
                  style={{
                    fill: 'white',
                    boxShadow: 'none',
                    fontSize: '14px',
                    borderRadius: '30%',
                    marginLeft:'15%',
                    marginBottom:'1em'
                  }}
                  sx={{
                    // width: '200px',
                    // height: '32px',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                    '.MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      width: '84%',
                      height: '47px',
                      // backgroundColor: '#fff',
                      fontSize: '14px',
                      border:'1px solid grey !important',
                      marginBottom:'1em',
                      paddingTop:'12px !important'
                    },
                    '.MuiInputBase-input': {
                      height: '1rem'
                    },
                    '.MuiInputLabel-root':{
                        top:'1px',
                      left:'-8px',
                      background:'#1f2125'
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Currency" />}
                  renderGroup={(params) => (
                <li>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
                  )}
                />
                   {currencyError==true  ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center',marginTop:'-22px',marginBottom:'20px'}}>Currency is required.</span> : <></>} 
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': amountEdit
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="amount"
                  name="amount"
                  value={amountEdit}
                  placeholder="Amount"
                  onChange={(e) => {
                    const amt2 = e.target.value
                    if (!amt2 || amt2.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setAmountEdit(amt2)
                    }
                    }}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                 <span className='label_text'>Amount</span>
                <Form.Control.Feedback type="invalid">
                   Amount Required.
                </Form.Control.Feedback>
              </Form.Label>
              
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': exchangeRateEdit
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="exchange_rate"
                  name="exchangeRate"
                  value={exchangeRateEdit}
                  placeholder="Exchange-Rate"
                  onChange={(e) => {
                    const exchPer2 = e.target.value
                    if (!exchPer2 || exchPer2.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setExchangeRateEdit(exchPer2)
                    }
                  }}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                 <span className='label_text'>Exchange Rate</span>
                <Form.Control.Feedback type="invalid">
                   Exchange-rate Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': commentEdit
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="comment"
                  name="comment"
                  value={commentEdit}
                  placeholder="Remarks"
                  onChange={(e) => setCommentEdit(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                  <span className='label_text'>Comment</span>
                {/* <Form.Control.Feedback type="invalid">
                   Remarks Required.
                </Form.Control.Feedback> */}
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
              >
                Save
              </Button>
              {alertPaymentEditSuccess ? (
                <Snackbar
                  open={alertPaymentEditSuccess}
                  // autoHideDuration={4000}
                  onClose={()=>setAlertPaymentEditSuccess(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlertPaymentEditSuccess(false)}
                    severity="success"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Payment updated successfully
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
                marginLeft: '35%',
                marginBottom: '38%',
                width: '25%'
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
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
          show={showPopupDeletePayment}
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
              Are you sure you want to Delete this Payment ?
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
              style={{ width: '25%',backgroundColor: '#006400'  }}
              onClick={() => {
                DeletePaymentApi()
                // handleDeleteUpdate()
                handleClose()
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={()=>setShowPopupDeletePayment(false)}
              style={{ width: '25%',  backgroundColor: '#b30000' }}
            >
              No
            </Button>
          </Modal.Footer>
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
      </Container>
    </React.Fragment >
  )
}
export default Payments;