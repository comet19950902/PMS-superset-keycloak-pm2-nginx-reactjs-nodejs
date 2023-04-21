import React, { useState } from 'react'
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap'
import cx from 'classnames'
import axios from 'axios'
import Header from '../../common/Header/Header'
import './AddInvestment.css'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../store/Dashboard/Sidebar'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarIcons from '../../store/Dashboard/SidebarIcons'

const AddInvestment = () => {
  const userID = localStorage.getItem('sub_Id')
  console.log(userID)
  const [credentialsInfo, setCredentialsInfo] = useState({
    // name: "",
    // key: "",
    userId: userID

  })
  const [showDashboard, setShowDashboard] = useState(false)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('0%')
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
  // const [credentialsInfo, setCredentialsInfo] = useState({
  //   // invest_name: "Data",
  //   // invest_type: "BTC  ",
  //   // date_of_invest: "10-10-2022",
  //   // invest_value: "$1000",
  // });
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)

  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
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
        url: '${process.env.REACT_APP_BASE_URL}/add_investment',
        headers: {
          'Content-Type': 'application/json'
        },
        data: credentialsInfo
      }
      await axios(config).then(function (response) {
        console.log(response)
        navigate('/PMS/Investments')
      }).catch(function (error) {
        console.log(error)
        console.log(config.data)
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
              style={{ backgroundColor: 'darkgrey', width: w, marginLeft: m, marginTop: '-2%' }}
            />
            <div className="maindashinfo">
              <Breadcrumb>
                {/* <Breadcrumb.Item href="#">Manage Assets</Breadcrumb.Item> */}
                {/* <Breadcrumb.Item href="#">Asset 1</Breadcrumb.Item> */}
                {/* <Breadcrumb.Item active>Add Investment</Breadcrumb.Item> */}
              </Breadcrumb>
              {!isWalletConnected ? (
                <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm} style={{ marginBotoom: '4%' }}>
                  <h4>Add Investment</h4>
                  <Form.Label
                    htmlFor="name"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.invest_name
                    })}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="invest_name"
                      onChange={handleInputChange}
                      required
                    />
                    <span>Enter Name</span>
                    <Form.Control.Feedback type="invalid">
                      Name Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="type"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.invest_type
                    })}
                  >
                    <Form.Control
                      type="text"
                      id="type"
                      name="invest_type"
                      onChange={handleInputChange}
                      required
                    />
                    <span>Enter type</span>
                    <Form.Control.Feedback type="invalid">
                      Type Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="investment"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.date_of_invest
                    })}
                  >
                    <Form.Control
                      type="date"
                      id="investment"
                      name="date_of_invest"
                      onChange={handleInputChange}
                      required
                      style={{ colorScheme: 'dark' }}
                    // style={{backgroundColor:'white'}}
                    />
                    <span>Enter Date of investment </span>
                    <Form.Control.Feedback type="invalid">
                      Date Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="value"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.invest_value
                    })}
                  >
                    <Form.Control
                      type="text"
                      id="value"
                      name="invest_value"
                      onChange={handleInputChange}
                      required
                    />
                    <span>Enter Value</span>
                    <Form.Control.Feedback type="invalid">
                      Value Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button type="submit" variant="" className="btn-gray">Connect</Button>
                </Form>
              ) : (
                <SuccessMessage message="Investment Successfully Added" />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AddInvestment
