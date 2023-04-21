import React, { useState, useEffect } from 'react'
import cx from 'classnames';
import { Container, Row, Col,Modal,Form } from 'react-bootstrap';
import Header from '../common/Header/Header';
import axios from 'axios';
import moment from 'moment'
import { useDispatch,useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CommonTable from '../common/CommonTable/CommonTable';
import SearchBox from '../common/SearchBox/SearchBox';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar'
import { Alert, TextField } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { setResultShowData,setAddCheckboxValue } from '../Redux/appSlice';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CommonTableAccountant from '../common/CommonTable/CommonAccountantTable';
import Spinner from '../common/spinner'
let  multiDelete=[]
let deletedArray=[]
function DeletedAccountancyData() {
  const dispatch=useDispatch();
  const {addCheckboxValue,resultShowData}=useSelector((store)=>store.app);
  const getId = localStorage.getItem('sub_Id')
  const [result4, setResult4] = useState([])
  const [sea, setSea] = useState('')
  const [search, setSearch] = useState([]);
  const [deleteOne,setDeleteOne]=useState([])
  const arrayValue=[];
  const [loading,setLoading]=useState(false)
    const [selectData,setSelectData]=useState([])
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [openMultiDeleteModal,setOpenMultiDeleteModal]=useState(false);
  const [w_name, setw_name] = useState('');
  const [alertNotSelect,setAlertNotSelect]=useState(false)
  const[showWalletsData,setShowWalletsData]=useState(false);
  const[validated,setValidated]=useState(false);
  // const[checked,setChecked]=useState(false);
  const [alertDeleteError,setAlertDeleteError]=useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [multiDeleteModal,setMultiDeleteModal]=useState(false)
  const [DeleteOneModal,setDeleteOneModal]=useState(false)
  const [alertWallet, setAlertWallet] = useState(false)
  const [deleteResultData, setDeleteResultData] =useState([])
  const handleDeleteOneClose=()=>{
    setDeleteOneModal(false)
  }
  const handleMultiDeleteClose=()=>{
    setMultiDeleteModal(false)
  }
  const handleCloseWallet2 = () => {
    setAlertWallet(false)
  }
  const handleCloseWalletsData = () => {
    setShowWallet(false)
  }
  const handleAddWalletData = async (e) => {
    setValidated(true)
    e.preventDefault()
    await shareholderListData()
  }
  const [resultUser, setResultUser] = useState([]);
  const handleShowShareholders=()=>{
    setShowWalletsData(true)
    setValidated(false)
  }
  const [alreadyExist, setAlreadyExist] = useState(false)
  const handleCloseExit = () => {
    setAlreadyExist(false)
  }
 
  const handleData=async ()=>{
    setLoading(true)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/get_accountancy`,
    }
    await axios(config).then(function (response) {
      console.log(response)
      console.log(response.data);
      const data1=response.data.filter(item=>item.status=='I')
      console.log(data1);
      if (data1) {
        data1.sort((a, b) => {
          const x = new Date(a.date_updated).getTime() / 1000
          const y = new Date(b.date_updated).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const ONE_WEEK = 60 * 60 * 24 * 7;
      const temp2 = data1?.map(record => {
        let currentDate = new Date();
        let res = record.exchange_rate != null ? parseFloat(record.result) / parseFloat(record.exchange_rate) : "-"
        let rowDate = moment(record.date, 'YYYY-MM-DD', true).isValid() ? new Date(record.date).getTime() / 1000 : new Date(record.date.split("/")[2],record.date.split("/")[1]-1,record.date.split("/")[0]).getTime() / 1000
        let startDate = new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime() / 1000;
        // var days = Math.floor((rowDate - startDate) /
        //     (24 * 60 * 60 * 1000));   
        // var weekNumber = Math.ceil(days / 7);
        let diff = Math.ceil((rowDate - startDate))
        let weekNumber = Math.ceil(diff / ONE_WEEK)
        return { ...record, weeks: weekNumber, result_USD: parseFloat(res),result:parseFloat(record.result), game_id: parseInt(record.game_id),exchange_rate:parseFloat(record.exchange_rate) }
      })
      const gameResponseArray = [...temp2] ;

  

        for(let i=0 ;i <gameResponseArray.length;i++){
          let shareArray = [];
          let shareholderArray = [] 
          shareholderArray = gameResponseArray[i].shareholders.split(',');
          let ownerShipArray = []
          ownerShipArray = gameResponseArray[i].shareholders_percentage.split(',');

            for(let j=0;j<shareholderArray.length;j++){
              let shareObject = {
                shareholder : shareholderArray[j],
                owner_ship : ownerShipArray[j]
              }
              shareArray.push(shareObject);
            } 
            gameResponseArray[i].shares = [...shareArray];
            shareArray = [];
            shareholderArray = [];
            ownerShipArray = [];
        }

        if (gameResponseArray) {
          gameResponseArray.sort((a, b) => {
            const x = new Date(a.game_id).getTime() / 1000
            const y = new Date(b.game_id).getTime() / 1000
            return x < y ? -1 : x > y ? 1 : 0
          })
        }
        if(gameResponseArray.length==0){
          setAlertNoRecord([])
          setLoading(false)
          setDeleteResultData([])
        }else{
          setLoading(false)
          setDeleteResultData(gameResponseArray)
        }
        
      // dispatch(setResultShowData(gameResponseArray))
    }).catch(function (error) {
      console.log(error)
    })

  }
// console.log(deletedArray);
 
  useEffect(async()=>{
      //  setTimeout(async()=>{
        await handleData();
      //  },5000)
    
  },[])

  // console.log(addCheckboxValue);
  const columns4 = [
    // {
    //   dataField: 'share_holder_id',
    //   text: 'Select',
    //   sort: false,
    //   editor:{
    //     tpe:TypeError.Checkbox,
    //     value:'Y:N',
    //   },
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <span 
    //         style={{ cursor: 'pointer', color: 'rgb(255, 194, 7)' }}
    //       >
    //         <input style={{height:"0.7em",cursor:"pointer"}}  type= "checkbox"    onClick={(e)=>{
             
    //         console.log(row,e.target.checked);
    //         if(e.target.checked==true){
    //           selectData.push(row)
    //           // handleDelete1(row)
    //         }else{
    //          deletedArray.pop()
    //         }
           
       
            
    //       }}/>
    //       </span>
    //     )
    //   }
    // },
    {
      dataField: "game_id",
      text: "Id",
      sort: true,
    },
    {
      dataField: "game",
      text: "Game",
      sort: true,
    },
    {
      dataField: "game_details",
      text: "Details",
      sort: true,
    },
    {
      dataField: "venue",
      text: "Venue",
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => { 
       
        return (
          <span style={{whiteSpace:'nowrap'}}>{row.type}</span>
        )
      }
    },
    {
      dataField: "weeks",
      text: "Weeks",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const ONE_WEEK = 60 * 60 * 24*7;
        let currentDate = new Date();
        let rowDate = new Date(row.date).getTime() / 1000
        let startDate = new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime()/1000;
        // var days = Math.floor((rowDate - startDate) /
        //     (24 * 60 * 60 * 1000));   
        // var weekNumber = Math.ceil(days / 7);
        let diff = Math.ceil((rowDate - startDate))
        let weekNumber = Math.ceil(diff/ONE_WEEK)
        return (
          <span>
            {row.weeks}
          </span>
        )
    }
  },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
           <span style={{whiteSpace:'nowrap'}}>
            {moment(row.date).format('Do MMMM YYYY')}
          </span>
        )
    }
  },
    {
      dataField: "host",
      text: "Host",
      sort: true,
    },
    {
      dataField: "group_",
      text: "Group",
      sort: true,
    },
    {
      dataField: "player",
      text: "Player",
      sort: true,
     
    },
    {
      dataField: "result",
      text: "Result",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
           <span
          >
               {parseFloat(row.result)>0 ? <p style={{color:'#00ff00'}}>{'$'+parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p> : <p style={{ color:'#ff0000' }}>{'-'+'$'+parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '').replace('-','')}</p>}
          </span>
        )
      }
    },
    {
      dataField: "currency",
      text: "Currency",
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
           <span
          >
           {row.currency!=undefined ? <span style={{color:'white'}}>{row.currency}</span> :<span style={{color:'white'}} >-</span>}
          </span>
        )
      }
    },
    
    {
      dataField: "exchange_rate",
      text: "Exchange-Rate",
      sort: true,
      toggle: false,
      formatter: (cell, row, rowIndex, formatExtraData) => { 
        return (
          <span
          >
           {row.exchange_rate!=undefined ? <p style={{color:'white'}}>{parseFloat(row.exchange_rate).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p> : <p style={{ color:'white' }}>-</p>} 
          </span>
        )
      }
    },
    {
      dataField: "result_USD",
      text: "Result USD($)",
      sort: true,
      toggle: false,
      formatter: (cell, row, rowIndex, formatExtraData) => { 
       
        return (
          <span
          >
                {parseFloat(row.result_USD)>0 ? <p style={{color:'#00ff00'}}>{'$'+parseFloat(row.result_USD).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p> : <p style={{ color:'#ff0000' }}>{'-'+'$'+parseFloat(row.result_USD).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '').replace('-','')}</p>} 
          </span>
        )
      }
    },
    {
      dataField: "shares",
      text: "ShareHolder",
      sort: true,
      sort: true,
      toggle: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
          <ul style={{marginLeft:'-2em'}}>
            {
              row.shares?.map((e,i) => (
                <li  style={{color:'#FFC107',whiteSpace:'nowrap'}} key={e}>
                  <p style={{color:'white'}}>{e.shareholder}- {e.owner_ship}%</p> 
                </li>
              
              ))    
      } 
          </ul>
        )
      }
    },
    {
      dataField: "comment",
      text: "Comment",
      sort: true,
      toggle: false,
      formatter: (cell, row, rowIndex, formatExtraData) => { 
        return (
          <span
          >
        {row.comment!=undefined ? <p style={{color:'white'}}>{row.comment}</p> : <p style={{ color:'white' }}>-</p>} 
          </span>
        )
      }
    },
   
    
    {
      dataField: 'action',
      text: 'Actions',
      // sort: true,
      toggle: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <span
              style={{ cursor: 'pointer', color: '#b30000', marginLeft: '1em' }}
              onClick={() => {
                console.log(row)
                 handleDeleteOneOpen(row)
              }}
            >
              <Tooltip title={'delete'}>
                <DeleteOutlineIcon />
              </Tooltip>
            </span>
          </>
        )
      }
    },
    // {
    //   dataField: 'portfolio',
    //   text: 'Portfolios',
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //         {row.portfolio?.[0]?.map(i =>
    //           <li>{i.portfolio_name}</li>
    //         )}
    //       </>
    //     )
    //   }
    // }
  ]
  const handleDelete1=(row)=>{
     dispatch(setAddCheckboxValue(row))
  }
  const handleDeleteOneOpen=(row)=>{
    row=[{'game_id':row.game_id}]
    setDeleteOne(row)
    setDeleteOneModal(true)
  } 
  const handleMultiDeleteOpen=()=>{
  if(selectData.length==0){
    setAlertNotSelect(true)
      setTimeout(()=>{
        setAlertNotSelect(false)
      },3000)
  }else{
    selectData.map(e=>{
      multiDelete.push({'game_id':e.game_id})
      })
      // console.log(multiDelete)
      setMultiDeleteModal(true)
  }
   
  } 
  const handleShowMultiDelete=()=>{
    // console.log("1234234", addCheckboxValue);
    if(selectData.length==0){
      setAlertDeleteError(true)
      setTimeout(()=>{
        setAlertDeleteError(false)
      },3000)
    }else{
      setOpenMultiDeleteModal(true)
    }
    
  } 
  const handleCloseMultiDelete = () =>{ 
    setOpenMultiDeleteModal(false)
  }
  const handleMultiDeleteUpdate=()=>{
    handleMultiDeleteValue(selectData)
  }
  
  // console.log(addCheckboxValue);
  const handleMultiDeleteOne=async ()=>{
    console.log(deleteOne)
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/delete_all_accountancy`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "delete_game":deleteOne,
      }
    }
    await axios(config)
      .then(function (response) {
        console.log(response);
        handleData()
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  const handleMultiDelete=async ()=>{
    console.log(deleteOne)
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/delete_all_accountancy`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "delete_game":multiDelete,
      }
    }
    await axios(config)
      .then(function (response) {
        console.log(response);
        handleData()
      })
      .catch(function (error) {
        console.log(error)
      })

  }
  const handleMultiDeleteValue=async (selectData)=>{
    // console.log(addCheckboxValue);
   
    var newData=[];
    selectData.filter(item=>newData.push({"game_id":item.game_id,"status":"A"}))
    console.log(newData);
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/updatestatus`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "status_detail":newData,
      }
    }
    await axios(config)
      .then(function (response) {
        console.log(response);
        setSelectData([])
      //  dispatch(setAddCheckboxValue([]))
        handleData()
         location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

 
  return (
    <React.Fragment>
      <Container fluid>
        <Row >
          <Col lg={12}>
          <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Trash</h3>
              </span>
              <span className="p-2 pageheader">
                   <Tooltip title="Retreive Data">
                    <p
                        style={{
                          right: '13em',
                          top:'4.5em',
                          position:'fixed',
                          boxShadow: 'none',
                          cursor: 'pointer',
                          background: 'none',
                          color: '#FFC107'
                        }}
                        onClick={()=>{
                          handleShowMultiDelete(arrayValue)
                        }}
                      >
                        <AutorenewIcon/>
                      </p>
                   </Tooltip>
                   <span
              style={{ cursor: 'pointer', color: '#b30000', top:'4.5em',right: '11em', position:'fixed' }}
              onClick={() => {
                // console.log(row)
                  handleMultiDeleteOpen()
              }}
            >
              <Tooltip title={'delete'}>
                <DeleteOutlineIcon />
              </Tooltip>
            </span>
                  </span>
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = deleteResultData?.filter((i) =>
                  String(i.game_id).includes(event.target.value) 
                  || String(i.result_USD).includes(event.target.value) 
                  ||  String(i.result).includes(event.target.value) 
                  ||    i.game.toLowerCase().includes(event.target.value.toLowerCase())
                       || i.game_details.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.venue.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.type.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.host.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.group_.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.player.toLowerCase().includes(event.target.value.toLowerCase())
                      || i.currency.toLowerCase().includes(event.target.value.toLowerCase())
                       || i.comment!=null && i.comment.toLowerCase().includes(event.target.value.toLowerCase())
                        ||  i.shares?.[0]?.shareholder==event.target.value.toLowerCase()
                       || i.shares?.[1]?.shareholder==event.target.value.toLowerCase()
                        || String(i.exchange_rate).includes(event.target.value)
                       || moment(i.date).format('Do MMMM YYYY')==event.target.value
                       || String(i.weeks).includes(event.target.value)
                 );
                  if(x.length==0){
                    setAlertNoRecord(true)
                    setSearch([])
                  }else{
                  setSearch(x)
                  }
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
           {
            sea
              ? (
                
                <CommonTableAccountant
                  data={search}
                  columns={columns4}
                  selectData={selectData} setSelectData={setSelectData}
                />
                )
              : (
                
                <CommonTableAccountant
                loading={loading}
                  data={deleteResultData}
                  columns={columns4}
                  selectData={selectData} setSelectData={setSelectData}
                />
                )
              
              }
        <Modal
        show={showWalletsData}
        onHide={handleCloseWalletsData}
        style={{ width: '28%', marginLeft: '35%', border: '1px solid white', }}
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
              onSubmit={handleAddWalletData}
            >
              <h4>
                Add Shareholder
              </h4>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': w_name
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="walletName"
                  placeholder="Name"
                  onChange={(e) => setw_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                <Form.Control.Feedback type="invalid">
                  ShareHolder Name Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  marginTop: '-3%',
                  boxShadow: 'none'
                }}
              //  onClick={handleAddWalletData}
              >
                Save
              </Button>
              {alertWallet ? (
                <Snackbar
                  open={alertWallet}
                  // autoHideDuration={4000}
                  onClose={handleCloseWallet2}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={handleCloseWallet2}
                    severity="success"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Added sharholder successfully
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
                  onClose={handleCloseExit}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={handleCloseExit}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    shareholder Already Exist
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
          show={openMultiDeleteModal}
          onHide={handleCloseMultiDelete}
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
                marginLeft: '7%'
              }}
            >
              Are you sure you want to retreive the selected accounts ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-4%',
            }}
          >
            <Button
              variant="success"
              style={{ width: '25%', backgroundColor: '#006400' }}
              onClick={() => {
                handleMultiDeleteUpdate()
                handleCloseMultiDelete()
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={handleCloseMultiDelete}
              style={{ width: '25%',backgroundColor: '#b30000'  }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={multiDeleteModal}
          onHide={ handleMultiDeleteClose}
          style={{
            width: '31em',
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
                whiteSpace:'nowrap',
                marginLeft: '7%'
              
              }}
            >
              This will erase the data forever, do you want to continue?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer
            style={{
              backgroundColor: '#222429',
              borderTop: 'none',
              paddingRight: '34%',
              marginTop: '-4%',
             
            }}
          >
            <Button
              variant="success"
              style={{ width: '25%',backgroundColor: '#006400'  }}
              onClick={() => {
                 handleMultiDelete()
                 handleMultiDeleteClose()
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={ handleMultiDeleteClose}
              style={{ width: '25%', backgroundColor: '#b30000' }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={DeleteOneModal}
          onHide={ handleDeleteOneClose}
          style={{
            width: '31em',
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
                whiteSpace:'nowrap',
                marginLeft: '7%'
              
              }}
            >
              This will erase the data forever, do you want to continue?
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
                 handleMultiDeleteOne()
                 handleDeleteOneClose()
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={ handleDeleteOneClose}
              style={{ width: '25%',  backgroundColor: '#b30000' }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {alertDeleteError ? (
                <Snackbar
                  open={()=>setAlertDeleteError(true)}
                  // autoHideDuration={4000}
                  onClose={()=>setAlertDeleteError(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlertDeleteError(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Please select the data to retreive from trash
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
                  {alertNotSelect ? (
                <Snackbar
                  open={()=>setAlertNotSelect(true)}
                  // autoHideDuration={4000}
                  onClose={()=>setAlertNotSelect(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlertNotSelect(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Please select the data to delete permanently
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
          </Col>
        </Row>
        {/* <Modal
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
      </Modal> */}
      </Container>
    </React.Fragment >
  )
}
export default DeletedAccountancyData;