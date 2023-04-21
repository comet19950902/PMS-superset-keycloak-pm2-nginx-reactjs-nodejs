import React, { useState } from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import cx from 'classnames'
import axios from 'axios'
import Header from '../../common/Header/Header'
import './AddExchange.css'
import Sidebar from '../../store/Dashboard/Sidebar'
import SuccessMessage from '../SuccessMessage/SuccessMessage'

const AddExchange = () => {
  const [credentialsInfo, setCredentialsInfo] = useState({
    // exchange_id: "",
    //   email: "",
    //   password: "",
  })
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
        url: '${process.env.REACT_APP_BASE_URL}/debank_add_exchange',
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentialsInfo
      }
      await axios(config).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    }
    setValidated(true)
    //   axios.post('http://192.168.86.179:8180/debank_add_investment',
    //   {
    //     headers:
    //     {
    //     'Content-Type':'application/json'
    //   },
    //   data: credentialsInfo,
    // })
    // // console.log(data)
    //       .then(response => console.log(response));
  }
  return (
    <div>
      <div className="mainmyassets">
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Header />
            <div className="maindashinfo">
              <Breadcrumb>
                {/* <Breadcrumb.Item href="#">Manage Assets</Breadcrumb.Item> */}
                {/* <Breadcrumb.Item href="#">Asset 1</Breadcrumb.Item> */}
                {/* <Breadcrumb.Item active>Add  Exchange</Breadcrumb.Item> */}
              </Breadcrumb>
              {!isWalletConnected
                ? (
                  <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm}>
                    <h4>Add Exchange</h4>
                    <Form.Label htmlFor="exchange" className={cx('custom-form-box', { 'focus-add': credentialsInfo.exchange_id })}>
                      <Form.Control
                        type="text"
                        id="exchange"
                        name="exchange_id"
                        onChange={handleInputChange}
                        required
                      />
                      <span>Enter Exchange</span>
                      <Form.Control.Feedback type="invalid">
                        Exchange ID is Required.
                      </Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label htmlFor="email" className={cx('custom-form-box', { 'focus-add': credentialsInfo.exchange_name })}>
                      <Form.Control
                        type="email"
                        id="email"
                        name="exchange_email"
                        onChange={handleInputChange}
                        required
                      />
                      <span>Enter Name</span>
                      <Form.Control.Feedback type="invalid">
                        Name is Required.
                      </Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label htmlFor="password" className={cx('custom-form-box', { 'focus-add': credentialsInfo.exchange_apiKey })}>
                      <Form.Control
                        type="text"
                        id="password"
                        name="exchange_password"
                        onChange={handleInputChange}
                        required
                      />
                      <span>Enter API Key</span>
                      <Form.Control.Feedback type="invalid">
                        Key is Required.
                      </Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label htmlFor="password" className={cx('custom-form-box', { 'focus-add': credentialsInfo.exchange_accessKey })}>
                      <Form.Control
                        type="text"
                        id="password"
                        name="exchange_password"
                        onChange={handleInputChange}
                        required
                      />
                      <span>Enter Access Key</span>
                      <Form.Control.Feedback type="invalid">
                        Key is Required.
                      </Form.Control.Feedback>
                    </Form.Label>                <Button type="submit" variant="" className="btn-gray">Connect</Button>
                  </Form>
                  )
                : (
                  <SuccessMessage message=" Exchange Successfully Added" />
                  )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddExchange
