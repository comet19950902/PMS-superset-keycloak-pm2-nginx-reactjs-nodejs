import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl'
import Paper from '@material-ui/core/Paper'
import { Alert, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar'
import Select from '@mui/material/Select'
import Autocomplete from '@mui/material/Autocomplete'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Tooltip from '@mui/material/Tooltip';
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames';
import moment from 'moment'
import "./AccountingData.css";
import { styled, lighten, darken } from '@mui/system';
import { setOpenModalCloneRow, setResultShowData,setEditAccountancyRowData } from "../Redux/appSlice";
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
let shareArray = []
let ownerArray = []
let shareHoldArray = []
function ModalForCloneData(props) {
  console.log("props from modal", props);
  const styles = useStyles()

  const dispatch = useDispatch();
  const [totalAccountingData, setTotalAccountingData]=useState([])
  const [errorCurrency,setErrorCurrency]=useState(false)
  const [errorType,setErrorType]=useState(false)
  const [validated,setValidated]=useState(false)
  const [resultShareholdersData, setResultShareholdersData] = useState([]);
  const [countValue, setCountValue] = useState(0);
  const [shareError, setShareError] = useState(false)
  const [temp, setTemp] = useState('')
  const [inputValues, setInputValues] = useState([]);
  const [alertOwnershipError, setAlertOwnershipError] = useState(false)
  const [temp1, setTemp1] = useState('')
  const [ownershipError, setOwnershipError] = useState(false)
  const [temp0, setTemp0] = useState('')
  const { openModalCloneRow, editAccountancyRowData } = useSelector((store) => store.app);
  const [date, setDate] = useState(moment(editAccountancyRowData?.date, 'YYYY-MM-DD', true).isValid() ? editAccountancyRowData?.date :  editAccountancyRowData?.date.split('/')[2]+'-'+editAccountancyRowData?.date.split('/')[1]+'-'+editAccountancyRowData?.date.split('/')[0])
  const [gameEdit, setGameEdit] = useState(editAccountancyRowData?.game);
  const [gameDetailsEdit, setGameDetailsEdit] = useState(editAccountancyRowData?.game_details);
  const { resultShowData } = useSelector((store) => store.app);
  const [venueEdit, setVenueEdit] = useState(editAccountancyRowData?.venue);
  const [ownershipEdit, setOwnershipEdit] = useState('');
  const [shareholderData, setShareholderData]=useState(editAccountancyRowData?.shares)
  const [typeEdit, setTypeEdit] = useState(editAccountancyRowData?.type);
  const [hostEdit, setHostEdit] = useState(editAccountancyRowData?.host);
  const [creditorEdit, setCreditorEdit] = useState(editAccountancyRowData?.group_);
  const [playerEdit, setPlayerEdit] = useState(editAccountancyRowData?.player);
  const [shareholderEdit, setShareholderEdit] = useState('');
  const [alertOwnershipLessError,setAlertOwnershipLessError]=useState(false)
  const [alertGameCloneSuccess, setAlertGameCloneSuccess] = useState(false)
  const [resultEdit, setResultEdit] = useState(editAccountancyRowData?.result);
  const [currencyValue,setCurrencyValue]=useState(editAccountancyRowData?.currency)
  const [exchangeRate,setExchangeRate]=useState(editAccountancyRowData?.exchange_rate)
  const [comment,setComment]=useState(editAccountancyRowData?.comment)
  const [updatedValue, setUpdateValue] = useState(props?.openModalEditRow);
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
  // console.log("editAccountancyRowData",editAccountancyRowData); 
  //  const [ newEditAccountancyRowData , setNewEditAccountancyRowData  ]  = useState({...editAccountancyRowData});
  //  const { game,game_details,host,player,result,venue,type,shares  } = newEditAccountancyRowData;
  // const [newShares,setNewShares] = useState([...shares]);
  // console.log("game,game_details,host,player,result,venue,type,shares ,newEditAccountancyRowData",game,game_details,host,player,result,venue,type,shares,newEditAccountancyRowData );

  const handleSubmitForm = (e) => {
    e.preventDefault()
    setValidated(true)
    // console.log(shareHoldArray, shareholderEdit)
    const form = e.currentTarget
  
   
    // if (form.checkValidity() === false) {
    //   // e.preventDefault()
    //   // e.stopPropagation()
    // }  
    
    if(gameEdit=='' || gameDetailsEdit=='' || hostEdit=='' || creditorEdit=='' || venueEdit=='' || playerEdit=='' ||resultEdit=='' || exchangeRate==''){
      setValidated(true)
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
    else if(typeEdit==''){
      setErrorType(true)
    }
    else if(currencyValue==null){
      setErrorCurrency(true)
    }
  //   else  if(shareholderEdit=='' || ownershipEdit==''){
  //   console.log(shareError)
  //   setShareError(true)
  //   shareHoldArray=[]
  //   ownerArray=[]
  //  }
    else {
      let t = 0
      let tempShareArray=[]
      let tempOwnerArray=[]
      if(temp1=='' ||  temp==''){
        console.log(ownerArray,temp1)
        shareHoldArray.pop()
        ownerArray.pop()
         tempShareArray=[...shareholderData.map(e=>e.shareholder), ...shareHoldArray]
         tempOwnerArray=[...shareholderData.map(e=>e.owner_ship), ...ownerArray]
        console.log(ownerArray,tempShareArray, tempOwnerArray)
      }else{
        shareHoldArray.push(temp1.toLowerCase())
        ownerArray.push(temp)
         tempShareArray=[...shareholderData.map(e=>e.shareholder), ...shareHoldArray]
         tempOwnerArray=[...shareholderData.map(e=>e.owner_ship), ...ownerArray]
      }
      for(const a of tempOwnerArray){
        t= parseFloat(a) + t
      }
      if(isNaN(t)){
        console.log('error')
        setAlertOwnershipLessError(true)
         shareHoldArray=[]
         ownerArray=[]
         tempOwnerArray=[]
         tempShareArray=[]
        setTimeout(()=>{
          setAlertOwnershipLessError(false)
          // dispatch(setOpenModalToEditSelectedRow(false))
        },3000)
      }else if(parseFloat(t)>100){
        console.log('error')
        setAlertOwnershipError(true)
        // shareHoldArray=[]
        shareHoldArray=[]
        ownerArray=[]
        tempOwnerArray=[]
        tempShareArray=[]
        setTimeout(()=>{
          setAlertOwnershipError(false)
          // dispatch(setOpenModalCloneRow(false))
        },3000)
      } else if(parseFloat(t)<100){
        console.log('error')
        setAlertOwnershipLessError(true)
        // shareHoldArray=[]
        shareHoldArray=[]
        ownerArray=[]
        tempOwnerArray=[]
        tempShareArray=[]
        setTimeout(()=>{
          setAlertOwnershipLessError(false)
          // dispatch(setOpenModalCloneRow(false))
        },3000)
      }else{ 
        shareArray.push({ 'share_holder_id': uuidv4(), 'shareholders': tempShareArray.toString()=="," ? "" : tempShareArray.toString(), 'shareholders_percentage': tempOwnerArray.toString()=="," ? "" : tempOwnerArray.toString() })
        totalAccountingData.sort((a, b) => {
          const x = parseInt(a.game_id)
          const y = parseInt(b.game_id)
          return x < y ? -1 : x > y ? 1 : 0
        })
        for(let i=1;i<10000;i++){
        let  m = totalAccountingData.filter(f=>f.game_id==i)
        if(m.length==0){

          // console.log('if',i)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/pms_accountancy`,
        data:
        {
          "game": gameEdit,
          "game_id": totalAccountingData.length==0 ? 1 : parseInt((totalAccountingData.slice(-1)[0].game_id))+1,
          "date": date,
          "game_details": gameDetailsEdit,
          "venue": venueEdit,
          "type": typeEdit,
          "host": hostEdit.toLowerCase(),
          "week": '1',
          "player": playerEdit,
          "group_": creditorEdit.toLowerCase(),
          "share_holder": shareArray,
          "currency":currencyValue,
          "result": resultEdit,
          "exchange_rate":exchangeRate,
          "comment":comment
        }
      }
      console.log(config.data);
      axios(config).then(function (response) {
        console.log(response)
        console.log(response.data);
        shareArray = []
        shareHoldArray = []
        ownerArray = []
        tempOwnerArray=[]
        tempShareArray=[]
        if (response?.data) {
          console.log("qwertyuiop");
          handleData();
          setAlertGameCloneSuccess(true)
          setTimeout(()=>{
            setAlertGameCloneSuccess(false)
            dispatch(setOpenModalCloneRow(false))
          },3000)
        }
      }).catch(function (error) {
        console.log(error)
      })
      break
    }
  }
      // console.log("Submitted");
    }
  }
  }
  const handleData = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/get_accountancy`,
    }
    await axios(config).then(function (response) {
      console.log(response)
      setTotalAccountingData(response.data)
      const data1 = response.data.filter(item => item.status == 'A')
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
        return { ...record, weeks: weekNumber, result_USD: parseFloat(parseFloat(res).toFixed(2)) ,result:parseFloat(record.result), game_id: parseInt(record.game_id),exchange_rate:parseFloat(record.exchange_rate) }
      })
      const gameArray = [...temp2];
      for (let i = 0; i < gameArray.length; i++) {
        gameArray[i].shares = []
        gameArray[i].id=i+1
        let shareArray = [];
        let shareholderArray = []
        shareholderArray = gameArray[i].shareholders.split(',');
        let ownerShipArray = []
        ownerShipArray = gameArray[i].shareholders_percentage.split(',');

        for (let j = 0; j < shareholderArray.length; j++) {
          let shareObject = {
            shareholder: shareholderArray[j],
            owner_ship: ownerShipArray[j]
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
  useEffect(async () => {
    await handleData();
    await shareholderListData();
  }, [])
  const handleshare = (e, item, index) => {
    setOwnershipError(true)
    const abc = {};
    setTemp1(e.target.value)


    abc[e.target.className] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  }
  // const updateShares=(index)=>(e)=>{
  //   e.preventDefault()
  //   // console.log(i,e.target.name);
  //               const newArray = newShares.map((item,i)=>{
  //                 if(index === i){
  //                   return {...item , [e.target.name]:e.target.value};
  //                 }else{
  //                   return item;
  //                 }
  //               });
  //               //  setTemp1(newArray)
  //                setNewShares(newArray);
  // }
  const handleShareChange=(e,id)=>{
    const { value } = e.target;
    setShareholderData((data) =>
      data?.map((list, index) =>
        index === id ? { ...list, shareholder: value } : list
      )
    );
  console.log(value,id)
   }
  const handleownerChange=(e,id)=>{
    const { value } = e.target;
    if (!value || value.match(/^\d{1,}(\.\d{0,1})?$/)) {
     setShareError(false)
    setShareholderData((data) =>
      data?.map((list, index) =>
        index === id ? { ...list, owner_ship: value } : list
      )
    );
    }
  console.log(value,id)
   }
  return (
    <><Modal show={openModalCloneRow} style={{ width: '28%', marginLeft: '35%' }} >
      <div style={{ border: '1px solid white' }}>
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <IconButton style={{ position: 'absolute', top: '0',right: '0',color: 'white'}}
            onClick={() => { dispatch(setOpenModalCloneRow(false))}}>
            <CloseIcon />
          </IconButton>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: '#222429' }}>
          <Form
            className="custom-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmitForm}
          >
            <h4>
              Clone Accounting Data
            </h4>
            <Form.Label
              htmlFor="exchange"
              className={cx('custom-form-box', {
                'focus-add': gameEdit
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="game"
                name="name"
                value={gameEdit}
                // placeholder="Game"
                onChange={(e) => setGameEdit(e.target.value)}
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
                'focus-add': gameDetailsEdit
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="game_detail"
                name="name"
                value={gameDetailsEdit}
                // placeholder="Game Details"
                onChange={(e) => setGameDetailsEdit(e.target.value)}
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
                'focus-add': venueEdit
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="venue"
                name="name"
                value={venueEdit}
                // placeholder="Venue"
                onChange={(e) => setVenueEdit(e.target.value)}
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
                marginLeft: '1.9%',
                marginBottom: '23px'
              }}
            >
              <InputLabel
                id="demo-simple-select-helper-label"
                style={{
                  fontSize: '17px',
                  overflow: 'visible',
                  color: 'grey',
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
                value={typeEdit}
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
                    height: '54px',
                    // border: '1px solid hsl(0deg 0% 44% / 63%) !important',
                    borderColor: 'unset'
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
                    paddingBottom: '13px',
                    paddingRight: '61%',
                    paddingTop: '12px',
                  },
                  ' .MuiInputLabel-root.Mui-focused': {
                    marginTop: '-3% !important',
                    marginLeft: '-5% !important'
                  }
                }}
                onChange={(event) => setTypeEdit(event.target.value)}
              >
                <MenuItem value={'CG'}>CG</MenuItem>
                <MenuItem value={'Tournament'}>Tournament</MenuItem>
                <MenuItem value={'Expense'}>Expense</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </Select>
            </FormControl>
            {errorType==true ? <span style={{color:'#dc3545',fontSize:'.875em',display:'flex', justifyContent:'center'}}>Type is required.</span> : <></>} 
            <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': date
                })}
                style={{ width: '72%', marginLeft: '15%' }}
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
                'focus-add': hostEdit
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="host"
                name="name"
                value={hostEdit}
                // placeholder="Host"
                onChange={(e) => setHostEdit(e.target.value)}
                required
                style={{ color: 'white' }}
              />
                 <span className='label_text'>Host</span>
                 <Form.Control.Feedback type="invalid">
                        Host is Required.
                      </Form.Control.Feedback>
            </Form.Label>
            <Form.Label
              htmlFor="exchange"
              className={cx('custom-form-box', {
                'focus-add': creditorEdit
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="creditor"
                name="name"
                value={creditorEdit}
                // placeholder="Group"
                onChange={(e) => setCreditorEdit(e.target.value)}
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
                'focus-add': playerEdit
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="player"
                name="name"
                value={playerEdit}
                // placeholder="Player"
                onChange={(e)=>setPlayerEdit(e.target.value)}
                // onChange={(e) => setNewEditAccountancyRowData({...newEditAccountancyRowData,player:e.target.value})}
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
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="number"
                id="result"
                name="name"
                value={resultEdit}
                // placeholder="Result"
                onChange={(e) => {
                  const res1 = e.target.value
                  if (!res1 || res1.match(/^-\d{1,}(\.\d{0,2})?$/) || res1.match(/^\d{1,}(\.\d{0,2})?$/)) {
                    setResultEdit(res1)
                  }
                }
                }
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
                {errorCurrency==true  ? <span style={{color:'#dc3545',fontSize:'.875em',top:'-20px',position:'relative'}}>Currency is required.</span> : <></>} 
            <Form.Label
              htmlFor="exchange"
              className={cx('custom-form-box', {
                'focus-add': exchangeRate
              })}
              style={{ width: '72%', marginLeft: '15%' }}
            >
              <Form.Control
                type="text"
                id="exchange_rate"
                name="name"
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
            {editAccountancyRowData?.shares?.map((item,index)=>(
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
                  className={index}
                 defaultValue={item.shareholder}
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
                
                   onChange={(e)=>{
                  handleShareChange(e,index)
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
                  className={index}
                  defaultValue={item.owner_ship}
                  placeholder="%"
                  onChange={(e)=>{
                    handleownerChange(e,index)
                    // const ownPer1 = e.target.value
                   
                  }}
                  
                  required
                  style={{ color: 'white' }}
                />
                {index==0 ?
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
                        if(temp1!='' || temp!=''){
                          shareHoldArray.push(temp1.toLowerCase())
                           ownerArray.push(temp)  
                        }  
                      }}
                    >
                       <AddCircleOutlineOutlinedIcon /> 
                    </div>
                    </Tooltip>
                  </span> :
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
                      console.log(index,item)
                      dispatch(setEditAccountancyRowData({...editAccountancyRowData,shares:editAccountancyRowData?.shares.filter(i=>i!=item)}))
                      setShareholderData(shareholderData.filter(i=>i!=item))
                      //  setCountValue(countValue-1)
                      //  if(temp1!='' || temp!=''){
                      //    shareHoldArray.push(temp1.toLowerCase())
                      //     ownerArray.push(temp)  
                      //  }  
                     }}
                   >
                      <RemoveCircleOutlineSharpIcon  /> 
                   </div>
                   </Tooltip>
                 </span>
                  }
              </Form.Label> 
              </>))}
            {countValue == 0 ?
              // <>
              //   <FormControl style={{width: '46%',marginLeft: '-23%',marginBottom: '23px'}} >
              //     <InputLabel id="demo-simple-select-helper-label" style={{fontSize: '17px', overflow: 'visible',color: 'grey',  top:'1px',
              //       left:'-8px',
              //       background:'#1f2125' }}>
              //       shareholder
              //     </InputLabel>

              //     <Select MenuProps={{ classes: { paper: styles.paper },PaperProps: {
              //           sx: {'& .MuiMenuItem-root:hover': { backgroundColor: 'lightgrey', color: 'black'},'& .MuiMenuItem-root.Mui-selected:hover': {backgroundColor: 'lightgrey', color: 'black' }}}}}
              //           labelId="demo-simple-select-label"
              //           id="demo-simple-select"
              //           value={shareholderEdit}
              //           label="Select"
              //       style={{     height: '50px',
              //       // borderRadius: '15px',
              //       boxShadow: 'none',
              //       border:'1px solid hsl(0deg 0% 44% / 63%) '}}
              //       sx={{'.MuiOutlinedInput-notchedOutline': {borderRadius: '0px',
              //           height: '54px',
              //           border: '1px solid hsl(0deg 0% 44% / 63%) !important',
              //           borderColor: 'unset'
              //         },
              //         '.MuiInputLabel-root': {
              //           color: 'grey !important'
              //         },
              //         '.MuiSelect-icon': {
              //           fill: 'grey !important'
              //         },
              //         ".MuiOutlinedInput-input": {
              //           color: "white !important",
              //           fontSize: "15px",
              //           //  backgroundColor:'white',
              //           paddingBottom: '13px',
              //           paddingRight: '62%',
              //           paddingTop: '12px',
              //         },
              //         ' .MuiInputLabel-root.Mui-focused': {
              //           marginTop: '-3% !important',
              //           marginLeft: '-5% !important'
              //         }
              //       }}

              //       onChange={(event) => {
              //         let c = []
              //         setShareholderEdit(event.target.value)
              //         setTemp1(event.target.value)
              //         setShareError(false)
              //         // shareArray.push({'share_holder_id':uuidv4(),'shareholders':event.target.value,'ownership':ownershipEdit})
              //       }}
              //     >
              //       {resultShareholdersData.map((item, index) => (
              //         <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
              //       ))}
              //     </Select>

              //   </FormControl>

              //   <Form.Label
              //     htmlFor="exchange"
              //     className={cx('custom-form-box', {
              //       'focus-add': ownershipEdit
              //     })}
              //     style={{ marginTop: "-75px", marginLeft: "63%", width: '24%' }}
              //   >
              //     <Form.Control
              //       type="text"
              //       id="name"
              //       name="name"
              //       value={ownershipEdit}
              //       placeholder="%"
              //       onChange={(e) => {
              //         const ownPer = e.target.value
              //         if (!ownPer || ownPer.match(/^\d{1,}(\.\d{0,1})?$/)) {
              //           setOwnershipEdit(ownPer)
              //           setTemp(ownPer)
              //         }
              //         // handleowner(e)
              //         setShareError(false)

              //       }}

              //       required
              //       style={{ color: 'white' }}
              //     />

              //     <span style={{ marginTop: "12%", position: 'absolute', left: '96.5%', backgroundColor: "transparent" }}>
              //       <Tooltip title="Add More Shareholders">
              //         <div
              //           style={{
              //             boxShadow: 'none',
              //             cursor: 'pointer',
              //             background: 'transparent',
              //             color: '#FFC107'
              //           }}
              //           onClick={() => {
              //             setCountValue(prev => prev + 1)

              //             shareHoldArray.push(temp1.toLowerCase())
              //             ownerArray.push(temp)

              //             //   console.log(addCheckboxValue)
              //             //   addCheckboxValue.forEach((el,i)=>{
              //             //  console.log(el,i)
              //             //   })

              //           }}
              //         >
              //           <AddCircleOutlineOutlinedIcon />
              //           {/* <RemoveIcon /> */}
              //         </div>
              //       </Tooltip>
              //     </span>
              //   </Form.Label>

              //   {shareError == true ? <span style={{color:'#dc3545',fontSize:'.875em',top:'-20px',position:'relative'}}>shareholder & ownership required</span> : <></>}
              <>
              </>
              
              :
              <>
                {/* <FormControl
                  style={{
                    width: '46%',
                    marginLeft: '-23%',
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
                      // width:"239px",
                      height: '54px',
                      borderRadius: '15px',
                      boxShadow: 'none'
                    }}
                    sx={{
                      '.MuiOutlinedInput-notchedOutline': {
                        borderRadius: '0px',
                        height: '54px',
                        border: '1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor: 'unset'
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
                        paddingBottom: '13px',
                        paddingRight: '62%',
                        paddingTop: '12px',
                      },
                      ' .MuiInputLabel-root.Mui-focused': {
                        marginTop: '-3% !important',
                        marginLeft: '-5% !important'
                      }
                    }}
                    onChange={(event) => {

                      setShareholderEdit(event.target.value)
                      setTemp1(event.target.value)
                      setShareError(false)
                    }}
                  >
                    {resultShareholdersData.map((item, index) => (
                      <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Form.Label
                  htmlFor="exchange"
                  className={cx('custom-form-box', {
                    'focus-add': ownershipEdit
                  })}
                  style={{ marginTop: "-75px", marginLeft: "63%", width: '24%' }}
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
                      }
                      setShareError(false)
                    }}
                    required
                    style={{ color: 'white' }}
                  /> */}
                  {/* <span style={{ marginTop: "12%", position: 'absolute', left: '96.5%', backgroundColor: "transparent" }}>
                    <Tooltip title="Add More Shareholders">
                      <div
                        style={{
                          boxShadow: 'none',
                          cursor: 'pointer',
                          background: 'transparent',
                          color: '#FFC107'
                        }}
                        onClick={() => {
                          // shareArray.push({'share_holder_id':temp0, 'shareholders':temp1,'owner_ship':temp})
                          setCountValue(countValue + 1)
                          shareHoldArray.push(temp1.toLowerCase())
                          ownerArray.push(temp)

                        }}
                      > */}
                        {/* <AddCircleOutlineOutlinedIcon /> */}
                        {/* <RemoveIcon /> */}
                      {/* </div>
                    </Tooltip>
                  </span>
                </Form.Label> */}
                {/* {shareError==true ? <span style={{color:'red'}}>shareholder & ownership required</span> : <></>} */}
                {Array.from(Array(countValue)).map((c, index) => (
                  index >= 0 ?
                    <>
                      <FormControl
                        style={{
                          width: '46%',
                          marginLeft: '-23%',
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
                              height: '54px',
                              // border: '1px solid hsl(0deg 0% 44% / 63%) !important',
                              borderColor: 'unset'
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
                              paddingBottom: '13px',
                              paddingRight: '62%',
                              paddingTop: '12px',
                            },
                            ' .MuiInputLabel-root.Mui-focused': {
                              marginTop: '-3% !important',
                              marginLeft: '-5% !important'
                            }
                          }}
                          onChange={handleshare}
                        >
                          {resultShareholdersData.map((item, index) => (
                            <MenuItem value={item.share_holder_name}>{item.share_holder_name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Form.Label
                        htmlFor="exchange"
                        className={cx('custom-form-box', {
                          'focus-add': ownershipEdit
                        })}
                        style={{ marginTop: "-75px", marginLeft: "63%", width: '24%' }}
                      >
                        <Form.Control
                          type="number"
                          id="name"
                          name="name"
                          value={c}
                          placeholder="%"
                          onChange={(e) => {
                            const ownPer1 = e.target.value
                            if (!ownPer1 || ownPer1.match(/^\d{1,}(\.\d{0,1})?$/)) {
                              setTemp(ownPer1)
                            }
                            setOwnershipError(true)
                          }}
                          required
                          style={{ color: 'white' }}
                        />
                        <span style={{ marginTop: "12%", position: 'absolute', left: '96.5%', backgroundColor: "transparent" }}>
                          <Tooltip title="Remove Shareholders">
                            <div
                              style={{
                                boxShadow: 'none',
                                cursor: 'pointer',
                                background: 'transparent',
                                color: '#FFC107'
                              }}
                              onClick={() => {
                                setCountValue(countValue - 1)
                                shareHoldArray.filter(i=>i!=temp1)
                                ownerArray.filter(j=>j!=j.temp)
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
                ))}</>
            }
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
              onClose={() => setAlertOwnershipError(false)}
              sx={{
                marginLeft: '35%',
                marginBottom: '38%',
                width: '25%'
              }}
            >
              <Alert
                onClose={() => setAlertOwnershipError(false)}
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
              onClose={() => setAlertOwnershipLessError(false)}
              sx={{
                marginLeft: '35%',
                marginBottom: '38%',
                width: '25%'
              }}
            >
              <Alert
                onClose={() => setAlertOwnershipLessError(false)}
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
          {alertGameCloneSuccess
            ? (
              <Snackbar
                open={alertGameCloneSuccess}
                onClose={()=>setAlertGameCloneSuccess(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={()=>setAlertGameCloneSuccess(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Clone successfully
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

export default ModalForCloneData;