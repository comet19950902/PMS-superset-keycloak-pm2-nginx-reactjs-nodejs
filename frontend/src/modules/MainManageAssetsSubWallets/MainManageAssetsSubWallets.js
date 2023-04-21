import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Breadcrumb, Button, Col, Form, Row, Image } from 'react-bootstrap'
import cx from 'classnames'
import { Alert, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import check from '../../assets/images/check.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import Sidebar from '../../store/Dashboard/Sidebar'
import DeleteIcon from '@mui/icons-material/Delete'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import SidebarIconsAdmin from '../../Admin/DashboardAdmin/SidebarIconsAdmin'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
//  import SearchBar from "material-ui-search-bar";
import Switch from '@mui/material/Switch'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
const MainManageAssetsSubWallets = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)
  const walletIdAddress = location.pathname.split('/:')[1]
  console.log(walletIdAddress)
  const portfolio_id = location.pathname.split('/:')[2]
  console.log(portfolio_id)
  const getId = localStorage.getItem('sub_Id')
  console.log(getId)

  const [result, setResult] = useState([])
  const [dataId, setDataId] = useState('')
  const [wallet, setWallet] = useState('')
  const [addressT, setAddressT] = useState('')
  const [addr_id, setAddr_id] = useState('')
  const [addr_name, setAddr_name] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [mar, setmar] = useState('0%')
  const [isWalletConnected, setIsWalletConnected] = useState(true)
  const [m, setm] = useState('2%')
  const [wid, setWid] = useState('159%')
  const [showWallet, setShowWallet] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)
  const [credentialsInfo, setCredentialsInfo] = useState({

    portfolio_id,
    wallet_id: walletIdAddress

  })
  const [validated, setValidated] = useState(false)
  const submit = () => {
    console.log('Submitted')
    setAlert(true)
    setTimeout(() => setAlert(false), 2000)
    // setTimeout(navigate(`/PMS/MainManageAssetsSubWallets/:${walletIdAddress}/:${portfolio_id}`),3000)
    assets()
    setTimeout(() => setShowWallet(false), 3000)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const config = {
        method: 'post',
        url: '${process.env.REACT_APP_BASE_URL}/debank_fetch/add_address',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          portfolio_id,
          wallet_id: walletIdAddress,
          address_id: addr_id,
          address_name: addr_name,
          address_type: addressT

        }
      }
      await axios(config).then(function (response) {
        console.log(response.data)

        if (response.data == 'Updated') {
          submit()
        } else if (response.data == 'Address Already Exist With Another Wallet') {
          setAlert2(true)
          setTimeout(() => setAlert2(false), 2000)
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
    setValidated(true)
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const handleAddWallet = () => {
    setShowWallet(true)
    console.log(showWallet)
    setValidated(false)
  }
  const handleCloseWallet = () => {
    setShowWallet(false)
  }
  // const [mar, setmar] = useState("-10%");
  // })
  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setWid('181%')
      setmar('-20%')
      setm('-9%')
      setMargin('8%')
      setWidthData('-4%')
      console.log(showDashboard)
      console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('2.5%')
      setWid('159%')
      setmar('0%')
      setW('100%')
      setMargin('22%')
      setWidthData('6%')
      console.log(showDashboard)
      console.log(newWidth)
    }
  }
  const handleShow = (id) => {
    console.log(id)
    setDataId(id)
    console.log(dataId)
    setShow(true)
  }
  const handleClose2 = () => {
    setAlert(false)
  }
  const handleClose3 = () => {
    setAlert2(false)
  }
  const handleDeleteUpdate = async () => {
    console.log(dataId)
    const config = {
      method: 'delete',
      url: '${process.env.REACT_APP_BASE_URL}/deleteAddressAllData',
      params: {
        address_id: dataId.address_id
      }
    }
    await axios(config).then(function (response) {
      console.log(response)
      assets()

      // setResult(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
  const assets = async () => {
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet',
      params: {
        wallet_id: walletIdAddress,
        portfolio_id
      }
    }
    await axios(config).then(function (response) {
      console.log(response)
      setResult(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
  useEffect(() => {
    assets()
  }, [])
  console.log(result)
  const data = result
  console.log(data)
  const columns = [
    {
      dataField: 'address_name',
      text: 'Name',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <p className="name-assets" style={{ fontSize: '12px' }}>
              {/* {console.log(row.wallet_name)} */}
              {row.address_name}
            </p>
          </>
        )
      }
    },
    {
      dataField: 'address_id',
      text: 'Address',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <Tooltip title={row.address_id}>
              <p className="name-assets" style={{ marginLeft: '-50%', whiteSpace: 'nowrap', fontSize: '12px' }}>
                {/* {console.log(row.wallet_name)} */}
                {row.address_id}
              </p>
            </Tooltip>
          </>
        )
      }
    },
    {
      dataField: 'address_type',
      text: 'Type',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <p className="name-assets" style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
              {/* {console.log(row.wallet_name)} */}
              {row.address_type}
            </p>
          </>
        )
      }
    },

    // {
    //   dataField: "",
    //   text: "View Transactions",
    //   formatter: (cell,row) => {

    //     return (
    //       <Link to={`/PMS/Transactions/:${portfolio_id}/:${row.walletId}`}  className="status">
    //         <Image src={check} alt="" />
    //       </Link>
    //     );
    //   },
    // },
    {
      dataField: '',
      text: 'Actions',
      formatter: (cell, row) => {
        // console.log(row)
        return (
          <>
            <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleShow(row)}>
              <Tooltip title={'Delete'}>
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </span>
            {/* <p>Manage Asset</p> */}
            {/* <div className="d-flex justify-content-around" style={{marginRight:"29%"}} >
            <p
          // className="name-assets"
          style={{ display: "flex", flexDirection: "row",cursor:'pointer', color:'red', marginRight:"11%" }}
          onClick={()=>
            handleShow(row)}
          >
          Delete Wallet Address
        </p>
            </div> */}

            {/* <div className="actionbtns" style={{marginTop:'-21px', marginLeft:'120px'}}  */}
            {/* onClick={()=> */}
            {
      //     handleShow(row.walletId)
      //  }}
      //  onClick={()=>{
      //     console.log(row?.walletId)
      //   var wal = row?.walletId
      //    delete_asset(wal)

      // }}
      // >

            /* <Link to='/PMS/MainManageAssets' style={{color:'red'}}>Remove Asset</Link> */}

            {/* </div> */}
          </>
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
  // import Switch from '@mui/material/Switch';

  return (
    <div>
      <div className="mainmyassets" style={{ overflow: 'hidden', height: '100vh' }}>
        <Row>
          {/* {showDashboard === true ? <SidebarAdmin /> : <SidebarIconsAdmin />} */}
          <Col lg={12}>
            <Header />
            <SidebarAdmin />
            {/* {showDashboard === true ? (<KeyboardDoubleArrowLeftIcon
            sx={{ fontSize: 30 }}
            onClick={handleToggle}
            style={{ color: "white", marginLeft:"-2%", marginTop: "1%" }}
          />) : (<KeyboardDoubleArrowRightIcon
            sx={{ fontSize: 30 }}
            onClick={handleToggle}
            style={{ color: "white", marginLeft:"-13.5%" ,marginTop: "-1.2%" }}
          />)} */}
            <div
              className="d-flex justify-content-between"
              style={{ marginRight: '2%' }}
            >
              <Col lg={12}>

                <div
                  id="abc"
                  style={{
                    // overflowY: "scroll",
                    marginLeft: '4%',
                    height: '100vh',
                    width: '100%'
                  }}
                >

                  <div className="d-flex justify-content-center" style={{ marginTop: '1%' }} >

                    <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}>Address
                      <span style={{ paddingTop: '3%' }}>
                        <Link
                          to="#"
                          style={{
                            // fontSize: "40px",
                            //  marginTop:'-0.5%',
                            marginLeft: '13px',
                            width: '11%',
                            boxShadow: 'none',
                            cursor: 'pointer',
                            background: 'none',
                            fontSize: '50px',
                            color: 'white'
                          }}
                          onClick={handleAddWallet}
                        >
                          <AddCircleOutlineOutlinedIcon style={{ marginTop: '5%' }} />
                        </Link>
                      </span>
                    </h3>

                    <span style={{ marginLeft: '65%' }} >
                      <Link to={'/PMS/MainManageAssetsWallets'} >
                        <ArrowCircleLeftOutlinedIcon style={{ color: 'white', fontSize: '25px', marginLeft: '50%', marginTop: '80%' }} />
                      </Link>
                    </span>
                  </div>
                  <div
                    style={{ marginRight: '8%' }}
                  >
                    <CommonTable data={data} columns={columns} />

                  </div>

                </div>
              </Col>

            </div>
            {/* <div className="maindashinfo">
            <Link
                  to={`/PMS/AddAddress/:${walletIdAddress}/:${portfolio_id}`}
                  className="btn btn-gray"
                  style={{
                    paddingLeft: "2%",
                    paddingRight: "2%",
                    fontSize: "17px",
                    width:"20%",
                    marginLeft:"70%",
                    marginTop:"2%"
                  }}
                >
                  + Add Address
                </Link>

                <div style={{marginTop:"5%",marginRight:"10%",marginBottom:"4%"}}>
                <Link to={`/PMS/MainManageAssetsWallets/:${portfolio_id}`}>
                  <ArrowCircleLeftOutlinedIcon style={{color:"white",fontSize:"40px"}}/>
                  </Link>
                  <CommonTable css="4%" data={data} columns={columns} />
                </div>
              </div> */}
          </Col>
        </Row>
        <Modal show={show} onHide={handleClose} style={{ width: '35%', marginTop: '20%', overflow: 'hidden', marginLeft: '39%', backgroundColor: '#222429', height: '22%', border: '1px solid grey', borderRadius: '15px' }}>
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <Modal.Title style={{ color: 'white', fontSize: '18px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this Asset ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-4%' }}>

            <Button variant="danger" style={{ width: '25%' }}
              onClick={() => {
                handleDeleteUpdate()
                handleClose()
              }
              }
            >
              Yes
            </Button>
            <Button variant="success" onClick={handleClose} style={{ width: '25%' }}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showWallet}
          onHide={handleCloseWallet}
          style={{ width: '45%', marginLeft: '35%' }}
        >
          <Modal.Header style={{ background: '#222429', border: 'none' }}>
            {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => setShowWallet(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm}>
              <h4 >Add Address</h4>
              <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': addr_name })}>
                <Form.Control
                  type="text"
                  id="name"
                  name="address_id"
                  onChange={(e) => setAddr_name(e.target.value)}
                  required
                  style={{ width: '50%', marginLeft: '25%' }}

                />
                <span style={{ background: 'none', color: 'white', marginLeft: '25%' }}> Name</span>
                <Form.Control.Feedback type="invalid" style={{ marginLeft: '25%' }}>
                  Address Name Required.
                </Form.Control.Feedback>
              </Form.Label>
              <FormControl style={{ marginLeft: '26%', marginTop: '-2%', marginBottom: '5%' }}>
                <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '17px', marginTop: '-4%', marginLeft: '-1%', overflow: 'visible', color: 'grey' }}> Type</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // className="btn btn-gray"
                  value={addressT}
                  label="Select"

                  // displayEmpty
                  // inputProps={{ 'aria-label': 'Without label' }}
                  style={{ width: '235px', borderRadius: '15px', boxShadow: 'none' }}
                  sx={{
                    width: 300,
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '7px'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important'
                    },
                    '.MuiSelect-icon': {
                      fill: 'grey !important'
                    },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'

                    }

                  }}
                  onChange={(e) => setAddressT(e.target.value)}
                >
                  {/* <MenuItem value="">
            <em>View</em>
          </MenuItem> */}
                  <MenuItem value={'btc'}>BTC</MenuItem>
                  <MenuItem value={'frc20'}>ERC20</MenuItem>
                </Select>
              </FormControl>
              <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': addr_id })}>
                <Form.Control
                  type="text"
                  id="name"
                  name="address_id"
                  onChange={(e) => setAddr_id(e.target.value)}
                  required
                  style={{ width: '50%', marginLeft: '25%' }}

                />
                <span style={{ background: 'none', color: 'white', marginLeft: '25%' }}>Address </span>
                <Form.Control.Feedback type="invalid" style={{ marginLeft: '25%' }}>
                  Address  Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button type="submit" variant="" className="btn-gray" style={{ width: '50%', marginLeft: '25%' }}>Save</Button>
            </Form>
          </Modal.Body>
          {alert ? (
            <Snackbar
              open={alert}
              // autoHideDuration={4000}
              onClose={handleClose2}
              sx={{ marginLeft: '50%', marginBottom: '38%', width: '25%' }}
            >
              <Alert
                onClose={handleClose2}
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
              onClose={handleClose3}
              sx={{ marginLeft: '42%', marginBottom: '38%', width: '25%' }}
            >
              <Alert
                onClose={handleClose3}
                severity="error"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Address Already Exist With Another Wallet
              </Alert>
            </Snackbar>
          )
            : <></>
          }
        </Modal>
      </div>
    </div>
  )
}

export default MainManageAssetsSubWallets
