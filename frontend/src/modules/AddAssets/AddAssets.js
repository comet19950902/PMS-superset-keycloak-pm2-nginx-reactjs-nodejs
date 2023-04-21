import React, { useState } from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import cx from 'classnames'
import Header from '../../common/Header/Header'
import './AddAssets.css'
import Sidebar from '../../store/Dashboard/Sidebar'
import SuccessMessage from '../SuccessMessage/SuccessMessage'

const AddAssets = () => {
  const [credentialsInfo, setCredentialsInfo] = useState({
    name: '',
    address: ''
  })
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const handleSubmitForm = () => {
    setIsWalletConnected(true)
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
                <Breadcrumb.Item href="#">Manage Assets</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Asset 1</Breadcrumb.Item>
                <Breadcrumb.Item active>Add Asset</Breadcrumb.Item>
              </Breadcrumb>
              {!isWalletConnected
                ? (
                  <Form className="custom-form" onSubmit={handleSubmitForm}>
                    <h4>Enter Credentials</h4>
                    <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': credentialsInfo.name })}>
                      <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleInputChange}
                      />
                      <span>Enter Name</span>
                    </Form.Label>
                    <Form.Label htmlFor="address" className={cx('custom-form-box', { 'focus-add': credentialsInfo.address })}>
                      <Form.Control
                        type="text"
                        id="address"
                        name="address"
                        onChange={handleInputChange}
                      />
                      <span>Enter Address</span>
                    </Form.Label>
                    <Button type="submit" variant="" className="btn-gray">Connect</Button>
                  </Form>
                  )
                : (
                  <SuccessMessage message=" Asset Successfully Added" />
                  )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddAssets
