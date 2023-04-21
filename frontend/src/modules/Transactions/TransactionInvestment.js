import React, { useState, useEffect } from 'react'
import './Transactions.css'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { useLocation, Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarIconsAdmin from '../../Admin/DashboardAdmin/SidebarIconsAdmin'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import DataThresholdingIcon from '@mui/icons-material/DataThresholding'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'

const columns = [
  {
    dataField: 'transaction_time',
    text: 'Time',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p
          style={{
            color: 'white',
            width: '90%',
            fontSize: '12px',
            display: 'inline-block'
          }}
        >
          {row.transaction_time.slice(5, 16)}
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
        <p style={{ color: 'white', width: '20%', fontSize: '12px' }}>
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
        <p style={{ color: 'white', width: '20%', fontSize: '12px' }}>
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
        <p style={{ color: 'white', width: '20%', fontSize: '12px' }}>
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
              {row.other_wallet_address.slice(0, 4)}...
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
  }
]
const TransactionInvestment = () => {
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const getId = localStorage.getItem('sub_Id')
  const location = useLocation()
  const walletIdAddress = location.pathname.slice(28)
  console.log(walletIdAddress)
  // console.log(location.pathname.slice(14));
  console.log(getId)
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
  const [showDashboard, setShowDashboard] = useState(false)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
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
  const loadFunctionGetAllWallets = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/get_wallets', {
        params: { portfolio_id: walletIdAddress }
      })
      .then((response) => {
        console.log(response.data)
        setResult2(response.data)
        // refresh_wallet()
      })
  }
  const [walletSelect, setWalletSelect] = useState('')
  const handleChange = (event) => {
    // setResult1(response.data
    console.log(event.target.value)

    const wal_id = r2?.filter((i) => i.wallet_name == event.target.value)
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
  console.log(result2)
  console.log(walletSelect)

  const loadFunctionGetAllAddress = async () => {
    console.log(walletSelect)
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
        params:
        {
          wallet_id: walletSelect,
          portfolio_id: walletIdAddress
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
  console.log(r4?.[0]?.address_id)

  useEffect(async () => {
    await loadFunctionGetAllWallets()
    await loadFunctionGetAllAddress()
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllTransactionHistoryofUser', {
        params: { address_id: r4?.[0]?.address_id }
      })
      .then((response11) => {
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
        <Row>
          {showDashboard === true ? <SidebarAdmin /> : <SidebarIconsAdmin />}
          <Col lg={newWidth}>
            <Header />
            {showDashboard === true
              ? (<KeyboardDoubleArrowLeftIcon
                sx={{ fontSize: 30 }}
                onClick={handleToggle}
                style={{ color: 'white', marginLeft: '-2%', marginTop: '1%' }}
              />)
              : (<KeyboardDoubleArrowRightIcon
                sx={{ fontSize: 30 }}
                onClick={handleToggle}
                style={{ color: 'white', marginLeft: '-13.5%', marginTop: '-1.2%' }}
              />)}
            <h1 style={{ color: 'white', fontSize: '21px' }}>Investment Transactions</h1>
            <div className="datatable">
              <div
                className="heading"
                style={{ justifyContent: 'space-between', display: 'flex', width: '70%' }}
              >
                <Link to={`/PMS/Investments/:${walletIdAddress}`}>
                  <ArrowCircleLeftOutlinedIcon style={{ color: 'white', fontSize: '40px' }} />
                </Link>
                <h2 style={{ fontSize: '22px', color: 'white' }}>Transaction History</h2>

                <h5 style={{ color: 'white' }}><DataThresholdingIcon style={{ color: 'white' }} /> Generate All Statements</h5>
              </div>
              <div className="assets-chart-wrap heading mt-0 mb-3" style={{ display: 'flex', marginRight: '3%', marginLeft: '45%' }}>
                <select
                  className="days"
                  style={{
                    width: '20%'
                  }}
                  onChange={handleChange}
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
                    textAlign: 'center',
                    width: '20%',
                    marginRight: '50%'
                  }}
                  onChange={handleChange}
                >
                  {r4?.map((e) => (
                    <option>{e.address_id}</option>
                    // <option>Asset 2</option>
                    // <option>Asset 3</option>
                  ))}
                </select>
              </div>
              {/* <input type="date" placeholder="mm-dd-yyyy"  style={{backgroundColor:"#222429",color:"white",border:"1px solid grey"}}/>
                  {console.log(valueDe)} */}
              <div className="d-flex justify-content-evenly" style={{ marginBottom: '6%' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="From"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} style={{ borderRadius: '15px', color: 'white', background: '#222429', borderRadius: '15px' }}
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
                      setValueNew(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} style={{ borderRadius: '15px', color: 'white', background: '#222429', borderRadius: '15px' }}
                      sx={{
                        backgroundColor: 'yellow',
                        svg: { color },
                        input: { color },
                        label: { color }
                      }} />
                    }
                  />
                </LocalizationProvider>
                <button type="submit" style={{ background: '#222429', color: 'white', fontSize: '15px', cursor: 'pointer', marginBottom: '1.5%', marginLeft: '5%', marginTop: '1%', borderRadius: '15px', width: '12%', border: '1px solid grey' }} onClick={() => newData(value, valueNew)}>Select</button>
              </div>
              <div className="transationdata">
                {/* <select className="days" style={{ fontSize: "22px" }} onChange={handleChange}>
                  {result1?.map(e=>(
                  <option>{e.wallet_name}</option>
                  // <option>Asset 2</option>
                  // <option>Asset 3</option>
                  ))}
                </select> */}
                {' '}
                {wal
                  ? (
                    <CommonTable data={result11} columns={columns} />
                    )
                  : (
                    <CommonTable data={result} columns={columns} />
                    )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default TransactionInvestment
