import React, { useState, useEffect } from 'react'
import './Transactions.css'
import '../../Admin/DashboardAdmin/DashboardAdmin.css'
import axios from 'axios'
import { Row, Col, Form, Button, Modal } from 'react-bootstrap'
import '../../common/Modal.css'
import { Alert, TextField } from '@mui/material'
import Header from '../../common/Header/Header'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import cx from 'classnames'
import { useLocation, Link } from 'react-router-dom'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarAccountIcons from '../../Accountant/SidebarAccountIcons'
import SidebarAccountant from '../../Accountant/SidebarAccount'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import Autocomplete from '@mui/material/Autocomplete'

import CommonTable from '../../common/CommonTable/CommonTable'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
// import { Scrollbars } from 'react-custom-scrollbars-2';
const TransactionsAccountant = () => {
  const [show, setShow] = useState(false)
  const [dataNew, setDataNew] = useState([])
  const [showComment, setShowComment] = useState(false)
  const handleShowComment = (row) => {
    console.log(row)
    setDataNew(row)
    setShowComment(true)
  }
  const [name, setname] = useState('')
  const handleShow = () => setShow(true)
  const [validated, setValidated] = useState(false)
  const handleCloseComment = () => {
    setShowComment(false)
  }
  const getId = localStorage.getItem('sub_Id')
  const location = useLocation()
  const walletIdAddress = location.pathname.slice(19, 55)
  console.log(walletIdAddress)
  const walletIdData = location.pathname.slice(57)
  console.log(walletIdData)
  // console.log(location.pathname.slice(14));
  console.log(getId)
  const columns = [
    {
      dataField: 'transaction_time',
      text: 'Time',
      sort: 'asc',
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row.transaction_time)
        const date = new Date(row.transaction_time)
        console.log(date)
        const dd = date.getDate()
        const mm = date.getMonth() + 1
        const yy = date.getFullYear()
        console.log(dd)
        console.log(mm)
        console.log(yy)
        return (
          <p
            style={{
              color: 'white',
              fontSize: '12px',
              display: 'inline-block'
            }}

          >   {console.log(row)}
            {console.log(row.transaction_time)}
            <Tooltip title={row.transaction_time}>
              <IconButton style={{ color: 'white', fontSize: '13px' }}>
                {dd}/{mm}/{yy}
              </IconButton>
            </Tooltip>
          </p>
        )
      }
    },
    {
      dataField: 'cate_id',
      text: 'Type',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.cate_id == null
              ? (
                <p style={{ fontSize: '12px' }}>N/A</p>
                )
              : (
                  row.cate_id
                )}
          </p>
        )
      }
    },
    {
      dataField: 'asset_chain',
      text: 'Deposit Wallet',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {row.asset_chain}
          </p>
        )
      }
    },
    {
      dataField: 'send_data',
      text: 'Asset',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '12px' }}>
            {console.log('send_data', JSON.parse(row.send_data))}
            {console.log('send_row', JSON.parse(row.send_data)[0]?.amount)}
            {row.cate_id != null
              ? (
                <p style={{ color: 'white', fontSize: '12px' }}>
                  {JSON.parse(row.send_data)[0]?.amount?.toFixed(5)}
                </p>
                )
              : (
                <p style={{ fontSize: '12px' }}>N/A</p>
                )}
          </p>
        )
      }
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <Tooltip title={JSON.parse(row.amount)?.eth_gas_fee}>
              <IconButton style={{ color: 'white', fontSize: '12px' }}>
                {JSON.parse(row.amount)?.eth_gas_fee.toFixed(4) == null
                  ? (
                    <p style={{ fontSize: '12px' }}>N/A</p>
                    )
                  : (
                    <p style={{ color: 'white', fontSize: '12px' }}>
                      {JSON.parse(row.amount)?.eth_gas_fee.toFixed(4)}
                    </p>
                    )}
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
    {
      dataField: 'other_wallet_address',
      text: 'Destination',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <Tooltip title={row.other_wallet_address}>
              <IconButton style={{ color: 'white', fontSize: '12px' }}>
                {row.other_wallet_address?.slice(0, 5)}...
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
    {
      dataField: 'transaction_id',
      text: 'TxID',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <Tooltip title={row.other_wallet_address}>
              <IconButton style={{ color: 'white', fontSize: '12px' }}>
                {row.transaction_id.slice(0, 4)}...
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
    {
      dataField: 'transaction_id',
      text: 'Status',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <Tooltip title={row.other_wallet_address}>
              <IconButton style={{ color: 'white', fontSize: '12px' }}>
                {row.transaction_id.slice(0, 4)}...
              </IconButton>
            </Tooltip>
          </>
        )
      }
    },
    {
      dataField: '',
      text: 'Tags',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', width: '20%', fontSize: '12px' }}>
            {row.comments}
          </p>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span style={{ cursor: 'pointer' }} onClick={() => handleShowComment(row)}>
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span >
        )
      }
    }
  ]
  const [result, setResult] = useState([])
  const [on, setOn] = useState(false)
  const [result1, setResult1] = useState([])
  const [result11, setResult11] = useState([])
  const [wal, setWal] = useState('')
  const [value, setValue] = useState(null)
  const [valueNew, setValueNew] = useState(null)
  console.log(value)
  const [result2, setResult2] = useState([])
  const [resultAddress, setResultAddress] = useState([])
  const [resultPortfolio, setResultPortfolio] = useState([])
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [alert, setAlert] = useState(false)
  const handleform = () => {
    setAlert(true)
    setTimeout(setAlert(false), 4000)
  }
  const [m, setm] = useState('-10%')
  const handlePortfolios = async () => {
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/getAllPortfolio'
    }
    await axios(config).then(function (response) {
      console.log(response.data)
      setResultPortfolio(response.data)
    })
  }
  console.log(resultPortfolio)

  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setm('-10%')
      setMargin('8%')
      setWidthData('-4%')
      console.log(showDashboard)
      console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('1.8%')
      setW('100%')
      setMargin('22%')
      setWidthData('6%')
      console.log(showDashboard)
      console.log(newWidth)
    }
  }
  console.log(resultPortfolio[0]?.portfolio_id)
  const loadFunctionGetAllWallets = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/get_wallets', {
        params: { portfolio_id: resultPortfolio[0]?.portfolio_id }
      })
      .then((response) => {
        console.log(response.data)
        setResult2(response.data)
        // refresh_wallet()
      })
  }
  console.log(result2)
  let dataIdportfolio = []
  const [walletSelect, setWalletSelect] = useState('')
  const handleChange = (event) => {
    // setResult1(response.data
    console.log(event)
    console.log(resultPortfolio)
    dataIdportfolio = resultPortfolio?.filter((i) => i.portfolio_name == event)
    console.log(dataIdportfolio)
    console.log(dataIdportfolio[0].portfolio_id)
    axios
      .get('${process.env.REACT_APP_BASE_URL}/get_wallets', {
        params: { portfolio_id: dataIdportfolio[0].portfolio_id }
      })
      .then((response) => {
        console.log(response)
        console.log(response.data)
        setResult2(response.data)
        // refresh_wallet()
      })
    console.log(result2)
    const wal_id = r2?.filter((i) => i.wallet_name == event)
    console.log(wal_id[0].walletId)
    setWalletSelect(wal_id[0].walletId)
    axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllTransactionHistoryofUser', {
        params: { address_id: wal_id?.[0]?.address_id }
      })
      .then((response1) => {
        console.log(response1.data)
        setResult(response1.data)
      })
    loadFunctionGetAllAddress()
  }
  const handleChange1 = (event) => {
    console.log(event.target.value)
    console.log(result2)
    const resultWalletData = result2.filter((i) => i.wallet_name == event.target.value)
    console.log(resultWalletData)
    console.log(dataIdportfolio[0]?.portfolio_id)
    axios
      .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
        params:
        {
          wallet_id: resultWalletData[0].walletId,
          portfolio_id: resultPortfolio[0]?.portfolio_id
        }
      })
      .then((response) => {
        console.log(response.data)
        setResultAddress(response.data)
        // refresh_wallet()
      })
    console.log(resultAddress)
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      console.log(dataNew)
      const config = {
        method: 'post',
        url: '${process.env.REACT_APP_BASE_URL}/updateTransactionData',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config).then(function (response) {
        console.log(response)
        setAlert(true)
      }).catch(function (error) {
        console.log(error)
      })
      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getAllTransactionHistoryofUser', {
          params: { address_id: dataNew.address_id }
        })
        .then((response11) => {
          console.log(response11)
          console.log(response11.data)
          setResult11(response11.data)
        })
    }
  }
  const handleChange2 = (event) => {
    console.log(event.target.value)
    console.log(resultAddress)
    axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllTransactionHistoryofUser', {
        params: { address_id: event.target.value }
      })
      .then((response11) => {
        console.log(response11)
        console.log(response11.data)
        setResult11(response11.data)
      })
    console.log(result11)
  }
  console.log(result2)
  console.log(walletSelect)

  const loadFunctionGetAllAddress = async () => {
    console.log(walletSelect)
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
        params:
        {
          wallet_id: result2[0]?.walletId,
          portfolio_id: resultPortfolio[0]?.portfolio_id
        }
      })
      .then((response) => {
        console.log(response.data)
        setResultAddress(response.data)
        // refresh_wallet()
      })
  }
  // const wal_bal = result2?.filter(i=>i.walletId==walletIdAddress)
  // console.log(wal_bal)
  console.log(resultAddress)
  console.log(result2)
  var r2 = result2?.filter((i) => i.walletId)
  const r4 = resultAddress?.filter((i) => i.address_id)
  console.log(r2)
  console.log(r4?.[0]?.address_id)

  useEffect(async () => {
    await loadFunctionGetAllWallets()
    await loadFunctionGetAllAddress()
    await handlePortfolios()
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllTransactionHistoryofUser', {
        params: { address_id: '0x99d8a9c45b2eca8864373a26d1459e3dff1e17f3' }
      })
      .then((response11) => {
        console.log(response11)
        console.log(response11.data)
        setResult11(response11.data)
      })
  }, [])
  console.log(result11)
  console.log(result)
  const color = 'white'
  const newResult = []
  // const data = result;
  const newData = () => {
    console.log(value)
    console.log(valueNew)
    const d1 = value.getTime() / 1000
    const d2 = valueNew.getTime() / 1000
    console.log(d1)
    console.log(d2)
    console.log(result11)
    // for(let i=0;i<result11.length;i++)
    // {
    //   //console.log(result11[i].transaction_time)
    //   // let rawdata=result11[i].transaction_time
    //   // //let data=rawdata.getTime()/1000;
    //   let k=i;
    //   let data=(new Date(result11[i].transaction_time).getTime()/1000);
    //   console.log(data)
    //   if(data>d1 && data<d2)
    //   {
    //     console.log(result11[k])
    //     newResult.push(result11[k])
    //   }
    // }
    // console.log(newResult)
    const r = result11.filter(item => new Date(item.transaction_time).getTime() / 1000 >= d1 && new Date(item.transaction_time).getTime() / 1000 <= d2 + 86399)
    console.log(r)
    setResult11(r)
    const s = result.filter(item => new Date(item.transaction_time).getTime() / 1000 >= d1 && new Date(item.transaction_time).getTime() / 1000 <= d2 + 86399)
    console.log(s)
    setResult(s)
  }
  return (
    <div>
      <div className="mainmyassets">
        <Row style={{ height: '120%' }}>
          {showDashboard === true ? <SidebarAccountant /> : <SidebarAccountIcons />}
          <Col lg={newWidth}>
            <Header />
            {showDashboard === true
              ? (<KeyboardDoubleArrowLeftIcon
                sx={{ fontSize: 30 }}
                onClick={handleToggle}
                style={{ color: 'white', marginLeft: '-2%', marginTop: '0.5%' }}
              />)
              : (<KeyboardDoubleArrowRightIcon
                sx={{ fontSize: 30 }}
                onClick={handleToggle}
                style={{ color: 'white', marginLeft: '-13.5%', marginTop: '-0.5%' }}
              />)}
            <div className="datatable" style={{ width: '85%', marginLeft: '5%', marginTop: '-7%' }}>
              <div
                className="heading"
                style={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}
              >
                <h2 style={{ fontSize: '22px', color: 'white' }}>Transaction History</h2>
                <Link to={'/PMS/Account_dashboard'} style={{ marginLeft: '30%' }}>
                  <ArrowCircleLeftOutlinedIcon style={{ color: 'white', fontSize: '30px' }} />
                </Link>
              </div>
              {/* <input type="date" placeholder="mm-dd-yyyy"  style={{backgroundColor:"#222429",color:"white",border:"1px solid grey"}}/>
                  {console.log(valueDe)} */}
              {/* <div className="d-flex justify-content-evenly" style={{marginBottom:"3%"}}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="From"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} style={{borderRadius:"15px",color:"white",background:"#222429",borderRadius:"15px"}}
                    sx={{
                      svg: { color },
                      input: { color },
                      label: { color }
                    }} />
                    }
                  />
                </LocalizationProvider>
                    to
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="To"
                    value={valueNew}
                    // style={{border:"1px solid grey",color:"white"}}
                    onChange={(newValue) => {
                      setValueNew(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} style={{borderRadius:"15px",color:"white",background: "#222429",borderRadius:"15px"}}
                    sx={{
                      backgroundColor: 'yellow',
                      svg: { color },
                      input: { color },
                      label: { color }
                    }} />
                   }
                  />
                </LocalizationProvider>
                <button type="submit"   style={{background:"#222429",color:"white",fontSize:"15px",cursor:"pointer",marginBottom:"1.5%",marginLeft:"5%",marginTop:"1%",borderRadius:"15px",width:"12%",border:"1px solid grey"}} onClick={()=>newData(value,valueNew)}>Select</button>
             </div> */}
              <div className="transationdata" style={{ width: '106%', marginRight: '3%', height: '50%', marginTop: '-2%' }}>
                {/* <select className="days" style={{ fontSize: "22px" }} onChange={handleChange}>
                  {result1?.map(e=>(
                  <option>{e.wallet_name}</option>
                  // <option>Asset 2</option>
                  // <option>Asset 3</option>
                  ))}
                </select> */}
                <div className="assets-chart-wrap heading" style={{ display: 'flex', marginRight: '3%', marginTop: '-6%', padding: '2%', justifyContent: 'start' }}>
                  {/* <select
                    className="days"
                    style={{
                      width: "20%",
                      marginLeft:"4%"
                    }}
                    onChange={handleChange}
                  >
                    {resultPortfolio?.map((e) => (
                      <option>{e.portfolio_name}</option>
                      // <option>Asset 2</option>
                      // <option>Asset 3</option>
                    ))}
                  </select> */}
                  <span
                    style={{
                      paddingTop: '1%'
                    }}
                  >
                    <Autocomplete
                      //  className="btn btn-gray"
                      // className="btn btn-gray"
                      disablePortal
                      //  id="combo-box-demo"
                      options={resultPortfolio?.map((e) => e.portfolio_name)}
                      onChange={(e, k) => {
                        console.log(k)
                        console.log(e)
                        handleChange(k)
                      }}
                      style={{
                        fill: 'white',
                        boxShadow: 'none',
                        width: '150px',
                        borderRadius: '30%'
                      }}
                      sx={{
                        width: 300
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          style={{ color: 'white' }}
                          label="Portfolios"
                        />
                      )}
                    />
                  </span>
                  {/* <select
                    className="days"
                    style={{
                        background: "transparent",
                        height:"22%",
                        marginTop:"1%",
                        padding:"2%",
                        marginLeft:"1%",
                        width: "17%",
                        fontSize:"15px",
                        boxShadow:"none",
                        border:"1px solid grey",
                      }}
                    onChange={handleChange1}
                  >
                      <option>View Wallet</option>
                      <option>View Investments</option>
                      <option>View Exchnages</option>
                  </select> */}
                  <select
                    className="days"
                    style={{
                      background: 'transparent',
                      height: '22%',
                      marginTop: '1%',
                      padding: '2%',
                      marginLeft: '1%',
                      width: '17%',
                      fontSize: '15px',
                      boxShadow: 'none',
                      border: '1px solid grey'
                    }}
                    onChange={handleChange1}
                  >
                    {r2?.map((e) => (
                      <option>{e.wallet_name}</option>
                      // <option>Asset 2</option>
                      // <option>Asset 3</option>
                    ))}
                  </select>
                  <select
                    className="days"
                    style={{
                      background: 'transparent',
                      height: '22%',
                      marginTop: '1%',
                      padding: '2%',
                      width: '17%',
                      marginLeft: '-1%',
                      fontSize: '15px',
                      boxShadow: 'none',
                      border: '1px solid grey'
                    }}
                    onChange={handleChange2}
                  >
                    {r4?.map((e) => (
                      <option>{e.address_id}</option>
                      // <option>Asset 2</option>
                      // <option>Asset 3</option>
                    ))}
                  </select>
                </div>
                {' '}

                <div style={{ marginTop: '-7%', width: '108%', marginLeft: '-4%' }}>
                  <CommonTable data={result11} columns={columns} />
                </div>
              </div>
            </div>
          </Col>
          <Modal show={showComment}
            style={{ width: '45%', marginLeft: '35%' }}>
            <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}
            >
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
                onClick={() => setShowComment(false)}
              >
                <CloseIcon />
              </IconButton>

            </Modal.Header>
            {alert
              ? (
              <Snackbar
                open={alert}
                autoHideDuration={4000}
                onClose={handleCloseComment}
                sx={{
                  marginLeft: '44%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={handleCloseComment}
                  severity="success"
                  sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                >
                  Update Comments successfully
                </Alert>
              </Snackbar>
                )
              : <></>
            }
            <Modal.Body style={{ backgroundColor: '#222429' }}>
              <Form
                className="custom-form"
                noValidate
                validated={validated}
                onSubmit={handleSubmitForm}
              >
                <h4>Add Tags/Commments</h4>

                <Form.Label
                  htmlFor="exchange"
                  className={cx('custom-form-box', {
                    'focus-add': name
                  })}
                  style={{ width: '50%', marginLeft: '25%' }}
                >
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => setname(e.target.value)}
                    required
                    style={{ color: 'white' }}
                  />
                  <span style={{ background: 'none', color: 'white' }}>
                    Comment
                  </span>
                </Form.Label>
                <Button
                  type="submit"
                  variant=""
                  className="btn-gray"
                  style={{ width: '50%', marginLeft: '25%', boxShadow: 'none', color: 'white' }} >
                  Save
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Row>
      </div>
    </div>
  )
}
export default TransactionsAccountant
