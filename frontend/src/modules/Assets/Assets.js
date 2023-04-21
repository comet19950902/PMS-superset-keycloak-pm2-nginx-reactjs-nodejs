import { Icon } from '@iconify/react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar'
import { Col, Image, Nav, Row, Tab, Spinner } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Header from '../../common/Header/Header'
import Sidebar from '../../store/Dashboard/Sidebar'
import Ethereum from '../../assets/images/ethereum-svgrepo.png'
import wallateIcon from '../../assets/images/wallateicon.png'
import investmentIcon from '../../assets/images/investmentIcon.png'
import exchangeIcon from '../../assets/images/exchangeIcon.png'
import binanceLogo from '../../assets/images/binance-logo.png'
import './Assets.css'
import copy from 'copy-to-clipboard'
import CommonTable from '../../common/CommonTable/CommonTable'
import { BalconySharp, SettingsOverscanOutlined } from '@mui/icons-material'
import { FilledInput, Select, Alert } from '@mui/material'
import { border } from '@mui/system'
// import SidebarIcons from "../../store/Dashboard/SidebarIcons";
import SideBarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'
import SideBarIconsAdmin from '../../Admin/DashboardAdmin/SidebarIconsAdmin'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import Tooltip from '@mui/material/Tooltip'

// const data = [
//   {
//     name: ` BTC`,
//     marketPrice: "$392,908",
//     quantity: "3",
//     assetValue: "$92,908",
//   },
//   {
//     name: ` ETH`,
//     marketPrice: "$782,753",
//     quantity: "6",
//     assetValue: "$92,908",
//   },
// ];
// const data2 = [
//   {
//     name: ` Lorem`,
//     type: "Ipsum",
//     date: "2022- 03 -07  ",
//     assetValue: "$92,908",
//   },
//   {
//     name: ` Lorem`,
//     type: "Ipsum",
//     date: "2022- 04 -07  ",
//     assetValue: "$92,908",
//   },
// ];

const data3 = [
  {
    name: ' Binance',
    lorem: '$392,908',
    ipsum: '3',
    dolor: '$92,908'
  },
  {
    name: ' Coinbase',
    lorem: '$782,753',
    ipsum: '6',
    dolor: '$92,908'
  }
]
const columns = [
  {
    dataField: 'token_symbol',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          {/* <span className="mr-2">
            <Image src={Ethereum} />
          </span> */}
          {row.token_symbol}
        </p>
      )
    }
  },
  {
    dataField: 'marketPrice',
    text: 'Market Price',
    sort: false,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          ${row.token_price.slice(0, 8)}
        </p>
      )
    }
  },
  {
    dataField: 'quantity',
    text: 'Quantity',
    sort: false,
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
      const m = 0
      const total = Math.floor(row.token_amount * row.token_price)
      // for(const a of total ){
      // console.log(total)

      // }
      return (
        <p className="d-flex align-items-center" style={{ fontSize: '15px' }}>
          ${total}
        </p>
      )
    }
  }
]

const columns2 = [
  {
    dataField: 'investment_name',
    text: 'Name',
    sort: true
  },
  {
    dataField: 'investment_type',
    text: 'Type',
    sort: false
  },
  {
    dataField: 'date_of_investment',
    text: 'Date',
    sort: false
  },
  {
    dataField: 'investment_value',
    text: 'Value',
    sort: true
  }
]

const columns3 = [
  {
    dataField: 'name',
    text: 'Name',
    sort: true,
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <p className="d-flex align-items-center">
          <span className="mr-2">
            <Image src={binanceLogo} />
          </span>
          {row.name}
        </p>
      )
    }
  },
  {
    dataField: 'lorem',
    text: 'lorem',
    sort: false
  },
  {
    dataField: 'ipsum',
    text: 'Ipsum',
    sort: false
  },
  {
    dataField: 'dolor',
    text: 'Dolor',
    sort: true
  }
]

const Assets = () => {
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
  const [state1, setState1] = useState(false)
  const [loading, setloading] = useState(false)
  const [walletData, setWalletData] = useState([])
  const [walletData1, setWalletData1] = useState([])
  const [refreshWal, setRefreshWal] = useState('')
  const [open, setOpen] = useState(false)
  const [bal, setbal] = useState()
  const [uptAsset, setUptAsset] = useState([])

  const [uptBal, setUptBal] = useState('')
  const [chainList, setChainList] = useState([])
  const [Fil, setFil] = useState([])
  const [balanceWallet, setBalanceWallet] = useState('')
  const [alertValueData, setAlertValueData] = useState(true)
  const [dataShow, setDataShow] = useState('Show More Data')
  const [showDashboard, setShowDashboard] = useState(false)
  const [wal_id, setWal_id] = useState([])
  const [selected, setSelected] = useState()
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('0%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
  const [resultAddress, setResultAddress] = useState([])
  const [total, setTotal] = useState('')

  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setm('-10%')
      setMargin('8%')
      setWidthData('0%')
      console.log(showDashboard)
      console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('1.8%')
      setW('100%')
      setMargin('22%')
      setWidthData('2%')
      console.log(showDashboard)
      console.log(newWidth)
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
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {

    }
  }
  //  var upt_bal
  const location = useLocation()
  console.log(location)
  const walletIdAddress = location.pathname.slice(13)
  console.log(walletIdAddress)
  const [wallet_id, setwallet_id] = useState()
  // const[walletData, setWalletData]=useState([]);
  //  var getWalletId=localStorage.getItem('walletId');
  const getId = localStorage.getItem('sub_Id')
  // var  addressData="0x4cb780fd3286f2d10199b61423d1c804bd2a5d2b";
  console.log(getId)
  // const[result,setResult]=useState([]);
  const total_investment = 0
  let copiedData
  const copyToClipboard = (wallet_id) => {
    copy(wallet_id, {
      debug: true,
      message: 'Press #{key} to copy'
    })
    setOpen(true)
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }
  const loadFunctionGetAllWallets = async () => {
    // const wallet = async ()=>{
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/get_wallets', {
        params: { portfolio_id: walletIdAddress }
      })
      .then((response) => {
        console.log(response.data)
        setResult2(response.data)
        let t = 0
        axios
          .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
            params:
            {
              portfolio_id: walletIdAddress,
              wallet_id: response.data?.[0]?.walletId
            }
          })
          .then((response) => {
            console.log(response.data)
            setResultAddress(response.data)
            // setAddress(response.data?.[0]?.address_id)
            axios
              .get('${process.env.REACT_APP_BASE_URL}/getAllTokensofWallet', {
                params: { address_id: response.data?.[0]?.address_id }
              })
              .then((response1) => {
                console.log(response1.data)
                setWalletData1(response1.data)
                //  setWalletData(response.data);
                // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
                // console.log(wal_data)
                for (const a of response1.data) {
                  t = t + (a.token_amount * a.token_price)
                }
                // console.log(t)
                setTotal(Math.floor(t))
              })
            axios
              .get('${process.env.REACT_APP_BASE_URL}/getchainlistofaddressWallet', {
                params: { address_id: response.data?.[0]?.address_id }
              })
              .then((response2) => {
                console.log(response2.data)
                //  setWalletData(response.data);
                // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
                // console.log(wal_data)
                setChainList(response2.data)
              })
            axios
              .get('${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain', {
                params: { address_id: response.data?.[0]?.address_id }
              })
              .then((response3) => {
                console.log(response3.data)
                setResult(response3.data)
              })
            // refresh_wallet()
          })

        // refresh_wallet()
      })
    // }
    //  await wallet()

    // await axios
    // .get("${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet", {
    //   params:
    //   {
    //     portfolio_id: walletIdAddress,
    //     wallet_id: wallet_id?.[0]?.walletId,
    //   },
    // })
    // .then((response) => {
    //   console.log(response.data);
    //    setResultAddress(response.data);
    // })
  }
  const loadFunctionGetAllAddress = async () => {
    console.log(result2)
  }
  useEffect(async () => {
    await loadFunctionGetAllWallets()
    await loadFunctionGetAllAddress()
    loadFunction()

    // refresh_wallet()
  }, [])
  //  console.log(address)
  const loadFunction = async () => {

    // await axios
    //   .get("${process.env.REACT_APP_BASE_URL}/getAllInvestment", {
    //     params: { userId: getId },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     for(var t of response.data){
    //       total_investment = t.investment_value + total_investment
    //     }
    //     setResult1(response.data);
    //     // setWalletData(response.data.wallet_asset);
    //   });
    // await axios
    //   .get("${process.env.REACT_APP_BASE_URL}/getassetsofaddresswallet", {
    //     params: { walletId: walletIdAddress },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setResult4(response.data);
    //   });

    // await axios
    // .get("${process.env.REACT_APP_BASE_URL}/get_wallets", {
    //   params: { userId: getId },
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   setResult2(response.data);
    //   // refresh_wallet()
    // });
    // await axios
    // .get("${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet", {
    //   params:
    //   {
    //     user_id: getId,
    //     wallet_id:walletIdAddress,
    //   },
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   setResultAddress(response.data);
    //   // refresh_wallet()
    // });

    // // await axios
    // // .get("${process.env.REACT_APP_BASE_URL}/debank_fetch/change_invest", {
    // //   params: { walletId: walletIdAddress },
    // // })
    // // .then((response) => {
    // //   console.log(response.data);
    // //   setResult1(response.data);
    // // });
    // await axios
    //   .get("${process.env.REACT_APP_BASE_URL}/get_wallets", {
    //     params: { userId: getId },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     setResult2(response.data);
    //     // refresh_wallet()
    //   });
    // loadFunctionGetAllAddress();
    // loadFunctionGetAllWallets();
  }
  console.log(result)
  console.log(chainList)

  // const wal_bal = result2?.filter(i=>i.walletId==walletIdAddress)
  // console.log(wal_bal)
  // var r2 = result2?.filter((i) => i.walletId==walletIdAddress);
  // var r4 = resultAddress?.filter((i) => i.address_id);
  const handleChange = (event) => {
    // console.log(result2);
    // console.log(event.target.value);
    // console.log(event.target.value)

    const wallet_details = result2?.filter(i => i.wallet_name == event.target.value)
    //  console.log(wallet_details)
    //  console.log(wallet_details?.[0]?.walletId, resultAddress)
    // var wall = resultAddress?.filter(w=>w.wallet_id==wallet_details?.[0]?.walletId)
    // console.log(wall)
    // setbal(wal_id?.[0]?.total_usd_value)
    // var b = wal_id?.filter(i=>i.total_usd_value!=uptBal)
    console.log(wallet_details)
    // console.log(wal_id);
    // setState(false);

    // setBalanceWallet(wal_id?.[0]?.total_usd_value);
    // bal =bal1

    setwallet_id(wallet_details)

    // var wall = resultAddress?.filter(i=>i.wallet_id==wallet_details?.[0]?.walletId)
    // console.log(wall)
    // console.log(wallet_id);
    // console.log(wal_id);
    const wal = async () => {
      console.log(wallet_details)
      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
          params:
          {
            portfolio_id: walletIdAddress,
            wallet_id: wallet_details?.[0]?.walletId
          }
        })
        .then((response) => {
          console.log(response.data)
          setResultAddress(response.data)
          setbal(response.data?.[0]?.total_usd_value)
          axios
            .get('${process.env.REACT_APP_BASE_URL}/getAllTokensofWallet', {
              params: { address_id: response.data?.[0]?.address_id }
            })
            .then((response1) => {
              console.log(response1.data)
              //  setWalletData(response.data);
              // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
              // console.log(wal_data)
              let t = 0
              for (const a of response1.data) {
                t = t + (a.token_amount * a.token_price)
              }
              // console.log(t)
              setTotal(Math.floor(t))
              setWalletData1(response1.data)
            })
          axios
            .get('${process.env.REACT_APP_BASE_URL}/getchainlistofaddressWallet', {
              params: { address_id: response.data?.[0]?.address_id }
            })
            .then((response2) => {
              console.log(response2.data)
              //  setWalletData(response.data);
              // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
              // console.log(wal_data)
              setChainList(response2.data)
            })
          axios
            .get('${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain', {
              params: { address_id: response.data?.[0]?.address_id }
            })
            .then((response3) => {
              console.log(response3.data)
              setResult(response3.data)
            })
          // refresh_wallet()
        })
    }
    wal()
    // setbal(wal_id?.[0]?.total_usd_value);
    // setWal_id(wal_id)

    // try {
    //   var asset_result = await axios
    //     .get("${process.env.REACT_APP_BASE_URL}/getassetsofaddresswallet", {
    //       params: { walletId: wal_id?.[0]?.walletId },
    //     })
    //     .then((response) => {
    //       //     console.log(response.data);
    //       setResult(response.data);
    //     });
    //   await axios
    //     .get("${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain", {
    //       params: { address_id: wal_id?.[0]?.address_id },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       setResult3(response.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(asset_result.data);
    // .then((response) => {

    //   // var asset_d = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
    //    console.log(response.data);
    //   // setWalletData(response.data);
    // });

    // console.log(bal)
  }
  console.log(result3)
  const handleChange1 = (event) => {
    const wal_id = resultAddress?.filter(i => i.address_id == event.target.value)
    setbal(wal_id?.[0]?.total_usd_value)
    setWal_id(wal_id)
    const details = async () => {
      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
          params:
          {
            portfolio_id: walletIdAddress,
            wallet_id
          }
        })
        .then((response) => {
          console.log(response.data)
          setResultAddress(response.data)

          // refresh_wallet()
        })

      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain', {
          params: { address_id: wal_id?.[0]?.address_id }
        })
        .then((response) => {
          console.log(response.data)
          setResult(response.data)
        })
      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getchainlistofaddressWallet', {
          params: { address_id: wal_id?.[0]?.address_id }
        })
        .then((response) => {
          console.log(response.data)
          //  setWalletData(response.data);
          // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
          // console.log(wal_data)
          setChainList(response.data)
        })
      await axios
        .get('${process.env.REACT_APP_BASE_URL}/getAllTokensofWallet', {
          params: { address_id: wal_id?.[0]?.address_id }
        })
        .then((response) => {
          console.log(response.data)
          //  setWalletData(response.data);
          // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
          // console.log(wal_data)
          setWalletData1(response.data)
          // setState1(false);
        })
    }
    details()
  }
  // console.log(walletData);
  const refresh_wallet = async () => {
    // console.log(wal_id);
    setloading(true)
    // console.log(wallet_id)
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/debank_fetch/wallet_balance', {
        params: { address_id: resultAddress?.[0]?.address_id }
      })
      .then((response) => {
        console.log(response.data)
        setRefreshWal(response.data)
        setState(true)
      })
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAlladdressofwallet', {
        params:
        {
          portfolio_id: walletIdAddress,
          wallet_id: result2?.[0]?.walletId
        }
      })
      .then((response) => {
        console.log(response.data)
        const upt_bal = response.data?.filter(i => i.address_id == resultAddress?.[0]?.address_id)
        console.log(upt_bal)
        setUptBal(upt_bal?.[0]?.total_usd_value)
        setState(true)
        setloading(false)

        // refresh_wallet()
      })
    // setloading(false)
    // await axios
    //   .get("${process.env.REACT_APP_BASE_URL}/getAllWalletsofUSer", {
    //     params: { user_id: getId },
    //   })
    //   .then((response1) => {
    //     var upt_bal = response1.data?.filter(i => i.walletId == wallet_id);
    //     console.log(upt_bal);
    //     setUptBal(upt_bal?.[0]?.total_usd_value);
    //     setState(true);

    // setUptBal(upt_bal?.[0]?.total_usd_value)
    //  console.log()
    // console.log(bal)
    // setRefreshWal(response.data)
    // console.log(response.data)
    // console.log(response.data);
    //  setWalletData(response.data);
    // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
    // console.log(wal_data)
    //  setRefreshWal( response.data)
    // });
    // await axios
    //   .get("${process.env.REACT_APP_BASE_URL}/getassetsofaddresswallet", {
    //     params: { address_id: wallet_id },
    //   })
    //   .then((response2) => {
    //     console.log(response2.data);
    //     setUptAsset(response2.data);
    //     setState(true);
    //   });

    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllTokensofWallet', {
        params: { address_id: wal_id?.[0]?.address_id }
      })
      .then((response3) => {
        //  console.log(response2.data);
        setUptToken(response3.data)
      })
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getProtocolsOnChain', {
        params: { address_id: wal_id?.[0]?.address_id }
      })
      .then((response31) => {
        console.log(response31.data)
        setResult31(response31.data)
        setState(true)
      })
    // setloading(false);
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getchainlistofaddressWallet', {
        params: { address_id: wal_id?.[0]?.address_id }
      })
      .then((response) => {
        console.log(response.data)
        //  setWalletData(response.data);
        // const wal_data = response.data?.filter(i=>i.walletId==wal_id?.[0]?.walletId)
        // console.log(wal_data)
        setChainList(response.data)
        setState(true)
      })
    // setloading(false);
    setState(false)
  }
  console.log(result31)
  // console.log(uptBal)

  const handleClick = (i, key) => {
    let t = 0
    // if(color==='white'){
    //   console.log(e)
    //   setColor('blue')
    // }
    // else{
    //   setState11({color:'white'})
    // }
    console.log(i)
    const fil = walletData1?.filter((d) => d.token_chain_id == i.asset_id)
    setFil(fil)
    const res3 = result?.filter((r) => r.protocolChain == i.asset_id)
    console.log(res3)
    setRes3(res3)
    for (const a of fil) {
      t = t + (a.token_amount * a.token_price)
    }
    console.log(t)
    setBalanceWallet(Math.floor(t))
    console.log(fil)
    setState1(true)
    // setBalanceWallet(i.total_asset_balance);
  }

  const getAsset = (event) => {
    console.log(event)
  }
  const changeColor = (e) => {
    console.log(e)
  }
  // var data = state===true?walletData:Fil
  // const data = walletData
  // var data = []
  // console.log(result1)
  console.log(result5)
  console.log(result)
  return (
    <div>
      <div className="mainmyassets" >
        <Row>
          {showDashboard === true ? <SideBarAdmin /> : <SideBarIconsAdmin />}
          <Col lg={newWidth}>
            <Header />
            {showDashboard === true
              ? (<KeyboardDoubleArrowLeftIcon
                sx={{ fontSize: 30 }}
                onClick={handleToggle}
                style={{ color: 'white', marginLeft: '-2%', marginTop: '1%' }}
              />)
              : (<KeyboardDoubleArrowRightIcon
                sx={{ fontSize: 30 }}
                onClick={handleToggle}
                style={{ color: 'white', marginLeft: '-13.5%', marginTop: '-1.2%' }}
              />)}
            <hr
              style={{ backgroundColor: 'darkgrey', width: w, marginLeft: m, marginTop: '-1%' }}
            />
            <div className="maindashinfo">
              <div
                className="heading mt-0 flex-wrap"
                style={{ marginLeft: '-3%' }}
              >
                <h3 className="w-100 mb-5" style={{ fontSize: '18px' }}>
                  My portfolio
                </h3>
              </div>
              {alert
                ? (
                  <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
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
              {/* {alert ?
                    <Alert severity="success">Copied</Alert>
                   : <></> } */}
              <div className="assets-chart-box" style={{ padding: '98px', height: '30%' }}>
                <Row>
                  <Col lg={3}>
                    <div
                      className="chart-box-item"
                      style={{
                        width: '100%',
                        height: '150%',
                        paddingTop: '8%',
                        marginTop: '-30%'
                      }}
                    >
                      <h6 style={{ marginLeft: '-11%' }}>
                        Total Portfolio
                      </h6>
                      {/* {console.log(result1?.[0].user_balance)} */}
                      {/* {console.log(uptBal)} */}
                      {state === false
                        ? (
                            bal
                              ? (
                              <h4
                                style={{ fontSize: '15px', marginLeft: '-10%' }}
                              >
                                {' '}
                                ${bal}
                              </h4>
                                )
                              : (
                              <h4
                                style={{ fontSize: '15px', marginLeft: '-10%' }}
                              >
                                {' '}
                                ${resultAddress?.[0]?.total_usd_value}
                              </h4>
                                )
                          )
                        : (
                          <h4
                            style={{ fontSize: '15px', marginLeft: '-10%' }}
                          >
                            $ {uptBal}
                          </h4>
                          )}
                    </div>
                  </Col>
                </Row>

                <div className="d-flex flex-column justify-content-between">
                  <div className="assets-chart-wrap heading mt-0 mb-3">
                    <select
                      className="days"
                      style={{
                        textAlign: 'center',
                        width: '20%',
                        marginLeft: '70%',
                        marginTop: '-15%',
                        marginBottom: '12%'
                      }}
                      onChange={handleChange}
                    >
                      {result2?.map((e) => (
                        <option>{e.wallet_name}</option>
                        // <option>Asset 2</option>
                        // <option>Asset 3</option>
                      ))}
                    </select>
                  </div>
                  <div className="assets-chart-wrap heading mt-0 mb-3">
                    <select
                      className="days"
                      style={{
                        textAlign: 'center',
                        width: '20%',
                        marginLeft: '70%',
                        marginTop: '-10%',
                        marginBottom: '12%'
                      }}
                      onChange={handleChange1}
                    >
                      {resultAddress?.map((e) => (
                        <option>{e.address_id}
                          {
                            console.log(e.address_id)
                          }
                        </option>
                        // <option>Asset 2</option>
                        // <option>Asset 3</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className="assets-chart-wrap heading  chart-box-item"
                  style={{ width: '65%', marginTop: '-5%' }}
                >
                  <h6 style={{ fontSize: '15px' }}>
                    Wallet address
                  </h6>

                  {state === false ? (
                    <h4
                      style={{
                        fontSize: '15px',
                        paddingTop: '10%',
                        paddingRight: '10%',
                        marginTop: '3%',
                        marginLeft: '-70%'
                      }}
                    >
                      {resultAddress?.[0]?.address_id}
                      {/* {console.log(resultAddress?.[0]?.address_id)}  */}
                      <Link to="#">
                        <Tooltip title="Copy to Clipboard">
                          <Icon
                            icon="cil:copy"
                          // onClick={() => copyToClipboard(r2?.[0]?.walletId)}
                          />
                        </Tooltip>
                      </Link>
                    </h4>
                  ) : (
                    <h4
                      style={{
                        fontSize: '15px',
                        paddingTop: '10%',
                        paddingRight: '10%',
                        marginTop: '3%',
                        marginLeft: '-70%'
                      }}
                    >
                      {wal_id?.[0]?.address_id}
                      {/* {console.log(result.user_invest)} */}
                      <Link to="#">
                        <Tooltip title="Copy to Clipboard">
                          <Icon
                            icon="cil:copy"
                            onClick={() => copyToClipboard(wal_id)}
                          />
                        </Tooltip>
                      </Link>
                    </h4>
                  )}
                  {/* <select className="days" >
                    <option>7 Days</option>
                    <option>7 Days</option>
                    <option>7 Days</option>
                  </select> */}
                </div>
                <Link
                  to="#"
                  className="btn btn-gray btn-transaction"
                  onClick={refresh_wallet}
                  style={{
                    marginLeft: '70%',
                    marginTop: '-29%',
                    boxShadow: 'unset',
                    paddingTop: '5px',
                    paddingRight: '5px',
                    height: '40px',
                    width: '20%',
                    color: 'white',
                    fontSize: '15px'
                  }}
                >
                  Refresh wallet
                  <Icon
                    icon="ic:sharp-refresh"
                    style={{ fontSize: '15px', color: 'green' }}
                  />
                </Link>
                <Link
                  to={`/PMS/Transactions/:${walletIdAddress}/:${resultAddress?.[0]}`}
                  className="btn btn-gray btn-transaction"
                  style={{
                    marginLeft: '70%',
                    boxShadow: 'unset',
                    fontSize: '15px',
                    height: '40px',
                    width: '20%',
                    marginTop: '1.5%'
                  }}
                >
                  <h6 style={{ marginTop: '-3%', fontSize: '15px' }}>
                    Transaction History
                  </h6>
                </Link>
              </div>
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
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className="asset-pills-wrap">
                  {/* className="asset-pills" */}
                  {/* variant="pills" */}
                  <span>
                    <Nav className="d-flex justify-content-evenly flex-wrap">
                      {state === false
                        ? !bal
                            ? chainList?.map((i, key) => (
                            <Nav.Item key={key}>
                              {/* {keyValue=key} */}
                              <Nav.Link eventKey="first">
                                <div
                                  className="btn btn-gray btn-transaction"
                                  onClick={(e) => {
                                    handleClick(i, key)
                                    console.log(i.asset_percentage_value, key, e)
                                    setSelected(key)
                                    // e.target.style.color='blue'
                                    // console.log(e.);
                                  }}
                                  style={{
                                    backgroundColor: selected === key ? 'dimgrey' : '',
                                    minWidth: '170px',
                                    minHeight: '55px',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    paddingTop: '-14%'
                                  }}

                                >
                                  <span
                                    style={{
                                      height: '50%',
                                      marginRight: '1%',
                                      marginTop: '5%'
                                    }}
                                  >
                                    <Image
                                      src={i.logo_url}
                                      style={{
                                        height: '4vh',
                                        width: '15%',
                                        marginLeft: '-6%'
                                      }}
                                    />
                                  </span>
                                  {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                  <span
                                    style={{
                                      color: 'white',
                                      fontSize: '12px',
                                      marginLeft: '-1%',
                                      paddingLeft: '2%'
                                    }}
                                    key={i.asset_name}
                                    id={i.asset_name}
                                    onClick={() => getAsset()}
                                  >
                                    {/* {console.log(i.asset_name)}  */}
                                    Assets on {i.asset_name}
                                  </span>
                                  <span>
                                    <div
                                      style={{
                                        marginLeft: '-40%',
                                        color: 'white',
                                        fontSize: '15px'
                                      }}
                                    >
                                      ${Math.floor(i.total_asset_balance)}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: '12px',
                                        marginTop: '-14%',
                                        marginLeft: '50%',
                                        color: 'white'
                                      }}
                                    >
                                      ({i.asset_percentage_value}%)
                                    </div>
                                  </span>
                                </div>
                              </Nav.Link>
                            </Nav.Item>
                            ))
                            : chainList?.map((i, key) => (
                            <Nav.Item>
                              {/* {keyValue=key} */}
                              <Nav.Link eventKey="first">
                                <div
                                  className="btn btn-gray btn-transaction"
                                  style={{
                                    backgroundColor: 'transparent',
                                    minWidth: '170px',
                                    minHeight: '55px',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    paddingTop: '-14%'
                                  }}
                                  onClick={() => handleClick(i, key)}
                                >
                                  <span
                                    style={{
                                      height: '50%',
                                      marginRight: '1%',
                                      marginTop: '5%'
                                    }}
                                  >
                                    <Image
                                      src={i.logo_url}
                                      style={{
                                        height: '4vh',
                                        width: '15%',
                                        marginLeft: '-6%'
                                      }}
                                    />
                                  </span>
                                  {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                  <span
                                    style={{
                                      color: 'white',
                                      fontSize: '12px',
                                      marginLeft: '-1%',
                                      paddingLeft: '2%'
                                    }}
                                    onClick={() => getAsset(i.asset_name)}
                                  >
                                    {/* {console.log(i.asset_name)}  */}
                                    Assets on {i.asset_name}
                                  </span>
                                  <span>
                                    <div
                                      style={{
                                        marginLeft: '-40%',
                                        color: 'white',
                                        fontSize: '15px'
                                      }}
                                    >
                                      ${Math.floor(i.total_asset_balance)}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: '12px',
                                        marginTop: '-14%',
                                        marginLeft: '50%',
                                        color: 'white'
                                      }}
                                    >
                                      ({i.asset_percentage_value}%)
                                    </div>
                                  </span>
                                </div>
                              </Nav.Link>
                            </Nav.Item>
                            ))
                        : uptAsset?.map((i, key) => (
                          <Nav.Item>
                            {/* {keyValue=key} */}
                            <Nav.Link eventKey="first">
                              <div
                                className="btn btn-gray btn-transaction"
                                style={{
                                  minWidth: '160px',
                                  minHeight: '55px',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  paddingTop: '-14%',
                                  backgroundColor: selected === key ? 'dimgrey' : ''
                                }}
                                onClick={() => handleClick(i, key)}
                              >
                                <span
                                  style={{
                                    height: '50%',
                                    marginRight: '1%',
                                    marginTop: '5%'
                                  }}
                                >
                                  <Image
                                    src={i.logo_url}
                                    style={{
                                      height: '4vh',
                                      width: '15%',
                                      marginLeft: '-6%'
                                    }}
                                  />
                                </span>
                                {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                <span
                                  style={{
                                    color: 'white',
                                    fontSize: '12px',
                                    marginLeft: '-1%',
                                    paddingLeft: '2%'
                                  }}
                                  onClick={() => getAsset(i.asset_name)}
                                >
                                  {/* {console.log(i.asset_name)}  */}
                                  Assets on {i.asset_name}
                                </span>
                                <span>
                                  <div
                                    style={{
                                      marginLeft: '-40%',
                                      color: 'white',
                                      fontSize: '15px'
                                    }}
                                  >
                                    ${Math.floor(i.total_asset_balance)}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '12px',
                                      marginTop: '-14%',
                                      marginLeft: '50%',
                                      color: 'white'
                                    }}
                                  >
                                    ({i.asset_percentage_value}%)
                                  </div>
                                </span>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                      {/* } */}
                    </Nav>
                  </span>
                </div>

                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <div className="assets-pilll-info-box">
                      <div className="asset-pills-wrap">
                        {/* className="asset-pills" */}
                        {/* variant="pills" */}
                        <span>
                          <Nav className="d-flex justify-content-evenly flex-wrap">
                            <Nav.Item>
                              {/* {keyValue=key} */}
                              <Nav.Link eventKey="first">
                                <div
                                  className="btn btn-gray btn-transaction"
                                  style={{
                                    backgroundColor: 'transparent',
                                    minWidth: '160px',
                                    minHeight: '55px',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    paddingTop: '-14%'
                                  }}
                                >
                                  <span>
                                    <Image
                                      src={wallateIcon}
                                      style={{
                                        height: '4vh',
                                        width: '15%',
                                        float: 'left'
                                      }}
                                    />
                                  </span>
                                  {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                  <span
                                    style={{
                                      color: 'white',
                                      fontSize: '12px',
                                      float: 'left',
                                      paddingLeft: '4%'
                                    }}
                                  >
                                    {/* {console.log(i.asset_name)}  */}
                                    Wallet
                                  </span>
                                  <span>
                                    {state1 === false
                                      ? (
                                          state === false
                                            ? (
                                                bal
                                                  ? (
                                                <div
                                                  style={{
                                                    marginLeft: '-25%',
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    float: 'left',
                                                    marginTop: '10%'
                                                  }}
                                                >
                                                  ${bal}
                                                </div>
                                                    )
                                                  : (
                                                <div
                                                  style={{
                                                    marginLeft: '-25%',
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    float: 'left',
                                                    marginTop: '10%'
                                                  }}
                                                >
                                                  $
                                                  {
                                                    total
                                                  }
                                                </div>
                                                    )
                                              )
                                            : (
                                            <div
                                              style={{
                                                marginLeft: '-25%',
                                                color: 'white',
                                                fontSize: '12px',
                                                float: 'left',
                                                marginTop: '10%'
                                              }}
                                            >
                                              ${uptBal}
                                            </div>
                                              )
                                        )
                                      : (
                                        <div
                                          style={{
                                            marginLeft: '-25%',
                                            color: 'white',
                                            fontSize: '12px',
                                            float: 'left',
                                            marginTop: '10%'
                                          }}
                                        >
                                          ${Math.floor(balanceWallet)}
                                        </div>
                                        )}
                                    {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                  </span>
                                </div>
                              </Nav.Link>
                            </Nav.Item>
                            {/* {state===false ? */}
                            {state1 === false
                              ? state === false
                                ? bal
                                  ? alertValueData
                                    ? result?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {console.log(result)}
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor:
                                                  'transparent',
                                                minWidth: '170px',
                                                minHeight: '55px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                              onClick={() =>
                                                handleClick(i, key)
                                              }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.protocolName)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  $
                                                  {Math.floor(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                    : result3?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor:
                                                  'transparent',
                                                minWidth: '170px',
                                                minHeight: '55px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.protocolName)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  $
                                                  {Math.ceil(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                  : alertValueData
                                    ? result.slice(0, 11)?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor: 'transparent',
                                                minWidth: '170px',
                                                minHeight: '55px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.asset_name)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  ${Math.floor(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                    : result?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor: 'transparent',
                                                minWidth: '170px',
                                                minHeight: '55px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.asset_name)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  ${Math.floor(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                : alertValueData
                                  ? result31.slice(0, 11)?.map((i, key) =>
                                    i.protocolName != 'null' ? (
                                      <Nav.Item>
                                        {/* {keyValue=key} */}
                                        <Nav.Link eventKey="first">
                                          <div
                                            className="btn btn-gray btn-transaction"
                                            style={{
                                              backgroundColor: 'transparent',
                                              minWidth: '170px',
                                              minHeight: '55px',
                                              alignItems: 'center',
                                              textAlign: 'center',
                                              paddingTop: '-14%'
                                            }}
                                          // onClick={() => handleClick(i, key)}
                                          >
                                            <span
                                              style={{
                                                height: '50%',
                                                marginRight: '1%',
                                                marginTop: '5%'
                                              }}
                                            >
                                              <Image
                                                src={i.protocolLogoUrl}
                                                style={{
                                                  height: '4vh',
                                                  width: '15%',
                                                  float: 'left'
                                                }}
                                              />
                                            </span>
                                            {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                            <span
                                              style={{
                                                color: 'white',
                                                fontSize: '12px',
                                                float: 'left',
                                                paddingLeft: '4%'
                                              }}
                                            // onClick={() =>
                                            //   getAsset(i.asset_name)
                                            // }
                                            >
                                              {/* {console.log(i.asset_name)}  */}
                                              {i.protocolName.slice(0, 11)}
                                              {/* <span > */}
                                              <div
                                                style={{
                                                  marginLeft: '10%',
                                                  float: 'left',
                                                  color: 'white',
                                                  fontSize: '12px'
                                                }}
                                              >
                                                ${Math.ceil(i.net_usd_value)}
                                              </div>
                                              {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                            </span>
                                          </div>
                                        </Nav.Link>
                                      </Nav.Item>
                                    ) : (
                                      <></>
                                    )
                                  )
                                  : result31?.map((i, key) =>
                                    i.protocolName != 'null' ? (
                                      <Nav.Item>
                                        {/* {keyValue=key} */}
                                        <Nav.Link eventKey="first">
                                          <div
                                            className="btn btn-gray btn-transaction"
                                            style={{
                                              backgroundColor: 'transparent',
                                              minWidth: '170px',
                                              minHeight: '55px',
                                              alignItems: 'center',
                                              textAlign: 'center',
                                              paddingTop: '-14%'
                                            }}
                                          // onClick={() => handleClick(i, key)}
                                          >
                                            <span
                                              style={{
                                                height: '50%',
                                                marginRight: '1%',
                                                marginTop: '5%'
                                              }}
                                            >
                                              <Image
                                                src={i.protocolLogoUrl}
                                                style={{
                                                  height: '4vh',
                                                  width: '15%',
                                                  float: 'left'
                                                }}
                                              />
                                            </span>
                                            {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                            <span
                                              style={{
                                                color: 'white',
                                                fontSize: '12px',
                                                float: 'left',
                                                paddingLeft: '4%'
                                              }}
                                            // onClick={() =>
                                            //   getAsset(i.asset_name)
                                            // }
                                            >
                                              {/* {console.log(i.asset_name)}  */}
                                              {i.protocolName.slice(0, 11)}
                                              {/* <span > */}
                                              <div
                                                style={{
                                                  marginLeft: '10%',
                                                  float: 'left',
                                                  color: 'white',
                                                  fontSize: '12px'
                                                }}
                                              >
                                                ${Math.ceil(i.net_usd_value)}
                                              </div>
                                              {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                            </span>
                                          </div>
                                        </Nav.Link>
                                      </Nav.Item>
                                    ) : (
                                      <></>
                                    )
                                  )
                              : alertValueData
                                ? Res3.slice(0, 11)?.map((i, key) =>
                                  i.protocolName != 'null' ? (
                                    <Nav.Item>
                                      {/* {keyValue=key} */}
                                      <Nav.Link eventKey="first">
                                        <div
                                          className="btn btn-gray btn-transaction"
                                          style={{
                                            backgroundColor: 'transparent',
                                            minWidth: '170px',
                                            minHeight: '55px',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            paddingTop: '-14%'
                                          }}
                                        // onClick={() => handleClick(i, key)}
                                        >
                                          <span
                                            style={{
                                              height: '50%',
                                              marginRight: '1%',
                                              marginTop: '5%'
                                            }}
                                          >
                                            <Image
                                              src={i.protocolLogoUrl}
                                              style={{
                                                height: '4vh',
                                                width: '15%',
                                                float: 'left'
                                              }}
                                            />
                                          </span>
                                          {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                          <span
                                            style={{
                                              color: 'white',
                                              fontSize: '12px',
                                              float: 'left',
                                              paddingLeft: '4%'
                                            }}
                                          // onClick={() =>
                                          //   getAsset(i.asset_name)
                                          // }
                                          >
                                            {/* {console.log(i.asset_name)}  */}
                                            {i.protocolName.slice(0, 11)}
                                            {/* <span > */}
                                            <div
                                              style={{
                                                marginLeft: '10%',
                                                float: 'left',
                                                color: 'white',
                                                fontSize: '12px'
                                              }}
                                            >
                                              ${Math.floor(i.net_usd_value)}
                                            </div>
                                            {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                          </span>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                  ) : (
                                    <></>
                                  )
                                )
                                : Res3?.map((i, key) =>
                                  i.protocolName != 'null' ? (
                                    <Nav.Item>
                                      {/* {keyValue=key} */}
                                      <Nav.Link eventKey="first">
                                        <div
                                          className="btn btn-gray btn-transaction"
                                          style={{
                                            backgroundColor: 'transparent',
                                            minWidth: '170px',
                                            minHeight: '55px',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            paddingTop: '-14%'
                                          }}
                                        // onClick={() => handleClick(i, key)}
                                        >
                                          <span
                                            style={{
                                              height: '50%',
                                              marginRight: '1%',
                                              marginTop: '5%'
                                            }}
                                          >
                                            <Image
                                              src={i.protocolLogoUrl}
                                              style={{
                                                height: '4vh',
                                                width: '15%',
                                                float: 'left'
                                              }}
                                            />
                                          </span>
                                          {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                          <span
                                            style={{
                                              color: 'white',
                                              fontSize: '12px',
                                              float: 'left',
                                              paddingLeft: '4%'
                                            }}
                                          // onClick={() =>
                                          //   getAsset(i.asset_name)
                                          // }
                                          >
                                            {/* {console.log(i.asset_name)}  */}
                                            {i.protocolName.slice(0, 11)}
                                            {/* <span > */}
                                            <div
                                              style={{
                                                marginLeft: '10%',
                                                float: 'left',
                                                color: 'white',
                                                fontSize: '12px'
                                              }}
                                            >
                                              ${Math.floor(i.net_usd_value)}
                                            </div>
                                            {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                          </span>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                  ) : (
                                    <></>
                                  )
                                )}
                          </Nav>
                        </span>
                      </div>
                      <h6
                        className="data"
                        onClick={handleClickDataShow}
                        style={{
                          color: 'grey',
                          cursor: 'pointer',
                          marginBottom: '6%',
                          marginLeft: '75%'
                        }}
                      >
                        {dataShow} <ArrowDropDownIcon />{' '}
                      </h6>
                      {/* <ul className="assets-pilll-box"> */}
                      {/* <li>
                          <span>
                            <Image src={wallateIcon} />
                          </span>
                          <div>
                            <h6>Wallets</h6>
                            <h4 style={{fontSize:"12px", marginRight:'-14px'}}>
                               $ {Math.ceil(balanceWallet)} <i></i>
                               {/* (50%) */}
                      {/* </h4>
                          </div>

                        </li >
                        </ul> */}
                      {/* <span>
                            <Image src={wallateIcon} />
                          </span> */}
                      {/* <div className="d-flex justify-content-between flex-wrap" >
                         {result3?.map(e=> (
                           e.protocolName!='null'?
                        <li style={{borderRadius:"20px",padding:"20px",maxWidth:"150px",height: "60px",alignItems:"center",display:"flex"
                        ,background: "hsl(218deg 9% 18% / 67%)",
                        boxShadow: "0 3px 6px hsl(0deg 0% 0% / 16%), -7px -4px 31px hsl(0deg 0% 100% / 12%), 7px 10px 18px rgb(0 0 0 / 56%)",cursor:"pointer"}}>

                        <div style={{margin:"2%"}}>
                            <h6 style={{color:"white"}}>{e.protocolName}</h6>
                              <h4 style={{fontSize:"12px", marginRight:'-14px',color:"white"}}>
                                ${Math.floor(e.net_usd_value)} <i></i>
                             </h4>
                          </div>

                        </li>
                        : <></>
                        ))}
                        </div> */}
                      {/* <li>
                          <span>
                            <Image src={investmentIcon} />
                          </span>
                          <div>
                            <h6>Investments</h6>
                            <h4 style={{fontSize:"15px"}}>
                              $11,232 <i>(26%)</i>
                            </h4>
                          </div>
                        </li> */}
                      {/* <li>
                          <span>
                            <Image src={exchangeIcon} />
                          </span>
                          <div>
                            <h6>Exchanges</h6>
                            <h4 style={{fontSize:"15px"}}>
                              $224,232 <i>(24%)</i>
                            </h4>
                          </div>
                        </li> */}
                      <div className="datatable m-0">
                        <div
                          className="assets-table-item"
                          style={{ marginBottom: '10%', paddingBottom: '3%' }}
                        >
                          <div className="table-heading-wrap">
                            <h5 style={{ fontSize: '22px' }}>
                              <span>
                                <Image src={wallateIcon} />
                              </span>
                              Wallet
                            </h5>
                            <span>
                              {state1 === false
                                ? (
                                    state === false
                                      ? (
                                          bal
                                            ? (
                                          <div
                                            style={{
                                              marginLeft: '-25%',
                                              color: 'white',
                                              fontSize: '20px',
                                              float: 'left',
                                              marginTop: '10%'
                                            }}
                                          >
                                            ${bal}
                                          </div>
                                              )
                                            : (
                                          <div
                                            style={{
                                              marginLeft: '-25%',
                                              color: 'white',
                                              fontSize: '20px',
                                              float: 'left',
                                              marginTop: '10%'
                                            }}
                                          >
                                            ${total}
                                          </div>
                                              )
                                        )
                                      : (
                                      <div
                                        style={{
                                          marginLeft: '-25%',
                                          color: 'white',
                                          fontSize: '20px',
                                          float: 'left',
                                          marginTop: '10%'
                                        }}
                                      >
                                        ${uptBal}
                                      </div>
                                        )
                                  )
                                : (
                                  <div
                                    style={{
                                      marginLeft: '-25%',
                                      color: 'white',
                                      fontSize: '20px',
                                      float: 'left',
                                      marginTop: '10%'
                                    }}
                                  >
                                    ${Math.floor(balanceWallet)}
                                  </div>
                                  )}
                              {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                            </span>

                            {/* <Link to="/PMS/dashboard/Assets/AddWallet" className="btn btn-gray" style={{paddingLeft:"2%",paddingRight:"2%",fontSize:"17px"}}>
                              + Add
                            </Link> */}
                          </div>
                          {/* <div className="transationdata"> */}
                          {state1 === false
                            ? (
                                bal
                                  ? (
                                  <CommonTable
                                    data={walletData1}
                                    columns={columns}
                                  />
                                    )
                                  : (
                                  <CommonTable
                                    data={walletData1}
                                    columns={columns}
                                  />
                                    )
                              )
                            : (
                              <CommonTable data={Fil} columns={columns} />
                              )}
                          {/* </div> */}
                        </div>
                        <div className="assets-table-item"
                          style={{ marginBottom: '10%', paddingBottom: '3%' }}
                        >
                          <div className="table-heading-wrap">
                            <h5 style={{ fontSize: '22px' }}>
                              <span>
                                <Image src={wallateIcon} />
                              </span>
                              Exchange
                            </h5>
                          </div>
                          <Nav className="d-flex justify-content-evenly flex-wrap" style={{ marginLeft: '5%' }}>
                            {state1 === false
                              ? state === false
                                ? bal
                                  ? alertValueData
                                    ? result?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {console.log(result)}
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor:
                                                  'transparent',
                                                minWidth: '170px',
                                                minHeight: '65px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.protocolName)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  $
                                                  {Math.ceil(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                              <span>
                                                <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                    : result3?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor:
                                                  'transparent',
                                                minWidth: '170px',
                                                minHeight: '65px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.protocolName)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  $
                                                  {Math.ceil(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                              <span>
                                                <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                  : alertValueData
                                    ? result.slice(0, 11)?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor: 'transparent',
                                                minWidth: '170px',
                                                minHeight: '65px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.asset_name)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  ${Math.ceil(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                              <span>
                                                <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                    : result?.map((i, key) =>
                                      i.protocolName != 'null' ? (
                                        <Nav.Item>
                                          {/* {keyValue=key} */}
                                          <Nav.Link eventKey="first">
                                            <div
                                              className="btn btn-gray btn-transaction"
                                              style={{
                                                backgroundColor: 'transparent',
                                                minWidth: '170px',
                                                minHeight: '65px',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                paddingTop: '-14%'
                                              }}
                                            // onClick={() =>
                                            //   handleClick(i, key)
                                            // }
                                            >
                                              <span
                                                style={{
                                                  height: '50%',
                                                  marginRight: '1%',
                                                  marginTop: '5%'
                                                }}
                                              >
                                                <Image
                                                  src={i.protocolLogoUrl}
                                                  style={{
                                                    height: '4vh',
                                                    width: '15%',
                                                    float: 'left'
                                                  }}
                                                />
                                              </span>
                                              {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                              <span
                                                style={{
                                                  color: 'white',
                                                  fontSize: '12px',
                                                  float: 'left',
                                                  paddingLeft: '4%'
                                                }}
                                              // onClick={() =>
                                              //   getAsset(i.asset_name)
                                              // }
                                              >
                                                {/* {console.log(i.asset_name)}  */}
                                                {i.protocolName.slice(0, 11)}
                                                {/* <span > */}
                                                <div
                                                  style={{
                                                    marginLeft: '10%',
                                                    float: 'left',
                                                    color: 'white',
                                                    fontSize: '12px'
                                                  }}
                                                >
                                                  ${Math.ceil(i.net_usd_value)}
                                                </div>
                                                {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                              </span>
                                              <span>
                                                <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                              </span>
                                            </div>
                                          </Nav.Link>
                                        </Nav.Item>
                                      ) : (
                                        <></>
                                      )
                                    )
                                : alertValueData
                                  ? result31.slice(0, 11)?.map((i, key) =>
                                    i.protocolName != 'null' ? (
                                      <Nav.Item>
                                        {/* {keyValue=key} */}
                                        <Nav.Link eventKey="first">
                                          <div
                                            className="btn btn-gray btn-transaction"
                                            style={{
                                              backgroundColor: 'transparent',
                                              minWidth: '170px',
                                              minHeight: '65px',
                                              alignItems: 'center',
                                              textAlign: 'center',
                                              paddingTop: '-14%'
                                            }}
                                          // onClick={() => handleClick(i, key)}
                                          >
                                            <span
                                              style={{
                                                height: '50%',
                                                marginRight: '1%',
                                                marginTop: '5%'
                                              }}
                                            >
                                              <Image
                                                src={i.protocolLogoUrl}
                                                style={{
                                                  height: '4vh',
                                                  width: '15%',
                                                  float: 'left'
                                                }}
                                              />
                                            </span>
                                            {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                            <span
                                              style={{
                                                color: 'white',
                                                fontSize: '12px',
                                                float: 'left',
                                                paddingLeft: '4%'
                                              }}
                                            // onClick={() =>
                                            //   getAsset(i.asset_name)
                                            // }
                                            >
                                              {/* {console.log(i.asset_name)}  */}
                                              {i.protocolName.slice(0, 11)}
                                              {/* <span > */}
                                              <div
                                                style={{
                                                  marginLeft: '10%',
                                                  float: 'left',
                                                  color: 'white',
                                                  fontSize: '12px'
                                                }}
                                              >
                                                ${Math.ceil(i.net_usd_value)}
                                              </div>
                                              {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                            </span>
                                            <span>
                                              <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                            </span>
                                          </div>
                                        </Nav.Link>
                                      </Nav.Item>
                                    ) : (
                                      <></>
                                    )
                                  )
                                  : result31?.map((i, key) =>
                                    i.protocolName != 'null' ? (
                                      <Nav.Item>
                                        {/* {keyValue=key} */}
                                        <Nav.Link eventKey="first">
                                          <div
                                            className="btn btn-gray btn-transaction"
                                            style={{
                                              backgroundColor: 'transparent',
                                              minWidth: '170px',
                                              minHeight: '65px',
                                              alignItems: 'center',
                                              textAlign: 'center',
                                              paddingTop: '-14%'
                                            }}
                                          // onClick={() => handleClick(i, key)}
                                          >
                                            <span
                                              style={{
                                                height: '50%',
                                                marginRight: '1%',
                                                marginTop: '5%'
                                              }}
                                            >
                                              <Image
                                                src={i.protocolLogoUrl}
                                                style={{
                                                  height: '4vh',
                                                  width: '15%',
                                                  float: 'left'
                                                }}
                                              />
                                            </span>
                                            {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                            <span
                                              style={{
                                                color: 'white',
                                                fontSize: '12px',
                                                float: 'left',
                                                paddingLeft: '4%'
                                              }}
                                            // onClick={() =>
                                            //   getAsset(i.asset_name)
                                            // }
                                            >
                                              {/* {console.log(i.asset_name)}  */}
                                              {i.protocolName.slice(0, 11)}
                                              {/* <span > */}
                                              <div
                                                style={{
                                                  marginLeft: '10%',
                                                  float: 'left',
                                                  color: 'white',
                                                  fontSize: '12px'
                                                }}
                                              >
                                                ${Math.ceil(i.net_usd_value)}
                                              </div>
                                              {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                            </span>
                                            <span>
                                              <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                            </span>
                                          </div>
                                        </Nav.Link>
                                      </Nav.Item>
                                    ) : (
                                      <></>
                                    )
                                  )
                              : alertValueData
                                ? Res3.slice(0, 11)?.map((i, key) =>
                                  i.protocolName != 'null' ? (
                                    <Nav.Item>
                                      {/* {keyValue=key} */}
                                      <Nav.Link eventKey="first">
                                        <div
                                          className="btn btn-gray btn-transaction"
                                          style={{
                                            backgroundColor: 'transparent',
                                            minWidth: '170px',
                                            minHeight: '65px',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            paddingTop: '-14%'
                                          }}
                                        // onClick={() => handleClick(i, key)}
                                        >
                                          <span
                                            style={{
                                              height: '50%',
                                              marginRight: '1%',
                                              marginTop: '5%'
                                            }}
                                          >
                                            <Image
                                              src={i.protocolLogoUrl}
                                              style={{
                                                height: '4vh',
                                                width: '15%',
                                                float: 'left'
                                              }}
                                            />
                                          </span>
                                          {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                          <span
                                            style={{
                                              color: 'white',
                                              fontSize: '12px',
                                              float: 'left',
                                              paddingLeft: '4%'
                                            }}
                                          // onClick={() =>
                                          //   getAsset(i.asset_name)
                                          // }
                                          >
                                            {/* {console.log(i.asset_name)}  */}
                                            {i.protocolName.slice(0, 11)}
                                            {/* <span > */}
                                            <div
                                              style={{
                                                marginLeft: '10%',
                                                float: 'left',
                                                color: 'white',
                                                fontSize: '12px'
                                              }}
                                            >
                                              ${Math.ceil(i.net_usd_value)}
                                            </div>
                                            {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                          </span>
                                          <span>
                                            <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                          </span>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                  ) : (
                                    <></>
                                  )
                                )
                                : Res3?.map((i, key) =>
                                  i.protocolName != 'null' ? (
                                    <Nav.Item>
                                      {/* {keyValue=key} */}
                                      <Nav.Link eventKey="first">
                                        <div
                                          className="btn btn-gray btn-transaction"
                                          style={{
                                            backgroundColor: 'transparent',
                                            minWidth: '170px',
                                            minHeight: '65px',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            paddingTop: '-14%'
                                          }}
                                        // onClick={() => handleClick(i, key)}
                                        >
                                          <span
                                            style={{
                                              height: '50%',
                                              marginRight: '1%',
                                              marginTop: '5%'
                                            }}
                                          >
                                            <Image
                                              src={i.protocolLogoUrl}
                                              style={{
                                                height: '4vh',
                                                width: '15%',
                                                float: 'left'
                                              }}
                                            />
                                          </span>
                                          {/* <div style={{ color: "white", marginLeft:"20%"}}> */}
                                          <span
                                            style={{
                                              color: 'white',
                                              fontSize: '12px',
                                              float: 'left',
                                              paddingLeft: '4%'
                                            }}
                                          // onClick={() =>
                                          //   getAsset(i.asset_name)
                                          // }
                                          >
                                            {/* {console.log(i.asset_name)}  */}
                                            {i.protocolName.slice(0, 11)}
                                            {/* <span > */}
                                            <div
                                              style={{
                                                marginLeft: '10%',
                                                float: 'left',
                                                color: 'white',
                                                fontSize: '12px'
                                              }}
                                            >
                                              ${Math.ceil(i.net_usd_value)}
                                            </div>
                                            {/* <div style={{fontSize:'13px',marginTop:'-14%', marginLeft:'50%', color:'white'}} >({i.asset_percentage_value}%)</div> */}
                                          </span>
                                          <span>
                                            <a href={i.protocolsiteUrl} style={{ color: 'blueviolet', fontSize: '10px', marginTop: '80%', marginLeft: '50%' }}>{i.protocolName}</a>
                                          </span>
                                        </div>
                                      </Nav.Link>
                                    </Nav.Item>
                                  ) : (
                                    <></>
                                  )
                                )}

                          </Nav>
                        </div>
                        <h6
                          className="data"
                          onClick={handleClickDataShow}
                          style={{
                            color: 'grey',
                            cursor: 'pointer',
                            marginBottom: '6%',
                            marginLeft: '75%'
                          }}
                        >
                          {dataShow} <ArrowDropDownIcon />{' '}
                        </h6>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">123</Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Assets
