import React, { useState, useEffect } from 'react'
import CommonTable from '../../common/CommonTable/CommonTable'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../../common/Header/Header'
import Sidebar from '../Dashboard/Sidebar'
import { Image, Row, Col } from 'react-bootstrap'
import investmentIcon from '../../assets/images/investmentIcon.png'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarIcons from '../Dashboard/SidebarIcons'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
function Exchange () {
  const getId = localStorage.getItem('sub_Id')
  console.log(getId)
  // var data_id;
  // var data_row;
  const [dataId, setDataId] = useState('')
  const [dataRow, setDataRow] = useState([])
  const [show, setShow] = useState(false)
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
  const [result, setResult] = useState([])

  const loadFunction = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getInvestmentData', {
        params: { user_id: getId }
      })
      .then((response) => {
        console.log(response.data)
        setResult(response.data)
        // setWalletData(response.data.wallet_asset);
      })
  }
  useEffect(async () => {
    await loadFunction()
  }, [])
  console.log(result)
  const data2 = result
  // const data2 = [
  //   {
  //     name: ` Lorem`,
  //     type: "Ipsum",
  //     date: "2022- 03 -07  ",
  //     assetValue: "$92,908",
  //   },
  //   {
  //     name: ` Lorem`,
  //     type: "Ipsum",
  //     date: "2022- 04 -07  ",
  //     assetValue: "$92,908",
  //   },
  // ];
  const columns2 = [
    {
      dataField: 'apikey',
      text: 'API Key',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <Tooltip title={row.apikey}>
            <IconButton style={{ color: 'white', fontSize: '16px' }}>
              {row.apikey.slice(0, 9)}...
            </IconButton>
          </Tooltip>
        )
      }

    },
    {
      dataField: 'free',
      text: 'Free',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '16px' }}>$ {row.free}</p>
        )
      }
    },
    {
      dataField: 'accountType',
      text: 'Account Type',
      sort: false
    },
    {
      dataField: 'assetName',
      text: 'Asset Name',
      sort: true
    }
  ]
  return (
    <div>
      <div className="mainmyassets">
        <Row>
          {showDashboard === true ? <Sidebar /> : <SidebarIcons />}
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
            <hr
              style={{ backgroundColor: 'darkgrey', width: w, marginLeft: m, marginTop: '-1%' }}
            />
            <div className="assets-table-item" style={{ marginLeft: widthData, marginRight: '6%', marginTop: '4%', paddingBottom: '3%' }}>
              <div className="table-heading-wrap">
                <h5 style={{ fontSize: '22px' }}>
                  <span>
                    <Image src={investmentIcon} />
                  </span>
                  Exchanges
                </h5>
              </div>
              <CommonTable data={data2} columns={columns2} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Exchange
