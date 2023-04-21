import React,{useState,useEffect} from 'react';
import {useSelector,useDispatch} from "react-redux";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Dropdown from 'react-bootstrap/Dropdown';
import Paper from '@material-ui/core/Paper'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Alert, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import moment from 'moment'
import Snackbar from '@mui/material/Snackbar'
import InputLabel from '@mui/material/InputLabel'
import Tooltip from '@mui/material/Tooltip';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { v4 as uuidv4 } from 'uuid';
import Autocomplete from '@mui/material/Autocomplete'
import DropdownButton from 'react-bootstrap/DropdownButton';
import cx from 'classnames';
import {Modal,Form,Button} from "react-bootstrap";
import {setOpenModalToAddData,setResultShowData} from "../Redux/appSlice";
import axios from 'axios';
import "./AccountingData.css";
import { styled, lighten, darken } from '@mui/system';
import { makeStyles } from '@material-ui/core/styles'
let arr1=[]

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
let shareholdArray=[]
let Sharearr=[]
function ModalForAddRowData(props) {
  const styles = useStyles()
  const dispatch=useDispatch();
  const {openModalToAddData,resultShowData}=useSelector((store)=>store.app);
const [temp1, setTemp1] = useState('')
  const [date,setDate]=useState(new Date(Date.now()).toISOString().split('T')[0]);
  const [game,setGame]=useState();
  const [selectedShareholder, setSelectedShareholder]=useState([])
  const [totalAccountingData, setTotalAccountingData]=useState([])
  const [validated,setValidated]=useState(false)
  const [countValue,setCountValue]=useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [counter, setCounter] = useState(0);
  const [temp, setTemp] = useState('')
  const  [shareHolderErr, setShareholderErr]=useState(false)
  const [alertOwnershipError, setAlertOwnershipError] = useState(false)
  const[ownership,setOwnership]=useState('');
  const [gameDetails,setGameDetails]=useState('');
  const [venue,setVenue]=useState('');
  const [type,setType]=useState('');
  const [host,setHost]=useState('');
  const [errorCurrency,setErrorCurrency]=useState(false)
  const [errorType,setErrorType]=useState(false)
  const [currencyValue,setCurrencyValue]=useState('')
  const[creditor,setCreditor]=useState('');
  const[player,setPlayer]=useState('');
  const[week,setWeek]=useState('');
  const [alertOwnershipLessError, setAlertOwnershipLessError] = useState(false)
  const[resultShareholdersData,setResultShareholdersData]=useState([]);
  const [shareholder,setShareholder]=useState('');
  const [shareError, setShareError] = useState(false)
  const [alertGameSuccess, setAlertGameSuccess] = useState(false)
  const [alertGameExist, setAlertGameExist] = useState(false)
  const [ownershipError, setOwnershipError] = useState(false)
  const [spaceError, setSpaceError] = useState(false)
  const[result,setResult]=useState('');
  const[exchangeRate,setExchangeRate]=useState('');
  const[comment,setComment]=useState('');
  const [key,setKey] = useState(1)
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
  // const arr = new Array(countValue).fill(null);
  // console.log(arr)
  // console.log(uuidv4());
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
       setTotalAccountingData(response.data)
      const data1 = response.data.filter(item => item.status == 'A')
      if (data1) {
        data1.sort((a, b) => {
          const x = new Date(a.date_updated).getTime() / 1000
          const y = new Date(b.date_updated).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const d1 = Math.floor(new Date().getTime()/1000)
      const ONE_WEEK = 60 * 60 * 24 * 7;
      const ONE_DAY = 60 * 60 * 24;
      const ONE_HOUR = 60 * 60;
      
      // console.log(new Date(response.data[0].date_updated).getTime()/1000)
      
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
        return { ...record, weeks: weekNumber, result_USD: parseFloat(parseFloat(res).toFixed(2)) ,result:parseFloat(record.result), game_id: parseInt(record.game_id),exchange_rate:parseFloat(record.exchange_rate) }
      })
      // if (temp2) {
      //   var d = []
      //   for (let i = 0; i < temp2.length; i++) {
      //     if (d[temp2[i].game_id]) {
      //       // d[temp2[i].game_id].owner_ship.push(temp2[i]['owner_ship'])
      //       d[temp2[i].game_id].shareholders.push({'shareholder':temp2[i]['shareholders'],'owner':temp2[i]['owner_ship']})
      //     } else {
      //       d[temp2[i].game_id] = temp2[i]
      //       // console.log(d)
      //       let x = d[temp2[i]['game_id']]['owner_ship']
      //       d[temp2[i]['game_id']]['owner_ship'] = []
      //       // d[temp2[i].game_id]['owner_ship'].push(x)
      //       let y = d[temp2[i].game_id]['shareholders']
      //       d[temp2[i].game_id]['shareholders'] = []
      //       d[temp2[i].game_id]['shareholders'].push({'shareholder':y, 'owner':x})
            
      //     }
      //   }
      // }
      //  console.log(d)
      // // console.log(Object.values(d))
      //  dispatch(setResultShowData(Object.values(d)))
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
        console.log('game',gameArray)
       dispatch(setResultShowData(gameArray))
    }).catch(function (error) {
      console.log(error)
    })

  }
//  console.log(resultShareholdersData.filter(i=>selectedShareholder.includes(i.share_holder_name)),selectedShareholder)
  const handleSubmitFormModalAddData=(e)=>{
    e.preventDefault()
    setValidated(true)
    // setOwnershipError(false)
    
    // console.log(uuidv4(),game,gameDetails,venue,host,creditor,type,player,shareholder,ownership,temp,temp1,result,shareArray,inputValues);
    // console.log(resultShowData)
   
     const m = resultShowData.filter(i=>i.game==game)
    // e.preventDefault()
    // const form = e.currentTarget
    // if (form.checkValidity() === false) {
    //   // e.preventDefault()
    //   console.log('---f')
    //   e.stopPropagation()
    // }
    // else if(m.length>0){
    //   console.log('----m',m)
    //   setAlertGameExist(true)
    //   // shareholdArray=[]
    //     ownerArray=[]
    //   shareArray=[]
    //   setTimeout(()=>{
    //     setAlertGameExist(false)
    //   },3000)
    // }
    // else if( ownershipError==false){
    //   console.log(ownershipError)
    //   setOwnershipError(true)
    // }
    let finalShareholder = [...selectedShareholder, {shareholder:temp1,owner:temp}]
    console.log(finalShareholder)
    if(game=='' || gameDetails=='' || host=='' || creditor=='' || venue=='' || player=='' ||result=='' || exchangeRate==''){
      setValidated(true)
       if(currencyValue==null || currencyValue==''){
        setErrorCurrency(true)
      }
        if( selectedShareholder.length==0 && shareholder=='' ||  selectedShareholder.length==0 && ownership==''){
      console.log(shareError)
      setShareError(true)
      shareholdArray=[]
      ownerArray=[]
     }
    }
    else if(type==''){
      setErrorType(true)
    }
    else if(currencyValue==null || currencyValue==''){
      setErrorCurrency(true)
    }
    else  if( selectedShareholder.length==0 && shareholder=='' || selectedShareholder.length==0 && ownership==''){
    console.log(shareError)
    setShareError(true)
    shareholdArray=[]
    ownerArray=[]
   }
    else if(game.trim()=='' || gameDetails.trim()=='' || venue.trim()=='' || host.trim()=='' || creditor.trim()=='' || player.trim()==''  ){
    setSpaceError(true)
    setTimeout(()=>{
      setSpaceError(false)
      // dispatch(setOpenModalToAddData(false))
    },3000)
    }
    else{
      let t=0
      // temp1=='' ? shareholdArray : shareholdArray.push(temp1.toLowerCase())
      // temp=='' ? ownerArray : ownerArray.push(temp)
      // console.log(shareholdArray,ownerArray)
    
      for(const a of finalShareholder){
        if(a.shareholder==''){
         console.log('name enter')
         setShareholderErr(true)
         setTimeout(()=>setShareholderErr(false),3000)
         return
        }else{
        t= parseFloat(a.owner) + t
        }
      }
      if(isNaN(t)){
        console.log('error')
        setAlertOwnershipLessError(true)
        //  shareHoldArray=[]
        //  ownerArray=[]
        //  tempOwnerArray=[]
        //  tempShareArray=[]
        setTimeout(()=>{
          setAlertOwnershipLessError(false)
          // dispatch(setOpenModalToEditSelectedRow(false))
        },3000)
      }
    else if(finalShareholder.length>0 && parseFloat(t)>100){
        console.log('error',parseFloat(t))
        setAlertOwnershipError(true)
        
        setTimeout(()=>{
          setAlertOwnershipError(false)
          // dispatch(setOpenModalToAddData(false))
        },3000)
      }  else if(finalShareholder.length>0 && parseFloat(t)<100){
        console.log('error',parseFloat(t))
        setAlertOwnershipLessError(true)
        // shareArray=[]
      
        setTimeout(()=>{
          setAlertOwnershipLessError(false)
          // dispatch(setOpenModalToAddData(false))
        },3000)
      }else{ 
      console.log('yes')
    shareArray.push({'share_holder_id':uuidv4(),'shareholders':finalShareholder.length==0 ? temp1.toString() : finalShareholder.map(e=>e.shareholder).toString(),'shareholders_percentage':finalShareholder.length==0 ? temp.toString() : finalShareholder.map(e=>e.owner).toString()})
    totalAccountingData.sort((a, b) => {
      const x = parseInt(a.game_id)
      const y = parseInt(b.game_id)
      return x < y ? -1 : x > y ? 1 : 0
    })
    for(let i=1;i<100000;i++){
        let  m = totalAccountingData.filter(f=>f.game_id==i)
        if(m.length==0){
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/pms_accountancy`,
        data:
        {
          "game":game,
          "game_id": totalAccountingData.length==0 ? 1 : parseInt((totalAccountingData.slice(-1)[0].game_id))+1,
          "date":date,
          "currency":currencyValue,
          "game_details":gameDetails,
         "venue":venue,
          "type":type,
          "host":host.toLowerCase(),
          "week": '1',
          "player":player,
          "group_":creditor.toLowerCase(),
          "share_holder":shareArray,
          "result":result,
          "exchange_rate":exchangeRate,
          "comment":comment
        }
      }
      console.log(config.data)
      axios(config).then(function (response) {

        console.log(response)
        console.log(response.data);
          console.log("qwertyuiop");
          handleData();
          setAlertGameSuccess(true)
          shareArray=[]
          finalShareholder=[]
          shareholdArray=[]
          setSelectedShareholder([])
        ownerArray=[]
          setTimeout(()=>{
            setAlertGameSuccess(false)
            dispatch(setOpenModalToAddData(false))
          },2000)
      }).catch(function (error) {
        console.log(error)
      })

          break
        }
      }
         }
        }
    // console.log("Submitted");
  }
 
  const handleshare=(e,item,index)=>{
     setOwnershipError(true)
    const abc = {};
    
   
   
    
    // shareArray.push({'share_holder_id':uuidv4(),'shareholders':e.target.value, 'ownership':temp})
  
    console.log(e.target.value, ownership,shareholder)
    abc[e.target.className] = e.target.value;
       setTemp1(e.target.value)
       setInputValues({ ...inputValues, ...abc});
    
      
//  setShareholder({ ...shareholder, ...abc })
}
  const handleowner=(e,item,index)=>{
    const abc = {};
     setOwnership(e.target.value)
    console.log(e.target.value)
    abc[e.target.className] = e.target.value;
      setInputValues({ ...inputValues, ...abc});
//  setShareholder({ ...shareholder, ...abc })
  }
  useEffect(async()=>{
    await handleData();
    await shareholderListData();
  },[])
  
  return (
    <>
      <Modal
        show={openModalToAddData}
        // onHide={()=> dispatch(setOpenModalToAddData(false))}
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
              onClick={() =>{
                dispatch(setOpenModalToAddData(false))
              }}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmitFormModalAddData}
            >
              <h4>
                Add Accounting Data
              </h4>
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': game
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="game"
                  name="name"
                  value={game}
                  // placeholder="Game"
                  onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                 <span className='label_text'>Game</span>
                  <Form.Control.Feedback type="invalid">
                        Game is Required.
                      </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': gameDetails
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="game_detail"
                  name="name"
                  value={gameDetails}
                  // placeholder="Game Details"
                  onChange={(e) => setGameDetails(e.target.value)}
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
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="venue"
                  name="name"
                  value={venue}
                  // placeholder="Venue"
                  onChange={(e) => setVenue(e.target.value)}
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
                  marginLeft:'11%',
                  marginRight:'9%',
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
                      borderRadius: '0px',
                        height:'54px',
                        // border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important',
                    

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
                  onChange={(event)=>{
                    setType(event.target.value)
                    setErrorType(false)
                  }}
                >
                  <MenuItem value={'CG'}>CG</MenuItem>
                  <MenuItem value={'Tournament'}>Tournament</MenuItem>
                  <MenuItem value={'Expense'}>Expense</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </FormControl>
              {errorType==true ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center'}}>Type is required.</span> : <></>} 

              {/* <Form.Label
                 htmlFor="exchange"
                 className={cx('custom-form-box', {
                   'focus-add': date
                 })}
                 style={{ width: '72%', marginLeft: '13%',marginBottom:'4%',marginTop:'-3%' }}
              >
                 <LocalizationProvider className='p-2' dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  className='ml-auto p-2'
                  value={date}
                  onChange={(newValue) => {
                    console.log(newValue);
                    setDate(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        color: 'white',
                        width: '105.8%',
                      }}
                      sx={{
                        '.MuiInputBase-input': {
                          height: '2em',
                          border:"none"
                        },
                        ".MuiOutlinedInput-notchedOutline":{
                          height:'3.5em',
                          border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        },
                        '.MuiSvgIcon-root': {
                          fill: 'white'
                        },
                        '.custom-form-box span':{
                          background:'unset'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
                
              </Form.Label> */}
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': date
                })}
                style={{ width: '72%', marginLeft: '15%', marginTop:'22px' }}
              >
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
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="host"
                  name="name"
                  value={host}
                  // placeholder="Host"
                  onChange={(e) => setHost(e.target.value)}
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
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="creditor"
                  name="creditor"
                  value={creditor}
                  // placeholder="Group"
                  onChange={(e) => setCreditor(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                           <span className='label_text'>Group</span>
                 <Form.Control.Feedback
                  type="invalid"
                >
                  Group is Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': player
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="player"
                  name="name"
                  value={player}
                  // placeholder="Player"
                  onChange={(e) => setPlayer(e.target.value)}
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
                  'focus-add': result
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="result"
                  name="name"
                  value={result}
                  // placeholder="Result" 
                  onChange={(e) => {
                    const res1 = e.target.value
                    console.log(res1)
                    if (!res1 || res1.match(/^-\d{1,}(\.\d{0,2})?$/) || res1.match(/^\d{1,}(\.\d{0,2})?$/)) {
                      setResult(res1)
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
                      border:'1px solid hsl(0deg 0% 44% / 63%)  !important',
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
                 {errorCurrency==true  ? <span style={{color:'#dc3545',fontSize:'.875em',top:'-20px',position:'relative'}}>Currency is required.</span> : <></>} 
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': exchangeRate
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="exchange_rate"
                  name="exchange_rate"
                  value={exchangeRate}
                  // placeholder="Exchange-rate"
                  onChange={(e) => {
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
              
              {/* {countValue==0 ? */}
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
                 value={shareholder}
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
                      borderRadius: '0px',
                        height:'54px',
                       
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
                       paddingRight:'62%',
                       paddingTop:'12px',
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                
                  onChange={(event)=>{

                    setShareholder(event.target.value)
                     setTemp1(event.target.value)
                    setShareError(false)
                   
                  //  shareArray.push({'share_holder_id':uuidv4(),'shareholders':event.target.value,'ownership':ownership})
                  }}
                >
                  {resultShareholdersData.filter(x => !selectedShareholder.some(y => y.shareholder === x.share_holder_name)).map((item,index)=>(
                  <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                  ))}
                </Select>
                
              </FormControl>
              
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': ownership
                })}
                style={{ marginTop:"-75px",marginLeft:"63%",width:'24%'}}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={ownership}
                  placeholder="%"
                  onChange={(e)=>{
                    const ownPer = e.target.value
                    if (!ownPer || ownPer.match(/^\d{1,}(\.\d{0,1})?$/)) {
                      console.log(ownPer)
                     
                      setOwnership(ownPer)
                      setTemp(ownPer)
                      
                    }
                    // handleowner(e)
                    setShareError(false)
                    
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
                        shareholdArray.push(temp1.toLowerCase())
                        ownerArray.push(temp)
                        console.log(shareholdArray)
                        setSelectedShareholder([...selectedShareholder, {shareholder:temp1,owner:temp}])
                        setShareholder('')
                        setOwnership('')
                        
                      
                        // shareArray.push({'share_holder_id':uuidv4(),'shareholders':shareholdArray,'owner_ship':ownerArray})

                        // shareArray.push({'share_holder_id':uuidv4(), 'shareholders':temp1,'owner_ship':temp})
                      }}
                    >
                       <AddCircleOutlineOutlinedIcon /> 
                      {/* <RemoveIcon /> */}
                    </div>
                    </Tooltip>
                  </span>
                  { shareError==true ? <span style={{width: '100%',
    left: '-12em',
    whiteSpace: 'nowrap',fontWeight:'800',fontSize: '.875em',color: '#dc3545',    position: 'relative'}}>Shareholder & Ownership is required.</span> : <></>}
              </Form.Label>
              
             
              </>
              
             {console.log(selectedShareholder)}
             {/* {shareError==true ? <span style={{color:'red'}}>shareholder & ownership required</span> : <></>} */}
             {selectedShareholder.length>0 && selectedShareholder.map((c, index) => (
             
                index>=0 ? 
                
                <>
                {console.log('cc',c)}
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
                  // className={index}
                 value={c.shareholder}
                //  disabled={countValue>5}
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
                      borderRadius: '0px',
                        height:'54px',
                        
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
                       paddingRight:'62%',
                       paddingTop:'12px',
                       WebkitTextFillColor:'white'
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    },
                   
                  }}
                  disabled={selectedShareholder.length>0}
                  // onChange={handleshare}
                >
                  {resultShareholdersData.map((item,index)=>(
                  <MenuItem key={index} value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': ownership
                })}
                style={{ marginTop:"-75px",marginLeft:"63%",width:'24%'}}
              >
                <Form.Control
                  type="number"
                  id="name"
                  name="name"
                  value={c.owner}
                  placeholder="%"
                  disabled={selectedShareholder.length>0}
                  onChange={(e)=>{
                    const ownPer1 = e.target.value
                    if (!ownPer1 || ownPer1.match(/^\d{1,}(\.\d{0,1})?$/)) {
                  
                      setTemp(ownPer1)
                  
                  }
                  }}
                  required
                  style={{ color: 'white',backgroundColor:'rgb(31, 33, 37)' }}
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
                        setSelectedShareholder(selectedShareholder.filter(i=>i!=c))
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
  )) }
               <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': comment
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="comment"
                  name="name"
                  value={comment}
                  // placeholder="Comment"
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                      <span className='label_text'>Comment</span>
                 {/* <Form.Control.Feedback type="invalid">
                        Comment is Required.
                      </Form.Control.Feedback> */}
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
               {shareHolderErr
            ? (
              <Snackbar
                open={shareHolderErr}
                onClose={()=>setShareholderErr(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setShareholderErr(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  please enter shareholder name 
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
              {alertGameSuccess
            ? (
              <Snackbar
                open={alertGameSuccess}
                onClose={()=>setAlertGameSuccess(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setAlertGameSuccess(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Game added successfully
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
              onClose={() => setSpaceError(false)}
              sx={{
                marginLeft: '35%',
                marginBottom: '38%',
                width: '25%'
              }}
            >
              <Alert
                onClose={() => setSpaceError(false)}
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
              {alertGameExist
            ? (
              <Snackbar
                open={alertGameExist}
                onClose={()=>setAlertGameExist(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setAlertGameExist(false)}
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
        </div>
      </Modal>
    </>
  )
}

export default ModalForAddRowData;