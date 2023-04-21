import React, { useState } from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import cx from 'classnames'
import Header from '../../common/Header/Header'
import './AddWallet.css'
import axios from 'axios'
import { Alert, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate } from 'react-router-dom'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarIcons from '../../store/Dashboard/SidebarIcons'
import Sidebar from '../../store/Dashboard/Sidebar'

const AddWallet = () => {
  const [alert, setAlert] = useState(false)
  const userID = localStorage.getItem('sub_Id')
  console.log(userID)
  const [credentialsInfo, setCredentialsInfo] = useState({
    // name: "",
    // key: "",
    userId: userID

  })
  const navigate = useNavigate()
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const [validated, setValidated] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-10%')
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
      setWidthData('-10%')
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

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      console.log(credentialsInfo)
      const config = {
        method: 'post',
        url: '${process.env.REACT_APP_BASE_URL}/create_wallet',
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentialsInfo
      }
      await axios(config).then(function (response) {
        console.log(response)
        setAlert(true)
        setTimeout(() => {
          navigate('/PMS/MainManageAssetsWallets')
        }, 2000)
      }).catch(function (error) {
        console.log(error)
      })
    }
    setValidated(true)
    // else  {
    //     e.preventDefault();
    //    e.stopPropagation();

    // console.log(credentialsInfo);
    // console.log(userID);
    // var config = {
    // method : 'post',
    // url: '${process.env.REACT_APP_BASE_URL}/debank_fetch/add_wallet',
    // headers: {
    //     'Content-Type':'application/json'
    // },
    // data: credentialsInfo
    // }
    // axios(config).then(function (response){
    //   console.log(response)
    //   setValidated(true);
    //   navigate('/SuccessMessage')
    // }).catch( function(error){
    //   console.log(error)
    // })

    //  }
  }
  const handleClose = () => {
    setAlert(false)
  }

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
            <div className="maindashinfo" style={{ marginLeft: widthData }}>

              <Breadcrumb style={{ marginLeft: '10%' }}>
                {/* <Breadcrumb.Item href="#">Manage Assets</Breadcrumb.Item> */}
                {/* <Breadcrumb.Item href="#">Asset 1</Breadcrumb.Item> */}
                {/* <Breadcrumb.Item active>Add Wallet</Breadcrumb.Item> */}
              </Breadcrumb>
              {alert ? (
                <Snackbar
                  open={alert}
                  // autoHideDuration={4000}
                  onClose={handleClose}
                  sx={{ marginLeft: '50%', marginBottom: '35%', width: '25%' }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                  >
                    Added wallet successfully
                  </Alert>
                </Snackbar>
              )
                : <></>
              }
              {/* {!isWalletConnected ? ( */}
              <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm}>
                <h4>Add Wallet</h4>
                <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': credentialsInfo.walletName })}>
                  <Form.Control
                    type="text"
                    id="name"
                    name="walletName"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Wallet Name</span>
                  <Form.Control.Feedback type="invalid">
                    Wallet Name Required.
                  </Form.Control.Feedback>
                </Form.Label>
                <Form.Label htmlFor="key" className={cx('custom-form-box', { 'focus-add': credentialsInfo.wallet_purpose })}>
                  <Form.Control
                    type="text"
                    id="key"
                    name="wallet_purpose"
                    onChange={handleInputChange}
                    required
                  />
                  <span>Purpose</span>
                  <Form.Control.Feedback type="invalid">
                    Key Required.
                  </Form.Control.Feedback>
                </Form.Label>
                <Button type="submit" variant="" className="btn-gray">Connect</Button>
              </Form>
              {/* ) : (
                 <SuccessMessage message="Wallet Successfully Added" />
              )} */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddWallet
