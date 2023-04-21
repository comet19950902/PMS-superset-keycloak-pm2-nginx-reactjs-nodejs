import React, { useState } from 'react'
import './login.css'
import cx from 'classnames'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import loginimg from '../../assets/images/loginimg.png'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate, Link } from 'react-router-dom'
import { Alert, TextField } from '@mui/material'
import { Breadcrumb, Button, Form, Col, Row } from 'react-bootstrap'

import EmailIcon from '@mui/icons-material/Email'
import NoEncryptionIcon from '@mui/icons-material/NoEncryption'

import { Formik } from 'formik'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import * as Yup from 'yup'
import OtpInput from 'react-otp-input'

const Otp = () => {
  const navigate = useNavigate()
  const [credentialsInfo, setCredentialsInfo] = useState({
    // name: "",
    // key: "",
    // userID:userID,

  })
  const [result, setResult] = useState([])
  // const [newdata, setNewData] = useState({});
  const [dataSet, setDataSet] = useState([])
  const [value, setValue] = useState([])
  const [alert, setAlert] = useState(false)
  const [otp, setOtp] = useState('')
  const userData = {}
  let newData = {}
  let jti_token = ' '
  let sub_Id = ' '
  const dataCheck = ''
  let c = 0
  const [validated, setValidated] = useState(false)
  const handleChange = (e) => {
    console.log(e.target.value)
    setOtp(e.target.value)
  }
  const handleSubmitForm = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      c = 0
      e.preventDefault()
      // console.log(email,password);
      // console.log(userData);
      const axios = require('axios')
      const qs = require('qs')
      const data = qs.stringify(credentialsInfo)
      // 'username': 'shubham',
      // 'password': 'qwerty123'
      // });
      console.log(credentialsInfo)
      const config = {
        method: 'post',
        url: '${process.env.REACT_APP_BASE_URL}/debank_login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
      }

      axios(config)
        .then(function (response) {
          console.log(response)
          newData = JSON.stringify(response.data)
          jti_token = response.data.message
          sub_Id = response.data.sub
          console.log(sub_Id)
          localStorage.setItem('sub_Id', response.data.sub)
          console.log(jti_token)
          localStorage.setItem('name', response.data.preferred_username)
          console.log(response.data.preferred_username)
          console.log(response.data.resource_access)
          if (jti_token == 'Request failed with status code 401') {
            console.log('2')
            navigate('/')
            setAlert(true)
          } else {
            console.log('first')

            if (response.data.resource_access['nodejs-microservice'].roles?.[0] == 'admin') {
              navigate('/PMS/Admin_dashboard')
              setAlert(false)
              // handlalert()
            } else if (response.data.resource_access['nodejs-microservice'].roles?.[0] == 'user') {
              navigate('/PMS/dashboard')
              setAlert(false)
            } else {
              navigate('/PMS/Account_dashboard')
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
      console.log(localStorage.getItem('name'))
      setValidated(true)
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setAlert(false)
  }
  return (
    <div>
      {alert
        ? (
          <Snackbar
            open={alert}
            autoHideDuration={4000}
            onClose={handleClose}
            sx={{ marginLeft: '30%', marginBottom: '50%', width: '40%' }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%', backgroundColor: '#1f2125', color: 'white' }}
            >
              Incorrect Password
            </Alert>
          </Snackbar>
          )
        : (
          <></>
          )}
      <div className="login">
        <div className="container">
          <Row>
            <Col item lg={6} style={{ paddingLeft: '5%', marginBottom: '5%' }}>
              <h4 style={{ fontSize: '24px', color: 'darkgrey', marginBottom: '4%', marginTop: '6%', marginLeft: '8%' }}>Welcome</h4>
              <div>
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  numInputs={6}
                  separator={<span>-</span>}
                />
                {/* <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm}>
                  <h4 style={{color:"grey",fontSize:"22px"}}>Enter Credentials</h4>
                  <Form.Label htmlFor="name" className={cx("custom-form-box", {"focus-add":credentialsInfo.username})}>
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
                  <Form.Label htmlFor="key" className={cx("custom-form-box", {"focus-add":credentialsInfo.password})}>
                    <Form.Control
                      type="password"
                      id="key"
                      name="password"
                      onChange={handleInputChange}
                      required
                      />
                      <span>Enter Password</span>
                      <Form.Control.Feedback type="invalid">
                          Key Required.
                      </Form.Control.Feedback>
                  </Form.Label>
                  <Button type="submit" variant="" className="btn-gray">Login</Button>
                </Form> */}
              </div>
            </Col>
            {/* <Col item lg={6} style={{paddingLeft:"5%"}} className='div'>
              <OwlCarousel className="owl-theme" loop margin={10} nav items={1} style={{height:"24%",width:"65%",paddingBottom:"5%"}}>
                <div className="loginimg">
                  <img src={loginimg} alt="" />
                  <p style={{ color: "darkgray"}}>
                    Manage and Analyse all your wallets seamlessly at one place
                  </p>
                </div>
                <div className="loginimg">
                  <img src={loginimg} alt="" />
                  <p style={{ color: "darkgray"}}>
                    Manage and Analyse all your wallets seamlessly at one place
                  </p>
                </div>
                <div className="loginimg">
                  <img src={loginimg} alt="" />
                  <p style={{ color: "darkgray"}}>
                    Manage and Analyse all your wallets seamlessly at one place
                  </p>
                </div>
              </OwlCarousel>
            </Col> */}
          </Row>
        </div>
      </div>
    </div>
  )
}
export default Otp
