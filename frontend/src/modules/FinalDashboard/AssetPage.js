import React, { useEffect, useState } from 'react'
import './FinalDashboard.css'
import axios from 'axios'
import { Container, Col, Image, Row, Modal } from 'react-bootstrap'
import '../../common/Modal.css'
import Header from '../../common/Header/Header'
import check from '../../assets/images/check.png'
import { Link } from 'react-router-dom'
import { SUPERSET_URL, SUPERSET_URL_ASSET } from '../../config/env'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FitScreenSharpIcon from '@mui/icons-material/FitScreenSharp'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'

const AssetPage = () => {
  const getId = localStorage.getItem('sub')
  console.log(getId)
  const nameData = localStorage.getItem('name')
  console.log(nameData)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [fullscreen, setFullscreen] = useState(true)
  const handleClose = () => setShow(false)
  const handleClose1 = () => setShow1(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('0%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')

  const [tokenData, setTokenData] = useState('')
  const loginAccessToken = async () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_SUPERSET_URL}/api/login_superset`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: nameData

      }
    }
    console.log(config.data)
    await axios(config)
      .then(function (response) {
        console.log('clicked')
        console.log(response)
        console.log(response.data.token)
        setTokenData(response.data.token)
        // Cookies.set('session', response.data.token, { path: '${process.env.REACT_APP_SUPERSET_URL}/superset/dashboard/p/o4nlDvAP5km/' });
        // console.log(Cookies.get('session'));
      })
      .catch(function (error) {
        console.log(error)
      })
    // let resultNew=respon
  }
  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setm('-10%')
      setMargin('8%')
      setWidthData('0%')
      console.log(showDashboard)
      console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('1.8%')
      setW('100%')
      setMargin('22%')
      setWidthData('10%')
      console.log(showDashboard)
      console.log(newWidth)
    }
  }
  const handleShow = () => {
    console.log('clicked')
    setShow(true)
  }
  const handleShow1 = () => {
    console.log('clicked1')
    setShow1(true)
  }
  console.log(getId)
  const [result, setResult] = useState([])
  const [wallet, setWallet] = useState('')
  const handleSubmit = () => {
    console.log('Clicked')
  }
  // var userData={
  //     walletId:"w75"
  // }

  const [bigData, setBigData] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  // import Switch from '@mui/material/Switch';
  useEffect(async () => {
    await loginAccessToken()
    // initialHeight = imgRef.current.height
    // const initialWidth = imgRef.current.width
  }, [])
  console.log(result)
  const data = result
  const columns = [
    {
      dataField: 'wallet_name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p
            className="name-assets"
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              paddingLeft: '3%'
            }}
          >
            <span
              style={{ height: '1.5vh', width: '1.5vh', color: 'transparent' }}
            >
              x
            </span>
            <h5 style={{ marginLeft: '15%', fontSize: '15px' }}>
              {row.wallet_name}
            </h5>
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
      formatter: (cell, row) => {
        return (
          <div onClick={() => {
            console.log(row.walletId)
          }}>
            <Link to={`/PMS/Assets/:${row.walletId}`} className="status">
              <Image src={check} alt="" />
            </Link>
          </div>
        )
      }
    }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-end">
          <Header />
        </Row>
        <Row>
          <Col lg={2} className="justify-content-md-center">
            <SidebarAdmin />
          </Col>
          <Col lg={10}>
            <div
              className="maindashinfo"
              id="response" >
              <div className="maindashtable" >
                <div className="dashheading" style={{ paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%' }}>
                  <FitScreenSharpIcon style={{ color: 'white', fontSize: '45px', cursor: 'pointer' }} onClick={handleShow} />
                </div>
                <iframe
                  width="100%"
                  height="100%"
                  seamless
                  frameBorder="0"
                  id="geeks"
                  scrolling="no"
                  style={{ height: '650px', width: '94%', marginLeft: '3%', padding: '2.5%', borderRadius: '44px' }}
                  src={`${SUPERSET_URL_ASSET}`}
                >
                </iframe>
              </div>
              <Modal fullscreen show={show} onHide={handleClose} style={{ paddingTop: '4%' }} >
                <Modal.Body style={{}}>
                  <IconButton
                    style={{ position: 'absolute', top: '0', right: '0' }}
                    onClick={() => setShow(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <iframe
                    width="1200"
                    height="750"
                    seamless
                    frameBorder="0"
                    id="geeks"
                    // scrolling="no"
                    style={{ overflowX: 'scroll', backgroundColor: 'transparent', marginRight: '320px' }}
                    src={`${SUPERSET_URL_ASSET}`}
                  >
                  </iframe>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
export default AssetPage
