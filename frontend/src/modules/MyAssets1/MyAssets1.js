import React from 'react'
import './MyAssets1.css'

import { Breadcrumb, Col, Image, Row } from 'react-bootstrap'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import Ethereum from '../../assets/images/ethereum-svgrepo.png'
import wallateIcon from '../../assets/images/wallateicon.png'
import investmentIcon from '../../assets/images/investmentIcon.png'
import exchangeIcon from '../../assets/images/exchangeIcon.png'
import binanceLogo from '../../assets/images/binance-logo.png'

import { Link } from 'react-router-dom'
import Sidebar from '../../store/Dashboard/Sidebar'
import { Icon } from '@iconify/react'

const data = [
  {
    name: ' BTC',
    marketPrice: '$392,908',
    quantity: '3',
    assetValue: '$92,908'
  },
  {
    name: ' ETH',
    marketPrice: '$782,753',
    quantity: '6',
    assetValue: '$92,908'
  }
]
const data2 = [
  {
    name: ' Lorem',
    type: 'Ipsum',
    date: '2022- 03 -07  ',
    assetValue: '$92,908'
  },
  {
    name: ' Lorem',
    type: 'Ipsum',
    date: '2022- 04 -07  ',
    assetValue: '$92,908'
  }
]

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
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center">
          <span className="mr-2">
            <Image src={Ethereum} />
          </span>
          {row.name}
        </p>
      )
    }
  },
  {
    dataField: 'marketPrice',
    text: 'Market Price',
    sort: false
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: false
  },
  {
    dataField: 'assetValue',
    text: 'Asset Value',
    sort: true
  }
]

const columns2 = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true
  },
  {
    dataField: 'type',
    text: 'Type',
    sort: false
  },
  {
    dataField: 'date',
    text: 'Date',
    sort: false
  },
  {
    dataField: 'assetValue',
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
const MyAssets1 = () => {
  return (
    <div>
      <div className="mainmyassets">
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="maindashinfo" style={{ marginLeft: '6%' }}>
              <Breadcrumb className="mb-5">
                <Breadcrumb.Item href="#">Manage Assets</Breadcrumb.Item>
                <Breadcrumb.Item active>Asset 1 </Breadcrumb.Item>
              </Breadcrumb>
              <div className="datatable m-0">
                <div className="assets-table-item">
                  <div className="table-heading-wrap">
                    <h5>
                      <span>
                        <Image src={wallateIcon} />
                      </span>
                      Wallet
                    </h5>
                    <Link to="/AddAssets" className="btn btn-gray">
                      <Icon icon="akar-icons:plus" className="mr-1" /> Add
                    </Link>
                  </div>
                  <CommonTable data={data} columns={columns} />
                </div>
                <div className="assets-table-item">
                  <div className="table-heading-wrap">
                    <h5>
                      <span>
                        <Image src={investmentIcon} />
                      </span>
                      Investment
                    </h5>
                    <Link to="/AddInvestment" className="btn btn-gray">
                      <Icon icon="akar-icons:plus" className="mr-1" /> Add
                    </Link>
                  </div>
                  <CommonTable data={data2} columns={columns2} />
                </div>
                <div className="assets-table-item">
                  <div className="table-heading-wrap">
                    <h5>
                      <span>
                        <Image src={exchangeIcon} />
                      </span>
                      Exchange
                    </h5>
                    <Link to="/AddExchange" className="btn btn-gray">
                      <Icon icon="akar-icons:plus" className="mr-1" /> Add
                    </Link>
                  </div>
                  <CommonTable data={data3} columns={columns3} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MyAssets1
