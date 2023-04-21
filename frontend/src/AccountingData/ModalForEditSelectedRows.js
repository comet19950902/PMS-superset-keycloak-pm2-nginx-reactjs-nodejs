import React,{useState,useEffect, useRef, forwardRef} from 'react';
import {Modal,Form,Button} from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import FormControl from '@mui/material/FormControl'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import moment from 'moment'

import Paper from '@material-ui/core/Paper'
import Autocomplete from '@mui/material/Autocomplete'
import { Alert, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip';
import { styled, lighten, darken } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@material-ui/core/styles'
import {setOpenModalToEditSelectedRow,setAddCheckboxValue,setResultShowData, setEditAccountancyRowData, setChekcedStatusValue, setCheckedValue} from "../Redux/appSlice";
import { ka } from 'date-fns/locale';
// import { setCommentRange } from 'typescript';
const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
   color: 'white',
   fontWeight:'bold'
  // backgroundColor: 'darkgrey'
    // theme.palette.mode === 'light'
      // ? lighten(theme.palette.primary.light, 0.85)
      // : darken(theme.palette.primary.main, 0.8),
}));
const GroupItems = styled('li')({
  padding: 0,
  paddingLeft:'2rem'
});
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
let shareArray=[]
let ownerArray=[]
let shareHoldArray=[]
const ModalForEditSelectedRows= forwardRef((props,ref) => {

  console.log("props",props, ref)
  const styles = useStyles()
    const dispatch=useDispatch();
    const [errorCurrency,setErrorCurrency]=useState(false)
    const [errorType,setErrorType]=useState(false)
   const [validated, setValidated]=useState(false)
    const {openModalToEditSelectedRow,addCheckboxValue,editAccountancyRowData}=useSelector((store)=>store.app);
    const [shareholderEdit,setShareholderEdit]=useState("");
    const [ownershipEdit,setOwnershipEdit]=useState("");
    const [countValue,setCountValue]=useState(0);
    const [selectArray, setSelectArray]=useState([])
    const [inputValues, setInputValues] = useState([]);
    const [alertGameUpdateSuccess, setAlertGameUpdateSuccess] = useState(false)
    const [temp, setTemp] = useState('')
    const [change, setChange] = useState('')
    const [temp1, setTemp1] = useState('')
    const [alertOwnershipLessError,setAlertOwnershipLessError]=useState(false)
    const [alertOwnershipError, setAlertOwnershipError] = useState(false)
    const [gameDetails,setGameDetails]=useState('');
    const [venue,setVenue]=useState('');
    const[type,setType]=useState('');
    const [resultEdit, setResultEdit] = useState('')
    const[host,setHost]=useState('');
    const[creditor,setCreditor]=useState('');
    const[player,setPlayer]=useState('');
    const [ownershipError, setOwnershipError] = useState(false)
    const [temp0, setTemp0] = useState('')
    const [accountingData, setAccountancyData] = useState([])
    const [shareError, setShareError] = useState(false)
    const [date,setDate]=useState(new Date(Date.now()).toISOString().split('T')[0]);
    const[resultShareholdersData,setResultShareholdersData]=useState([]);
    const [currencyValue,setCurrencyValue]=useState()
    const [exchangeRate, setExchangeRate]=useState('')
    const [comment, setComment]=useState('')
    // console.log("qwertyasdfg1234",addCheckboxValue);
    const currencyList = [
      { title: 'BTC', type:'Crypto:' },{ title: 'ETH',type:'Crypto:'},{ title: 'USDT',type:'Crypto:' },{ title: 'USDC',type:'Crypto:' },
      { title: 'USD', type:'FIAT:' },{ title: 'EUR',type:'FIAT:'},{ title: 'GBP',type:'FIAT:' },{ title: 'HKD',type:'FIAT:' },
      { title: 'AED', type:'FIAT:' },{ title: 'CNY',type:'FIAT:'},{ title: 'VND',type:'FIAT:' },{ title: 'MYR',type:'FIAT:' },
      { title: 'PHP', type:'FIAT:' },{ title: 'THB',type:'FIAT:'},{ title: 'AUD',type:'FIAT:' },{ title: 'CAD',type:'FIAT:' },
      { title: 'CAD', type:'FIAT:' },{ title: 'BNY',type:'FIAT:'},{ title: 'MMK',type:'FIAT:' },{ title: 'DKK',type:'FIAT:' },
      { title: 'HRK', type:'FIAT:' },{ title: 'HUF',type:'FIAT:'},{ title: 'INR',type:'FIAT:' },{ title: 'ISK',type:'FIAT:' },
      { title: 'JPY', type:'FIAT:' },{ title: 'CHF',type:'FIAT:'},{ title: 'MXN',type:'FIAT:' },{ title: 'NOK',type:'FIAT:' },
      { title: 'NZD', type:'FIAT:' },{ title: 'PLN',type:'FIAT:'},{ title: 'CZK',type:'FIAT:' },{ title: 'RON',type:'FIAT:' },
      { title: 'RUB', type:'FIAT:' },{ title: 'LKR',type:'FIAT:'},{ title: 'TWD',type:'FIAT:' },{ title: 'TRY',type:'FIAT:' },
    ]
    const options = currencyList.map((option) => {
      const currencyType = option.type;
      return {
        firstLetter: /[0-9]/.test(currencyType) ? 'FIAT:' : currencyType,
        ...option,
      };
    });
   const handleSelect=(e)=>{
    setChange(e.target.value)
    selectArray.push(e.target.value)
   }
 
   console.log(selectArray)
    const shareholderListData = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/get_share_holder`, {
        })
        .then(function (response) {
          console.log(response.data)
          setResultShareholdersData(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    const handleData=async ()=>{
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/get_accountancy`,
      }
      await axios(config).then(function (response) {
        console.log(response)
        setSelectArray([])
        setChange('')
      
        // setAccountancyData(response.data)
        const data1 = response.data.filter(item => item.status == 'A')
        const ONE_WEEK = 60 * 60 * 24 * 7;
    const temp2 = data1?.map(record => {
      let currentDate = new Date();
      let res = parseFloat(record.result) / parseFloat(record.exchange_rate) 
      let rowDate = moment(record.date, 'YYYY-MM-DD', true).isValid() ? new Date(record.date).getTime() / 1000 : new Date(record.date.split("/")[2],record.date.split("/")[1]-1,record.date.split("/")[0]).getTime() / 1000
      let startDate = new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime() / 1000;
      // var days = Math.floor((rowDate - startDate) /
      //     (24 * 60 * 60 * 1000));   
      // var weekNumber = Math.ceil(days / 7);
      let diff = Math.ceil((rowDate - startDate))
      let weekNumber = Math.ceil(diff / ONE_WEEK)
      return { ...record, weeks: weekNumber, result_USD: parseFloat(parseFloat(res).toFixed(2)) ,result:parseFloat(record.result), game_id: parseInt(record.game_id),exchange_rate:parseFloat(record.exchange_rate) }
    })
      const gameArray = [...temp2] ;
        for(let i=0 ;i <gameArray.length;i++){
          gameArray[i].shares=[]
          gameArray[i].id=i+1
          let shareArray = [];
          let shareholderArray = [] 
          shareholderArray = gameArray[i].shareholders.split(',');
          let ownerShipArray = []
          ownerShipArray = gameArray[i].shareholders_percentage.split(',');

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
          if (gameArray) {
            gameArray.sort((a, b) => {
            const x = new Date(a.date_updated).getTime() / 1000
            const y = new Date(b.date_updated).getTime() / 1000
            return x > y ? -1 : x < y ? 1 : 0
          })
        }
       dispatch(setResultShowData(gameArray))
      }).catch(function (error) {
        console.log(error)
      })
  
    }
    console.log(accountingData)
    let selectData=[]
    // for(let a of addCheckboxValue){
    //   for(let b of a?.shares){
    //     var m = accountingData.filter(i=>i.share_holder_id==b.share_id)
    //     selectData.push(m[0])
    //   } 

    // }
    const handleSubmitForm=async(e)=>{
      e.preventDefault()
      setValidated(true)
      // console.log('input',ref.current)
      // ref.current.checked=false;
      //  dispatch(setCheckedValue(ref.current.checked))
      //  dispatch(setOpenModalToEditSelectedRow(false))
     
      // console.log(gameDetails, resultEdit)
      // console.log(temp0)
      // console.log(shareholderEdit,ownershipEdit,selectData, shareArray);
     
      const form = e.currentTarget
      // if (form.checkValidity() === false) {
      //   e.preventDefault()
      //    e.stopPropagation()
      // } 
    //    if(shareholderEdit=='' || ownershipEdit==''){
    //   // console.log(shareError)
    //   setShareError(true)
    //   shareHoldArray=[]
    //   ownerArray=[]
    //   shareArray=[]
    // }
    if( gameDetails=='' || host=='' || creditor=='' || venue=='' || player=='' ||resultEdit=='' || exchangeRate==''){
      setValidated(true)
    if(type==''){
        setErrorType(true)
      }
       if(currencyValue==null){
        setErrorCurrency(true)
      }
        if(shareholderEdit=='' || ownershipEdit==''){
      console.log(shareError)
      setShareError(true)
      shareHoldArray=[]
      ownerArray=[]
     }
    }
    else if(type==''){
      setErrorType(true)
    }
    else if(currencyValue==null){
      setErrorCurrency(true)
    }
    else  if(shareholderEdit=='' || ownershipEdit==''){
    console.log(shareError)
    setShareError(true)
    shareHoldArray=[]
    ownerArray=[]
   }
     else{
      temp1=='' ? shareHoldArray : shareHoldArray.push(temp1.toLowerCase())
      temp=='' ? ownerArray : ownerArray.push(temp)
         addCheckboxValue.map(e=>{             
           shareArray.push({'game_id':e.game_id,'game_details':gameDetails,"venue":venue,"type":type,"host":host.toLowerCase(),"currency":currencyValue,"group_":creditor.toLowerCase(),"date":date,"player":player,"result":resultEdit,"exchange_rate":exchangeRate,"comment":comment,'shareholders':shareHoldArray.toString(),'shareholders_percentage':ownerArray.toString()})
             })
           
             console.log(ownerArray)
             let t=0
             for(const a of ownerArray){
               t= parseFloat(a) + t
             } 
             if(parseFloat(t)>100){
              console.log('error')
              setAlertOwnershipError(true)
              shareHoldArray.pop()
              ownerArray.pop()
              setTimeout(()=>{
                setAlertOwnershipError(false)
                // dispatch(setOpenModalToEditSelectedRow(false))
              },3000)
            }
            else if(parseFloat(t)<100){
              console.log('error')
              setAlertOwnershipLessError(true)
              shareHoldArray.pop()
              ownerArray.pop()
              setTimeout(()=>{
                setAlertOwnershipLessError(false)
                // dispatch(setOpenModalToEditSelectedRow(false))
              },3000)
            }else{
        const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_game`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "share_holder":shareArray,
        }
      }
      console.log(config.data);
      await axios(config)
        .then(function (response) {
          console.log(response);
          // dispatch(removeCheckboxValue)
          setAlertGameUpdateSuccess(true)
          dispatch(setAddCheckboxValue({type:"REMOVE_ITEM",value:[]}))
          setTimeout(()=>{
            setAlertGameUpdateSuccess(false)
            dispatch(setOpenModalToEditSelectedRow(false))
          },2000)
          
          handleData()
          shareHoldArray=[]
          ownerArray=[]
          shareArray=[]
          location.reload()
          // console.log(props)
         
        })
        .catch(function (error) {
          console.log(error)
        })
      }
  }
    //  location.reload();
    }
    console.log(selectData)
    const handleshare=(e,item,index)=>{
      setOwnershipError(true)
     const abc = {};
     setTemp1(e.target.value)
    //  for(let a of addCheckboxValue){
    //   console.log(a)
    //   for(let b of a.shares){
    //     if(b.shareholder==e.target.value){
    //       setTemp0(b.share_id)
    //     }
    //   }
    // }
     abc[e.target.className] = e.target.value;
       setInputValues({ ...inputValues, ...abc});
   }
   const handleowner=(e,item,index)=>{
     const abc = {};
      // setOwnership(e.target.value)
     console.log(e.target.value)
     abc[e.target.className] = e.target.value;
       setInputValues({ ...inputValues, ...abc});
 //  setShareholder({ ...shareholder, ...abc })
   }
    console.log(addCheckboxValue);
    useEffect(async()=>{
      await handleData();
      await shareholderListData()
     
    },[])
  return (
    <>
     <Modal
        show={openModalToEditSelectedRow}
        style={{ width: '28%', marginLeft: '35%' }} >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
              onClick={() => {
                dispatch(setOpenModalToEditSelectedRow(false))
              }}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <h4 style={{color:'white'}}>Multiple Update</h4>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmitForm}
            >
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': gameDetails
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                <Form.Control
                  type="text"
                  id="game_detail"
                  name="name"
                  value={gameDetails}
                  // placeholder="Game Details"
                  onChange={(e)=>setGameDetails(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
              <span className='label_text'>Game Details</span>
            <Form.Control.Feedback type="invalid">
                        Game-Details is Required.
                      </Form.Control.Feedback>
              </Form.Label> 
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': venue
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                <Form.Control
                  type="text"
                  id="venue"
                  name="name"
                  value={venue}
                  // placeholder="Venue"
                  
                  onChange={(e)=>setVenue(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
               <span className='label_text'>Venue</span>
            <Form.Control.Feedback type="invalid">
                        Venue is Required.
                      </Form.Control.Feedback>
              </Form.Label> 
              <FormControl
                style={{
                  width: '72%',
                  marginLeft:'1.9%',
                  marginTop: '3%'
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
                 value={type}
                  label="Select"
                  style={{
                    // width:"239px",
                    height: '50px',
                    border:'1px solid hsl(0deg 0% 44% / 63%) ',
                    boxShadow: 'none'
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '4px',
                        height:'54px',
                        // border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset',
                        // padding:'0 50%'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important',
                       marginTop: '2px !important',
                    marginLeft: '-1px !important',
                    background:'rgb(31, 33, 37)'
                    },
                    '.MuiSelect-icon': {
                      fill: 'grey !important'
                    },
                  ".MuiOutlinedInput-input": {
                    color: "white !important",
                     fontSize: "15px",
                    //  backgroundColor:'white',
                     paddingBottom:'13px',
                     paddingRight:'62%',
                     paddingTop:'12px !important',
                },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={(e)=>{
                    setType(e.target.value)
                    setErrorType(false)
                  }}
                >
                <MenuItem value={'CG'}>CG</MenuItem>
                  <MenuItem value={'Tournament'}>Tournament</MenuItem>
                  <MenuItem value={'Expense'}>Expense</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
                <span style={{marginTop:"3%",position:'absolute',left:'102%',backgroundColor:"transparent"}}>
              
            </span>
              </FormControl> 
              {errorType==true ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center'}}>Type is required.</span> : <></>} 
               <Form.Label
               htmlFor="exchange"
               className={cx('custom-form-box', {
                 'focus-add': date
               })}
               style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
             ><span style={{color:'white',fontSize:'10px',marginTop:'5px',background:'rgb(31, 33, 37)'}}>Date</span>
               <Form.Control
                 type="date"
                 id="date"
                 name="name"
                 value={date}
                 // placeholder="Host"
                 onChange={(e) => setDate(e.target.value)}
                 required
                 style={{ color: 'white' }}
               />
             <span className='label_text'>Date</span>
            <Form.Control.Feedback type="invalid">
                        Date is Required.
                      </Form.Control.Feedback>
             </Form.Label>
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': host
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                <Form.Control
                  type="text"
                  id="host"
                  name="name"
                  value={host}
                  // placeholder="Host"
                  onChange={(e)=>setHost(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
              <span className='label_text'>Host</span>
            <Form.Control.Feedback type="invalid">
                        Host is Required.
                      </Form.Control.Feedback>
              </Form.Label> 
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': creditor
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                <Form.Control
                  type="text"
                  id="creditor"
                  name="creditor"
                  value={creditor}
                  // placeholder="Group"
                  onChange={(e)=>setCreditor(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                 <Form.Control.Feedback
                  type="invalid"
                
                >
                  Group is Required.
                </Form.Control.Feedback>
                <span className='label_text'>Group</span>
              </Form.Label> 
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': player
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              ><span style={{color:'white',fontSize:'10px',marginTop:'5px',background:'rgb(31, 33, 37)'}}>Player</span>
                <Form.Control
                  type="text"
                  id="player"
                  name="name"
                  value={player}
                  // placeholder="Player"
                  onChange={(e)=>setPlayer(e.target.value)}
                  
                  required
                  style={{ color: 'white' }}
                />
                 <span className='label_text'>Player</span>
            <Form.Control.Feedback type="invalid">
                        Player is Required.
                      </Form.Control.Feedback>
              </Form.Label> 
                    <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': resultEdit
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                     <Form.Control
                  type="number"
                  id="result"
                  name="name"
                  value={resultEdit}
                  // placeholder="Result"
                  onChange={(e)=>{
                    const res1 = e.target.value
                    if (!res1 || res1.match(/^-\d{1,}(\.\d{0,2})?$/) || res1.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setResultEdit(res1)
                    }
                  }}
                  required
                  style={{ color: 'white' }}
                />
                 <span className='label_text'>Result</span>
            <Form.Control.Feedback type="invalid">
                        Result is Required.
                      </Form.Control.Feedback>
              </Form.Label>  
             <Autocomplete
                  id="grouped-demo"
                  // value={currencyValue}
                  options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option.title}
                  classes={{
                    option: styles.option
                  }}
                  PaperComponent={({ children }) => (
                    <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }} >
                      {children}
                    </Paper>
                  )}
                  onChange={(e,k)=>{
                    
                    if(k==null){
                      setErrorCurrency(false)
                      setCurrencyValue(null)
                    }else{
                    setErrorCurrency(false)
                    setCurrencyValue(k.title)
                    }
                  }}
                  style={{
                    fill: 'white',
                    boxShadow: 'none',
                    fontSize: '14px',
                    borderRadius: '30%',
                    marginLeft:'15%',
                    marginBottom:'1em'
                  }}
                  sx={{
                    // width: '200px',
                    // height: '32px',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                    '.MuiOutlinedInput-root': {
                      borderRadius: '4px',
                      width: '84%',
                      height: '47px',
                      // backgroundColor: '#fff',
                      fontSize: '14px',
                      border:'1px solid grey !important',
                      marginBottom:'1em',
                      paddingTop:'12px !important'
                    },
                    '.MuiInputBase-input': {
                      height: '1rem'
                    },
                    '.MuiInputLabel-root':{
                      top:'1px',
                      left:'-8px',
                      background:'#1f2125'
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Currency" />}
                  renderGroup={(params) => (
                <li>
                  <GroupHeader>{params.group}</GroupHeader>
                  <GroupItems>{params.children}</GroupItems>
                </li>
                  )}
                />  
               {errorCurrency==true  ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex',justifyContent:'center',marginTop:'-22px',marginBottom:'20px'}}>Currency is required.</span> : <></>} 
           
                    <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': exchangeRate
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                     <Form.Control
                  type="text"
                  id="exchange_rate"
                  name="name"
                  value={exchangeRate}
                  // placeholder="Exchange-rate"
                  onChange={(e)=>{
                    const exchPer1 = e.target.value
                    if (!exchPer1 || exchPer1.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setExchangeRate(exchPer1)
                    }
                  }}
                  required
                  style={{ color: 'white' }}
                />
                <span className='label_text'>Exchange Rate</span>
            <Form.Control.Feedback
                  type="invalid"
                >
                  Exchange-Rate is Required.
                </Form.Control.Feedback>
              </Form.Label>     
                    
              {  
               countValue==0 ? (
              <>
              <FormControl
                style={{
                  width: '46%',
                  marginLeft:'-23%',
                  marginBottom: '23px'
                  // width: '46%',
                  // marginLeft:'-23%',
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
                  shareholder
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
                 value={shareholderEdit}
                  label="Select"
                  style={{
                    // width:"239px",
                    height: '50px',
                    // borderRadius: '15px',
                    boxShadow: 'none',
                    border:'1px solid hsl(0deg 0% 44% / 63%) '
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '4px',
                        height:'54px',
                        // border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset',
                        padding:'0 73px'
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
                       paddingRight:'62%',
                       paddingTop:'12px',
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                
                  onChange={(event)=>{
                    setShareholderEdit(event.target.value)
                     setTemp1(event.target.value)
                  // shareArray.push({'share_holder_id':uuidv4(),'shareholders':event.target.value,'ownership':ownershipEdit})
                  }}
                >
                  {resultShareholdersData.map((item,index)=>(
                  <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                  ))}
                </Select>
                
              </FormControl>
              
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': ownershipEdit
                })}
                style={{ marginTop:"-75px",marginLeft:"63%",width:'24%'}}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={ownershipEdit}
                  placeholder="%"
                  onChange={(e)=>{
                    const ownPer1 = e.target.value
                    if (!ownPer1 || ownPer1.match(/^\d{1,}(\.\d{0,1})?$/)) {
                      setOwnershipEdit(ownPer1)
                      setTemp(ownPer1)
                      setShareError(false)
                    }
                  }}
                  
                  required
                  style={{ color: 'white' }}
                />
                
                <span style={{marginTop:"12%",position:'absolute',left:'96.5%',backgroundColor:"transparent"}}>
                    <Tooltip title="Add More Shareholders">
                    <div                    
                      style={{
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'transparent',
                        color: '#FFC107'
                      }}
                      onClick={()=>{
                        setCountValue(countValue+1)
                        
                         shareHoldArray.push(temp1.toLowerCase())
                          ownerArray.push(temp)
                          
                      //   console.log(addCheckboxValue)
                      //   addCheckboxValue.forEach((el,i)=>{
                      //  console.log(el,i)
                      //   })
                          
                      }}
                    >
                       <AddCircleOutlineOutlinedIcon /> 
                      {/* <RemoveIcon /> */}
                    </div>
                    </Tooltip>
                    
                  </span>
              </Form.Label>
              
              {shareError==true ? <span style={{color:'#dc3545',fontSize:'.875em',marginTop:'-16px',display:'flex',justifyContent:'center'}}>shareholder & ownership required</span> : <></>}
              </>)
              
             :
             (<>
             <FormControl
                style={{
                  width: '46%',
                  marginLeft:'-23%',
                  marginBottom: '23px'
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
                  shareholder
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
                 value={shareholderEdit}
                  label="Select"
                  style={{
                    height: '50px',
                    // borderRadius: '15px',
                    boxShadow: 'none',
                    border:'1px solid hsl(0deg 0% 44% / 63%) ',
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '4px',
                        height:'54px',
                        // border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset',
                        padding:'0px 73px'
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
                       paddingRight:'62%',
                       paddingTop:'12px',
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={(event)=>{
                    setTemp1(event.target.value)
                    setShareholderEdit(event.target.value)
                  }}
                >
                  {resultShareholdersData.map((item,index)=>(
                  <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

             <Form.Label
               htmlFor="exchange"
               className={cx('custom-form-box', {
                 'focus-add': ownershipEdit
               })}
               style={{ marginTop:"-75px",marginLeft:"63%",width:'24%'}}
             >
               <Form.Control
                 type="text"
                 id="name"
                 name="name"
                 value={ownershipEdit}
                 placeholder="%"
                 onChange={(e) => {
                  const ownPer3 = e.target.value
                  if (!ownPer3 || ownPer3.match(/^\d{1,}(\.\d{0,1})?$/)) {
                    setTemp(ownPer3)
                    setOwnershipEdit(ownPer3)
                    setShareError(false)
                  }
                }}
                 required
                 style={{ color: 'white' }}
               />
               <span style={{marginTop:"2em",position:'absolute',left:'100%',backgroundColor:"transparent"}}>
                   <Tooltip title="Add More Shareholders">
                   <div                    
                     style={{
                       boxShadow: 'none',
                       cursor: 'pointer',
                       background: 'transparent',
                       color: '#FFC107'
                     }}
                     onClick={()=>{
                      // shareArray.push({'share_holder_id':temp0, 'shareholders':temp1,'owner_ship':temp})
                       setCountValue(countValue+1)
                       shareHoldArray.push(temp1.toLowerCase())
                       ownerArray.push(temp)
                       
                     }}
                   >
                      <AddCircleOutlineOutlinedIcon /> 
                     {/* <RemoveIcon /> */}
                   </div>
                   </Tooltip>
                 </span>
             </Form.Label>
             {/* {shareError==true ? <span style={{color:'red'}}>shareholder & ownership required</span> : <></>} */}
             {Array.from(Array(countValue)).map((c, index) => (
                index>=0 ? 
                <>
                 <FormControl
                style={{
                  width: '46%',
                  marginLeft:'-23%',
                  marginBottom: '23px'
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
                  shareholder
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
                  className={index}
                 value={c}
                  label="Select"
                  style={{
                         // width:"239px",
                         height: '50px',
                         // borderRadius: '15px',
                         boxShadow: 'none',
                         border:'1px solid hsl(0deg 0% 44% / 63%)',
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '4px',
                        height:'54px',
                        border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset',
                        padding:'0px 73px'
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
                       paddingRight:'62%',
                       paddingTop:'12px',
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={handleshare}
                >
                  {resultShareholdersData.map((item,index)=>(
                  <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': ownershipEdit
                })}
                style={{ marginTop:"-75px",marginLeft:"63%",width:'24%'}}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={c}
                  placeholder="%"
                  onChange={(e)=>{
                    const ownPer2 = e.target.value
                    if (!ownPer2 || ownPer2.match(/^\d{1,}(\.\d{0,1})?$/)) {
                      setTemp(ownPer2)
                      setShareError(false)
                    }
                  }}
                  required
                  style={{ color: 'white' }}
                />
                 <span style={{marginTop:"12%",position:'absolute',left:'96.5%',backgroundColor:"transparent"}}>
                    <Tooltip title="Remove Shareholders">
                    <div                    
                      style={{
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'transparent',
                        color: '#FFC107'
                      }}
                      onClick={()=>{
                        setCountValue(countValue-1)
                        shareHoldArray.slice(-1)
                        ownerArray.slice(-1)
                        setTemp('')
                        setTemp1('')
                      }}
                    >
                       
                       <RemoveCircleOutlineSharpIcon />
                    </div>
                    </Tooltip>
                  </span>
              </Form.Label>
              
              {/* {ownershipError==false ? <span style={{color:'red'}}>shareholder & ownership required</span> : <></>} */}
                </>
                :
                <></>
  ))} </>)}
                    <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': comment
                })}
                style={{ width: '72%', marginLeft: '15%',marginTop:'10%' }}
              >
                     <Form.Control
                  type="text"
                  id="comment"
                  name="name"
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                  <span className='label_text'>Comment</span>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  boxShadow: 'none',
                  color: 'white'
                }}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
          {alertGameUpdateSuccess
            ? (
              <Snackbar
                open={alertGameUpdateSuccess}
                onClose={()=>setAlertGameUpdateSuccess(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setAlertGameUpdateSuccess(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Update successfully
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
          {alertOwnershipError
            ? (
              <Snackbar
                open={alertOwnershipError}
                onClose={()=>setAlertOwnershipError(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setAlertOwnershipError(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  shareholder % not be greater than 100%.
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
              {alertOwnershipLessError
            ? (
              <Snackbar
                open={alertOwnershipLessError}
                onClose={()=>setAlertOwnershipLessError(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setAlertOwnershipLessError(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  shareholder % not be less than 100%.
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
        </div>
      </Modal>
    </>
  )
}
)
export default ModalForEditSelectedRows