import React, { useState } from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import cx from 'classnames'
import Header from '../../common/Header/Header'
import axios from 'axios'
import { Alert, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate, useLocation } from 'react-router-dom'

import SuccessMessage from '../SuccessMessage/SuccessMessage'
import Sidebar from '../../store/Dashboard/Sidebar'
import SidebarIcons from '../../store/Dashboard/SidebarIcons'

const AddAddress = () => {
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)
  const location = useLocation()
  console.log(location)
  const walletIdAddress = location.pathname.slice(17, 53)
  console.log(walletIdAddress)
  const userID = localStorage.getItem('sub_Id')
  const portfolio_id = location.pathname.slice(55)
  console.log(portfolio_id)
  console.log(userID)
  const [credentialsInfo, setCredentialsInfo] = useState({
    // name: "",
    // key: "",
    portfolio_id,
    wallet_id: walletIdAddress

  })
  const submit = () => {
    console.log('Submitted')
    setAlert(true)
    setTimeout(navigate(`/PMS/MainManageAssetsSubWallets/:${walletIdAddress}/:${portfolio_id}`), 3000)
  }
  const navigate = useNavigate()
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const [validated, setValidated] = useState(false)

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
        url: '${process.env.REACT_APP_BASE_URL}/debank_fetch/add_address',
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentialsInfo
      }
      await axios(config).then(function (response) {
        console.log(response.data)

        if (response.data == 'Updated') {
          submit()
        } else if (response.data == 'Address Already Exist With Another Wallet') {
          setTimeout(() => setAlert2(true), 2000)
        }
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
  const handleClose2 = () => {
    setAlert2(false)
  }

  return (
    <div>
      <div className="mainmyassets">
        <Row>
          <Col lg={2} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {
              isHovering ? <Sidebar /> : <SidebarIcons />
            }
            {/* <Sidebar />  */}
          </Col>
          <Col lg={10}>
            <Header />
            <div className="maindashinfo">

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
                  sx={{ marginLeft: '50%', marginBottom: '38%', width: '25%' }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                  >
                    Added Address successfully
                  </Alert>
                </Snackbar>
              )
                : <></>
              }
              {alert2 ? (
                <Snackbar
                  open={alert2}
                  // autoHideDuration={4000}
                  onClose={handleClose2}
                  sx={{ marginLeft: '50%', marginBottom: '34%', width: '25%' }}
                >
                  <Alert
                    onClose={handleClose2}
                    severity="error"
                    sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                  >
                    Address Already Exist With Another Wallet
                  </Alert>
                </Snackbar>
              )
                : <></>
              }
              {/* {!isWalletConnected ? ( */}
              <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm}>
                <h4>Add Address</h4>
                <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': credentialsInfo.address_id })}>
                  <Form.Control
                    type="text"
                    id="name"
                    name="address_id"
                    onChange={handleInputChange}
                    required

                  />
                  <span>Address Name</span>
                  <Form.Control.Feedback type="invalid">
                    Address Name Required.
                  </Form.Control.Feedback>
                </Form.Label>

                <Button type="submit" variant="" className="btn-gray">Save</Button>
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

export default AddAddress
