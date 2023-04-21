import React, { useState, useEffect } from 'react'
import CommonTable from '../../common/CommonTable/CommonTable'
import { Link, useNavigate } from 'react-router-dom'
import cx from 'classnames'
import axios from 'axios'
import Spinner from '../../common/spinner'
import Header from '../../common/Header/Header'
import SearchBox from '../../common/SearchBox/SearchBox'
import SidebarAdmin from '../DashboardAdmin/SidebarAdmin'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Snackbar from '@mui/material/Snackbar'
import { Alert, TextField } from '@mui/material'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
import Tooltip from '@mui/material/Tooltip'

import SuccessMessage from '../../modules/SuccessMessage/SuccessMessage'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
function Person () {
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()
  const [credentialsInfo, setCredentialsInfo] = useState({
    user_id: getId
  })
  const [dataId, setDataId] = useState('')
  const [result4, setResult4] = useState([])
  const [dataRow, setDataRow] = useState([])
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [loading, setLoading]=useState(false)
  const [show4, setShow4] = useState(false)
  const [showPerson, setShowPerson] = useState(false)
  const [showOrganization, setShowOrganization] = useState(false)
  const [showAllPortFolios, setShowAllPortFolios] = useState(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
  const [result3, setResult3] = useState([])
  const [personId, setPersonId] = useState('')
  const [partyId, setPartyId] = useState('')
  const [sea, setSea] = useState('')
  const [alertmo, setAlertmo] = useState(false)
  const [pp_data, setPpdata] = useState([])
  const [p_id, setp_id] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [search, setSearch] = useState([])
  const [validation, setValidation] = useState('')
  const assets4 = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllPerson`, {
        params: { user_id: getId }
      })
      .then(function (response) {
        const p_data = response.data
        setResult4(p_data)
        setLoading(false)
      })
  }
  if (result4) {
    result4.sort((a, b) => {
      const x = new Date(a.updated_time).getTime() / 1000
      const y = new Date(b.updated_time).getTime() / 1000
      return x > y ? -1 : x < y ? 1 : 0
    })
  }
  const getAllPortFolio = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_portfolio_users_data`, {
        params: {
          user_id: getId,
          user_role: (roleId?.includes('admin') === true) ? 'admin' : 'accountant'
        }
      })
      .then((response) => {
        const rs1 = response.data
        if (rs1 !== 'error') {
          setResult2(rs1)
        } else {
          setResult2([])
        }
      })
  }
  for (const a of result4) {
    a.portfolio_ids = []
    for (const b of result2) {
      for (const c of b?.partydata) {
        if (c.party_id === a.party_id) {
          a.portfolio_ids.push({
            portfolio_id: c.portfolio_id,
            name: c.portfolio_name,
            per: c.ownership
          })
        }
      }
    }
  }
  for (const a of result2) {
    for (const b of a.partydata) {
      const me = result4.filter((i) => i.party_id === b.party_id)
    }
  }
  useEffect(async () => {
    await assets4()
    await getAllPortFolio()
    await loadPersonData()

    // await getAllPortFolio();
  }, [])
  const person = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllPerson`, {
        params: { user_id: getId }
      })
      .then(function (response) {
        const p_data = response.data
        setResult4(p_data)
      })
  }
  const handleClose = () => {
    setShow(false)
    setShow1(false)
    setShow2(false)
    setShow3(false)
    setShow4(false)
  }
  const handleShow4 = () => {
    setShow4(true)
    setname1('')
    setValue('')
    setemail1('')
    setValue('')
    setNumber('')
    setValidation('')
    setInfo('')
    setValidated(false)
  }
  const handleShow1 = (row) => {
    setPartyId(row.party_id)
    setPpdata(row)
    setShow1(true)
  }
  const handleShow3 = (row) => {
    const pid = row.portfolio_ids?.[0]?.portfolio_id
    setp_id(pid)
    setShow3(true)
  }
  const handleMove = () => {
    navigate(`/PMS/Admin/SinglePortfolioPage/:${p_id}`)
  }

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [name1, setname1] = useState('')
  const [email1, setemail1] = useState('')
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')
  const [info, setInfo] = useState('')
  const [number, setNumber] = useState('')
  const [alertAl, setAlertAl] = useState(false)
  const handleform = () => {
    handleClose()
  }
  const handleChangePh = (newValue) => {
    const abc = newValue && isValidPhoneNumber(newValue) ? 'true' : 'false'

    setValidation(abc)
    setValue(newValue)
  }
  const handleChangePh1 = (newValue) => {
    const abc = newValue && isValidPhoneNumber(newValue) ? 'true' : 'false'
    setValidation(abc)
    setValue1(newValue)
  }
  const handleform1 = async (e) => {
    setValidated(true)
    e.preventDefault()
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const phoneRegExp =
        /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/
      const x = result4?.filter((i) => i.name === name1)
      if (x.length > 0) {
        setAlertAl(true)
        setTimeout(() => {
          setAlertAl(false)
        }, 3000)
      } else if (validation === 'true') {
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/admin/createperson`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            user_id: getId,
            user_role: 'admin',
            user_name: name1,
            email_id: email1,
            user_phone: value
          }
        }
        await axios(config)
          .then(function (response) {
            setAlert(true)
            setTimeout(() => {
              setAlert(false)
              setShow4(false)
            }, 3000)
            assets4()
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        setAlertmo(true)
        setTimeout(() => {
          setAlertmo(false)
        }, 3000)
      }
    }
  }
  const handleShow = (row) => {
    setPersonId(row.id)
    setname(row.name)
    setemail(row.email_id)
    setValidation('')
    setNumber('')
    if (row.phone == null) {
      setValue1('')
    } else {
      setValue1(row.phone)
    }
    setShow(true)
  }
  const handleDeleteUpdate = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/deletePerson`, {
        params: { party_id: partyId }
      })
      .then((response) => {
        person()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleSubmitForm = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const x = result4?.filter((i) => i.name === name && i.id !== personId)
      if (x.length > 0) {
        setAlertAl(true)
        setTimeout(() => {
          setAlertAl(false)
        }, 3000)
      } else if (validation === 'true') {
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/updatePerson`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            person_id: personId,
            user_id: getId,
            user_name: name,
            phone: value1,
            email_id: email
          }
        }
        await axios(config)
          .then(function (response) {
            setAlert(true)
            assets4()
            setTimeout(() => {
              setAlert(false)
              setShow(false)
            }, 3000)
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        setAlertmo(true)
        setTimeout(() => {
          setAlertmo(false)
        }, 3000)
      }
    }
  }

  const loadPersonData = async () => {
  }

  const handleShow2 = (row) => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPartyPortfolio`,
      params: {
        party_id: row.party_id
      }
    }
    axios(config).then(function (response) {
      setResult3(response.data)
    })

    setShow2(true)
  }

  const columnsFour = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true
    },

    {
      dataField: 'email_id',
      text: 'Email ID',
      sort: true
    },
    {
      dataField: 'phone',
      text: 'Phone',
      sort: true
    },
    {
      dataField: 'portfolio_ids',
      text: 'Portfolios',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            {row.portfolio_ids?.map(
              (e) => (
                <li key={e.portfolio_id} style={{ marginRight: '-50%' }}>
                  {e.name} - {e.per}%
                </li>
              )
            )}
          </>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            <span
              style={{ cursor: 'pointer', color: '#FFC107' }}
              onClick={() => handleShow(row)}
            >
              <Tooltip title={'edit'}>
                <EditOutlinedIcon />
              </Tooltip>
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={(row) => {
                // const getparty=async()=>{
                axios
                  .get(
                    `${process.env.REACT_APP_BASE_URL}/getAllPartyPortfolio`,
                    {
                      params: { party_id: row.party_id }
                    }
                  )
                  .then((response) => {
                    if (!response.data?.[0]) {
                      handleShow1(row)
                    } else {
                      handleShow3(row)
                    }
                  })
              }}
            >
            </span>
          </div>
        )
      }
    }
  ]

  const columns4 = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'15em' }}>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.name}
              </span>
            </div>
        )
      }
    },

    {
      dataField: 'email_id',
      text: 'Email ID',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'15em' }}>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.email_id}
              </span>
            </div>
        )
      }
    },
    {
      dataField: 'phone',
      text: 'Phone',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'13em' }}>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.phone}
              </span>
            </div>
        )
      }
    },
    {
      dataField: 'portfolio_ids',
      text: 'Portfolios',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {row.portfolio_ids?.map(
              (e) => (
                <li style={{color:'#FFC107'}}key={e.portfolio_id}>
                  <p style={{color:'white'}}>{e.name} - {e.per} %</p>
                </li>
              )
            )}
          </ul>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            <span
              style={{ cursor: 'pointer', color: '#FFC107' }}
              onClick={() => handleShow(row)}
            >
              <Tooltip title={'edit'}>
                <EditOutlinedIcon />
              </Tooltip>
            </span>
            <span
              style={{ cursor: 'pointer' }}
              onClick={() => {
                const getparty = async () => {
                  await axios
                    .get(
                      `${process.env.REACT_APP_BASE_URL}/getAllPartyPortfolio`,
                      {
                        params: { party_id: row.party_id }
                      }
                    )
                    .then((response) => {
                      if (row.portfolio_ids.length === 0) {
                        handleShow1(row)
                      } else {
                        handleShow3(row)
                      }
                    })
                }
                getparty()
              }}
            >
              {roleId.includes('admin') === true
                ? (
                  <Tooltip title={'delete'}>
                    <DeleteOutlineOutlinedIcon
                      style={{
                        color: '#b30000',
                        marginLeft: '1%',
                        marginRight: '1%'
                      }}
                    />
                  </Tooltip>
                  )
                : (
                  <></>
                  )}
            </span>
          </div>
        )
      }
    }
  ]

  const [bigData, setBigData] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Row className="d-flex justify-content-center">
              <span className="p-2 pageheader">
                <h3 className="pagetitle">
                  Persons
                </h3>
              </span>
              {roleId.includes('admin') === true
                ? (
                  <Link
                    to="#"
                    className="p-2 pageheader"
                    style={{
                      paddingRight: '2%',
                      width: '11%',
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      marginLeft: '1%',
                      color: '#FFC107',
                      top:'11px',
              position:'relative'
                    }}
                    onClick={() => handleShow4()}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Link>
                  )
                : (
                  <></>
                  )}
              <SearchBox
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = result4?.filter((i) =>
                    i.name.toLowerCase().includes(event.target.value.toLowerCase())
                    || i.phone == event.target.value
                    || i.email_id==event.target.value
                    || i.portfolio_ids?.[0]?.name==event.target.value
                  || i.portfolio_ids?.[1]?.name==event.target.value
                 
                  )
                  setSearch(x)
                }}
              />
            </Row>
            {loading
              ? (
                <Spinner
                  style={{
                  position:'fixed',
                  top:'20em',
                  left:'59%',
                    height: '70px',
                    width: '70px'
                  }}
                  animation="border"
                  variant="primary"
                />
                )
              : null}
            {sea
              ? (
                <CommonTable
                  data={search}
                  columns={roleId.includes('admin') === true ? columns4 : columnsFour}
                />
                )
              : (
                <CommonTable
                loading={loading}
                  data={result4}
                  columns={roleId.includes('admin') === true ? columns4 : columnsFour}
                />
                )}
          </Col>
        </Row>
        <Modal
          show={show2}
          onHide={handleClose}
          style={{
            width: '100%',
            paddingBottom: '6%',
            marginTop: '3%',
            marginLeft: '2%',
            height: '95%'
          }}
        >
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => setShow2(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body
            style={{
              backgroundColor: '#222429'
            }}
          >
            <div>
              <h3 style={{ fontSize: '18px' }}>List of portfolio</h3>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={show1}
          onHide={handleClose}
          style={{
            width: '30rem',
            marginTop: '17rem',
            overflow: 'hidden',
            marginLeft: '35%',
            backgroundColor: '#222429',
            height: '8rem',
            border: '1px solid white',
            borderRadius: '15px'
          }}
        >
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <Modal.Title
              style={{
                color: 'white',
                fontSize: '16px',
                marginTop: '-5%',
                marginLeft: '11%'
              }}
            >
              Are you sure you want to Delete this person ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-3%'
            }}
          >
            <Button
              variant="success"
              style={{
                width: '25%',
                marginBottom: '2%',backgroundColor: '#006400'
                
              }}
              onClick={() => {
                handleDeleteUpdate()
                handleClose()
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              style={{ width: '25%',backgroundColor: '#b30000'  }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show3}
          onHide={handleClose}
          style={{
            width: '30rem',
            marginTop: '17rem',
            overflow: 'hidden',
            marginLeft: '35%',
            backgroundColor: '#222429',
            height: '11rem',
            border: '1px solid white',
            borderRadius: '15px'
          }}
        >
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <Modal.Title
              style={{
                color: 'white',
                fontSize: '16px',
                marginTop: '-5%',
              }}
            >
              This person contains ownership of portfolio. If you want to delete
              this person press proceed to remove the ownership from portfolio ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-3%'
            }}
          >
            <Button
              variant="success"
              style={{
                width: '25%',
                marginBottom: '2%',
                backgroundColor: '#006400'
              }}
              onClick={
                handleMove
              }
            >
              proceed
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              style={{ width: '25%', backgroundColor: '#b30000'  }}
            >
              leave
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show}
          //  onHide={handleClose}
          style={{ width: '28%', marginLeft: '35%' }}
        >
          <div style={{ border: '1px solid white' }}>
            <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
              {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
              <IconButton
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  color: 'white'
                }}
                onClick={() => setShow(false)}
              >
                <CloseIcon />
              </IconButton>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: '#222429' }}>
              {alert
                ? (
                  <Snackbar
                    open={alert}
                    onClose={handleClose}
                    sx={{
                      // marginTop:'-2%',
                      marginLeft: '44%',
                      marginBottom: '32%',

                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      update person details successfully
                    </Alert>
                  </Snackbar>
                  )
                : (
                  <></>
                  )}
              {alertAl
                ? (
                  <Snackbar
                    open={alertAl}
                    // autoHideDuration={4000}
                    onClose={() => setAlertAl(false)}
                    sx={{
                      // marginTop:'-2%',
                      marginLeft: '44%',
                      marginBottom: '38%',

                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertAl(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Already exist
                    </Alert>
                  </Snackbar>
                  )
                : (
                  <></>
                  )}
              {alertmo
                ? (
                  <Snackbar
                    open={alertmo}
                    // autoHideDuration={4000}
                    onClose={() => setAlertmo(false)}
                    sx={{
                      // marginTop:'-2%',
                      marginLeft: '44%',
                      marginBottom: '38%',

                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertmo(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      please enter valid mobile number
                    </Alert>
                  </Snackbar>
                  )
                : (
                  <></>
                  )}
              {!isWalletConnected
                ? (
                  <Form
                    className="custom-form form-flow"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmitForm}
                  >
                    <h4 >
                      Edit Person Details
                    </h4>

                    <Form.Label
                      htmlFor="exchange"
                      className={cx('custom-form-box', {
                        'focus-add': name
                      })}
                      style={{
                        width: '72%'
                        // , marginLeft: "15%"
                      }}
                    >
                      <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        required
                        style={{ color: 'white' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Name is Required.
                      </Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label
                      htmlFor="exchange"
                      className={cx('custom-form-box', {
                        'focus-add': email
                      })}
                      style={{
                        width: '72%'
                        // , marginLeft: "15%"
                      }}
                    >
                      <Form.Control
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setemail(e.target.value)}
                        // required
                        style={{ color: 'white' }}
                      />
                      {/* <span style={{ background: "none", color: "white" }}>
                  mail
                </span> */}
                      {/* <Form.Control.Feedback type="invalid">
                   email is Required.
                </Form.Control.Feedback> */}
                    </Form.Label>
                    <PhoneInput
                      defaultCountry="AE"
                      value={value1}
                      // forceCallingCode
                      onChange={handleChangePh1}
                      style={{
                        width: '72%'
                        // marginLeft:'25px',marginTop:'1%',marginBottom:'3%',border:"none", marginRight:'41px'
                      }}
                      sx={{

                      }}
                    />
                    <Button
                      type="submit"
                      variant=""
                      className="btn-gray"
                      style={{
                        width: '50%',
                        marginTop: '18px',
                        // marginLeft: "25%",
                        boxShadow: 'none',
                        color: 'white'
                      }}
                      onClick={handleSubmitForm}
                    >
                      Save
                    </Button>
                  </Form>
                  )
                : (
                  <SuccessMessage message=" Exchange Successfully Added" />
                  )}
            </Modal.Body>
          </div>
        </Modal>
        <Modal
          show={show4}
          //  onHide={handleClose}
          style={{ width: '28%', marginLeft: '35%' }}
        >
          <div style={{ border: '1px solid white' }}>
            <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
              {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
              <IconButton
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  color: 'white'
                }}
                onClick={() => setShow4(false)}
              >
                <CloseIcon />
              </IconButton>
            </Modal.Header>
            {alert
              ? (
                <Snackbar
                  open={alert}
                  // autoHideDuration={4000}
                  onClose={() => setAlert(false)}
                  sx={{
                    // marginTop:'-2%',
                    marginLeft: '44%',
                    marginBottom: '38%',

                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={() => setAlert(false)}
                    severity="success"
                    sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                  >
                    Added Person&apos;s details successfully
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )}
            {alertAl
              ? (
                <Snackbar
                  open={alertAl}
                  // autoHideDuration={4000}
                  onClose={() => setAlertAl(false)}
                  sx={{
                    // marginTop:'-2%',
                    marginLeft: '44%',
                    marginBottom: '38%',

                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={() => setAlertAl(false)}
                    severity="error"
                    sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                  >
                    Already exist
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )}
            {alertmo
              ? (
                <Snackbar
                  open={alertmo}
                  // autoHideDuration={4000}
                  onClose={() => setAlertmo(false)}
                  sx={{
                    // marginTop:'-2%',
                    marginLeft: '44%',
                    marginBottom: '38%',

                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={() => setAlertmo(false)}
                    severity="error"
                    sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                  >
                    please enter valid mobile number
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )}
            <Modal.Body style={{ backgroundColor: '#222429' }}>
              {!isWalletConnected
                ? (
                  <Form
                    className="custom-form form-flow"
                    noValidate
                    validated={validated}
                    onSubmit={handleform1}
                  >
                    <h4 >
                      Add Person Details
                    </h4>

                    <Form.Label
                      htmlFor="exchange"
                      className={cx('custom-form-box', {
                        'focus-add': name1
                      })}
                      style={{
                        width: '72%'
                        // , marginLeft: "15%"
                      }}
                    >
                      <Form.Control
                        type="text"
                        id="name"
                        name="name"
                        // value={name}
                        placeholder="Name"
                        onChange={(e) => setname1(e.target.value)}
                        required
                        style={{ color: 'white' }}
                      />
                      {/* <span style={{ background: "none", color: "white" }}>
                  Enter name
                </span> */}
                      <Form.Control.Feedback type="invalid">
                        Name is Required.
                      </Form.Control.Feedback>
                    </Form.Label>
                    <Form.Label
                      htmlFor="exchange"
                      className={cx('custom-form-box', {
                        'focus-add': email1
                      })}
                      style={{
                        width: '72%'
                        // , marginLeft: "15%"
                      }}
                    >
                      <Form.Control
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        // value={email}
                        onChange={(e) => setemail1(e.target.value)}
                        // required
                        style={{
                          color: 'white',
                          borderColor: 'dimgrey',
                          backgroundImage: 'none'
                        }}
                      />
                    </Form.Label>
                    <PhoneInput
                      defaultCountry="AE"
                      value={value}
                      onChange={handleChangePh}
                      style={{
                        width: '72%'
                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          paddingTop: '2%',
                          border: '1px solid grey',
                          height: '50px'
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                          textAlign: 'none',
                          position: 'unset',
                          top: '0',
                          padding: '0 0',
                          borderRadius: 'none',
                          borderStyle: 'none',
                          borderColor: 'none'
                        },
                        '.MuiOutlinedInput-input': {
                          fontSize: '16px'
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      variant=""
                      className="btn btn-gray"
                      style={{
                        width: '50%',
                        marginTop: '18px',
                        boxShadow: 'none',
                        color: 'white'
                      }} >
                      Save
                    </Button>
                  </Form>
                  )
                : (
                  <SuccessMessage message=" Exchange Successfully Added" />
                  )}
            </Modal.Body>
          </div>
        </Modal>
      </Container>
    </React.Fragment >
  )
}
export default Person
