import React from 'react'
import './MyAssets.css'

import { Col, Image, Row } from 'react-bootstrap'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import check from '../../assets/images/check.png'
import { Link } from 'react-router-dom'
import Sidebar from '../../store/Dashboard/Sidebar'

const data = [
  {
    id: 1,
    name: ' Asset 1',
    portfolio: '$392,908',
    percentage: '+23%',
    analitics: 'up',
    risk: 'AAA'
  },
  {
    id: 2,
    name: 'Asset 2',
    portfolio: '$892,908',
    percentage: '-43%',
    analitics: 'down',
    risk: 'AAA'
  },
  {
    id: 3,
    name: 'Asset 3',
    portfolio: '$592,908',
    percentage: '+12%',
    analitics: 'up',
    risk: 'AAA'
  },
  {
    id: 4,
    name: 'Asset 4',
    portfolio: '$792,908',
    percentage: '+23%',
    analitics: 'up',
    risk: 'AAA'
  },
  {
    id: 5,
    name: 'Asset 5',
    portfolio: '$192,908',
    percentage: '+10%',
    analitics: 'up',
    risk: 'AAA'
  },
  {
    id: 6,
    name: 'Asset 6',
    portfolio: '$992,908',
    percentage: '-9%',
    analitics: 'down',
    risk: 'AAA'
  }
]
const columns = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="name-assets">
          <span></span>
          {row.name}
        </p>
      )
    }
  },
  {
    dataField: 'portfolio',
    text: 'Portfolio',
    sort: true
  },
  {
    dataField: 'percentage',
    text: '%',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className={`${row.analitics === 'up' ? 'green' : 'red'}`}>
          {row.percentage}
        </p>
      )
    }
  },
  {
    dataField: 'risk',
    text: 'Risk',
    sort: true
  },
  {
    dataField: '',
    text: 'View Details',
    formatter: () => {
      return (
        <Link to="/" className="status">
          <Image src={check} alt="" />
        </Link>
      )
    }
  }
]
const MyAssets = () => {
  return (
    <div>
      <div className="mainmyassets">
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="datatable">
              <div className="heading">
                <h3>My Assets</h3>
                <select className="days">
                  <option>7 Days</option>
                  <option>7 Days</option>
                  <option>7 Days</option>
                </select>
              </div>
              <CommonTable data={data} columns={columns} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MyAssets
