import React, { useState } from 'react'
import './login.css'
import cx from 'classnames'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import loginimg from '../../assets/images/loginimg.png'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Alert, TextField } from '@mui/material'
import { Breadcrumb, Button, Form, Col, Row, Modal } from 'react-bootstrap'
import '../../common/Modal.css'
import EmailIcon from '@mui/icons-material/Email'
import NoEncryptionIcon from '@mui/icons-material/NoEncryption'

import { Formik } from 'formik'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import * as Yup from 'yup'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import OtpInput from 'react-otp-input'
import { KEYCLOAK_ID, KEYCLOAK_SECRET, REDIRECT_URI } from '../../config/env'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
const axios = require('axios')
const qs = require('qs')
const Login = () => {
  const location = useLocation()
  const [credentialsInfo, setCredentialsInfo] = useState({
    // name: "",
    // key: "",
    // userID:userID,

  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const navigate = useNavigate()
  const [result, setResult] = useState([])
  const [otpModal, setOtpModal] = useState(false)
  const handleCloseModal = () => {
    setOtpModal(false)
  }
  const [alertOtp, setAlertOtp] = useState(false)
  const [alertOtpEr, setAlertOtpEr] = useState(false)
  const handleAlertClose = () => {
    setAlertOtp(false)
    setAlertOtpEr(false)
  }
  // const [newdata, setNewData] = useState({});
  const [dataSet, setDataSet] = useState([])
  const [value, setValue] = useState([])
  const [alert, setAlert] = useState(false)
  const [resultData, setResultData] = useState([])
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown)
  }
  const userData = {}
  let newData = {}
  let jti_token = ' '
  let sub_Id = ' '
  const dataCheck = ''
  let c = 0
  const [validated, setValidated] = useState(false)
  const handleSubmitForm = (e) => {
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      c = 0
      e.preventDefault()
      // console.log(email,password);
      // console.log(userData);

      const data = qs.stringify(credentialsInfo)
      // 'username': 'shubham',
      // 'password': 'qwerty123'
      // });

      console.log(credentialsInfo)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/debank_login`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      }
      console.log(credentialsInfo)
      axios(config)
        .then(function (response) {
          console.log(response)

          setResultData(response.data)
          newData = JSON.stringify(response.data)
          jti_token = response.data.message
          if (jti_token == 'Request failed with status code 401') {
            console.log(jti_token)
            // navigate("/");
            setAlertOtpEr(true)
          } else {
            sub_Id = response.data.sub

            localStorage.setItem('sub_Id', response.data.sub)
            localStorage.setItem('role', response.data.resource_access['nodejs-microservice'].roles?.[0])
            console.log(jti_token)
            localStorage.setItem('name', response.data.preferred_username)
            console.log(response.data.preferred_username)
            console.log(response.data.resource_access)

            console.log('first')

            if (response.data.resource_access['nodejs-microservice'].roles?.[0] == 'admin' || response.data.resource_access['nodejs-microservice'].roles?.[0] == 'Admin') {
              setAlert(false)
              setAlertOtp(true)
              setTimeout(() => {
                setAlertOtp(false)
              }, 3000)
              navigate('/PMS/Admin_dashboard')
              // handlalert()
            } else if (response.data.resource_access['nodejs-microservice'].roles?.[0] == 'user' || response.data.resource_access['nodejs-microservice'].roles?.[0] == 'User') {
              navigate('/PMS/dashboard', { state: { id: 1, data: credentialsInfo } })
            } else if (response.data.resource_access['nodejs-microservice'].roles?.[0] == 'accountant' || response.data.resource_access['nodejs-microservice'].roles?.[0] == 'Accountant') {
              setAlert(false)
              setAlertOtp(true)
              setTimeout(() => {
                setAlertOtp(false)
              }, 3000)
              navigate('/PMS/Admin_dashboard')
              // localStorage.setItem("sub_Id","39d9a7d0-025c-44d3-9209-99c6c1f5aa8b")
              // localStorage.setItem("role","admin")
              // localStorage.setItem("name", "shubham");
            }
          }
        })
        .catch(function (error) {
          console.log(error)
          // setAlertOtpEr(true)
        })
      console.log(localStorage.getItem('name'))
      setValidated(false)
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert(false)
  }
  const [otp, setOtp] = useState('')
  const handleOpenModal = () => {
    setOtpModal(true)
    setAlertOtp(false)
    setAlertOtpEr(false)
    setValidated(false)
  }
  const handleSubmitFormOTP = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      c = 0
      e.preventDefault()
      handleOpenModal()
    }
  }

  console.log(resultData)
  return (
    <div>

      <div className="login">
        <div className="container">
          <Row>
            <Col item lg={6} style={{ paddingLeft: '5%', marginBottom: '5%' }}>
              <h4 style={{ fontSize: '24px', color: 'darkgrey', marginBottom: '4%', marginTop: '6%', marginLeft: '8%', cursor: 'pointer' }} >Welcome</h4>
              <div>
                <Form className="custom-form" noValidate validated={validated}
                  onSubmit={handleSubmitFormOTP}
                >
                  <h4 style={{ color: 'grey', fontSize: '22px' }}>Enter Credentials</h4>
                  <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': credentialsInfo.username })}>
                    <Form.Control
                      type="text"
                      id="name"
                      name="username"
                      onChange={handleInputChange}
                      required
                    />
                    <span>Enter UserName</span>
                    <Form.Control.Feedback type="invalid">
                      Wallet Name Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label htmlFor="key" className={cx('custom-form-box', { 'focus-add': credentialsInfo.password })}>
                    <Form.Control
                      type={passwordShown ? 'text' : 'password'}
                      id="key"
                      name="password"
                      onChange={handleInputChange}
                      required
                    />

                    <span>Enter Password</span>
                    <i onClick={togglePasswordVisiblity}><VisibilityOutlinedIcon style={{ marginTop: '-103px', marginLeft: '461px', color: 'white', cursor: 'pointer' }} /></i>
                    <Form.Control.Feedback type="invalid">
                      Key Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button type="submit" variant="" className="btn-gray"
                  // onClick={handleOpenModal}
                  >Login</Button>
                </Form>
              </div>
            </Col>
            <Col item lg={6} style={{ paddingLeft: '5%' }} className='div'>
              <OwlCarousel className="owl-theme" loop margin={10} nav items={1} style={{ height: '24%', width: '65%', paddingBottom: '5%' }}>
                <div className="loginimg">
                  <img src={loginimg} alt="" />
                  <p style={{ color: 'darkgray' }}>
                    Manage and Analyse all your wallets seamlessly at one place
                  </p>
                </div>
                <div className="loginimg">
                  <img src={loginimg} alt="" />
                  <p style={{ color: 'darkgray' }}>
                    Manage and Analyse all your wallets seamlessly at one place
                  </p>
                </div>
                <div className="loginimg">
                  <img src={loginimg} alt="" />
                  <p style={{ color: 'darkgray' }}>
                    Manage and Analyse all your wallets seamlessly at one place
                  </p>
                </div>
              </OwlCarousel>
              <Modal
                show={otpModal}
                onHide={handleCloseModal}
                style={{ width: '28%', marginLeft: '35%' }}
              >
                <div style={{ border: '1px solid white' }}>
                  <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
                    {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
                    <IconButton
                      style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
                      onClick={() => setOtpModal(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Modal.Header>
                  {alertOtpEr
                    ? (
                      <Snackbar
                        open={alertOtpEr}
                        autoHideDuration={4000}
                        onClose={handleAlertClose}
                        sx={{ marginLeft: '36%', marginBottom: '40%', width: '25%' }}
                      >
                        <Alert
                          onClose={handleAlertClose}
                          severity="error"
                          sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                        >
                          Incorrect credentials
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
                      <h4 >LOGIN  OTP</h4>
                      <p style={{ color: 'white' }}></p>
                      {/* <OtpInput
                    value={otp}
                    style={{width:"30px",color:"black"}}
                    onChange={(event)=>setOtp(event.target.value)}
                    numInputs={6}
                    separator={<span>-</span>}
                  /> */}
                      <Form.Label
                        htmlFor="name"
                        className={cx('custom-form-box', {
                          'focus-add': credentialsInfo.totp
                        })}
                        style={{ width: '72%', marginLeft: '15%' }}
                      >
                        <Form.Control
                          type="text"
                          id="name"
                          name="totp"
                          placeholder="OTP"
                          onChange={handleInputChange}
                          required
                          style={{ color: 'white' }}
                        />

                        <Form.Control.Feedback type="invalid">
                          OTP Required.
                        </Form.Control.Feedback>
                      </Form.Label>
                      <Button
                        type="submit"
                        variant=""
                        className="btn-gray"
                        style={{
                          width: '50%',
                          marginLeft: '25%',
                          marginTop: '3%',
                          boxShadow: 'none'
                        }}

                      >
                        Save
                      </Button>
                      {alertOtp
                        ? (
                          <Snackbar
                            open={alertOtp}
                            autoHideDuration={4000}
                            onClose={handleAlertClose}
                            sx={{ marginLeft: '36%', marginBottom: '40%', width: '25%' }}
                          >
                            <Alert
                              onClose={handleAlertClose}
                              severity="success"
                              sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                            >
                              Login successfully
                            </Alert>
                          </Snackbar>
                          )
                        : <></>
                      }

                    </Form>

                  </Modal.Body>
                </div>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
export default Login
