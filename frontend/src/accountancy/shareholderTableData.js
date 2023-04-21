import React, { useState, useEffect } from 'react'
import cx from 'classnames';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Container, Row, Col,Modal,Form } from 'react-bootstrap';
import Header from '../common/Header/Header';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel'
import moment from 'moment'
import { setCheckboxRowDataValue, setResultShowData } from '../Redux/appSlice';
import FormControl from '@mui/material/FormControl'
import CommonTable from '../common/CommonTable/CommonTable';
import SearchBox from '../common/SearchBox/SearchBox';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin';
import Button from 'react-bootstrap/Button';
import { Alert, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar'
import Spinner from '../common/spinner'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
let accountData
let shareData=[]
function ShareholderTableData() {
  const dispatch=useDispatch();
  // const[dataSet,setDataSet]=useState([]);
  // const {resultShowData}=useSelector((store)=>store.app)
  const getId = localStorage.getItem('sub_Id')
  const [result4, setResult4] = useState([])
  const[deleteItem,setDeleteItem]=useState([])
  const [sea, setSea] = useState('')
  const [search, setSearch] = useState([]);
  const [w_name, setw_name] = useState('');
  const[showWalletsData,setShowWalletsData]=useState(false);
  const[showWalletsDataEdit,setShowWalletsDataEdit]=useState(false);
  const[validated,setValidated]=useState(false);
  const [shareId,setShareId]=useState('')
  const [spaceError,setSpaceError]=useState(false)
  const [showModalShare, setShowModalShare] =useState(false)
  const [showWallet, setShowWallet] = useState(false);
  const[openDeleteModal,setOpenDeleteModal]=useState(false);
  const[openDeleteModalShare,setOpenDeleteModalShare]=useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false)
  const [shareName,setShareName]=useState('')
  const [rowData,setRowData]=useState('')
  const [loading,setLoading]=useState(true)
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [deleteError, setDeleteError]=useState(false)
  const [shareHolderList, setShareholderList] = useState([])
  const[resultShareholdersData,setResultShareholdersData]=useState([]);
  const handleCloseWallet2 = () => {
    setAlertWallet(false)
  }
const EditShareholderModal=(row)=>{
  setRowData(row)
  setShareholderList([])
  setw_name(row.share_holder_name)
  setShowWalletsDataEdit(true)
}
  const handleCloseWalletsData = () => {
    setShowWallet(false)
  }
 
  const handleShowDelete=(row)=>{
    console.log(row);
    setDeleteItem(row)
    setOpenDeleteModal(true);
  }
  const handleClose = () =>{
    setOpenDeleteModal(false)
  }
  const handleDeleteUpdate=()=>{
    handleDeleteValue(deleteItem)
  }
  const handleDeleteValue=async (deleteItem)=>{
    console.log(deleteItem);
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/delete_share_holder`,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        holder_id: deleteItem?.holder_id
      }
    }
    console.log(config.params);
    await axios(config)
      .then(function (response) {
        console.log(response);
        shareholderListData();
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  const handleAddWalletData = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }else if(w_name.trim('')==''){
      // console.log('invalid')
      setSpaceError(true)
      setTimeout(()=>setSpaceError(false),3000)
    }
    else
    {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/share_holder`,
        data:
        {
          "share_holder_name":w_name
        }
      }
      console.log(config.data)
      axios(config).then(function (response) {
        
      if(response.data=='Share Holder Name Already Exist'){
        setAlreadyExist(true)
        setTimeout(()=>setAlreadyExist(false),3000)
      }else{
        console.log(response)
        console.log(response.data);
        shareholderListData()
        setAlertSuccess(true)
        setTimeout(()=>{
         setShowWalletsData(false)
         setAlertSuccess(false)
        },3000)
      }
       
      }).catch(function (error) {
        console.log(error)
      })
     
    }
   
  }
  const handleUpdateShareholder = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }else if(w_name.trim('')==''){
      // console.log('invalid')
      setSpaceError(true)
      setTimeout(()=>setSpaceError(false),3000)
    }
    else
    {
      let gameArray=[]
      let shareArray=[]
      // rowData.games.map((e,index)=>{
      //   gameArray.push({'game_id':e.game_id,'shareholders':w_name})
      // })
      shareArray.push(w_name)
     console.log(accountData)
     for(let a of accountData){
      for(let b of rowData.games){
        if(a.game_id==b.game_id){
          gameArray.push({'game_id':a.game_id,'shareholders': 
        [w_name, a.shareholders.split(',').filter(i=>i!=rowData.share_holder_name)].toString().split(',').filter(i=>i!='').toString()
      })
    }}
     }
     console.log(gameArray)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/share_holder_name`,
        data:
        {
          "share_holder_name":w_name,
          "holder_id":rowData.holder_id
        }
      }
       axios(config).then(function (response) {
        setShareholderList(response.data)
         if(response.data=='Share Holder Name Already Exist'){
        setAlreadyExist(true)
        setTimeout(()=>setAlreadyExist(false),3000)
      }else{
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/update_all_game`,
          data:
          {
            "share_holder":gameArray
            
          }
        }
        console.log(config.data);
         axios(config).then(function (response) {
        //   const config = {
        //     method: 'post',
        //     url: `${process.env.REACT_APP_BASE_URL}/update_share`,
        //     data:
        //     {
        //       "share_holder":gameArray
              
        //     }
        //   }
        //   console.log(config.data);
        //   axios(config).then(function (response) {
          console.log(response)
          console.log(response.data);
             handleData()
        shareholderListData()
        setAlertSuccess(true)
        setTimeout(()=>{
         setShowWalletsDataEdit(false)
         setAlertSuccess(false)
        },3000)
      // })
       })
      }
      })
    
      //   console.log(response)
      //   console.log(response.data);
          
       
      // }).catch(function (error) {
      //   console.log(error)
      // })
     
    }
   
  }

    console.log("Submitted");
  const [resultUser, setResultUser] = useState([]);
  const handleShowShareholders=()=>{
    setShowWalletsData(true)
    setValidated(false)
  }
  const [alreadyExist, setAlreadyExist] = useState(false)
  const handleCloseExit = () => {
    setAlreadyExist(false)
  }

  const shareholderListData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_share_holder`, {
      })
      .then(function (response) {
        console.log('shareholder',response.data,accountData,shareData)
        if(response.data.length==0){
          setAlertNoRecord(true)
          setLoading(false)
          setResultShareholdersData([])
        }else{
        for(let a of response.data){
          a.games=[]
         for(let b of accountData){
          for(let c of b.shares){
            if(c.shareholder==a.share_holder_name){
              a.games.push({'game_id':b.game_id,'game':b.game, 'owner':c.owner_ship,})
            }
          }
         }
        }
          response.data.sort((a,b)=>{
            const x= new Date(a.updated_time).getTime()/1000
            const y= new Date(b.updated_time).getTime()/1000
            return x>y ? -1 : x<y ? 1 : 0
          })
          setLoading(false)
          setResultShareholdersData(response.data)
         
        }
        
        
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleData=async ()=>{
   setLoading(true)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/get_accountancy`,
    }
    await axios(config).then(function (response) {
      console.log(response)
      const data1 = response.data.filter(item => item.status == 'A')
      const gameArray = [...data1] ;
        for(let i=0 ;i <gameArray.length;i++){
          gameArray[i].shares=[]
          let shareArray = [];
          let shareholderArray = [] 
          if(gameArray[i].shareholders!=null){
          shareholderArray = gameArray[i].shareholders.split(',') ;
          let ownerShipArray = []
          ownerShipArray = gameArray[i].shareholders_percentage?.split(',');

            for(let j=0;j<shareholderArray.length;j++){
              let shareObject = {
                shareholder : shareholderArray[j],
                owner_ship : ownerShipArray[j]
              }
              shareArray.push(shareObject);
            } 
            gameArray[i].shares = [...shareArray];
            shareArray = [];
            shareholderArray = [];
            ownerShipArray = [];
        }
      }
      accountData=gameArray
      //  setAccountantData(response.data)
      // dispatch(setResultShowData(response.data))
    }).catch(function (error) {
      console.log(error)
    })

  }
  useEffect(async () => {
    await handleData();
    await shareholderListData()
  }, [])
  //  console.log(accountantData,resultShareholdersData);
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
      dataField: 'share_holder_name',
      text: 'Shareholders',
      sort: true
    },
    {
      dataField:"Games",
      text:"Games",
      sort:true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
          <ul style={{marginLeft:'-2em'}}>
           {
            row.games?.map((item)=>(
              <li style={{color:'#FFC107'}}>
               <p style={{color:'white'}}>{item.game} - {item.owner+"%"}</p>
              </li>
            ))
    } 
         </ul>
        )
  }
},
      //     <>
      //     {console.log(resultShowData,row)}
      //       {
      //         resultShowData?.map((item)=>(
      //           (item?.shareholders==row?.share_holder_name)
      //           ?
      //           <span>{item?.game}
      //           {console.log(item?.game)}
      //           </span>
      //           :
      //           <></>
      //         ))
      //       }
      //     </>
      //   ) 
      //  } 
    
    // {
    //   dataField:"owner_ship",
    //   text:"Percentage",
    //   sort:true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <ul id="list_item">
    //       {console.log(resultShowData,row)}
    //         {
    //           resultShowData?.map((item)=>(
    //             (item?.shareholders==row?.share_holder_name)
    //             ?
    //             <li>{item?.owner_ship}
    //             {console.log(item?.game)}
    //             </li>
    //             :
    //             <></>
    //           ))
    //         }
    //       </ul>
    //     )
    //   }
    // },
    {
      dataField: 'updated_time',
      text: 'Created Time',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
            return (
              <>
               <span> {moment(row.updated_time).format('Do MMMM YYYY')}</span>
              </>
            )
          }
    },
    {
      dataField: 'delete',
      text: 'Action',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
            return (
              <div style={{whiteSpace:'nowrap'}}>
                <span
              style={{ cursor: 'pointer', color: '#F1C40F' }}
              onClick={() => EditShareholderModal(row)}
            >
              <EditOutlinedIcon />
            </span>
            <span
            style={{ cursor: 'pointer', color: '#B30000' }}
            onClick={() => {
              console.log(row)
              if(row?.games?.length===0){
                handleShowDelete(row)
              }else{
              setDeleteError(true)
              setTimeout(()=>setDeleteError(false),3000)
              }
             
            }}
          >
            {' '}
            <DeleteOutlineOutlinedIcon />
          </span>
              </div>
            )
          }
    },
    
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row >
          <Col lg={12}>
          <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Shareholders</h3>
              </span>
              <span className="p-2 pageheader">
                    <Link
                      to="#"
                      style={{
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'none',
                        color: '#FFC107',
                        top:'13px',
                        position:'relative'
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
                    i.share_holder_name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
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
            {sea
              ? (
                <CommonTable
                  data={search}
                  columns={columns4}
                />
                )
              : (
                <CommonTable
                laoding={loading}
                  data={resultShareholdersData}
                  columns={columns4}
                />
                )}
        <Modal
        show={showWalletsData}
        onHide={handleCloseWalletsData}
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
                  id="W_name"
                  name="walletName"
                  // placeholder="Name"
                  onChange={(e) => setw_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                  <span className='label_text'>Shareholder</span>
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
              {alertSuccess ? (
                <Snackbar
                  open={alertSuccess}
                  // autoHideDuration={4000}
                  onClose={()=>setAlertSuccess(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlertSuccess(false)}
                    severity="success"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Shareholder added successfully
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
                    Shareholder already exist
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
        show={showWalletsDataEdit}
        // onHide={handleCloseWalletsData}
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
              onClick={() => setShowWalletsDataEdit(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleUpdateShareholder}
            >
              <h4>
                Update Shareholder
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
                  id="W_name"
                  name="walletName"
                  value={w_name}
                  // placeholder="Name"
                  onChange={(e) => setw_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                  <span className='label_text'>Shareholder</span>
                <Form.Control.Feedback type="invalid">
                  ShareHolder Name Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                disabled={shareHolderList.length>0}
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
              {alertSuccess ? (
                <Snackbar
                  open={alertSuccess}
                  // autoHideDuration={4000}
                  onClose={()=>setAlertSuccess(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setAlertSuccess(false)}
                    severity="success"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    Shareholder updated successfully
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
                    Shareholder already exist
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
          show={openDeleteModal}
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
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <Modal.Title
              style={{
                color: 'white',
                fontSize: '16px',
                marginTop: '-5%',
                marginLeft: '10%'
              }}
            >
              Are you sure you want to Delete this Shareholder?
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
              style={{ width: '25%',backgroundColor: '#006400' }}
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
              style={{ width: '25%',   backgroundColor: '#B30000' }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
        {deleteError ? (
                <Snackbar
                  open={()=>setDeleteError(true)}
                  // autoHideDuration={4000}
                  onClose={()=>setDeleteError(false)}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={()=>setDeleteError(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                  Shareholder is added to accountancy, you can not delete this shareholder
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )}
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
export default ShareholderTableData
