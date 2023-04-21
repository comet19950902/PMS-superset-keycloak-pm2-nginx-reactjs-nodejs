import React, { useState, useEffect } from 'react'
import CommonTable from '../../common/CommonTable/CommonTable'
import { Link, useNavigate } from 'react-router-dom'
import cx from 'classnames'
import axios from 'axios'
import Header from '../../common/Header/Header'
import SearchBox from '../../common/SearchBox/SearchBox'
import SidebarAdmin from '../DashboardAdmin/SidebarAdmin'
import { Alert, Snackbar } from '@mui/material'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
import Spinner from '../../common/spinner'
import Tooltip from '@mui/material/Tooltip'
import SuccessMessage from '../../modules/SuccessMessage/SuccessMessage'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

function Organisation () {
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const [validated, setValidated] = useState(false)
  const [alertOr, setAlertOr] = useState(false)
  const [alertUo, setAlertUo] = useState(false)
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [show4, setShow4] = useState(false)

  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [result, setResult] = useState([])
  const [result3, setResult3] = useState([])
  const [orgnId, setOrgnId] = useState('')
  const [tax, setTax] = useState('')
  const [tax1, setTax1] = useState('')
  const [partyId, setPartyId] = useState('')
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [pId, setpId] = useState('')
  const [alertAl, setAlertAl] = useState(false)

  let d2 = []
  const loadPersonData = async () => {
    setLoading(true)
    await getAllPortFolio()
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllOrganisation`, {
        params: { userId: getId }
      })
      .then((response) => {
        setResult(response.data)
        setLoading(false)
      })
  }
  if (result) {
    result.sort((a, b) => {
      const x = new Date(a.updated_time).getTime() / 1000
      const y = new Date(b.updated_time).getTime() / 1000
      return x > y ? -1 : x < y ? 1 : 0
    })
  }
  const getAllPortFolio = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/all_portfolio_users_data`,
      params: {
        user_id: getId,
        user_role: (roleId?.includes('admin') === true) ? 'admin' : 'accountant'
      }
    }
    await axios(config).then(function (response) {
      d2 = response.data
      if (d2 !== 'error') {
        setResult3(d2)
      } else {
        setResult3([])
      }
    }).catch(function (error) {
      console.log(error)
    })
  }
  useEffect(async () => {
    await loadPersonData()
    await getAllPortFolio()
  }, [])
  const handleClose = () => {
    setShow(false)
    setShow1(false)
    setShow2(false)
    setShow3(false)
    setShow4(false)
  }
  const handleShow4 = () => {
    setShow4(true)
    setValidated(false)
    setTax1('')
    setname1('')
    setcity1('')
    setaddress1('')
    setcountry1('')
    setAlertOr(false)
  }
  const handleShow1 = (row) => {
    setPartyId(row.party_id)
    setShow1(true)
  }
  const handleShow3 = (row) => {
    const pid = row.portfolio_ids?.[0]?.portfolio_id
    setpId(pid)
    setShow3(true)
  }
  const handleMove = () => {
    navigate(`/PMS/Admin/SinglePortfolioPage/:${pId}`)
  }
  const [name, setname] = useState('')
  const [address, setaddress] = useState('')
  const [city, setcity] = useState('')
  const [country, setcountry] = useState('')
  const [name1, setname1] = useState('')
  const [address1, setaddress1] = useState('')
  const [city1, setcity1] = useState('')
  const [country1, setcountry1] = useState('')
  const handleform1 = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const m = result?.filter(i => i.name === name1.trim(''))
      if (m.length > 0) {
        setAlertAl(true)
        setTimeout(() => {
          setAlertAl(false)
        }, 3000)
      } else {
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/admin/createorganisation`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            user_id: getId,
            user_role: 'admin',
            tax_id: tax1,
            name: name1,
            address: address1,
            city: city1,
            country: country1
          }
        }
        await axios(config).then(function (response) {
          setAlertOr(true)
          setTimeout(() => {
            setAlertOr(false)
            setShow4(false)
          }, 2000)
          loadPersonData()
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
  const handleShow = (row) => {
    setTax(row.tax_id)
    setname(row.name)
    setaddress(row.address)
    setcity(row.city)
    setcountry(row.country)
    setOrgnId(row.id)
    setShow(true)
    setAlertUo(false)
    setValidated(false)
  }
  const handleDeleteUpdate = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/deleteOrganisation`, {
        params: { party_id: partyId }
      })
      .then((response) => {
        loadPersonData()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const m = result?.filter(i => i.name === name && i.id !== orgnId)
      if (m.length > 0) {
        setAlertAl(true)
        setTimeout(() => {
          setAlertAl(false)
        }, 3000)
      } else {
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/updateOrganisation`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            org_id: orgnId,
            user_id: getId,
            org_name: name,
            tax_id: tax,
            address,
            city,
            country
          }
        }
        await axios(config)
          .then(function (response) {
            setAlertUo(true)
            setTimeout(() => {
              setShow(false)
              setAlertUo(false)
            }, 2000)
            loadPersonData()
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
    setValidated(true)
  }
  for (const a of result) {
    a.portfolio_ids = []
    for (const b of result3) {
      for (const c of b?.partydata) {
        if (c.party_id === a.party_id) {
          a.portfolio_ids.push({ portfolio_id: c.portfolio_id, name: c.portfolio_name, per: c.ownership })
        }
      }
    }
  }
  const columns4 = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{width:'8em'}}>
            <Tooltip title={row.name}>
              <span>
                {row.name}
              </span>
            </Tooltip>
          </div>
        )
      }
    },
    {
      dataField: 'tax_id',
      text: 'Tax id',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'8em' }}>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.tax_id}
              </span>
            </div>
        )
      }
    },
    {
      dataField: 'address',
      text: 'Address',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'8em' }}>
              <span style={{ whiteSpace: 'break-Spaces', cursor: 'pointer' }}>
                {row.address}
              </span>
            </div>
        )
      }
    },
    {
      dataField: 'city',
      text: 'City',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'8em' }}>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.city}
              </span>
            </div>
        )
      }
    },
    {
      dataField: 'country',
      text: 'Country',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row',width:'6em' }}>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.country}
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
            {row.portfolio_ids?.map(e =>
              <li style={{color:'#FFC107'}} key={e.portfolio_id} >
                <p style={{color:'white'}}>{e.name} - {e.per}%</p></li>
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
            <span style={{ cursor: 'pointer', color: '#FFC107' }} onClick={() => handleShow(row)}>
              <Tooltip title={'edit'}>
                <EditOutlinedIcon />
              </Tooltip>
            </span >
            <span style={{ cursor: 'pointer' }} onClick={() => {
              const getparty = async () => {
                await axios
                  .get(`${process.env.REACT_APP_BASE_URL}/getAllPartyPortfolio`, {
                    params: { party_id: row.party_id }
                  })
                  .then((response) => {
                    if (row.portfolio_ids.length === 0) {
                      handleShow1(row)
                    } else {
                      handleShow3(row)
                    }
                  })
              }
              getparty()
            }
            }>
              {
                roleId.includes('admin') === true
                  ? <Tooltip title={'delete'}>
                    <DeleteOutlineOutlinedIcon style={{ color: '#b30000', marginLeft: '1%', marginRight: '1%' }} />
                  </Tooltip>
                  : <></>
              }
            </span>
          </div>
        )
      }
    }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12} >
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Organizations</h3>
              </span>
              {
                roleId.includes('admin') === true
                  ? <Link
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
                  : <></>
              }
              <SearchBox
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = result?.filter(i => 
                    i.name.toLowerCase().includes(event.target.value.toLowerCase())
                    || i.address!=null && i.address == event.target.value
                    || i.city!=null && i.city == event.target.value
                    || i.tax_id!=null && i.tax_id == event.target.value
                    || i.country!=null && i.country == event.target.value
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
              ? <CommonTable data={search} columns={columns4} />
              : <CommonTable loading={loading} data={result} columns={columns4} />
            }
          </Col>
        </Row>
      </Container>
      <Modal
        show={show2} onHide={handleClose} style={{
          width: '100%',
          paddingBottom: '6%',
          marginTop: '3%',
          marginLeft: '2%',
          height: '95%'
        }}>
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
        <Modal.Body style={{
          backgroundColor: '#222429'
        }}>
          <div >
            <h3 style={{ fontSize: '18px' }}>List of portfolio</h3>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose} style={{ width: '30rem', marginTop: '17rem', overflow: 'hidden', marginLeft: '35%', backgroundColor: '#222429', height: '8rem', border: '1px solid white', borderRadius: '15px' }}>
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <Modal.Title style={{ color: 'white', fontSize: '16px', marginTop: '-5%', marginLeft: '6%' }}>Are you sure you want to Delete this organisation ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-3%' }}>
          <Button variant="success" style={{ width: '25%', marginBottom: '2%',  backgroundColor: '#006400' }}
            onClick={() => {
              handleDeleteUpdate()
              handleClose()
            }
            }
          >
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose} style={{ width: '25%', backgroundColor: '#b30000'}}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show3} onHide={handleClose} style={{ width: '30rem', marginTop: '17rem', overflow: 'hidden', marginLeft: '35%', backgroundColor: '#222429', height: '11rem', border: '1px solid white', borderRadius: '15px' }}>
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <Modal.Title style={{ color: 'white', fontSize: '16px', marginTop: '-5%' }}>This person contains ownership of portfolio. If you want to delete this person press proceed to remove the ownership from portfolio   ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-3%' }}>
          <Button variant="success" style={{ width: '25%', marginBottom: '2%',backgroundColor: '#006400'  }}
            onClick={handleMove}
          >
            proceed
          </Button>
          <Button variant="danger" onClick={handleClose} style={{ width: '25%',  backgroundColor: '#b30000' }}>
            leave
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose} style={{ width: '31%', marginLeft: '35%', overflowY: 'hidden' }}>
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
              onClick={() => setShow(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          {alertUo
            ? (
              <Snackbar
                open={alertUo}
                onClose={() => setAlertUo(false)}
                sx={{
                  marginLeft: '44%',
                  marginBottom: '32%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={() => setAlertUo(false)}
                  severity="success"
                  sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                >
                  update organisation details successfully
                </Alert>
              </Snackbar>
              )
            : <></>
          }
          {alertAl
            ? (
              <Snackbar
                open={alertAl}
                onClose={() => setAlertAl(false)}
                sx={{
                  marginLeft: '44%',
                  marginBottom: '32%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={() => setAlertAl(false)}
                  severity="error"
                  sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                >
                  already exist
                </Alert>
              </Snackbar>
              )
            : <></>
          }
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            {!isWalletConnected
              ? (
                <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm} >
                  <h4>Organisation Details</h4>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': name
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Name"
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
                      'focus-add': tax
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      value={tax}
                      placeholder="Tax"
                      onChange={(e) => setTax(e.target.value)}
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Tax id is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': address
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      value={address}
                      placeholder="Address"
                      onChange={(e) => setaddress(e.target.value)}
                      style={{ color: 'white' }}
                    />
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': city
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      placeholder='City'
                      onChange={(e) => setcity(e.target.value)}
                      style={{ color: 'white' }}
                    />
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': country
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="city"
                      name="country"
                      value={country}
                      placeholder="Country"
                      onChange={(e) => setcountry(e.target.value)}
                      style={{ color: 'white' }}
                    />
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{ width: '50%', marginLeft: '25%', boxShadow: 'none' }}
                  >
                    Save
                  </Button>
                </Form>
                )
              : (
                <SuccessMessage message="Organisation Successfully Added" />
                )}
          </Modal.Body>
        </div>
      </Modal>
      <Modal show={show4} onHide={handleClose} style={{ width: '32%', marginLeft: '35%', overflowY: 'hidden' }}>
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
              onClick={() => setShow4(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          {alertOr
            ? (
              <Snackbar
                open={alertOr}
                onClose={() => setAlertOr(false)}
                sx={{
                  marginLeft: '44%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={() => setAlertOr(false)}
                  severity="success"
                  sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                >
                  add organisation successfully
                </Alert>
              </Snackbar>
              )
            : <></>
          }
          {alertAl
            ? (
              <Snackbar
                open={alertAl}
                onClose={() => setAlertAl(false)}
                sx={{
                  marginLeft: '44%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={() => setAlertAl(false)}
                  severity="error"
                  sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}>
                  Already exist
                </Alert>
              </Snackbar>
              )
            : <></>
          }
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            {!isWalletConnected
              ? (
                <Form
                  className="custom-form"
                  noValidate
                  validated={validated}
                  onSubmit={handleform1}
                >
                  <h4>Add Organisation</h4>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': name1
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={(e) => setname1(e.target.value)}
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
                      'focus-add': tax1
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="tax"
                      name="tax"
                      placeholder="Tax-Id"
                      onChange={(e) => setTax1(e.target.value)}
                      style={{ color: 'white', borderColor: 'dimgrey', backgroundImage: 'none' }}
                    />
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': address1
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Address"
                      onChange={(e) => setaddress1(e.target.value)}
                      style={{ color: 'white', borderColor: 'dimgrey', backgroundImage: 'none' }}
                    />
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': city1
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="city"
                      name="city"
                      placeholder="City"
                      onChange={(e) => setcity1(e.target.value)}
                      style={{ color: 'white', borderColor: 'dimgrey', backgroundImage: 'none' }}
                    />
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': country1
                    })}
                    style={{ width: '72%', marginLeft: '15%' }}
                  >
                    <Form.Control
                      type="text"
                      id="city"
                      name="country"
                      placeholder="Country"
                      onChange={(e) => setcountry1(e.target.value)}
                      style={{ color: 'white', borderColor: 'dimgrey', backgroundImage: 'none' }}
                    />
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{ width: '50%', marginLeft: '25%', boxShadow: 'none', color: 'white' }}
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
    </React.Fragment>
  )
}
export default Organisation
