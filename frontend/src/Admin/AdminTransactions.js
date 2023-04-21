import React, { useState, useEffect,useRef} from 'react'
import '../modules/Transactions/Transactions.css'
import '../Admin/DashboardAdmin/DashboardAdmin.css'
import axios from 'axios'
import axiosRetry from 'axios-retry';
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../common/spinner'
import { textFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter'
import copy from 'copy-to-clipboard'

// import { bitcoinToFiat } from 'bitcoin-conversion';
import { Icon } from '@iconify/react'
import { setSelectedColumnId, setSelectedColumnForUnchecked } from '../Redux/appSlice';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap'
import '../common/Modal.css'
import { Alert, TextField } from '@mui/material'
import Header from '../common/Header/Header'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import cx from 'classnames'
import SearchBox from '../common/SearchBox/SearchBox'
import { CSVLink } from 'react-csv'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SidebarAdmin from './DashboardAdmin/SidebarAdmin'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import Autocomplete from '@mui/material/Autocomplete'
import { Link, useLocation } from 'react-router-dom'
import CommonTableTransaction from '../common/CommonTable/CommonTableTransaction'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import moment from 'moment'
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'
import { LegendToggle, LegendToggleSharp } from '@mui/icons-material';
import { SpaFontIcon } from 'react-md';
import zIndex from '@mui/material/styles/zIndex';
import { setDay } from 'date-fns';
// import { setOriginalNode } from 'typescript';
const useStyles = makeStyles({
  paper: {
    background: 'rgb(31, 33, 37) !important',
    color: 'white !important',
    width: '13em'
  },
  option: {
    '&:hover': {
      backgroundColor: 'grey !important',
      color: 'white !important'
    }
  }
})
let ethAddr=[]
let btcAddr=[]
let tronAddr=[]
let firstLoad=false
let tronData = []
let btn = false
let load=false
let addressArray = []
const AdminTransactions = () => {
  const dispatch = useDispatch();
  const { selectedColumnId, selectedColumnValueTable, hiddenValueForColumn, selectedColumnIdValue, selectedColumnForUnchecked } = useSelector((store) => store.app);
  const styles = useStyles()
  const [dataNew, setDataNew] = useState([])
  const [alertC, setAlertC] = useState(true)
  const [allAddressData,setAlldressData]=useState([])
  const myRef = useRef(null)
  const [showComment, setShowComment] = useState(false)
  const [resultInv, setResultInv] = useState([])
  const [showText, setShowText] = useState(false)
  const [resultFilter, setResultFilter] = useState([])
  const [resultFilter1, setResultFilter1] = useState([])
  const [resultExchange, setResultExchange] = useState([])
  const [resultExchange1, setResultExchange1] = useState([])
  const [resultFilter3, setResultFilter3] = useState([])
  const [tronTransaction, setTronTransaction] = useState([])
  const [api_key, setApi_key] = useState('')
  const [searchComb, setSearchComb]=useState([])
  const [showExchangeModal, setShowExchangeModal] = useState(false)
  const [alertExchComment, setAlertExchComment] = useState(false)
  const [exch_comment, setExch_comment] = useState('')
  const [addressType, setAddressType] = useState('')
  const [defaultAddressType, setDefaultAddressType] = useState(['ERC'])
  const [search1, setSearch1] = useState([])
  const [search2, setSearch2] = useState([])
  const [tronTime, setTronTime]=useState('')
  const [selectedWallet, setSelectedWallet] = useState([])
  const [sea, setSea] = useState('')
  const [tronFilt, setTronFilt] = useState(false)
  const [tronFiltData, setTronFiltData] = useState([])
  const [combFilt, setCombFilt] = useState(false)
  const [combFiltData, setCombFiltData] = useState([])
  const [btcFilt, setBtcFilt] = useState(false)
  const [btcFiltData, setBtcFiltData] = useState([])
  const [search, setSearch] = useState([])
  const [btcTransact, setBtcTransact] = useState([])
  const [combinedTransaction, setCombinedTransaction] = useState([])
  const [defaultExchange, setDefaultExchange] = useState('')
  const [tFilter, setTFilter] = useState(false)
  const [days, setDays] = useState(30)
  const [defaultSelect, setDefaultSelect] = useState('wallet')
  const [alertForInvestValue, setAlertForInvestValue] = useState(false)
  const [showAmount, setShowAmount] = useState(false)
  const [name, setname] = useState('')
  const [validated, setValidated] = useState(false)
  const [defaultAddress, setDefaultAddress] = useState('')
  const [open, setOpen] = useState(false)
  const [investment_id, setInvestment_id] = useState('')
  const [invest_name, setInvest_name] = useState('')
  const [defaultToken, setDefaultToken] = useState(['USDT', 'USDC', 'ETH', 'ALL'])
  const [defaultToken1, setDefaultToken1] = useState('usdt')
  const [invest_type, setInvest_type] = useState('')
  const [date_of_invest, setDate_of_invest] = useState('')
  const [invest_value, setInvest_value] = useState('')
  const [comment, setComment] = useState('')
  const [btnColor, setBtnColor] = useState('grey')
  const [alertInvestComment, setAlertInvestComment] = useState(false)
  const [alertInvest, setAlertInvest] = useState(false)
  const [alertTime, setAlertTime] = useState(false)
  const [alertEmptyT, setAlertEmptyT] = useState(false)
  const [tokenData, setTokenData] = useState([])
  const [count,setCount]=useState(20)
  const [alertNoTransaction, setAlertNoTransaction] = useState(false)
  const [alertNoTransact, setAlertNoTransact] = useState(false)
  const handleCloseInvestmentModal = () => setShowInvestUpdateModal(false)
  const [showInvestUpdateModal, setShowInvestUpdateModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(getId)
  const [r, setR] = useState(false)
  const [r1, setR1] = useState(false)
  const location = useLocation()
  let timeFilter, typeFilter, chainFilter, amountFilter, commentFilter, addressFilter, txnFilter
  let nameIFilter, typeIFilter, dateIFilter, valueFilter, updatedDateFilter
  let symbolFilter, priceFilter, costFilter, sideFilter, infoFilter, timestampFilter, updateDFilter, commentEFilter
  let transactionFilter, tokenFilter, toFilter, statusFilter, resultsFilter
  let hashFilter, blockFilter, fromFilter
  let tdata = location.state?.data
  let tvalue = location.state?.value
  const tdata1 = location.state?.data1
  const wdata = location.state?.data2
  const port2wallet = location.state?.data3
// console.log(location.state)
  const typeList = ['ALL', 'ERC', 'TRC', 'BTC'];
  const tokenListERCTRC = ['USDT', 'USDC', 'ETH', 'TRX'];
  const tokenListTRCBTC = ['USDT','USDC','TRX', 'BTC'];
  const tokenListERCBTC = ['USDT', 'USDC', 'ETH', 'BTC'];
  const tokenListALL = ['ALL','USDT', 'USDC', 'ETH', 'TRX', 'BTC'];
  const tokenListTRC = ['ALL', 'TRX', 'USDT', 'USDC'];
  const tokenListBTC = ['BTC'];
  const tokenList = ['ALL', 'USDT', 'USDC', 'ETH'];
  
  const AllAddressType=(d1,d2)=>{
    if (defaultToken.includes('ALL') == true) {
        
      let allToken = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,allToken)
   setDefaultToken(allToken)
   } else if (defaultToken.includes('ETH') == true && defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('TRX') == true) {
     
    let allToken = [ 'ETH', 'USDT','USDC','TRX']
  const p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
  combinedTrans(p1,w1,d1,d2,allToken)
  setDefaultToken(allToken)
  }else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('TRX') == true && defaultToken.includes('BTC') == true ) {
     
  let allToken = [ 'USDT', 'USDC','TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
 }else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true ) {
     
let allToken = [ 'USDT', 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('BTC') == true ) {
     
let allToken = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true && defaultToken.includes('BTC') == true ) {
     
let allToken = [ 'USDT','ETH','TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true) {
     
let allToken = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('TRX') == true) {
     
let allToken = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('BTC') == true) {
     
let allToken = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true) {
     
let allToken = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('TRX') == true && defaultToken.includes('BTC') == true) {
     
let allToken = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('USDT') == true && defaultToken.includes('ETH') == true && defaultToken.includes('BTC') == true) {
     
let allToken = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(alltoken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('ETH') == true) {
     
let allToken = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true) {
     
  let allToken = [ 'USDT','USDC']
  const p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
  combinedTrans(p1,w1,d1,d2,allToken)
  setDefaultToken(allToken)
  }
else if (defaultToken.includes('USDT') == true && defaultToken.includes('TRX') == true) {
     
let allToken = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDT') == true && defaultToken.includes('BTC') == true) {
     
let allToken = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true && defaultToken.includes('BTC') == true) {
     
let allToken = [ 'USDC','ETH','TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true) {
     
let allToken = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('BTC') == true) {
     
let allToken = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true ) {
     
 let allToken = [ 'USDC', 'ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
} else if (defaultToken.includes('USDC') == true && defaultToken.includes('BTC') == true ) {
     
let allToken = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDC') == true && defaultToken.includes('TRX') == true ) {
     
let allToken = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true ) {
     
let allToken = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('TRX') == true && defaultToken.includes('BTC') == true ) {
     
 let allToken = [ 'TRX', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('USDT') ) {
     let allToken=['USDT']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('USDC') ) {
     
let allToken=['USDC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}else if (defaultToken.includes('ETH') ) {
     
let allToken=['ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('TRX') ) {
     
let allToken=['TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
else if (defaultToken.includes('BTC') ) {
     
 let allToken=['BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,allToken)
setDefaultToken(allToken)
}
  
}
  const ErcTrc=(d1,d2)=>{
    if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('TRX') == true) {
      let allToken = ['ETH','USDT','USDC','TRX']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true) {
      let allToken = ['ETH','USDT','USDC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true) {
      let allToken=['USDT','USDC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('USDT') == true && defaultToken.includes('ETH') == true) {
      let allToken=['USDT','ETH']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)

    } else if (defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true) {
      let allToken=['USDC','ETH']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('USDT') == true && defaultToken.includes('TRX') == true) {
      let allToken=['USDT','TRX']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDC') == true && defaultToken.includes('TRX') == true) {
      let allToken=['USDC','TRX']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('ETH') == true && allToken.includes('TRX') == true) {
      let allToken=['ETH','TRX']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDT') == true) {
      let allToken=['USDT',]
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (e.target.value.includes('USDC') == true) {
      let allToken=['USDC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('ETH') == true) {
      let allToken=['ETH']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }else if (defaultToken.includes('TRX') == true) {
      let allToken=['TRX']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
  }
  const TrcBtc=(d1,d2)=>{
    if (defaultToken.includes('TRX') == true && defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('BTC') == true ) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      let allToken=['TRX','USDT','USDC','BTC']
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('TRX') == true && defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true ) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      let allToken=['TRX','USDT','USDC']
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }else if (defaultToken.includes('TRX') == true && defaultToken.includes('USDT') == true  ) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      let allToken=['TRX','USDT']
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true  ) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      let allToken=['USDT','USDC']
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
     else if (defaultToken.includes('TRX') == true && defaultToken.includes('BTC') == true) {
      let allToken=['TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
     else if (defaultToken.includes('TRX') == true) {
      let allToken=['TRX']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('BTC') == true) {
      let allToken=['BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDT') == true) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDC') == true) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
  }
  const ErcBtc=(d1,d2)=>{
    if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true && defaultToken.includes('BTC') == true) {
      let allToken=['USDT','USDC','ETH','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
   else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true) {
    let allToken=['USDT','USDC','ETH']  
    const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('USDT') == true && defaultToken.includes('USDC') == true && defaultToken.includes('BTC') == true) {
      let allToken=['USDT','USDC','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
      let allToken=['USDT','USDC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }  else if (defaultToken.includes('USDT') == true && defaultToken.includes('BTC') == true) {
      let allToken=['USDT','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDT') == true && defaultToken.includes('ETH') == true) {
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)

    } else if (defaultToken.includes('USDC') == true && defaultToken.includes('ETH') == true) {
      let allToken=['USDC','ETH']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('USDC') == true && defaultToken.includes('BTC') == true) {
      let allToken=['USDC','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }else if (defaultToken.includes('ETH') == true && defaultToken.includes('BTC') == true) {
      let allToken=['ETH','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
    else if (defaultToken.includes('USDT') == true) {
      let allToken=['USDT']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('USDC') == true) {
      let allToken=['USDC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    } else if (defaultToken.includes('ETH') == true) {
      let allToken=['ETH']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }else if (defaultToken.includes('BTC') == true) {
      let allToken=['BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
      setDefaultToken(allToken)
    }
  }
  const trondata = async (pid) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
      params: {
        // user_id: getId,
        portfolio_id: pid,
        address_type: 'TRON'
      },
    };
    await axios(config).then(function (response1) {
      if (tdata !== undefined) {
        let adt = response1.data?.filter(i => i.address_id === tvalue)
        let adit = adt?.[0]?.address_id
        let addrt = response1.data.filter(k => k.wallet_id == tdata.wallet_id)
        setDefaultAddress(adit)
        setResultAddress(addrt)
        setDefaultAddressType(['TRC'])
        // console.log(new Date().getTime())
          // tronRefresh(adit)
          load=false
          const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    setValue(new Date(moment().subtract('months', 1)))
    setValueNew(new Date())
         trontransaction(adit,d1,d2)
      } else {
        const rst = response1.data?.[0]?.address_id
        let wdt = result2.filter(i => i.wallet_name == defaultWallet)
        let addrt1 = response1.data.filter(k => k.wallet_id == wdt?.[0]?.walletId)
        // console.log('ad1',addrt1)
        if(addrt1.length>0){
        setDefaultAddress(addrt1?.[0].address_id)
        setResultAddress(addrt1);
        setValue(new Date(moment().subtract('months', 1)))
        setValueNew(new Date())
        const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
         trontransaction(addrt1?.[0].address_id,d1,d2)
        }else{
          setAlertNoTransact(true)
        }
      }
    });
  }
 
  const handleLoadMore = async () => {
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if(days==30){
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
       if (defaultAddressType.includes('ALL') == true) {
        load=true
            setLoading(true)
            setCount(count+20)
            AllAddressType(d1,d2)
        }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
          load=true
              setLoading(true)
              setCount(count+20)
              ErcTrc(d1,d2)
          }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
                setLoading(true)
                setCount(count+20)
                TrcBtc(d1,d2)
            }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
              load=true
                  setLoading(true)
                  setCount(count+20)
                  ErcBtc(d1,d2) 
              }else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
                load=false    
                setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //   },
      // };
      // axios(config).then(function (response) {
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //   btctransaction(defaultAddress,d1,d2)
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
        setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    } 
  }
  else if(days==90){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 3))).getFullYear(), new Date(new Date(moment().subtract('months', 3))).getMonth() + 1, new Date(new Date(moment().subtract('months', 3))).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
  }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
    load=true
    setLoading(true)
    setCount(count+20)
    ErcTrc(d1,d2)
        }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
          setLoading(true)
          setCount(count+20)
          TrcBtc(d1,d2)
          }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
                  setLoading(true)
                  setCount(count+20)
                  ErcBtc(d1,d2)
            }
   else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
    load=false
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      // console.log(defaultAddress, loading)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //     //  start_time: tronTransaction.slice(-1)[0]?.timestamp
      //   },
      // };
      // axios(config).then(function (response) {
      //   // console.log('res',response.data)
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //   btctransaction(defaultAddress,d1,d2)
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
        setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    }
  } else if(days==180){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 6))).getFullYear(), new Date(new Date(moment().subtract('months', 6))).getMonth() + 1, new Date(new Date(moment().subtract('months', 6))).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
      }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
        load=true
              setLoading(true)
              setCount(count+20)
              ErcTrc(d1,d2)
        }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
          setLoading(true)
          setCount(count+20)
          TrcBtc(d1,d2)
            }
    else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      load=false
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      // console.log(defaultAddress, loading)
      
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //     //  start_time: tronTransaction.slice(-1)[0]?.timestamp
      //   },
      // };
      // axios(config).then(function (response) {
      //   // console.log('res',response.data)
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //   btctransaction(defaultAddress,d1,d2)
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
        setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    }
  } else if(days==365){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 12))).getFullYear(), new Date(new Date(moment().subtract('months', 12))).getMonth() + 1, new Date(new Date(moment().subtract('months', 12))).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
      }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
        load=true
        setLoading(true)
        setCount(count+20)
        ErcTrc(d1,d2)
        }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
                setLoading(true)
                setCount(count+20)
                TrcBtc(d1,d2)
          }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
            setLoading(true)
            setCount(count+20)
            ErcBtc(d1,d2)
            }
    else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      load=false
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //     //  start_time: tronTransaction.slice(-1)[0]?.timestamp
      //   },
      // };
      // axios(config).then(function (response) {
      //   // console.log('res',response.data)
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //   btctransaction(defaultAddress,d1,d2)
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
        setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    }
  } else if(days==1095){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 36))).getFullYear(), new Date(new Date(moment().subtract('months', 36))).getMonth() + 1, new Date(new Date(moment().subtract('months', 36))).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
      }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
        load=true
              setLoading(true)
              setCount(count+20)
              ErcTrc(d1,d2)
        }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
                setLoading(true)
                setCount(count+20)
                TrcBtc(d1,d2)
          }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
                  setLoading(true)
                  setCount(count+20)
                  ErcBtc(d1,d2)
            }
    else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      load=false
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      // console.log(defaultAddress, loading)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //     //  start_time: tronTransaction.slice(-1)[0]?.timestamp
      //   },
      // };
      // axios(config).then(function (response) {
      //   // console.log('res',response.data)
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //  
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
        setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    }
  } else if(days==1825){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 60))).getFullYear(), new Date(new Date(moment().subtract('months', 60))).getMonth() + 1, new Date(new Date(moment().subtract('months', 60))).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
  }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
        load=true
              setLoading(true)
              setCount(count+20)
              ErcTrc(d1,d2)
        }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
                setLoading(true)
                setCount(count+20)
                TrcBtc(d1,d2)
          }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
            setLoading(true)
            setCount(count+20)
          ErcBtc(d1,d2)  
          }
    else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      load=false
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      // console.log(defaultAddress, loading)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //     //  start_time: tronTransaction.slice(-1)[0]?.timestamp
      //   },
      // };
      // axios(config).then(function (response) {
      //   // console.log('res',response.data)
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //   btctransaction(defaultAddress,d1,d2)
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
        setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    }
  } else if(days==3650){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 120))).getFullYear(), new Date(new Date(moment().subtract('months', 120))).getMonth() + 1, new Date(new Date(moment().subtract('months', 120))).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
      }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
        load=true
        setLoading(true)
        setCount(count+20)
        ErcTrc(d1,d2)
        
      }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
                setLoading(true)
                setCount(count+20)
                TrcBtc(d1,d2)
          }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
            setLoading(true)
            setCount(count+20)
            ErcBtc(d1,d2)
            }
    else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      load=false
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_debank_data`,
      //   data: {
      //     address_id: defaultAddress,
      //     start_time: new Date(resultFilter1.slice(-1)[0].transaction_time).getTime() / 1000
      //   },
      // };
      // axios(config)
      //   .then(function (response) {
      //     if (response.data.length>0) {
      //       // setTronTime(result11.slice(-1)[0].transaction_time)
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     } else {
      //       ethtransaction(defaultAddress,d1,d2)
      //       // setLoading(false)
      //     }
      //   });
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
      // var config = {
      //   method: "post",
      //   url: `${process.env.REACT_APP_BASE_URL}/load_btc_tranjaction`,
      //   data: {
      //     btc_address_id: defaultAddress,
      //     address_type: 'BTC',
      //     load_number: 300
      //     //  start_time: tronTransaction.slice(-1)[0]?.timestamp
      //   },
      // };
      // axios(config).then(function (response) {
      //   // console.log('res',response.data)
      //   const rd = response.data
      //   const rs = rd?.[0]?.address_id
      //   btctransaction(defaultAddress,d1,d2)
      //   setLoading(false)
      // });
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
      // const tempTron=[...tronTransaction.slice(-1)[0].timestamp]
      // if(tronTime!=''){
        setLoading(true)
         setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
    }
  }else{
    const d1 = new Date([new Date(value).getFullYear(), new Date(value).getMonth() + 1, new Date(value).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(valueNew).getFullYear(), new Date(valueNew).getMonth() + 1, new Date(valueNew).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      load=true
          setLoading(true)
          setCount(count+20)
          AllAddressType(d1,d2)
      }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
        load=true
        setLoading(true)
        setCount(count+20)
        ErcTrc(d1,d2)
        
      }else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
          load=true
                setLoading(true)
                setCount(count+20)
                TrcBtc(d1,d2)
          }else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
            load=true
            setLoading(true)
            setCount(count+20)
            ErcBtc(d1,d2)
            }
    else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      setLoading(true)
      setCount(count+20)
      ethtransaction(defaultAddress,d1,d2)
      }
    else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      load =true
      setLoading(true)
      setCount(count+20)
      btctransaction(defaultAddress,d1,d2)
    } else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    load=true
        setLoading(true)
         setCount(count+20)
         trontransaction(defaultAddress,d1,d2)
        
    }
  }

  }
  
  // console.log(loading)
  const combinedTrans = async (pid,wid,d1,d2,allToken) => {
    setLoading(true)
    // console.log(allToken,days,resultAddress)
      // setDefaultToken(['ALL','ETH','TRX','USDC','USDT','BTC'])
    if(allToken==undefined){
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_all_transaction_filter`,
      params: {
        portfolio_id: pid,
        wallet_id:wid,
         start_timestamp: d1+19800,
         end_timestamp: d2+19800
      },
    };
    await axios(config).then(function (response1) {
      if (response1.data) {
        response1.data.sort((a, b) => {
          const x = a.date.length>10 ? (a.date)/1000 : (a.date)
          const y = b.date.length>10 ? (b.date)/1000 : (b.date)
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const tempAll = response1.data.map(record => {
  
        return { ...record, return_amount1: record.tokenType==='eth' ?(record.token_type==='ETH' ? parseFloat(parseFloat(record.eth_usdt).toFixed(2).replace(/\.00$/, '')) : record.token_type==='USDC' ? parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')) : parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')))  : record.tokenType=='TRON' ? (record.token_type==='TRX' ? parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')) : record.token_type==='USDC' ? parseFloat(parseFloat(record.usdc_value).toFixed(2).replace(/\.00$/, '')) : parseFloat(parseFloat(record.usdt_token_value).toFixed(2).replace(/\.00$/, ''))) : parseFloat(parseFloat(record.btc_usd_result).toFixed(2).replace(/\.00$/, '')), fee: record.tokenType==='eth' ? record.gas_fee===null ? '-' : parseFloat(parseFloat(record.gas_fee).toFixed(2).replace(/\.00$/, '')) : record.tokenType==='TRON' ?record.fee===null ? '-' : parseFloat(parseFloat(record.fee).toFixed(2).replace(/\.00$/, '')) : record.btc_usd_fee===null ?  '-'  :   parseFloat(parseFloat(record.btc_usd_fee).toFixed(2).replace(/\.00$/, '')), date: record.date.length>10 ? new Date(parseInt(record.date)).toUTCString() :  new Date(parseInt(record.date)*1000).toUTCString(),address_type:record.tokenType?.toUpperCase()}
      }) 
      // console.log(tempAll)
      // console.log(tempAll)
      if(tempAll.length==0){
        setCombFiltData([])
        setLoading(false)
        setAlertNoTransact(true)
        return
      }
      setLoading(false)
         setCombFilt(true);
    setCombFiltData(tempAll.map(rec=>{
      return {... rec, transac_amt: rec.tokenType == 'TRON' && parseFloat(rec.return_amount1) == 0 ?
      rec.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      rec.tokenType == 'TRON' && parseFloat(rec.return_amount1) > 0 ?
      '+'+rec.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      rec.tokenType == 'BTC' && parseFloat(rec.amount) > 0 ?
      '+'+Math.abs(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      rec.tokenType == 'BTC' && parseFloat(rec.amount) < 0 ?
      '-'+Math.abs(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      rec.return_amount1 != undefined && rec.tokenType=='eth' && rec.send_data != '[]' ?
      '-'+parseFloat(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      rec.return_amount1 != undefined && rec.recieve_data != '[]' && rec.tokenType=='eth' ?
      '+'+parseFloat(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') : '-'
    }
    }))
    //  setTronTransaction(tempTron)
    setLoading(false)
    })
  }else{
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_all_transaction_filter`,
      params: {
        portfolio_id: pid,
        wallet_id:wid,
         start_timestamp: d1+19800,
         end_timestamp: d2+19800,
         token_typeeth: allToken.includes('ETH') || (allToken.includes('ETH') && allToken.includes('USDT')) || (allToken.includes('ETH') && allToken.includes('USDC')) || (allToken.includes('ETH') && allToken.includes('TRX')) || (allToken.includes('ETH') && allToken.includes('BTC')) ? 'ETH' : '',
         token_typebtc: allToken.includes('BTC') || (allToken.includes('BTC') && allToken.includes('USDT')) || (allToken.includes('BTC') && allToken.includes('USDC')) || (allToken.includes('BTC') && allToken.includes('TRX')) || (allToken.includes('ETH') && allToken.includes('BTC')) ? 'BTC' : '',
        token_type: allToken.includes('TRX') || (allToken.includes('TRX') && allToken.includes('USDT')) || (allToken.includes('TRX') && allToken.includes('USDC')) || (allToken.includes('ETH') && allToken.includes('TRX')) || (allToken.includes('TRX') && allToken.includes('BTC')) ? 'TRX' : '',
        token_typeusd: allToken.includes('USDC') || (allToken.includes('USDC') && allToken.includes('USDT')) || (allToken.includes('ETH') && allToken.includes('USDC')) || (allToken.includes('USDC') && allToken.includes('TRX')) || (allToken.includes('USDC') && allToken.includes('BTC')) ? 'USDC' : '',
        token_typeusdt:allToken.includes('USDT') || (allToken.includes('ETH') && allToken.includes('USDT')) || (allToken.includes('USDT') && allToken.includes('USDC')) || (allToken.includes('USDT') && allToken.includes('TRX')) || (allToken.includes('USDT') && allToken.includes('BTC')) ? 'USDT' : '',

      },
    };
    await axios(config).then(function (response1) {

      if (response1.data) {
        response1?.data.sort((a, b) => {
          const x = a.date.length>10 ? (a.date)/1000 : (a.date)
          const y = b.date.length>10 ? (b.date)/1000 : (b.date)
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const tempAll = response1.data.map(record => {
  
        return { ...record, return_amount1: record.tokenType==='eth' ?(record.token_type==='ETH' ? parseFloat(parseFloat(record.eth_usdt).toFixed(2).replace(/\.00$/, '')) : record.token_type==='USDC' ? parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')) : parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')))  : record.tokenType=='TRON' ? (record.token_type==='TRX' ? parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')) : record.token_type==='USDC' ? parseFloat(parseFloat(record.usdc_value).toFixed(2).replace(/\.00$/, '')) : parseFloat(parseFloat(record.usdt_token_value).toFixed(2).replace(/\.00$/, ''))) : parseFloat(parseFloat(record.btc_usd_result).toFixed(2).replace(/\.00$/, '')), fee: record.tokenType==='eth' ? record.gas_fee===null ? '-' : parseFloat(parseFloat(record.gas_fee).toFixed(2).replace(/\.00$/, '')) : record.tokenType==='TRON' ?record.fee===null ? '-' : parseFloat(parseFloat(record.fee).toFixed(2).replace(/\.00$/, '')) : record.btc_usd_fee===null ?  '-'  :   parseFloat(parseFloat(record.btc_usd_fee).toFixed(2).replace(/\.00$/, '')), date: record.date.length>10 ? new Date(parseInt(record.date)).toUTCString() :  new Date(parseInt(record.date)*1000).toUTCString(),address_type:record.tokenType?.toUpperCase()}
      }) 
      if(tempAll.length==0){
        setCombFiltData([])
        setAlertNoTransact(true)
        return
      }
         setCombFilt(true);
         setCombFiltData(tempAll.map(rec=>{
          return {... rec, transac_amt: rec.tokenType == 'TRON' && parseFloat(rec.return_amount1) == 0 ?
          rec.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
          rec.tokenType == 'TRON' && parseFloat(rec.return_amount1) > 0 ?
          '+'+rec.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
          rec.tokenType == 'BTC' && parseFloat(rec.amount) > 0 ?
          '+'+Math.abs(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
          rec.tokenType == 'BTC' && parseFloat(rec.amount) < 0 ?
          '-'+Math.abs(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
          rec.return_amount1 != undefined && rec.tokenType=='eth' && rec.send_data != '[]' ?
          '-'+parseFloat(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
          rec.return_amount1 != undefined && rec.recieve_data != '[]' && rec.tokenType=='eth' ?
          '+'+parseFloat(rec.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') : '-'
        }
        }))
    //  setTronTransaction(tempTron)
    setLoading(false)
    })
    setLoading(false)
  }
  }
  // console.log(combFiltData)
  const btcdata = async (pid) => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: pid,
        address_type: 'BTC'
      },
    };
    await axios(config).then(function (response2) {
      // console.log(response2.data)
      if (tdata !== undefined) {
        let ad = response2.data?.filter(i => i.btc_address_id === tvalue)
        let adi = ad?.[0]?.btc_address_id
        let addr = response2.data.filter(k => k.wallet_id == tdata.wallet_id)
        // console.log(tdata)
        setDefaultAddress(adi)
        setResultAddress(addr)
        setDefaultAddressType(['BTC'])
        load=false
        const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
        btctransaction(adi,d1,d2)
        //  trontransaction(adi)
      } else {
        const rs = response2.data?.[0]?.btc_address_id
        let wd = result2.filter(i => i.wallet_name == defaultWallet)
        let addr2 = response2.data.filter(k => k.wallet_id == wd?.[0]?.walletId)
        // console.log(addr2)
        if(addr2.length>0){
        setDefaultAddress(addr2?.[0].btc_address_id)
        setResultAddress(addr2);
        //  setDefaultAddressType(['BTC'])
        const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
        btctransaction(addr2?.[0].btc_address_id,d1,d2)
        }else{
          setAlertNoTransact(true)
        }
      }
    });
  }

  const btctransaction = async (aid,d1,d2,btcToken) => {
    setLoading(true)
    // console.log(count)
   if(days==30 && load==false){
      setDefaultToken(['BTC'])
      setValue(new Date(moment().subtract('months', 1)))
    setValueNew(new Date())
    const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
   if(btcToken===undefined){
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc_transactions_filter`,
      params: {
        btc_address_id: aid,
        address_type: 'BTC',
        start_timestamp:d1+19800,
        end_timestamp:d2+19800
      },
    };
    const response1 = await axios(config)
    // console.log('transact btc',response1.data)
    if (response1.data) {
      response1.data.sort((a, b) => {
        const x = a.time
        const y = b.time
        return x > y ? -1 : x < y ? 1 : 0
      })
    }
    const tempBtc = response1.data?.map(record => {
      const resultUsd = parseFloat(record.usd_result)
      const feeUsd = parseFloat(record.usd_fee)
      return { ...record, usd_result: parseFloat(resultUsd.toFixed(2)), usd_fee: parseFloat(feeUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''), btc_date:new Date(parseInt(record.time)).toUTCString(),input_addr:'-',output_addr:'-' }
    })
    // if(tempBtc.length==0){
    //   setBtcFiltData([])
    //   setAlertNoTransaction(true)
    // }else{
   if(tempBtc.length!=0){
    setBtcFilt(true);
    setBtcFiltData(tempBtc.map(rec=>{
      return {...rec, transac_amt:parseFloat(rec.result) == '0' || parseFloat(rec.result) == '-0' ?
      Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      parseFloat(rec.usd_result) > 0 ?
      '+'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      '-'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
    }
    }))
    // setBtcTransact(tempBtc);
    setLoading(false)
   }else{
    setLoading(false)
    setAlertNoTransact(true)
   }
    // }
  }else{
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc_transactions_filter`,
      params: {
        btc_address_id: aid,
        address_type: btcToken,
        start_timestamp:d1+19800,
        end_timestamp:d2+19800
      },
    };
    const response1 = await axios(config)
    if(response1.data=='Addres type is not btc.'){
      setBtcFiltData([])
      setAlertNoTransact(true)
      setLoading(false)
    }
    // console.log('transact btc',response1.data)
    if (response1?.data) {
      response1.data?.sort((a, b) => {
        const x = a.time
        const y = b.time
        return x > y ? -1 : x < y ? 1 : 0
      })
    }
    const tempBtc = response1.data?.map(record => {
      const resultUsd = parseFloat(record.usd_result)
      const feeUsd = parseFloat(record.usd_fee)
      return { ...record, usd_result: parseFloat(resultUsd.toFixed(2)), usd_fee: parseFloat(feeUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''), btc_date:new Date(parseInt(record.time)).toUTCString(),input_addr:'-',output_addr:'-' }
    })
    // if(tempBtc.length==0){
    //   setBtcFiltData([])
    //   setAlertNoTransaction(true)
    // }else{
    if(tempBtc.length!=0){
    setBtcFilt(true);
    setBtcFiltData(tempBtc.map(rec=>{
      return {...rec, transac_amt:parseFloat(rec.result) == '0' || parseFloat(rec.result) == '-0' ?
      Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      parseFloat(rec.usd_result) > 0 ?
      '+'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      '-'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
    }
    }))
    // setBtcTransact(tempBtc);
    setLoading(false)
    }else{
      setLoading(false)
      setAlertNoTransact(true)
    }
  }
  }
  else{
   if(d1==undefined && d2==undefined){
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc_transactions_filter`,
      params: {
        btc_address_id: aid,
        address_type: 'BTC',
      },
    };
    const response1 = await axios(config)
    //  console.log('transact btc',response1.data)
    if (response1.data) {
      response1.data.sort((a, b) => {
        const x = a.time
        const y = b.time
        return x > y ? -1 : x < y ? 1 : 0
      })
    }
    const tempBtc = response1.data?.map(record => {
      const resultUsd = parseFloat(record.usd_result)
      const feeUsd = parseFloat(record.usd_fee)
      return { ...record, usd_result: parseFloat(resultUsd.toFixed(2)), usd_fee: parseFloat(feeUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''), btc_date:new Date(parseInt(record.time)).toUTCString(), input_addr:'-',output_addr:'-' }
    })
    if(tempBtc.length==0){
      setBtcFiltData([])
      setLoading(false)
       setAlertNoTransact(true)
    }  else{
     setBtcFilt(true);
     setBtcFiltData(tempBtc.map(rec=>{
      return {...rec, transac_amt:parseFloat(rec.result) == '0' || parseFloat(rec.result) == '-0' ?
      Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      parseFloat(rec.usd_result) > 0 ?
      '+'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      '-'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
    }
    }))
    // setBtcTransact(tempBtc);
    setLoading(false)
    }
    setLoading(false)
   }
    else if(btcToken==undefined){
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc_transactions_filter`,
      params: {
        btc_address_id: aid,
        address_type: 'BTC',
         start_timestamp:d1+19800,
         end_timestamp:d2+19800
      },
    };
    const response1 = await axios(config)
    //  console.log('transact btc',response1.data)
    if (response1.data) {
      response1.data.sort((a, b) => {
        const x = a.time
        const y = b.time
        return x > y ? -1 : x < y ? 1 : 0
      })
    }
    const tempBtc = response1.data?.map(record => {
      const resultUsd = parseFloat(record.usd_result)
      const feeUsd = parseFloat(record.usd_fee)
      return { ...record, usd_result: parseFloat(resultUsd.toFixed(2)), usd_fee: parseFloat(feeUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''), btc_date:new Date(parseInt(record.time)).toUTCString(),input_addr:'-',output_addr:'-' }
    })
    if(tempBtc.length==0){
      setBtcFiltData([])
      setLoading(false)
       setAlertNoTransact(true)
    }  else{
     setBtcFilt(true);
     setBtcFiltData(tempBtc.map(rec=>{
      return {...rec, transac_amt:parseFloat(rec.result) == '0' || parseFloat(rec.result) == '-0' ?
      Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      parseFloat(rec.usd_result) > 0 ?
      '+'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      '-'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
    }
    }))
    // setBtcTransact(tempBtc);
    setLoading(false)
    }
    setLoading(false)
  }else{
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc_transactions_filter`,
      params: {
        btc_address_id: aid,
        address_type: btcToken,
         start_timestamp:d1+19800,
         end_timestamp:d2+19800
      },
    };
    const response1 = await axios(config)
     if(response1.data=='Addres type is not btc.'){
      setBtcFiltData([])
      setAlertNoTransact(true)
    }
    if (response1.data) {
      response1.data.sort((a, b) => {
        const x = a.time
        const y = b.time
        return x > y ? -1 : x < y ? 1 : 0
      })
    }
    const tempBtc = response1.data?.map(record => {
      const resultUsd = parseFloat(record.usd_result)
      const feeUsd = parseFloat(record.usd_fee)
      return { ...record, usd_result: parseFloat(resultUsd.toFixed(2)), usd_fee: parseFloat(feeUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''), btc_date:new Date(parseInt(record.time)).toUTCString(),input_addr:'-',output_addr:'-' }
    })
    if(tempBtc.length==0){
      setBtcFiltData([])
      setLoading(false)
       setAlertNoTransact(true)
    }else{
     setBtcFilt(true);
     setBtcFiltData(tempBtc.map(rec=>{
      return {...rec, transac_amt:parseFloat(rec.result) == '0' || parseFloat(rec.result) == '-0' ?
      Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      parseFloat(rec.usd_result) > 0 ?
      '+'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
      '-'+Math.abs(rec.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
    }
    }))
    // setBtcTransact(tempBtc);
    setLoading(false)
    }
    setLoading(false)
  }
  }
 
  
    //  console.log(d1,d2)
   
   
  
    //  console.log(r1,tempBtc)
    // if (r1.length == 0 && tempBtc.length>0 ) {
    //   setAlertNoTransaction(true)
    // } else if (aid == undefined || tempBtc.length==0) {
    //   setAlertNoTransact(true)
    // }
    // else {
    //   setBtcFiltData(r1)
    //   setLoading(false)
    //  }
    // }else{
    //   setDefaultToken(['BTC'])
    // setBtcFilt(true);
    // var r1 = tempBtc.filter(
    //   (item) =>
    //      Math.abs(item.usd_result) >= 1
    // );
    // setBtcFiltData(r1)
    // setLoading(false)
    // }  
  }
  const ethtransaction = async (aid,d1,d2,ethToken) => {
    // console.log(ethToken,days)
      setLoading(true)
    if(ethToken==undefined){
      setDefaultToken(['ALL','ETH','USDC','USDT'])
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_eth_transaction_filter`,
      params: {
        address_id: aid,
         start_timestamp: (d1+19800)*1000,
         end_timestamp: (d2+19800)*1000
      },
    };
    await axios(config).then(function (response1) {
      if (response1.data) {
        response1.data.sort((a, b) => {
          const x = new Date(a.transaction_time).getTime() / 1000
          const y = new Date(b.transaction_time).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const tempEth = response1.data.map(record => {
  
        return { ...record, return_amount: record.token_type=='ETH' ?  parseFloat(parseFloat(record.usdt_eth).toFixed(2).replace(/\.00$/, '')) :  parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')),fee:record.gas_fee!=undefined ? parseFloat(record.gas_fee).toFixed(2) : '-', address_type:'ETH'
      }
    })
    console.log(tempEth)
      if(tempEth.length!=0){
        setLoading(false)
      setResultFilter1(tempEth.map(rec=>{
        return {...rec,  transac_amt:rec.return_amount != undefined && rec.send_data != '[]' && rec.recieve_data == '[]' ? '-'+ rec.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
        rec.return_amount != undefined && rec.recieve_data != '[]' && rec.send_data != '[]'  ?
        '+'+rec.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
        '+'+rec.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') }
      }));
    setR1(true);
    setLoading(false)
      }else{
        setResultFilter1([])
        setLoading(false)
        setAlertNoTransact(true)
      }
    })
  }else{
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_eth_transaction_filter`,
      params: {
        address_id: aid,
         start_timestamp: (d1+19800)*1000,
         end_timestamp: (d2+19800)*1000,
        token_type:ethToken.includes('ETH') || (ethToken.includes('ETH') && ethToken.includes('USDT')) || (ethToken.includes('ETH') && ethToken.includes('USDC')) ? 'ETH' : '',
        token_typeusd:ethToken.includes('USDC') || (ethToken.includes('USDC') && ethToken.includes('USDT')) || (ethToken.includes('USDT') && ethToken.includes('USDC')) ? 'USDC' : '',
        token_typeusdt:ethToken.includes('USDT') || (ethToken.includes('ETH') && ethToken.includes('USDT')) || (ethToken.includes('USDT') && ethToken.includes('USDC')) ? 'USDT' : '',
      },
    };
    await axios(config).then(function (response1) {

      if (response1.data) {
        response1?.data.sort((a, b) => {
          const x = new Date(a.transaction_time).getTime() / 1000
          const y = new Date(b.transaction_time).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const tempEth = response1.data.map(record => {
        return { ...record, return_amount: record.token_type=='ETH' ?  parseFloat(parseFloat(record.usdt_eth).toFixed(2).replace(/\.00$/, '')) : parseFloat(parseFloat(record.amount_returned).toFixed(2).replace(/\.00$/, '')),fee:record.gas_fee!=undefined ? parseFloat(record.gas_fee).toFixed(2) : '-',address_type:'ETH'
      }
      })

      if(tempEth.length==0){
        setLoading(false)
        setResultFilter1([])
        setAlertNoTransact(true)
      }else{
        setR1(true);
        setResultFilter1(tempEth.map(rec=>{
        return {...rec,  transac_amt:rec.return_amount != undefined && rec.send_data != '[]' && rec.recieve_data == '[]' ? '-'+ rec.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
        rec.return_amount != undefined && rec.recieve_data != '[]' && rec.send_data != '[]'  ?
        '+'+rec.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
        '+'+rec.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') }
      })); 
    setLoading(false)
      }
    })
    setLoading(false)
  }
}

  const trontransaction = async (aid,d1,d2,tronToken) => {
    // console.log(tronToken,days)
      setLoading(true)
    if(tronToken==undefined){
      setDefaultToken(['ALL','TRX','USDC','USDT'])
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_transactions_filter`,
      params: {
        address_id: aid,
        address_type: 'TRON',
         start_timestamp: d1+19800,
         end_timestamp: d2+19800
      },
    };
    await axios(config).then(function (response1) {
      if (response1.data) {
        response1.data.sort((a, b) => {
          const x = (a.timestamp) / 1000
          const y = (b.timestamp) / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const tempTron = response1.data.map(record => {
  
        return { ...record, USD_amount: record.token_type==='TRX' ? parseFloat(parseFloat(record.amount_trx).toFixed(2)) : record.token_type==='USDC' ? parseFloat(parseFloat(record.usdc_value).toFixed(2)) : parseFloat(parseFloat(record.usdt_token_value).toFixed(2)),tron_date: new Date(parseInt(record.timestamp)).toUTCString() }
      }) 
      // console.log(tempTron)
      if(tempTron.length==0){
        setTronFiltData([])
        setLoading(false)
        setAlertNoTransact(true)

        return
      }else{
         setTronFilt(true);
    setTronFiltData(tempTron.map(rec=>{
      return {...rec, transac_amt: rec?.USD_amount != '' && rec?.USD_amount != null ? 
    rec.toAddress===aid ? '+'+rec?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
    rec.ownerAddress===aid ? '-'+rec?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
    '+'+rec?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') : '-'
    }
    }))
    //  setTronTransaction(tempTron)
    setLoading(false)
      }
    })
  }else{
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_transactions_filter`,
      params: {
        address_id: aid,
        address_type: 'TRON',
         start_timestamp: d1+19800,
         end_timestamp: d2+19800,
        token_type:tronToken.includes('TRX') || (tronToken.includes('TRX') && tronToken.includes('USDT')) || (tronToken.includes('TRX') && tronToken.includes('USDC')) ? 'TRX' : '',
        token_typeusd:tronToken.includes('USDC') || (tronToken.includes('USDC') && tronToken.includes('USDT')) || (tronToken.includes('USDT') && tronToken.includes('USDC')) ? 'USDC' : '',
        token_typeusdt:tronToken.includes('USDT') || (tronToken.includes('TRX') && tronToken.includes('USDT')) || (tronToken.includes('USDT') && tronToken.includes('USDC')) ? 'USDT' : '',
      },
    };
    await axios(config).then(function (response1) {

      if (response1.data) {
        response1?.data.sort((a, b) => {
          const x = (a.timestamp) / 1000
          const y = (b.timestamp) / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      const tempTron = response1.data.map(record => {
  
        return { ...record, USD_amount: record.token_type==='TRX' ? parseFloat(parseFloat(record.amount_trx).toFixed(2)) : record.token_type==='USDC' ? parseFloat(parseFloat(record.usdc_value).toFixed(2)) : parseFloat(parseFloat(record.usdt_token_value).toFixed(2)),tron_date:new Date(parseInt(record.timestamp)).toUTCString() }
      })
      if(tempTron.length==0){
        setTronFiltData([])
        setLoading(false)
        setAlertNoTransact(true)
      }else{
         setTronFilt(true);
   setTronFiltData(tempTron.map(rec=>{
      return {...rec, transac_amt: rec?.USD_amount != '' && rec?.USD_amount != null ? 
    rec.toAddress===aid ? '+'+rec?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
    rec.ownerAddress===aid ? '-'+rec?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') :
    '+'+rec?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') : '-'
    }
    }))
     setTronTransaction(tempTron)
    setLoading(false)
      }
    })
    setLoading(false)
  }
      // if (days === 30) {
      //   var d2 = Math.floor(new Date().getTime() / 1000);
      //   var d1 = d2 - 30 * 86400
      //   setTronFilt(true);
      //   setDefaultToken(['ALL', 'TRX', 'USDT', 'USDC'])
      //   setValue(new Date(moment().subtract('months', 1)))
      //   setValueNew(new Date())

      //   var r1 = tempTron.filter(
      //     (item) =>
      //       item.timestamp / 1000 >= d1 &&
      //       item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
      //   );
        // if (r1.length == 0) {
        //   setTronFiltData([])
        //   setAlertNoTransaction(true)
        // } else if (aid == undefined) {
        //   setTronFiltData([])
        //   setAlertNoTransact(true)
        // }
        // else {
          // if (defaultToken.includes('TRX') || defaultToken.includes('USDT') || defaultToken.includes('USDC') || defaultToken.includes('ALL')) {
          //   let filterData = r1.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT' || i.tokenName == 'USDC')
          //   // console.log(filterData)
          //   setTronFiltData(filterData)
          //   setLoading(false)
          // } else {
          //   let filterData = r1.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT' || i.tokenName == 'USDC')
          //   setTronFiltData(filterData)
          //   setLoading(false)
          // }
        
        // else {
        //   if (defaultToken.includes('TRX') || defaultToken.includes('USDT') || defaultToken.includes('USDC') || defaultToken.includes('ALL')) {
        //     let filterData = r1.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        //     console.log(filterData)
        //     setTronFiltData(filterData)
        //   } else {
        //     let filterData = r1.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        //     setTronFiltData(filterData)
        //   }
        // }
    //   } else {
    //     if (defaultToken.includes('TRX') || defaultToken.includes('USDT') || defaultToken.includes('USDC') || defaultToken.includes('ALL')) {
    //       let filterData = tempTron.filter(i => (i.tokenName == 'trx' && parseFloat(i.USD_amount) >= 1) || (i.tokenName == 'USDT' && parseFloat(i.USD_amount) >= 1) || (i.tokenName == 'USDC' && parseFloat(i.USD_amount) >= 1))
    //       if (filterData.length == 0) {
    //         setAlertNoTransaction(true)
    //       } else {
    //         setTronFiltData(filterData)
    //         setLoading(false)
    //       }
    //     } else {
    //       let filterData = tempTron.filter((i => i.tokenName == 'trx' && parseFloat(i.USD_amount) >= 1) || (i.tokenName == 'USDT' && parseFloat(i.USD_amount) >= 1))
    //       if (filterData.length == 0) {
    //         setAlertNoTransaction(true)
    //       } else {
    //         setTronFiltData(filterData)
    //         setLoading(false)
    //       }
    //     }
    //   }
    // });
  }
  const handleSelect = (e) => {
    setResultInv([])
    setDefaultSelect(e.target.value)
    if (e.target.value === 'wallet') {
      setShowText(false)
      dataIdportfolio = resultPortfolio?.filter(
        (i) => i.portfolio_name === wall
      )
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/get_wallets`, {
          params: { portfolio_id: dataIdportfolio[0].portfolio_id }
        })
        .then((response) => {
          setResult2(response.data)
        })
      const wal_id = r2?.filter((i) => i.wallet_name === wall)
      setWalletSelect(wal_id[0].walletId)
    } else if (e.target.value === 'investment') {
      setShowText(true)
      dataIdportfolio = resultPortfolio?.filter(
        (i) => i.portfolio_name === wall
      )
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
          params: { portfolio_id: dataIdportfolio?.[0]?.portfolio_id }
        })
        .then((response) => {
          if (response.data) {
            response.data.sort((a, b) => {
              const x = new Date([new Date(a.date_of_investment).getFullYear(), new Date(a.date_of_investment).getMonth() + 1, new Date(a.date_of_investment).getDate()].join('/')).getTime() / 1000
              const y = new Date([new Date(b.date_of_investment).getFullYear(), new Date(b.date_of_investment).getMonth() + 1, new Date(b.date_of_investment).getDate()].join('/')).getTime() / 1000
              return x > y ? -1 : x < y ? 1 : 0
            })
          }
          setValueNew(new Date())
          setValue(new Date(moment().subtract('months', 1)))
         
          setR(true);
          const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
          const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
          var r = response.data.filter(
            (item) =>
              new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
              new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
          );

          setResultInv(response.data)
          // console.log(r);
          if (r.length == 0 && response.data.length > 0) {
            setResultFilter([]);
            setAlertNoTransaction(true)
          } else if (response.data.length == 0) {
            setResultFilter([]);
            setAlertNoTransact(true)
          }
          else {

            setResultFilter(r);
          }
        })
    } else if (e.target.value === 'exchange') {
      setShowText(true)
      dataIdportfolio = resultPortfolio?.filter(
        (i) => i.portfolio_name === wall
      )
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/get_exchange_list_OfPortfolio`,
          {
            params: { portfolio_id: dataIdportfolio?.[0]?.portfolio_id }
          }
        )
        .then((response) => {
          setValueNew(new Date())
          setValue(new Date(moment().subtract('months', 1)))
          if (response.data.length == 0) {
            setAlertNoTransact(true)
          } else {
            setDefaultExchange(response.data?.[0]?.exchange_name)
            setResultExchange(response.data)
          }

        })
    }
  }

  const handleToken = (e, i) => {

    // console.log(i,e)
    // if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
    // if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
    // console.log(e.target.value)



    setResultFilter1([])
    setTronFiltData([])
    setCombFiltData([])
    
    // var r1 = result11.filter(
    //   (item) =>
    //     new Date(item.transaction_time).getTime() / 1000 >= d1 &&
    //     new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount) >= 1
    // );
    // var r2 = tronTransaction.filter(
    //   (item) =>
    //     item.timestamp / 1000 >= d1 &&
    //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
    // );
    // var r3 = combinedTransaction.filter(
    //   (item) =>
    //     item.date >= d1 &&
    //     item.date <= d2 && Math.abs(item.return_amount1) >= 1
    // );
    // if (r1.length == 0 && resultAddress.length > 0) {
    //   setCombFiltData([])
    //   setAlertNoTransaction(true)
    // } else if (resultAddress.length == 0) {
    //   setAlertNoTransact(true)
    // }
    // else if (r2.length == 0 && resultAddress.length > 0) {
    //   setAlertNoTransaction(true)
    // } else if (resultAddress.length == 0) {
    //   setAlertNoTransact(true)
    // }
    // else if (r3.length == 0 && resultAddress.length > 0) {
    //   setAlertNoTransaction(true)
    // } else if (resultAddress.length == 0) {
    //   setAlertNoTransact(true)
    // }
    // console.log(defaultToken,e.target.value,r1,addressArray,defaultAddressType)
    // console.log(e.target.value)
    // if(e.target.value.includes('ALL')==true){
    //   setDefaultToken(['USDT','USDC','ETH','ALL'])
    // }else{
     if(days==30){
      setDays(30)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 1)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT','ETH','TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        e.target.value = ['ETH','USDT','USDC']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH','BTC'])
      }
     else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }  else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)
  }else if(days==90){
    setDays(90)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 3)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 3))).getFullYear(), new Date(new Date(moment().subtract('months', 3))).getMonth() + 1, new Date(new Date(moment().subtract('months', 3))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } 
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }


    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)

  }else if(days==180){
    setDays(180)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 6)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 6))).getFullYear(), new Date(new Date(moment().subtract('months', 6))).getMonth() + 1, new Date(new Date(moment().subtract('months', 6))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } 
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }


    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)

  }
  else if(days==365){
    setDays(180)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 12)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 12))).getFullYear(), new Date(new Date(moment().subtract('months', 12))).getMonth() + 1, new Date(new Date(moment().subtract('months', 12))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } 
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }


    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)

  }else if(days==1095){
    setDays(1095)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 36)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 36))).getFullYear(), new Date(new Date(moment().subtract('months', 36))).getMonth() + 1, new Date(new Date(moment().subtract('months', 36))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } 
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }


    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)

  }
  else if(days==1825){
    setDays(1825)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 60)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 60))).getFullYear(), new Date(new Date(moment().subtract('months', 60))).getMonth() + 1, new Date(new Date(moment().subtract('months', 60))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } 
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }


    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)

  } else if(days==3650){
    setDays(3650)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 120)))
    const d1 = new Date([new Date(new Date(moment().subtract('months', 120))).getFullYear(), new Date(new Date(moment().subtract('months', 120))).getMonth() + 1, new Date(new Date(moment().subtract('months', 120))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultAddressType.includes('ALL') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX') || !e.target.value.includes('ETH') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX','ETH','BTC']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX') && e.target.value.includes('BTC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setCombFiltData([])
      } 
      if (e.target.value.includes('ALL') == true) {
        
         e.target.value = ['ALL','ETH', 'USDT', 'USDC','TRX','BTC']
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,e.target.value)
      setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
        e.target.value = [ 'ETH', 'USDT','USDC','TRX']
     const p = result2.filter(i => i.wallet_name==defaultWallet)
     const p1 = p?.[0]?.portfolio_id
     const w1= p?.[0]?.walletId
     combinedTrans(p1,w1,d1,d2,e.target.value)
     setDefaultToken(e.target.value)
     }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
      e.target.value = [ 'USDT', 'USDC','TRX','BTC']
   const p = result2.filter(i => i.wallet_name==defaultWallet)
   const p1 = p?.[0]?.portfolio_id
   const w1= p?.[0]?.walletId
   combinedTrans(p1,w1,d1,d2,e.target.value)
   setDefaultToken(e.target.value)
    }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
    e.target.value = [ 'USDT', 'USDC','ETH','TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDT', 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT', 'USDC','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'USDC','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'USDC','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT', 'ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'TRX','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT', 'ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        
  e.target.value = [ 'USDT','ETH']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDT','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDT','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        
  e.target.value = [ 'USDC','ETH','TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        
  e.target.value = [ 'USDC','ETH','BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true ) {
        
    e.target.value = [ 'USDC', 'ETH']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 } else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        
  e.target.value = [ 'USDC', 'BTC']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
 else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true ) {
        
  e.target.value = [ 'ETH', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true ) {
        
    e.target.value = [ 'TRX', 'BTC']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
 else if (e.target.value.includes('USDT') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('USDC') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}else if (e.target.value.includes('ETH') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
else if (e.target.value.includes('TRX') ) {
        
  // e.target.value = [ 'USDC', 'TRX']
const p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
combinedTrans(p1,w1,d1,d2,e.target.value)
setDefaultToken(e.target.value)
}
   else if (e.target.value.includes('BTC') ) {
        
    // e.target.value = [ 'USDC', 'TRX']
 const p = result2.filter(i => i.wallet_name==defaultWallet)
 const p1 = p?.[0]?.portfolio_id
 const w1= p?.[0]?.walletId
 combinedTrans(p1,w1,d1,d2,e.target.value)
 setDefaultToken(e.target.value)
 }
    
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        e.target.value = ['ETH','USDT','USDC','TRX']
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        // console.log(e.target.value)
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC','BTC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      } else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('TRX') == true && e.target.value.includes('USDT') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['TRX','USDT']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true  ) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        let allToken=['USDT','USDC']
        combinedTrans(p1,w1,d1,d2,allToken)
        setDefaultToken(allToken)
      }
       else if (e.target.value.includes('TRX') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['TRX', 'BTC'])
      }
       else if (e.target.value.includes('TRX') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } 
      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }


    } else if (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) {
      if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(['USDT', 'USDC', 'ETH', 'BTC'])
      }
      else if (e.target.value.includes('USDT') == true && e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)


      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)

      } else if (e.target.value.includes('USDC') == true && e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true && e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('BTC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

      else if (e.target.value.includes('USDT') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDC') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('ETH') == true) {
        const p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
        combinedTrans(p1,w1,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }

    } else if (defaultAddressType.includes('ERC') === true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setResultFilter1([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('ETH') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'ETH']
        ethtransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('ETH') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        ethtransaction(defaultAddress,d1,d2,e.target.value)
      }
    }

    else if (defaultAddressType.includes('TRC') == true) {
      if ((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
      if ((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')) && i.props.value != 'ALL') e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
      // console.log(e.target.value)
      if ((!e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value = []
        setDefaultToken([])
        setTronFiltData([])
      }
      if (e.target.value.includes('ALL') == true) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['ALL', 'USDT', 'USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
     else if (e.target.value.includes('USDT') && e.target.value.includes('USDC') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'USDC']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('USDC') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDC', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      } else if (e.target.value.includes('USDT') && e.target.value.includes('TRX') ) {
        
        // let otherData = r2.filter(i => i.tokenName == 'trx' || i.tokenName == 'USDT')
        // setTronFiltData(otherData)
        e.target.value = ['USDT', 'TRX']
        trontransaction(defaultAddress,d1,d2,e.target.value)
        setDefaultToken(e.target.value)
      }
      else if (e.target.value.includes('TRX') == true) {

        // let otherData = r2.filter(i => i.tokenName == 'trx')
        // setTronFiltData(otherData)
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      } else if (e.target.value.includes('USDT') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
      else if (e.target.value.includes('USDC') == true) {
        // let otherData = r2.filter(i => i.tokenName == 'USDT')
        setDefaultToken(e.target.value)
        trontransaction(defaultAddress,d1,d2,e.target.value)
      }
    } else if (defaultAddressType.includes('BTC') == true) {
      setDefaultToken(e.target.value)
      btctransaction(defaultAddress,d1,d2,e.target.value)
      // let otherData = r3.filter(i => i.tokenId == 'BTC')
      // // console.log('b',otherData,r2)
      // setCombFiltData(otherData)
      // setDefaultToken(e.target.value)
    }
    setDefaultToken(e.target.value)

  }
  }

  //   const handleToken1=(e)=>{
  //     setDefaultToken1(e.target.value)
  //     setResultFilter1([])
  //   if(e.target.value=='eth'){
  //    let ethData = result11.filter(i=>i.tokens=='eth')
  //    setResultFilter1(ethData)
  //     // console.log('eth',ethData)
  //   }else if(e.target.value=='usdt'){
  //     let ethData = result11.filter(i=>i.tokens=='USDT')
  //     setResultFilter1(ethData)
  //     // console.log('usdt',ethData)
  //   }else if(e.target.value=='usdc'){
  //     let ethData = result11.filter(i=>i.tokens=='USDC')
  //     setResultFilter1(ethData)
  //     // console.log('usdc',ethData)
  //   }
  //   else if(e.target.value=='all'){
  //     let ethData = result11.filter(i=>i.tokens=='USDC' || i.tokens=='USDT' || i.tokens=='eth' )
  //     setResultFilter1(ethData)
  //     // console.log('usdc',ethData)
  //   }
  // }
  // }
  //   }
  const handleClear=()=>{
    // console.log(wall,defaultWallet,defaultAddressType,defaultAddress,days,value,valueNew,defaultToken,)
    setWall()
    setDefaultWallet()
    setDefaultAddressType([])
    setDefaultAddress()
    setDays()
    setValue(null)
    setValueNew(null)
    setResultFilter1([])
    setTronFiltData([])
    setBtcFiltData([])
    setCombFiltData([])
    setDefaultToken([])
    setResultFilter([])
  }
  const handleAddressType = async (e, i) => {
    // console.log(i,e)
    if ((!e.target.value.includes('ERC') || !e.target.value.includes('TRC') || !e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = (e.target.value).filter(item => item != 'ALL')
    if ((e.target.value.includes('ERC') && e.target.value.includes('TRC') && e.target.value.includes('BTC')) && i.props.value != 'ALL') e.target.value = ['ALL', 'ERC', 'TRC', 'BTC']
    // console.log(e.target.value)
    setDefaultAddressType([]) 
    setDefaultToken([])
    setCount(20)   
    setDays(30)
    tdata = undefined
    // console.log(e.target.value)
    // const {
    //   target: { value },
    // } = e;
    // setDefaultAddressType(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );

    addressArray.pop()
    addressArray.push(e.target.value)
    //  console.log(addressArray)
    setTronFiltData([]);
    setBtcFiltData([]);
    setResultFilter1([])
    // addressArray=[]
    // console.log(e.target.value, defaultAddressType,addressArray)
    //  if( addressArray.includes("erc","btc")===true){
    //   console.log('erc,btc')
    //   setResultAddress([])
    //    setCombinedTransaction([])
    //    const p = resultPortfolio.filter(i=>i.portfolio_name===wall)
    //    const p1=p?.[0]?.portfolio_id
    //    combinedTrans(p1)
    // }
    // for(let i=0;i<addressArray.length;i++){
    if ((!addressArray[0].includes('ALL') && (addressArray[0].includes('ERC') && addressArray[0].includes('TRC') && addressArray[0].includes('BTC')))) {//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
      e.target.value = []
      addressArray[0] = []
      setDefaultAddressType([])
      setResultFilter1([])
      setDefaultToken([])

    }
    if (addressArray[0].includes('ALL') === true) {
      setResultAddress([])
      setDefaultAddressType(['ALL', 'ERC', 'TRC', 'BTC'])
      setDefaultToken(['ALL','USDT','USDC','ETH','TRX','BTC'])
      tdata = {}
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
      const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 1)))
      setValueNew(new Date())
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2)
    }
    else if (addressArray[0].includes('ERC') === true && addressArray[0].includes('TRC') === true) {
      setResultAddress([])
      let allToken = ['USDT','USDC','ETH','TRX']
      setDefaultAddressType(['ERC', 'TRC'])
      setDefaultToken(allToken)
      tdata = {}
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
      const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 1)))
      setValueNew(new Date())
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
    }
    else if (addressArray[0].includes('TRC') === true && addressArray[0].includes('BTC') === true) {
      // console.log('BTC,TRC')
      let allToken=['USDT','USDC','TRX','BTC']
      setResultAddress([])
      setDefaultToken(allToken)
      setDefaultAddressType(['TRC','BTC'])
      tdata = {}
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
      const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 1)))
      setValueNew(new Date())
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId 
      combinedTrans(p1,w1,d1,d2,allToken)
    }
    else if (addressArray[0].includes('ERC') === true && addressArray[0].includes('BTC') === true) {
      let allToken=['ETH','USDT','USDC','BTC']
      setResultAddress([])
       setDefaultToken(allToken)
      setDefaultAddressType(['ERC', 'BTC']) 
      tdata = {}
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
      const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 1)))
      setValueNew(new Date())
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
      combinedTrans(p1,w1,d1,d2,allToken)
    }
    else if (addressArray[0].includes('TRC') === true) {
      setResultAddress([])
      //  console.log('TRC')
      setDefaultAddressType(e.target.value)
      setDefaultToken(['ALL', 'TRX', 'USDT', 'USDC'])
      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      // console.log(p)
      await trondata(p1)
    }

    else if (addressArray[0].includes('BTC') === true) {
      setResultAddress([])
      setDefaultAddressType(e.target.value)

      const p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      // console.log(p)
      await btcdata(p1)
    }
    //  else if(addressArray[i].includes('ALL')===true ){
    //   setResultAddress([])
    //    setCombinedTransaction([])
    //    const p = resultPortfolio.filter(i=>i.portfolio_name===wall)
    //    const p1=p?.[0]?.portfolio_id
    //    combinedTrans(p1)
    //    console.log('both')
    // }

    else if (addressArray[0].includes('ERC') === true) {
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
      const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 1)))
      setValueNew(new Date())
      // console.log('abcc')
      setResultAddress([])
      setDefaultAddressType(e.target.value)
      setDefaultToken(['ALL', 'USDT', 'USDC', 'ETH'])
      let p1 = result2.filter(i => i.wallet_name === defaultWallet)
      // console.log(p1)
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
          params: {
            wallet_id: p1?.[0]?.walletId,
            portfolio_id: p1?.[0]?.portfolio_id
          }
        })
        .then((response) => {
          setAlldressData(response.data)
          let p11 = response.data.filter(i => i.wallet_id === p1?.[0]?.walletId)
          if (p11.length > 0) {
            setResultAddress(p11)
            setDefaultAddress(p11?.[0]?.address_id)
            let rs = p11?.[0]?.address_id
            ethtransaction(rs,d1,d2)
            // console.log('eth Add', rs)
          }

          // transactionData = response.data
        })
      // }
    } 
    // else if (addressArray[0].includes('ALL') === true) {

    //   //  addressArray[i].push('ERC','TRC','BTC')
    //   setDefaultAddressType(['ERC', 'TRC', 'BTC', 'ALL'])
    //   setResultAddress([])
    //   tdata = {}
    //   const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    //   const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    //   setValue(new Date(moment().subtract('months', 1)))
    //   setValueNew(new Date())
    //   const p = result2.filter(i => i.wallet_name==defaultWallet)
    //   const p1 = p?.[0]?.portfolio_id
    //   const w1= p?.[0]?.walletId
    //   combinedTrans(p1,w1,d1,d2)
    // }
  }
  // console.log(defaultAddressType)
  const handleChange11 = (event) => {
    const api = resultExchange?.filter((i) => i.exchange_name === event.target.value)
    axios.get(`${process.env.REACT_APP_BASE_URL}/get_exchange_history`, {
      params: { api_key: api?.[0]?.exchange_apikey }
    })
      .then((response) => {
        setResultExchange1(response.data)
        var d2 = Math.floor(new Date().getTime() / 1000);
        var d1 = d2 - 30 * 86400
        setR(true);
        var r = response.data.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      })
  }

  const handleShowComment = (row) => {
    setValidated(false)
    // console.log('row',row)
    if (row?.tron_address_id) {
      setname(row.comment)
      setDataNew(row)
      setAlert(false)
      setShowComment(true)
    } else if (row?.transaction_id) {
      setname(row.comments)
      setDataNew(row)
      setAlert(false)
      setShowComment(true)
    } else if (row?.btc_address_id) {
      setname(row.comment)
      setDataNew(row)
      setAlert(false)
      setShowComment(true)
    } else {
      // console.log('mixed',row)
      setname(row.comment)
      setDataNew(row)
      setAlert(false)
      setShowComment(true)
    }
  }

  const handleEdit1 = (row) => {
    setShowExchangeModal(true)
    setExch_comment(row.comment)
    setApi_key(row.symbol_order_id_api_key)
  }

  const handleSubmitExchange = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/add_comments_exchange_history`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          idkey: api_key,
          comment: exch_comment
        }
      }
      await axios(config)
        .then(function (response) {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/get_exchange_history`, {
              params: { api_key: response.data?.[0]?.api_key }
            })
            .then((response) => {
              setResultFilter3(response.data)
              // var d2 = Math.floor(new Date().getTime() / 1000);
              // var d1 = d2 - 30*86400
              // setR(true);

              // var r = response.data.filter(
              //   (item) =>
              //     Math.floor(item.updated_time / 1000) >= d1 &&
              //     Math.floor(item.updated_time / 1000) <= d2
              // );

              // setResultFilter3(r);
            })
          setAlertExchComment(true)
          setTimeout(() => {
            setShowExchangeModal(false)
            setAlertExchComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
  }

  const handleEdit = (data) => {
    setDataNew(data)
    setInvestment_id(data.investment_id)
    setInvest_name(data.investment_name)
    setInvest_value(data.investment_value)
    setInvest_value(data.investment_value)
    setDate_of_invest(data.date_of_investment)
    setInvest_type(data.investment_type)
    setComment(data.comments)
    setUserId(getId)
    setShowInvestUpdateModal(true)
    setValidated(false)
  }
  var getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')

  const handleUpdateComment = async (e) => {
     e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/comment_investment`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        comment: comment,
        investment_id: investment_id,
        userId: getId
      }
    }
    await axios(config)
      .then(function (response) {
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
            params: { portfolio_id: dataNew?.portfolio_id }
          })
          .then((response) => {
            setResultInv(response.data)
            setValueNew(new Date())
            setValue(new Date(moment().subtract('months', 1)))
            var d2 = Math.floor(new Date().getTime() / 1000);
            var d1 = d2 - 30 * 86400
            setR(true);

            var r = response.data.filter(
              (item) =>
                new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
                new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
            );
            // console.log(r);
            if (r.length == 0 && temp.length > 0) {
              setAlertNoTransaction(true)
            } else if (response.data.length == 0) {
              setAlertNoTransact(true)
            }
            else {
              setResultFilter(r);
            }

          })
        setAlertInvestComment(true)
        setTimeout(() => {
          setAlertInvestComment(false)
          setShowInvestUpdateModal(false)
        }, 3000)
      })
      .catch(function (error) {
        // console.log(error)
      })
    }
  }
  const handleUpdateInvestment = async () => {
    const re = /^[0-9\b]+$/
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/update_investment`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        investment_id,
        invest_name,
        invest_value,
        invest_type,
        date_of_invest,
        comment,
        userId
      }
    }
    await axios(config)
      .then(function (response) {
        setAlertInvestComment(true)
        setTimeout(() => {
          setAlertInvestComment(false)
          setShowInvestUpdateModal(false)
        }, 3000)
      })
      .catch(function (error) {
        // console.log(error)
      })
    handleUpdateComment(comment)

  }
  const [result, setResult] = useState([])
  const [on, setOn] = useState(false)
  const [result1, setResult1] = useState([])
  const [result11, setResult11] = useState([])
  const [wal, setWal] = useState('')
  const [value, setValue] = useState(null)
  const [valueNew, setValueNew] = useState(null)
  const [result2, setResult2] = useState([])
  const [searchTron, setSearchTron] = useState([])
  const [searchBtc, setSearchBtc] = useState([])
  const [resultAddress, setResultAddress] = useState([])
  const [resultPortfolio, setResultPortfolio] = useState([])
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [wd, setWd] = useState('100%')
  const [ml, setMl] = useState('1%')
  const [wall, setWall] = useState('')
  const [alert, setAlert] = useState(false)
  const [defaultWallet, setDefaultWallet] = useState([])
  const handleform = () => {
    setAlert(true)
    setTimeout(setAlert(false), 4000)
  }
  const [m, setm] = useState('-10%')

  const handleChangeDate = (e) => {
    setTronFiltData([]);
    setBtcFiltData([])
    setCombFiltData([])
    setCount(20)
    // console.log(e.target.value)
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    setDays(e.target.value)
    setValueNew(new Date())
     if (e.target.value == 30) {
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
      // console.log(d1,d2)
      setValue(new Date(moment().subtract('months', 1)))

      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          AllAddressType(d1,d2)
      // const p = result2.filter(i => i.wallet_name==defaultWallet)
      // const p1 = p?.[0]?.portfolio_id
      // const w1= p?.[0]?.walletId
      // combinedTrans(p1,w1,d1,d2)
        } else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('TRC') === true) {
          setResultAddress([])
          // let allToken = ['USDT','USDC','ETH','TRX']
          setDefaultAddressType(['ERC', 'TRC'])
          // setDefaultToken(allToken)
          tdata = {}
          ErcTrc(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['ERC', 'BTC']) 
          tdata = {}
          ErcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }
        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          // console.log(r);
          setResultFilter(r);
        }
      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    
    
    } else if (e.target.value == 90) {
      
      const d1 = new Date([new Date(new Date(moment().subtract('months', 3))).getFullYear(), new Date(new Date(moment().subtract('months', 3))).getMonth() + 1, new Date(new Date(moment().subtract('months', 3))).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 3)))
      //  console.log(d1,d2)
      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          // const p = result2.filter(i => i.wallet_name==defaultWallet)
          // const p1 = p?.[0]?.portfolio_id
          // const w1= p?.[0]?.walletId
          // combinedTrans(p1,w1,d1,d2)
          AllAddressType(d1,d2)
        }else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('TRC') === true) {
          setResultAddress([])
          // let allToken = ['USDT','USDC','ETH','TRX']
          setDefaultAddressType(['ERC', 'TRC'])
          // setDefaultToken(allToken)
          tdata = {}
          ErcTrc(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['ERC', 'BTC']) 
          tdata = {}
          ErcBtc(d1,d2)
        }
        else  if (defaultAddressType.includes('ERC') && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // // console.log(r1,d1,d2,tronTransaction)
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }
        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setResultFilter(r);
        }
      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    } else if (e.target.value == 180) {
      // console.log("current Date",d2)
      // console.log("qwqweerwer",e.target.value)
      const d1 = new Date([new Date(new Date(moment().subtract('months', 6))).getFullYear(), new Date(new Date(moment().subtract('months', 6))).getMonth() + 1, new Date(new Date(moment().subtract('months', 6))).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 6)))
      //  console.log(d1,d2);
      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          // const p = result2.filter(i => i.wallet_name==defaultWallet)
          // const p1 = p?.[0]?.portfolio_id
          // const w1= p?.[0]?.walletId
          // combinedTrans(p1,w1,d1,d2)
          AllAddressType(d1,d2)
          
        }else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('TRC') === true) {
          setResultAddress([])
          // let allToken = ['USDT','USDC','ETH','TRX']
          setDefaultAddressType(['ERC', 'TRC'])
          // setDefaultToken(allToken)
          tdata = {}
          AllAddressType(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['ERC', 'BTC']) 
          tdata = {}
          ErcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }

        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setResultFilter(r);
        }

      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    
    }
    else if (e.target.value == 365) {
      // let d2 = Math.floor(new Date().getTime() / 1000);
      const d1 = new Date([new Date(new Date(moment().subtract('months', 12))).getFullYear(), new Date(new Date(moment().subtract('months', 12))).getMonth() + 1, new Date(new Date(moment().subtract('months', 12))).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 12)))
      //  setValueNew(new Date(d2*1000).toLocaleDateString())
      // console.log(d1,d2)
      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          // const p = result2.filter(i => i.wallet_name==defaultWallet)
          // const p1 = p?.[0]?.portfolio_id
          // const w1= p?.[0]?.walletId
          // combinedTrans(p1,w1,d1,d2)
          AllAddressType(d1,d2)
        }else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('TRC') === true) {
          setResultAddress([])
          // let allToken = ['USDT','USDC','ETH','TRX']
          setDefaultAddressType(['ERC', 'TRC'])
          // setDefaultToken(allToken)
          tdata = {}
          ErcTrc(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['ERC', 'BTC']) 
          tdata = {}
          ErcBtc(d1,d2)
        }
         else if (defaultAddressType.includes('ERC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }

        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setResultFilter(r);
        }

        // setR(false)
        // var s = resultInv.filter(item => new Date(item.transaction_time).getTime()/1000 >= d1 && new Date(item.transaction_time).getTime()/1000 <= d2 + 86399)
        // console.log(s);
        // setResult(s);
      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    
    } else if (e.target.value == 1095) {
      // let d2 = Math.floor(new Date().getTime() / 1000);
      const d1 = new Date([new Date(new Date(moment().subtract('months', 36))).getFullYear(), new Date(new Date(moment().subtract('months', 36))).getMonth() + 1, new Date(new Date(moment().subtract('months', 36))).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 36)))
      //  setValueNew(new Date(d2*1000).toLocaleDateString())
      // console.log(d1,d2)
      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          // const p = result2.filter(i => i.wallet_name==defaultWallet)
          // const p1 = p?.[0]?.portfolio_id
          // const w1= p?.[0]?.walletId
          // combinedTrans(p1,w1,d1,d2)
          AllAddressType(d1,d2)
        }else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('TRC') === true) {
          setResultAddress([])
          // let allToken = ['USDT','USDC','ETH','TRX']
          setDefaultAddressType(['ERC', 'TRC'])
          // setDefaultToken(allToken)
          tdata = {}
          ErcTrc(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['ERC', 'BTC']) 
          tdata = {}
          ErcBtc(d1,d2)
        }
         else if (defaultAddressType.includes('ERC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }

        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setResultFilter(r);
        }

        // setR(false)
        // var s = resultInv.filter(item => new Date(item.transaction_time).getTime()/1000 >= d1 && new Date(item.transaction_time).getTime()/1000 <= d2 + 86399)
        // console.log(s);
        // setResult(s);
      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    } else if (e.target.value == 1825) {
      // let d2 = Math.floor(new Date().getTime() / 1000);
      const d1 = new Date([new Date(new Date(moment().subtract('months', 60))).getFullYear(), new Date(new Date(moment().subtract('months', 60))).getMonth() + 1, new Date(new Date(moment().subtract('months', 60))).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 60)))
      //  setValueNew(new Date(d2*1000).toLocaleDateString())
      // console.log(d1,d2)
      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          // const p = result2.filter(i => i.wallet_name==defaultWallet)
          // const p1 = p?.[0]?.portfolio_id
          // const w1= p?.[0]?.walletId
          // combinedTrans(p1,w1,d1,d2)
          AllAddressType(d1,d2)
        }else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('TRC') === true) {
          setResultAddress([])
          // let allToken = ['USDT','USDC','ETH','TRX']
          setDefaultAddressType(['ERC', 'TRC'])
          // setDefaultToken(allToken)
          tdata = {}
          ErcTrc(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }

        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setResultFilter(r);
        }

        // setR(false)
        // var s = resultInv.filter(item => new Date(item.transaction_time).getTime()/1000 >= d1 && new Date(item.transaction_time).getTime()/1000 <= d2 + 86399)
        // console.log(s);
        // setResult(s);
      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    
    
    
    } else if (e.target.value == 3650) {
      // let d2 = Math.floor(new Date().getTime() / 1000);
      const d1 = new Date([new Date(new Date(moment().subtract('months', 120))).getFullYear(), new Date(new Date(moment().subtract('months', 120))).getMonth() + 1, new Date(new Date(moment().subtract('months', 120))).getDate()].join('/')).getTime() / 1000
      setValue(new Date(moment().subtract('months', 120)))
      //  setValueNew(new Date(d2*1000).toLocaleDateString())
      // console.log(d1,d2)
      if (defaultSelect == "wallet") {
        if (defaultAddressType.includes('ALL') == true) {
          setLoading(true)
          // const p = result2.filter(i => i.wallet_name==defaultWallet)
          // const p1 = p?.[0]?.portfolio_id
          // const w1= p?.[0]?.walletId
          // combinedTrans(p1,w1,d1,d2)
          AllAddressType(d1,d2)
        }
        else if (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['TRC','BTC'])
          tdata = {}
          TrcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') === true && defaultAddressType.includes('BTC') === true) {
          setResultAddress([])
          setDefaultAddressType(['ERC', 'BTC']) 
          tdata = {}
          ErcBtc(d1,d2)
        }
        else if (defaultAddressType.includes('ERC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType.includes('TRC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // var r1 = tronTransaction.filter(
          //   (item) =>
          //     item.timestamp / 1000 >= d1 &&
          //     item.timestamp / 1000 <= d2 && parseFloat(item.USD_amount) >= 1
          // );
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setTronFiltData(r1);
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // setBtcFilt(true);
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     item.time >= d1 &&
          //     item.time <= d2 && Math.abs(item.usd_result) >= 1
          // );
          // // console.log(r1);
          // if (r1.length == 0) {
          //   setAlertNoTransaction(true)
          // } else {
          //   setBtcFiltData(r1);
          // }

        } 
      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) =>
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        );
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setResultFilter(r);
        }

        // setR(false)
        // var s = resultInv.filter(item => new Date(item.transaction_time).getTime()/1000 >= d1 && new Date(item.transaction_time).getTime()/1000 <= d2 + 86399)
        // console.log(s);
        // setResult(s);
      } else if (defaultSelect == "exchange") {
        setR(true);
        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }

      }
    
    }
  }

  // console.log('value',value)
  const handleToggle = () => {
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setm('-10%')
      setMl('-11%')
      setWd('110%')
      setMargin('8%')
      setWidthData('-4%')
    } else {
      setNewWidth('10')
      setm('1.8%')
      setW('100%')
      setWd('100%')
      setMl('-1%')
      setMargin('22%')
      setWidthData('6%')
    }
    setShowDashboard(!showDashboard)
  }

  const loadFunctionGetAllWallets = async () => {
    const x = []
    const y = []
    const z = ''
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    await axios(config).then(function (response) {
      setDefaultWallet('')
      setDefaultAddress('')
      const arr = []
      const rs = response.data
      if (roleId.includes('accountant') === true && roleId.includes('admin') === false) {
        const a = acdata?.filter(i => i.accountant_id === getId)
        a?.forEach(el => {
          const m = rs?.filter(j => j.portfolio_id === el.portfolio_id)
          // console.log(m)
          if (m.length > 0) {
            const me = { ...m }
            arr.push(Object.values(me)[0])
          }
        })
        // console.log(arr)
        setWall(arr?.[0]?.portfolio_name)
        setResultPortfolio(arr)
        let p1 = arr?.[0]?.portfolio_id
        wallet(p1)
      }  else if (wdata != undefined ) {
        const pn = rs?.filter(i => i.portfolio_name === wdata)
        const pi = pn?.[0]?.portfolio_id
        setWall(pn?.[0]?.portfolio_name)
         wallet(pi)
        // combinedTrans(pi)
        // trondata(pi)
        setResultPortfolio(rs)
       
      }else if (port2wallet?.p_id != undefined ) {
        const pn = rs?.filter(i => i.portfolio_id === port2wallet.p_id)
        const pi = pn?.[0]?.portfolio_id
        setWall(pn?.[0]?.portfolio_name)
         wallet(port2wallet.p_id)
        // combinedTrans(pi)
        // trondata(pi)
        setResultPortfolio(rs)
       
      }
       else if (tdata != undefined && tdata.address_list != undefined) {
        const pn = rs?.filter(i => i.portfolio_id === tdata.portfolio_id)
        const pi = pn?.[0]?.portfolio_id
        setWall(pn?.[0]?.portfolio_name)
        // trondata(pi)
        setResultPortfolio(rs)
        wallet(pi)
      }
      else {
        setResultPortfolio(rs)
        setWall(rs?.[0]?.portfolio_name)
        const p = rs?.[0].portfolio_id
        // trondata(p)
        wallet(p)
      }
      // else if (tdata !== undefined) {
      //   const pt = rs?.filter(i => i.portfolio_id === tdata.portfolio_id)
      //   const ptt = pt?.[0]?.portfolio_id
      //    trondata(ptt)
      //   wallet(ptt)
      //   setWall(pt?.[0]?.portfolio_name)
      // } 

      // setWall(rs?.[0]?.portfolio_name)

    })
  }
 
  const handleSubmitFormTron = async (e) => {
    //  console.log(dataNew,name);
     const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
     if(days===30){
    //  const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
     const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          // setDefaultToken([...defaultToken])
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
     else if (dataNew?.address_type==='BTC' ) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 
  }else if(days==90){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 3))).getFullYear(), new Date(new Date(moment().subtract('months', 3))).getMonth() + 1, new Date(new Date(moment().subtract('months', 3))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
     else if (dataNew?.address_type==='BTC') {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 
  }else if(days==180){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 6))).getFullYear(), new Date(new Date(moment().subtract('months', 6))).getMonth() + 1, new Date(new Date(moment().subtract('months', 6))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
     else if (dataNew?.address_type==='BTC') {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 

  }else if(days==365){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 12))).getFullYear(), new Date(new Date(moment().subtract('months', 12))).getMonth() + 1, new Date(new Date(moment().subtract('months', 12))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
     else if (dataNew?.address_type==='BTC') {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 
  }else if(days==1095){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 36))).getFullYear(), new Date(new Date(moment().subtract('months', 36))).getMonth() + 1, new Date(new Date(moment().subtract('months', 36))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.address_type==='BTC') {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 
  }else if(days==1825){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 60))).getFullYear(), new Date(new Date(moment().subtract('months', 60))).getMonth() + 1, new Date(new Date(moment().subtract('months', 60))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.address_type==='BTC') {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 
  }else if(days==3650){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 120))).getFullYear(), new Date(new Date(moment().subtract('months', 120))).getMonth() + 1, new Date(new Date(moment().subtract('months', 120))).getDate()].join('/')).getTime() / 1000
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    else if (dataNew?.hash) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTronComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash: dataNew?.hash,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          trontransaction(response.data?.[0]?.address_id,d1,d2,defaultToken)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }else if(dataNew?.tokenType) {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/update_all_transactions_comment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2,defaultToken)
          // combinedTrans(dataNew?.portfolio_id)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
     else if (dataNew?.address_type==='BTC') {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateBtcComment`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          hash_id: dataNew?.hash_id,
          comment: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response);
          btctransaction(response.data?.[0]?.btc_address_id,d1,d2)
          // setDays(30)
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
    else if (dataNew?.transaction_id) {
      // console.log(dataNew.transaction_id)
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comments: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0].address_id,d1,d2,defaultToken)
         setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    } 
  }
  }
  // console.log(resultPortfolio)
  const wallet = async (p) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_wallets`, {
        params: { portfolio_id: p }
      })
      .then((response2) => {
        setResult2(response2.data)
         if (tdata !== undefined && tdata.address_list !== undefined) {
          const wi = response2.data?.filter(i => i.walletId === tdata.wallet_id)
          const wii = wi?.[0]?.walletId
          const pii = wi?.[0]?.portfolio_id
          for (let ad of tdata.address_list) {
            if (ad.address_type == 'ETH' && ad.address_id == tvalue) {
              address(pii, wii)
              setDefaultWallet(wi?.[0]?.wallet_name)
            } else if (ad.address_type == 'TRON' && ad.address_id == tvalue) {
              trondata(pii)
              // tronTransaction(tvalue)
              setDefaultWallet(wi?.[0]?.wallet_name)
              // setDefaultAddress(tvalue)
            }
            else if (ad.address_type == 'BTC' && ad.btc_address_id == tvalue) {
              btcdata(pii)
              // tronTransaction(tvalue)
              setDefaultWallet(wi?.[0]?.wallet_name)
              //  setDefaultAddress(tvalue)

            }
          }
        } else if (tdata !== undefined) {
          const wt = response2.data?.filter(i => i.wallet_name === tdata1)
          const wtt = wt?.[0]?.walletId
          const pt = tdata.portfolio_id
          address(pt, wtt)
          setDefaultWallet(wt?.[0]?.wallet_name)
        }else if (wdata !== undefined) {
          // console.log(response2.data)
          const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
          const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
          setValue(new Date(moment().subtract('months', 1)))
          setValueNew(new Date())
          // const wt = response2.data?.filter(i => i.wallet_name === tdata1)
          const wtt = response2.data?.[0]?.walletId
          const pt = p
          setDefaultWallet(response2.data?.[0]?.wallet_name)
          setDefaultAddressType(['ALL','ERC','TRC','BTC'])
          setDefaultToken(['ALL','USDT','USDC','ETH','TRX','BTC'])
          
          combinedTrans(p,wtt,d1,d2)
          // address(pt, wtt)
        }else if (port2wallet?.p_id !== undefined) {
          // console.log(response2.data)
          const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
          const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
          setValue(new Date(moment().subtract('months', 1)))
          setValueNew(new Date())
          // const wt = response2.data?.filter(i => i.wallet_name === tdata1)
          const wtt = response2.data?.filter(i=>i.walletId==port2wallet.w_id)
          setDefaultWallet(wtt?.[0]?.wallet_name)
          setDefaultAddressType(['ALL','ERC','TRC','BTC'])
          setDefaultToken(['ALL','USDT','USDC','ETH','TRX','BTC'])
          
          combinedTrans(port2wallet.p_id,port2wallet.w_id,d1,d2)
          // address(pt, wtt)
        }
         else {
          // console.log(response2.data)
          const w = response2.data?.[0]?.walletId
          const p = response2.data?.[0]?.portfolio_id;
          address(p, w)
          setDefaultWallet(response2.data?.[0]?.wallet_name)
        }
      })
  }
  const address = async (p, w) => {
    const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    setValue(new Date(moment().subtract('months', 1)))
    setValueNew(new Date())
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: w,
          portfolio_id: p
        }
      })
      .then((response3) => {
        for (let a of tronData) {
          // console.log(response3, tronData)
          if (a.wallet_id == w) {
            response3.data.push(a)
          }
        }
        if (tdata !== undefined) {
          let ad = response3.data?.filter(i => i.address_id === tvalue)
          let adi = ad?.[0]?.address_id
          setDefaultAddress(adi)
          setResultAddress(response3.data)
          ethtransaction(adi,d1,d2)
          //  trontransaction(adi)
        }else if (wdata !== undefined && response3.data?.[0].address_type=='ETH') {
          // console.log(response3.data)
          // let ad = response3.data?.filter(i => i.address_id === tvalue)
          let adi = response3.data?.[0]?.address_id
          setDefaultAddress(adi)
          setResultAddress(response3.data)
          ethtransaction(adi,d1,d2)
          //  trontransaction(adi)
        }
         else {
          const wd = response3.data.filter(i => i.wallet_id === w)
          if (wd.length > 0) {
            const rs = wd?.[0]?.address_id
            // console.log(wd, response3, w)
            setDefaultAddress(wd?.[0]?.address_id)
            setResultAddress(wd);
            ethtransaction(rs,d1,d2)
          } else {
            setAlertNoTransact(true)
          }

          // trontransaction(rs)
        }
      })
  }
  // console.log(resultAddress)
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
    await loadFunctionGetAllWallets()
  }, [])
  const refresh_wallet = async () => {
    ethAddr=[]
    btcAddr=[]
    tronAddr=[]
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
    if (defaultSelect === 'wallet') {
      if(days==30){
        const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
        if(defaultAddressType.includes('ALL')){
          setLoading(true)
          let p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
           axios
          .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
            params: {
              wallet_id: w1,
              portfolio_id: p1
            }
          })
          .then((response) => {
           for(let a of response.data){
           ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
           }
            // allAddr.push(response.data)
            // console.log('address',allAddr)
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
              params: {
                portfolio_id: p1,
                address_type: 'BTC'
              },
            }
             axios(config).then(function (response2) {
              let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
              for(let a of w_addr){
                btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "get",
                  url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                  params: {
                    // user_id: getId,
                    portfolio_id: p1,
                    address_type: 'TRON'
                  },
                };
                 axios(config).then(function (response1) {
                  let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                  for(let a of w1_addr){
                    tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                    // allAddr.push({'id':a.address_id, 'type':a.address_type})
                    }
                    var config = {
                      method: "post",
                      url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                      data: {
                       all_data_tron: tronAddr,
                       all_data_btc: btcAddr,
                       all_data_eth: ethAddr
                        
                      },
                    };
                    axios(config).then(function (response) {
                      if(response.data){
                        AllAddressType(d1,d2)
                      //   let allToken= ['ALL','USDT','USDC','ETH','TRX','BTC']
                      //   setDefaultToken(allToken)
                      // combinedTrans(p1,w1,d1,d2)
                      }
                    })                    
                    // console.log(btcAddr,ethAddr,tronAddr)
                })
               
              // allAddr = w_addr.map(record=>{
              //   return {...record, id:record.btc_address_id , type:record.address_type}
              // })
              // console.log(w_addr,allAddr)
            
            })
        })
      }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
        setLoading(true)
        let p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
         axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
          params: {
            wallet_id: w1,
            portfolio_id: p1
          }
        })
        .then((response) => {
         for(let a of response.data){
         ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
         }
          // allAddr.push(response.data)
          // console.log('address',allAddr)
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
            params: {
              portfolio_id: p1,
              address_type: 'BTC'
            },
          }
           axios(config).then(function (response2) {
            let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
            for(let a of w_addr){
              btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "get",
                url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                params: {
                  // user_id: getId,
                  portfolio_id: p1,
                  address_type: 'TRON'
                },
              };
               axios(config).then(function (response1) {
                let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                for(let a of w1_addr){
                  tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                  // allAddr.push({'id':a.address_id, 'type':a.address_type})
                  }
                  var config = {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                    data: {
                     all_data_tron: tronAddr,
                     all_data_btc: btcAddr,
                     all_data_eth: ethAddr
                      
                    },
                  };
                  axios(config).then(function (response) {
                    if(response.data){
                    ErcTrc(d1,d2)
                    }
                  })                    
                  // console.log(btcAddr,ethAddr,tronAddr)
              })
             
            // allAddr = w_addr.map(record=>{
            //   return {...record, id:record.btc_address_id , type:record.address_type}
            // })
            // console.log(w_addr,allAddr)
          
          })
      })
    }else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
      setLoading(true)
      let p = result2.filter(i => i.wallet_name==defaultWallet)
    const p1 = p?.[0]?.portfolio_id
    const w1= p?.[0]?.walletId
       axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: w1,
          portfolio_id: p1
        }
      })
      .then((response) => {
       for(let a of response.data){
       ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
       }
        // allAddr.push(response.data)
        // console.log('address',allAddr)
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
          params: {
            portfolio_id: p1,
            address_type: 'BTC'
          },
        }
         axios(config).then(function (response2) {
          let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
          for(let a of w_addr){
            btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
              params: {
                // user_id: getId,
                portfolio_id: p1,
                address_type: 'TRON'
              },
            };
             axios(config).then(function (response1) {
              let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
              for(let a of w1_addr){
                tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "post",
                  url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                  data: {
                   all_data_tron: tronAddr,
                   all_data_btc: btcAddr,
                   all_data_eth: ethAddr
                    
                  },
                };
                axios(config).then(function (response) {
                  if(response.data){
                    TrcBtc(d1,d2)
                  }
                })                    
                // console.log(btcAddr,ethAddr,tronAddr)
            })
           
          // allAddr = w_addr.map(record=>{
          //   return {...record, id:record.btc_address_id , type:record.address_type}
          // })
          // console.log(w_addr,allAddr)
        
        })
    })
  }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                ErcBtc(d1,d2)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}
       else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
        setLoading(true)
        // setTimeout(async()=>{

        axiosRetry(axios, { retries: 3 });
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
          .then((response) => {
            if (response.data.length > 0) {
              // console.log('',response.data)
              const rd = response.data
              setTimeout(()=>{
              ethtransaction(rd?.[0]?.address_id,d1,d2)
              setLoading(false)
              },2000)
            } 
            setLoading(false)
          })
          
        // },2000)
      } else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
        setLoading(true)
        // console.log('btc')
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
          data: {
            btc_address_id: defaultAddress,
            address_type: 'BTC'
          },
        };
        axios(config).then(function (response) {
          const rd = response.data
          const rs = rd?.[0]?.address_id
          btctransaction(defaultAddress,d1,d2)
          setLoading(false)
        });
      }
      else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
        // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
        // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
        // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
        // while(txn_date==latest_date){
        //   if(txn_date<latest_date){
            setLoading(true)
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
          data: {
            address_id: defaultAddress,
            address_type: "TRON",
            start: new Date().getTime()/1000
          },
        };
        axios(config).then(function (response) {
          const rd = response.data
          const rs = rd?.[0]?.address_id
          trontransaction(defaultAddress,d1,d2)
          setLoading(false)
        })
          // }
        // }
        ;
      }
    } else if(days==90){
      const d1 = new Date([new Date(new Date(moment().subtract('months', 3))).getFullYear(), new Date(new Date(moment().subtract('months', 3))).getMonth() + 1, new Date(new Date(moment().subtract('months', 3))).getDate()].join('/')).getTime() / 1000
      if(defaultAddressType.includes('ALL')){
        setLoading(true)
        let p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
         axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
          params: {
            wallet_id: w1,
            portfolio_id: p1
          }
        })
        .then((response) => {
         for(let a of response.data){
         ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
         }
          // allAddr.push(response.data)
          // console.log('address',allAddr)
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
            params: {
              portfolio_id: p1,
              address_type: 'BTC'
            },
          }
           axios(config).then(function (response2) {
            let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
            for(let a of w_addr){
              btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "get",
                url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                params: {
                  // user_id: getId,
                  portfolio_id: p1,
                  address_type: 'TRON'
                },
              };
               axios(config).then(function (response1) {
                let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                for(let a of w1_addr){
                  tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                  // allAddr.push({'id':a.address_id, 'type':a.address_type})
                  }
                  var config = {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                    data: {
                     all_data_tron: tronAddr,
                     all_data_btc: btcAddr,
                     all_data_eth: ethAddr
                      
                    },
                  };
                  axios(config).then(function (response) {
                    if(response.data){
                      AllAddressType(d1,d2)
                    }
                  })                    
                  // console.log(btcAddr,ethAddr,tronAddr)
              })
             
            // allAddr = w_addr.map(record=>{
            //   return {...record, id:record.btc_address_id , type:record.address_type}
            // })
            // console.log(w_addr,allAddr)
          
          })
      })
    }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
      setLoading(true)
      let p = result2.filter(i => i.wallet_name==defaultWallet)
    const p1 = p?.[0]?.portfolio_id
    const w1= p?.[0]?.walletId
       axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: w1,
          portfolio_id: p1
        }
      })
      .then((response) => {
       for(let a of response.data){
       ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
       }
        // allAddr.push(response.data)
        // console.log('address',allAddr)
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
          params: {
            portfolio_id: p1,
            address_type: 'BTC'
          },
        }
         axios(config).then(function (response2) {
          let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
          for(let a of w_addr){
            btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
              params: {
                // user_id: getId,
                portfolio_id: p1,
                address_type: 'TRON'
              },
            };
             axios(config).then(function (response1) {
              let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
              for(let a of w1_addr){
                tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "post",
                  url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                  data: {
                   all_data_tron: tronAddr,
                   all_data_btc: btcAddr,
                   all_data_eth: ethAddr
                    
                  },
                };
                axios(config).then(function (response) {
                  if(response.data){
                    let allToken = ['USDT','USDC','ETH','TRX']
                    setDefaultToken(allToken)
                  combinedTrans(p1,w1,d1,d2,allToken)
                  }
                })                    
                // console.log(btcAddr,ethAddr,tronAddr)
            })
           
          // allAddr = w_addr.map(record=>{
          //   return {...record, id:record.btc_address_id , type:record.address_type}
          // })
          // console.log(w_addr,allAddr)
        
        })
    })
  }else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                  let allToken=['USDT','USDC','TRX','BTC']
                  setDefaultToken(allToken)
                combinedTrans(p1,w1,d1,d2,allToken)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
  setLoading(true)
  let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
   axios
  .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
    params: {
      wallet_id: w1,
      portfolio_id: p1
    }
  })
  .then((response) => {
   for(let a of response.data){
   ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
   }
    // allAddr.push(response.data)
    // console.log('address',allAddr)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: p1,
        address_type: 'BTC'
      },
    }
     axios(config).then(function (response2) {
      let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
      for(let a of w_addr){
        btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
          params: {
            // user_id: getId,
            portfolio_id: p1,
            address_type: 'TRON'
          },
        };
         axios(config).then(function (response1) {
          let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
          for(let a of w1_addr){
            tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
              data: {
               all_data_tron: tronAddr,
               all_data_btc: btcAddr,
               all_data_eth: ethAddr
                
              },
            };
            axios(config).then(function (response) {
              if(response.data){
                let allToken=['ETH','USDT','USDC','BTC']
                setDefaultToken(allToken)
              combinedTrans(p1,w1,d1,d2,allToken)
              }
            })                    
            // console.log(btcAddr,ethAddr,tronAddr)
        })
       
      // allAddr = w_addr.map(record=>{
      //   return {...record, id:record.btc_address_id , type:record.address_type}
      // })
      // console.log(w_addr,allAddr)
    
    })
})
}  
      else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      setLoading(true)
      // setTimeout(async()=>{

      axiosRetry(axios, { retries: 3 });
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
        .then((response) => {
          if (response.data.length > 0) {
            // console.log('',response.data)
            const rd = response.data
            setTimeout(()=>{
            ethtransaction(rd?.[0]?.address_id,d1,d2)
            setLoading(false)
            },2000)
          } 
          setLoading(false)
        })
        
      // },2000)
    } else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      setLoading(true)
      // console.log('btc')
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
        data: {
          btc_address_id: defaultAddress,
          address_type: 'BTC'
        },
      };
      axios(config).then(function (response) {
        const rd = response.data
        const rs = rd?.[0]?.address_id
        btctransaction(defaultAddress,d1,d2)
        setLoading(false)
      });
    }
    else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
      // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
      // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
      // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
      // while(txn_date==latest_date){
      //   if(txn_date<latest_date){
          setLoading(true)
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
        data: {
          address_id: defaultAddress,
          address_type: "TRON",
          start: new Date().getTime() - (1000 * 1*60)
        },
      };
      axios(config).then(function (response) {
        const rd = response.data
        const rs = rd?.[0]?.address_id
        trontransaction(defaultAddress,d1,d2)
        setLoading(false)
      })
        // }
      // }
      ;
    }
  }else if(days==180){
      const d1 = new Date([new Date(new Date(moment().subtract('months', 6))).getFullYear(), new Date(new Date(moment().subtract('months', 6))).getMonth() + 1, new Date(new Date(moment().subtract('months', 6))).getDate()].join('/')).getTime() / 1000
      if(defaultAddressType.includes('ALL')){
        setLoading(true)
        let p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
         axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
          params: {
            wallet_id: w1,
            portfolio_id: p1
          }
        })
        .then((response) => {
         for(let a of response.data){
         ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
         }
          // allAddr.push(response.data)
          // console.log('address',allAddr)
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
            params: {
              portfolio_id: p1,
              address_type: 'BTC'
            },
          }
           axios(config).then(function (response2) {
            let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
            for(let a of w_addr){
              btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "get",
                url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                params: {
                  // user_id: getId,
                  portfolio_id: p1,
                  address_type: 'TRON'
                },
              };
               axios(config).then(function (response1) {
                let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                for(let a of w1_addr){
                  tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                  // allAddr.push({'id':a.address_id, 'type':a.address_type})
                  }
                  var config = {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                    data: {
                     all_data_tron: tronAddr,
                     all_data_btc: btcAddr,
                     all_data_eth: ethAddr
                      
                    },
                  };
                  axios(config).then(function (response) {
                    if(response.data){
                      AllAddressType(d1,d2)
                    }
                  })                    
                  // console.log(btcAddr,ethAddr,tronAddr)
              })
             
            // allAddr = w_addr.map(record=>{
            //   return {...record, id:record.btc_address_id , type:record.address_type}
            // })
            // console.log(w_addr,allAddr)
          
          })
      })
    }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
      setLoading(true)
      let p = result2.filter(i => i.wallet_name==defaultWallet)
    const p1 = p?.[0]?.portfolio_id
    const w1= p?.[0]?.walletId
       axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: w1,
          portfolio_id: p1
        }
      })
      .then((response) => {
       for(let a of response.data){
       ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
       }
        // allAddr.push(response.data)
        // console.log('address',allAddr)
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
          params: {
            portfolio_id: p1,
            address_type: 'BTC'
          },
        }
         axios(config).then(function (response2) {
          let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
          for(let a of w_addr){
            btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
              params: {
                // user_id: getId,
                portfolio_id: p1,
                address_type: 'TRON'
              },
            };
             axios(config).then(function (response1) {
              let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
              for(let a of w1_addr){
                tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "post",
                  url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                  data: {
                   all_data_tron: tronAddr,
                   all_data_btc: btcAddr,
                   all_data_eth: ethAddr
                    
                  },
                };
                axios(config).then(function (response) {
                  if(response.data){
                   ErcTrc(d1,d2)
                  }
                })                    
                // console.log(btcAddr,ethAddr,tronAddr)
            })
           
          // allAddr = w_addr.map(record=>{
          //   return {...record, id:record.btc_address_id , type:record.address_type}
          // })
          // console.log(w_addr,allAddr)
        
        })
    })
  }else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                 TrcBtc(d1,d2)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
  setLoading(true)
  let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
   axios
  .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
    params: {
      wallet_id: w1,
      portfolio_id: p1
    }
  })
  .then((response) => {
   for(let a of response.data){
   ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
   }
    // allAddr.push(response.data)
    // console.log('address',allAddr)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: p1,
        address_type: 'BTC'
      },
    }
     axios(config).then(function (response2) {
      let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
      for(let a of w_addr){
        btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
          params: {
            // user_id: getId,
            portfolio_id: p1,
            address_type: 'TRON'
          },
        };
         axios(config).then(function (response1) {
          let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
          for(let a of w1_addr){
            tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
              data: {
               all_data_tron: tronAddr,
               all_data_btc: btcAddr,
               all_data_eth: ethAddr
                
              },
            };
            axios(config).then(function (response) {
              if(response.data){
                ErcBtc(d1,d2)
              }
            })                    
            // console.log(btcAddr,ethAddr,tronAddr)
        })
       
      // allAddr = w_addr.map(record=>{
      //   return {...record, id:record.btc_address_id , type:record.address_type}
      // })
      // console.log(w_addr,allAddr)
    
    })
})
}   
      else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
      setLoading(true)
      // setTimeout(async()=>{

      axiosRetry(axios, { retries: 3 });
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
        .then((response) => {
          if (response.data.length > 0) {
            // console.log('',response.data)
            const rd = response.data
            setTimeout(()=>{
            ethtransaction(rd?.[0]?.address_id,d1,d2)
            setLoading(false)
            },2000)
          } 
          setLoading(false)
        })
        
      // },2000)
    } else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
      setLoading(true)
      // console.log('btc')
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
        data: {
          btc_address_id: defaultAddress,
          address_type: 'BTC'
        },
      };
      axios(config).then(function (response) {
        const rd = response.data
        const rs = rd?.[0]?.address_id
        btctransaction(defaultAddress,d1,d2)
        setLoading(false)
      });
    }
    else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
      // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
      // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
      // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
      // while(txn_date==latest_date){
      //   if(txn_date<latest_date){
          setLoading(true)
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
        data: {
          address_id: defaultAddress,
          address_type: "TRON",
          start: new Date().getTime() - (1000 * 1*60)
        },
      };
      axios(config).then(function (response) {
        const rd = response.data
        const rs = rd?.[0]?.address_id
        trontransaction(defaultAddress,d1,d2)
        setLoading(false)
      })
        // }
      // }
      ;
    }
  
  }else if(days==365){
    const d1 = new Date([new Date(new Date(moment().subtract('months', 12))).getFullYear(), new Date(new Date(moment().subtract('months', 12))).getMonth() + 1, new Date(new Date(moment().subtract('months', 12))).getDate()].join('/')).getTime() / 1000
    if(defaultAddressType.includes('ALL')){
      setLoading(true)
      let p = result2.filter(i => i.wallet_name==defaultWallet)
    const p1 = p?.[0]?.portfolio_id
    const w1= p?.[0]?.walletId
       axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: w1,
          portfolio_id: p1
        }
      })
      .then((response) => {
       for(let a of response.data){
       ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
       }
        // allAddr.push(response.data)
        // console.log('address',allAddr)
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
          params: {
            portfolio_id: p1,
            address_type: 'BTC'
          },
        }
         axios(config).then(function (response2) {
          let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
          for(let a of w_addr){
            btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
              params: {
                // user_id: getId,
                portfolio_id: p1,
                address_type: 'TRON'
              },
            };
             axios(config).then(function (response1) {
              let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
              for(let a of w1_addr){
                tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "post",
                  url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                  data: {
                   all_data_tron: tronAddr,
                   all_data_btc: btcAddr,
                   all_data_eth: ethAddr
                    
                  },
                };
                axios(config).then(function (response) {
                  if(response.data){
                    AllAddressType(d1,d2)
                  }
                })                    
                // console.log(btcAddr,ethAddr,tronAddr)
            })
           
          // allAddr = w_addr.map(record=>{
          //   return {...record, id:record.btc_address_id , type:record.address_type}
          // })
          // console.log(w_addr,allAddr)
        
        })
    })
  }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                  ErcTrc(d1,d2)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
  setLoading(true)
  let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
   axios
  .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
    params: {
      wallet_id: w1,
      portfolio_id: p1
    }
  })
  .then((response) => {
   for(let a of response.data){
   ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
   }
    // allAddr.push(response.data)
    // console.log('address',allAddr)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: p1,
        address_type: 'BTC'
      },
    }
     axios(config).then(function (response2) {
      let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
      for(let a of w_addr){
        btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
          params: {
            // user_id: getId,
            portfolio_id: p1,
            address_type: 'TRON'
          },
        };
         axios(config).then(function (response1) {
          let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
          for(let a of w1_addr){
            tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
              data: {
               all_data_tron: tronAddr,
               all_data_btc: btcAddr,
               all_data_eth: ethAddr
                
              },
            };
            axios(config).then(function (response) {
              if(response.data){
              TrcBtc(d1,d2)
              }
            })                    
            // console.log(btcAddr,ethAddr,tronAddr)
        })
       
      // allAddr = w_addr.map(record=>{
      //   return {...record, id:record.btc_address_id , type:record.address_type}
      // })
      // console.log(w_addr,allAddr)
    
    })
})
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
 axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
  params: {
    wallet_id: w1,
    portfolio_id: p1
  }
})
.then((response) => {
 for(let a of response.data){
 ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
 }
  // allAddr.push(response.data)
  // console.log('address',allAddr)
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
    params: {
      portfolio_id: p1,
      address_type: 'BTC'
    },
  }
   axios(config).then(function (response2) {
    let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
    for(let a of w_addr){
      btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
      // allAddr.push({'id':a.address_id, 'type':a.address_type})
      }
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
        params: {
          // user_id: getId,
          portfolio_id: p1,
          address_type: 'TRON'
        },
      };
       axios(config).then(function (response1) {
        let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
        for(let a of w1_addr){
          tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
            data: {
             all_data_tron: tronAddr,
             all_data_btc: btcAddr,
             all_data_eth: ethAddr
              
            },
          };
          axios(config).then(function (response) {
            if(response.data){
            ErcBtc(d1,d2)
            }
          })                    
          // console.log(btcAddr,ethAddr,tronAddr)
      })
     
    // allAddr = w_addr.map(record=>{
    //   return {...record, id:record.btc_address_id , type:record.address_type}
    // })
    // console.log(w_addr,allAddr)
  
  })
})
}
   else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
    setLoading(true)
    // setTimeout(async()=>{

    axiosRetry(axios, { retries: 3 });
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
      .then((response) => {
        if (response.data.length > 0) {
          // console.log('',response.data)
          const rd = response.data
          setTimeout(()=>{
          ethtransaction(rd?.[0]?.address_id,d1,d2)
          setLoading(false)
          },2000)
        } 
        setLoading(false)
      })
      
    // },2000)
  } else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
    setLoading(true)
    // console.log('btc')
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
      data: {
        btc_address_id: defaultAddress,
        address_type: 'BTC'
      },
    };
    axios(config).then(function (response) {
      const rd = response.data
      const rs = rd?.[0]?.address_id
      btctransaction(defaultAddress,d1,d2)
      setLoading(false)
    });
  }
  else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
    // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
    // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
    // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
    // while(txn_date==latest_date){
    //   if(txn_date<latest_date){
        setLoading(true)
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
      data: {
        address_id: defaultAddress,
        address_type: "TRON",
        start: new Date().getTime() - (1000 * 1*60)
      },
    };
    axios(config).then(function (response) {
      const rd = response.data
      const rs = rd?.[0]?.address_id
      trontransaction(defaultAddress,d1,d2)
      setLoading(false)
    })
      // }
    // }
    ;
  }
}else if(days==1095){
  const d1 = new Date([new Date(new Date(moment().subtract('months', 36))).getFullYear(), new Date(new Date(moment().subtract('months', 36))).getMonth() + 1, new Date(new Date(moment().subtract('months', 36))).getDate()].join('/')).getTime() / 1000
  if(defaultAddressType.includes('ALL')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                  AllAddressType(d1,d2)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
  setLoading(true)
  let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
   axios
  .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
    params: {
      wallet_id: w1,
      portfolio_id: p1
    }
  })
  .then((response) => {
   for(let a of response.data){
   ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
   }
    // allAddr.push(response.data)
    // console.log('address',allAddr)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: p1,
        address_type: 'BTC'
      },
    }
     axios(config).then(function (response2) {
      let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
      for(let a of w_addr){
        btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
          params: {
            // user_id: getId,
            portfolio_id: p1,
            address_type: 'TRON'
          },
        };
         axios(config).then(function (response1) {
          let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
          for(let a of w1_addr){
            tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
              data: {
               all_data_tron: tronAddr,
               all_data_btc: btcAddr,
               all_data_eth: ethAddr
                
              },
            };
            axios(config).then(function (response) {
              if(response.data){
                ErcTrc(d1,d2)
              }
            })                    
            // console.log(btcAddr,ethAddr,tronAddr)
        })
       
      // allAddr = w_addr.map(record=>{
      //   return {...record, id:record.btc_address_id , type:record.address_type}
      // })
      // console.log(w_addr,allAddr)
    
    })
})
}else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
 axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
  params: {
    wallet_id: w1,
    portfolio_id: p1
  }
})
.then((response) => {
 for(let a of response.data){
 ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
 }
  // allAddr.push(response.data)
  // console.log('address',allAddr)
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
    params: {
      portfolio_id: p1,
      address_type: 'BTC'
    },
  }
   axios(config).then(function (response2) {
    let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
    for(let a of w_addr){
      btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
      // allAddr.push({'id':a.address_id, 'type':a.address_type})
      }
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
        params: {
          // user_id: getId,
          portfolio_id: p1,
          address_type: 'TRON'
        },
      };
       axios(config).then(function (response1) {
        let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
        for(let a of w1_addr){
          tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
            data: {
             all_data_tron: tronAddr,
             all_data_btc: btcAddr,
             all_data_eth: ethAddr
              
            },
          };
          axios(config).then(function (response) {
            if(response.data){
              TrcBtc(d1,d2)
            }
          })                    
          // console.log(btcAddr,ethAddr,tronAddr)
      })
     
    // allAddr = w_addr.map(record=>{
    //   return {...record, id:record.btc_address_id , type:record.address_type}
    // })
    // console.log(w_addr,allAddr)
  
  })
})
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
params: {
  wallet_id: w1,
  portfolio_id: p1
}
})
.then((response) => {
for(let a of response.data){
ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
}
// allAddr.push(response.data)
// console.log('address',allAddr)
var config = {
  method: "get",
  url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
  params: {
    portfolio_id: p1,
    address_type: 'BTC'
  },
}
 axios(config).then(function (response2) {
  let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
  for(let a of w_addr){
    btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
    // allAddr.push({'id':a.address_id, 'type':a.address_type})
    }
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
      params: {
        // user_id: getId,
        portfolio_id: p1,
        address_type: 'TRON'
      },
    };
     axios(config).then(function (response1) {
      let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
      for(let a of w1_addr){
        tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
          data: {
           all_data_tron: tronAddr,
           all_data_btc: btcAddr,
           all_data_eth: ethAddr
            
          },
        };
        axios(config).then(function (response) {
          if(response.data){
            ErcBtc(d1,d2)
          }
        })                    
        // console.log(btcAddr,ethAddr,tronAddr)
    })
   
  // allAddr = w_addr.map(record=>{
  //   return {...record, id:record.btc_address_id , type:record.address_type}
  // })
  // console.log(w_addr,allAddr)

})
})
}
  else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
  setLoading(true)
  // setTimeout(async()=>{

  axiosRetry(axios, { retries: 3 });
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
    .then((response) => {
      if (response.data.length > 0) {
        // console.log('',response.data)
        const rd = response.data
        setTimeout(()=>{
        ethtransaction(rd?.[0]?.address_id,d1,d2)
        setLoading(false)
        },2000)
      } 
      setLoading(false)
    })
    
  // },2000)
} else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
  setLoading(true)
  // console.log('btc')
  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
    data: {
      btc_address_id: defaultAddress,
      address_type: 'BTC'
    },
  };
  axios(config).then(function (response) {
    const rd = response.data
    const rs = rd?.[0]?.address_id
    btctransaction(defaultAddress,d1,d2)
    setLoading(false)
  });
}
else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
  // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
  // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
  // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
  // while(txn_date==latest_date){
  //   if(txn_date<latest_date){
      setLoading(true)
  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
    data: {
      address_id: defaultAddress,
      address_type: "TRON",
      start: new Date().getTime() - (1000 * 1*60)
    },
  };
  axios(config).then(function (response) {
    const rd = response.data
    const rs = rd?.[0]?.address_id
    trontransaction(defaultAddress,d1,d2)
    setLoading(false)
  })
    // }
  // }
  ;
}
}else if(days==1825){
  const d1 = new Date([new Date(new Date(moment().subtract('months', 60))).getFullYear(), new Date(new Date(moment().subtract('months', 60))).getMonth() + 1, new Date(new Date(moment().subtract('months', 60))).getDate()].join('/')).getTime() / 1000
  if(defaultAddressType.includes('ALL')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                 AllAddressType(d1,d2)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
  setLoading(true)
  let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
   axios
  .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
    params: {
      wallet_id: w1,
      portfolio_id: p1
    }
  })
  .then((response) => {
   for(let a of response.data){
   ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
   }
    // allAddr.push(response.data)
    // console.log('address',allAddr)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: p1,
        address_type: 'BTC'
      },
    }
     axios(config).then(function (response2) {
      let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
      for(let a of w_addr){
        btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
          params: {
            // user_id: getId,
            portfolio_id: p1,
            address_type: 'TRON'
          },
        };
         axios(config).then(function (response1) {
          let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
          for(let a of w1_addr){
            tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
              data: {
               all_data_tron: tronAddr,
               all_data_btc: btcAddr,
               all_data_eth: ethAddr
                
              },
            };
            axios(config).then(function (response) {
              if(response.data){
                ErcTrc(d1,d2)
              }
            })                    
            // console.log(btcAddr,ethAddr,tronAddr)
        })
       
      // allAddr = w_addr.map(record=>{
      //   return {...record, id:record.btc_address_id , type:record.address_type}
      // })
      // console.log(w_addr,allAddr)
    
    })
})
}else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
 axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
  params: {
    wallet_id: w1,
    portfolio_id: p1
  }
})
.then((response) => {
 for(let a of response.data){
 ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
 }
  // allAddr.push(response.data)
  // console.log('address',allAddr)
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
    params: {
      portfolio_id: p1,
      address_type: 'BTC'
    },
  }
   axios(config).then(function (response2) {
    let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
    for(let a of w_addr){
      btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
      // allAddr.push({'id':a.address_id, 'type':a.address_type})
      }
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
        params: {
          // user_id: getId,
          portfolio_id: p1,
          address_type: 'TRON'
        },
      };
       axios(config).then(function (response1) {
        let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
        for(let a of w1_addr){
          tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
            data: {
             all_data_tron: tronAddr,
             all_data_btc: btcAddr,
             all_data_eth: ethAddr
              
            },
          };
          axios(config).then(function (response) {
            if(response.data){
              TrcBtc(d1,d2)
            }
          })                    
          // console.log(btcAddr,ethAddr,tronAddr)
      })
     
    // allAddr = w_addr.map(record=>{
    //   return {...record, id:record.btc_address_id , type:record.address_type}
    // })
    // console.log(w_addr,allAddr)
  
  })
})
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
params: {
  wallet_id: w1,
  portfolio_id: p1
}
})
.then((response) => {
for(let a of response.data){
ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
}
// allAddr.push(response.data)
// console.log('address',allAddr)
var config = {
  method: "get",
  url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
  params: {
    portfolio_id: p1,
    address_type: 'BTC'
  },
}
 axios(config).then(function (response2) {
  let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
  for(let a of w_addr){
    btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
    // allAddr.push({'id':a.address_id, 'type':a.address_type})
    }
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
      params: {
        // user_id: getId,
        portfolio_id: p1,
        address_type: 'TRON'
      },
    };
     axios(config).then(function (response1) {
      let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
      for(let a of w1_addr){
        tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
          data: {
           all_data_tron: tronAddr,
           all_data_btc: btcAddr,
           all_data_eth: ethAddr
            
          },
        };
        axios(config).then(function (response) {
          if(response.data){
            ErcBtc(d1,d2)
          }
        })                    
        // console.log(btcAddr,ethAddr,tronAddr)
    })
   
  // allAddr = w_addr.map(record=>{
  //   return {...record, id:record.btc_address_id , type:record.address_type}
  // })
  // console.log(w_addr,allAddr)

})
})
}
else  if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
  setLoading(true)
  // setTimeout(async()=>{

  axiosRetry(axios, { retries: 3 });
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
    .then((response) => {
      if (response.data.length > 0) {
        // console.log('',response.data)
        const rd = response.data
        setTimeout(()=>{
        ethtransaction(rd?.[0]?.address_id,d1,d2)
        setLoading(false)
        },2000)
      } 
      setLoading(false)
    })
    
  // },2000)
} else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
  setLoading(true)
  // console.log('btc')
  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
    data: {
      btc_address_id: defaultAddress,
      address_type: 'BTC'
    },
  };
  axios(config).then(function (response) {
    const rd = response.data
    const rs = rd?.[0]?.address_id
    btctransaction(defaultAddress,d1,d2)
    setLoading(false)
  });
}
else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
  // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
  // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
  // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
  // while(txn_date==latest_date){
  //   if(txn_date<latest_date){
      setLoading(true)
  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
    data: {
      address_id: defaultAddress,
      address_type: "TRON",
      start: new Date().getTime() - (1000 * 1*60)
    },
  };
  axios(config).then(function (response) {
    const rd = response.data
    const rs = rd?.[0]?.address_id
    trontransaction(defaultAddress,d1,d2)
    setLoading(false)
  })
    // }
  // }
  ;
}
}else if(days==3650){
  const d1 = new Date([new Date(new Date(moment().subtract('months', 120))).getFullYear(), new Date(new Date(moment().subtract('months', 120))).getMonth() + 1, new Date(new Date(moment().subtract('months', 120))).getDate()].join('/')).getTime() / 1000
 
  
  if(defaultAddressType.includes('ALL')){
    setLoading(true)
    let p = result2.filter(i => i.wallet_name==defaultWallet)
  const p1 = p?.[0]?.portfolio_id
  const w1= p?.[0]?.walletId
     axios
    .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
      params: {
        wallet_id: w1,
        portfolio_id: p1
      }
    })
    .then((response) => {
     for(let a of response.data){
     ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
     }
      // allAddr.push(response.data)
      // console.log('address',allAddr)
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
        params: {
          portfolio_id: p1,
          address_type: 'BTC'
        },
      }
       axios(config).then(function (response2) {
        let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
        for(let a of w_addr){
          btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
            params: {
              // user_id: getId,
              portfolio_id: p1,
              address_type: 'TRON'
            },
          };
           axios(config).then(function (response1) {
            let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
            for(let a of w1_addr){
              tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "post",
                url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                data: {
                 all_data_tron: tronAddr,
                 all_data_btc: btcAddr,
                 all_data_eth: ethAddr
                  
                },
              };
              axios(config).then(function (response) {
                if(response.data){
                  AllAddressType(d1,d2)
                }
              })                    
              // console.log(btcAddr,ethAddr,tronAddr)
          })
         
        // allAddr = w_addr.map(record=>{
        //   return {...record, id:record.btc_address_id , type:record.address_type}
        // })
        // console.log(w_addr,allAddr)
      
      })
  })
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
  setLoading(true)
  let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
   axios
  .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
    params: {
      wallet_id: w1,
      portfolio_id: p1
    }
  })
  .then((response) => {
   for(let a of response.data){
   ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
   }
    // allAddr.push(response.data)
    // console.log('address',allAddr)
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
      params: {
        portfolio_id: p1,
        address_type: 'BTC'
      },
    }
     axios(config).then(function (response2) {
      let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
      for(let a of w_addr){
        btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
          params: {
            // user_id: getId,
            portfolio_id: p1,
            address_type: 'TRON'
          },
        };
         axios(config).then(function (response1) {
          let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
          for(let a of w1_addr){
            tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
              data: {
               all_data_tron: tronAddr,
               all_data_btc: btcAddr,
               all_data_eth: ethAddr
                
              },
            };
            axios(config).then(function (response) {
              if(response.data){
               ErcTrc(d1,d2)
              }
            })                    
            // console.log(btcAddr,ethAddr,tronAddr)
        })
       
      // allAddr = w_addr.map(record=>{
      //   return {...record, id:record.btc_address_id , type:record.address_type}
      // })
      // console.log(w_addr,allAddr)
    
    })
})
}else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
 axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
  params: {
    wallet_id: w1,
    portfolio_id: p1
  }
})
.then((response) => {
 for(let a of response.data){
 ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
 }
  // allAddr.push(response.data)
  // console.log('address',allAddr)
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
    params: {
      portfolio_id: p1,
      address_type: 'BTC'
    },
  }
   axios(config).then(function (response2) {
    let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
    for(let a of w_addr){
      btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
      // allAddr.push({'id':a.address_id, 'type':a.address_type})
      }
      var config = {
        method: "get",
        url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
        params: {
          // user_id: getId,
          portfolio_id: p1,
          address_type: 'TRON'
        },
      };
       axios(config).then(function (response1) {
        let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
        for(let a of w1_addr){
          tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
          // allAddr.push({'id':a.address_id, 'type':a.address_type})
          }
          var config = {
            method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
            data: {
             all_data_tron: tronAddr,
             all_data_btc: btcAddr,
             all_data_eth: ethAddr
              
            },
          };
          axios(config).then(function (response) {
            if(response.data){
              TrcBtc(d1,d2)
            }
          })                    
          // console.log(btcAddr,ethAddr,tronAddr)
      })
     
    // allAddr = w_addr.map(record=>{
    //   return {...record, id:record.btc_address_id , type:record.address_type}
    // })
    // console.log(w_addr,allAddr)
  
  })
})
}else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
setLoading(true)
let p = result2.filter(i => i.wallet_name==defaultWallet)
const p1 = p?.[0]?.portfolio_id
const w1= p?.[0]?.walletId
axios
.get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
params: {
  wallet_id: w1,
  portfolio_id: p1
}
})
.then((response) => {
for(let a of response.data){
ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
}
// allAddr.push(response.data)
// console.log('address',allAddr)
var config = {
  method: "get",
  url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
  params: {
    portfolio_id: p1,
    address_type: 'BTC'
  },
}
 axios(config).then(function (response2) {
  let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
  for(let a of w_addr){
    btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
    // allAddr.push({'id':a.address_id, 'type':a.address_type})
    }
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
      params: {
        // user_id: getId,
        portfolio_id: p1,
        address_type: 'TRON'
      },
    };
     axios(config).then(function (response1) {
      let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
      for(let a of w1_addr){
        tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
        // allAddr.push({'id':a.address_id, 'type':a.address_type})
        }
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
          data: {
           all_data_tron: tronAddr,
           all_data_btc: btcAddr,
           all_data_eth: ethAddr
            
          },
        };
        axios(config).then(function (response) {
          if(response.data){
           ErcBtc(d1,d2)
          }
        })                    
        // console.log(btcAddr,ethAddr,tronAddr)
    })
   
  // allAddr = w_addr.map(record=>{
  //   return {...record, id:record.btc_address_id , type:record.address_type}
  // })
  // console.log(w_addr,allAddr)

})
})
}  else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
  setLoading(true)
  // setTimeout(async()=>{

  axiosRetry(axios, { retries: 3 });
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
    .then((response) => {
      if (response.data.length > 0) {
        // console.log('',response.data)
        const rd = response.data
        setTimeout(()=>{
        ethtransaction(rd?.[0]?.address_id,d1,d2)
        setLoading(false)
        },2000)
      } 
      setLoading(false)
    })
    
  // },2000)
} else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
  setLoading(true)
  // console.log('btc')
  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
    data: {
      btc_address_id: defaultAddress,
      address_type: 'BTC'
    },
  };
  axios(config).then(function (response) {
    const rd = response.data
    const rs = rd?.[0]?.address_id
    btctransaction(defaultAddress,d1,d2)
    setLoading(false)
  });
}
else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
  // let latest_date=new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000
  // let txn_date =new Date([new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear(), new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getMonth() + 1, new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getDate()].join('/')).getTime() / 1000
  // console.log(new Date([new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()].join('/')).getTime() / 1000,tronTransaction.slice(1)[0].timestamp,new Date(parseInt(tronTransaction.slice(1)[0].timestamp)).getFullYear())
  // while(txn_date==latest_date){
  //   if(txn_date<latest_date){
      setLoading(true)
  var config = {
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
    data: {
      address_id: defaultAddress,
      address_type: "TRON",
      start: new Date().getTime() - (1000 * 1*60)
    },
  };
  axios(config).then(function (response) {
    const rd = response.data
    const rs = rd?.[0]?.address_id
    trontransaction(defaultAddress,d1,d2)
    setLoading(false)
  })
    // }
  // }
  ;
}
}
    } else if (defaultSelect == 'investment' && resultInv.length > 0) {
      setLoading(true)
      setResultFilter([])
      dataIdportfolio = resultPortfolio?.filter(
        (i) => i.portfolio_name == wall
      )
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
          params: { portfolio_id: dataIdportfolio?.[0]?.portfolio_id }
        })
        .then((response) => {
          if (response.data.length == 0) {
            setAlertNoTransact(true)
          } else {
            setResultInv(response.data)
            setTimeout(()=>{
              setResultFilter(response.data)
              setLoading(false)
            },2000) 
          }
        })
    }
  }
  
  var dataIdportfolio = []
  const [walletSelect, setWalletSelect] = useState('')
  const handleChange = (event) => {
    tvalue=''
    tdata=undefined
    setResult11([])
    setResultFilter1([])
    setTokenData([])
    setResultAddress([])
    setTronTransaction([])
    setDefaultToken(['ALL', 'USDT', 'USDC', 'ETH'])
    setDefaultAddressType(['ERC'])
    setDays(30)
    setR(false)
    setValueNew(null)
    setValue(null)
    setDefaultAddress('')
    setDefaultWallet('')
    setWall('')
    setDefaultSelect('wallet')
    setShowText(false)
    setWall(event)
    let portfolioId = resultPortfolio?.filter((i) => i.portfolio_name === event)
    // const pid = dataIdportfolio?.[0].portfolio_id
    // console.log(portfolioId)
    wallet(portfolioId?.[0]?.portfolio_id)
    // axios
    //   .get(`${process.env.REACT_APP_BASE_URL}/get_wallets`, {
    //     params: { portfolio_id: pid }
    //   })
    //   .then((response) => {
    //     setResult2(response.data)
    //   })
    // const wal_id = r2?.filter((i) => i.wallet_name === event)
    // // setWalletSelect(wal_id?.[0].walletId)
    // address(pid,response.data?.[0].wallet_id)
    
  }
  let transactionData = []
  let transData = []
  const handleChange1 = (event) => {
    setR(false)
    setResultAddress([])
    setResultFilter1([])
    setTronFiltData([])
    setBtcFiltData([])
    setDefaultAddressType(['ERC'])
    setDefaultWallet(event.target.value)
    const resultWalletData = result2.filter(
      (i) => i.wallet_name === event.target.value
    )
    setSelectedWallet(resultWalletData)
    // setAddressType('erc')
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: resultWalletData[0].walletId,
          portfolio_id: resultWalletData[0]?.portfolio_id
        }
      })
      .then((response) => {
        for (let a of tronData) {
          if (a.wallet_id == resultWalletData[0].walletId) {
            response.data.push(a)
          }
        }

        setResultAddress(response.data)
        transactionData = response.data
      })
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/updateTransactionData`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          transaction_id: dataNew.transaction_id,
          comment: name
        }
      }
      await axios(config)
        .then(function (response) {
          ethtransaction(response.data?.[0]?.address_id,d1,d2)
              // let f = temp2.filter(i=>i.tokens=="eth" || i.tokens=='USDT' || i.tokens=='USDC' )
              //       setResultFilter1(f);

              // setResultFilter1(r1);
              // console.log(temp2);
              // setResult11(temp2);
              // if(days==30){
              //   var d2 = Math.floor(new Date().getTime() / 1000);
              //    var d1 = d2 - 30*86400
              //   console.log(d1,d2)
              //     setR1(true);
              //     var r1 = temp2.filter(
              //       (item) =>
              //         new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              //         new Date(item.transaction_time).getTime() / 1000 <= d2
              //     );
              //     console.log(r1);
              //     setResultFilter1(r1);
              //     } 
          setAlert(true)
          setTimeout(() => {
            setShowComment(false)
          }, 3000)
        })
        .catch(function (error) {
          // console.log(error)
        })
    }
  }
  const handleChange2 = (event) => {
    setR(false)
    setDays(30)
    setValueNew(new Date())
    setValue(new Date(moment().subtract('months', 1)))
    setResultFilter1([])
    setTokenData([])
    setDefaultToken(['ALL', 'USDT', 'USDC', 'ETH'])
    setDefaultAddress(event.target.value)
    const aid = event.target.value
    const f = resultAddress?.filter(i => i.address_id == aid)
    const fi = f?.[0]?.address_id
    const bt = resultAddress?.filter(b => b.btc_address_id == aid)
    setAddressType(f?.[0]?.address_type)
    if (f?.[0]?.address_type == 'TRON') {
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      trontransaction(fi,d1,d2)
      setDefaultAddress(fi)
      // console.log(resultAddress);
    } else if (bt?.[0]?.address_type == 'BTC') {
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      btctransaction(bt?.[0]?.btc_address_id,d1,d2)
      setDefaultAddress(bt?.[0]?.btc_address_id)
      // console.log('btc',resultAddress);
    }
    else {
      const d1 = new Date([new Date(new Date(moment().subtract('months', 1))).getFullYear(), new Date(new Date(moment().subtract('months', 1))).getMonth() + 1, new Date(new Date(moment().subtract('months', 1))).getDate()].join('/')).getTime() / 1000
    const d2 = new Date([new Date(new Date()).getFullYear(), new Date(new Date()).getMonth() + 1, new Date(new Date()).getDate()].join('/')).getTime() / 1000
      setDefaultAddress(fi)
      ethtransaction(fi,d1,d2)
    }
  }
  const r2 = result2?.filter((i) => i.walletId)
  // const r4 = resultAddress?.filter((i) => i.address_id)


  if (resultExchange1) {
    resultExchange1.sort((a, b) => {
      const x = new Date(a.updated_time).getTime() / 1000
      const y = new Date(b.updated_time).getTime() / 1000
      return x > y ? -1 : x < y ? 1 : 0
    })
  }
  const newData = () => {
    ethAddr=[]
    btcAddr=[]
    tronAddr=[]
    // setCount(20)
    // console.log('ad',addressArray[0])
    
    // setBtcFiltData([]);
    // setTronFiltData([]);
    // setCombFiltData([])
    
     const d1 = new Date([new Date(value).getFullYear(), new Date(value).getMonth() + 1, new Date(value).getDate()].join('/')).getTime() / 1000
     const d2 = new Date([new Date(valueNew).getFullYear(), new Date(valueNew).getMonth() + 1, new Date(valueNew).getDate()].join('/')).getTime() / 1000
    // console.log(d1, d2,new Date(valueNew).getFullYear()-new Date(value).getFullYear())
    console.log(new Date(moment().subtract('months', 1)).getDate(),d1,d2)
    if (d2 > d1 && d1 !== 0 || d1 == d2) {
      if (defaultSelect === 'wallet') {
        if(days==30 && new Date(valueNew-value).getMonth()===1 && new Date(moment().subtract('months', 1)).getDate()==new Date(value).getDate() ){
          if(defaultAddressType.includes('ALL')){
            setLoading(true)
            let p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
             axios
            .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
              params: {
                wallet_id: w1,
                portfolio_id: p1
              }
            })
            .then((response) => {
             for(let a of response.data){
             ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
             }
              // allAddr.push(response.data)
              // console.log('address',allAddr)
              var config = {
                method: "get",
                url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
                params: {
                  portfolio_id: p1,
                  address_type: 'BTC'
                },
              }
               axios(config).then(function (response2) {
                let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
                for(let a of w_addr){
                  btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
                  // allAddr.push({'id':a.address_id, 'type':a.address_type})
                  }
                  var config = {
                    method: "get",
                    url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                    params: {
                      // user_id: getId,
                      portfolio_id: p1,
                      address_type: 'TRON'
                    },
                  };
                   axios(config).then(function (response1) {
                    let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                    for(let a of w1_addr){
                      tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                      // allAddr.push({'id':a.address_id, 'type':a.address_type})
                      }
                      var config = {
                        method: "post",
                        url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                        data: {
                         all_data_tron: tronAddr,
                         all_data_btc: btcAddr,
                         all_data_eth: ethAddr
                          
                        },
                      };
                      axios(config).then(function (response) {
                        if(response.data){
                          AllAddressType(d1,d2)
                        }
                      })                    
                      // console.log(btcAddr,ethAddr,tronAddr)
                  })
                 
                // allAddr = w_addr.map(record=>{
                //   return {...record, id:record.btc_address_id , type:record.address_type}
                // })
                // console.log(w_addr,allAddr)
              
              })
          })
        }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC')){
          setLoading(true)
          let p = result2.filter(i => i.wallet_name==defaultWallet)
        const p1 = p?.[0]?.portfolio_id
        const w1= p?.[0]?.walletId
           axios
          .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
            params: {
              wallet_id: w1,
              portfolio_id: p1
            }
          })
          .then((response) => {
           for(let a of response.data){
           ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
           }
            // allAddr.push(response.data)
            // console.log('address',allAddr)
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
              params: {
                portfolio_id: p1,
                address_type: 'BTC'
              },
            }
             axios(config).then(function (response2) {
              let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
              for(let a of w_addr){
                btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "get",
                  url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                  params: {
                    // user_id: getId,
                    portfolio_id: p1,
                    address_type: 'TRON'
                  },
                };
                 axios(config).then(function (response1) {
                  let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                  for(let a of w1_addr){
                    tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                    // allAddr.push({'id':a.address_id, 'type':a.address_type})
                    }
                    var config = {
                      method: "post",
                      url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                      data: {
                       all_data_tron: tronAddr,
                       all_data_btc: btcAddr,
                       all_data_eth: ethAddr
                        
                      },
                    };
                    axios(config).then(function (response) {
                      if(response.data){
                      ErcTrc(d1,d2)
                      }
                    })                    
                    // console.log(btcAddr,ethAddr,tronAddr)
                })
               
              // allAddr = w_addr.map(record=>{
              //   return {...record, id:record.btc_address_id , type:record.address_type}
              // })
              // console.log(w_addr,allAddr)
            
            })
        })
      }else if(defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC')){
        setLoading(true)
        let p = result2.filter(i => i.wallet_name==defaultWallet)
      const p1 = p?.[0]?.portfolio_id
      const w1= p?.[0]?.walletId
         axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
          params: {
            wallet_id: w1,
            portfolio_id: p1
          }
        })
        .then((response) => {
         for(let a of response.data){
         ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
         }
          // allAddr.push(response.data)
          // console.log('address',allAddr)
          var config = {
            method: "get",
            url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
            params: {
              portfolio_id: p1,
              address_type: 'BTC'
            },
          }
           axios(config).then(function (response2) {
            let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
            for(let a of w_addr){
              btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
              // allAddr.push({'id':a.address_id, 'type':a.address_type})
              }
              var config = {
                method: "get",
                url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
                params: {
                  // user_id: getId,
                  portfolio_id: p1,
                  address_type: 'TRON'
                },
              };
               axios(config).then(function (response1) {
                let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
                for(let a of w1_addr){
                  tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                  // allAddr.push({'id':a.address_id, 'type':a.address_type})
                  }
                  var config = {
                    method: "post",
                    url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                    data: {
                     all_data_tron: tronAddr,
                     all_data_btc: btcAddr,
                     all_data_eth: ethAddr
                      
                    },
                  };
                  axios(config).then(function (response) {
                    if(response.data){
                     TrcBtc(d1,d2)
                    }
                  })                    
                  // console.log(btcAddr,ethAddr,tronAddr)
              })
             
            // allAddr = w_addr.map(record=>{
            //   return {...record, id:record.btc_address_id , type:record.address_type}
            // })
            // console.log(w_addr,allAddr)
          
          })
      })
    }else if(defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC')){
      setLoading(true)
      let p = result2.filter(i => i.wallet_name==defaultWallet)
    const p1 = p?.[0]?.portfolio_id
    const w1= p?.[0]?.walletId
       axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: w1,
          portfolio_id: p1
        }
      })
      .then((response) => {
       for(let a of response.data){
       ethAddr.push({'address_id':a.address_id, 'address_type':a.address_type})
       }
        // allAddr.push(response.data)
        // console.log('address',allAddr)
        var config = {
          method: "get",
          url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
          params: {
            portfolio_id: p1,
            address_type: 'BTC'
          },
        }
         axios(config).then(function (response2) {
          let w_addr = response2.data?.filter(i=>i.wallet_id===w1)
          for(let a of w_addr){
            btcAddr.push({'address_id':a.btc_address_id,'address_type':a.address_type})
            // allAddr.push({'id':a.address_id, 'type':a.address_type})
            }
            var config = {
              method: "get",
              url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
              params: {
                // user_id: getId,
                portfolio_id: p1,
                address_type: 'TRON'
              },
            };
             axios(config).then(function (response1) {
              let w1_addr = response1.data?.filter(i=>i.wallet_id===w1)
              for(let a of w1_addr){
                tronAddr.push({'address_id':a.address_id,'address_type':a.address_type})
                // allAddr.push({'id':a.address_id, 'type':a.address_type})
                }
                var config = {
                  method: "post",
                  url: `${process.env.REACT_APP_BASE_URL}/refresh_all_data`,
                  data: {
                   all_data_tron: tronAddr,
                   all_data_btc: btcAddr,
                   all_data_eth: ethAddr
                    
                  },
                };
                axios(config).then(function (response) {
                  if(response.data){
                    ErcBtc(d1,d2)
                  }
                })                    
                // console.log(btcAddr,ethAddr,tronAddr)
            })
           
          // allAddr = w_addr.map(record=>{
          //   return {...record, id:record.btc_address_id , type:record.address_type}
          // })
          // console.log(w_addr,allAddr)
        
        })
    })
  }
          else if (defaultAddressType.includes('TRC') == true && resultAddress.length > 0) {
            setLoading(true)
            setTronTime('')
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_all_tron_transactions`,
              data: {
                address_id: defaultAddress,
                address_type: 'TRON',
                start: Math.floor(new Date(valueNew).getTime()/1000)
              },
            };
            axios(config).then(function (response) {
              const rd = response.data
              // console.log(rd.data.slice(-1)[0].timestamp)
              // setTronTime(rd.data.slice(-1)[0].timestamp)
              const rs = rd?.[0]?.address_id
              trontransaction(defaultAddress,d1,d2)
              // setLoading(false)
            })
          }else if (defaultAddressType.includes('ERC') == true && resultAddress.length > 0) {
            setLoading(true)
            axiosRetry(axios, { retries: 3 });
            axios
              .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance?address_id=${defaultAddress}`)
              .then((response) => {
                // if (response.data.length > 0) {
                  // console.log('',response.data)
                  const rd = response.data
                  setTimeout(()=>{
                  ethtransaction(rd?.[0]?.address_id,d1,d2)
                  // setLoading(false)
                  },3000)
                // } 
                // setLoading(false)
              })
          }else if (defaultAddressType.includes('BTC') == true && resultAddress.length > 0) {
            setLoading(true)
            // console.log('btc')
            var config = {
              method: "post",
              url: `${process.env.REACT_APP_BASE_URL}/refresh_btc_transaction`,
              data: {
                btc_address_id: defaultAddress,
                address_type: 'BTC'
              },
            };
            axios(config).then(function (response) {
              const rd = response.data
              const rs = rd?.[0]?.address_id
              btctransaction(defaultAddress)
              // setLoading(false)
            });
          }

          setDays(30)
        }else if(days==90 && new Date(valueNew-value).getMonth()===3 && new Date(moment().subtract('months', 3)).getDate()==new Date(value).getDate()){
         setDays(90)
        }else if(days==180 && new Date(valueNew-value).getMonth()===6 && new Date(moment().subtract('months', 6)).getDate()==new Date(value).getDate()){
         setDays(180)
        }else if(days==365 && new Date(valueNew).getFullYear()-new Date(value).getFullYear()===1 && new Date(moment().subtract('months', 12)).getDate()==new Date(value).getDate()){
         setDays(365)
        }else if(days==1095 && new Date(valueNew).getFullYear()-new Date(value).getFullYear()===3 && new Date(moment().subtract('months', 36)).getDate()==new Date(value).getDate()){
         setDays(1095)
        }else if(days==1825 && new Date(valueNew).getFullYear()-new Date(value).getFullYear()===5 && new Date(moment().subtract('months', 60)).getDate()==new Date(value).getDate()){
         setDays(1825)
        }else if(days==3650 && new Date(valueNew).getFullYear()-new Date(value).getFullYear()===10 && new Date(moment().subtract('months', 120)).getDate()==new Date(value).getDate()){
         setDays(3650)
        }else{
        setDays()
        if (defaultAddressType?.includes('ALL') == true || (addressArray?.[0]?.includes('TRC') == true && addressArray?.[0]?.includes('BTC') == true) || (addressArray?.[0]?.includes('BTC') == true && addressArray?.[0]?.includes('ERC') == true) || (addressArray?.[0]?.includes('ERC') == true && addressArray?.[0]?.includes('TRC') == true) || (addressArray?.[0]?.includes('ERC') == true && addressArray?.[0]?.includes('TRC') == true && addressArray?.[0]?.includes('BTC') == true)) {
          setLoading(true)
          const p = result2.filter(i => i.wallet_name==defaultWallet)
          const p1 = p?.[0]?.portfolio_id
          const w1= p?.[0]?.walletId
          combinedTrans(p1,w1,d1,d2)
        } else if (defaultAddressType?.includes('ERC') == true) {

          setLoading(true)
          
          load=true
          ethtransaction(defaultAddress,d1,d2)
        } else if (defaultAddressType?.includes('TRC') == true) {
          setLoading(true)
          load=true
          trontransaction(defaultAddress,d1,d2)
          // setTronFilt(true);
          // let r1 = tronTransaction.filter(
          //   (item) => new Date([new Date(new Date(parseInt(item.timestamp))).getFullYear(), new Date(new Date(parseInt(item.timestamp))).getMonth() + 1, new Date(new Date(parseInt(item.timestamp))).getDate()].join('/')).getTime() / 1000
          //     >= d1 &&
          //     new Date([new Date(new Date(parseInt(item.timestamp))).getFullYear(), new Date(new Date(parseInt(item.timestamp))).getMonth() + 1, new Date(new Date(parseInt(item.timestamp))).getDate()].join('/')).getTime() / 1000 <= d2
          //     && parseFloat(item.USD_amount) >= 1
          // )

          //  console.log(r1,d1,d2,new Date([new Date(new Date(parseInt(tronTransaction?.[0]?.timestamp))).getFullYear(),new Date(new Date(parseInt(tronTransaction?.[0]?.timestamp))).getMonth()+1,new Date(new Date(parseInt(tronTransaction?.[0]?.timestamp))).getDate()].join('/')).getTime()/1000);
          // if (r1.length == 0) {
          //   setTronFiltData([]);
          //   setAlertNoTransact(true)
          // } else {
          //   setLoading(true)
          //   setTimeout(() => {
          //     setLoading(false)
          //     setTronFiltData(r1)
          //   }, 2000)
          // }
        } else if (defaultAddressType.includes('BTC') == true && resultAddress.length>0) {
          setLoading(true)
          load=true
          btctransaction(defaultAddress,d1,d2)
          // console.log(d1,d2)
          // var r1 = btcTransact.filter(
          //   (item) =>
          //     new Date([new Date(new Date(parseInt(item.time) * 1000)).getFullYear(), new Date(new Date(parseInt(item.time) * 1000)).getMonth() + 1, new Date(new Date(parseInt(item.time) * 1000)).getDate()].join('/')).getTime() / 1000
          //     >= d1 &&
          //     new Date([new Date(new Date(parseInt(item.time) * 1000)).getFullYear(), new Date(new Date(parseInt(item.time) * 1000)).getMonth() + 1, new Date(new Date(parseInt(item.time) * 1000)).getDate()].join('/')).getTime() / 1000 <= d2
          //     && Math.abs(item.usd_result) >= 1
          // );
          //   console.log(r1,[new Date(new Date(new Date(parseInt(btcTransact?.[0]?.time)*1000))).getFullYear(),new Date(new Date(new Date(parseInt(btcTransact?.[0]?.time)*1000))).getMonth()+1,new Date(new Date(new Date(parseInt(btcTransact?.[0]?.time)*1000))).getDate()].join('/'));
          // if (r1.length == 0) {
          //   setBtcFiltData([]);
          //   setAlertNoTransact(true)
          // } else {
          //   setLoading(true)
          //   setTimeout(() => {
          //     setLoading(false)
          //     setBtcFiltData(r1);
          //   }, 2000)
          // }
        }
        }
      } else if (defaultSelect === 'investment') {
        setR(true)
        var r = resultInv.filter(
          (item) => new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2
        )
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([])
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([])
          setAlertNoTransact(true)
        }
        else {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setResultFilter(r)
          }, 2000)
        }
       
      } else if (defaultSelect === 'exchange') {
        setR(true)
        const r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        )
        if (r.length == 0) {
          setResultFilter3([])
          setAlertNoTransact(true)
        } else {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setResultFilter3(r)
          }, 2000)
        }

      }
   
    }
     else if (value === null && valueNew) {
      setAlertEmptyT(true)
      setTimeout(() => {
        setAlertEmptyT(false)
      }, 3000)
    }
    else if (value && valueNew === null) {
      let d2 = new Date().getTime() / 1000;
      if (defaultSelect == "wallet") {
        
        // console.log(r1);

      } else if (defaultSelect == "investment") {
        setR(true);
        var r = resultInv.filter(
          (item) => new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 >= d1 &&
            new Date([new Date(item.date_of_investment).getFullYear(), new Date(item.date_of_investment).getMonth() + 1, new Date(item.date_of_investment).getDate()].join('/')).getTime() / 1000 <= d2 && parseFloat(item.return_amount) >= 1
        )
        if (r.length == 0 && resultInv.length > 0) {
          setResultFilter([]);
          setAlertNoTransaction(true)
        } else if (resultInv.length == 0) {
          setResultFilter([]);
          setAlertNoTransact(true)
        }
        else {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            setResultFilter(r)
          }, 2000)
        }

      } else if (defaultSelect == "exchange") {
        setR(true);

        var r = resultExchange1.filter(
          (item) =>
            Math.floor(item.updated_time / 1000) >= d1 &&
            Math.floor(item.updated_time / 1000) <= d2
        );
        if (r.length == 0) {
          setAlertNoTransact(true)
        } else {
          setResultFilter3(r);
        }
      }
    } else if (value === null && valueNew === null) {
      setAlertEmptyT(true)
      setTimeout(() => {
        setAlertEmptyT(false)
      }, 3000)
    } else {
      setAlertTime(true)
      setTimeout(() => {
        setAlertTime(false)
      }, 3000)
    }
   
  }
  const [bigData, setBigData] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  // useEffect(() => {
  //   if(alertNoTransaction){
  //     document.body.style.opacity = 0.5;
  //   } else if(alertNoTransact){
  //     document.body.style.opacity = 0.5;
  //   }
  //   else {
  //     document.body.style.opacity = 1;
  //   }
  //  }, [alertNoTransaction,alertNoTransact])
  const columns = [
    {
      dataField: 'transaction_id',
      text: 'Txn-id',
      sort: true,
      width: 150,
      filter: textFilter({
        placeholder: 'txn',
        getFilter: filter => {
          txnFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const txn = row.transaction_id
        const copyToClipboard2 = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <>
            <span className="namePortData" style={{ cursor: 'pointer' }} onClick={
              () => window.location = `https://etherscan.io/tx/${row.transaction_id}`}>
              {row.transaction_id.slice(0, 5)}
            </span>
            <Tooltip title="Copy to Clipboard">
              {txn != null
                ? (
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboard2(txn)}
                  />
                )
                : (
                  <></>
                )}
            </Tooltip>
          </>
        )
      }
    },
    {
      dataField: 'transaction_time',
      width: 150,
      text: 'Time',
      sort: true,
      hidden: false,
      filter: dateFilter({
        placeholder: 'time',
        getFilter: filter => {
          timeFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p
            style={{
              color: 'white',
              width: '110%',
              fontSize: '14px',
              display: 'inline-block'
            }} >
            <Tooltip title={row.transaction_time}>
              <span style={{ color: 'white', fontSize: '14px' }}>
                {
                  moment(row.transaction_time).format('Do MMMM YYYY, h:mm:ss a')
                }
              </span>
            </Tooltip>
          </p>
        )
      }
    },
    {
      dataField: 'cate_id',
      width: 150,
      text: 'Type',
      sort: true,
      hidden: false,
      filter: textFilter({
        placeholder: 'type',
        getFilter: filter => {
          typeFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', width: '20%', fontSize: '14px' }}>
            {row.cate_id == null
              ? (
                <p style={{ fontSize: '14px' }}>N/A</p>
              )
              : (
                row.cate_id
              )}
          </p>
        )
      }
    },
    {
      dataField: 'asset_chain',
      width: 50,
      text: 'Chain',
      sort: true,
      hidden: false,
      filter: textFilter({
        placeholder: 'chain',
        getFilter: filter => {
          chainFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', width: '20%', fontSize: '14px' }}>
            {row.asset_chain}
          </p>
        )
      }
    },
    {
      dataField: 'recieve_data',
      text: 'Amount',
      sort: true,
      width: 200,
      filter: numberFilter({
        placeholder: 'amount',
        getFilter: filter => {
          amountFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            {row.send_data != null
              ? (
                <li
                  style={{
                    whiteSpace: 'nowrap',
                    color: 'white',
                    fontSize: '14px',
                    color: '#FFC107'
                  }}
                >
                  <span style={{ color: '#FFC107' }}> amount:</span>
                  <span style={{ color: 'white' }}>
                    ${JSON.parse(row.recieve_data)[0]?.amount?.toFixed(5)}
                  </span>
                </li>
              )
              : (
                <li style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
                  {' '}
                  <span style={{ color: '#FFC107' }}>amount: </span>N/A
                </li>
              )}
            {JSON.parse(row.amount)?.eth_gas_fee.toFixed(4) == null
              ? (
                <li
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '14px',
                    color: '#FFC107'
                  }}
                >
                  {' '}
                  <span style={{ color: '#FFC107' }}>gas fee:</span> N/A
                </li>
              )
              : (
                <li
                  style={{
                    whiteSpace: 'nowrap',
                    color: 'white',
                    fontSize: '14px',
                    color: '#FFC107'
                  }}
                >
                  <span style={{ color: '#FFC107' }}>gas fee:</span>
                  <span style={{ color: 'white' }}>
                    ${JSON.parse(row.amount)?.eth_gas_fee.toFixed(4)}
                  </span>
                </li>
              )}
          </>
        )
      }
    },
    {
      dataField: 'comments',
      text: 'Comment',
      sort: true,
      width: 150,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', marginLeft: '1em' }}>
            {row.comments}
          </p>
        )
      }
    },
    {
      dataField: 'amount',
      text: 'Address',
      sort: true,
      width: 150,
      filter: textFilter({
        placeholder: 'address',
        getFilter: filter => {
          addressFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const fr = JSON.parse(row.amount)?.from_addr
        const copyToClipboard = (fr) => {
          copy(fr, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        const to = JSON.parse(row.amount)?.to_addr
        const copyToClipboard1 = (to) => {
          copy(to, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <>
            <li style={{ whiteSpace: 'nowrap', color: '#FFC107' }}>
              {' '}
              <span style={{ color: '#FFC107' }}>from:</span>
              <span style={{ color: 'white' }}>
                {' '}
                {JSON.parse(row.amount)?.from_addr.slice(0, 17)}{' '}
              </span>
              <Tooltip title="Copy to Clipboard">
                {fr != null
                  ? (
                    <Icon
                      icon="cil:copy"
                      style={{
                        cursor: 'pointer',
                        color: '#FFC107',
                        marginLeft: '5px'
                      }}
                      onClick={() => copyToClipboard(fr)}
                    />
                  )
                  : (
                    <></>
                  )}
              </Tooltip>
            </li>
            <li style={{ whiteSpace: 'nowrap', color: '#FFC107' }}>
              <span style={{ color: '#FFC107' }}> to:</span>
              <span style={{ color: 'white' }}>
                {' '}
                {JSON.parse(row.amount)?.to_addr.slice(0, 20)}{' '}
              </span>
              <Tooltip title="Copy to Clipboard">
                {to != null
                  ? (
                    <Icon
                      icon="cil:copy"
                      style={{
                        cursor: 'pointer',
                        color: '#FFC107',
                        marginLeft: '5px'
                      }}
                      onClick={() => copyToClipboard1(to)}
                    />
                  )
                  : (
                    <></>
                  )}
              </Tooltip>
            </li>

          </>
        )
      }
    },

    {
      dataField: '',
      text: 'Action',
      sort: false,
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107' }}
            onClick={() => handleShowComment(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span>
        )
      }
    }
  ]
  const columnsM = [

    {
      dataField: 'hash_id',
      text: 'Hash',
      sort: true,
      hidden: (selectedColumnId?.includes("hash_id") == true),
      toggle: false,
      width: 150,
      filter: textFilter({
        placeholder: 'txn',
        // getFilter: filter => {
        //   txnFilter = filter
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const txn = row.hash_id
        const copyToClipboard2 = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <>
            {/* /<li style={{ whiteSpace: 'nowrap', color: '#F1C40F' }}> */}
            <span className="namePortData" style={{ cursor: 'pointer' }}
             onClick={()=> row.tokenType==='eth' ? window.open(`https://etherscan.io/tx/${row.hash_id}`)
            : row.tokenType==='TRON' ? window.open(`https://tronscan.org/#/transaction/${row?.hash_id}`) :
            window.open(`https://www.blockchain.com/btc/tx/${row.hash_id}`)
            }
            >
              {row?.hash_id != undefined ? row?.hash_id.slice(0, 6) + "..." + row?.hash_id.slice(-4) : <></>}
            </span>
            <Tooltip title="Copy to Clipboard">
              {txn != null
                ? (
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboard2(txn)}
                  />
                )
                : (
                  <></>
                )}
            </Tooltip>
            {/* </li> */}
          </>
        )
      }
    },
    {
      dataField: 'date',
      width: 150,
      text: 'Date',
      sort: true,
      toggle: false,
      hidden: (selectedColumnId?.includes("date") == true),
      filter: dateFilter({
        placeholder: 'date',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
            
          let date1 = moment(row.date).format('Do MMMM YYYY, h:mm:ss a').split(',')
          // console.log('date',date,row.date)
        return (
          <p
            style={{
              color: 'white',
              // width: '110%',
              fontSize: '14px',
              display: 'inline-block'
            }}
          >
            <Tooltip title={date1}>
              <span style={{ color: 'white', fontSize: '14px' }}>
                {date1[0]} <br />
                {date1[1]}
              </span>
            </Tooltip>
          </p>
        )
      }
    },

    {
      dataField: "from_address",
      width: 50,
      text: "From",
      sort: true,
      hidden: (selectedColumnId?.includes("from_address") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'from',
        // getFilter: filter => {
        //   fromFilter = filter;
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const copyToClipboardM = (from) => {
          copy(from, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }

        return (
          <p
            style={{
              color: "white",
              // width: "110%",
              display: "inline-block",
            }}
          >
            {" "}
            {row.tokenType != 'BTC' ?
              <span style={{ color: "white" }}>
                {row.from_address.slice(0, 6) + '...' + row.from_address.slice(-4)}
              </span>
              : "-"}
            <Tooltip title="Copy to Clipboard">
              {row.tokenType != 'BTC'
                ? (
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboardM(row.from_address)}
                  />
                )
                : (
                  <></>
                )}
            </Tooltip>
          </p>
        );
      },
    },
    {
      dataField: "to_address",
      width: 50,
      text: "To",
      sort: true,
      hidden: (selectedColumnId?.includes("to_address") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'to',
        // getFilter: filter => {
        //   toFilter = filter;
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const copyToClipboardM1 = (to) => {
          copy(to, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <p
            style={{
              color: "white",
              // width: "110%",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            {" "}
            {row.tokenType == "TRON" || row.tokenType != "BTC" ?
              <span style={{ color: "white", fontSize: "14px" }}>
                {row.to_address === null ? "-" : row.to_address.slice(0, 6) + '...' + row.to_address.slice(-4)}
                {row.to_address != null ?
                  <Tooltip title="Copy to Clipboard">
                    <Icon
                      icon="cil:copy"
                      style={{
                        cursor: 'pointer',
                        color: '#FFC107',
                        marginLeft: '5px'
                      }}
                      onClick={() => copyToClipboardM1(row.to_address)}
                    />
                  </Tooltip> : <></>}
              </span>

              : "-"}

          </p>
        );
      },
    },
    {
      dataField: "return_amount1",
      text: "Amount($)",
      csvExport:false,
      hidden: (selectedColumnId?.includes("return_amount1") == true),
      toggle: false,
      filter: numberFilter({
        placeholder: 'amount',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row)
        return (
          <>
            {row.tokenType == 'TRON' && parseFloat(row.return_amount1) == 0 ?
            row.token_type=='TRX' ?
              <span style={{ color: 'rgb(0, 255, 0)' }}>
                {'$' + row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                 <p style={{ color: 'rgb(0, 255, 0)' }}>{parseFloat(row.amount_trx).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}</p> 
              </span> : <span style={{ color: 'rgb(0, 255, 0)' }}>
                {'$' + row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}
                {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
              </span> : row.tokenType == 'TRON' && parseFloat(row.return_amount1) > 0  ?
               row.token_type=='TRX' ?
                <span style={{ color: 'rgb(0, 255, 0)' }}>
                  {'+' + '$' + row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                   <p style={{ color: 'rgb(0, 255, 0)' }}>{'+'+parseFloat(row.amount_trx).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}</p> 
                </span> : <span style={{ color: 'rgb(0, 255, 0)' }}>
                  {'+' + '$' + row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}
                  {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
                </span> :
                row.tokenType == 'BTC' && parseFloat(row.amount) > 0 ?
                  <span style={{ color: 'rgb(0, 255, 0)' }}>
                    {'+' + '$' + Math.abs(row.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                    <p style={{ color: 'rgb(0, 255, 0)' }}>{parseFloat(row.amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}</p>
                  </span> : row.tokenType == 'BTC' && parseFloat(row.amount) < 0 ?
                    <span style={{ color: '#ff0000' }}>
                      {'-' + '$' + Math.abs(row.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                      <p style={{ color: '#ff0000' }}>{parseFloat(row.amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}</p>
                    </span>
                    : row.return_amount1 != undefined && row.tokenType=='eth' && row.send_data != '[]'  ?
                    row.token_type=='ETH' ?
                      <span style={{ color: '#ff0000' }}>
                        {'-'+ '$' +parseFloat(row.eth_usdt).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') }
                         <p style={{ color: '#ff0000' }}>{'-'+row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+ row.token_type.toUpperCase()}</p> 
                      </span> : <span style={{ color: '#ff0000' }}>
                        {'-' + '$' + row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}
                        {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
                      </span>  : row.return_amount1 != undefined && row.recieve_data != '[]' && row.tokenType=='eth' ?
                      row.token_type=='ETH' ?
                        <span style={{ color: 'rgb(0, 255, 0)' }}>
                          {'+' + '$' + parseFloat(row.eth_usdt).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                           <p style={{ color: 'rgb(0, 255, 0)' }}>{'+' +row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type?.toUpperCase()}</p> 
                        </span> : <span style={{ color: 'rgb(0, 255, 0)' }}>
                          {'+' + '$' + row.return_amount1.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type?.toUpperCase()}
                          {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
                        </span>  : '-'
              // : row.tokenType!='BTC' && row.tokenType!='TRON' && row.cate_id=='receive' ?
              // <span style={{ color: '#00ff00' }}>
              // {row.return_amount1.toFixed(5)}<p style={{color:'#FFC107'}}>{row.tokenType}</p>
              // </span> : row.tokenType=='BTC' && row.return_amount1> 0 ?
              // <span style={{ color: '#00ff00' }}>
              // {row.return_amount1.toFixed(5)} <p style={{color:'#FFC107'}}>{row.tokenType}</p>
              // </span> 
              // : row.tokenType=='BTC' && row.return_amount1< 0 ?
              //  <span style={{ color: '#ff0000' }}>
              //  {/* {row.return_amount1.toFixed(5)} */}
              //  <p style={{color:'#FFC107'}}>{row.tokenType}</p>
              //  </span> :  <span style={{ color: 'white' }}>
              //  -
              //  </span> 

            }
          </>
        );
      },
    },
    {
      dataField: 'transac_amt',
      text: 'Amount($)(-/+)',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'address_type',
      text: 'Type of Chain',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'token_type',
      text: 'Type of Token',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: "fee",
      text: "Fee($)",
      hidden: (selectedColumnId?.includes("fee") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'fee',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <span style={{ color: 'white'}}>
              {row.fee != '-' ? "$" + row.fee.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') + ' ' + 'USD' : '-'}
            </span>
          </>
        );
      },
    },

    {
      dataField: "comment",
      text: "Comment",
      hidden: (selectedColumnId?.includes("comment") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'comment',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>

            <span style={{ color: 'white',marginLeft:'2em' }}>
              {row.comment == null || row.comment == "" ? "-" : row.comment}
            </span>
          </>
        );
      },
    },
    {
      dataField: 'action',
      text: 'Action',
      sort: false,
      csvExport: false,
      toggle: false,
      hidden: (selectedColumnId?.includes("action") == true),
      width: 50,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107' }}
            onClick={() => handleShowComment(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span>
        )
      }
    }


  ]
  const columnsF = [

    {
      dataField: 'transaction_id',
      text: 'Hash',
      sort: true,
      hidden: (selectedColumnId?.includes("transaction_id") == true),
      toggle: false,
      width: 150,
      filter: textFilter({
        placeholder: 'hash',
        getFilter: filter => {
          txnFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const txn = row.transaction_id
        const copyToClipboard2 = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <>
            {/* /<li style={{ whiteSpace: 'nowrap', color: '#F1C40F' }}> */}
            <span className="namePortData" style={{ cursor: 'pointer' }} onClick={
              () => window.open( `https://etherscan.io/tx/${row.transaction_id}`)}>
              {row.transaction_id != undefined ? row.transaction_id.slice(0, 6) + "..." + row.transaction_id.slice(-4) : <></>}
            </span>
            <Tooltip title="Copy to Clipboard">
              {txn != null
                ? (
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboard2(txn)}
                  />
                )
                : (
                  <></>
                )}
            </Tooltip>
            {/* </li> */}
          </>
        )
      }
    },
    {
      dataField: 'transaction_time',
      width: 150,
      text: 'Date',
      sort: true,
      toggle: false,
      hidden: (selectedColumnId?.includes("transaction_time") == true),
      filter: dateFilter({
        dateFormat: 'mm/dd/yyyy',
        placeholder: 'custom placeholder',
        getFilter: filter => {
          timeFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let date = moment(row.transaction_time).format("Do MMMM YYYY, h:mm:ss a").split(',')
        return (
          <p
            style={{
              color: 'white',
              // width: '110%',
              fontSize: '14px',
              display: 'inline-block'
            }}
          >
            <Tooltip title={row.transaction_time}>
              <span style={{ color: 'white', fontSize: '14px' }}>
                {date[0]} <br />
                {date[1]}
              </span>
            </Tooltip>
          </p>
        )
      }
    },
    // {
    //   dataField: 'cate_id',
    //   text: 'Type',
    //   toggle:false,
    //   hidden:(selectedColumnId?.includes("cate_id")==true),
    //   filter: textFilter({
    //     placeholder: 'type',
    //     getFilter: filter => {
    //       typeFilter = filter
    //     }
    //   }),
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //        {row.cate_id == null ? (
    //          <p style={{ color:'#ff0000' }}>N/A</p>
    //        ) : row.cate_id=='send' ?(
    //         <p style={{color:'#FFC107'}}> {row.cate_id}</p>) :
    //         row.cate_id=='receive' ?
    //         (<p style={{color:'#00ff00'}}>{row.cate_id}</p>) :
    //         row.cate_id=='approve' ?
    //         (<p style={{color:'#0080ff'}}>{row.cate_id}</p>)  :
    //         <></>  
    //        }
    //        </>
    //     )
    //   }
    // },
    {
      dataField: "address_id",
      width: 50,
      text: "From",
      sort: true,
      hidden: (selectedColumnId?.includes("address_id") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'from',
        // getFilter: filter => {
        //   fromFilter = filter;
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const copyToClipboardE = (from) => {
          copy(from, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }

        return (
          <p
            style={{
              color: "white",
              // width: "110%",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            {" "}
            <span style={{ color: "white", fontSize: "14px" }}>
              {row.address_id.slice(0, 6) + '...' + row.address_id.slice(-4)}
            </span>
            <Tooltip title="Copy to Clipboard">
              <Icon
                icon="cil:copy"
                style={{
                  cursor: 'pointer',
                  color: '#FFC107',
                  marginLeft: '5px'
                }}
                onClick={() => copyToClipboardE(row.address_id)}
              />
            </Tooltip>
          </p>
        );
      },
    },
    {
      dataField: "other_wallet_address",
      width: 50,
      text: "To",
      sort: true,
      hidden: (selectedColumnId?.includes("other_wallet_address") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'to',
        // getFilter: filter => {
        //   toFilter = filter;
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const copyToClipboardE1 = (to) => {
          copy(to, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <p
            style={{
              color: "white",
              // width: "110%",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            {" "}
            {row.other_wallet_address == null ? '-' :
              <span style={{ color: "white", fontSize: "14px" }}>
                {row.other_wallet_address?.slice(0, 6) + '...' + row.other_wallet_address?.slice(-4)}
                <Tooltip title="Copy to Clipboard">
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboardE1(row.other_wallet_address)}
                  />
                </Tooltip>
              </span>}

          </p>
        );
      },
    },
    {
      dataField: "return_amount",
      text: "Amount($)",
      sort: true,
       csvExport: false,
      hidden: (selectedColumnId?.includes("return_amount") == true),
      toggle: false,
      filter: numberFilter({
        placeholder: 'amount',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
      }),

      formatter: (cell, row, rowIndex, formatExtraData) => {
          // console.log(row)
        // console.log( JSON.parse(row.symbol)?.sendId?.optimized_symbol,JSON.parse(row.send_data)?.[0]?.token_id=='eth' ? JSON.parse(row.send_data)?.[0]?.token_id : JSON.parse(row.symbol)?.sendId?.optimized_symbol)
        return (
          <>
            {row.return_amount != undefined && row.send_data != '[]' && row.recieve_data == '[]'  ?
             (row.token_type==='ETH' ? 
              <span style={{ color: '#ff0000' }}>
                {"-"+'$' + row.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                 <p style={{ color: '#ff0000' }}>{'-'+parseFloat(row.amount_returned).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' ' +row.token_type.toUpperCase()}</p> 
              </span> : <span style={{ color: '#ff0000' }}>
                {"-" + '$' + row.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}
                {/* <p style={{ color: '#FFC107' }}>{row.tokens.toUpperCase()}</p> */}
              </span>)
              : row.return_amount != undefined && row.recieve_data != '[]' && row.send_data == '[]'  ?
              (row.token_type==='ETH' ? 
                <span style={{ color: '#00ff00' }}>
                  {"+"+'$' + row.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                  <p style={{ color: '#00ff00' }}>{'+'+parseFloat(row.amount_returned).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' ' +row.token_type.toUpperCase()}</p> 
                </span>: <span style={{ color: '#00ff00' }}>
                  {"+" + '$' + row.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}
                  {/* <p style={{ color: '#FFC107' }}>{row.tokens.toUpperCase()}</p> */}
                </span>) : row.return_amount != undefined && row.recieve_data != '[]' && row.send_data != '[]'  ?
              (row.token_type==='ETH' ? 
                <span style={{ color: '#00ff00' }}>
                  {"+"+'$' + row.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                  <p style={{ color: '#00ff00' }}>{'+'+parseFloat(row.amount_returned).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' ' +row.token_type.toUpperCase()}</p> 
                </span>: <span style={{ color: '#00ff00' }}>
                  {"+" + '$' + row.return_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.token_type.toUpperCase()}
                  {/* <p style={{ color: '#FFC107' }}>{row.tokens.toUpperCase()}</p> */}
                </span>) : <span style={{color:'white'}}>-</span>

            }
          </>
        );
      },
    },
    {
      dataField: 'transac_amt',
       text: "Amount($)(-/+)",
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'address_type',
      text: 'Type of Chain',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'token_type',
      text: 'Type of Token',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: "fee",
      text: "Fee($)",
      sort: true,
      hidden: (selectedColumnId?.includes("amount") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'fee',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
      }),

      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>

            <span style={{ color: 'white' }}>
              {row.fee!= '-' ? "$" + parseFloat(row.fee)?.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+'USD' : '-'}
            </span>
          </>
        );
      },
    },
    // {
    //   dataField: 'return_amount',
    //   text: 'Amount',
    //   sort: true,
    //   toggle:false,
    //   hidden:(selectedColumnId?.includes("return_amount")==true),
    //   width: 200,
    //   filter: numberFilter({
    //     placeholder: 'amount',
    //     getFilter: filter => {
    //       amountFilter = filter
    //     }
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {

    //     return (
    //       <>
    //         {row.return_amount != '[]'
    //           ? (
    //             <li
    //               style={{
    //                 whiteSpace: 'nowrap',
    //                 color: 'white',
    //                 fontSize: '12px',
    //                 color: '#FFC107'
    //               }}
    //             >
    //               <span style={{ color: '#FFC107' }}> amount:</span>
    //               <span style={{ color: 'white' }}>
    //               ${row.return_amount==undefined ? 0 :  ((row.return_amount).toLocaleString()+'.')
    //               }
    //               </span>
    //             </li>
    //             )
    //           : (
    //             <li style={{ whiteSpace: 'nowrap', fontSize: '12px' }}>
    //               {' '}
    //               <span style={{ color: '#FFC107' }}>amount: </span>
    //               <span style={{ color: 'white' }}>
    //               ${row.send_amount==undefined ? 0 :  ((row.send_amount).toLocaleString()+'.')
    //               }
    //               </span>
    //             </li>
    //             )}
    //         {JSON.parse(row.amount)?.eth_gas_fee == null
    //           ? (
    //             <li
    //               style={{
    //                 whiteSpace: 'nowrap',
    //                 fontSize: '12px',
    //                 color: '#FFC107'
    //               }}
    //             >
    //               {' '}
    //               <span style={{ color: '#FFC107' }}>gas fee:</span> N/A
    //             </li>
    //             )
    //           : (
    //             <li
    //               style={{
    //                 whiteSpace: 'nowrap',
    //                 color: 'white',
    //                 fontSize: '12px',
    //                 color: '#FFC107'
    //               }}
    //             >
    //               <span style={{ color: '#FFC107' }}>gas fee:</span>
    //               <span style={{ color: 'white' }}>
    //                 ${JSON.parse(row.amount)?.eth_gas_fee.toFixed(4)}
    //               </span>
    //             </li>
    //             )}
    //       </>
    //     )
    //   }
    // },
    {
      dataField: 'comments',
      text: 'Comment',
      sort: true,
      toggle: false,
      hidden: (selectedColumnId?.includes("comments") == true),
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white' }}>
            {row.comments != null ? 
            <p style={{marginLeft:'2em'}}>{row.comments}</p> : 
           <p style={{marginLeft:'2em'}}>-</p>
            }
          </p>
        )
      }
    },


    {
      dataField: 'action',
      text: 'Action',
      sort: false,
      toggle: false,
      csvExport: false,
      hidden: (selectedColumnId?.includes("action") == true),
      width: 50,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107' }}
            onClick={() => handleShowComment(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span>
        )
      }
    }
  ]

  const columnsTron = [
    {
      dataField: "hash",
      width: 150,
      text: "Hash",
      sort: true,
      hidden: (selectedColumnId?.includes("hash") == true),
      toggle: false,

      filter: textFilter({
        placeholder: 'hash',
        comparator: 'Comparator.LIKE',
        //  caseSensitive: true,
        getFilter: filter => {
          hashFilter = filter;

        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        const txn = row?.hash
        const copyToClipboard2 = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <>
            <span className="namePortData" style={{ cursor: 'pointer', fontSize: "14px" }} onClick={
              () => window.open(`https://tronscan.org/#/transaction/${row?.hash}`)}>
              {row?.hash?.slice(0, 6) + "..." + row?.hash?.slice(-4)}
            </span>
            <Tooltip title="Copy to Clipboard">
              {txn != null
                ? (
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboard2(txn)}
                  />
                )
                : (
                  <></>
                )}
            </Tooltip>
          </>
        );
      },
    },
    {
      dataField: "tron_date",
      text: "Date",
      sort: true,
      hidden: (selectedColumnId?.includes("tron_date") == true),
      toggle: false,
      filter: dateFilter({
        placeholder: 'date',
        getFilter: filter => {
          timestampFilter = filter;
        }
      }),

      formatter: (cell, row, rowIndex, formatExtraData) => {
        let d = parseInt(row?.updated_time);
          // let date = moment(parseInt(row.timestamp) / 1000, 'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
           let date =moment(row.tron_date).format("Do MMMM YYYY, h:mm:ss a").split(',')
        return (
          <>
            {row?.timestamp === null ?
              <span style={{ color: "white", fontSize: "14px" }}>N/A</span> :
              <span style={{ color: "white", fontSize: "14px" }}>
              
                 {date[0]} <br />
                {date[1]} 
              </span>}
          </>
        );
      },
    },
    {
      dataField: "ownerAddress",
      width: 50,
      text: "From",
      sort: true,
      hidden: (selectedColumnId?.includes("ownerAddress") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'from',
        getFilter: filter => {
          fromFilter = filter;
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const copyToClipboardT = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return ( 
          <p
            style={{
              color: "white",
              // width: "110%",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            <span style={{ color: "white", fontSize: "14px" }}>
              {row?.ownerAddress?.slice(0, 6) + "..." + row?.ownerAddress?.slice(-4)}
              <Tooltip title="Copy to Clipboard">
                <Icon
                  icon="cil:copy"
                  style={{
                    cursor: 'pointer',
                    color: '#FFC107',
                    marginLeft: '5px'
                  }}
                  onClick={() => copyToClipboardT(row?.ownerAddress)}
                />
              </Tooltip>
            </span>
          </p>
        );
      },
    },
    {
      dataField: "toAddress",
      text: "To",
      sort: true,
      width: 200,
      hidden: (selectedColumnId?.includes("toAddress") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'to',
        getFilter: filter => {
          toFilter = filter;
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const copyToClipboardT1 = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <p
            style={{
              color: "white",
              // width: "110%",
              fontSize: "14px",
              display: "inline-block",
            }}
          >
            {" "}
            {/* {console.log(row.transaction_time)} */}
            <Tooltip title={row?.toAddress}>
              <span style={{ color: "white", fontSize: "14px" }}>
                {row?.toAddress?.slice(0, 6) + "..." + row?.toAddress?.slice(-4)}
                <Tooltip title="Copy to Clipboard">
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboardT1(row?.toAddress)}
                  />
                </Tooltip>
              </span>

            </Tooltip>
          </p>
        );
      },
    },
    {
      dataField: "USD_amount",
      text: "Amount($)",
      sort: true,
       csvExport: false,
      hidden: (selectedColumnId?.includes("USD_amount") == true),
      toggle: false,
      filter: numberFilter({
        placeholder: 'amount',
        getFilter: filter => {
          tokenFilter = filter;
        }
      }),

      formatter: (cell, row, rowIndex, formatExtraData) => {
        let t = row?.tokenDecimal
        let b = (parseInt(row?.amount))
        // console.log(row)

        return (
          <>
            {
              row?.USD_amount != '' && row?.USD_amount != null ?
                (row.toAddress===defaultAddress ?
                (row?.token_type=='TRX' ?
                  <span style={{ color: "#00ff00", fontSize: "14px" }}>
                    {'+' + '$' +row?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    <p style={{ color: '#00ff00' }}>{'+'+parseFloat(row?.amount_trx_data).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row?.token_type.toUpperCase()}</p>
                  </span> :  <span style={{ color: "#00ff00", fontSize: "14px" }}>
                    {'+' + '$' + row?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row?.token_type?.toUpperCase()}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    {/* <p style={{ color: '#00ff00' }}>{row.tokenName.toUpperCase()} </p> */}
                  </span> ) : row.ownerAddress===defaultAddress ?
                   row?.token_type=='TRX' ?
                  <span style={{ color: "#ff0000", fontSize: "14px" }}>
                    {'-' + '$' +row?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    <p style={{ color: '#ff0000' }}>{'-'+parseFloat(row?.amount_trx_data).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row?.token_type?.toUpperCase()} </p>
                  </span>: <span style={{ color: "#ff0000", fontSize: "14px" }}>
                    {'-' + '$' + row?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') + ' '+row?.token_type?.toUpperCase()}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    {/* <p style={{ color: '#FFC107' }}>{row.tokenName.toUpperCase()} </p> */}
                  </span> :
                   (row?.token_type=='TRX' ?
                   <span style={{ color: "#00ff00", fontSize: "14px" }}>
                     {'+' + '$' +row?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                     {/* {b*Math.pow(10,-t)} {' '} */}
                     <p style={{ color: '#00ff00' }}>{'+'+parseFloat(row?.amount_trx_data).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row?.token_type.toUpperCase()}</p>
                   </span> :  <span style={{ color: "#00ff00", fontSize: "14px" }}>
                     {'+' + '$' +row?.USD_amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row?.token_type?.toUpperCase()}
                     {/* {b*Math.pow(10,-t)} {' '} */}
                     {/* <p style={{ color: '#00ff00' }}>{row.tokenName.toUpperCase()} </p> */}
                   </span> )
                  )  : '-'
                // <span style={{ color: "white", fontSize: "14px" }}>
                //   {parseFloat(row?.USD_amount).toLocaleString()} {' '}
                //   <p style={{ color: '#FFC107' }}>{row?.token_type?.toUpperCase()} </p>
                // </span>
            }
          </>
        );
      },
    },
    {
      dataField: 'transac_amt',
       text: "Amount($)(-/+)",
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'address_type',
      text: 'Type of Chain',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'token_type',
      text: 'Type of Token',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: "fee",
      text: "Fee($)",
      hidden: (selectedColumnId?.includes("fee") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'fee',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(parseInt(row.net_fee)/1000000)
        return (
          <>

            <span style={{ color: 'white' }}>
              {'$' + row.fee + " " + 'USD'}
              {/* {row.net_fee==='0' || row.net_fee===null ? '-' : parseFloat(parseInt(row.net_fee)/1000000).toFixed(2).replace(/\.00$/, '')+' '+'TRX'}  */}
            </span>
          </>
        );
      },
    },
    {
      dataField: 'comment',
      text: 'Comment',
      sort: true,
      hidden: (selectedColumnId?.includes("comment") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            {(row?.comment == null) ? <p style={{ color: 'white', fontSize: '14px',marginLeft:'2em' }}>-</p> : <p style={{ color: 'white', fontSize: '14px',marginLeft:'2em' }}>{row?.comment}</p>}
          </div>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      csvExport: false,
      width: 50,
      // hidden:(selectedColumnId?.includes("am")==true),
      // toggle:false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107' }}
            onClick={() => handleShowComment(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span>
        )
      }
    }
  ];

  const columnsBtc = [
    {
      dataField: "hash_id",
      width: 150,
      text: "Hash",
      sort: true,
      hidden: (selectedColumnId?.includes("hash_id") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'hash',
        getFilter: filter => {
          hashFilter = filter;
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const txn = row.hash_id
        const copyToClipboard2 = (txn) => {
          copy(txn, {
            debug: true,
            message: 'Press #{key} to copy'
          })
          setOpen(true)
          setAlertC(true)
          setTimeout(() => {
            setAlertC(false)
          }, 3000)
        }
        return (
          <>
            {" "}
            {/* {console.log(row.transaction_time)} */}
            {/* <Tooltip title={row.hash}> */}
            <span className="namePortData" style={{ cursor: 'pointer', fontSize: "14px" }} onClick={
              () => window.open(`https://www.blockchain.com/btc/tx/${row.hash_id}`)}>
              {row.hash_id.slice(0, 6) + '...' + row.hash_id.slice(-4)}
            </span>
            <Tooltip title="Copy to Clipboard">
              {txn != null
                ? (
                  <Icon
                    icon="cil:copy"
                    style={{
                      cursor: 'pointer',
                      color: '#FFC107',
                      marginLeft: '5px'
                    }}
                    onClick={() => copyToClipboard2(txn)}
                  />
                )
                : (
                  <></>
                )}
            </Tooltip>

            {/* </Tooltip> */}
          </> 

        );
      },
    },
    {
      dataField: "btc_date",
      text: "Date",
      hidden: (selectedColumnId?.includes("btc_date") == true),
      toggle: false,
      filter: dateFilter({
        placeholder: 'date',
        getFilter: filter => {
          timestampFilter = filter;
        }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        // let date1 = parseInt(row.time)
        // let time1 = moment(row.time, 'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
        // console.log('time',time1)
         let date =moment(row.btc_date).format("Do MMMM YYYY, h:mm:ss a").split(',')
        return (
          <>
            {row.time === null ?
              <span style={{ color: "white", fontSize: "14px" }}>N/A</span> :
              <span style={{ color: "white", fontSize: "14px" }}>
                {date[0]} <br />
                {date[1]}
              </span>}
          </> 
        );
      },
    },
    {
      dataField: "input_addr",
      width: 50,
      sort: true,
      hidden: (selectedColumnId?.includes("input_addr") == true),
      toggle: false,
      text: "From",
      filter: textFilter({
        placeholder: 'from',
        getFilter: filter => {
          fromFilter = filter;
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        //         let responseAddressArray= JSON.parse(row.input_addr).filter((value, index, self) =>
        //         index === self.findIndex((t) => (
        //          t.prev_out.addr === value.prev_out.addr
        //           ))
        // )
        //         const copyToClipboard2 = (txn) => {
        //           copy(txn, {
        //             debug: true,
        //             message: 'Press #{key} to copy'
        //           })
        //           setOpen(true)
        //           setAlertC(true)
        //           setTimeout(() => {
        //             setAlertC(false)
        //           }, 3000)
        //         }
        return (
          <>
            <span style={{marginLeft:'2em'}}>-</span>
            {/* {
              responseAddressArray?.map((e,key)=>(
                
                <li style={{ whiteSpace: 'nowrap', fontSize: '12px',color: '#FFC107'}} key={key}> 
                  <span style={{ color: 'white' }}>{e.prev_out.addr.slice(0,6)+'...'+e.prev_out.addr.slice(-4)}
                  <Tooltip title="Copy to Clipboard">
                  <Icon
                   icon="cil:copy"
                   style={{
                     cursor: 'pointer',
                     color: '#FFC107',
                     marginLeft: '5px'
                   }}
                   onClick={() => copyToClipboard2(e.prev_out.addr)}
                 /></Tooltip>
                 </span>
                </li>
              ))
            }   */}
          </> 
        );
      },
    },
    {
      dataField: "output_addr",
      text: "To",
      sort: true,
      hidden: (selectedColumnId?.includes("output_addr") == true),
      toggle: false,
      width: 200,
      filter: textFilter({
        placeholder: 'to',
        getFilter: filter => {
          toFilter = filter;
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // const copyToClipboard3 = (txn) => {
        //   copy(txn, {
        //     debug: true,
        //     message: 'Press #{key} to copy'
        //   })
        //   setOpen(true)
        //   setAlertC(true)
        //   setTimeout(() => {
        //     setAlertC(false)
        //   }, 3000)
        // }
        return (
          <>
            <span style={{marginLeft:'2em'}}>-</span>
            {/* <span style={{ color: 'white' }}>{JSON.parse(row.output_addr)[0].addr.slice(0,6)+'...'+JSON.parse(row.output_addr)[0].addr.slice(-4)}
                   <Tooltip title="Copy to Clipboard">
                  <Icon
                   icon="cil:copy"
                   style={{
                     cursor: 'pointer',
                     color: '#FFC107',
                     marginLeft: '5px'
                   }}
                   onClick={() => copyToClipboard3(JSON.parse(row.output_addr)[0].addr)}
                 /></Tooltip> </span>   */}
          </> 
        );
      },
    },
    // {
    //   dataField: "final_balance",
    //   text: "type",
    //    hidden:(selectedColumnId?.includes("final_balance")==true),
    //   toggle:false,
    //      filter: textFilter({
    //         placeholder:'type',
    //     getFilter: filter => {
    //       blockFilter = filter;
    //     }
    //  }),
    //   sort: true,

    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>

    //            {parseInt(row.result)>0 ?
    //            <span style={{ color: "#00ff00", fontSize: "13px" }}>  receive </span> :
    //            <span style={{ color: "#FFC107", fontSize: "13px" }}>  send </span>
    //           }

    //        </>
    //     );
    //   },
    // },
    {
      dataField: "usd_result",
      text: "Amount($)",
      hidden: (selectedColumnId?.includes("usd_result") == true),
      toggle: false,
      csvExport:false,
      filter: numberFilter({
        placeholder: 'amount',
        getFilter: filter => {
          blockFilter = filter;
        }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row)
        // let t=0
        // let usd
        // JSON.parse(row.output_addr).map(e=>{
        //   t  = t + parseInt(e.value)
        // })
        // let o1 = (t)/100000000

        return (
          <>
            {parseFloat(row.result) == '0' || parseFloat(row.result) == '-0' ?
              <span style={{ color: '00ff00' }}>
                ${Math.abs(row.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                <p style={{ color: '00ff00' }}>{'+'+' '+row.result.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.address_type}</p>
              </span> : parseFloat(row.usd_result) > 0 ? 
                <span style={{ color: '#00ff00' }}>
                  + ${Math.abs(row.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                  <p style={{ color: '#00ff00' }}>{'+'+' '+row.result.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' '+row.address_type}</p>
                </span>
                : <span style={{ color: '#ff0000' }}>
                  - ${Math.abs(row.usd_result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                  <p style={{ color: '#ff0000' }}>{'-'+' '+Math.abs(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+ ' '+row.address_type}</p>
                </span>}
            {/* <li style={{
                    whiteSpace: 'nowrap',
                    color: 'white',
                    fontSize: '12px',
                    color: '#FFC107'
                  }}> */}
            {/* <span style={{ color: '#FFC107' }}>USD_amount: 
                  <span style={{ color: 'white' }}>
                  ${Math.abs(row.usdt)}
                  </span></span> */}
            {/* </li> */}
          </>
        );
      },
    },
    {
      dataField: 'transac_amt',
      text: 'Amount($)(-/+)',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'address_type',
      text: 'Type of Chain',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: 'address_type',
      text: 'Type of Token',
      sort: true,
      toggle: true,
      hidden: true,
      width: 150,
    },
    {
      dataField: "usd_fee",
      text: "Fee($)",
      hidden: (selectedColumnId?.includes("usd_fee") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'fee',
        getFilter: filter => {
          blockFilter = filter;
        }
      }),
      sort: true,

      formatter: (cell, row, rowIndex, formatExtraData) => {
        // let t=0
        // JSON.parse(row.output_addr).map(e=>{
        //   t  = t + parseInt(e.value)
        // })
        // let o1 = (t)/100000000
        return ( 
          <>
            {/* <li style={{
                    whiteSpace: 'nowrap',
                    color: 'white',
                    fontSize: '12px',
                    color: '#FFC107'
                  }}>
                  <span style={{ color: '#FFC107' }}>BTC_amount: 
                  <span style={{ color: 'white' }}>
                  ${o1==undefined ? 0 :  ((o1).toLocaleString()+'.')
                  }
                  </span>
                  </span>
                  </li>
                  <li> */}
            {/* <span style={{ color: '#FFC107' }}>BTC_fee:  */}

            <span style={{ color: "white", fontSize: "14px" }}>${parseFloat(row.usd_fee).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') + ' ' + 'USD'} </span>
            {/* </span>
                </li> */}
          </> 
        );
      },
    },



    // {
    //   dataField: "",
    //   text: "Type",
    //      filter: textFilter({
    //         placeholder:'transaction-type',
    //     getFilter: filter => {
    //       transactionFilter = filter;
    //     }
    //  }),
    //   sort: true,

    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     // let date =moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a").split(',')
    //     return (
    //       <>
    //            <span style={{ color: "white", fontSize: "13px" }}>
    //            {"Transfer " +row.tokenType+ " token" } 
    //           </span>
    //        </>
    //     );
    //   },
    // },


    {
      dataField: 'comment',
      text: 'Comment',
      sort: true,
      hidden: (selectedColumnId?.includes("comment") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return ( 
          <div>
            {(row?.comment == null) ? <p style={{ color: 'white', fontSize: '14px', marginLeft:'2em' }}>-</p> : <p style={{ color: 'white', fontSize: '14px',marginLeft:'2em' }}>{row?.comment}</p>}
          </div> 
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      csvExport: false,
      width: 50,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107' }}
            onClick={() => handleShowComment(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span> 
        )
      }
    }
  ];
  const columnsInv = [
    {
      dataField: 'investment_name',
      text: 'Name',
      sort: true,
      filter: textFilter({
        placeholder: 'name',
        getFilter: filter => {
          nameIFilter = filter
        }
      }),
       formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap', textAlign:'center' }}>
            {row.investment_name}
          </p>
        )
      }
    },

    {
      dataField: 'investment_type',
      text: 'Asset',
      sort: true,
      filter: textFilter({
        placeholder: 'asset',
        getFilter: filter => {
          typeIFilter = filter
        }
      }),
       formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap',textAlign:'center' }}>
            {row.investment_type}
          </p>
        )
      }
    },
    {
      dataField: 'date_of_investment',
      text: 'Date',
      sort: true,
      filter: dateFilter({
        placeholder: 'date',
        getFilter: filter => {
          dateIFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let d = parseInt(row.date_of_investment);
        let date = moment(row.date_of_investment).format("Do MMMM YYYY, h:mm:ss a").split(',')
        // let date =moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a").split(',')
        return (
          <>
            {row.date_of_investment === null ?
              <span style={{ color: "white", fontSize: "14px" }}>N/A</span> :
              <span style={{ color: "white", fontSize: "14px" }}>
                {date[0]}
              </span>}
          </>
        );
      },

    },
    {
      dataField: 'quantity',
      text: 'Quantity',
      sort: true,
      filter: textFilter({
        placeholder: 'quantity',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            {row.quantity}
          </p>
        )
      }
    },
    {
      dataField: 'purchase_price',
      text: 'Buy NAV',
      sort: true,
      filter: textFilter({
        placeholder: 'buy Nav',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            ${parseFloat(row.purchase_price).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'current_nav',
      text: 'Current NAV',
      sort: true,
      filter: textFilter({
        placeholder: 'current Nav',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
           { row.current_nav==null ? '-' : '$'+parseFloat(row.current_nav).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'buy_value',
      text: 'Buy Value',
      sort: true,
      filter: textFilter({
        placeholder: 'buy value',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px',textAlign:'center' }}>
             {'$'+parseFloat(row.buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')} 
          </p>
        )
      }
    },
     {
      dataField: 'current_value',
      text: 'Current Value',
      sort: true,
      filter: textFilter({
        placeholder: 'Current value',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px',textAlign:'center' }}>

             { row.current_value==null ? '-' : '$'+parseFloat(row.current_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')} 
          </p>
        )
      }
    },
    {
      dataField: 'pnl',
      text: 'PNL',
      sort: true,
      filter: textFilter({
        placeholder: 'pnl',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{textAlign:'center'}}>
          {row.pnl===null ? '-' : row.pnl==='0' ? <span style={{color:'rgb(0, 255, 0)'}}> {'$'+row.pnl}</span> :
           parseFloat(row.pnl)>0 ? 
         <span style={{color:'rgb(0, 255, 0)'}}> {'$'+parseFloat(row.pnl).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
         :  <span style={{color:'#ff0000'}}>{'-'+''+'$'+parseFloat(row.pnl).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')?.split('-')[1]}</span>
         } 
       </div> 
        )
      }
    },
    
    {
      dataField: 'comments',
      text: 'Comments',
      sort: true,
      filter: textFilter({
        placeholder: 'comments',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px',textAlign:'center' }}>
            {row.comments == null
              ? (
                <p style={{ color: 'white', fontSize: '14px' }}>
                 -
                </p>
                )
              : (
                <p style={{ color: 'white', fontSize: '14px' }}>
                  {row.comments}
                </p>
                )}
          </p>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107',marginLeft:'2em' }}
            onClick={() => handleEdit(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span>
        )
      }
    }
  ]
  const columnsExch = [
    {
      dataField: 'symbol',
      text: 'Symbol',
      filter: textFilter({
        placeholder: 'symbol',
        getFilter: filter => {
          symbolFilter = filter
        }
      })
    },
    {
      dataField: 'amount',
      text: 'Volume',
      sort: true,
      filter: textFilter({
        placeholder: 'volume',
        getFilter: filter => {
          amountFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            ${row.amount}
          </p>
        )
      }
    },
    {
      dataField: 'price',
      text: 'Price',
      filter: textFilter({
        placeholder: 'price',
        getFilter: filter => {
          priceFilter = filter
        }
      }),
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            ${row.price}
          </p>
        )
      }
    },
    {
      dataField: 'cost',
      text: 'Cost',
      filter: textFilter({
        placeholder: 'cost',
        getFilter: filter => {
          costFilter = filter
        }
      }),
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            ${row.cost}
          </p>
        )
      }
    },
    {
      dataField: 'side',
      text: 'Side',
      sort: true,
      filter: textFilter({
        placeholder: 'side',
        getFilter: filter => {
          sideFilter = filter
        }
      })
    },
    {
      dataField: 'info',
      text: 'OrderId',
      sort: true,
      filter: textFilter({
        placeholder: 'orderId',
        getFilter: filter => {
          infoFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
            {JSON.parse(row.info)?.orderId}
          </p>
        )
      }
    },
    {
      dataField: 'timeStamp',
      width: 150,
      text: 'Exchange Date',
      filter: dateFilter({
        placeholder: 'exchange time',
        getFilter: filter => {
          timestampFilter = filter
        }
      }),
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const d = parseInt(row.timeStamp)
        const time = moment(d).format('DD-MM-YYYY h:mm:ss')
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              display: 'inline-block'
            }}
          >
            <span style={{ color: 'white', fontSize: '14px' }}>
              {
                moment(d).format('Do MMMM YYYY, h:mm:ss a')
              }
            </span>
          </p>
        )
      }
    },
    {
      dataField: 'updated_time',
      width: 150,
      text: 'Updated Date',
      filter: dateFilter({
        placeholder: 'updated time',
        getFilter: filter => {
          updateDFilter = filter
        }
      }),
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const d1 = parseInt(row.updated_time)
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              display: 'inline-block'
            }}
          >
            <span style={{ color: 'white', fontSize: '14px' }}>
              {
                moment(d1).format('MMMM Do YYYY, h:mm:ss a')
              }

            </span>

          </p>
        )
      }
    },
    {
      dataField: 'comment',
      text: 'Comments',
      sort: true,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentEFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p
            style={{
              color: 'white',
              fontSize: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            {row.comment == null
              ? (
                <p style={{ color: 'white', marginLeft: '3em' }}>
                  N/A
                </p>
              )
              : (
                <p style={{ color: 'white', marginLeft: '3em' }}>
                  {row.comment}
                </p>
              )}
          </p>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: true,
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
            style={{ cursor: 'pointer', color: '#FFC107',marginLeft:'2em' }}
            onClick={() => handleEdit1(row)}
          >
            <Tooltip title={'edit'}>
              <EditOutlinedIcon />
            </Tooltip>
          </span>
        )
      }
    }
  ]
  return (
    <React.Fragment>

      <Container fluid>
        <Row>
          <Col lg={12}>
            {alertTime
              ? (
                <Snackbar
                  open={alertTime}
                  onClose={() => setAlertTime(false)}
                  sx={{
                    marginLeft: '35%',
                    marginBottom: '38%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={() => setAlertTime(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  >
                    End time must be greater than Start Time
                  </Alert>
                </Snackbar>
              )
              : (
                <></>
              )}
            {alertEmptyT
              ? (
                <Snackbar
                  open={alertEmptyT}
                  onClose={() => setAlertEmptyT(false)}
                  sx={{
                    marginLeft: '35%',
                    marginBottom: '38%',
                    width: '25%'
                  }}
                >
                  <Alert
                    onClose={() => setAlertEmptyT(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }} >
                    Please enter Start time and End time
                  </Alert>
                </Snackbar>
              )
              : (
                <></>
              )}

            {/* <Modal
              show={alertNoTransact}
              onHide={() => setAlertNoTransact(false)}
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
                    fontWeight: 'bold'
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
                  paddingTop: '0%',
                  // marginTop: '-10%',
                  width: '19.5em',
                  justifyContent: 'center'
                }}
              >
                <button
                  //  variant="success"
                  className='no-record-found'

                  onClick={() => {
                    setAlertNoTransact(false)
                  }}
                >
                  OK
                </button>
              </Modal.Footer>
            </Modal> */}
            {/* {alertNoTransaction
              ? (
                <Snackbar
                  open={alertNoTransaction}
                  onClose={() => setAlertNoTransaction(false)}
                  sx={{
                   top:'5%',
                   marginLeft:'37%',
                   width:'32em',
                   height:'1em'
                  }}
                >
                  <Alert
                    onClose={() => setAlertNoTransaction(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }} >
                    please select back date to see transaction greater or equal to 1
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )} */}
            {/* {alertNoTransact
              ? (
                <Snackbar
                  open={alertNoTransact}
                  onClose={() => setAlertNoTransact(false)}
                  sx={{
                   top:'5%',
                   marginLeft:'42%',
                   width:'21em',
                   height:'1em'
                  }}
                >
                  <Alert
                    onClose={() => setAlertNoTransact(false)}
                    severity="error"
                    sx={{
                      width: '100%',
                      backgroundColor: 'white',
                      color: 'black'
                    }} >
                    no transaction greater or equal to 1
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )} */}
            {alertC
              ? (
                <Snackbar
                  open={open}
                >
                  <Alert
                    severity="success"
                    sx={{ width: '100%' }}
                    style={{
                      marginBottom: '295%',
                      marginLeft: '300%',
                      backgroundColor: 'black'
                    }}
                  >
                    Copied
                  </Alert>
                </Snackbar>
              )
              : (
                <></>
              )}

            <Row style={{ marginBottom: '8px' }}>
              <span className="p-2 pageheader">
                <h3 className="pagetitle" >
                  Transaction History
                </h3>
              </span>
              <Link
                to="#"
                className=" p-2 pageheader retrieve-transaction"
                onClick={refresh_wallet}
                style={{ position: 'relative', top: '16px' }}
              > Retrieve New Transactions
                {/* <Tooltip title="Refresh"> */}
                  {/* <Icon
                    icon="ic:sharp-refresh"
                    style={{ fontSize: '25px', color: '#FFC107' }}
                  /> */}
                {/* </Tooltip> */}
              </Link>
              {/* {(defaultSelect === 'wallet' && resultFilter1.length >= 1 && !defaultAddressType.includes('ALL')) || (defaultSelect === 'wallet' && tronTransaction.length >= 1 && !defaultAddressType.includes('ALL')) || (defaultSelect === 'wallet' && btcTransact.length >= 1 && !defaultAddressType.includes('ALL')) ?
                <button className='load-previous'
                  onClick={handleLoadPrevious} >
                  Load Previous
                </button> : <></>} */}
              {/* {roleId.includes('admin') === true
                ? <span className="p-2 pageheader" style={{
                  cursor: 'pointer'
                }}>
                  {showText && defaultSelect === 'investment' && (
                    <CSVLink style={{ color: '#ffc207' }}
                      data={r === true ? resultFilter : resultInv}
                      filename={'investment_transaction.csv'} >
                      <Tooltip title="investment transaction download">
                        <SystemUpdateAltIcon />
                      </Tooltip>
                    </CSVLink>
                  )}
                  {showText === false && defaultSelect === 'wallet' && (
                    <CSVLink style={{ color: '#ffc207' }}
                      data={r1 === true ? resultFilter1 : result11}
                      filename={'wallet_transaction.csv'}
                    > <Tooltip title="wallet transaction download">
                        <SystemUpdateAltIcon />
                      </Tooltip>
                    </CSVLink>
                  )}
                  {showText && defaultSelect === 'exchange' && (
                    <CSVLink style={{ color: '#ffc207' }}
                      data={r === true ? resultFilter3 : resultExchange1}
                      filename={'exchange_transaction.csv'}
                    >  <Tooltip title="exchange transaction download">
                        <SystemUpdateAltIcon />
                      </Tooltip>
                    </CSVLink>
                  )}
                </span>
                : <></>} */}
              <Modal
                show={tFilter}
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
                      onClick={() => setTFilter(false)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Modal.Header>
                  {alert
                    ? (
                      <Snackbar
                        open={alert}
                        sx={{
                          marginLeft: '35%',
                          marginBottom: '38%',
                          width: '25%'
                        }}
                      >
            {(dataNew.tron_address_id && dataNew?.comment!=null) || (dataNew.transaction_id && dataNew?.comments!=null) || (dataNew.btc_address_id && dataNew?.comment!=null) || dataNew?.comment!=null ?
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Comment Updated Successfully
            </Alert> :
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Comment Added Successfully
            </Alert>
            }
                        
                      </Snackbar>
                    )
                    : (
                      <></>
                    )}
                  <Modal.Body style={{ backgroundColor: '#222429' }}>
                    <Form
                      className="custom-form"
                      noValidate >
                      <h4 >
                      </h4>
                      <Form.Label
                        htmlFor="exchange"
                        className={cx('custom-form-box', {
                        })}
                        style={{ width: '72%', marginLeft: '15%' }}
                      >
                        <Form.Control
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Comment"
                          required
                          style={{ color: 'white' }}
                        />
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
                </div>
              </Modal>
              <SearchBox style={{ right: '4%' }}
                onChange={(event) => {
                  setSea(event.target.value)
                  if (defaultSelect === 'wallet') {
                    if (defaultAddressType.includes('ALL') == true) {
                      const x = combFiltData?.slice(0,count)?.filter(i => 
                        i.hash_id.includes(event.target.value)
                        || moment(i.date).format('Do MMMM YYYY h:mm:ss a')==event.target.value
                          || i.from_address.includes(event.target.value)
                          || i.to_address!=null && i.to_address.includes(event.target.value)
                          || parseFloat(i.return_amount1).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')==event.target.value
                          || i.fee!=null && i.fee==Number(event.target.value)
                          || i.comment!=null && i.comment.toLowerCase().includes(event.target.value.toLowerCase())
                          )
                          console.log(x)
                      if (x.length == 0) {
                        setSearchComb([])
                        setAlertNoTransact(true)
                      } else {
                        setSearchComb(x)
                      }

                    }
                    else if (defaultAddressType.includes('ERC') == true) {
                      const x = resultFilter1?.slice(0,count)?.filter(i => 
                        i.transaction_id.includes(event.target.value)
                      || moment(i.transaction_time).format('Do MMMM YYYY h:mm:ss a')==event.target.value
                        || i.address_id.includes(event.target.value)
                        || i.other_wallet_address.includes(event.target.value)
                        || i.return_amount==Number(event.target.value)
                        || i.fee!=null && i.fee==Number(event.target.value)
                        || i.comments!=null && i.comments.toLowerCase().includes(event.target.value.toLowerCase())
                        )
                      if (x.length == 0) {
                        setSearch([])
                        setAlertNoTransact(true)
                      } else {
                        setSearch(x)
                      }

                    } else if (defaultAddressType.includes('BTC') == true) {
                      const x = btcFiltData?.slice(0,count)?.filter(i => 
                        i.hash_id.includes(event.target.value)
                        || moment(i.btc_date).format('Do MMMM YYYY h:mm:ss a')==event.target.value
                         
                          || i.usd_result>0 ? i.usd_result.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')==event.target.value
                          : i.usd_result.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')== -event.target.value
                          || i.usd_fee!=null && Number(i.usd_fee)==Number(event.target.value)
                          || i.comment!=null && i.comment.toLowerCase().includes(event.target.value.toLowerCase())
                          
                        )
                      if (x.length == 0) {
                        setSearchBtc([])
                        setAlertNoTransact(true)
                      } else {
                        setSearchBtc(x)
                      }

                    }
                    else if (defaultAddressType.includes('TRC') == true) {
                      const x = tronFiltData?.slice(0,count)?.filter(i => 
                        i.hash.includes(event.target.value)
                        || moment(i.tron_date).format('Do MMMM YYYY h:mm:ss a')==event.target.value
                          || i.ownerAddress.includes(event.target.value)
                          || i.toAddress.includes(event.target.value)
                          || parseFloat(i.amount_trx).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')==Number(event.target.value)
                          || i.fee!=null && i.fee==Number(event.target.value)
                          || i.comment!=null && i.comment.toLowerCase().includes(event.target.value.toLowerCase())
                          )
                      if (x.length == 0) {
                        setSearchTron([])
                        setAlertNoTransact(true)
                      } else {
                        setSearchTron(x)
                      }

                    }
                  }
                  else if (defaultSelect === 'investment') {
                    const x = resultInv?.filter(i => i.comments?.toLowerCase().includes(event.target.value?.toLowerCase()))
                    if (x.length == 0) {
                      setAlertNoTransact(true)
                    } else {
                      setSearch1(x)
                    }

                  } else if (defaultSelect === 'exchange') {
                    const x = resultFilter3?.filter(i => i.comment?.toLowerCase().includes(event.target.value?.toLowerCase()))
                    setSearch2(x)
                  }
                }}
              />
              <Link
                className="p-2"
                to='/PMS/MainManageAssetsWallets'
                style={{position:'fixed',right:'2px',marginTop:'0.5%'}}
                 state={{ from: wall }}
                 >
                <ArrowCircleLeftOutlinedIcon style={{ color: '#FFC107', fontSize: '27px' }} />
              </Link>
            </Row>
            <Row style={{ marginLeft: '1px',width:'67em' }}>
              <Autocomplete
                disablePortal
                className='p-2'
                id="controllable-states-demo"
                value={wall}
                options={resultPortfolio?.map((e) => e.portfolio_name)}
                onChange={(e, k) => {
                  handleChange(k)
                }}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }} >
                    {children}
                  </Paper>
                )}
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  fontSize: '10px',
                  borderRadius: '30%'
                }}
                sx={{
                  width: '200px',
                  height: '32px',
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '190px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border: '1px solid #d9d9d9 !important',
                    left: '-9px'
                  },
                  '.MuiInputBase-input': {
                    height: '1rem'
                  },
                  '.MuiInputLabel-root': {
                    top: '-0.5em',
                    marginLeft:'-0.5em'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white', fontSize: '14px' }}
                    label="Portfolios"
                  />
                )}
              />
              <FormControl className='p-2' style={{marginLeft:'-1em'}}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '14px',
                    overflow: 'visible',
                    color: 'white',
                    height: '3rem'
                  }}
                >
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
                  value={defaultSelect}
                  label="Select"
                  sx={{
                    width: '190px',
                    height: '32px',
                    border: '1px solid #d9d9d9 !important',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                  }}
                  style={{
                    borderRadius: '4px',
                    width: '200px !important',
                    height: '32px !important',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    left: '4px'
                  }}
                  onChange={handleSelect} >
                  <MenuItem value={'wallet'}>Wallet</MenuItem>
                  <MenuItem value={'investment'}>Investment</MenuItem>
                  <MenuItem value={'exchange'}>Exchange</MenuItem>
                </Select>
              </FormControl>
              {defaultSelect === 'wallet'
                ? (
                  <>
                    <FormControl className='p-2' style={{marginLeft:'-0.5em'}}>
                      <InputLabel
                        id="demo-simple-select-helper-label" >
                        Wallet
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
                        value={defaultWallet}
                        label="Select"
                        sx={{
                          width: '190px',
                          height: '32px',
                          border: '1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: 'white'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          left: '4px'
                        }}
                        onChange={handleChange1} >
                        {r2?.map((e) => (
                          <MenuItem value={e.wallet_name}>
                            {e.wallet_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <FormControl className='p-2'>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '14px',
                    overflow: 'visible',
                    color: 'white',
                    height: '3rem',
                    zIndex:'auto'
                  }}
                >
                  Address-type
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
                  value={defaultAddressType}
                  label="Select"
                  sx={{
                    width: '200px',
                     height: '32px',
                     border:'1px solid #d9d9d9 !important',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                  }}
                  style={{
                    borderRadius: '4px',
                    width: '200px !important',
                    height: '32px !important',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    left: '4px'
                  }}
                  onChange={handleAddressType} >
                  <MenuItem value={'erc'}>ERC-720</MenuItem>
                  <MenuItem value={'trc'}>TRC-720</MenuItem>
                  <MenuItem value={'btc'}>BTC</MenuItem>
                  <MenuItem value={'erc/trc/btc'}>ERC-720/TRC-720/BTC</MenuItem>
                </Select>
              </FormControl> */}
                    <FormControl className='p-2' style={{marginLeft:'-0.5em'}}>
                      <InputLabel id="demo-multiple-checkbox-label"
                        style={{
                          fontSize: '14px',
                          overflow: 'visible',
                          color: 'white',
                          height: '3rem',
                          zIndex: 'auto'
                        }}>Chain
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={defaultAddressType}
                        onChange={(i, e) => handleAddressType(i, e)}
                        input={<OutlinedInput label="Chain" />}
                        renderValue={(selected) => selected.join(', ')}
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
                              },
                              '& .MuiCheckbox-root': {
                                color: 'white'
                              }
                            }
                          }
                        }}
                        sx={{
                          width: '190px',
                          height: '32px',
                          border: '1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: 'white'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          left: '4px'
                        }}
                      // MenuProps={MenuProps}
                      >
                        {typeList.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={defaultAddressType.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))
                        }
                      </Select>
                    </FormControl>

                    {(defaultAddressType.includes('ERC') === true && defaultAddressType.includes('ALL') === false && defaultAddressType.includes('TRC') === false && defaultAddressType.includes('BTC') === false) ||
                      (defaultAddressType.includes('TRC') === true && defaultAddressType.includes('ALL') === false && defaultAddressType.includes('ERC') === false && defaultAddressType.includes('BTC') === false) ||
                      (defaultAddressType.includes('BTC') === true && defaultAddressType.includes('ALL') === false && defaultAddressType.includes('ERC') === false && defaultAddressType.includes('TRC') === false)
                      ?
                      <FormControl className='p-2' style={{marginLeft:'-0.5em'}} >
                        <InputLabel
                          id="demo-simple-select-helper-label"
                          style={{
                            overflow: 'visible',
                            color: 'white',
                            zIndex: 'auto'
                          }} >
                          Address
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
                          label="Select"
                          value={defaultAddress}
                          sx={{
                            width: '190px',
                            height: '32px',
                            border: '1px solid #d9d9d9 !important',
                            '.MuiButtonBase-root': {
                              color: 'white'
                            },
                          }}
                          style={{
                            borderRadius: '4px',
                            width: '200px !important',
                            height: '32px !important',
                            // backgroundColor: '#fff',
                            fontSize: '14px',
                            left: '4px'
                          }}
                          onChange={handleChange2}
                        >
                          {resultAddress?.map((e) => (
                            e.address_type === 'BTC' ?
                              <MenuItem value={e.btc_address_id}>{e.btc_address_id.slice(0, 20) + '...'}</MenuItem>
                              : <MenuItem value={e.address_id}>{e.address_id.slice(0, 20) + '...'}</MenuItem>
                          ))}
                        </Select>
                      </FormControl> : <></>}
                  </>
                )
                : (
                  <></>
                )}
              {defaultSelect === 'exchange'
                ? (
                  <span
                    style={{
                      display: 'flex',
                      marginBottom: '7px'
                    }}
                  >
                    <FormControl className='p-2' style={{ marginRight: '31px' }}>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{
                          overflow: 'visible',
                          color: 'white'
                        }}
                      >
                        Exchange
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
                        label="Select"
                        sx={{
                          width: '190px',
                          height: '32px',
                          border: '1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: 'white'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          left: '4px'
                        }}
                        onChange={handleChange11}
                      >
                        {resultExchange?.map((e) => (
                          <MenuItem value={e.exchange_name}>
                            {e.exchange_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </span>
                )
                : (
                  <></>
                )}

            </Row>
            <Row>
              <FormControl className='p-2' style={{ marginTop: '1%', height: '2em', marginLeft: '-1em' }}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '14px',
                    overflow: "visible",
                    color: "white",
                    height: '3rem',
                    left: '25px'
                  }}
                >
                  days
                </InputLabel>
                <Select
                  MenuProps={{
                    classes: {
                      paper: styles.paper,
                    },
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "lightgrey",
                          color: "black",
                        },
                        "& .MuiMenuItem-root.Mui-selected:hover": {
                          backgroundColor: "lightgrey",
                          color: "black",
                        },
                      },
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select"
                  sx={{
                    width: '190px',
                    height: '32px',
                    border: '1px solid #d9d9d9 !important',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                  }}
                  style={{
                    borderRadius: '4px',
                    width: '200px !important',
                    height: '32px !important',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    left: '25px'

                  }}
                  onChange={(e) => handleChangeDate(e)}
                  value={days}
                >
                  <MenuItem value={30}>
                    30 days
                  </MenuItem>
                  <MenuItem value={90}>
                    3 months
                  </MenuItem>
                  <MenuItem value={180}>
                    6 months
                  </MenuItem>
                  <MenuItem value={365}>
                    1 year
                  </MenuItem>
                  <MenuItem value={1095}>
                    3 year
                  </MenuItem>
                  <MenuItem value={1825}>
                    5 year
                  </MenuItem>
                  <MenuItem value={3650}>
                    10 year
                  </MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider className='p-2' dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  className='p-2'
                  disableFuture={true}
                  value={value}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    // console.log(newValue)
                    setValue(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        borderRadius: '15px',
                        color: 'white',
                        width: '10rem',
                        marginTop: '1%',
                        marginLeft: '1.1em'
                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          width: '190px',
                          height: '32px',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          border: '1px solid #d9d9d9 !important',

                        },
                        '.MuiInputBase-input': {
                          height: '0rem'
                        },
                        '.MuiSvgIcon-root': {
                          fill: 'white'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <LocalizationProvider className='p-2'
                dateAdapter={AdapterDayjs}
              >
                <DatePicker
                  label="To"
                  className='p-2'
                  inputFormat="DD/MM/YYYY"
                  //   openTo="year"
                  // views={['year', 'month', 'day']}
                  value={valueNew}
                  disableFuture={true}
                  onChange={(newValue1) => {

                    setValueNew(newValue1)
                    // setValueNew(moment(newValue1).format("DD-MM-YYYY"))
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        borderRadius: '15px',
                        color: 'white',
                        width: '10rem',
                        marginLeft:'3.1em',
                        marginTop: '1%',
                        zIndex:1,


                      }}
                      sx={{
                        '.MuiOutlinedInput-root': {
                          borderRadius: '4px',
                          width: '190px',
                          height: '32px',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          border: '1px solid #d9d9d9 !important',
                          left: '-12px'
                        },
                        '.MuiInputBase-input': {
                          height: '0rem'
                        },
                        '.MuiSvgIcon-root': {
                          fill: 'white'
                        },
                        '.MuiInputLabel-root':{
                          marginLeft:'0em'
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <div className='p-2' style={{  marginTop: '0.5%' }}>
                {defaultSelect === 'wallet' ?
                  <FormControl className='p-2' style={{ marginTop: '-0.6%', height: '2em',marginLeft:'-0.5em' }}>
                    <InputLabel id="demo-multiple-checkbox-label"
                      style={{
                        fontSize: '14px',
                        overflow: 'visible',
                        color: 'white',
                        height: '3rem',
                        zIndex: 'auto',
                        left: '26px'
                      }}>Token
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={defaultToken}
                      onChange={(i, e) => handleToken(i, e)}
                      input={<OutlinedInput label="Token" />}
                      renderValue={(selected) => selected.join(', ')}
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
                            },
                            '& .MuiCheckbox-root': {
                              color: 'white'
                            }
                          }
                        }
                      }}
                      sx={{
                        width: '190px',
                        height: '32px',
                        border: '1px solid #d9d9d9 !important',
                        '.MuiButtonBase-root': {
                          color: 'white'
                        },
                      }}
                      style={{
                        borderRadius: '4px',
                        width: '200px !important',
                        height: '32px !important',
                        // backgroundColor: '#fff',
                        fontSize: '14px',
                        left: '26px',

                      }}
                    // MenuProps={MenuProps}
                    >
                      { 
                      defaultAddressType.includes('ALL') == true  ? tokenListALL.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={defaultToken.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      )) :
                        (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('TRC') == true) ? tokenListERCTRC.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={defaultToken.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        )) : (defaultAddressType.includes('TRC') == true && defaultAddressType.includes('BTC') == true) ? tokenListTRCBTC.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={defaultToken.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        )) : (defaultAddressType.includes('ERC') == true && defaultAddressType.includes('BTC') == true) ? 
                        tokenListERCBTC.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={defaultToken.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        )) 
                        :
                          defaultAddressType.includes('TRC') == true ? tokenListTRC.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox checked={defaultToken.indexOf(name) > -1} />
                              <ListItemText primary={name} />
                            </MenuItem>
                          )) : defaultAddressType.includes('BTC') == true ?
                            tokenListBTC.map((name) => (
                              <MenuItem key={name} value={name}>
                                <Checkbox checked={defaultToken.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                              </MenuItem>
                            )) : defaultAddressType.includes('ERC') == true ?
                              tokenList.map((name) => (
                                <MenuItem key={name} value={name}>
                                  <Checkbox checked={defaultToken.indexOf(name) > -1} />
                                  <ListItemText primary={name} />
                                </MenuItem>
                              )) : <></>
                      }
                    </Select>
                  </FormControl> : <></>}
                <button
                  className='apply'
                  onClick={() => {
                    newData(value, valueNew)
                  }} >
                  Apply
                </button>
                <button
                  className='clear'
                  onClick={() => {
                   handleClear()
                  }} >
                  Clear
                </button>
              </div>
            </Row>

            <Row id="filter" style={{
              marginLeft: '135px',
              marginTop: '1rem',
              marginBottom: '3rem',
              display: 'none',
              gap: '2rem'
            }}>
              <Autocomplete
                disablePortal
                id="controllable-states-demo"
                value={wall}
                options={resultPortfolio?.map((e) => e.portfolio_name)}
                onChange={(e, k) => {
                  handleChange(k)
                }}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper
                    style={{ background: 'rgb(31, 33, 37)', color: 'white' }}
                  >
                    {children}
                  </Paper>
                )}
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  fontSize: '14px',
                  borderRadius: '30%',
                  width: '9.5rem'
                }}
                sx={{
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    width:'190px'
                  },
                  '.MuiInputBase-input': {
                    height: '1rem'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white', fontSize: '12px' }}
                    label="Portfolios"
                  />
                )}
              />
              <FormControl >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '17px',
                    overflow: 'visible',
                    color: 'white',
                    height: '3rem'
                  }}
                >
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
                  value={defaultSelect}
                  label="Select"
                  sx={{
                    width: '190px',
                    height: '32px',
                    border: '1px solid #d9d9d9 !important',
                    '.MuiButtonBase-root': {
                      color: 'white'
                    },
                  }}
                  style={{
                    borderRadius: '4px',
                    width: '200px !important',
                    height: '32px !important',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    left: '4px'
                  }}
                  onChange={handleSelect}
                >
                  <MenuItem value={'wallet'}>Wallet</MenuItem>
                  <MenuItem value={'investment'}>Investment</MenuItem>
                  <MenuItem value={'exchange'}>Exchange</MenuItem>
                </Select>
              </FormControl>
              {defaultSelect === 'wallet'
                ? (
                  <>
                    <FormControl
                    >
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{
                          overflow: 'visible',
                          color: 'white'
                        }}
                      >
                        Wallet
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
                        value={defaultWallet}
                        label="Select"
                        sx={{
                          width: '190px',
                          height: '32px',
                          border: '1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: 'white'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          left: '4px'
                        }}
                        onChange={handleChange1}
                      >
                        {r2?.map((e) => (
                          <MenuItem value={e.wallet_name}>
                            {e.wallet_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{
                          overflow: 'visible',
                          color: 'white',
                          zIndex: 'auto'
                        }}
                      >
                        Address
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
                        label="Select"
                        value={defaultAddress}
                        sx={{
                          width: '190px',
                          height: '32px',
                          border: '1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: 'white'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '200px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          marginLeft: '-4px'
                        }}
                        onChange={handleChange2}
                      >
                        {resultAddress?.map((e) => (
                          e.address_type === 'BTC' ?
                            <MenuItem value={e.btc_address_id}>{e.btc_address_id.slice(0, 20 + '...')}</MenuItem>
                            : <MenuItem value={e.address_id}>{e.address_id.slice(0, 20) + '...'}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )
                : (
                  <></>
                )}
              <span style={{ marginTop: '5px' }}>
                <Link to="#" onClick={refresh_wallet} >
                  <Tooltip title="Refresh">
                    <Icon
                      icon="ic:sharp-refresh"
                      style={{ fontSize: '25px', color: 'white' }}
                    />
                  </Tooltip>
                </Link>
              </span>
              <Link
                to={
                  roleId.includes('user') === false ? '/PMS/Admin_dashboard' : '/PMS/dashboard'
                }
                style={{ marginTop: '5px' }}
              >
                <ArrowCircleLeftOutlinedIcon
                  style={{ color: 'white', fontSize: '27px' }}
                />
              </Link>
            </Row>
             {loading === true ?
              (
                <Spinner
                  style={{
                    // marginBottom: '-24%',
                    top: "20em",
                    marginLeft: '40%',
                    height: '70px',
                    width: '70px',
                    zIndex: "100",
                    position: "absolute"
                  }}
                  animation="border"
                  variant="primary"
                />
              )
              : null} 
                {/* {showNewTransaction ?
               <LatestSpinner /> : <></>
              }  */}
            <div  ref ={myRef} className='transaction'>
            
              {
                showText && defaultSelect === 'investment' && (
                  <CommonTableTransaction
                  loading={loading}
                    data={sea ? search1 : r === true ? resultFilter.filter(i=>i.status=='Active') : resultInv.filter(i=>i.status==='Active')}
                    columns={columnsInv}
                  />
                )}
              {
                showText === false && defaultSelect === 'wallet' && (
                  <CommonTableTransaction
                  loading={loading}
                    data={defaultAddressType.includes('ALL') == true || addressArray?.[0]?.includes('TRC') == true && addressArray?.[0]?.includes('BTC') == true || addressArray?.[0]?.includes('BTC') == true && addressArray?.[0]?.includes('ERC') == true || addressArray?.[0]?.includes('ERC') == true && addressArray?.[0]?.includes('TRC') == true ? sea ? searchComb : (combFilt == true ?  combFiltData?.slice(0,count) : combinedTransaction) : defaultAddressType.includes('TRC') == false ? defaultAddressType.includes('BTC') == true && sea ? searchBtc : defaultAddressType.includes('BTC') == true ? (btcFilt == true ? btcFiltData?.slice(0,count) : btcTransact) : defaultAddressType.includes('ERC') == true && sea ? search : (r1 == true || defaultToken.includes('ETH') || defaultToken.includes('USDC') || defaultToken.includes('USDT') || defaultToken.includes('ALL') ?  resultFilter1?.slice(0,count) : result11) : sea ? searchTron : (tronFilt == true ? tronFiltData?.slice(0,count) : tronTransaction)}

                    columns={defaultAddressType.includes('ALL') == true || addressArray?.[0]?.includes('TRC') == true && addressArray?.[0]?.includes('BTC') == true || addressArray?.[0]?.includes('BTC') == true && addressArray?.[0]?.includes('ERC') == true || addressArray?.[0]?.includes('ERC') == true && addressArray?.[0]?.includes('TRC') == true ? columnsM : defaultAddressType.includes('TRC') == true ? columnsTron : defaultAddressType.includes('BTC') == true ? columnsBtc : columnsF}
                  />

                )}
              {showText && defaultSelect === 'exchange' && (
                <CommonTableTransaction
                loading={loading}
                  data={sea ? search2 : r === true ? resultFilter3 : resultExchange1}
                  columns={columnsExch}
                />
              )}
              { (defaultSelect === 'wallet' && resultFilter1.length >= 1 ) || (defaultSelect === 'wallet' && tronFiltData.length >= 1) || (defaultSelect === 'wallet' && btcFiltData.length >= 1) || (defaultSelect === 'wallet' && combFiltData.length>=1 ) ?
                <button 
                className={ defaultAddressType.includes('ALL') ?
                  combFiltData.length==combFiltData?.slice(0,count).length ? 'disabled-load-more' : 'load-more' :
                  defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC') ?
                  combFiltData.length==combFiltData?.slice(0,count).length ? 'disabled-load-more' : 'load-more' :
                  defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC') ?
                  combFiltData.length==combFiltData?.slice(0,count).length ? 'disabled-load-more' : 'load-more' :
                  defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC') ?
                  combFiltData.length==combFiltData?.slice(0,count).length ? 'disabled-load-more' : 'load-more' :

                  defaultAddressType.includes('ERC') ?
                  (resultFilter1.length == resultFilter1?.slice(0,count).length ? 'disabled-load-more' : 'load-more') :
                  defaultAddressType.includes('TRC') ?
                  (tronFiltData.length==tronFiltData?.slice(0,count).length ? 'disabled-load-more' : 'load-more') : 
                  defaultAddressType.includes('BTC') ?
                  (btcFiltData.length == btcFiltData?.slice(0,count).length ? 'disabled-load-more' : 'load-more') :
                  'load-more'
                // || (tronFiltData.length==tronFiltData?.slice(0,count).length)  ? 'disabled-load-more' : 'load-more'
              }
                 disabled={ defaultAddressType.includes('ALL') ?
                 combFiltData.length==combFiltData?.slice(0,count).length  :
                 defaultAddressType.includes('ERC') && defaultAddressType.includes('TRC') ?
                 combFiltData.length==combFiltData?.slice(0,count).length   :
                 defaultAddressType.includes('TRC') && defaultAddressType.includes('BTC') ?
                 combFiltData.length==combFiltData?.slice(0,count).length   :
                 defaultAddressType.includes('ERC') && defaultAddressType.includes('BTC') ?
                 combFiltData.length==combFiltData?.slice(0,count).length  :
                  defaultAddressType.includes('ERC') ?
                 resultFilter1.length == resultFilter1?.slice(0,count).length : defaultAddressType.includes('TRC') ?
                 tronFiltData.length==tronFiltData?.slice(0,count).length : btcFiltData.length==btcFiltData?.slice(0,count).length 
                  //  || (btcFiltData.length==btcFiltData?.slice(0,count).length) || (combFiltData.length==combFiltData?.slice(0,count))
                  }
                  onClick={handleLoadMore} >
                  Load More
                </button> : <></>}
            </div>


          </Col>

        </Row>
      </Container>
      <Modal
        show={showComment}
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
              onClick={() => setShowComment(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          {alert
            ? (
              <Snackbar
                open={alert}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
               {(dataNew.tron_address_id && dataNew?.comment!=null) || (dataNew.transaction_id && dataNew?.comments!=null) || (dataNew.btc_address_id && dataNew?.comment!=null) || dataNew?.comment!=null ?
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Comment Updated Successfully
            </Alert> :
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Comment Added Successfully
            </Alert>
            }
              </Snackbar>
            )
            : (
              <></>
            )}
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmitForm}
            >{(dataNew.tron_address_id && dataNew?.comment!=null) || (dataNew.transaction_id && dataNew?.comments!=null) || (dataNew.btc_address_id && dataNew?.comment!=null) || dataNew?.comment!=null ?
              <h4>
                Update Tags/Comments
              </h4> :
              <h4>
              Add Tags/Comments
            </h4>}
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
                  placeholder="Comment"
                  onChange={(e) => setname(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Comment Required.
                </Form.Control.Feedback>
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
        </div>
      </Modal>
      <Modal
        show={showInvestUpdateModal}
        onHide={handleCloseInvestmentModal}
        style={{ width: '28%', marginLeft: '35%', overflow: 'hidden' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >

            <IconButton
              style={{ position: 'absolute', top: '0', right: '0' }}
              sx={{
                '.MuiSvgIcon-root': {
                  fill: 'white'
                }
              }}
              onClick={() => setShowInvestUpdateModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              style={{ marginBottom: '4%' }}
              onSubmit={handleUpdateComment}
            >
              {alertInvestComment
                ? (
                  <Snackbar
                    open={alertInvestComment}
                    onClose={() => setAlertInvest(false)}
                    sx={{
                      marginLeft: '35%',
                      marginBottom: '40%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertInvest(false)}
                      severity="success"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Add comment successfully
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              {alertForInvestValue
                ? (
                  <Snackbar
                    open={alertForInvestValue}
                    onClose={() => setAlertForInvestValue(false)}
                    sx={{
                      marginLeft: '35%',
                      marginBottom: '40%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertForInvestValue(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Investment value should be numeric
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              <h4>
                Add Comment
              </h4>
              <Form.Label
                htmlFor="value"
                className={cx('custom-form-box', {
                  'focus-add': comment
                })}
                style={{
                  width: '72%',
                  marginBottom: '10%',
                  marginLeft: '15%',
                  marginTop: '-2%'
                }}
              >
                {' '}
                <Form.Control
                  type="text"
                  id="value"
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Comments Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn btn-gray"
                // onClick={handleUpdateInvestment}
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  marginTop: '-6%',
                  boxShadow: 'none'
                }}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        show={showExchangeModal}
        onHide={() => setShowExchangeModal(false)}
        style={{ width: '28%', marginLeft: '35%', overflow: 'hidden' }}
      >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >

            <IconButton
              style={{ position: 'absolute', top: '0', right: '0' }}
              sx={{
                '.MuiSvgIcon-root': {
                  fill: 'white'
                }
              }}
              onClick={() => setShowExchangeModal(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              style={{ marginBottom: '4%' }}
              onSubmit={handleSubmitExchange}
            >
              {alertExchComment
                ? (
                  <Snackbar
                    open={alertExchComment}
                    onClose={() => setAlertExchComment(false)}
                    sx={{
                      marginLeft: '35%',
                      marginBottom: '40%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertExchComment(false)}
                      severity="success"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Add comment successfully
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              <h4>
                Add Comments
              </h4>
              <Form.Label
                htmlFor="type"
                className={cx('custom-form-box', {
                  'focus-add': exch_comment
                })}
                style={{
                  width: '72%',
                  marginBottom: '10%',
                  marginLeft: '15%',
                  marginTop: '-2%'
                }}
              >
                {' '}
                <Form.Control
                  type="text"
                  id="type"
                  name="comment"
                  value={exch_comment}
                  onChange={(e) => setExch_comment(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Comment Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn btn-gray"
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  marginTop: '-6%',
                  boxShadow: 'none'
                }}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        show={showComment}
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
              onClick={() => setShowComment(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          {alert
            ? (
              <Snackbar
                open={alert}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '38%',
                  width: '25%'
                }}
              >
                {(dataNew.tron_address_id && dataNew?.comment!=null) || (dataNew.transaction_id && dataNew?.comments!=null) || (dataNew.btc_address_id && dataNew?.comment!=null) || dataNew?.comment!=null ?
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Comment Updated Successfully
            </Alert> :
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Comment Added Successfully
            </Alert>
            }
              </Snackbar>
            )
            : (
              <></>
            )}
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmitFormTron}
            >
              {(dataNew.tron_address_id && dataNew?.comment!=null) || (dataNew.transaction_id && dataNew?.comments!=null) || (dataNew.btc_address_id && dataNew?.comment!=null) || dataNew?.comment!=null ?
              <h4>
                Update Tags/Comments
              </h4> :
              <h4>
              Add Tags/Comments
            </h4>}
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
                  placeholder="Comment"
                  onChange={(e) => setname(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Comments Required.
                </Form.Control.Feedback>
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
        </div>
      </Modal>
      <Modal
        show={alertNoTransaction}
        onHide={() => setAlertNoTransaction(false)}
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
              fontSize: '18px',
              marginTop: '-5%',
              marginLeft: '11%',
              fontWeight: 'bold'
            }}
          >
            Please select back date to see transaction.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: '#222429',
            borderTop: 'none',
            paddingRight: '34%',
            marginTop: '-4%',
            width: '42em',
            justifyContent: 'center'
          }}
        >
          <button
            className='past-transaction'
            onClick={() => {
              setAlertNoTransaction(false)
            }}
          >
            OK
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>

  )
          }
export default AdminTransactions
