import React, { useState, useEffect } from 'react'
import cx from 'classnames';
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Container, Row, Col,Modal,Form } from 'react-bootstrap';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Header from '../../common/Header/Header';
import { setResultShowData } from '../../Redux/appSlice';
import CommonTable from '../../common/CommonTable/CommonTable';
import SearchBox from '../../common/SearchBox/SearchBox';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Spinner from '../../common/spinner'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { Link} from 'react-router-dom'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar'
import { Alert, TextField, Tooltip } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
const useStyles = makeStyles({
    paper: {
      background: 'rgb(31, 33, 37) !important',
      color: 'white !important'
    },
    option: {
      '&:hover': {
        backgroundColor: 'grey !important',
        color: 'white !important'
      }
    }
  })
function ShareEntity() {
  const styles = useStyles()
  // const[dataSet,setDataSet]=useState([]);
  const getId = localStorage.getItem('sub_Id')
  const [alertEntity, setAlertEntity] = useState(false)
  const [showPopupDeleteEntity, setShowPopupDeleteEntity] = useState(false)
  const [showPopupEditEntity, setShowPopupEditEntity] = useState(false)
  const [result4, setResult4] = useState([])
  const [sea, setSea] = useState('')
  const [loading,setLoading]=useState(false)
  const [spaceError,setSpaceError]=useState(false)
  const [entityData, setEntityData] = useState()
  const [search, setSearch] = useState([]);
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [e_name, sete_name] = useState('');
  const[showWalletsData,setShowWalletsData]=useState(false);
  const[validated,setValidated]=useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [entityTypeError,setEntityTypeError]=useState(false)
  const [entityType, setEntityType] = useState('')
  const [alreadyExist, setAlreadyExist] = useState(false)
  const[resultShareholdersData,setResultShareholdersData]=useState([]);
  const handleClose = () => {
     setAlertEntity(false)
  }
  const handleDeletePopupEntity=(row)=>{
    setEntityData(row)
    setShowPopupDeleteEntity(true)
  }
  const handleEditPopupEntity=(row)=>{
    setEntityData(row)
    sete_name(row.name)
    setEntityType(row.type)
    
    console.log(row)
    setShowPopupEditEntity(true)
  }
  const handleEditEntity=(e)=>{
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if(e_name==''){
      setValidated(true)
      if(entityType==''){
        setEntityTypeError(true)
      }
    }else if(e_name.trim()==''){
     setSpaceError(true)
     setTimeout(()=>setSpaceError(false),3000)
    }
    else if(entityType==''){
      setEntityTypeError(true)
    }
    else
    {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_entity`,
        data:
        {
            "id": entityData.id,
          "name":e_name.toLowerCase(),
          "type":entityType
        }
      }
      console.log(config.data)
      axios(config).then(function (response) {
    if(response.data=='Entity Name Already Exist'){
      setAlreadyExist(true)
      setTimeout(()=>{
        setAlreadyExist(false)
        // setShowPopupEditEntity(false)
      },3000)
    }else{
        console.log(response)
        console.log(response.data);
        setAlertEntity(true)
          console.log("qwertyuiop");
          setTimeout(()=>{
            setAlertEntity(false)
            setShowPopupEditEntity(false)
          }, 3000)
        }
        shareholderListData()
      }).catch(function (error) {
        console.log(error)
      })
  }
}
  const handleDeleteEntity=async()=>{
    console.log(entityData)
    const config = {
        method: 'delete',
        url: `${process.env.REACT_APP_BASE_URL}/delete_entity`,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          id: entityData.id
        }
    }
      await axios(config)
        .then(function (response) {
            shareholderListData()
        })
        .catch(function (error) {
          console.log(error)
        })
  }
  const handleCloseWalletsData = () => {
    setShowWallet(false)
  }
  const handleAddEntity = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    // if (form.checkValidity() === false) {
    //   e.preventDefault()
    //   e.stopPropagation()
    // }
    if(e_name==''){
      setValidated(true)
      if(entityType==''){
        setEntityTypeError(true)
      }
    }
    else if(entityType==''){
      setEntityTypeError(true)
    }
   else if(e_name.trim('')==''){
      setSpaceError(true)
      setTimeout(()=>setSpaceError(false),3000)
    }
    else
    {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/accountancy_entity`,
        data:
        {
          "name":e_name.toLowerCase(),
          "type":entityType
        }
      }
      console.log(config.data)
      axios(config).then(function (response) {

        console.log(response)
        console.log(response.data);
        
        if(response.data=='Entity Name Already Exist'){
              setAlreadyExist(true)
              setTimeout(()=>{
                setAlreadyExist(false)
                // setShowWalletsData(false)
              },2000)
              
        }else{
          console.log("qwertyuiop");
          setAlertEntity(true)
          setTimeout(()=>{
            setAlertEntity(false)
            setShowWalletsData(false)
          }, 2000)
          
        }
        shareholderListData()
      }).catch(function (error) {
        console.log(error)
      })
     
    }
   
  }
  console.log("Submitted");
  const [resultUser, setResultUser] = useState([]);
  const handleShowShareholders=()=>{
    setShowWalletsData(true)
    setEntityType('')
    sete_name('')
    setEntityTypeError(false)
    setValidated(false)
  }

  const handleCloseExit = () => {
    setAlreadyExist(false)
  }
 
  const shareholderListData = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_entity`, {
      })
      .then(function (response) {
        console.log(response.data)
        if(response.data.length==0){
          setLoading(false)
          setResultShareholdersData([])
           setAlertNoRecord(true)
         }else{
          setLoading(false)
          setResultShareholdersData(response.data)
        
       
         }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(async () => {
      await shareholderListData();
    
    //await accountant()
    //await allportfolioUser()
  }, [])
  const handleChangeEntity=(event)=>{
    setEntityType(event.target.value)
    setEntityTypeError(false)
   console.log(event.target.value)
  }

  // {
  //   resultShowData?.map((item)=>(
  //     (item.shareholders=="Ankit Kalra")
  //     ?
  //     console.log(item.game)
  //     :
  //     <></>
  //   ))
  // }
  const columns4 = [
    {
      dataField: 'name',
      text: 'Entity',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
             <span>{row.name?.charAt(0)?.toUpperCase() + row.name?.slice(1)}</span>
          </>
        )
      }
    },
    {
      dataField:"type",
      text:"Type",
      sort:true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
             <span>{row.type}</span>
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
            <div style={{ whiteSpace: 'nowrap' }}>
              <span
                style={{ cursor: 'pointer', color: '#FFC107' }}
                onClick={() => handleEditPopupEntity(row)}
              >
                <EditOutlinedIcon />
              </span>
              <span
                style={{ cursor: 'pointer', color: '#b30000' }}
                onClick={() => handleDeletePopupEntity(row)}
              >
                {' '}
                <DeleteOutlineOutlinedIcon />
              </span>
            </div>
          )
        }
      }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row >
          <Col lg={12}>
          <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Entity</h3>
              </span>
              <span className="p-2 pageheader">
                    <Link
                      to="#"
                      style={{
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'none',
                        color: '#FFC107',
                        position:'relative',
                        top:'11px'
                      }}
                      onClick={handleShowShareholders}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Link>
                  </span>
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = resultShareholdersData?.filter((i) =>
                    i.name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                  if(x.length==0){
                    setSearch([])
                    setAlertNoRecord(true)
                  }
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
                  columns={columns4}
                />
                )
              : (
                <CommonTable
                loading={loading}
                  data={resultShareholdersData}
                  columns={columns4}
                />
                )}
        <Modal
        show={showPopupEditEntity}
        onHide={()=>setShowPopupEditEntity(false)}
        style={{ width: '28%', marginLeft: '35%' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
              onClick={()=>setShowPopupEditEntity(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleEditEntity}
            >
              <h4>
                Edit Entity
              </h4>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': e_name
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="e_name"
                  name="e_name"
                  value={e_name}
                  placeholder="Name"
                  onChange={(e) => sete_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                 <span className='label_text'>Entity</span>
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Entity Name Required.
                </Form.Control.Feedback>
              </Form.Label>
              <FormControl
                style={{
                  width: '72%',
                  marginLeft:'1.9%',
                  // marginBottom: '23px'
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '17px',
                    overflow: 'visible',
                    color: 'grey',
                    top:'1px',
                    left:'-8px',
                    background:'#1f2125'
                  }}
                >
                  {' '}
                  Type
                </InputLabel>

                <Select
                  MenuProps={{
                    classes: {
                      paper: styles.paper
                    },
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root:hover': {
                          backgroundColor: 'lightgrey',
                          color: 'black'
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                          backgroundColor: 'lightgrey',
                          color: 'black'
                        }
                      }
                    }
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                value={entityType}
                  label="Select"
                  style={{
                    // width:"239px",
                    height: '50px',
                    border:'1px solid hsl(0deg 0% 44% / 63%) ',
                    boxShadow: 'none'
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '0px',
                        height:'54px',
                        // border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important'
                    },
                    '.MuiSelect-icon': {
                      fill: 'grey !important'
                    },
                  ".MuiOutlinedInput-input": {
                    color: "white !important",
                     fontSize: "15px",
                    //  backgroundColor:'white',
                     paddingBottom:'13px',
                     paddingRight:'62% ',
                     paddingTop:'12px',
                },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={handleChangeEntity}
                >
                  <MenuItem value={'Main'}>Main</MenuItem>
                  <MenuItem value={'Control'}>Control</MenuItem>
                </Select>
              </FormControl>
              {entityTypeError==true  ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center'}}>Entity Type is required.</span> : <></>} 
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
              //  onClick={handleAddWalletData}
              >
                Save
              </Button>
              {alertEntity ? (
                <Snackbar
                  open={alertEntity}
                  // autoHideDuration={4000}
                  onClose={handleClose}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
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
                    Entity update successfully
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
              {spaceError ? (
                <Snackbar
                  open={spaceError}
                  // autoHideDuration={4000}
                  onClose={()=>setSpaceError(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setSpaceError(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Please enter valid input
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
              {alreadyExist ? (
                <Snackbar
                  open={alreadyExist}
                  // autoHideDuration={4000}
                  onClose={()=>setAlreadyExist(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlreadyExist(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                  Entity already exist
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        show={showWalletsData}
        onHide={()=>setShowWalletsData(false)}
        style={{ width: '28%', marginLeft: '35%' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
              onClick={() => setShowWalletsData(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleAddEntity}
            >
              <h4>
                Add Entity
              </h4>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': e_name
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="e_name"
                  name="e_name"
                  // placeholder="Name"
                  onChange={(e) => sete_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                 <span className='label_text'>Entity</span>
                <Form.Control.Feedback type="invalid">
                  Entity Name Required.
                </Form.Control.Feedback>
              </Form.Label>
              <FormControl
                style={{
                  width: '72%',
                  marginLeft:'1.9%',
                  // marginBottom: '23px'
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  labelId="demo-simple-select-label"
                  style={{
                    fontSize: '17px',
                    overflow: 'visible',
                    color: 'grey',
                    top:'1px',
                    left:'-8px',
                    background:'#1f2125'
                  }}
                >
                  {' '}
                  Type
                </InputLabel>

                <Select
                  MenuProps={{
                    classes: {
                      paper: styles.paper
                    },
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root:hover': {
                          backgroundColor: 'lightgrey',
                          color: 'black'
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                          backgroundColor: 'lightgrey',
                          color: 'black'
                        }
                      }
                    }
                  }}
                value={entityType}
                  label="Select"
                  style={{
                    // width:"239px",
                    height: '50px',
                    border:'1px solid hsl(0deg 0% 44% / 63%) ',
                    boxShadow: 'none'
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '0px',
                        height:'54px',
                        // border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important'
                    },
                    '.MuiSelect-icon': {
                      fill: 'grey !important'
                    },
                    ".MuiOutlinedInput-input": {
                      color: "white",
                       fontSize: "15px"
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={handleChangeEntity}
                >
                  <MenuItem value={'Main'}>Main</MenuItem>
                  <MenuItem value={'Control'}>Control</MenuItem>
                </Select>
              </FormControl>
              {entityTypeError==true  ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center'}}>Entity Type is required.</span> : <></>}
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
              //  onClick={handleAddWalletData}
              >
                Save
              </Button>
              {alertEntity ? (
                <Snackbar
                  open={alertEntity}
                  // autoHideDuration={4000}
                  onClose={handleClose}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
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
                    Entity added successfully
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
                  {alreadyExist ? (
                <Snackbar
                  open={alreadyExist}
                  // autoHideDuration={4000}
                  onClose={()=>setAlreadyExist(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlreadyExist(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Entity already exist
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
              {spaceError ? (
                <Snackbar
                  open={spaceError}
                  // autoHideDuration={4000}
                  onClose={()=>setSpaceError(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setSpaceError(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Please enter valid input
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}

            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
          show={showPopupDeleteEntity}
          onHide={()=>setShowPopupDeleteEntity(false)}
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
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <Modal.Title
              style={{
                color: 'white',
                fontSize: '16px',
                marginTop: '-5%',
                marginLeft: '15%'
              }}
            >
              Are you sure you want to Delete this Entity ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-4%'
            }}
          >
            <Button
              variant="success"
              style={{ width: '25%',backgroundColor: '#006400'  }}
              onClick={() => {
             handleDeleteEntity()
             setShowPopupDeleteEntity(false)
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={()=>setShowPopupDeleteEntity(false)}
              style={{ width: '25%',  backgroundColor: '#b30000' }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
          </Col>
        </Row>
        <Modal
        show={alertNoRecord}
        onHide={()=>setAlertNoRecord(false)}
        style={{
          width: '14rem',
          marginTop: '17rem',
          overflow: 'hidden',
          marginLeft: '45%',
          backgroundColor: '#222429',
          height: '8rem',
          border: '1px solid white',
          borderRadius: '15px'
        }}
      >
        <Modal.Header
          style={{ backgroundColor: '#222429', border: 'none' }}
        >
          <Modal.Title
            style={{
              color: 'white',
              fontSize: '18px',
              marginTop: '-13%',
              marginLeft: '15%',
              fontWeight:'bold'
            }}
          >
            No record found.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: '#222429',
            borderTop: 'none',
            paddingRight: '34%',
            paddingTop:'0%',
            // marginTop: '-10%',
            width:'19.5em',
            justifyContent:'center'
          }}
        >
          <button
          //  variant="success"
           className='no-record-found'
          
            onClick={() => {
              setAlertNoRecord(false)
            }}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>

      </Container>
    </React.Fragment >
  )
}
export default ShareEntity
