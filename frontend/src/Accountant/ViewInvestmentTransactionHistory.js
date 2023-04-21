
import React, { useState, useEffect } from 'react'
import '../common/CommonTable/CommonTable.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import cx from 'classnames'
import { useSelector,useDispatch } from 'react-redux';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import '../Admin/DashboardAdmin/DashboardAdmin.css'
import Header from '../common/Header/Header'
import InputLabel from '@mui/material/InputLabel';
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../common/Modal.css'
import Spinner from '../common/spinner'
import MenuItem from '@mui/material/MenuItem';
import { textFilter,numberFilter,dateFilter } from 'react-bootstrap-table2-filter';
import { Alert } from '@mui/material'
import { Icon } from '@iconify/react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Tooltip from '@mui/material/Tooltip'
import Autocomplete from '@mui/material/Autocomplete'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin'
import moment from 'moment'
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar'
import CommonTableInvH from '../common/CommonTable/CommonTableInvH'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../common/SearchBox/SearchBox'
import CommonTableInvTop from '../common/CommonTable/CommonTableInvTop'
import { setExpandRowCol } from '../Redux/appSlice'

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
function InvestmentAccountantHistory () {
  const styles = useStyles()
  const dispatch = useDispatch();
  const getId = localStorage.getItem('sub_Id')
  const [alertInvestComment, setAlertInvestComment] = useState(false)
  const [alertForInvestValue, setAlertForInvestValue] = useState(false)
  const [alertInvest, setAlertInvest] = useState(false)
  const [resultPortfolio, setResultPortfolio] = useState([])
  const [days,setDays] = useState(30)
  const handleCloseInvestment = () => setShowInvestment(false)
  const handleCloseInvestmentModal = () => setShowInvestUpdateModal(false)
  const [alertComment, setAlertComment] = useState(false)
  const [dataNew, setDataNew] = useState([])
  const [showComment, setShowComment] = useState(false)
  const [investment_id, setInvestment_id] = useState('')
  const [invest_name, setInvest_name] = useState('')
  const [invest_type, setInvest_type] = useState('')
  const [date_of_invest, setDate_of_invest] = useState('')
  const [invest_value, setInvest_value] = useState('')
  const [comment, setComment] = useState('')
  const [r, setR] = useState(false)
  const [investInfo, setInvestInfo]=useState([])
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [loading, setloading] = useState(true)
  const [alertAl, setAlertAl] = useState(false)
  const [resultFilter1, setResultFilter1] = useState([])
  const roleId = localStorage.getItem('role').split(',')
  const [showInvestUpdateModal, setShowInvestUpdateModal] = useState(false)
  const [userId, setUserId] = useState(getId)
  const location = useLocation()
  const [result, setResult] = useState([])
  let investList=['ALL',...new Set(resultFilter1.map(e=>e.investment_name))]
  // console.log(investList)
  const [defaultInvest,setDefaultInvest]=useState([])
  const locationName = location.state?.data
  let port_id = location.state
  const p_id = location.state?.dataI
  // console.log(port_id)
  let nameIFilter, typeIFilter, dateIFilter, valueFilter, updatedDateFilter, commentFilter
  const handleEdit = (data) => {
    setDataNew(data)
    setInvestment_id(data.investment_id)
    setInvest_name(data.investment_name)
    setInvest_value(data.investment_value)
    setInvest_value(data.investment_value)
    setDate_of_invest(data.date_of_investment)
    setInvest_type(data.investment_type)
    setComment(data.comments)
    setUserId(getId)
    setShowInvestUpdateModal(true)
    setValidated(false)
  }
  const investmentCheckboxHandler =(e)=> {
    // console.log(e.target.name,"checkbox");
    if(e.target.name === "ALL"){
      if(defaultInvest.includes('ALL')){
        setDefaultInvest([]);
      }
      // else if(port_id.data1!=undefined){
      //   setDefaultInvest([...investList]);
      // }
      else
      {
        invest(resultFilter1?.[0]?.portfolio_id)
        investData(resultFilter1?.[0]?.portfolio_id)
        setDefaultInvest([...investList]);
        // let r2 =[...new Map(r1.map(x=>[(x.investment_name),x])).values()]
        // setResultFilter1(r2)
      }
    }else if( defaultInvest.includes(e.target.name)){
      // console.log('elseif')
       let filterData =  defaultInvest.filter((ele) => ele !== e.target.name);
       let filterAll = filterData.filter((ele) => ele !== "ALL");
       setDefaultInvest([...filterAll]);
  }
    else{
      // console.log('else')
      setDefaultInvest([...defaultInvest,e.target.name]);
        // invest(resultFilter1?.[0]?.portfolio_id)
    }
  
    
  }

  // console.log(defaultInvest)
  const handleInvestChange=(e,k)=>{
    port_id={}

        //  console.log(e.target.value)
        //  console.log(investList)
        
    // if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
    //   if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
    //   // console.log(e.target.value)
    //   if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
    //     e.target.value = []
    //     setDefaultToken([])
    //     setCombFiltData([])
      // } 
  }
  let acdata = []
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
      .then(function (response) {
        const p_data = response.data
        acdata = p_data
      })
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
        investment_id,
        userId: getId
      }
    }
    await axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        // console.log(error)
      })
  }
  const handleChangeDate=(e)=>{
    // console.log(e.target.value)
    setResultFilter1([])
    dispatch(setExpandRowCol(false))
    setDays(e.target.value)
    setR(false)
    if(e.target.value==30){
      var d2 = Math.floor(new Date().getTime() / 1000);
       var d1 = d2 - 30*86400
      // console.log(d1,d2)
        setR(true);
        var r1 = result.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
         console.log(r1);
         setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
         setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
      }else if(e.target.value==90){
        var d2 = Math.floor(new Date().getTime() / 1000);
         var d1 = d2 - 90*86400
        // console.log(d1,d2)
           setR(true);
          var r1 = result.filter(
            (item) =>
              new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
              new Date(item.date_of_investment).getTime() / 1000 <= d2 
          );
           console.log(r1);
           setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
          setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
          } else if(e.target.value==180){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 180*86400
            // console.log(d1,d2)
               setR(true);
              var r1 = result.filter(
                (item) =>
                  new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
                  new Date(item.date_of_investment).getTime() / 1000 <= d2 
              );
              // console.log(r1);
              setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
              setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
          } else if(e.target.value==365){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 365*86400
            // console.log(d1,d2)
               setR(true);
              var r1 = result.filter(
                (item) =>
                  new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
                  new Date(item.date_of_investment).getTime() / 1000 <= d2
              );
              // console.log(r1);
              setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
              setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
            }else if(e.target.value==1095){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 1095*86400
            // console.log(d1,d2)
               setR(true);
              var r1 = result.filter(
                (item) =>
                  new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
                  new Date(item.date_of_investment).getTime() / 1000 <= d2
              );
              // console.log(r1);
              setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
              setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
            }else if(e.target.value==1825){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 1825*86400
            // console.log(d1,d2)
               setR(true);
              var r1 = result.filter(
                (item) =>
                  new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
                  new Date(item.date_of_investment).getTime() / 1000 <= d2
              );
              // console.log(r1);
              setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
              setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
            }else if(e.target.value==3650){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 3650*86400
            // console.log(d1,d2)
               setR(true);
              var r1 = result.filter(
                (item) =>
                  new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
                  new Date(item.date_of_investment).getTime() / 1000 <= d2
              );
              // console.log(r1);
              setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
              setResultFilter1([...new Map(r1.map(x=>[(x.investment_name),x])).values()]);
            }
    }
  const handleUpdateInvestment = async () => {
    // console.log(invest_name, invest_type, investment_id, date_of_invest, comment)
    // console.log(investment_id)
    // console.log(comment)
    // console.log('Investment Updated')
    const re = /^[0-9\b]+$/
    if (invest_value === '' || re.test(invest_value)) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          investment_id,
          invest_name,
          invest_value,
          invest_type,
          date_of_invest,
          comment,
          userId
        }
      }
      await axios(config)
        .then(function (response) {
          setAlertInvestComment(true)
          setTimeout(() => {
            setAlertInvestComment(false)
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
          setResult(response.data)
        })
    } else {
      setAlertForInvestValue(true)
      setTimeout(() => {
        setAlertForInvestValue(false)
      }, 2000)
    }
  }
  const handleInputChangeInvest = (event) => {
    const { name, value } = event.target
    setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
  }
  const [defaultValue, setDefaultValue] = useState('')
  const handlePortfolios = async () => {
    // console.log(locationName)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    await axios(config).then(function (response) {
      // console.log(response)
      // console.log(response.data)
      const rs = response.data
      const arr = []
      if (roleId.includes('accountant') === true && roleId.includes('admin') == false) {
        const a = acdata?.filter(i => i.accountant_id == getId)
        a?.forEach(el => {
          const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
          if(m.length>0){
          const me = { ...m }
          arr.push(Object.values(me)[0])
          }
        })
        setResultPortfolio(arr)
        setAllInvestData(arr[0].portfolio_name)
      } else {
        setResultPortfolio(rs)
        setAllInvestData(rs[0].portfolio_name)
      if (port_id?.data1 != undefined ) {
        const dp = rs?.filter(i => i.portfolio_name == port_id?.data1)
        // console.log(dp)
        setDefaultValue(dp?.[0]?.portfolio_id)
        setAllInvestData(dp[0].portfolio_name)
        invest(dp?.[0]?.portfolio_id)
        investData(dp?.[0]?.portfolio_id)
        // handleDefault(dp)
      } else if(locationName!=undefined ) {
         const di = rs?.filter(i => i.portfolio_name == locationName)
        //  console.log(di)
        setDefaultValue(di[0]?.portfolio_id)
        setAllInvestData(di[0]?.portfolio_name)
        invest(di?.[0]?.portfolio_id)
        investData(di?.[0]?.portfolio_id)
        // handleDefault(di)
      }else if (p_id != undefined ) {
        const dp = rs?.filter(i => i.portfolio_name == p_id)
        // console.log(dp)
        setDefaultValue(dp?.[0]?.portfolio_id)
        setAllInvestData(dp[0].portfolio_name)
        invest(dp?.[0]?.portfolio_id)
        investData(dp?.[0]?.portfolio_id)
        // handleDefault(dp)
      } 
      else {
        // const di = rs?.filter(i => i.portfolio_name == location.state?.data)
        //  console.log(di)
        setDefaultValue(rs[0]?.portfolio_id)
        setAllInvestData(rs[0]?.portfolio_name)
        invest(rs?.[0]?.portfolio_id)
        investData(rs?.[0]?.portfolio_id)
        // handleDefault(di)
      }
    }
    })
  }
  const investData=async(pi)=>{
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getNewInvestment`,
      params: {
        portfolio_id: pi,
      }
    }
     await axios(config).then(function (response){
       setInvestInfo(response.data)
     })
  }
  const invest = async (pi) => {
    setloading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
        params: { portfolio_id: pi }
      })
      .then((response) => {
        response.data.sort((a, b) => {
          var x = new Date(a.updated_date).getTime()/1000
         var y = new Date(b.updated_date).getTime()/1000
         return x > y ? -1 : x < y ? 1 : 0
       })
       const temp= response.data.map(record=>{
        return {...record, quantity:parseInt(record.quantity), date_of_investment: record.date_of_investment.length>10 ? record.date_of_investment?.split('T')[0] : record.date_of_investment }
       })
        setResult(temp)
        var d2 = Math.floor(new Date().getTime() / 1000);
        var d1 = d2 - 30*86400
        var r1 = temp.filter(
         (item) =>
           new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
           new Date(item.date_of_investment).getTime() / 1000 <= d2
       );
       console.log(r1);
       setR(true)
       if(r1.length==0){
        setResultFilter1([]);
        setDefaultInvest([])
        setloading(false)
        setAlertNoRecord(true)
       }else{
        if(port_id?.inv_name!=undefined){
          // let r2 =temp.filter(i=>i.investment_name===port_id.inv_name)
          // let r3 =[...new Map(r2.map(x=>[(x.investment_name),x])).values()]
          // investList=['ALL',...new Set(r2.map(e=>e.investment_name))]
          let r2 =[...new Map(temp.map(x=>[(x.investment_name),x])).values()]
          setResultFilter1(r2);
          setDefaultInvest([port_id.inv_name])

            setloading(false)
        }else{
          
            setDefaultInvest(['ALL',...new Set(r1.map(e=>e.investment_name))])
        let r2 =[...new Map(r1.map(x=>[(x.investment_name),x])).values()]
        setResultFilter1(r2);
        setloading(false)
      }
      // else{
      //   setDefaultInvest([...defaultInvest])
      //   let r2 =[...new Map(temp.map(x=>[(x.investment_name),x])).values()]
      //   setResultFilter1(r2);
      //   setloading(false)
      // }
          // }
       
       }
      
      })
    // console.log(result)
  }
  // console.log(resultFilter1)
  const refresh_wallet = async () => {
    if(resultFilter1.length>0){
    setloading(true)
    setResultFilter1([])
    setTimeout(()=>{
      invest(defaultValue)
      investData(defaultValue)
      setloading(false)
    },3000)
    
    // await axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
    //     params: { portfolio_id: defaultValue }
    //   })
    //   .then((response) => {

    //     setloading(false)
    //   })
  }
  // console.log(resultPortfolio)
  const handleDefault = async (pi) => {
    setCredentialsInfoInvest({
      portfolio_id: pi[0].portfolio_id,
      userId: getId
    })
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
        params: { portfolio_id: pi[0].portfolio_id }
      })
      .then((response) => {
        response.data.sort((a, b) => {
        
          var x = new Date(a.updated_date).getTime()/1000
         var y = new Date(b.updated_date).getTime()/1000
         return x > y ? -1 : x < y ? 1 : 0
       })
       const temp= response.data.map(record=>{
        return {...record, quantity:parseInt(record.quantity), purchase_price:parseInt(record.purchase_price),purchase_value:parseInt(record.quantity) * parseInt(record.purchase_price)}
       })
            setResult(temp);
            var d2 = Math.floor(new Date().getTime() / 1000);
            var d1 = d2 - 30*86400
            var r1 = temp.filter(
             (item) =>
               new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
               new Date(item.date_of_investment).getTime() / 1000 <= d2
           );
          //  console.log(r1);
          if(r1.length==0){
            setResultFilter1([]);
            setAlertNoRecord(true)
          }else{
            setR(true)
           setResultFilter1(r1);
          }
          
      })
    }
    // console.log(result)
  }
  const handleAddInvestment = async () => {
    // console.log(defaultValue)
    setCredentialsInfoInvest({
      portfolio_id: defaultValue,
      userId: getId
    })
    // console.log(credentialsInfoInvest)
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/add_investment`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: credentialsInfoInvest
    }
    // console.log(config.data)
    await axios(config).then(function (response) {
      setAlertInvest(true)
      setTimeout(() => {
        setAlertInvest(false)
        setShowInvestment(false)
      }, 3000)
      const p = response.data
      invest(defaultValue)
      investData(defaultValue)
    })
      .catch(function (error) {
        // console.log(error)
      })
  }
  // console.log(resultPortfolio)
 
  const [dataId, setDataId] = useState('')
  const [validated, setValidated] = useState('')
  const [dataRow, setDataRow] = useState([])
  const [showExpand, setShowExpand] = useState(false)
  const [show, setShow] = useState(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
  const [wid, setWid] = useState('170%')
  const [mar, setmar] = useState('-6%')
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [showInvestment, setShowInvestment] = useState(false)

  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setWid('181%')
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
  const [allInvestData, setAllInvestData] = useState('')
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
  }
  const handleClose = () => setShow(false)
  const handleShow = (id) => {
    // console.log(id)
    setDataId(id)
    setShow(true)
  }
 
  const handleShowInvestment = () => {
    // console.log('Clicked Investment')
    setShowInvestment(true)
    setValidated(false)
  }
  const [name, setname] = useState('')
  let dataInvestPortfolio = []
  const [credentialsInfoInvest, setCredentialsInfoInvest] = useState({
    portfolio_id: resultPortfolio?.[0]?.portfolio_id,
    userId: getId
  })
  const handleChange = (event) => {
    setResult([])
    setDays(30)
    setR(false)
    setResultFilter1([])
    setAllInvestData(event)
    port_id={}
    dataInvestPortfolio = resultPortfolio.filter((i) => i.portfolio_name == event)
    // console.log(dataInvestPortfolio?.[0]?.portfolio_id)
    setCredentialsInfoInvest({
      portfolio_id: dataInvestPortfolio?.[0]?.portfolio_id,
      userId: getId
    })
    setDefaultValue(dataInvestPortfolio?.[0]?.portfolio_id)
    invest(dataInvestPortfolio?.[0]?.portfolio_id)
    investData(dataInvestPortfolio?.[0]?.portfolio_id)
    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
    //     params: { portfolio_id: dataInvestPortfolio?.[0]?.portfolio_id }
    //   })
    //   .then((response) => {
    //     response.data.sort((a, b) => {
        
    //       var x = new Date(a.created_date).getTime()/1000
    //      var y = new Date(b.created_date).getTime()/1000
    //      return x > y ? -1 : x < y ? 1 : 0
    //    })
    //    const temp= response.data.map(record=>{
    //     return {...record, quantity:parseInt(record.quantity)}
    //    })
       
    //     setResult(temp);
    //     var d2 = Math.floor(new Date().getTime() / 1000);
    //     var d1 = d2 - 30*86400
    //     var r1 = temp.filter(
    //      (item) =>
    //        new Date(item.created_date).getTime() / 1000 >= d1 &&
    //        new Date(item.created_date).getTime() / 1000 <= d2 
    //    );
    //   //  console.log(r1);
    //   if(r1.length==0){
    //     setAlertNoRecord(true)
    //   }else{
    //    setR(true)
       
    //    setResultFilter1(r1);
    //   }
    //   })
  }
  useEffect(async () => {
    await accountant()
    await handlePortfolios()
  }, [])
  const data2 = result
  const columns2 = [
    {
      dataField: 'investment_name',
      text: 'Name',
      sort: true,
      // filter: textFilter({
      //   placeholder:'name',
      // getFilter: filter => {
      //   nameIFilter = filter;
      // }
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{textAlign:'center', marginLeft:'-2em'}}>
            <p className='invest_name'>
              {row.investment_name}
            </p>
          </div>
        )
      }
    },
    // {
    //   dataField: 'investment_type',
    //   text: 'Type',
    //   sort: true,
    //   filter: textFilter({
    //     placeholder:'type',
    //   getFilter: filter => {
    //     typeIFilter = filter;
    //   }
    //   }),
    // },
    // {
    //   dataField: 'date_of_investment',
    //   text: 'Date',
    //   sort: true,
    //   filter: dateFilter({
    //     placeholder:'date',
    //   getFilter: filter => {
    //     dateIFilter = filter;
    //   }
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}>
    //         {moment(row.date_of_investment).format('Do MMMM YYYY')}
    //       </p>
    //     )
    //   }
    // },
    // {
    //   dataField: 'quantity',
    //   text: 'Qty',
    //   sort: true,
    //   filter: textFilter({
    //     placeholder:'quantity',
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white', fontSize: '14px' }}>
    //         {row.quantity}
    //       </p>
    //     )
    //   }
    // },
    
    // {
    //   dataField: 'buy_value',
    //   text: 'Value',
    //   sort: true,
    //   filter: textFilter({
    //     placeholder:'purchase-value',
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>

    //       {row.currency=='USD' ?
    //       <span style={{ color: 'white', fontSize: '14px' }}>
    //          ${parseFloat(parseFloat(row.buy_value).toFixed(2)).toLocaleString()+' ' +row.currency.toUpperCase()} 
    //       </span> : <span style={{ color: 'white' }}>
    //               ${parseFloat(parseFloat(row.buy_value).toFixed(2)).toLocaleString()}
    //               <p style={{ color: 'white' }}>{parseFloat(parseFloat(row.exchange_value).toFixed(2)).toLocaleString()+' ' +row.currency.toUpperCase()}</p> 
    //             </span>
          
    //       }

    //       </>
    //     )
    //     }
    // },
    // {
    //   dataField: 'purchase_price',
    //   text: 'Price',
    //   sort: true,
    //   filter: textFilter({
    //     placeholder:'purchase-price',
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white', fontSize: '14px' }}>
    //         ${parseFloat(parseFloat(row.purchase_price).toFixed(2)).toLocaleString()}
    //       </p>
    //     )
    //   }
    // },
    // {
    //   dataField: 'updated_date',
    //   text: 'Created date',
    //   sort: true,
    //   filter: dateFilter({
    //     placeholder:'updated date',
    //   getFilter: filter => {
    //     updatedDateFilter = filter;
    //   }
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
    //         {moment(row.updated_date).format('Do MMMM YYYY, h:mm:ss a')}
    //       </p>
    //     )
    //   }
    // },
    // {
    //   dataField: 'comments',
    //   text: 'Comments',
    //   sort: true,
    //   filter: textFilter({
    //     placeholder:'comments',
    //   getFilter: filter => {
    //     commentFilter = filter;
    //   }
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white', fontSize: '14px' }}>
    //         {((row.comments) == null) ? <p style={{ color: 'white', fontSize: '14px' }}>N/A</p> : <p style={{ color: 'white', fontSize: '14px' }}>{row.comments}</p>}
    //       </p>
    //     )
    //   },
      
    // }
  ]

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
                <h3 className="pagetitle">Investment Transactions</h3>
              </span>
              <Link
                className="p-2 pageheader"
                to="#"
                onClick={refresh_wallet}
                style={{top:'11px',position:'relative',marginLeft:'-15px'}}
              >
                <Tooltip title="Refresh">
                  <Icon
                    icon="ic:sharp-refresh"
                    style={{ fontSize: '25px', color: '#FFC107' }}
                  />
                </Tooltip>
              </Link>
              <span className="p-2 pageheader" style={{display:'flex',flexDirection:'row',gap:'0.5em',justifyContent:'space-evenly'}}>
                <Autocomplete
                  value={allInvestData}
                  options={resultPortfolio?.map((e) => e.portfolio_name)}
                  onChange={(e, k) => {
                    handleChange(k)
                  }}
                  classes={{
                    option: styles.option
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }}>{children}</Paper>
                  )}
                  style={{
                    fill: 'white',
                    boxShadow: 'none',
                    width: '140px',
                    fontSize: '8px',
                    borderRadius: '15px',
                    marginLeft:'-2.5em'

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
                      style={{ color: 'white' }}
                      label="Portfolios"
                    />
                  )}
                />
             
              <FormControl  style={{ marginLeft:'3.5em'}}>
                      <InputLabel id="demo-multiple-checkbox-label"
                        style={{
                          fontSize: '14px',
                          overflow: 'visible',
                          color: 'white',
                          height: '3rem',
                          zIndex: 'auto',
                          top:'-6px'

                        }}>Investment
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={defaultInvest}
                        onChange={(e,k) => {
                          handleInvestChange(e,k)
                        }}
                        input={<OutlinedInput label="Investment" />}
                        renderValue={(selected) => selected.join(', ')}
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
                              },
                              '& .MuiCheckbox-root': {
                                color: 'white'
                              }
                            }
                          }
                        }}
                        sx={{
                          width: '190px',
                          height: '32px',
                          border: '1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: 'white'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          left: '4px'
                        }}
                      // MenuProps={MenuProps}
                      >
                        {investList.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox name={name} value={name} checked={defaultInvest.includes(name)} 
                                onChange={investmentCheckboxHandler}
                              />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))
                        }
                      </Select>
                    </FormControl>

              <FormControl >
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{
                          overflow: "visible",
                          color: "white",
                          marginLeft:'-2px',
                          top:'-6px'
                          
                        }}
                      >
                        days
                      </InputLabel>
                      <Select
                        MenuProps={{
                          classes: {
                            paper: styles.paper,
                          },
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root:hover": {
                                backgroundColor: "lightgrey",
                                color: "black",
                              },
                              "& .MuiMenuItem-root.Mui-selected:hover": {
                                backgroundColor: "lightgrey",
                                color: "black",
                              },
                            },
                          },
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Select"
                        sx={{
                          width: '200px',
                           height: '32px',
                           border:'1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: '#252825'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          // top:'5px'
                          // left: '4px'
                        }}
                        onChange={(e)=>handleChangeDate(e)}
                        value={days}
                      >
                          <MenuItem value={30}>
                            30 days
                          </MenuItem>
                           <MenuItem value={90}>
                           3 months
                         </MenuItem>
                         <MenuItem value={180}>
                           6 months
                         </MenuItem>
                         <MenuItem value={365}>
                           1 year
                         </MenuItem>
                          <MenuItem value={1095}>
                           3 year
                         </MenuItem>
                          <MenuItem value={1825}>
                           5 year
                         </MenuItem>
                          <MenuItem value={3650}>
                           10 year
                         </MenuItem>
                      </Select>
                    </FormControl>
                    </span>
              <SearchBox
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = resultFilter1?.filter(i => i.investment_name.toLowerCase().includes(event.target.value.toLowerCase()))
                  setSearch(x)
                }}
              />
              <Link
                className="p-2"
                to='/PMS/Investments' style={{marginTop:'.5%',right:'-3px',position:'fixed'}}
                state={{ from: allInvestData  }} >
                <ArrowCircleLeftOutlinedIcon style={{ color: '#FFC107', fontSize: '27px' }} />
              </Link>
            </Row>
            <div>
            {loading
              ? (
                <Spinner
                  style={{
                    // marginBottom: '-24%',
                    top:"20em",
                    marginLeft: '40%',
                    height: '70px',
                    width: '70px',
                    zIndex:"100",
                    position:"absolute"
                  }}
                  animation="border"
                  variant="primary"
                />
                )
              : null}
              {sea
                ? <CommonTableInvTop data={search} columns={columns2} />
                : <CommonTableInvTop loading={loading} days={days} data={r ? resultFilter1.filter((ele) => defaultInvest.includes(ele.investment_name))  :  data2} columns={columns2} />
              }
           </div>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} style={{ width: '35%', marginTop: '20%', overflow: 'hidden', marginLeft: '39%', backgroundColor: '#222429', height: '22%', border: '1px solid grey', borderRadius: '15px' }}>
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <Modal.Title style={{ color: 'white', fontSize: '18px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this Investment ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-4%' }}>
          <Button variant="danger" style={{ width: '25%' }}
            onClick={() => {
              handleClose()
            }
            }
          >
            Yes
          </Button>
          <Button variant="success" onClick={handleClose} style={{ width: '25%' }}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showInvestment}
        onHide={handleCloseInvestment}
        style={{ width: '40%', marginLeft: '30%' }}
      >
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <IconButton
            style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
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
            style={{ marginBottom: '4%' }}
            onSubmit={handleSubmitForm}
          >
            {alertInvest
              ? (
                <Snackbar
                  open={alertInvest}
                  onClose={() => setAlertInvest(false)}
                  sx={{ marginLeft: '37%', marginBottom: '40%', width: '25%' }}
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
                    Added Investment successfully
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )}
            <h4>Add Investment</h4>
            <Form.Label
              htmlFor="name"
              className={cx('custom-form-box', {
                'focus-add': credentialsInfoInvest.invest_name
              })}
              style={{ marginTop: '-4%', width: '50%', marginLeft: '25%' }}
            >
              <Form.Control
                type="text"
                id="name"
                name="invest_name"
                onChange={handleInputChangeInvest}
                required
                style={{ color: 'white' }}
              />
              <span style={{ background: 'none', color: 'white' }}>
                name
              </span>
              <Form.Control.Feedback type="invalid">
                Name Required.
              </Form.Control.Feedback>
            </Form.Label>
            <Form.Label
              htmlFor="type"
              className={cx('custom-form-box', {
                'focus-add': credentialsInfoInvest.invest_type
              })}
              style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-2%' }}
            >
              {' '}
              <Form.Control
                type="text"
                id="type"
                name="invest_type"
                onChange={handleInputChangeInvest}
                required
                style={{ color: 'white' }}
              />
              <span style={{ background: 'none', color: 'white' }}>
                type
              </span>
              <Form.Control.Feedback type="invalid">
                Type Required.
              </Form.Control.Feedback>
            </Form.Label>
            <Form.Label
              htmlFor="investment"
              className={cx('custom-form-box', {
                'focus-add': credentialsInfoInvest.date_of_invest
              })}
              style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-2%' }}
            >
              {' '}
              <Form.Control
                type="date"
                id="investment"
                name="date_of_invest"
                onChange={handleInputChangeInvest}
                required
                style={{
                  color: 'white'
                }} />
              <Form.Control.Feedback type="invalid">
                Date Required.
              </Form.Control.Feedback>
            </Form.Label>
            <Form.Label
              htmlFor="value"
              className={cx('custom-form-box', {
                'focus-add': credentialsInfoInvest.invest_value
              })}
              style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-2%' }}
            >
              <Form.Control
                type="text"
                id="value"
                name="invest_value"
                onChange={handleInputChangeInvest}
                required
                style={{ color: 'white' }}
              />
              <span style={{ background: 'none', color: 'white' }}>
                value
              </span>
              <Form.Control.Feedback type="invalid">
                Value Required.
              </Form.Control.Feedback>
            </Form.Label>
            <Button
              type="submit"
              variant=""
              className="btn btn-gray"
              onClick={handleAddInvestment}
              style={{ width: '50%', marginLeft: '25%', marginTop: '-6%', boxShadow: 'none' }}
            >
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={showInvestUpdateModal}
        onHide={handleCloseInvestmentModal}
        style={{ width: '28%', marginLeft: '35%', overflow: 'hidden' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0' }}
              sx={{
                '.MuiSvgIcon-root': {
                  fill: 'white'
                }
              }}
              onClick={() => setShowInvestUpdateModal(false)}
            >
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
              {alertInvestComment
                ? (
                  <Snackbar
                    open={alertInvestComment}
                    onClose={() => setAlertInvest(false)}
                    sx={{ marginLeft: '40%', marginBottom: '40%', width: '25%' }}
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
                      Updated Investment successfully
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
                    sx={{ marginLeft: '38%', marginBottom: '38%', width: '25%' }}
                  >
                    <Alert
                      onClose={() => setAlertAl(false)}
                      severity="error"
                      sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                    >
                      already exist
                    </Alert>
                  </Snackbar>
                  )
                : <></>
              }
              {alertForInvestValue
                ? (
                  <Snackbar
                    open={alertForInvestValue}
                    onClose={() => setAlertForInvestValue(false)}
                    sx={{ marginLeft: '37%', marginBottom: '40%', width: '25%' }}
                  >
                    <Alert
                      onClose={() => setAlertForInvestValue(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Investment value should be numeric
                    </Alert>
                  </Snackbar>
                  )
                : (<></>)
              }
              <h4 >Update Investment</h4>
              <span style={{ color: 'white', marginLeft: '52px', fontWeight: 'bold' }}>Investment name - <span style={{ marginLeft: '2px', fontWeight: '200' }}>{invest_name}</span></span>
              <Form.Label
                htmlFor="type"
                className={cx('custom-form-box', {
                  'focus-add': invest_type
                })}
                style={{ width: '72%', marginBottom: '10%', marginLeft: '15%', marginTop: '2%' }}
              >
                {' '}
                <Form.Control
                  type="text"
                  id="type"
                  name="invest_type"
                  value={invest_type}
                  onChange={(e) => setInvest_type(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Type Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="investment"
                className={cx('custom-form-box', {
                  'focus-add': date_of_invest
                })}
                style={{ width: '72%', marginBottom: '10%', marginLeft: '15%', marginTop: '-2%' }}
              >
                {' '}
                <Form.Control
                  type="date"
                  id="investment"
                  name="date_of_invest"
                  value={date_of_invest}
                  onChange={(e) => setDate_of_invest(e.target.value)}
                  required
                  style={{
                    color: 'white'
                  }} />
                <Form.Control.Feedback type="invalid">
                  Date Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="value"
                className={cx('custom-form-box', {
                  'focus-add': invest_value
                })}
                style={{ width: '72%', marginBottom: '10%', marginLeft: '15%', marginTop: '-2%' }}
              >
                {' '}
                <Form.Control
                  type="text"
                  id="value"
                  name="invest_value"
                  value={invest_value}
                  onChange={(e) => setInvest_value(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Value Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="value"
                className={cx('custom-form-box', {
                  'focus-add': comment
                })}
                style={{ width: '72%', marginBottom: '10%', marginLeft: '15%', marginTop: '-2%' }}
              >
                {' '}
                <Form.Control
                  type="text"
                  id="value"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Comments Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn btn-gray"
                onClick={handleUpdateInvestment}
                style={{ width: '50%', marginLeft: '25%', marginTop: '-6%', boxShadow: 'none' }}
              >
                Save
              </Button>
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
export default InvestmentAccountantHistory