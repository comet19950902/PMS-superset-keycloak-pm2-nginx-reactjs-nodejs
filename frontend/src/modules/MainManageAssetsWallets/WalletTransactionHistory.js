import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import '../../Admin/DashboardAdmin/DashboardAdmin.css'
import CommonTableTransaction from "../../common/CommonTable/CommonTableTransaction";
import Header from '../../common/Header/Header'
import { Container, Row, Col, Spinner,Modal } from 'react-bootstrap'
import { Icon } from '@iconify/react'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Autocomplete from '@mui/material/Autocomplete'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../../common/SearchBox/SearchBox'
import { textFilter,numberFilter,dateFilter } from 'react-bootstrap-table2-filter';
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
let addressArray=[]
function WalletTransactionHistory () {
  const styles = useStyles()
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const [resultPortfolio, setResultPortfolio] = useState([])
  const [tronTransaction,setTronTransaction] = useState([])
  const [invest_type, setInvest_type] = useState('')
  const [searchBtc, setSearchBtc] = useState('')
  const [btcTransact, setBtcTransact] =useState([])
  const [addressType, setAddressType] = useState('')
  const [date_of_invest, setDate_of_invest] = useState('')
  const [invest_value, setInvest_value] = useState('')
  const [comment, setComment] = useState('')
  const [tokenType, setTokenType] = useState('usdt')
  const [resultTrans, setResultTrans] = useState([])
  const [combinedTransaction, setCombinedTransaction] = useState([])
  const [defaultWallet, setDefaultWallet] = useState('')
  const [defaultAddress, setDefaultAddress] = useState('')
  const [r, setR] =useState(false)
  const[defaultToken1,setDefaultToken1]=useState('usdt')
  const [tronFilt,setTronFilt]=useState('')
  const [tronFiltData,setTronFiltData]=useState([])
  const [alertNoRecord,setAlertNoRecord] = useState(false)
  const [btcFilt,setBtcFilt]=useState(false)
  const [btcFiltData,setBtcFiltData]=useState([])
  const [selectedWallet, setSelectedWallet]=useState([])
  const [defaultAddressType, setDefaultAddressType] = useState(['ERC'])
  const[defaultToken,setDefaultToken]=useState(['USDT','USDC','ETH','ALL'])
  const [resultFilter1, setResultFilter1] = useState([])
  const [loading, setloading] = useState(false)
  const [combFilt,setCombFilt]=useState(false)
  const [combFiltData,setCombFiltData]=useState([])
  const [searchTron, setSearchTron] = useState([])
  const [showInvestUpdateModal, setShowInvestUpdateModal] = useState(false)
  const [userId, setUserId] = useState(getId)
  const location = useLocation()
  const typeList = ['ALL','ERC','TRC','BTC'];
  const tokenListERCTRC = ['USDT','USDC','ETH','TRX'];
  const tokenListTRCBTC = ['TRC','BTC'];
  const tokenListERCBTC = ['USDT','USDC','ETH','BTC'];
  const tokenListALL = ['USDT','USDC','ETH','TRX','BTC'];
  const tokenListTRC = ['ALL','TRX','USDT','USDC'];
  const tokenListBTC = ['BTC'];
  const tokenList = ['ALL','USDT','USDC','ETH'];
  let timeFilter, typeFilter, chainFilter, amountFilter, commentFilter, addressFilter,txnFilter
  let transactionFilter, tokenFilter,toFilter,statusFilter,resultsFilter,  hashFilter, blockFilter,fromFilter,timestampFilter
  const locationName = location.state?.data
  const port_id = location.state?.data?.portfolio_id
  const handlePortfolios = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    await axios(config).then(function (response) {
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
        setResultPortfolio(arr)
        setAllInvestData(arr[0].portfolio_name)
      } else {
        setResultPortfolio(rs)
        setAllInvestData(rs[0].portfolio_name)
      }
      if (port_id != undefined) {
        const dp = rs?.filter(i => i.portfolio_id == port_id)
        wallet(port_id)
        setAllInvestData(dp[0].portfolio_name)
      } else {
        const di = rs?.filter(i => i.portfolio_name == location.state?.data)
        const p = di?.[0]?.portfolio_id
        wallet(p)
        setAllInvestData(di[0].portfolio_name)
       
      }
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
    await handlePortfolios()
  }, [])
  const combinedTrans = async(pid)=>{
    var config = {
    method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_all_transactions`,
      params: {
        portfolio_id: pid
      },
    };
      axios(config).then(function (responseTrans) {
        if(responseTrans.data){
          responseTrans.data.sort((a, b) => {
            const x = a.date
            const y = b.date
            return x > y ? -1 : x < y ? 1 : 0
          }) 
      }
      let wd = result.filter(i=>i.wallet_name==defaultWallet)
      let walletTrans = responseTrans.data.filter(k=>k.wallet_id==wd?.[0]?.walletId)
      const temp21 =  walletTrans?.map(record=> {
        // const temp31 = record.cate_id==="receive" ? JSON.parse(record?.recieve_data)?.[0] : 0
        const temp41 = record.tokenType==='TRON' ? parseInt(record.amount)*Math.pow(10,-record.tokenDecimal) * record.tron_usd_fee>0 ? parseInt(record.amount)*Math.pow(10,-record.tokenDecimal) * record.tron_usd_fee : 0 : record.tokenType==='BTC' ? parseInt(record.amount)/100000000 : record.cate_id=="send" ? JSON.parse(record?.send_data)?.[0] : record.cate_id==null && record.send_data!='[]' ? JSON.parse(record?.send_data)?.[0] : record.cate_id==null && record.recieve_data!='[]' ? JSON.parse(record?.recieve_data)?.[0] : JSON.parse(record?.recieve_data)?.[0]
        const fe =  record.amount==='null' ? '-' : JSON.parse(record.amount)
    
        const tId = record.tokenType==='TRON' ? 'trx' : record.tokenType==='BTC' ? 'BTC' : temp41?.token_id=='eth' ? 'eth' : Object.values(JSON.parse(record.symbol)).filter(i=>i.id==temp41?.token_id)?.[0]?.symbol
        const date1 = record.date.length>10 ? parseInt(record.date)/1000 : record.date
        return {...record, return_amount1:  record.tokenType==='BTC' ? parseFloat(parseFloat(record.btc_usd_result).toFixed(2)).toLocaleString().replace(/\.00$/, '') : temp41?.amount!=undefined ? parseFloat(parseFloat(temp41?.amount).toFixed(2)).toLocaleString().replace(/\.00$/, '')   : record.tokenType=='TRON' ? parseInt(record.amount)*Math.pow(10,-record.tokenDecimal) * record.tron_usd_fee>0 ? parseFloat(parseFloat((record.amount)*Math.pow(10,-record.tokenDecimal) * record.tron_usd_fee).toFixed(2)).toLocaleString().replace(/\.00$/, '') : parseFloat(parseFloat(record.amount)*Math.pow(10,-record.tokenDecimal) * record.tron_usd_fee).toFixed(2).toLocaleString().replace(/\.00$/, '') : 0, time:parseInt(date1), fee:record.tokenType==='BTC' ? parseFloat(parseFloat(record.btc_usd_fee).toFixed(2)).toLocaleString().replace(/\.00$/, '')   : record.tokenType==='TRON' ? 1 : record.tokenType!='TRON' && record.tokenType!='BTC' && record.amount!='null' ? parseFloat(parseFloat(fe?.usd_gas_fee).toFixed(2)).toLocaleString().replace(/\.00$/, '') : '-' , tokenId:tId }
    })
      setCombinedTransaction(temp21)
      var d2 = Math.floor(new Date().getTime() / 1000);
  var d1 = d2 - 30*86400
   setCombFilt(true);
   let r1 = temp21.filter(
     (item) =>
      item.time  >= d1 &&
     item.time <= d2 && Math.abs(item.return_amount1) >= 1
   );
  //  console.log('rr',r1,temp21)
  if(addressArray[0].includes('ALL')==true || (addressArray[0].includes('TRC')==true && addressArray[0].includes('BTC')==true) || (addressArray[0].includes('BTC')==true && addressArray[0].includes('ERC')==true) || (addressArray[0].includes('ERC')==true && addressArray[0].includes('TRC')==true) || (addressArray[0].includes('ERC')==true && addressArray[0].includes('TRC')==true && addressArray[0].includes('BTC')==true)){
    setCombinedTransaction(temp21)
    // console.log(temp21,walletTrans)
    var d2 = Math.floor(new Date().getTime() / 1000);
  var d1 = d2 - 30*86400
   setCombFilt(true);
   let r1 = temp21.filter(
     (item) =>
      item.time  >= d1 &&
     item.time <= d2 && Math.abs(item.return_amount1) >= 1
   );
    if((addressArray[0].includes('ERC')==true && addressArray[0].includes('TRC')==true && addressArray[0].includes('BTC')==true)){
      setDefaultToken(['USDT','USDC','ETH','TRX','BTC'])
    let rr = r1.filter(item=>item.tokenId=='eth' || item.tokenId=='USDC' || item.tokenId=='USDT' || item.tokenId=='trx'|| item.tokenId=='BTC')
    // console.log('rr',rr,temp21)
  setCombFiltData(rr) 
   }
   else if((addressArray[0].includes('TRC')==true && addressArray[0].includes('BTC')==true)){
    setDefaultToken(['TRX','BTC'])
    let rr = r1.filter(item=> item.tokenId=='BTC' || item.tokenId=='trx')
    // console.log('rr',rr,temp21)
  setCombFiltData(rr) 
   }else if((addressArray[0].includes('BTC')==true && addressArray[0].includes('ERC')==true)){
    let rr = r1.filter(item=>item.tokenId=='eth' || item.tokenId=='USDC' || item.tokenId=='USDT' || item.tokenId=='BTC')
   
  setCombFiltData(rr) 
   }else if((addressArray[0].includes('ERC')==true && addressArray[0].includes('TRC')==true)){
    setDefaultToken(['USDT','USDC','ETH','TRX'])
    let rr = r1.filter(item=>item.tokenId=='eth' || item.tokenId=='USDC' || item.tokenId=='USDT' || item.tokenId=='trx')
   
  setCombFiltData(rr) 
   }else{
    setDefaultToken(['USDT','USDC','ETH','TRX','BTC'])
   let rr = r1.filter(item=>item.tokenId=='eth' || item.tokenId=='USDC' || item.tokenId=='USDT' || item.tokenId=='BTC' || item.tokenId=='trx')
  setCombFiltData(rr) 
   }
  }
    });
    }
  const trondata=(pid)=>{
    // if(b.address_list==undefined || b.address_list?.[2]?.address_type!='ETH'){
  var config = {
  method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
    params: {
      // user_id: getId,
      portfolio_id: pid,
      address_type:'TRON'
    },
  };
   axios(config).then(function (response1) {
    const rs = response1.data?.[0]?.address_id
    let wd = selectedWallet.filter(i=>i.wallet_name==defaultWallet)
    let addr2 = response1.data.filter(k=>k.wallet_id==wd?.[0]?.walletId)
    setDefaultAddress(rs)
    setResultAddress(addr2);
    trontransaction(rs)
      //  tronData=response1.data
  });
}
const trontransaction=(aid)=>{
  // if(b.address_list==undefined || b.address_list?.[2]?.address_type!='ETH'){
var config = {
method: "get",
  url: `${process.env.REACT_APP_BASE_URL}/get_tron_transactions`,
  params: {
    // user_id: getId,
    address_id: aid,
    address_type:'TRON'
  },
};
 axios(config).then(function (response1) {
  setTronTransaction(response1.data)
  if(response1.data){
    response1.data.sort((a, b) => {
      const x = (a.timestamp) / 1000
      const y = (b.timestamp) / 1000
      return x > y ? -1 : x < y ? 1 : 0
    })
  }
  const tempTron= response1.data.map(record=>{
    const amt1 = parseInt(record.amount)
    const dec= parseInt(record.tokenDecimal)

    const amt = (amt1 * Math.pow(10,-dec)) * record.energy_fee
    return {...record, USD_amount: record.methodName=='TRX Transfer' ? amt.toFixed(2).replace(/\.00$/, '') :record.usdt_token_value, tokenName:record.methodName=='TRX Transfer' ? record.tokenName : 'USDT'}
  })
  var d2 = Math.floor(new Date().getTime() / 1000);
  var d1 = d2 - 30*86400
   setTronFilt(true);
   setDefaultToken(['ALL','TRX','USDT','USDC'])
   var r1 = tempTron.filter(
     (item) =>
     item.timestamp / 1000 >= d1 &&
     item.timestamp  / 1000 <= d2 && parseFloat(item.USD_amount)>=1
   );
   if(defaultToken.includes('TRX') || defaultToken.includes('USDT') || defaultToken.includes('USDC') || defaultToken.includes('ALL') ){
    let filterData = r1.filter(i=>i.tokenName=='trx' || i.tokenName=='USDT')
    setTronFiltData(filterData)
   }else{
    let filterData = r1.filter(i=>i.tokenName=='trx' || i.tokenName=='USDT')
    setTronFiltData(filterData)
   }
 });
  //  console.log(r1);
   setloading(false)
}
const btcdata=async(pid)=>{
  var config = {
  method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_btc`,
    params: {
      // user_id: getId,
      portfolio_id: pid,
      address_type:'BTC'
    },
  };
    axios(config).then(function (response3) {
    const rs = response3.data?.[0]?.btc_address_id
    let wd = result.filter(i=>i.wallet_name==defaultWallet)
    let addr2 = response3.data.filter(k=>k.wallet_id==wd?.[0]?.walletId)
    setDefaultAddress(rs)
    setResultAddress(addr2);
    btctransaction(rs)
    // trontransaction(tvalue)
    
    //  setDefaultAddressType('btc')
        // tronData=response1.data
  });
  }
  const btctransaction=async(aid)=>{
    var config = {
    method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/get_btc_transactions`,
      params: {
        // user_id: getId,
        btc_address_id: aid,
        address_type:'BTC'
      },
    };
     await axios(config).then(function (response1) {
      if(response1.data){
        response1.data.sort((a, b) => {
          const x = a.time
          const y = b.time
          return x > y ? -1 : x < y ? 1 : 0
        })
    }
    const tempBtc = response1.data?.map(record=> {
      const resultUsd = parseFloat(record.usd_result)
      const feeUsd = parseFloat(record.usd_fee)
      return {...record, usd_result:parseFloat(resultUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''), usd_fee:parseFloat(feeUsd.toFixed(2)).toLocaleString().replace(/\.00$/, ''),btc_date:new Date(record.time*1000).toUTCString()}
  })
      setBtcTransact(tempBtc)
      setDefaultToken(['BTC'])
      var d2 = Math.floor(new Date().getTime() / 1000);
      var d1 = d2 - 30*86400
      setBtcFilt(true);
      var r1 = tempBtc.filter(
        (item) =>
          item.time >= d1 &&
          item.time <= d2 || item.addressType=='BTC'
      );
     setBtcFiltData(r1)
     });
    }
  
  const wallet = async (pi) => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_wallets`, {
        params: { portfolio_id: pi }
      })
      .then((response) => {
        const p = response.data?.[0]?.portfolio_id
        const w = response.data?.[0]?.walletId
        address(p, w)
        setDefaultWallet(response.data?.[0]?.wallet_name)
        setResult(response.data)
        setSelectedWallet(response.data)
      })
  }
  const address = async (p, w) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params:
        {
          wallet_id: w,
          portfolio_id: p
        }
      })
      .then((response) => {
        let addr_data = response.data.filter(i=>i.wallet_id==w)
        const t = addr_data?.[0]?.address_id
        setDefaultAddress(t)
        setResultAddress(addr_data)
        transaction(t)
      })
  }
  const handleAddressType= async(e,i)=>{
    console.log(i,e)
    if((!e.target.value.includes('ERC') || !e.target.value.includes('TRC') || !e.target.value.includes('BTC')) && i.props.value!='ALL') e.target.value=(e.target.value).filter(item=>item!='ALL')
    if((e.target.value.includes('ERC') && e.target.value.includes('TRC') && e.target.value.includes('BTC'))  && i.props.value!='ALL') e.target.value=['ALL','ERC','TRC','BTC']
    console.log(e.target.value)
    setDefaultAddressType([])
    setDefaultToken([])
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
   
    // addressArray=[]
    console.log(e.target.value, defaultAddressType,addressArray)
    setDefaultAddressType(e.target.value)
    //  if( addressArray.includes("erc","btc")===true){
    //   console.log('erc,btc')
    //   setResultAddress([])
    //    setCombinedTransaction([])
    //    const p = resultPortfolio.filter(i=>i.portfolio_name===wall)
    //    const p1=p?.[0]?.portfolio_id
    //    combinedTrans(p1)
    // }
    // for(let i=0;i<addressArray.length;i++){
      if(( !addressArray[0].includes('ALL') && (addressArray[0].includes('ERC') && addressArray[0].includes('TRC') && addressArray[0].includes('BTC'))  )){//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value=[]
        addressArray[0]=[]
        setDefaultAddressType([])
   }
     if(addressArray[0].includes('ALL')===true ){
      setResultAddress([])
      setDefaultAddressType(['ALL','ERC','TRC','BTC'])
      setloading(true)
     const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
     const p1=p?.[0]?.portfolio_id
     combinedTrans(p1)
    
     setloading(false)
  }
      else if(addressArray[0].includes('ERC')===true && addressArray[0].includes('TRC')===true ){
         setResultAddress([])
        setDefaultAddressType(['ERC','TRC'])
        tdata={}
        const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
        const p1=p?.[0]?.portfolio_id
        combinedTrans(p1)
        // addressArray[i].push('ERC','TRC')
     }
     else if(addressArray[0].includes('TRC')===true && addressArray[0].includes('BTC')===true){
      // console.log('BTC,TRC')
       setResultAddress([])
       setDefaultAddressType(['TRC','BTC'])
       tdata={}
     const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
      const p1=p?.[0]?.portfolio_id
      combinedTrans(p1)
      // addressArray[i].push('TRC','BTC')
   }
   else if(addressArray[0].includes('ERC')===true && addressArray[0].includes('BTC')===true){
    // console.log('BTC,ETH')
     setResultAddress([])
     setDefaultAddressType(['ERC','BTC'])
     tdata={}
  const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
    const p1=p?.[0]?.portfolio_id
    combinedTrans(p1)
    // addressArray[i].push('ERC','BTC')
 }
  else if(addressArray[0].includes('TRC')===true){
     setResultAddress([])
     console.log('TRC')
     setDefaultAddressType(e.target.value)
     setDefaultToken(['ALL','TRX','USDT','USDC'])
    const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
    const p1=p?.[0]?.portfolio_id
    await trondata(p1)
  }
 
  else if(addressArray[0].includes('BTC')===true){
    setResultAddress([])
    setDefaultAddressType(e.target.value)

   const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
   const p1=p?.[0]?.portfolio_id
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

  else if(addressArray[0].includes('ERC')===true){
    setResultAddress([])
    setDefaultAddressType(e.target.value)
     setDefaultToken(['ALL','USDT','USDC','ETH'])
    let p1 = resultTrans.filter(i=>i.wallet_name===defaultWallet)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params: {
          wallet_id: p1?.[0]?.walletId,
          portfolio_id: p1?.[0]?.portfolio_id
        }
      })
      .then((response) => {
        setResultAddress(response.data)
        setDefaultAddress(response.data?.[0]?.address_id)
        // console.log('eth Add')
        // transactionData = response.data
      })
  // }
}else if(addressArray[0].includes('ALL')===true ){
        
  //  addressArray[i].push('ERC','TRC','BTC')
    setDefaultAddressType(['ERC','TRC','BTC','ALL'])
  setResultAddress([])
  setloading(true)
 const p = resultPortfolio.filter(i=>i.portfolio_name===allInvestData)
 const p1=p?.[0]?.portfolio_id
 combinedTrans(p1)

 setoading(false)
}
  }

  const handleToken=(e,i)=>{

    console.log(i,e)
    if((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('ETH')) && i.props.value!='ALL') e.target.value=(e.target.value).filter(item=>item!='ALL')
    if((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH'))  && i.props.value!='ALL') e.target.value=['ALL','USDT','USDC','ETH']
    console.log(e.target.value)

    

    setResultFilter1([])
    setTronFiltData([])
    setCombFiltData([])
    setDays(30)
   
    let  d2 = Math.floor(new Date().getTime() / 1000);
          let d1 = d2 - 30*86400
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          if(resultTrans.length==0){
            setAlertNoRecord(true)
          }
          var r2 = tronTransaction.filter(
            (item) =>
              item.timestamp/1000 >= d1 &&
              item.timestamp/1000 <= d2 && parseFloat(item.USD_amount)>=1
          );
          if(tronTransaction.length==0){
            setAlertNoRecord(true)
          }
          var r3 = combinedTransaction.filter(
            (item) =>
              item.date >= d1 &&
              item.date <= d2 
          );
          if(combinedTransaction.length==0){
            setAlertNoRecord(true)
          }
          // console.log(defaultToken,e.target.value,r1,addressArray,defaultAddressType)
    // console.log(e.target.value)
    // if(e.target.value.includes('ALL')==true){
    //   setDefaultToken(['USDT','USDC','ETH','ALL'])
    // }else{
     
     if(defaultAddressType.includes('ALL')==true){
      if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true && e.target.value.includes('TRX')==true && e.target.value.includes('BTC')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' || i.tokenId=='eth' || i.tokenId=='trx' || i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(['ALL','USDT','USDC','ETH','TRX','BTC'])
      }
      else if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
  
      
      }else if( e.target.value.includes('USDT')==true && e.target.value.includes('ETH')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      
      }else if(e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDT')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDT'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDC')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('ETH')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='eth'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDT')==true && e.target.value.includes('BTC')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDT'|| i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDC')==true && e.target.value.includes('BTC')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('ETH')==true && e.target.value.includes('BTC')==true ){
        let otherData = r1.filter(i=>i.tokenId=='eth'|| i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }

      else if(e.target.value.includes('USDT')==true){
        let usdData = r3.filter(i=>i.tokenId=='USDT')
        console.log('a',usdData)
        setCombFiltData(usdData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDC')==true){
        let usdData = r1.filter(i=>i.tokenId=='USDC')
        console.log('a',usdData)
        setCombFiltData(usdData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('ETH')==true){
        let otherData = r1.filter(i=>i.tokenId=='eth')
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
     }else if(defaultAddressType.includes('ERC')==true && defaultAddressType.includes('TRC')==true ){
      if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true && e.target.value.includes('TRX')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' || i.tokenId=='eth' || i.tokenId=='trx')
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(['USDT','USDC','ETH','TRX'])
      }
      else if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
  
      
      }else if( e.target.value.includes('USDT')==true && e.target.value.includes('ETH')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      
      }else if(e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDT')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDT'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDC')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('ETH')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='eth'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDT')==true){
        let usdData = r3.filter(i=>i.tokenId=='USDT')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDC')==true){
        let usdData = r1.filter(i=>i.tokenId=='USDC')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('ETH')==true){
        let otherData = r1.filter(i=>i.tokenId=='eth')
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }

     }else if(defaultAddressType.includes('TRC')==true && defaultAddressType.includes('BTC')==true ){
      if( e.target.value.includes('TRX')==true && e.target.value.includes('BTC')==true ){
        let otherData = r3.filter(i=> i.tokenId=='trx' || i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(['TRX','BTC'])
      } else if( e.target.value.includes('TRX')==true ){
        let otherData = r3.filter(i=> i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } if(  e.target.value.includes('BTC')==true ){
        let otherData = r3.filter(i=>  i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
        setDefaultToken(e.target.value)
      }
     }else if(defaultAddressType.includes('ERC')==true && defaultAddressType.includes('TRC')==true ){
      if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true && e.target.value.includes('TRX')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' || i.tokenId=='eth' || i.tokenId=='trx')
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(['USDT','USDC','ETH','TRX'])
      }
      else if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
  
      
      }else if( e.target.value.includes('USDT')==true && e.target.value.includes('ETH')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      
      }else if(e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDT')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDT'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDC')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('ETH')==true && e.target.value.includes('TRX')==true ){
        let otherData = r1.filter(i=>i.tokenId=='eth'|| i.tokenId=='trx' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('TRX')==true){
        let usdData = r3.filter(i=>i.tokenId=='TRX')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDT')==true){
        let usdData = r3.filter(i=>i.tokenId=='USDT')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDC')==true){
        let usdData = r1.filter(i=>i.tokenId=='USDC')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('ETH')==true){
        let otherData = r1.filter(i=>i.tokenId=='eth')
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }


    }else if(defaultAddressType.includes('ERC')==true && defaultAddressType.includes('BTC')==true ){
      if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true && e.target.value.includes('BTC')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' || i.tokenId=='eth' || i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(['USDT','USDC','ETH','BTC'])
      }
      else if(e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='USDC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
  
      
      }else if( e.target.value.includes('USDT')==true && e.target.value.includes('ETH')==true ){
        let otherData = r3.filter(i=>i.tokenId=='USDT' || i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      
      }else if(e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='eth' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDT')==true && e.target.value.includes('BTC')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDT'|| i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('USDC')==true && e.target.value.includes('BTC')==true ){
        let otherData = r1.filter(i=>i.tokenId=='USDC'|| i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('ETH')==true && e.target.value.includes('BTC')==true ){
        let otherData = r1.filter(i=>i.tokenId=='eth'|| i.tokenId=='BTC' )
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('BTC')==true){
        let usdData = r3.filter(i=>i.tokenId=='BTC')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }

      else if(e.target.value.includes('USDT')==true){
        let usdData = r3.filter(i=>i.tokenId=='USDT')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('USDC')==true){
        let usdData = r1.filter(i=>i.tokenId=='USDC')
        console.log('a',usdData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }else if(e.target.value.includes('ETH')==true){
        let otherData = r1.filter(i=>i.tokenId=='eth')
        console.log('b',otherData)
        setCombFiltData(otherData)
         setDefaultToken(e.target.value)
      }

    }else if(defaultAddressType.includes('ERC')===true){
      if(( !e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('ETH'))  )){//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
          e.target.value=[]
        setDefaultToken([])
     }
    else  if(e.target.value.includes('ALL')==true ){// && e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true &&  e.target.value.includes('ETH')==true
      let otherData = r1.filter(i=>i.tokens=='USDT' || i.tokens=='USDC' || i.tokens=='eth' )
      console.log('b',otherData)
      setResultFilter1(otherData)
      e.target.value=['ALL','USDT','USDC','ETH']
       setDefaultToken(e.target.value)
    } 
     else if( e.target.value.includes('USDT')==true && e.target.value.includes('USDC')==true && e.target.value.includes('ALL')==false ){
      let otherData = r1.filter(i=>i.tokens=='USDT' || i.tokens=='USDC' )
      console.log('b',otherData)
       setResultFilter1(otherData)
      //  e.target.value=['USDT','USDC']
      //  setDefaultToken(e.target.value)

    
    }else  if( e.target.value.includes('USDT')==true && e.target.value.includes('ETH')==true ){
      let otherData = r1.filter(i=>i.tokens=='USDT' || i.tokens=='eth' )
      console.log('b',otherData)
       setResultFilter1(otherData)
      //  e.target.value=['USDT','ETH']
      //  setDefaultToken(e.target.value)
    
    }else  if( e.target.value.includes('USDC')==true && e.target.value.includes('ETH')==true ){
      let otherData = r1.filter(i=>i.tokens=='USDC'|| i.tokens=='eth' )
      console.log('b',otherData)
       setResultFilter1(otherData)
      //  e.target.value=['USDC','ETH']
      //  setDefaultToken(e.target.value)
    }else if(e.target.value.includes('USDT')==true){
      let usdData = r1.filter(i=>i.tokens=='USDT')
      console.log('a',usdData)
       setResultFilter1(usdData)
      //  setDefaultToken(e.target.value)
    }else if(e.target.value.includes('USDC')==true){
      let usdData = r1.filter(i=>i.tokens=='USDC')
      console.log('a',usdData)
       setResultFilter1(usdData)
      //  setDefaultToken(e.target.value)
    }else if(e.target.value.includes('ETH')==true){
      let otherData = r1.filter(i=>i.tokens=='eth')
      console.log('b',otherData)
       setResultFilter1(otherData)
      //  setDefaultToken(e.target.value)
    } else if(e.target.value.includes('ALL')==true ){
      let otherData = r1.filter(i=>i.tokens=='USDT' || i.tokens=='USDC' || i.tokens=='eth' )
      console.log('b',otherData)
      setResultFilter1(otherData)
      // e.target.value=['ALL','USDT','USDC','ETH']
      //  setDefaultToken(e.target.value)
    }  
  }
   
    else if(defaultAddressType.includes('TRC')==true){
      if((!e.target.value.includes('USDT') || !e.target.value.includes('USDC') || !e.target.value.includes('TRX')) && i.props.value!='ALL') e.target.value=(e.target.value).filter(item=>item!='ALL')
    if((e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX'))  && i.props.value!='ALL') e.target.value=['ALL','USDT','USDC','TRX']
    console.log(e.target.value)
      if(( !e.target.value.includes('ALL') && (e.target.value.includes('USDT') && e.target.value.includes('USDC') && e.target.value.includes('TRX'))  )){//e.target.value.includes('ALL')==false && e.target.value.includes('USDT')==false && e.target.value.includes('USDC')==false) || (e.target.value.includes('ALL')==false && e.target.value.includes('USDC')==false 
        e.target.value=[]
      setDefaultToken([])
   }
      if(e.target.value.includes('ALL')==true  ){
        let otherData = r2.filter(i=>i.tokenName=='trx' || i.tokenName=='USDT' )
        console.log('b',otherData)
        setTronFiltData(otherData)
        e.target.value=['ALL','USDT','USDC','TRX']
        setDefaultToken(e.target.value)
      }
      else if(e.target.value.includes('TRX')==true ){
        let otherData = r2.filter(i=>i.tokenName=='trx' )
        console.log('b',otherData)
        setTronFiltData(otherData)
         setDefaultToken(e.target.value)
      } else if(e.target.value.includes('USDT')==true  ){
        let otherData = r2.filter(i=>i.tokenName=='USDT' )
        console.log('b',otherData)
        setTronFiltData(otherData)
         setDefaultToken(e.target.value)
      }
    }else if(defaultAddressType.includes('BTC')==true){
      let otherData = r3.filter(i=>i.tokenId=='BTC')
      console.log('b',otherData,r2)
       setCombFiltData(otherData)
       setDefaultToken(e.target.value)
    }
     setDefaultToken(e.target.value)

  }
  const handleChangeDate=(e)=>{
    setDays(e.target.value)
    setR(false)
    if(e.target.value==30){
      var d2 = Math.floor(new Date().getTime() / 1000);
       var d1 = d2 - 30*86400
       if(defaultAddressType.includes('ERC')==true){
        if(defaultToken.includes('USDT')==true && defaultToken.includes('USDC')==true && defaultToken.includes('ETH')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='USDC' || i.tokens==='eth')
      // console.log(r1);
      setResultFilter1(rr);
        }
       else  if(defaultToken.includes('USDT')==true && defaultToken.includes('USDC')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='USDC')
      // console.log(r1);
      setResultFilter1(rr);
        }
       else  if(defaultToken.includes('USDC')==true && defaultToken.includes('ETH')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=> i.tokens==='USDC' || i.tokens==='eth')
      // console.log(r1);
      setResultFilter1(rr);
        }else  if(defaultToken.includes('USDT')==true && defaultToken.includes('ETH')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='eth')
      // console.log(r1);
      setResultFilter1(rr);
        }else  if(defaultToken.includes('USDT')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=>i.tokens==='USDT')
      // console.log(r1);
      setResultFilter1(rr);
        }
        else if( defaultToken.includes('USDC')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=>i.tokens==='USDC')
      // console.log(r1);
      setResultFilter1(rr);
        } else if( defaultToken.includes('ETH')==true){
          setR(true);
          var r1 = resultTrans.filter(
            (item) =>
              new Date(item.transaction_time).getTime() / 1000 >= d1 &&
              new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
          );
          let rr =r1.filter(i=> i.tokens==='eth')
      // console.log(r1);
      setResultFilter1(rr);
        }
      }else if(defaultAddressType.includes('TRC')==true){
        setTronFilt(true);
      var r1 =tronTransaction.filter(
        (item) =>
        item.timestamp / 1000 >= d1 &&
        item.timestamp  / 1000 <= d2 && parseFloat(item.USD_amount)>=1
      );
      // console.log(r1);
      setTronFiltData(r1);
      }else if(defaultAddressType.includes('BTC')==true){
        setBtcFilt(true);
      var r1 =btcTransact.filter(
        (item) =>
          item.time >= d1 &&
          item.time <= d2
      );
      // console.log(r1);
      setBtcFiltData(r1);
      }else if(defaultAddressType.includes('ALL')==true){
        setCombFilt(true);
      var r1 =combinedTransaction.filter(
        (item) =>
        item.time  >= d1 &&
        item.time <= d2
      );
      
      // console.log(r1);
      setCombFiltData(r1);
      }
      }else if(e.target.value==90){
        var d2 = Math.floor(new Date().getTime() / 1000);
         var d1 = d2 - 90*86400
         if(defaultAddressType.includes('ERC')==true){
          if(defaultToken.includes('USDT')==true && defaultToken.includes('USDC')==true && defaultToken.includes('ETH')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='USDC' || i.tokens==='eth')
        // console.log(r1);
        setResultFilter1(rr);
          }
         else  if(defaultToken.includes('USDT')==true && defaultToken.includes('USDC')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='USDC')
        // console.log(r1);
        setResultFilter1(rr);
          }
         else  if(defaultToken.includes('USDC')==true && defaultToken.includes('ETH')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=> i.tokens==='USDC' || i.tokens==='eth')
        // console.log(r1);
        setResultFilter1(rr);
          }else  if(defaultToken.includes('USDT')==true && defaultToken.includes('ETH')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='eth')
        // console.log(r1);
        setResultFilter1(rr);
          }else  if(defaultToken.includes('USDT')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=>i.tokens==='USDT')
        // console.log(r1);
        setResultFilter1(rr);
          }
          else if( defaultToken.includes('USDC')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=>i.tokens==='USDC')
        // console.log(r1);
        setResultFilter1(rr);
          } else if( defaultToken.includes('ETH')==true){
            setR(true);
            var r1 = resultTrans.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            let rr =r1.filter(i=> i.tokens==='eth')
        // console.log(r1);
        setResultFilter1(rr);
          }
        }else if(defaultAddressType.includes('TRC')==true){
          setTronFilt(true);
        var r1 =tronTransaction.filter(
          (item) =>
          item.timestamp / 1000 >= d1 &&
          item.timestamp  / 1000 <= d2 && parseFloat(item.USD_amount)>=1
        );
        // console.log(r1);
        setTronFiltData(r1);
        }else if(defaultAddressType.includes('BTC')==true){
          setBtcFilt(true);
        var r1 =btcTransact.filter(
          (item) =>
            item.time >= d1 &&
            item.time <= d2
        );
        // console.log(r1);
        setBtcFiltData(r1);
        }else if(defaultAddressType.includes('ALL')==true){
          setCombFilt(true);
        var r1 =combinedTransaction.filter(
          (item) =>
          item.time  >= d1 &&
          item.time <= d2
        );
        
        // console.log(r1);
        setCombFiltData(r1);
        }
           } else if(e.target.value==180){
            var d2 = Math.floor(new Date().getTime() / 1000);
             var d1 = d2 - 180*86400
            // console.log(d1,d2)
            if(defaultAddressType.includes('ERC')==true){
              if(defaultToken.includes('USDT')==true && defaultToken.includes('USDC')==true && defaultToken.includes('ETH')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='USDC' || i.tokens==='eth')
            // console.log(r1);
            setResultFilter1(rr);
              }
             else  if(defaultToken.includes('USDT')==true && defaultToken.includes('USDC')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='USDC')
            // console.log(r1);
            setResultFilter1(rr);
              }
             else  if(defaultToken.includes('USDC')==true && defaultToken.includes('ETH')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=> i.tokens==='USDC' || i.tokens==='eth')
            // console.log(r1);
            setResultFilter1(rr);
              }else  if(defaultToken.includes('USDT')==true && defaultToken.includes('ETH')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=>i.tokens==='USDT' || i.tokens==='eth')
            // console.log(r1);
            setResultFilter1(rr);
              }else  if(defaultToken.includes('USDT')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=>i.tokens==='USDT')
            // console.log(r1);
            setResultFilter1(rr);
              }
              else if( defaultToken.includes('USDC')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=>i.tokens==='USDC')
            // console.log(r1);
            setResultFilter1(rr);
              } else if( defaultToken.includes('ETH')==true){
                setR(true);
                var r1 = resultTrans.filter(
                  (item) =>
                    new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                    new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
                );
                let rr =r1.filter(i=> i.tokens==='eth')
            // console.log(r1);
            setResultFilter1(rr);
              }
            }else if(defaultAddressType.includes('TRC')==true){
              setTronFilt(true);
            var r1 =tronTransaction.filter(
              (item) =>
              item.timestamp / 1000 >= d1 &&
              item.timestamp  / 1000 <= d2 && parseFloat(item.USD_amount)>=1
            );
            // console.log(r1);
            setTronFiltData(r1);
            }else if(defaultAddressType.includes('BTC')==true){
              setBtcFilt(true);
            var r1 =btcTransact.filter(
              (item) =>
                item.time >= d1 &&
                item.time <= d2
            );
            // console.log(r1);
            setBtcFiltData(r1);
            }else if(defaultAddressType.includes('ALL')==true){
              setCombFilt(true);
            var r1 =combinedTransaction.filter(
              (item) =>
              item.time  >= d1 &&
              item.time <= d2
            );
            
            // console.log(r1);
            setCombFiltData(r1);
            }
            }
    }
  const transaction = (t) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllTransactionHistoryofUser`, {
        params: { address_id: t }
      })
      .then((response1) => {
        if(response1.data){
          const temp2 = response1.data?.map(record=> {
            const temp3 = JSON.parse(record.recieve_data)[0]
            const temp4 = JSON.parse(record.send_data)[0]
            const tokenId=record.send_data!='[]' ? temp4?.token_id=='eth' ? 'eth' :  Object.values(JSON.parse(record.symbol)).filter(i=>i.id==temp4.token_id)[0]?.symbol : record.recieve_data!='[]' ? temp3?.token_id=='eth' ? 'eth' :  Object.values(JSON.parse(record.symbol)).filter(i=>i.id==temp3.token_id)[0]?.symbol :'-'
              //  return {...record, return_amount: record.cate_id===null ? parseFloat(temp4?.amount).toFixed(2).replace(/\.00$/, '') : temp3?.amount!=undefined ? parseFloat(temp3?.amount).toFixed(2).replace(/\.00$/, '') :  temp4?.amount!=undefined ? parseFloat(temp4?.amount).toFixed(2).replace(/\.00$/, '') : 0, tokens:tokenId }
              return {...record, return_amount: record.cate_id===null ? (record.send_data!='[]' ? tokenId=='eth' ? parseFloat(parseFloat(record.usdt_eth).toFixed(2)) : parseFloat(parseFloat(temp4?.amount).toFixed(2)) : tokenId=='eth' ? parseFloat(parseFloat(record.usdt_eth).toFixed(2)) : parseFloat(parseFloat(temp3?.amount).toFixed(2))) :  record.cate_id=='send' ? tokenId=='eth' ? parseFloat(parseFloat(record.usdt_eth).toFixed(2)) : parseFloat(parseFloat(temp4?.amount).toFixed(2)) : tokenId=='eth' ? parseFloat(parseFloat(record.usdt_eth).toFixed(2)) : parseFloat(parseFloat(temp3?.amount).toFixed(2)), tokens:tokenId }
              })
        
        setDefaultAddress(response1.data?.[0]?.address_id)
        setResultTrans(temp2)
        if(days==30){
          var d2 = Math.floor(new Date().getTime() / 1000);
           var d1 = d2 - 30*86400
            setR(true);
            var r1 = temp2.filter(
              (item) =>
                new Date(item.transaction_time).getTime() / 1000 >= d1 &&
                new Date(item.transaction_time).getTime() / 1000 <= d2 && parseFloat(item.return_amount)>=1
            );
            if (r1) {
              r1.sort((a, b) => {
                const x = new Date(a.transaction_time).getTime() / 1000
                const y = new Date(b.transaction_time).getTime() / 1000
                return x > y ? -1 : x < y ? 1 : 0
              })
            }
            if(defaultToken.includes('USDT') && defaultToken.includes('USDC') && defaultToken.includes('ETH') || defaultToken.includes('ALL') ){
              let f = r1.filter(i=>i.tokens=='USDT' || i.tokens=='eth'  || i.tokens=='USDC' )
              if(f.length==0){
                setAlertNoRecord(true)
              }else{
              setResultFilter1(f);
              setloading(false)
              }
                 }
        }
        }
      })
  }
  // resultTrans.sort((a, b) => {
  //   const x = new Date(a.transaction_time).getTime() / 1000
  //   const y = new Date(b.transaction_time).getTime() / 1000
  //   return x > y ? -1 : x < y ? 1 : 0
  // })
  var dataIdportfolio = []
  const handleChange = (event) => {
    setResultTrans([])
    setResultFilter1([])
    setDefaultWallet('')
    setDefaultAddress('')
    setDefaultWallet('')
    setDays(30)
    setAllInvestData(event)
    dataInvestPortfolio = resultPortfolio.filter((i) => i.portfolio_name == event)
    const p = dataInvestPortfolio?.[0]?.portfolio_id
    wallet(p)
  }
  const handleChange1 = (event) => {
    setDays(30)
      setR(false)
      setResultAddress([])
      setDefaultAddressType(['ERC'])
      setDefaultWallet(event.target.value)
      const resultWalletData = result.filter((i) => i.wallet_name == event.target.value)
      setSelectedWallet(resultWalletData)
      const p = resultWalletData?.[0]?.portfolio_id
    const w = resultWalletData?.[0]?.walletId
    address(p, w)
  }
  // const handleTokenType=(e)=>{
  //  setTokenType(e.target.value)
  //  if(e.target.value=='eth'){
  //  let x = resultTrans.filter(i=>i.asset_chain=='eth')
  //  setResultFilter1(x)
  //  }
  //  }
  const handleChange2 = (event) => {
    setResultFilter1([])
    setDays(30)
    setR(false)
    setDefaultAddress(event.target.value)
    const f = resultAddress?.filter(i => i.address_id === event.target.value)
    // console.log(m)
    // const t = m?.[0]?.address_id
    const fi = f?.[0]?.address_id
    const bt = resultAddress?.filter(b=>b.btc_address_id === event.target.value)
    setAddressType(f?.[0]?.address_type)
    if(f?.[0]?.address_type=='TRON'){
    trontransaction(fi)
    } else if(bt?.[0]?.address_type=='BTC'){
      btctransaction(bt?.[0]?.btc_address_id)
      }
    else{
    transaction(fi)
    }
  }
  const refresh_wallet = async () => {
    if(defaultAddressType==='erc'){
    setloading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance`, {
        params: { address_id: defaultAddress }
      })
      .then((response) => {
        if(response.data){
        const rd = response.data
        const rs = rd?.[0]?.address_id
        transaction(rs)
        }
      })
    }else if(defaultAddressType==='trc'){
      setloading(true)
        var config = {
          method: "post",
            url: `${process.env.REACT_APP_BASE_URL}/tron_transactions`,
            data: {
              address_id: defaultAddress,
              address_type:'TRON'
            },
          };
           axios(config).then(function (response) {
            const rd = response.data
            if(rd){
             trontransaction(defaultAddress)
            }
          });
        }
  }
  const [dataId, setDataId] = useState('')
  const [validated, setValidated] = useState('')
  const [dataRow, setDataRow] = useState([])
  const [showExpand, setShowExpand] = useState(false)
  const [show, setShow] = useState(false)

  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
  const [wid, setWid] = useState('170%')
  const [mar, setmar] = useState('-6%')
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [sea1, setSea1] = useState('')
  const [days, setDays] = useState(30)
  
  const [showInvestment, setShowInvestment] = useState(false)
  const [resultAddress, setResultAddress] = useState([])
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
  const [allInvestData, setAllInvestData] = useState([])
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
  }
  const handleClose = () => setShow(false)
  const handleShow = (id) => {
    setDataId(id)
    setShow(true)
  }
  const [result, setResult] = useState([])
  const handleShowInvestment = () => {
    setShowInvestment(true)
    setValidated(false)
  }
  const [name, setname] = useState('')
  var dataInvestPortfolio = []
  const [credentialsInfoInvest, setCredentialsInfoInvest] = useState({
    portfolio_id: resultPortfolio?.[0]?.portfolio_id,
    userId: getId
  })
  const [bigData, setBigData] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }
  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  const columnsM=[
    
    {
      dataField: 'hash_id',
      text: 'Hash',
      sort: true,
      toggle:false,
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
              <span className="namePortData" style={{ cursor:'pointer' }} 
              // onClick={()=>window.location=`https://etherscan.io/tx/${row.transaction_id}`}
              >
                {row.hash_id !=undefined ? row.hash_id.slice(0, 6)+"..."+row.hash_id.slice(-4) : <></>} 
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
      toggle:false,
      filter: dateFilter({
        placeholder: 'date',
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let date
        if(row.date.length>10){
          let d =Math.floor(row.date/1000)
           date  = moment(d,'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
          // console.log('d',d)
        }else {
        date  = moment(row.date,'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
        // console.log('date',date,row.date)
        }
        return (
          <p
            style={{
              color: 'white',
              width: '110%',
              fontSize: '12px',
              display: 'inline-block'
            }}
          >
             <Tooltip title={date}> 
              <span style={{ color: 'white', fontSize: '13px' }}>
                    {date[0] } <br/> 
                    {date[1]}
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
      toggle:false,
       filter: textFilter({
          placeholder:'from',
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
              width: "110%",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {" "}
            { row.tokenType!='BTC' ?
              <span style={{ color: "white", fontSize: "13px" }}>
               {row.from_address.slice(0,6)+'...'+row.from_address.slice(-4)}
              </span>
             : "---"}
             <Tooltip title="Copy to Clipboard">
                {row.tokenType!='BTC'
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
      toggle:false,
       filter: textFilter({
          placeholder:'to',
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
              width: "110%",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {" "}
             {row.tokenType=="TRON" || row.tokenType!="BTC"  ?
              <span style={{ color: "white", fontSize: "13px" }}>
                {row.to_address===null ? "--" :row.to_address.slice(0,6)+'...'+row.to_address.slice(-4)}  
                {row.to_address!=null ?
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
              
      : "--" }
      
          </p>
        );
      },
    },  
    {
      dataField: "return_amount1",
      text: "Amount($)",
      toggle:false,
         filter: textFilter({
            placeholder:'amount',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row.cate_id)
        return (
          <> 
                   {row.tokenId == 'trx' || row.tokenId == 'USDT' && row.USD_amount != '' && parseFloat(row.return_amount1) == 0 ?
            row.tokenId=='trx' ?
              <span style={{ color: 'white' }}>
                {'$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')}
                 <p style={{ color: 'white' }}>{parseFloat(parseFloat(row.amount_trx).toFixed(2)).toLocaleString()+' '+row.tokenId.toUpperCase()}</p> 
              </span> : <span style={{ color: 'white' }}>
                {'$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')+' '+row.tokenId.toUpperCase()}
                {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
              </span> : row.tokenId == 'trx' || row.tokenId == 'USDT' && row.USD_amount != '' && parseFloat(row.return_amount1) > 0 ?
               row.tokenId=='trx' ?
                <span style={{ color: 'rgb(0, 255, 0)' }}>
                  {'+' + '$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')}
                   <p style={{ color: 'rgb(0, 255, 0)' }}>{'+'+parseFloat(parseFloat(row.amount_trx).toFixed(2)).toLocaleString()+' '+row.tokenId.toUpperCase()}</p> 
                </span> : <span style={{ color: 'rgb(0, 255, 0)' }}>
                  {'+' + '$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')+' '+row.tokenId.toUpperCase()}
                  {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
                </span> :
                row.tokenId == 'BTC' && parseFloat(row.amount) > 0 ?
                  <span style={{ color: 'rgb(0, 255, 0)' }}>
                    {'+' + '$' + Math.abs(row.return_amount1).toLocaleString().replace(/\.00$/, '')}
                    <p style={{ color: 'rgb(0, 255, 0)' }}>{parseFloat((parseFloat(row.amount)/100000000).toFixed(4)).toLocaleString()+' '+row.tokenId.toUpperCase()}</p>
                  </span> : row.tokenId == 'BTC' && parseFloat(row.amount) < 0 ?
                    <span style={{ color: '#ff0000' }}>
                      {'-' + '$' + Math.abs(row.return_amount1).toLocaleString().replace(/\.00$/, '')}
                      <p style={{ color: '#ff0000' }}>{parseFloat((parseFloat(row.amount)/100000000).toFixed(4)).toLocaleString()+' '+row.tokenId.toUpperCase()}</p>
                    </span>
                    : row.return_amount1 != undefined && row.tokenId != 'trx' && row.tokenId != 'BTC' && row.send_data != '[]' ?
                    row.tokenId=='eth' ?
                      <span style={{ color: '#ff0000' }}>
                        {'-'+ '$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')}
                         <p style={{ color: '#ff0000' }}>{'-'+parseFloat(parseFloat(JSON.parse(row.send_data)?.[0].amount).toFixed(2)).toLocaleString().replace(/\.00$/, '')+' '+ row.tokenId.toUpperCase()}</p> 
                      </span> : <span style={{ color: '#ff0000' }}>
                        {'-' + '$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')+' '+row.tokenId.toUpperCase()}
                        {/* <p style={{ color: '#FFC107' }}>{row.tokenId != undefined ? row.tokenId.toUpperCase() : '-'}</p> */}
                      </span>  : row.return_amount1 != undefined && row.recieve_data != '[]' && row.tokenId != 'trx' && row.tokenId != 'BTC' ?
                      row.tokenId=='eth' ?
                        <span style={{ color: 'rgb(0, 255, 0)' }}>
                          {'+' + '$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')}
                           <p style={{ color: 'rgb(0, 255, 0)' }}>{'+' +parseFloat(parseFloat(JSON.parse(row.recieve_data)?.[0].amount).toFixed(2)).toLocaleString().replace(/\.00$/, '')+' '+row.tokenId?.toUpperCase()}</p> 
                        </span> : <span style={{ color: 'rgb(0, 255, 0)' }}>
                          {'+' + '$' + row.return_amount1.toLocaleString().replace(/\.00$/, '')+' '+row.tokenId?.toUpperCase()}
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
      dataField: "fee",
      text: "Fee($)",
      toggle:false,
         filter: textFilter({
            placeholder:'fee',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <> 
                  <span style={{ color: 'white' }}>
                    {  row.fee!='-' ? "$"+row.fee+' '+'USD' : '-' } 
                  </span>
           </>
        );
      },
    },
    
    {
      dataField: "comment",
      text: "Comment",
      toggle:false,
         filter: textFilter({
            placeholder:'comment',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <> 
            
                  <span style={{ color: 'white' }}>
                 {row.comment==null || row.comment=="" ? "-" : row.comment} 
                  </span>
           </>
        );
      },
    },
  ]
  const columnsBtc = [
    {
      dataField: "hash_id",
      width: 150,
      text: "Hash",
      sort: true,
      toggle:false,
     filter: textFilter({
       placeholder:'hash',
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
              <span className="namePortData" style={{ cursor:'pointer', fontSize: "13px" }} onClick={
                ()=>window.location=`https://www.blockchain.com/btc/tx/${row.hash_id}`}>
               {row.hash_id.slice(0,6)+'...'+row.hash_id.slice(-4)}
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
      dataField: "time",
      text: "Date",
      toggle:false,
         filter: dateFilter({
            placeholder:'date',
        getFilter: filter => {
          timestampFilter = filter;
        }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // let date1 = parseInt(row.time)
        let time1 = moment(row.time,'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
        // console.log('time',time1)
        // let date =moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a").split(',')
        return (
          <>
          {row.time===null ?
                <span style={{ color: "white", fontSize: "13px" }}>N/A</span> :
               <span style={{ color: "white", fontSize: "13px" }}>
                  {time1[0] } <br/>
                   {time1[1]}
              </span>}
           </>
        );
      },
    },
    {
      dataField: "input_addr",
      width: 50,
      toggle:false,
      text: "From",
       filter: textFilter({
          placeholder:'from',
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
          <span>-</span>
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
      toggle:false,
      width: 200,
       filter: textFilter({
          placeholder:'to',
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
          <span>-</span>
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
      toggle:false,
         filter: textFilter({
            placeholder:'amount',
        getFilter: filter => {
          blockFilter = filter;
        }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // let t=0
        // let usd
        // JSON.parse(row.output_addr).map(e=>{
        //   t  = t + parseInt(e.value)
        // })
        // let o1 = (t)/100000000
       
        return (
          <>
               {parseFloat(row.usd_result) == '0' || parseFloat(row.usd_result) == '-0' ?
              <span style={{ color: 'white' }}>
                ${Math.abs(row.usd_result).toLocaleString().replace(/\.00$/, '')}
                <p style={{ color: 'white',display:'flex' }}>{parseFloat((parseFloat(row.result)/100000000).toFixed(4)).toLocaleString()+' '}<p>{row.address_type}</p></p>
              </span> : parseFloat(row.usd_result) > 0 ? 
                <span style={{ color: '#00ff00' }}>
                  + ${Math.abs(row.usd_result).toLocaleString().replace(/\.00$/, '')}
                  <p style={{ color: '#00ff00',display:'flex' }}>{parseFloat((parseFloat(row.result)/100000000).toFixed(4)).toLocaleString()+' '}<p>{row.address_type}</p></p>
                </span>
                : <span style={{ color: '#ff0000' }}>
                  - ${Math.abs(row.usd_result).toLocaleString().replace(/\.00$/, '')}
                  <p style={{ color: '#ff0000',display:'flex' }}>{parseFloat((parseFloat(row.result)/100000000).toFixed(4)).toLocaleString()+ ' '}<p>{row.address_type}</p></p>
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
      dataField: "usd_fee",
      text: "Fee($)",
      toggle:false,
         filter: textFilter({
            placeholder:'fee',
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
                  
               <span style={{ color: "white", fontSize: "13px" }}>${row.usd_fee+' '+ 'USD'} </span>
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
      toggle:false,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p>
            {(row?.comment==null)?<p style={{ color: 'white', width: '20%', fontSize: '12px' }}>-</p>:<p style={{ color: 'white', width: '20%', fontSize: '12px' }}>{row?.comment}</p>}
          </p>
        )
      }
    }, 
  ];
  
  const columnsTron = [
    {
      dataField: "hash",
      width: 150,
      text: "Hash",
      sort: true,
      toggle:false,
     filter: textFilter({
       placeholder:'hash',
        getFilter: filter => {
          hashFilter = filter;
        }
     }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        const txn = row.hash
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
              <span className="namePortData" style={{ cursor:'pointer', fontSize: "13px" }} onClick={
                ()=>window.location=`https://tronscan.org/#/transaction/${row.hash}`}>
               {row.hash.slice(0,6)+"..."+row.hash.slice(-4)}
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
    // {
    //   dataField: "block",
    //   text: "Block",
    //   hidden:(selectedColumnId?.includes("block")==true),
    //   toggle:false,
    //      filter: textFilter({
    //         placeholder:'block',
    //     getFilter: filter => {
    //       blockFilter = filter;
    //     }
    //  }),
    //   sort: true,
      
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //            <span style={{ color: "white", fontSize: "13px" }}>
    //            {row.block}
    //           </span>
    //        </>
    //     );
    //   },
    // },
    {
      dataField: "timestamp",
      text: "Date",
      toggle:false,
         filter: dateFilter({
            placeholder:'date',
        getFilter: filter => {
          timestampFilter = filter;
        }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let d = parseInt(row.updated_time);
        let date = moment(parseInt(row.timestamp)/1000,'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
        // let date =moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a").split(',')
        return (
          <>
          {row.timestamp===null ?
                <span style={{ color: "white", fontSize: "13px" }}>N/A</span> :
               <span style={{ color: "white", fontSize: "13px" }}>
               {date[0] } <br/>
                {date[1]}
              </span>}
           </>
        );
      },
    },
    // {
    //   dataField: "tokenType",
    //   text: "Type",
    //   hidden:(selectedColumnId?.includes("tokenType")==true),
    //   toggle:false,
    //      filter: textFilter({
    //         placeholder:'transaction-type',
    //     getFilter: filter => {
    //       transactionFilter = filter;
    //     }
    //  }),
    //   sort: true,
      
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
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
      dataField: "ownerAddress",
      width: 50,
      text: "From",
      toggle:false,
       filter: textFilter({
          placeholder:'from',
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
              width: "110%",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {" "}
            {/* {console.log(row.transaction_time)} */}
              <span style={{ color: "white", fontSize: "13px" }}>
               {row.ownerAddress.slice(0,6)+"..."+row.ownerAddress.slice(-4)}
               <Tooltip title="Copy to Clipboard">
                    <Icon
                      icon="cil:copy"
                      style={{
                        cursor: 'pointer',
                        color: '#FFC107',
                        marginLeft: '5px'
                      }}
                      onClick={() => copyToClipboardT(row.ownerAddress)}
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
      toggle:false,
       filter: textFilter({
          placeholder:'to',
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
              width: "110%",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {" "}
            {/* {console.log(row.transaction_time)} */}
            <Tooltip title={row.toAddress}>
              <span style={{ color: "white", fontSize: "13px" }}>
               {row.toAddress.slice(0,6)+"..."+row.toAddress.slice(-4)}
               <Tooltip title="Copy to Clipboard">
                    <Icon
                      icon="cil:copy"
                      style={{
                        cursor: 'pointer',
                        color: '#FFC107',
                        marginLeft: '5px'
                      }}
                      onClick={() => copyToClipboardT1(row.toAddress)}
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
      toggle:false,
         filter: textFilter({
            placeholder:'amount',
        getFilter: filter => {
          tokenFilter = filter;
        }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let t = row.tokenDecimal
      let b=(parseInt(row.amount))
        return (
          <>
          {
              row.USD_amount != '' && row.USD_amount != null ?
                (parseFloat(row.USD_amount) > 0 ?
                (row.tokenName=='trx' ?
                  <span style={{ color: "#00ff00", fontSize: "14px" }}>
                    {'+' + '$' + parseFloat(row.USD_amount).toLocaleString()}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    <p style={{ color: '#00ff00',display:'flex' }}>{'+'+parseFloat(parseFloat(row.amount_trx).toFixed(2)).toLocaleString()+' '+row.tokenName.toUpperCase()} </p>
                  </span> :  <span style={{ color: "#00ff00", fontSize: "14px" }}>
                    {'+' + '$' + parseFloat(row.USD_amount).toLocaleString()+' '+row.tokenName.toUpperCase()}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    {/* <p style={{ color: '#00ff00' }}>{row.tokenName.toUpperCase()} </p> */}
                  </span> ) :
                   row.tokenName=='trx' ?
                  <span style={{ color: "#00ff00", fontSize: "14px" }}>
                    {'-' + '$' + parseFloat(row.USD_amount).toLocaleString()}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    <p style={{ color: '#FFC107',display:'flex' }}>{'-'+parseFloat(parseFloat(row.amount_trx).toFixed(2)).toLocaleString()+' '+row.tokenName.toUpperCase()} </p>
                  </span>: <span style={{ color: "#00ff00", fontSize: "14px" }}>
                    {'-' + '$' + parseFloat(row.USD_amount).toLocaleString() + ' '+row.tokenName.toUpperCase()}
                    {/* {b*Math.pow(10,-t)} {' '} */}
                    {/* <p style={{ color: '#FFC107' }}>{row.tokenName.toUpperCase()} </p> */}
                  </span>)  :
                <span style={{ color: "white", fontSize: "14px" }}>
                  {parseFloat(row.USD_amount).toLocaleString()} {' '}
                  <p style={{ color: '#FFC107' }}>{row.tokenName.toUpperCase()} </p>
                </span>
            }
           </>
        );
      },
    },
    {
      dataField: "net_fee",
      text: "Fee($)",
      toggle:false,
         filter: textFilter({
            placeholder:'fee',
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
                    {'$'+1+" "+'USD'}
                  {/* {row.net_fee==='0' || row.net_fee===null ? '-' : parseFloat(parseInt(row.net_fee)/1000000).toFixed(2).replace(/\.00$/, '')+' '+'TRX'}  */}
                  </span>
           </>
        );
      },
    },
    // {
    //   dataField: "result",
    //   text: "Result",
    //   hidden:(selectedColumnId?.includes("result")==true),
    //   toggle:false,
    //      filter: textFilter({
    //         placeholder:'result',
    //     getFilter: filter => {
    //       resultsFilter = filter;
    //     }
    //  }),
    //   sort: true,
      
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <> 
    //       {row.result===null ?
    //             <span style={{ color: "white", fontSize: "13px" }}>FAILED</span> :
    //            <span style={{ color: "white", fontSize: "13px" }}>
    //            {row.result } 
    //           </span>}
    //        </>
    //     );
    //   },
    // },
    // {
    //   dataField: "confirmed",
    //   text: "Status",
    //   hidden:(selectedColumnId?.includes("confirmed")==true),
    //   toggle:false,
    //      filter: textFilter({
    //         placeholder:'status',
    //     getFilter: filter => {
    //       statusFilter = filter;
    //     }
    //  }),
    //   sort: true,
      
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //            {row.confirmed=="1" ? 
    //            <span style={{ color: "#00ff00", fontSize: "13px" }}>CONFIRMED
    //             </span>
    //            : 
    //            <span style={{ color: "#ff0000", fontSize: "13px" }}>UNCONFIRMED
    //             </span>
    //            } 
    //        </>
    //     );
    //   },
    // },
    {
      dataField: 'comment',
      text: 'Comment',
      sort: true,
      toggle:false,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p>
            {(row?.comment==null)?<p style={{ color: 'white', width: '20%', fontSize: '12px' }}>-</p>:<p style={{ color: 'white', width: '20%', fontSize: '12px' }}>{row?.comment}</p>}
          </p>
        )
      }
    },
    ];
  const columns2 = [
    
    {
      dataField: 'transaction_id',
      text: 'Hash',
      sort: true,
      toggle:false,
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
              <span className="namePortData" style={{ cursor:'pointer' }} onClick={
                ()=>window.location=`https://etherscan.io/tx/${row.transaction_id}`}>
                {row.transaction_id !=undefined ? row.transaction_id.slice(0, 6)+"..."+row.transaction_id.slice(-4) : <></>}
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
      toggle:false,
      filter: dateFilter({
        placeholder: 'date',
        getFilter: filter => {
          timeFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let date =moment(row.transaction_time).format("Do MMMM YYYY, h:mm:ss a").split(',')
        return (
          <p
            style={{
              color: 'white',
              width: '110%',
              fontSize: '12px',
              display: 'inline-block'
            }}
          >
            <Tooltip title={row.transaction_time}>
              <span style={{ color: 'white', fontSize: '13px' }}>
                   {date[0] } <br/>
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
      toggle:false,
       filter: textFilter({
          placeholder:'from',
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
              width: "110%",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {" "}
              <span style={{ color: "white", fontSize: "13px" }}>
               {row.address_id.slice(0,6)+'...'+row.address_id.slice(-4)}
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
      toggle:false,
       filter: textFilter({
          placeholder:'to',
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
              width: "110%",
              fontSize: "12px",
              display: "inline-block",
            }}
          >
            {" "}
            {row.other_wallet_address==null ? '-' :
              <span style={{ color: "white", fontSize: "13px" }}>
                {row.other_wallet_address.slice(0,6)+'...'+row.other_wallet_address.slice(-4)}  
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
              </span>
      }
      
          </p>
        );
      },
    },  
    {
      dataField: "return_amount",
      text: "Amount($)",
      toggle:false,
         filter: textFilter({
            placeholder:'amount',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
      //  console.log(Object.values(JSON.parse(row.symbol))[0].optimized_symbol)
        // console.log( JSON.parse(row.symbol)?.sendId?.optimized_symbol,JSON.parse(row.send_data)?.[0]?.token_id=='eth' ? JSON.parse(row.send_data)?.[0]?.token_id : JSON.parse(row.symbol)?.sendId?.optimized_symbol)
        return (
          <> 
                   {row.return_amount != undefined && row.send_data != '[]' ?
             (row.tokens==='eth' ? 
              <span style={{ color: '#ff0000' }}>
                {"-"+'$' + row.return_amount.toLocaleString().replace(/\.00$/, '')}
                 <p style={{ color: '#ff0000' }}>{'-'+parseFloat(parseFloat(JSON.parse(row.send_data)?.[0].amount).toFixed(2)).toLocaleString()+' ' +row.tokens.toUpperCase()}</p> 
              </span> : <span style={{ color: '#ff0000' }}>
                {"-" + '$' + row.return_amount.toLocaleString().replace(/\.00$/, '')+' '+row.tokens.toUpperCase()}
                {/* <p style={{ color: '#FFC107' }}>{row.tokens.toUpperCase()}</p> */}
              </span>)
              : row.return_amount != undefined && row.recieve_data != '[]' ?
              (row.tokens==='eth' ? 
                <span style={{ color: '#00ff00' }}>
                  {"+"+'$' + row.return_amount.toLocaleString().replace(/\.00$/, '')}
                  <p style={{ color: '#00ff00' }}>{'+'+parseFloat(parseFloat(JSON.parse(row.recieve_data)?.[0].amount).toFixed(2)).toLocaleString()+' ' +row.tokens.toUpperCase()}</p> 
                </span>: <span style={{ color: '#00ff00' }}>
                  {"+" + '$' + row.return_amount.toLocaleString().replace(/\.00$/, '')+' '+row.tokens.toUpperCase()}
                  {/* <p style={{ color: '#FFC107' }}>{row.tokens.toUpperCase()}</p> */}
                </span>) : <span style={{ color: 'white' }}>
                  -
                </span>

            }
           </>
        );
      },
    },
    {
      dataField: "amount",
      text: "Fee($)",
      toggle:false,
         filter: textFilter({
            placeholder:'fee',
        // getFilter: filter => {
        //   blockFilter = filter;
        // }
     }),
      sort: true,
      
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <> 
            
                  <span style={{ color: 'white' }}>
                  {JSON.parse(row.amount)!=undefined ? "$"+JSON.parse(row.amount).usd_gas_fee.toFixed(2).replace(/\.00$/, '')+' '+'USD' : '-'}
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
      toggle:false,
      filter: textFilter({
        placeholder: 'comment',
        getFilter: filter => {
          commentFilter = filter
        }
      }),
      width: 150,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', width: '20%', fontSize: '12px' }}>
            {row.comments!=null ? row.comments : "-"}
          </p>
        )
      }
    },
  
    
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-end">
          <Header />
        </Row>
        <Row>
          <Col md={2} className="justify-content-md-center">
            <SidebarAdmin />
          </Col>
          <Col lg={10}>
            
             {/* className="d-flex justify-content-center"  */}
            <Row style={{marginBottom:'10px'}}> 
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Wallet Transactions</h3>
              </span>
              <Link
                className="p-2 pageheader"
                to="#"
                onClick={refresh_wallet} 
                style={{position:'relative',top:'11px'}}
                >
                <Tooltip title="Refresh">
                  <Icon
                    icon="ic:sharp-refresh"
                    style={{ fontSize: '25px', color: '#FFC107' }}
                  />
                </Tooltip>
              </Link>
              <FormControl className='p-2' style={{marginTop:'1%'}}>
                      <InputLabel
                        id="demo-simple-select-helper-label"
                        style={{
                          overflow: "visible",
                          color: "white",
                          left:'-4px',
                          top:'6px'
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
                          width: '200px',
                           height: '32px',
                           border:'1px solid #d9d9d9 !important',
                          '.MuiButtonBase-root': {
                            color: '#252825'
                          },
                        }}
                        style={{
                          borderRadius: '4px',
                          width: '190px !important',
                          height: '32px !important',
                          // backgroundColor: '#fff',
                          fontSize: '14px',
                          left: '-4px',
                          top:'6px'
                        }}
                        onChange={(e)=>handleChangeDate(e)}
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
                      </Select>
                    </FormControl>
                
              <SearchBox
              
                onChange={(event) => {
                  setSea(event.target.value)
                  if(defaultAddressType.includes('ERC')){
                  const x = resultTrans?.filter(i =>parseFloat(i.return_amount)>=1 && i.comments?.toLowerCase().includes(event.target.value?.toLowerCase()))
                  setSearch(x)
                  }if(defaultAddressType.includes('BTC')){
                    const x = btcTransact?.filter(i => i.comment?.toLowerCase().includes(event.target.value?.toLowerCase()))
                    setSearchBtc(x)
                    }
                  else{
                    setSea1(event.target.value)
                    const x = tronTransaction?.filter(i => i.comment?.toLowerCase().includes(event.target.value?.toLowerCase()))
                    setSearchTron(x)
                  }
                }}
              />
                <Link
                className="p-2"
                to='/PMS/MainManageAssetsWallets'
                state={{ from: locationName }} style={{marginTop:'.5%',position:'absolute',right:'2px'}} >
                <ArrowCircleLeftOutlinedIcon style={{ color: '#FFC107', fontSize: '27px' }} />
              </Link>
              </Row>
              <Row>
              <Autocomplete
                className="p-2"
                id="controllable-states-demo"
                value={allInvestData}
                options={resultPortfolio?.map((e) => e.portfolio_name)}
                onChange={(e, k) => {
                  handleChange(k)
                }}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper
                  style={{
                    background: 'rgb(31, 33, 37)',
                    color: 'white'
                  }}
                  >{children}</Paper>
                )}
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  fontSize: '10px',
                  borderRadius: '30%',
                  width:'220px'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '190px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid #d9d9d9 !important',
                    left: '4px'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root': {
                    top:'-0.5em'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white', fontSize: '13px' }}
                    label="Portfolios"
                  />
                )}
              />
              {/* <div className="p-2"> */}
              <FormControl className="p-2" style={{marginLeft:'-1em'}}>
                  <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '12px', overflow: 'visible', color: 'white' }}>Wallet</InputLabel>
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
                       border:'1px solid #d9d9d9 !important',
                      '.MuiButtonBase-root': {
                        color: '#252825'
                      },
                    }}
                    style={{
                      borderRadius: '4px',
                      width: '200px !important',
                      height: '32px !important',
                      // backgroundColor: '#fff',
                      fontSize: '14px',
                      // left: '4px'
                    }}
                    onChange={handleChange1}
                  >
                    {result?.map((e) => (
                      <MenuItem value={e.wallet_name}>{e.wallet_name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className='p-2' style={{marginLeft:'-10px'}}>
        <InputLabel id="demo-multiple-checkbox-label"  
          style={{fontSize:'14px',
                overflow: 'visible',
                color: 'white',
                height: '3rem',
                zIndex:'auto',
                left:'4px'
                }}>Chain
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={defaultAddressType}
          onChange={(i,e)=>handleAddressType(i,e)}
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
                '& .MuiCheckbox-root':{
                  color:'white'
                }
              }
            }
          }}
          sx={{
            width: '190px',
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
                <FormControl className='p-2' style={{marginLeft:'-6px'}} >
                  <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '12px', overflow: 'visible', color: 'white' }}>Address</InputLabel>
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
                       border:'1px solid #d9d9d9 !important',
                      '.MuiButtonBase-root': {
                        color: '#252825'
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
                        e.address_type==='BTC' ?
                        <MenuItem value={e.btc_address_id}>{e.btc_address_id}</MenuItem> :
                      <MenuItem value={e.address_id}>{e.address_id}</MenuItem>
                    ))}
                  </Select>
                </FormControl>:<></>}
                <FormControl className='p-2' style={{height:'2em'}}>
        <InputLabel id="demo-multiple-checkbox-label"  
          style={{fontSize:'14px',
                overflow: 'visible',
                color: 'white',
                height: '3rem',
                zIndex:'auto',
                left:'2px'
                }}>Token
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={defaultToken}
          onChange={(i,e)=>handleToken(i,e)}
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
                '& .MuiCheckbox-root':{
                  color:'white'
                }
              }
            }
          }}
          sx={{
            width: '190px',
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
            left: '2px',
            
          }}
          // MenuProps={MenuProps}
        >
          {defaultAddressType.includes('ALL')==true  ? tokenListALL.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )) :
          defaultAddressType.includes('ERC')==true  && defaultAddressType.includes('TRC')==true  ? tokenListERCTRC.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )) : defaultAddressType.includes('TRC')==true  && defaultAddressType.includes('BTC')==true  ? tokenListTRCBTC.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )) : defaultAddressType.includes('ERC')==true  && defaultAddressType.includes('BTC')==true  ? tokenListERCBTC.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )) :
          defaultAddressType.includes('TRC')==true ? tokenListTRC.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )) : defaultAddressType.includes('BTC')==true ?
          tokenListBTC.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          )) : defaultAddressType.includes('ERC')==true ?
          tokenList.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={defaultToken.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))  : <></>
          }
        </Select>
      </FormControl>
              {/* </div> */}
              
                    </Row>
            
             
            {/* </Row> */}
            <div>
            {loading
              ? (
                <Spinner
                  style={{
                    // marginBottom: '-24%',
                    top:"20em",
                    marginLeft: '40%',
                    height: '70px',
                    width: '70px',
                    zIndex:"100",
                    position:"absolute"
                  }}
                  animation="border"
                  variant="primary"
                />
                )
              : null}

            <div className='transaction-wallet'>
              {sea
                ? <CommonTableTransaction data={  defaultAddressType.includes('BTC') ? searchBtc : !defaultAddressType.includes('TRC') ? search  : searchTron} columns={defaultAddressType.includes('TRC') ? columnsTron : defaultAddressType.includes('BTC') ? columnsBtc :  defaultAddressType.includes('ALL') ? columnsM : columns2} />
                : <CommonTableTransaction data={defaultAddressType.includes('ALL')==true || addressArray?.[0]?.includes('TRC')==true && addressArray?.[0]?.includes('BTC')==true || addressArray?.[0]?.includes('BTC')==true && addressArray?.[0]?.includes('ERC')==true || addressArray?.[0]?.includes('ERC')==true && addressArray?.[0]?.includes('TRC')==true ? (combFilt==true ? combFiltData : combinedTransaction) : defaultAddressType.includes('TRC')==false ? defaultAddressType.includes('BTC')==true ? (btcFilt==true ? btcFiltData : btcTransact)  : (r==true || defaultToken.includes('USDC') || defaultToken.includes('USDT') || defaultToken.includes('ALL') ? resultFilter1 : resultTrans)  : (tronFilt===true ? tronFiltData : tronTransaction)} columns={defaultAddressType.includes('ALL')==true || addressArray?.[0]?.includes('TRC')==true && addressArray?.[0]?.includes('BTC')==true || addressArray?.[0]?.includes('BTC')==true && addressArray?.[0]?.includes('ERC')==true || addressArray?.[0]?.includes('ERC')==true && addressArray?.[0]?.includes('TRC')==true ? columnsM : defaultAddressType.includes('TRC')==true ? columnsTron : defaultAddressType.includes('BTC')==true ? columnsBtc : columns2} />
              }
              </div>
          </div>
          </Col>
        </Row>
      </Container>
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
    </React.Fragment >
  )
}
export default WalletTransactionHistory
