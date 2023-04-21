import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Modal, Form } from 'react-bootstrap'
import '../../common/Modal.css'
import axios from 'axios'
import { Alert, alertTitleClasses } from '@mui/material'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import SearchBox from '../../common/SearchBox/SearchBox'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SidebarAdmin from './SidebarAdmin'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import Spinner from '../../common/spinner'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Paper from '@material-ui/core/Paper'

import { ro } from 'date-fns/locale'
import ModalToAddExchangeValue from '../../common/commonModals/ModalToAddExchangeValue'
import { Last } from 'react-bootstrap/esm/PageItem'
import RawTable from '../../common/RawTable'
import { setOpenModalAddExchangeStatus} from '../../Redux/appSlice'
import { useSelector,useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles'
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

let count=0
const ViewExchanges = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const styles = useStyles()
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const [firstValueSliceArray,setFirstValueSliceArray]=useState(0);
  const [lastValueSliceArray,setLastValueSliceArray]=useState(5);
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [selectedRowForAssets,setSelectedRowForAssets]=useState(null);
  const [arrayStateSlice,setArrayStateSlice]=useState(false);
  const location = useLocation()
  const [loading,setLoading]=useState(true)
  const from = location?.state?.from
  const portfolio_id = location.pathname.slice(20)
  const port_id = location.state?.data?.portfolio_id
  //  console.log(port_id)
  const [result, setResult] = useState([])
  const [result3, setResult3] = useState([])
  const [dataId, setDataId] = useState('')
  const [wallet, setWallet] = useState('')
  const [showMore, setShowMore] =useState(false)
  // const [updatedResults , setUpdatedResults] = useState([])
  const [showExchanges, setShowExchanges] = useState(false)
  const handleCloseExchanges = () => setShowExchanges(false)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
  const [wid, setWid] = useState('159%')
  const [mar, setmar] = useState('0%')
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [exch, setExch] = useState('')
  const [exApi, setExApi] = useState('')
 const [dataAddModal,setDataAddModal]=useState([])
  const [validated, setValidated] = useState(false)
  const {openModalAddExchangeStatus}=useSelector((store)=>store.app); 
  const [credentialsInfoInvest, setCredentialsInfoInvest] = useState({
    portfolio_id: port_id
  })
  const [isHoveringColor, setIsHoveringColor] = useState(false)
  const handleMouseEnterColor = () => {
    setIsHoveringColor(true)
  }
  const handleMouseLeaveColor = () => {
    setIsHoveringColor(false)
  }
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
    } else {
      setNewWidth('10')
      setm('2.5%')
      setWid('159%')
      setmar('0%')
      setW('100%')
      setMargin('22%')
      setWidthData('6%')
    }
  }
  const handleShow = (row) => {
    setDataId(row.exchange_name)
    setShow(true)
  }
  const handleShowExchanges = () => {
    const r = result3?.filter(i => i.portfolio_name == exch)
    credentialsInfoInvest.portfolio_id = r?.[0]?.portfolio_id
    setDataAddModal(r)
  
    // console.log("RRRR",r);
    // setShowExchanges(true)
    // console.log('aa')
    dispatch(setOpenModalAddExchangeStatus(true))
    setValidated(false)
  }
  
  const exchange = async (port_id) => {
    setLoading(true)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getExchangeData`,
      params:
      {
        portfolio_id: port_id
      }
    }
    await axios(config).then(function (response) {
      if(response.data.length==0){
        setAlertNoRecord(true)
        setLoading(false)
      }else{
        response.data.sort((a,b)=>{
          const x = parseInt(a.takerCommission)
          const y = parseInt(b.takerCommission)
          return x > y ? -1 : x < y ? 1 : 0
    })
    setLoading(false)
      setResult(response.data)
      }
    }).catch(function (error) {
      // console.log(error)
    })
  }
  const handleChange = async (k) => {
    const x = result3.filter(i => i.portfolio_name == k)
    setExch(k)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getExchangeData`,
      params:
      {
        portfolio_id: x?.[0]?.portfolio_id
      }
    }
    await axios(config).then(function (response) {
      if(response.data.length==0){
        setAlertNoRecord(true)
      }else{
         response.data.sort((a,b)=>{
              const x = parseInt(a.takerCommission)
              const y = parseInt(b.takerCommission)
              return x > y ? -1 : x < y ? 1 : 0
        })
      setResult(response.data)
      }
    }).catch(function (error) {
      // console.log(error)
    })
  }
  const assets = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    await axios(config).then(function (response) {
      // console.log(response)
      const rs = response.data
      const arr = []
      if (roleId.includes('accountant') === true && roleId.includes('admin') === false) {
        const a = acdata?.filter(i => i.accountant_id == getId)
        a?.forEach(el => {
          const m = rs?.filter(j => j.portfolio_id == el.portfolio_id)
          if(m.length>0){
          const me = { ...m }
          arr.push(Object.values(me)[0])
          }
        })
        setResult3(arr)
        setExch(arr?.[0]?.portfolio_name)
      } else {
      if (port_id) {
        const p = rs?.filter(i => i.portfolio_id == port_id)
        setExch(p?.[0]?.portfolio_name)
        const pi = p?.[0]?.portfolio_id
        setResult3(rs)
        exchange(pi)
      }else if(from!=undefined){
          const p = rs?.filter(i => i.portfolio_name == from)
        setExch(p?.[0]?.portfolio_name)
        setResult3(rs)
        const pi = p?.[0]?.portfolio_id
        exchange(pi)
      }
       else {
        setResult3(rs)
        setExch(rs?.[0]?.portfolio_name)
      const port = rs?.[0]?.portfolio_id
        exchange(port)
      }
    }
    }).catch(function (error) {
      // console.log(error)
    })
  }
  let acdata = []
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
      .then(function (response) {
        const p_data = response.data
        acdata = p_data
      })
  }
  useEffect(async () => {
    await accountant()
    assets()
  }, [])
  let t = 0
  // console.log(result)
  // const result1 = []
  let result1 = [...new Map(result.map(item =>
    [item.apikey, item])).values()]
    // console.log(array)
    let uniqueKeyObject ={};
    for(let i=0;i<result1.length;i++){
      let uniqueArray = result.filter(item=>item.apikey===result1[i].apikey)
      // console.log('unique',uniqueArray)
      uniqueKeyObject = {...uniqueKeyObject , [i] : [...uniqueArray] }
      // console.log("uniqueKeyObject",uniqueKeyObject);
    }
    let apiObject ={}

    for( let j=0;j<Object.keys(uniqueKeyObject).length ;j++){
      // console.log(j)
      let apiTempObject ={
          assetsName:uniqueKeyObject[j].map((ele) => ele.assetName ),
          free:uniqueKeyObject[j].map((ele) => ele.free ),
      }
      apiObject ={...apiObject , [j]:apiTempObject };
    }

    // console.log("apiObject",apiObject);

    result1 = result1.map((ele,index)=>{ return { ...ele ,asset:{assetName:apiObject[index]?.assetsName ,free:apiObject[index]?.free}  } }  )
    // console.log("final array",result1);

    // let tempUpdatedResult = result1.map((ele)=>{
    //     let asssetNameItems = ele.asset.assetName.slice(0,5);
    //     let freeItems = ele.asset.free.slice(0,5);
    //     return {...ele,asset:{...ele.asset,assetName:asssetNameItems,free:freeItems}}
    //   })
    // console.log("tempUpdatedResult.....",tempUpdatedResult);


    // let object = { assetName:[],free:[] }
    // console.log( " assets name ",uniqueKeyObject[0].map((ele) => ele.assetName ) )

  
     

  //   for(let a of array){
  // result1.push({ exchange_name: a.exchange_name, exchange_type: a.exchange_type, accountType: a.accountType, api_key: a.apikey, asset: [] })
  // console.log(array)
  //   }
  // const array1 = [...new Map(result.map(item =>
  //   [item.assetName, item])).values()]
  //   console.log(array1)
  // for (const a of result1) {
  //   for (let b of array){
  //     if(a.api_key===b.apikey){
  //   a.asset.push(array1)
  
  //     }
  //   }
  // }
  // for (const a of result1) {
  //   for(const b of a.asset){
  //     t = t + parseFloat(b.free)
  //   }
  //   a.free==t
  // }
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      // console.log(`clicked on row with index: ${rowIndex}`, row,e.target,e.target.id);
    },
    // onMouseEnter: (e, row, rowIndex) => {
    //   console.log(`enter on row with index: ${rowIndex}`);
    // }
  };
  const columns2 = [
    {
      dataField: 'exchange_name',
      text: 'Name',
    },
    {
      dataField: 'exchange_type',
      text: 'Type',
    },
    {
      dataField: 'assetName',
      text: 'Asset',
    },
    {
      dataField: 'accountType',
      text: 'Account',
    },
    {
      dataField: 'free',
      text: 'Balance',
    }
  ]
  const columns = [
    {
      dataField: 'exchange_name',
      text: 'Name',
      
    },
    {
      dataField: 'exchange_type',
      text: 'Type',
    },
    {
      dataField: 'asset',
      text: 'Asset',
    },
    {
      dataField: 'accountType',
      text: 'Account',
    },
    {
      dataField: 'free',
      text: 'Balance',
      
    },
    {
      dataField: '',
      text: 'Actions',
    }
  ]
  // console.log("ALl portfolio list>>>>>",result3,exch);
  // console.log("Exchange Content>>>>>>>>>>>>>>>>>>>>>>",result3.filter(item=>item.portfolio_name===exch));
  const [columnUpdatedInfo,setColumnUpdateInfo]=useState(columns);
  // console.log("ArrayStateSlice",arrayStateSlice)
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12} >
            <Row className="d-flex justify-content-center">
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Exchanges</h3>
              </span>
              {
                (roleId.includes('admin') === true)
                  ? <Link
                    to="#"
                    className="p-2 pageheader btn btn-gray"
                    style={{
                      color: '#FFC107',
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      top:'11px',
                      position:'relative'
                    }}
                    onClick={() => handleShowExchanges()}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Link>
                  : <></>
              }
              <span
                className="p-2 pageheader"
                onClick={() => navigate('/PMS/TransactionExchangeHistory', { state: { id: 1, dataP: exch } })} onMouseEnter={handleMouseEnterColor} onMouseLeave={handleMouseLeaveColor}
                style={{
                  background: 'transparent',
                  color: '#FFC107',
                  cursor:'pointer',
                  top:'11px',
                  position:'relative'
                }}
              >
                <Tooltip title="Exchange History"><ReceiptLongIcon /></Tooltip>
              </span>
              <Autocomplete
                className="p-2 pageheader"
                value={exch}
                options={result3?.map((e) =>
                  (e.portfolio_name)
                )}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }}>{children}</Paper>
                )}
                onChange={(e, k) => {
                  handleChange(k)
                }}
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'220px'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '200px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid #d9d9d9 !important',
                    left: '4px'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    marginTop:'-6px'
                  },
                  
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Portfolios"
                  />
                )}
              />
              <SearchBox
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = result1?.filter(i => i.exchange_name.toLowerCase().includes(event.target.value.toLowerCase()))
                   console.log(result1,x)
                  if(x.length==0){
                    setAlertNoRecord(false)
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
              ? <RawTable search={search} data={result3.filter(item=>item.portfolio_name===exch)} columns={(roleId.includes('admin') === true) ? columns : columns2} />
              : <RawTable loading={loading} rowEvents={rowEvents} data={result3.filter(item=>item.portfolio_name===exch)}  columns={(roleId.includes('admin') === true) ? columns : columns2} />
            }
            {/* <RawTable/> */}
          </Col>
         
        </Row >
        {
              openModalAddExchangeStatus
              ?
              <ModalToAddExchangeValue data={dataAddModal} exchangeData={result} />
              :
              <></>
             }
      </Container >
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
    </React.Fragment >
  )
}
export default ViewExchanges;
