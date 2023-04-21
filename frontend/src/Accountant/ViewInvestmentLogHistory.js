import React, { useState, useEffect } from 'react'
import CommonTable from '../common/CommonTable/CommonTable'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../Admin/DashboardAdmin/DashboardAdmin.css'
import Tooltip from '@mui/material/Tooltip'
import Header from '../common/Header/Header'
import { Container, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../common/Modal.css'
import Spinner from '../common/spinner'
import { Icon } from '@iconify/react'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../common/SearchBox/SearchBox'
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
function InvestmentLogHistory () {
  const styles = useStyles()
  const getId = localStorage.getItem('sub_Id')
  // console.log(getId)
  const [resultPortfolio, setResultPortfolio] = useState([])
  const [resultTransaction, setResultTransaction] = useState([])
  const handleCloseInvestment = () => setShowInvestment(false)
  const [bigData, setBigData] = useState(false)
  const [search1, setSearch1] = useState([])
  const [search2, setSearch2] = useState([])
  const [resultExchange, setResultExchange] = useState([])
  const [isHovering, setIsHovering] = useState(false)
  const roleId = localStorage.getItem('role').split(',')
  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  const location = useLocation()
  const portfolioId = location.pathname.slice(30)
  // console.log(location.pathname.slice(20))
  const [alertInvest, setAlertInvest] = useState(true)
  const [loading, setloading] = useState(true)
  const [defaultSelect, setDefaultSelect] = useState('wallet')
  const [showdata, setShowData] = useState(false)
  const [resultAccount, setResultAccount] = useState([])
  const [allportfolio, setAllPortfolio] = useState([])
  const [result5, setResult5] = useState([])
  let acdata = []
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
      .then(function (response) {
        const p_data = response.data
        acdata = p_data
        setResultAccount(p_data)
      })
  }
  const portfolio_data = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_portfolio_users_data`, {
        params: {
          user_id: getId,
          user_role: (roleId?.includes('admin') === true) ? 'admin' : 'accountant'
        }
      }).then((response) => {
        const rs1 = response.data
        // console.log(rs1)
        if (rs1 !== 'error') {
          setResult5(rs1)
        } else {
          setResult5([])
        }
      })
  }
  const handleSelect = (event) => {
    // console.log(event.target.value)
    setDefaultSelect(event.target.value)
    if (event.target.value == 'wallet') {
      setShowData(false)
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/getAddressTransactionAuditHistory`
      }
      axios(config).then(function (response) {
        const rs = response.data
        const arr = []
        if (roleId.includes('accountant') === true && roleId.includes('admin') == false) {
          const a = resultAccount?.filter(i => i.accountant_id == getId)
          a?.forEach(el => {
            const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
            const me = { ...m }
            if (Object.values(me)[0] != undefined) {
              arr.push(Object.values(me)[0])
            }
          })
          setResultTransaction(arr)
        } else {
          setResultTransaction(rs)
        }
      })
    } else if (event.target.value == 'investment') {
      setShowData(true)
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/getAllInvestmentLogs`
      }
      axios(config).then(function (response) {
        const rs = response.data
        const arr = []
        if (roleId.includes('accountant') === true && roleId.includes('admin') == false) {
          const a = resultAccount?.filter(i => i.accountant_id == getId)
          a?.forEach(el => {
            const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
            const me = { ...m }
            arr.push(Object.values(me)[0])
          })
          setResultPortfolio(arr)
        } else {
          setResultPortfolio(rs)
        }
      })
    } else if (event.target.value == 'exchange') {
      setShowData(true)
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/get_exchange_history_logs?offset=0`
      }
      axios(config).then(function (response) {
        const rs = response.data
        const arr = []
        if (roleId.includes('accountant') === true && roleId.includes('admin') == false) {
          const a = resultAccount?.filter(i => i.accountant_id == getId)
          // console.log(acdata, a)
          a?.forEach(el => {
            const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
            const me = { ...m }
            // console.log(Object.values(me)[0], m, me)
            if (Object.values(me)[0] != undefined) {
              arr.push(Object.values(me)[0])
            }
          })
          setResultExchange(arr)
        } else {
          setResultExchange(rs)
        }
      })
    }
  }
  for(let c of resultPortfolio){
    c.portfolio=[]
    for(let d of result5){
      if(c.portfolio_id==d.portfolio_id){
        c.portfolio.push(d.portfolio_name)
      }
    }
  }
  for(let e of resultExchange){
    e.portfolio=[]
    for(let f of result5){
      if(e.portfolio_id==f.portfolio_id){
        e.portfolio.push(f.portfolio_name)
      }
    }
  }
  for (let a of resultTransaction){
    a.portfolio=[]
    for(let b of result5){
      if(a.portfolio_id==b.portfolio_id){
        a.portfolio.push(b.portfolio_name)
      }
    }
  }
  // console.log(resultTransaction)
  const handleTransactionLogs = async () => {
    setloading(true)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAddressTransactionAuditHistory`
    }
    await axios(config).then(function (response) {
      // console.log(response.data)
      const rs = response.data
      const arr = []
      if (roleId.includes('accountant') === true && roleId.includes('admin') == false) {
        const a = acdata?.filter(i => i.accountant_id == getId)
        a?.forEach(el => {
          const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
          const me = { ...m }
          if (Object.values(me)[0] != undefined) {
            arr.push(Object.values(me)[0])
          }
        })
        setloading(false)
        setResultTransaction(arr)
      } else {
        setloading(false)
        setResultTransaction(rs)
      }
    })
  }
  const refresh_wallet = async () => {
    if (defaultSelect == 'investment') {
      setloading(true)
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/getAllInvestmentLogs`
      }
      await axios(config).then(function (response) {
        // console.log(response.data)
        setResultPortfolio(response.data)
        setloading(false)
      })
    } else if (defaultSelect == 'wallet') {
      setloading(true)
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/getAddressTransactionAuditHistory`
      }
      await axios(config).then(function (response) {
        // console.log(response.data)
        setResultTransaction(response.data)
        setloading(false)
      })
    }
  }
  const [dataId, setDataId] = useState('')
  const [validated, setValidated] = useState('')
  const [dataRow, setDataRow] = useState([])
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
      // console.log(showDashboard)
      // console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('2.5%')
      setWid('159%')
      setmar('0%')
      setW('100%')
      setMargin('22%')
      setWidthData('6%')
      // console.log(showDashboard)
      // console.log(newWidth)
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
  const handleClose = () => setShow(false)
  const handleShow = (id) => {
    // console.log(id)
    setDataId(id)
    setShow(true)
  }
  const [result, setResult] = useState([])
  const handleShowInvestment = () => {
    // console.log('Clicked Investment')
    setShowInvestment(true)
  }
  useEffect(async () => {
    await accountant()
    await portfolio_data()
    await handleTransactionLogs()
  }, [])
  const columns1 = [
    {
      dataField: 'portfolio',
      text: 'Portfolio',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span style={{ color: 'white', fontSize: '14px' }}>
            {row.portfolio[0]!=null ? row.portfolio[0] : "N/A"}
            {/* {row.address_name == undefined ? <p>-</p> : row.address_name} */}
          </span>
        )
      }
    },
    {
      dataField: 'address_name',
      text: 'Address Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span style={{ color: 'white', fontSize: '14px' }}>
            {row.address_name == undefined ? <p>-</p> : row.address_name}
          </span>
        )
      }
    },
    {
      dataField: 'asset_chain',
      width: 50,
      text: 'Chain',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            {row.asset_chain}
          </p>
        )
      }
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: true,
      width: 200,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {
              row.send_data != null
                ? (
                  <li
                    style={{
                      whiteSpace: 'nowrap',
                      color: '#FFC107',
                    }}
                  >
                    <span style={{ color: '#FFC107',display:'flex' }}> amount:
                   <p style={{color:'white'}}> 
                   ${JSON.parse(row?.send_data)[0]?.amount?.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p>
                   </span>
                  </li>
                  )
                : (
                  <></>
                  )
            }
            {JSON.parse(row.amount)?.eth_gas_fee.toFixed(4) == null
              ? (
                <></>
                )
              : (
                <li
                  style={{
                    whiteSpace: 'nowrap',
                    color: '#FFC107',
                    fontSize: '14px'
                  }}
                >
                  <span style={{ color: '#FFC107',display:'flex' }}>gas fee:
                  <p style={{color:'white'}}>${JSON.parse(row?.amount)?.eth_gas_fee.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p>
                  </span>
                </li>
                )}
          </ul>
        )
      }
    },
    {
      dataField: 'new_comment_added',
      text: 'Comment',
      sort: true,
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            {row.new_comment_added}
          </p>
        )
      }
    },
    {
      dataField: 'amount',
      text: 'Address',
      sort: true,
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            <li style={{ whiteSpace: 'nowrap',color:'#FFC107' }}>
              {' '}
              <span style={{ color: '#FFC107',display:'flex' }}>from:{' '}
              {JSON.parse(row.amount)?.from_addr != null
                ? (
                   <p style={{color:'white'}}> {JSON.parse(row.amount)?.from_addr.slice(0, 17)}</p>
                  )
                : (
                  <></>
                  )}</span>
            </li>
            <li style={{ whiteSpace: 'nowrap',color: '#FFC107'}}>
              <span style={{ color: '#FFC107',display:'flex' }}> to:{' '}
             <p style={{color:'white'}}> {JSON.parse(row.amount)?.to_addr.slice(0, 20)}</p></span>
            </li>
            <li style={{ whiteSpace: 'nowrap',color: '#FFC107' }}>
              <span style={{ color: '#FFC107',display:'flex' }}> txn: {' '}
              <p style={{color:'white'}}>{row.transaction_id.slice(0, 19)}</p></span>
            </li>
          </ul>
        )
      }
    },
    {
      dataField: 'transaction_time',
      width: 150,
      text: 'Transaction Time',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              display: 'inline-block'
            }}
          >
            <span style={{ color: 'white', fontSize: '14px' }}>
              {moment(row.transaction_time).format('Do MMMM YYYY hh:mm:ss a')?.split(',')[0]}<br/>
              {moment(row.transaction_time).format('Do MMMM YYYY hh:mm:ss a')?.split(',')[1]}
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'updated_date',
      text: 'Updated Time',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              display: 'inline-block'
            }}
          >
            <span
              style={{ color: 'white', fontSize: '14px' }}
            >
              {moment(row.updated_time).format('Do MMMM YYYY hh:mm:ss a')?.split(',')[0]}<br/>
              {moment(row.updated_time).format('Do MMMM YYYY hh:mm:ss a')?.split(',')[1]}
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'usertype',
      text: 'Role User',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row.usertype.split(','))
        return (
          <>
            <div style={{ whiteSpace: 'nowrap' }}>
              <span
                style={{
                  color: 'white',
                  fontSize: '14px',
                  marginRight: '5px'
                }}
              >
                {row.usertype.split(',').includes('admin')===true ? 'admin' : 'accountant'}
              </span>{' '}
              -{' '}
              <span
                style={{
                  color: 'white',
                  fontSize: '14px',
                  marginLeft: '5px'
                }}
              >
                {row.username}
              </span>
            </div>
          </>
        )
      }
    }
  ]
  const columns2 = [
    {
      dataField: 'portfolio',
      text: 'Portfolio',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span style={{ color: 'white', fontSize: '12px' }}>
             {row.portfolio[0]!=null ? row.portfolio[0] : "N/A"} 
            {/* {row.address_name == undefined ? <p>-</p> : row.address_name} */}
          </span>
        )
      }
    },
    {
      dataField: 'investment_name',
      text: 'Name',
      sort: true
    },
    {
      dataField: 'investment_type',
      text: 'Type',
      sort: true,
      width: 50,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.investment_type?.slice(0, 10)}
          </p>
        )
      }
    },
    {
      dataField: 'date_of_investment',
      text: 'Created Date',
      sort: true,
      width: 150
    },
    {
      dataField: 'new_quantity',
      text: 'Quantity',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.new_quantity}
          </p>
        )
      }
    },
    {
      dataField: 'new_purchase_price',
      text: 'Purchase Price',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.new_purchase_price==null ? '-' :
           '$'+ parseInt(row.new_purchase_price).toLocaleString()
            }
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
            { row.new_purchase_price==null ? '-' :
             parseInt(row.new_quantity * row.new_purchase_price).toLocaleString()
            }
          </p>
        )
      }
    },
    {
      dataField: 'updated_date',
      text: 'Updated Time',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const date = new Date(row.updated_date).toString()
        const newDate = new Date(date).getTime()
        const istDate = new Date(newDate)
       
        return (
          <p
            style={{
              color: 'white',
              // width: '110%',
              fontSize: '12px',
              display: 'inline-block'
            }}
          >
            
            <span style={{ color: 'white', fontSize: '13px' }}>
            {moment(row.updated_date).format('MMMM Do YYYY, h:mm:ss a')}
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'user_type',
      text: 'Role User',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(JSON.parse(row.user_type))
        return (
          <>
            <div>
              <span
                style={{
                  color: 'white',
                  fontSize: '12px',
                  marginRight: '5px'
                }}
              >
                {JSON.parse(row.user_type)=='accountant,uma_protection,admin,user' || (JSON.parse(row.user_type)?.includes('accountant') && JSON.parse(row.user_type).includes('user') && JSON.parse(row.user_type).includes('admin') ) ? 'superAdmin' :JSON.parse(row.user_type)=='accountant'? JSON.parse(row.user_type) : JSON.parse(row.user_type) }
              </span>{' '}
              -{' '}
              <span
                style={{
                  color: 'white',
                  fontSize: '12px',
                  marginLeft: '5px'
                }}
              >
                {row.username}
              </span>
            </div>
          </>
        )
      }
    }
  ]
  const columns3 = [
    {
      dataField: 'portfolio',
      text: 'Portfolio',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span style={{ color: 'white', fontSize: '12px' }}>
             {row.portfolio[0]!=null ? row.portfolio[0] : "N/A"} 
            {/* {row.address_name == undefined ? <p>-</p> : row.address_name} */}
          </span>
        )
      }
    },
    {
      dataField: 'created_time',
      text: 'Date',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p
            style={{
              color: 'white',
              fontSize: '12px',
              display: 'inline-block'
            }}
          >
            <span style={{ color: 'white', fontSize: '13px' }}>
            {moment(row.created_time).format('MMMM Do YYYY, h:mm:ss a')}
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: true,
      width: 50,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.amount}
          </p>
        )
      }
    },
    {
      dataField: 'price',
      text: 'Price',
      sort: true,
      width: 150
    },
    {
      dataField: 'previous_comment',
      text: 'Previous Comment',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.previous_comment}
          </p>
        )
      }
    },
    {
      dataField: 'new_comment',
      text: 'Updated Comment',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.new_comment}
          </p>
        )
      }
    },
    {
      dataField: 'user_type',
      text: 'Role User',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span
                style={{
                  color: 'white',
                  fontSize: '12px',
                  marginRight: '5px'
                }}
              >
                {row.usertype}
              </span>{' '}
              -{' '}
              <span
                style={{
                  color: 'white',
                  fontSize: '12px',
                  marginLeft: '5px'
                }}
              >
                {row.username}
              </span>
            </div>
          </>
        )
      }
    }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12} >
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Audit History</h3>
              </span>
              <Link
                className="p-2 pageheader"
                to="#"
                onClick={refresh_wallet}
                style={{top:'10px',position:'relative'}}
              >
                <Tooltip title="Refresh">
                  <Icon
                    icon="ic:sharp-refresh"
                    style={{
                      fontSize: '25px',
                      color: '#FFC107',
                      
                    }}
                  />
                </Tooltip>
              </Link>
              <div className="p-2 pageheader">
                <FormControl >
                  <InputLabel
                    id="demo-simple-select-helper-label"
                    style={{
                      fontSize: '17px',
                      overflow: 'visible',
                      color: 'white',
                      top:'-6px'
                    }}
                  >
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
                            backgroundColor: 'grey',
                            color: 'black'
                          },
                          '& .MuiMenuItem-root.Mui-selected:hover': {
                            backgroundColor: 'grey',
                            color: 'black'
                          }
                        }
                      }
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={defaultSelect}
                    label="Select"
                    sx={{
                      width: '200px',
                       height: '32px',
                       border:'1px solid #d9d9d9 !important',
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
                      // left: '4px'
                    }}
                    onChange={handleSelect}
                  >
                    <MenuItem value={'wallet'}>Wallet</MenuItem>
                    <MenuItem value={'investment'}>Investment</MenuItem>
                    <MenuItem value={'exchange'}>Exchange</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <SearchBox
                className="p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  if (defaultSelect === 'investment') {
                    const x = resultPortfolio?.filter((i) =>
                      i.investment_name
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
                    )
                    setSearch(x)
                  } else if (defaultSelect === 'exchange') {
                    const x = resultExchange?.filter((i) =>
                      i.new_comment
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
                    )
                    setSearch2(x)
                  } else {
                    const x = resultTransaction?.filter(
                      (i) =>
                        i.address_name != null &&
                        i.address_name
                          .toLowerCase()
                          .includes(event.target.value.toLowerCase())
                    )
                    setSearch1(x)
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
            <div >
              {sea
                ? showdata &&
                defaultSelect === 'investment' && (
                  <CommonTable loading={loading} data={search} columns={columns2} />
                )
                : showdata &&
                defaultSelect === 'investment' && (
                  <CommonTable
                  loading={loading} 
                    data={resultPortfolio}
                    columns={columns2}
                  />
                )}
              {sea
                ? !showdata &&
                defaultSelect === 'wallet' && (
                  <CommonTable data={search1} columns={columns1} />
                  )
                : !showdata &&
                defaultSelect === 'wallet' && (
                  <CommonTable
                  loading={loading} 
                    data={resultTransaction}
                    columns={columns1}
                  />
                  )}
              {sea
                ? showdata &&
                defaultSelect === 'exchange' && (
                  <CommonTable  data={search2} columns={columns3} />
                )
                : showdata &&
                defaultSelect === 'exchange' && (
                  <CommonTable
                  loading={loading} 
                    data={resultExchange}
                    columns={columns3}
                  />
                )}
            </div>
          </Col>
        </Row>
      </Container >
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          width: '35%',
          marginTop: '20%',
          overflow: 'hidden',
          marginLeft: '39%',
          backgroundColor: '#222429',
          height: '22%',
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
            Are you sure you want to Delete this Investment ?
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
            variant="danger"
            style={{ width: '25%' }}
            onClick={() => {
              handleClose()
            }}
          >
            Yes
          </Button>
          <Button
            variant="success"
            onClick={handleClose}
            style={{ width: '25%' }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment >
  )
}
export default InvestmentLogHistory
