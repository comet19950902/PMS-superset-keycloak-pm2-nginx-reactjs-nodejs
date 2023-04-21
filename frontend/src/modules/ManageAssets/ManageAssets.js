import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Col, Image, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Header from '../../common/Header/Header'
import Sidebar from '../../store/Dashboard/Sidebar'
import wallateIcon from '../../assets/images/wallateicon.png'
import binanceLogo from '../../assets/images/binance-logo.png'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import '../Assets/Assets.css'
import CommonTable from '../../common/CommonTable/CommonTable'

const data3 = [
  {
    name: ' Binance',
    lorem: '$392,908',
    ipsum: '3',
    dolor: '$92,908'
  },
  {
    name: ' Coinbase',
    lorem: '$782,753',
    ipsum: '6',
    dolor: '$92,908'
  }
]
const columns = [
  {
    dataField: 'symbol',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '16px' }}>
          {/* <span className="mr-2">
            <Image src={Ethereum} />
          </span> */}
          {row.symbol}
        </p>
      )
    }
  },
  {
    dataField: 'marketPrice',
    text: 'Market Price',
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '16px' }}>
          {row.price}
        </p>
      )
    }
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '16px' }}>
          {row.amount.toFixed(3)}
        </p>
      )
    }
  },
  {
    dataField: 'assetValue',
    text: 'Asset Value',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '16px' }}>
          {(row.amount.toFixed(3) * row.price).toFixed(4)}
        </p>
      )
    }
  }
]
const columns2 = [
  {
    dataField: 'investment_name',
    text: 'Name',
    sort: true
  },
  {
    dataField: 'investment_type',
    text: 'Type',
    sort: false
  },
  {
    dataField: 'date_of_investment',
    text: 'Date',
    sort: false
  },
  {
    dataField: 'investment_value',
    text: 'Value',
    sort: true
  }
]
const columns3 = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center">
          <span className="mr-2">
            <Image src={binanceLogo} />
          </span>
          {row.name}
        </p>
      )
    }
  },
  {
    dataField: 'lorem',
    text: 'lorem',
    sort: false
  },
  {
    dataField: 'ipsum',
    text: 'Ipsum',
    sort: false
  },
  {
    dataField: 'dolor',
    text: 'Dolor',
    sort: true
  }
]
const ManageAssets = () => {
  const location = useLocation()
  const walletIdAddress = location.pathname.slice(8)
  console.log(location.pathname.slice(8))
  const [walletData, setWalletData] = useState([])
  const getId = localStorage.getItem('sub_Id')

  console.log(getId)
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])

  const loadFunction = async () => {
    // await axios
    //   .get("${process.env.REACT_APP_BASE_URL}/getAllInvestment", {
    //     params: { userId: getId },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setResult(response.data);
    //     // setWalletData(response.data.wallet_asset);
    //   });
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllWalletsofUSer', { params: { user_id: getId } })
      .then(response => {
        console.log(response.data)
        setResult2(response.data)
      })
  }
  useEffect(async () => {
    await loadFunction()
  }, [])

  const handleChange = (event) => {
    // console.log(event.target.value)
    const wal_id = result2?.filter(i => i.wallet_name == event.target.value)
    const wal = wal_id?.[0].walletId
    const wall_data = async () => {
      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getwalletofassets', {
          params: { walletId: wal }
        })
        .then((response) => {
          //  console.log(response.data);
          //  setWalletData(response.data);
          const wal_data = response.data?.filter(i => i.walletId == wal_id?.[0]?.walletId)
          // console.log(wal_data)
          setWalletData(wal_data)
        })
    }
    wall_data()
    // console.log(wal_id?.[0].walletId)

    // console.log('ank')
  }

  // console.log(result);
  // console.log(walletData);
  const data = walletData
  const data2 = result
  localStorage.removeItem('walletId')

  return (
    <div>
      <div className="mainmyassets">
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Header />
            <h1 style={{ color: 'white', fontSize: '18px', marginLeft: '8%', marginBottom: '7%' }}>
              <span>Manage Assets</span>
              <span style={{ marginLeft: '2%', marginRight: '2%' }}>
                <ArrowRightAltIcon />
              </span>
              <span className="transationdata">
                <select className="days" style={{ fontSize: '18px' }} onChange={handleChange}>
                  {result2?.map(e => (
                    <option >{e.wallet_name}</option>
                    // <option>Asset 2</option>
                    // <option>Asset 3</option>
                  ))}
                </select>
              </span>
              <Link
                to="/PMS/AddWallet"
                className="btn btn-gray"
                style={{
                  // padding:'1%',
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  fontSize: '15px',
                  marginLeft: '80%',
                  width: '14%',
                  height: '6vh',
                  marginTop: '-4%'
                }}
              >
                + Add
              </Link>
            </h1>
            <div className="maindashinfo">
              <div className="assets-pilll-info-box">
                <div className="datatable m-0">
                  <div
                    className="assets-table-item"
                    style={{ paddingBottom: '10%' }}
                  >
                    <div className="table-heading-wrap">
                      <h5 style={{ fontSize: '22px' }}>
                        <span>
                          <Image src={wallateIcon} />
                        </span>
                        Wallet
                      </h5>

                    </div>
                    {walletData
                      ? <CommonTable data={data} columns={columns} />
                      : <></>}

                  </div>

                  {/* <div
                    className="assets-table-item"
                    style={{ paddingBottom: "10%" }}
                  >
                    <div className="table-heading-wrap">
                      <h5 style={{ fontSize: "22px" }}>
                        <span>
                          <Image src={investmentIcon} />
                        </span>
                        Investment
                      </h5>
                      <Link
                        to="/PMS/AddInvestment"
                        className="btn btn-gray"
                        style={{
                          paddingLeft: "2%",
                          paddingRight: "2%",
                          fontSize: "17px",
                        }}
                      >
                        + Add
                      </Link>
                    </div>
                    <CommonTable data={data2} columns={columns2} />
                  </div> */}
                  {/* <div
                    className="assets-table-item"
                    style={{ paddingBottom: "10%" }}
                  >
                    <div className="table-heading-wrap">
                      <h5 style={{ fontSize: "22px" }}>
                        <span>
                          <Image src={exchangeIcon} />
                        </span>
                        Exchange
                      </h5>
                      <Link
                        to="/PMS/AddExchange"
                        className="btn btn-gray"
                        style={{
                          paddingLeft: "2%",
                          paddingRight: "2%",
                          fontSize: "17px",
                        }}
                      >
                        + Add
                      </Link>
                    </div>
                    <CommonTable data={data3} columns={columns3} />
                  </div> */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default ManageAssets
