import React, { useState, useEffect } from 'react'
import '../../common/CommonTable/CommonTable.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import '../../Admin/DashboardAdmin/DashboardAdmin.css'
import Header from '../../common/Header/Header'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
import Spinner from '../../common/spinner'
import { Icon } from '@iconify/react'
import CommonTableTransaction from "../../common/CommonTable/CommonTableTransaction";
import TextField from '@mui/material/TextField'
import { textFilter,numberFilter,dateFilter } from 'react-bootstrap-table2-filter';
import Tooltip from '@mui/material/Tooltip'
import Autocomplete from '@mui/material/Autocomplete'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import moment from 'moment'
import CommonTableInvH from '../../common/CommonTable/CommonTable'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../../common/SearchBox/SearchBox'


const useStyles = makeStyles({
  paper: {
    background: ' rgb(31, 33, 37) !important',
    color: 'white !important'
  },
  option: {
    '&:hover': {
      backgroundColor: ' grey !important',
      color: 'white !important'
    }
  }
})
function ExchangeHistory () {
  const styles = useStyles()
  const getId = localStorage.getItem('sub_Id')
  const [alertInvestComment, setAlertInvestComment] = useState(false)
  const [alertForInvestValue, setAlertForInvestValue] = useState(false)
  const [alertInvest, setAlertInvest] = useState(false)
  const [resultPortfolio, setResultPortfolio] = useState([])
  const handleCloseInvestment = () => setShowInvestment(false)
  const handleCloseInvestmentModal = () => setShowInvestUpdateModal(false)
  const [alertComment, setAlertComment] = useState(false)
  const roleId = localStorage.getItem('role').split(',')
  const [dataNew, setDataNew] = useState([])
  const [showComment, setShowComment] = useState(false)
  const [alertNoRecord, setAlertNoRecord]=useState(false)
  const [alertNoRecordDate, setAlertNoRecordDate]=useState(false)
  const [investment_id, setInvestment_id] = useState('')
  const [invest_name, setInvest_name] = useState('')
  const [invest_type, setInvest_type] = useState('')
  const [date_of_invest, setDate_of_invest] = useState('')
  const [invest_value, setInvest_value] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setloading] = useState(false)
  const [alertAl, setAlertAl] = useState(false)
  const [showInvestUpdateModal, setShowInvestUpdateModal] = useState(false)
  const [userId, setUserId] = useState(getId)
  const location = useLocation()
  const locationName = location.state
  const p_name = location.state?.dataP
  const port_id = location.state?.data?.portfolio_id
  // console.log(locationName)
  const [isHoveringColor, setIsHoveringColor] = useState(false)
  let symbolFilter, priceFilter, costFilter, sideFilter, infoFilter, timestampFilter, updateDFilter, commentEFilter, amountFilter
  const handleMouseEnterColor = () => {
    setIsHoveringColor(true)
  }
  const handleMouseLeaveColor = () => {
    setIsHoveringColor(false)
  }
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
  const handleChangeDate=(e)=>{
    console.log(e.target.value)
    setDays(e.target.value)
    setResultFilter1([])
    // setResultExchange1([]);
    setR(false)
    if(e.target.value==30){
      var d2 = Math.floor(new Date().getTime() / 1000);
       var d1 = d2 - 30*86400
      console.log(d1,d2)
        setR(true);
        let r1 = resultExchange1.filter(
          (item) =>
          Math.floor(item.timeStamp / 1000) >= d1 &&
          Math.floor(item.timeStamp / 1000)<= d2
        );
        if(r1.length==0) {
          setAlertNoRecord(true)
          setResultFilter1([]);
        }else{
          setResultFilter1(r1);
        }
       
      }else if(e.target.value==90){
        var d2 = Math.floor(new Date().getTime() / 1000);
         var d1 = d2 - 90*86400
           setR(true);
          let r1 = resultExchange1.filter(
            (item) =>
            Math.floor(item.timeStamp / 1000) >= d1 &&
            Math.floor(item.timeStamp / 1000) <= d2
          );
          if(r1.length==0) {
            setAlertNoRecord(true)
            setResultFilter1([]);
          }else{
            setResultFilter1(r1);
          }
          } else if(e.target.value==180){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 180*86400
          
               setR(true);
              let r1 = resultExchange1.filter(
                (item) =>
                Math.floor(item.timeStamp / 1000) >= d1 &&
                Math.floor(item.timeStamp / 1000) <= d2
              );
              if(r1.length==0) {
                setAlertNoRecord(true)
                setResultFilter1([]);
              }else{
                setResultFilter1(r1);
              }
          } else if(e.target.value==365){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 365*86400
            
               setR(true);
              let r1 = resultExchange1.filter(
                (item) =>
                Math.floor(item.timeStamp / 1000) >= d1 &&
                Math.floor(item.timeStamp / 1000) <= d2
              );
              if(r1.length==0) {
                setAlertNoRecord(true)
                setResultFilter1([]);
              }else{
                setResultFilter1(r1);
              }
            }else if(e.target.value==1095){
              var d2 = Math.floor(new Date().getTime() / 1000);
               var d1 = d2 - 1095*86400
              
                 setR(true);
                let r1 = resultExchange1.filter(
                  (item) =>
                  Math.floor(item.timeStamp / 1000) >= d1 &&
                  Math.floor(item.timeStamp / 1000) <= d2
                );
                if(r1.length==0) {
                  setAlertNoRecord(true)
                  setResultFilter1([]);
                }else{
                  setResultFilter1(r1);
                }
              }else if(e.target.value==1825){
                var d2 = Math.floor(new Date().getTime() / 1000);
                 var d1 = d2 - 1825*86400
                
                   setR(true);
                  let r1 = resultExchange1.filter(
                    (item) =>
                    Math.floor(item.timeStamp / 1000) >= d1 &&
                    Math.floor(item.timeStamp / 1000) <= d2
                  );
                  // console.log(r1)
                  if(r1.length==0) {
                    setAlertNoRecord(true)
                    setResultFilter1([]);
                  }else{
                    setResultFilter1(r1);
                  }
                }else if(e.target.value==3650){
                  var d2 = Math.floor(new Date().getTime() / 1000);
                   var d1 = d2 - 3650*86400
                  
                     setR(true);
                    let r1 = resultExchange1.filter(
                      (item) =>
                      Math.floor(item.timeStamp / 1000) >= d1 &&
                      Math.floor(item.timeStamp / 1000) <= d2
                    );
                    console.log(r1)
                    if(r1.length==0) {
                      setAlertNoRecord(true)
                      setResultFilter1([]);
                    }else{
                      setResultFilter1(r1);
                    }
                  }
    }
  const handleInputChangeInvest = (event) => {
    const { name, value } = event.target
    setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
  }
  const [defaultValue, setDefaultValue] = useState('')
  const handlePortfolios = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    await axios(config).then(function (response) {
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
        setResultPortfolio(arr)
        setAllInvestData(arr[0].portfolio_name)
      } else {
      if (port_id != undefined) {
        const dp = rs?.filter(i => i.portfolio_id == port_id)
        exchange(port_id)
        setDefaultValue(port_id)
        setAllInvestData(dp?.[0].portfolio_name)
        setResultPortfolio(rs)

      } else if (locationName.data != undefined) {
        const dp = rs?.filter(i => i.portfolio_id == locationName.data)
        exchange(locationName.data )
        setDefaultValue(locationName.data )
        setAllInvestData(dp?.[0].portfolio_name)
        setResultPortfolio(rs)
      }
      else if(p_name!=undefined) {
        const di = rs?.filter(i => i.portfolio_name == p_name)
        const dii = di?.[0].portfolio_id
        setDefaultValue(di?.[0].portfolio_id)
        setAllInvestData(di?.[0].portfolio_name)
        setResultPortfolio(rs)
        exchange(dii)
      }else{
        const dii = rs?.[0].portfolio_id
        setDefaultValue(rs?.[0].portfolio_id)
        setAllInvestData(rs?.[0].portfolio_name)
        setResultPortfolio(rs)
        exchange(dii)
      }
      }
    })
  }
  const exchange = async (dii) => {
    setloading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_exchange_list_OfPortfolio`, {
        params: { portfolio_id: dii }
      })
      .then((response) => {
        if (locationName.e_name!=undefined && response.data.length>0) {
          const t = response.data?.filter(i=>i.exchange_name===locationName.e_name)
          transaction(t?.[0]?.exchange_apikey)
          setDefaultExchange(t?.[0]?.exchange_name)
          setResult(response.data)
        } else if(response.data.length>0) {
          const t = response.data?.[0]?.exchange_apikey
          transaction(t)
          setloading(false)
          setDefaultExchange(response.data?.[0]?.exchange_name)
          setResult(response.data)
        }else{
          setAlertNoRecord(true)
          setDefaultExchange([])
          setResult([])
          setloading(false)

        }
      })
  }
  const refresh_wallet = async () => {
    setloading(true)
    const p = resultPortfolio?.filter(i => i.portfolio_name == allInvestData)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_exchange_list_OfPortfolio`, {
        params: { portfolio_id: p?.[0]?.portfolio_id }
      })
      .then((response) => {
        if (response.data.length > 0) {
          const t = response.data?.[0]?.exchange_apikey
          transaction(t)
          setloading(false)
        } else {
          setloading(false)
        }
      })
  }
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
  const [defaultExchange, setDefaultExchange] = useState('')
  const [resultExchange1, setResultExchange1] = useState([])
  const [sea, setSea] = useState('')
  const [days,setDays] = useState(30)
  const [resultFilter1, setResultFilter1] = useState([])
  const [r, setR] = useState(false)
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
    setDataId(id)
    setShow(true)
  }
  const [result, setResult] = useState([])
  const handleShowInvestment = () => {
    setShowInvestment(true)
    setValidated(false)
  }
  const [name, setname] = useState('')
  const dataExchPortfolio = []
  const [credentialsInfoInvest, setCredentialsInfoInvest] = useState({
    portfolio_id: resultPortfolio?.[0]?.portfolio_id,
    userId: getId
  })
  const handleChange = (event) => {
    setR(false)
    // setResultFilter1([])
    setDays(30)
    setResultExchange1([]);
    setAllInvestData(event)
    const exch_data = resultPortfolio.filter((i) => i.portfolio_name == event)
    if(exch_data.length==0) {
      setDays('')
      setDefaultExchange('')
      setResultExchange1([]);
      setResultFilter1([])

    }else{
      exchange(exch_data?.[0]?.portfolio_id)
    }
     
  }
  const transaction = async (t) => {
    setloading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_exchange_history`, {
        params: { api_key: t }
      })
      .then((response) => {
        if(response.data.length==0){
          setAlertNoRecord(true)
          setloading(false)
        }else{
          let temp = response.data?.map(record=>{
           return {...record, exchange_date: new Date(parseInt(record.timeStamp)).toUTCString(),date:new Date(parseInt(record.updated_time)).toUTCString(),cost:parseFloat(record.cost),amount:parseFloat(record.amount),id:parseInt(record.id),info:parseInt(JSON.parse(record.info)?.orderId),
          price: parseFloat(record.price)}
          })
        setResultExchange1(temp);
        if(days==30){
        var d2 = Math.floor(new Date().getTime() / 1000);
        var d1 = d2 - 30*86400
        var r1 = temp.filter(
         (item) =>
         Math.floor(item.timeStamp / 1000) >= d1 &&
         Math.floor(item.timeStamp/ 1000) <= d2
       );
       if(r1.length==0) setAlertNoRecord(true)
       setR(true)
       setloading(false)
       setResultFilter1(r1);
        }
      }
      })
  }
  const handleChange11 = (event) => {
    setR(false)
    setResultFilter1([])
    // setResultExchange1([]);
    setDays(30)
    const api = result?.filter((i) => i.exchange_name == event.target.value)
    setDefaultExchange(event.target.value)
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_exchange_history`, {
        params: { api_key: api?.[0]?.exchange_apikey }
      })
      .then((response) => {
        if(response.data.length==0){
          setAlertNoRecord(true)
          setResultExchange1([])
        }else{
          let temp = response.data?.map(record=>{
            return {...record, exchange_date: new Date(parseInt(record.timeStamp)).toUTCString(),date:new Date(parseInt(record.updated_time)).toUTCString(),cost:parseFloat(record.cost), amount:parseFloat(record.amount),id:parseInt(record.id),info:parseInt(JSON.parse(record.info)?.orderId),
              price: parseFloat(record.price)
            }
           })
           console.log(temp)
        setResultExchange1(temp);
          // if(days==30){
          var d2 = Math.floor(new Date().getTime() / 1000);
      var d1 = d2 - 30*86400
      
      var r1 = temp.filter(
       (item) =>
       Math.floor(item.timeStamp / 1000) >= d1 &&
       Math.floor(item.timeStamp / 1000)<= d2
     );
     if(r1.length==0) setAlertNoRecord(true)
     setR(true)
     setResultFilter1(r1);
      // }
    }
      })
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
  useEffect(async () => {
    await accountant()
    await handlePortfolios()
  }, [])
  const data2 = resultExchange1
  const columnsExch = [
    {
      dataField: 'symbol',
      text: 'Symbol',
      sort: true,
      filter: textFilter({
        placeholder:'symbol',
      getFilter: filter => {
        symbolFilter = filter;
      }
      }),
    },
    {
      dataField: 'amount',
      text: 'Volume',
      sort: true,
      filter: textFilter({
        placeholder:'volume',
      getFilter: filter => {
        amountFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            ${parseFloat(row.amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'price',
      text: 'Market price',
      sort: true,
      filter: textFilter({
        placeholder:'price',
      getFilter: filter => {
        priceFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            ${row.price.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'cost',
      text: 'Cost',
      sort: true,
      filter: textFilter({
        placeholder:'cost',
      getFilter: filter => {
        costFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color:'white', fontSize: '14px' }}>
            ${row.cost.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'side',
      text: 'Side',
      sort: true,
      filter: textFilter({
        placeholder:'side',
      getFilter: filter => {
        sideFilter = filter;
      }
      }),
    },
    {
      dataField: 'info',
      text: 'OrderId',
      sort: true,
      filter: textFilter({
        placeholder:'orderId',
      getFilter: filter => {
        infoFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            {row.info}
          </p>
        )
      }
    },
    {
      dataField: 'exchange_date',
      width: 150,
      text: 'Exchange Date',
      sort: true,
       sortFunc: (a, b, order) => {
        if (order === "asc") {
          return Date.parse(a) - Date.parse(b);
        } else if (order === "desc") {
          return Date.parse(b) - Date.parse(a);
        }
      },
      filter: dateFilter({
        placeholder:'exchange date',
      getFilter: filter => {
        timestampFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // const d = parseInt(row.exchange_date)
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              display: 'flex',
              flexDirection:'column'
            }}
          >
            <span style={{ color: 'white', fontSize: '14px' }}>
              {
               moment(row.exchange_date).format('Do MMMM YYYY, h:mm:ss a')?.split(',')[0]
              }
            </span><span style={{ color: 'white', fontSize: '14px' }}>
              {
               moment(row.exchange_date).format('Do MMMM YYYY, h:mm:ss a')?.split(',')[1]
              }
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'date',
      width: 150,
      text: 'Updated Date',
      sort: true,
      sortFunc: (a, b, order) => {
        if (order === "asc") {
          return Date.parse(a) - Date.parse(b);
        } else if (order === "desc") {
          return Date.parse(b) - Date.parse(a);
        }
      },
      filter: dateFilter({
        placeholder:'updated date',
      getFilter: filter => {
        updateDFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // const d1 = parseInt(row.date)
        // console.log(row.date)
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              display: 'flex',
              flexDirection:'column'
            }}
          >
            <span style={{ color: 'white', fontSize: '14px' }}>
              {
                moment(row.date).format('Do MMMM YYYY, h:mm:ss a')?.split(',')[0]
              }
            </span><span style={{ color: 'white', fontSize: '14px' }}>
              {
                moment(row.date).format('Do MMMM YYYY, h:mm:ss a')?.split(',')[1]
              }
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'comment',
      text: 'Comments',
      sort: true,
      filter: textFilter({
        placeholder:'comment',
      getFilter: filter => {
        commentEFilter = filter;
      }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap' }}>
            {((row.comment) == null) ? <p style={{ color: 'white', fontSize: '14px' }}>-</p> : <p style={{ color: 'white', fontSize: '14px' }}>{row.comment}</p>}
          </p>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Row className="d-flex justify-content-center" style={{marginBottom:'8px'}}>
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Exchange Transactions</h3>
              </span>
              <Link
                className="p-2 pageheader"
                to="#"
                onClick={refresh_wallet}
                style={{position:'relative',top:'11px'}}
              >
                <Tooltip title="Refresh">
                  <Icon
                    icon="ic:sharp-refresh"
                    style={{ fontSize: '25px', color: '#FFC107' }}
                  />
                </Tooltip>
              </Link>
              <SearchBox
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = data2?.filter(i => i.symbol?.toLowerCase().includes(event.target.value?.toLowerCase()))
                  if(x.length==0) setAlertNoRecord(true)
                  setSearch(x)
                }}
              />
              <Link
                className="p-2"
                to='/PMS/ViewExchanges'
                style={{position:'fixed',right:'2px',marginTop:'0.5%'}}
                state={{ from: allInvestData }} >
                <ArrowCircleLeftOutlinedIcon style={{ color: '#FFC107', fontSize: '27px' }} />
              </Link>
              </Row>
              <Row>
                <Autocomplete
                   className="p-2"
                  value={allInvestData}
                  options={resultPortfolio?.map((e) => e.portfolio_name)}
                  onChange={(e, k) => {
                    handleChange(k)
                  }}
                  classes={{
                    option: styles.option
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: ' rgb(31, 33, 37)', color: 'white' }}>{children}</Paper>
                  )}
                  style={{
                    fill: 'white',
                    boxShadow: 'none',
                    fontSize: '10px',
                    borderRadius: '30%',
                    width:'220px'
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
                      top:'-7px'
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                    // onChange={(e)=>{
                    //      let resFilt=resultPortfolio.filter(i=>i.portfolio_name==e.target.value)
                    //      if(resFilt.length==0){
                    //       setDays('')
                    //      }
                    // }}
                      {...params}
                      style={{ color: 'white' }}
                      label="Portfolios"
                    />
                  )}
                />
                <FormControl  className="p-2 pageheader" >
                  <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '13px', overflow: 'visible', color: 'white' }}>Exchange</InputLabel>
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
                    value={defaultExchange}
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
                      // left: '4px'
                    }}
                    onChange={handleChange11}
                  >
                    {result?.map((e) => (
                      <MenuItem value={e.exchange_name}>{e.exchange_name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              <FormControl className="p-2">
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{
                          overflow: "visible",
                          color: "white",
                          marginLeft:'7px'
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

              <div className='transaction-wallet'>
              {sea
                ? <CommonTableTransaction data={search} columns={columnsExch} />
                : <CommonTableTransaction  loading={loading} data={ resultFilter1} columns={columnsExch} />
              }
              </div>
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
      </Modal>
      <Modal
        show={alertNoRecordDate}
        onHide={()=>setAlertNoRecordDate(false)}
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
                marginLeft: '6.5px',
                fontWeight: 'bold'
              }}
          >
            Please select previous month to view transactions
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-4%',
              width: '42em',
              justifyContent: 'center'
            }}
        >
          <button
          //  variant="success"
          className='past-transaction'
          
            onClick={() => {
              setAlertNoRecordDate(false)
            }}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal> */}

    </React.Fragment>
  )
}
export default ExchangeHistory
