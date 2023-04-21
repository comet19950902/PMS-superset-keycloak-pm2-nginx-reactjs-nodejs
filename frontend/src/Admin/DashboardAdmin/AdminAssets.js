import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import axios from 'axios'
import moment from 'moment'
import Spinner from '../../common/spinner'
import { Container, Col, Image, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Header from '../../common/Header/Header'
import RawTableExchange from '../../common/RawTableExchange'
import wallateIcon from '../../assets/images/wallateicon.png'
import investmentIcon from '../../assets/images/investmentIcon.png'
import exchangeIcon from '../../assets/images/exchangeIcon.png'
import '../../modules/Assets/Assets.css'
import CommonTableWalletInfo from '../../common/CommonTable/CommonTableWalletInfo'
import CommonTable from '../../common/CommonTable/CommonTable'
import Tooltip from '@mui/material/Tooltip'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import CommonTableInvestmentInfo from '../../common/CommonTable/CommonTableInvestmentInfo'
import { ROW_SELECT_DISABLED } from 'react-bootstrap-table-next'

let tronData=[]
const AdminAssets = () => {
  const [loading, setLoading]=useState(false)
  const [result1, setResult1] = useState([])
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
  const [result3, setResult3] = useState([])
  const [result31, setResult31] = useState([])
  const [result4, setResult4] = useState([])
  const [Res3, setRes3] = useState([])
  const [result5, setResult5] = useState([])
  const [alert, setAlert] = useState(false)
  const [uptToken, setUptToken] = useState([])
  const [state, setState] = useState(false)
  const [walletShow,setWalletShow]=useState({})
  const [state1, setState1] = useState(false)
  const [investShow, setInvestShow]=useState(false)
  const [exchangeShow,setExchangetShow]= useState(false)
  const [walletData, setWalletData] = useState([])
  const [walletData1, setWalletData1] = useState([])
  const [refreshWal, setRefreshWal] = useState('')
  const [open, setOpen] = useState(false)
  const [bal, setbal] = useState()
  const [walBal, setWalBal] = useState()
  const [uptAsset, setUptAsset] = useState([])
  const [uptBal, setUptBal] = useState('')
  const [chainList, setChainList] = useState([])
  const [Fil, setFil] = useState([])
  const [walletShowId, setWalletShowId]=useState('')
  const [openToggle,SetOpenToggle]=useState(false)
  const [balanceWallet, setBalanceWallet] = useState('')
  const [alertValueData, setAlertValueData] = useState(true)
  const [dataShow, setDataShow] = useState('Show More Data')
  const [showDashboard, setShowDashboard] = useState(true)
  const [walId, setWalId] = useState([])
  const [selected, setSelected] = useState()
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('0%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
  const [resultAddress, setResultAddress] = useState([])
  const [total, setTotal] = useState('')
  const [Address, setAddress] = useState('')
  const [addressData, setAddressData] = useState([])
  const [tronAmount, setTronAmount] =useState('')
  const [showData,setShowData]=useState(false)
  console.log('addrData',addressData)
  const navigate = useNavigate()
 const toggleClick=(item)=>{
  setShowData(!showData)
  setWalletShow(prevShown => ({
    ...prevShown,
    [item]: !prevShown[item]
  }));
 }
 const columns = [
  {
    dataField: 'token_symbol',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          {row.token_symbol}
        </p>
      )
    }
  },
  {
    dataField: 'marketPrice',
    text: 'Current Market Price',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          ${parseInt(row.token_price).toLocaleString()+'.'}
        </p>
      )
    }
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          {row.token_amount.slice(0, 8)}
        </p>
      )
    }
  },
  {
    dataField: 'assetValue',
    text: 'Asset Value',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      const total = Math.floor(row.token_amount * row.token_price)
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          ${total}
        </p>
      )
    }
  }
]
const columnsAddressData = [
  {
    dataField: 'date_created',
    text: 'Date of Entry',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      let entry_date=moment(row.date_created).format('Do MMMM YYYY, h:mm:ss a')?.split(',')
      return (
        <p style={{ fontSize: '14px' }}>
          {entry_date[0]}<br/>
          {entry_date[1]}
        </p>
      )
    }
  },
  {
    dataField: 'address_id',
    text: 'Address',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p style={{ fontSize: '14px' }}>
          {row.address_id}
        </p>
      )
    }
  },
  {
    dataField: 'address_type',
    text: 'Chain',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p  style={{ fontSize: '14px' }}>
          {row.address_type=='ETH' ? 'ERC' : row.address_type=='TRON' ? 'TRC' : 'BTC' }
        </p>
      )
    }
  },
  {
    dataField: 'total_sent',
    text: 'Total sent',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p  style={{ fontSize: '14px' }}>
          {row.total_sent==null || row.total_sent==undefined ? '-' : '$'+parseFloat(row.total_sent).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
        </p>
      )
    }
  },
  {
    dataField: 'total_received',
    text: 'Total received',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p  style={{ fontSize: '14px' }}>
          {row.total_received==null || row.total_received==undefined ? '-' : '$'+parseFloat(row.total_received).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
        </p>
      )
    }
  },
  {
    dataField: 'totalBalance',
    text: 'Balance',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      let totalBal
      row.address_type==='BTC' ?
      totalBal= (row.total_received-row.total_sent)
    : row.address_type=='TRON' ?
    totalBal= (parseFloat(row.total_received)-parseFloat(row.total_sent))
    :  totalBal=(parseFloat(row.total_received)-parseFloat(row.total_sent))
      return (
        <>
          {
            parseInt(totalBal)>0 ? 
            <span style={{ color: "#00ff00" }}>{ '+'+'$'+totalBal.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
            : parseInt(totalBal)===0 ? 
            <span style={{ color: "#00ff00" }}>{ '$'+0 }</span>
           : 
            <span style={{ color: "#ff0000" }}>{ '-'+'$'+(totalBal.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''))?.split('-')[1]}</span>
           
          // row.totalBalance===null ? '-' :
          
        }
        </>
      )
    }
  },
  {
    dataField: 'transaction',
    text: 'Transaction Count',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="namePortData" style={{ fontSize: '14px' }}>
          {row.transaction==null ? row.transactions ? row.transactions: 0 : row.transaction }
        </p>
      )
    }
  },
  {
    dataField: 'btc_last_time',
    text: 'Last Transaction Date',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      let date_btc =new Date(parseInt(row.btc_last_time)*1000).toUTCString()
      let last_date_btc=moment(date_btc).format('Do MMMM YYYY, h:mm:ss a')?.split(',')
      let date_tron =new Date(parseInt(row.tron_last_time)).toUTCString()
      let last_date_tron=moment(date_tron).format('Do MMMM YYYY, h:mm:ss a')?.split(',')
      let date_eth =new Date(parseInt(row.eth_last_time)*1000).toUTCString()
      let last_date_eth=moment(date_eth).format('Do MMMM YYYY, h:mm:ss a')?.split(',')
      return (
        <>
        {row.btc_last_time &&
        <p style={{ fontSize: '14px' }}>
          {last_date_btc[0]}<br/>
          {last_date_btc[1]}
        </p>
         }
         {row.tron_last_time &&
        <p style={{ fontSize: '14px' }}>
          {last_date_tron[0]}<br/>
          {last_date_tron[1]}
        </p>
         }
          {row.eth_last_time &&
        <p style={{ fontSize: '14px' }}>
          {last_date_eth[0]}<br/>
          {last_date_eth[1]}
        </p>
         }
        </>
      )
    }
  },
]
const columnsTron = [
  {
    dataField: "tokenName",
    text: "Name",
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="namePortData" style={{ fontSize: "14px" }}>
           {row.tokenName}({row.tokenAbbr}) 
        </p>
      );
    },
  },
  {
    dataField: "tokenType",
    text: "Type",
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="namePortData" style={{ fontSize: "14px" }}>
           {row.tokenType} 
        </p>
      );
    },
  },
  {
    dataField: "tokenId",
    text: "Token-id",
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="namePortData" style={{ fontSize: "14px" }}>
           {row.tokenId} 
        </p>
      );
    },
  },
  {
    dataField: "balance",
    text: "Balance",
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      let t = row.tokenDecimal
      let b=(parseInt(row.balance))
      return (
        <p className="namePortData" style={{ fontSize: "14px" }}>
           ${b*Math.pow(10,-t)} 
        </p>
      );
    },
  },
];
const columns2 = [
  {
    dataField: 'investment_name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="namePortData" style={{cursor:'pointer'}} onClick={()=>navigate('/PMS/Investments',{ state: { id: 1, invData: row }})}>
           {row.investment_name}
        </p>
      )
    }
  },
  {
    dataField: 'investment_type',
    text: 'Type',
    sort: true
  },
  {
    dataField: 'date_of_investment',
    text: 'Date',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p>
           {moment(row.date_of_investment).format('Do MMMM YYYY')}
        </p>
      )
    }
  },
  {
    dataField: 'quantity',
    text: 'Qty',
    sort: true,
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
    text: 'Purchase Price',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p style={{ color: 'white', fontSize: '14px' }}>
          ${parseFloat(row.purchase_price).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
        </p>
      )
    }
  },
  {
    dataField: 'purchase_value',
    text: 'Purchase Value',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p style={{ color: 'white',fontSize: '14px' }}>
           ${parseFloat(row.buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')} 
        </p>
      )
    }
  },
]
const columns22 = [
  {
    dataField: 'exchange_name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="name-assets">
          {row.exchange_name}
        </p>
      )
    }
  },
  {
    dataField: 'exchange_type',
    text: 'Type',
    sort: true,
   
  },
  {
    dataField: 'assetName',
    text: 'Asset',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <>
          {
            row.asset?.[0]?.map(e => (
              <li>{e.assetName}</li>
            ))
          }
        </>
      )
    }
  },
  {
    dataField: 'accountType',
    text: 'Account Type',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="name-assets">
          {row.accountType}
        </p>
      )
    }
  },
  {
    dataField: 'free',
    text: 'Balance',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      console.log(row)
      return (
        <p className="name-assets">
          {row.free !== 0 ? parseFloat(row.free.toFixed(2)).toLocaleString() : ''}
        </p>
      )
    }
  }
]
  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setm('-10%')
      setMargin('8%')
      setWidthData('0%')
    } else {
      setNewWidth('10')
      setm('1.8%')
      setW('100%')
      setMargin('22%')
      setWidthData('2%')
    }
  }
  const handleClickDataShow = () => {
    setAlertValueData(!alertValueData)
    if (alertValueData === false) {
      setDataShow('Show Less Data')
    } else {
      setDataShow('Show More Data')
    }
  }
  const location = useLocation()
  const walletIdAddress = location.pathname.split(':')[1]
  const portNa = location.state?.data?.portfolio_name
  const [portName, setPortName] = useState(portNa)
  const [wallet_id, setwallet_id] = useState()
  const [totalInvestValue,setTotalInvestValue]=useState()
  const [resultI, setResultI] = useState([])
  const [resultE, setResultE] = useState([])
  const [addressList,setAddressList]=useState([])
  const [totalBalanceWallet, setTotalBalanceWallet]=useState('')
  const [walletN, setWalletN] = useState('')
  const [tronWallet, setTronWallet] = useState([])
  const getId = localStorage.getItem('sub_Id')
  const trondata=()=>{
  var config = {
  method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/get_tron_balance_portfolio`,
    params: {
      // user_id: getId,
      portfolio_id: walletIdAddress,
      address_type:'TRON'
    },
  };
   axios(config).then(function (response1) {
    console.log(response1);
    console.log(response1.data);
      tronData=response1.data
  });
}
  const loadFunctionGetAllWallets = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_wallets`, {
        params: { portfolio_id: walletIdAddress }
      })
      .then((response) => {
        setResult2(response.data)
        setWalletN(response.data?.[0]?.wallet_name)
        address(response.data)
      })
  }
  useEffect(async () => {
    // await trondata()
    // await loadFunctionGetAllWallets()
    await allportfolioUser()
    await invest()
    await exchange()
  }, [])

  const address = async (w) => {
    console.log(w)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet`, {
        params:
        {
          portfolio_id: walletIdAddress,
          wallet_id: w?.[0]?.walletId
        }
      })
      .then((response) => {
        setResultAddress(response.data)
        console.log(response.data)
       if(tronData.length==0){
        setbal(response.data?.[0]?.total_usd_value)
        setWalBal(response.data?.[0]?.total_usd_value)
        const address = response.data?.[0]?.address_id
        const taddress = response.data?.[0]?.tron_address_id
        setAddress(address)
        chain(address)
        token(address)
        protocol(address)
       }else{
        for(let a of tronData){
          if(a.wallet_id==w?.[0]?.walletId){
          response.data.push(a)
         }
        setResultAddress(response.data)
        console.log(response.data)
        setbal(response.data?.[0]?.total_usd_value)
        setWalBal(response.data?.[0]?.total_usd_value)
        const address = response.data?.[0]?.address_id
        const taddress = response.data?.[0]?.tron_address_id
        setAddress(address)
        chain(address)
        token(address)
        protocol(address)
        tron(taddress)
         }
        }
      })
  }
  const handleChange = (event) => {
    setbal('')
    setSelected()
    setState1(false)
    setWalletN(event.target.value)
    const wallet_details = result2?.filter(i => i.wallet_name?.trim(' ') === event.target.value)
    const wall = resultAddress?.filter(w => w.wallet_id == wallet_details?.[0]?.walletId)
    setbal(wall?.[0]?.total_usd_value)
    address(wallet_details)
    setwallet_id(wallet_details)
  }
  const chain = (address) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getchainlistofaddressWallet`, {
        params: { address_id: address }
      })
      .then((response2) => {
        setChainList(response2.data)
      })
  }
  const tron=(tronaddress)=>{
    let tot=0
    axios
    .get(`${process.env.REACT_APP_BASE_URL}/get_tron_address_chain`, {
      params: { 
        address_id: tronaddress,
        address_type:'TRON'
       },
    })
    .then((response2) => {
       for(let a of response2.data){
       let b = (a.balance)*Math.pow(10,-a.tokenDecimal)
       if(a.tokenPriceInTrx!=null && b!=1){
         tot =tot + (a.tokenPriceInTrx * b)
       }
      setTronAmount(tot)
       }
      setTronWallet(response2.data)
    });
  
  }
  const token = (address) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllTokensofWallet`, {
        params: { address_id: address }
      })
      .then((response1) => {
        let t = 0
        for (const a of response1.data) {
          t = t + Math.floor((a.token_amount * a.token_price))
        }
        setbal(Math.floor(t))
        setWalletData1(response1.data)
      })
  }
  const protocol = (address) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain`, {
        params: { address_id: address }
      })
      .then((response3) => {
        setResult(response3.data)
      })
  }
  const allportfolioUser = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_portfolios_details`, {
        params: {
          user_id: getId
        }
      }).then((response) => {
        console.log(response.data)
          let addressData= response.data.filter(i=>i.portfolio_id==walletIdAddress)
          console.log(addressData)
         
          if(addressData[0].walletsdata!=undefined){
            console.log('adr',addressData[0].walletsdata)
            // const tempBal  = addressData[0].walletsdata?.[0]?.addresseslistdata.map(record=>{
            //   let walletTotalBal=0
            //   walletTotalBal = walletTotalBal + record.totalwalletbalance + record.totalwalletbalance_btc + record.totalwalletbalance_tron
            //   return {...record, totalBal:walletTotalBal}
            //  })
         const temp  = addressData[0].walletsdata.map(record=>{
          // record.totalwalletbalance = record.addresseslistdata.reduce(

          //   (accumulator,currentValue)=>currentValue.address_type=='ETH' ? parseFloat(accumulator)+(parseFloat(currentValue.total_received)-parseFloat(currentValue.total_sent)) : 0 ,
          //   0
          // )
          // record.totalwalletbalance_tron = record.addresseslistdata.reduce(
          //   (accumulator,currentValue)=>currentValue.address_type=='TRON' ? parseFloat(accumulator)+(parseFloat(currentValue.total_received)-parseFloat(currentValue.total_sent)) : 0,
          //   0
          // )
          // record.totalwalletbalance_btc = record.addresseslistdata.reduce(
          //   (accumulator,currentValue)=>currentValue.address_type=='BTC' ? parseFloat(accumulator)+(currentValue.total_received - currentValue.total_sent) : 0,
          //   0
          // )
          let w_b = record.addresseslistdata?.map(rec=>{
           let tb1=rec.address_type=='ETH' ? (parseFloat(rec.total_received)-parseFloat(rec.total_sent)) : 0
           let tb2=rec.address_type=='TRON' ? (parseFloat(rec.total_received)-parseFloat(rec.total_sent)) : 0
           let tb3=rec.address_type=='BTC' ? (rec.total_received - rec.total_sent) : 0
          return { ...rec, w_bal:tb1+tb2+tb3 }
          })
          const sum_b = w_b.reduce(
            (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.w_bal),
            0,
          );
            let walletTotalBal=0
          walletTotalBal = walletTotalBal + w_b
          return {...record, totalBal: sum_b}
          
         })
         console.log(temp)
           setAddressList(temp)
           setLoading(false)
          // console.log('adr',temp)
          const sum = temp.reduce(
            (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.totalBal),
            0,
          );
          
          console.log(sum)
          setTotalBalanceWallet(sum)
        }
      })
      }
     
      // let totalWalletbal=0
      // if(addressList){
      //   for(let a of addressList){
      //    totalWalletbal = parseFloat(totalWalletbal) + parseFloat(a.totalBal).toFixed(2)
      //   }
      // }
      // console.log(totalWalletbal,addressList)
  const handleChange1 = (event) => {
    setAddress(event.target.value)
    setSelected()
    const tron_address=resultAddress?.filter(j=>j.tron_address_id==event.target.value)
    const tron_id = tron_address?.[0]?.tron_address_id
    tron(tron_id)
    let wal_id=resultAddress?.filter(i => i.address_id == event.target.value);
    setbal(wal_id?.[0]?.total_usd_value);
    setwal_bal(wal_id?.[0]?.total_usd_value);
    setWal_id(wal_id)
    console.log(wal_id)
    const details = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain`, {
          params: { address_id: wal_id?.[0]?.address_id }
        })
        .then((response) => {
          setResult(response.data)
        })
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getchainlistofaddressWallet`, {
          params: { address_id: wal_id?.[0]?.address_id }
        })
        .then((response) => {
          setChainList(response.data)
        })
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/getAllTokensofWallet`, {
          params: { address_id: wal_id?.[0]?.address_id }
        })
        .then((response) => {
          setWalletData1(response.data)
        })
    }
    details()
  }
  const refresh_wallet = async () => {
    setloading(true)
    const ad = resultAddress?.filter(i => i.address_id == Address)
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/refreshUserData`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        user_id: getId,
        portfolio_id: walletIdAddress,
        wallet_id: ad?.[0]?.wallet_id,
        address_id: ad?.[0]?.address_id,
        address_name: ad?.[0]?.address_name,
        address_type: ad?.[0]?.address_type
      }
    }
    await axios(config).then(function (response) {
      const rd = response.data
      const addressC = rd?.[0]?.address_id
      setWalBal(rd?.[0]?.total_usd_value)
      chain(addressC)
      token(addressC)
      protocol(addressC)
      setloading(false)
    })
  }
  const handleClick = (i, key) => {
    var t = 0
    console.log(i);
    var fil = walletData1?.filter((d) => d.token_chain_id == i.asset_id);
    console.log(fil)
     setWalletData(fil);
    var res3 = result?.filter((r) => r.protocolChain == i.asset_id);
    console.log(res3);
     setResult1(res3);
    for(var a of fil){
      t= t + (a.token_amount * a.token_price)
      console.log(t)
      setbal(Math.floor(t))
   }
     setState1(true);
  };
  const invest = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllInvestment`, {
        params: { portfolio_id: walletIdAddress }
      })
      .then((response) => {
        let totalInvest=0
        setResultI(response.data.filter(i=>i.status=='Active'))
        for(let a of response.data.filter(i=>i.status=='Active')){
         totalInvest= (parseFloat(a.purchase_price) * parseFloat(a.quantity)) + totalInvest
        }
        setTotalInvestValue(totalInvest)
      })
  }
  console.log(totalInvestValue)
  const exchange = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getExchangeData`,
      params:
      {
        portfolio_id: walletIdAddress
      }
    }
    await axios(config).then(function (response) {
      setResultE(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }

  let totalE = 0
  for (const a of resultE) {
    totalE = totalE + parseFloat(a.free)
  }

  const resultE1 = []
  const array = [...new Map(resultE.map(item =>
    [item.api_key, item])).values()]
  resultE1.push({ exchange_name: array?.[0]?.exchange_name, exchange_type: array?.[0]?.exchange_type, accountType: array?.[0]?.accountType, api_key: array?.[0]?.apikey, asset: [], free: totalE, portfolio_id: array?.[0]?.portfolio_id })
  const array1 = [...new Map(resultE.map(item =>
    [item.assetName, item])).values()]
  for (const a of resultE1) {
    a.asset.push(array1)
  }
  let totalExch=0
  if(resultE1){
  for(let a of resultE1){
totalExch= totalExch + parseFloat(a.free).toFixed(2)
  }
}
  console.log('exch',resultE1)
  return (
    <React.Fragment>
      <Container fluid>
         {/* <Row className="justify-content-end">
          <Header />
        </Row> */}
        <Row>
          {/* <Col md={2} className="justify-content-center">
            <SidebarAdmin />
          </Col>  */}
          <Col lg={12} className='admin-scroll' style={{height:'85vh', overflow:'auto'}}>
            <Row className="d-flex justify-content-start flex-row" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Portfolio name - {portName}</h3>
              </span>
              {/* <Link
                className="p-2 pageheader"
                to="#"
                onClick={refresh_wallet}
              >
                <Tooltip title="Refresh">
                  <Icon
                    icon="ic:sharp-refresh"
                    style={{ fontSize: '25px', color: '#FFC107' }}
                  />
                </Tooltip>
              </Link> */}
              <span
                className="p-2 pageheader" style={{marginTop:'2.2%'}}
                onClick={() => navigate('/PMS/Admin/Transactions',
                  { state: { id: 1, data1: location?.state?.data, data1: walletN, value: Address } }
                )} >
                <Tooltip title="Transaction History">
                  <ReceiptLongIcon style={{ color: '#FFC107', fontSize: '25px' }} />
                </Tooltip>
              </span>
              {/* {result2?.map(e=>
                <div
                  className='justify-content-end'
                  style={{
                    width: '12%',
                    paddingLeft:'1rem',
                    background: 'hsl(218deg 9% 18% / 67%)',
                    color: 'white',
                    height: '40px',
                    marginTop:'1rem',
                    transition: 'all 0.5s',
                    flexDirection: 'row',
                    borderRadius: '22px',
                    whiteSpace:'nowrap',
                    lineHeight:'2.5rem'
                  }}
                >
                    {e.wallet_name}
                  </div>
              )} */}
            </Row>
            <Row className="d-flex justify-content-end flex-column" >
              <div
                className="assets-chart-box "
                style={{
                  margin: '1%',
                  padding: '1%',
                  width:'53rem',
                  background: 'transparent',
                  borderRadius: '15px',
                  boxShadow: 'none'
                }}>
                <div
                  className='justify-content-center'
                  style={{
                    width: 'fit-content',
                    padding:'10px',
                    background: 'hsl(218deg 9% 18% / 67%)',
                    color: 'white',
                    height: '40px',
                    display: 'flex',
                    transition: 'all 0.5s',
                    flexDirection: 'row',
                    borderRadius: '22px',
                    marginLeft: '1%',
                    justifyContent:'center'
                    //  paddingRight: '16%'
                  }}
                >
                  <h6 style={{
                    // marginRight: '30px',
                    fontWeight:'bold',
                    marginTop: 'auto',
                    // paddingLeft: '20px',
                    // paddingRight: '5px',
                    // color: '#FFC107'
                  }}>
                    Total -
                  </h6>
                  {/* {tronWallet.length>0 ? 
                  <h4 style={{ fontSize: '15px', marginTop: 'auto' }} >
                    {tronAmount} TRX
                  </h4>
                  : */}
                  <h4 style={{ fontSize: '15px',marginLeft:'6px', marginTop: 'auto' }} >
                  {(parseFloat(totalBalanceWallet) + parseFloat(totalInvestValue) +parseFloat(totalExch))>0 ?
                  totalInvestValue!=undefined && ' '+'$'+parseFloat(parseFloat(totalBalanceWallet) + parseFloat(totalInvestValue) +parseFloat(totalExch)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
                 : (parseFloat(totalBalanceWallet) + parseFloat(totalInvestValue) +parseFloat(totalExch))<0 ?
                  totalInvestValue!=undefined && '-'+' '+'$'+parseFloat(parseFloat(totalBalanceWallet) + parseFloat(totalInvestValue) +parseFloat(totalExch)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')?.split('-')[1]
                 : '$'+0
                }
                {
          
                }
                </h4>
                {/* } */}
                </div>
              </div>
            </Row>
            {loading
              ? (
                <Spinner
                  style={{
                    marginTop: '-30%',
                    marginLeft: '32%',
                    height: '70px',
                    width: '70px'
                  }}
                  animation="border"
                  variant="primary"
                />
                )
              : null}
            <Container fluid className=" overflow-auto invest_scroll" style={{height:'85vh', overflow:'auto'}}>
              <Row className="d-flex flex-column justify-content-center m-0 datatable" >
                {addressList.map((item, index)=>(
              <div
                key={index}
                  className="assets-table-item"
                  style={{ flex: '0 0 100%', height: 'auto', marginTop: '3%', paddingTop:'8px', width:'100%' }}
                >
                  <div className="table-heading-wrap"
                  
                  >
                    <h5 style={{ fontSize: '22px' }}>
                      <span>
                        <Image src={wallateIcon} />
                      </span>
                      {item.wallet_name}
            
                    </h5>
                    
                    <span style={{display:'flex',flexDirection:'row',gap:'1em',marginTop:'1%'}}>
                    {item.totalBal!=undefined &&
                    <p style={{color:'white'}}>{parseInt(item.totalBal)>0 ?
                    '$'+parseFloat(item.totalBal).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')
                    : parseInt(item.totalBal)==0 ? 0 :
                     '-'+'$'+parseFloat(item.totalBal).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')?.split('-')[1]
                    }</p>}
                      <p 
                   
                        >
                          
                        { walletShowId!=item.wallet_id &&
                          <AddCircleOutlineOutlinedIcon style={{color:'#FFC107',cursor:'pointer'}}
                          onClick={
                            ()=>{ 
                              // toggleClick(item.wallet_id)
                            //  setWalletShow(prev => prev.walletShow !== item.wallet_id? item.wallet_id: '');
                            //  SetOpenToggle(!openToggle)
                            setWalletShowId(item.wallet_id)
                            setAddressData(item.addresseslistdata)
                            console.log('item',item,walletShow[item.wallet_id],showData)
                            }
                            }
                          /> }

                           {walletShowId==item.wallet_id &&
                         <RemoveCircleOutlineSharpIcon style={{color:'#FFC107',cursor:'pointer'}}
                         onClick={()=>setWalletShowId('')}
                         /> 
                     
                        }
                    </p>
                    </span>
                  </div>
                  
                  { walletShowId==item.wallet_id   ?
                  <div>
                              <CommonTableWalletInfo
                                data={addressData}
                                columns={columnsAddressData}
                              />
                  </div> :<></>}
                </div>))}
                </Row>
                {/* <div
                  className="assets-table-item"
                  style={{ flex: '0 0 100%', height: 'auto', marginTop: '1%', paddingTop:0 }}
                >
                  <div className="table-heading-wrap">
                    <h5 style={{ fontSize: '22px' }}>
                      <span>
                        <Image src={wallateIcon} />
                      </span>
                      Token
                      {bal==undefined ? <></> :
                    <p style={{color:'white',marginTop:'15px',marginLeft:'2em'}}>${bal.toLocaleString()}</p>}
                    </h5>
                    
                    <span>
                      <p onClick={()=>{setWalletShow(!walletShow)}}>
                        {walletShow===false ? 
                    <AddCircleOutlineOutlinedIcon style={{color:'#FFC107',cursor:'pointer'}}/>
                    : <RemoveCircleOutlineSharpIcon style={{color:'#FFC107',cursor:'pointer'}}/>}
                    </p>
                    </span>
                  </div>
                  {walletShow===true ?
                  <div style={{ height: '40vh' }}>
                              <CommonTable
                                data={walletData1}
                                columns={columns}
                              />
                  </div> : <></>}
                </div> */}
              <Row className="d-flex flex-column justify-content-center m-0 datatable " >
                <div
                  className="assets-table-item"
                  style={{ flex: '0 0 100%',  height: 'auto',marginTop: '3%', paddingTop: '8px' }}
                >
                  <div className="table-heading-wrap">
                    <h5 style={{ fontSize: '22px' }}>
                      <span>
                        <Image src={investmentIcon} />
                      </span>
                      Investments
                    </h5>
                    <span style={{display:'flex',flexDirection:'row',gap:'1em',marginTop:'1%'}}>
                    {parseFloat(totalInvestValue)==undefined ? <></> :
                    <p style={{color:'white'}}>{totalInvestValue!=undefined && ('$'+parseFloat(totalInvestValue).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''))}</p>}
                    <p onClick={()=>{setInvestShow(!investShow)}}>
                        {investShow===false ? 
                    <AddCircleOutlineOutlinedIcon style={{color:'#FFC107',cursor:'pointer'}}/>
                    : <RemoveCircleOutlineSharpIcon style={{color:'#FFC107',cursor:'pointer'}}/>}
                    </p>
                    </span>
                  </div>
                  {investShow===true ? 
                  <div >
                    <CommonTableInvestmentInfo data={resultI} columns={columns2} />
                  </div> : <></>}
                </div>
              </Row>
              <Row className="d-flex flex-column justify-content-center m-0 datatable " >
                <div
                  className="assets-table-item"
                  style={{ flex: '0 0 100%', height: 'auto', marginTop: '3%', paddingTop: '8px' }}
                >
                  <div className="table-heading-wrap">
                    <h5 style={{ fontSize: '22px' }}>
                      <span>
                        <Image src={exchangeIcon} />
                      </span>
                      Exchanges
                    </h5>
                    <span style={{display:'flex',flexDirection:'row',gap:'1em',marginTop:'1%'}}>
                    {parseFloat(totalExch)==undefined ? <></> :
                    <p style={{color:'white'}}>${parseFloat(totalExch).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p>}
                    <p onClick={()=>{setExchangetShow(!exchangeShow)}}>
                        {exchangeShow===false ? 
                    <AddCircleOutlineOutlinedIcon style={{color:'#FFC107',cursor:'pointer'}}/>
                    : <RemoveCircleOutlineSharpIcon style={{color:'#FFC107',cursor:'pointer'}}/>}
                    </p>
                    </span>
                  </div>
                  {exchangeShow===true ? 
                  <div style={{ height: '20vh' }}>
                    <RawTableExchange   data={resultE1} columns={columns22} />
                  </div> :  <></>} 
                </div>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container >
    </React.Fragment >
  )
}
export default AdminAssets