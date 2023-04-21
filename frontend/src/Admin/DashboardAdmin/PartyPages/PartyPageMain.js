import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Form } from 'react-bootstrap'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import '../../../common/Modal.css'
// import CommonTable from "../common/CommonTable/CommonTable";
import Header from '../../../common/Header/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarAdmin from '../SidebarAdmin'
import SidebarIconsAdmin from '../SidebarIconsAdmin'
import { Alert, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Button from 'react-bootstrap/Button'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FormControl from '@mui/material/FormControl'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import cx from 'classnames'
import '../DashboardAdmin.css'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
//  import SearchBar from "material-ui-search-bar";
import InputLabel from '@mui/material/InputLabel'
import check from '../../../assets/images/check.png'
function PartyPageMain () {
  const location = useLocation()
  const getId = localStorage.getItem('sub_Id')
  const idData = location.pathname.slice(32, 80)
  const partyIdData = location.pathname.slice(45, 80)
  console.log(idData)
  console.log(partyIdData)
  console.log(idData)
  const portfolioName = location.pathname.slice(70)
  const newName = portfolioName.replace('%', ' ')
  console.log(portfolioName)
  console.log(newName)
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const navigate = useNavigate()

  const [dataId, setDataId] = useState('')
  const [dataRow, setDataRow] = useState([])
  const [selectData, setSelectData] = useState('Organizations')
  const [show, setShow] = useState(false)
  const [sea, setSea] = useState('')
  const [showName, setShowName] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  // { `/PMS/Admin/SinglePortfolioPage/:${row.portfolio_id}`}
  console.log(idData)
  const [showDashboard, setShowDashboard] = useState(true)
  const [optionSelected, setOptionSelected] = useState(null)
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
  const [result3, setResult3] = useState([])
  const [resultUpdatedData, setResultUpdatedData] = useState([])
  const [party, setparty] = useState('')
  const [port, setport] = useState('')
  const [per, setper] = useState('')
  const [search, setSearch] = useState([])
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('0%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('100%')
  const [m, setm] = useState('4%')
  const [mar1, setmar1] = useState('-7%')
  const [mar, setmar] = useState('-10%')
  const handleClose = () => setShow(false)
  const [showInvestment, setShowInvestment] = useState(false)
  const [ownershipData, setOwnershipData] = useState(false)
  const [showExchanges, setShowExchanges] = useState(false)
  const [showWallets, setShowWallets] = useState(false)
  const handleCloseInvestment = () => setShowInvestment(false)
  const handleCloseExchanges = () => setShowExchanges(false)
  const handleCloseWallets = () => setShowWallets(false)
  const handleCloseDelete = () => setShowDelete(false)
  const [Port, setPort] = useState([])
  const [editData, setEditData] = useState([])
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [type, setType] = useState('')
  const [alertWallet, setAlertWallet] = useState(false)
  const handleCloseWallet2 = () => {
    setAlertWallet(false)
  }
  const handleChange4 = (event) => {
    console.log(event.target.value)
  }
  const handleChange5 = (event) => {
    setA(event.target.value)

    if (event.target.value === 'wallet') {
      // console.log('w')
      navigate(`/PMS/MainManageAssetsWallets/:${idData}`)
    } else if (event.target.value === 'exchange') {
      //  console.log('ex')
      navigate(`/PMS/ViewExchanges/:${idData}`)
    } else if (event.target.value === 'investment') {
      // console.log('in')
      navigate(`/PMS/Investments/:${idData}`)
    }
  }
  const handleChange2 = (event) => {
    console.log(event.target.value)
    setType(event.target.value)
    if (event.target.value === 'wallet') {
      // console.log('w')
      navigate(`/PMS/MainManageAssetsWallets/:${idData}`)
    } else if (event.target.value === 'exchange') {
      //  console.log('ex')
      navigate(`/PMS/ViewExchanges/:${idData}`)
    } else if (event.target.value === 'investment') {
      // console.log('in')
      navigate(`/PMS/Investments/:${idData}`)
    }
    // setA(event.target.value);
  }
  const handleChange3 = (event) => {
    console.log(event.target.value)
    setB(event.target.value)
    if (event.target.value == 'investment1') {
      handleShowInvestment()
    } else if (event.target.value == 'wallet1') {
      handleShowWallets()
    } else if (event.target.value == 'exchange1') {
      handleShowExchanges()
    }
  }
  // const wallet=[
  //   {label:'Wallet',value:'wallet'},
  //   {label:'Exchange',value:'exchange'},
  //   {label:'Investment',value:'investment'},
  // ]
  const handleShow = (row) => {
    console.log(row?.party_id)
    setport(row?.portfolio_id)
    setparty(row?.party_id)
    setEditData(row)
    setShow(true)
    setOwnershipData(true)
  }
  console.log(editData)
  const handleShowInvestment = () => {
    console.log('Clicked Investment')
    setShowInvestment(true)
  }
  const handleShowExchanges = () => {
    console.log('Clicked Investment')
    setShowExchanges(true)
  }
  const handleShowWallets = () => {
    console.log('Clicked Investment')
    setShowWallets(true)
  }
  const handleShowDelete = () => {
    setShowName(true)
  }

  console.log(party)
  console.log(idData)
  const [credentialsInfo, setCredentialsInfo] = useState({
    // exchange_id: "",
    // email: "",
  })
  console.log(getId)
  const [credentialsInfoInvest, setCredentialsInfoInvest] = useState({
    // exchange_id: "",
    // email: "",
    // password: "",
    portfolio_id: idData,
    userId: getId
  })
  const [credentialsInfoExchange, setCredentialsInfoExchange] = useState({
    // exchange_id: "",
    // email: "",
    // password: "",
    portfolio_id: idData,
    userId: getId
  })
  const [credentialsInfoWallet, setCredentialsInfoWallet] = useState({
    // exchange_id: "",
    // email: "",
    // password: "",
    portfolio_id: idData
  })
  const submitWallet = () => {
    console.log('Submitted')
    setAlertWallet(true)
    setTimeout(() => setAlertWallet(false), 3000)
    navigate(`/PMS/MainManageAssetsWallets/:${idData}`)
  }
  const handleAddInvestment = async () => {
    console.log(credentialsInfoInvest)
    console.log('Investment Added')
    const config = {
      method: 'post',
      url: '${process.env.REACT_APP_BASE_URL}/add_investment',
      headers: {
        'Content-Type': 'application/json'
      },
      data: credentialsInfoInvest
    }
    await axios(config)
      .then(function (response) {
        console.log('clicked')
        console.log(response)
        navigate(`PMS/Investment/:${idData}`)
        // setAlert(true)
        // setTimeout(()=>{ navigate('/PMS/Admin/Party')},1500)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleAddWallet = async () => {
    console.log(credentialsInfoWallet)
    console.log('Investment Added')
    const config = {
      method: 'post',
      url: '${process.env.REACT_APP_BASE_URL}/create_wallet',
      headers: {
        'Content-Type': 'application/json'
      },
      data: credentialsInfoWallet
    }
    await axios(config)
      .then(function (response) {
        console.log('clicked')
        console.log(response)
        // setAlert(true);
        // console.log(alert);
        // setTimeout(setAlert(false),3000)
        // console.log(alert);
        submitWallet()
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleAddExchange = () => {
    console.log('Exchange')
  }
  const handleInputChange = (event) => {
    setOwnershipData(true)
    const { name, value } = event.target.value
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
    console.log(credentialsInfo)
    // const { name, value } = event.target;
    // setCredentialsInfo({ ...credentialsInfo, [name]: value });
  }
  const handleInputChangeExchanges = (event) => {
    const { name, value } = event.target
    setCredentialsInfoExchange({ ...credentialsInfoExchange, [name]: value })
    console.log(credentialsInfoExchange)
    // const { name, value } = event.target;
    // setCredentialsInfo({ ...credentialsInfo, [name]: value });
  }
  const handleInputChangeInvest = (event) => {
    const { name, value } = event.target
    setCredentialsInfoInvest({ ...credentialsInfoInvest, [name]: value })
    console.log(credentialsInfoInvest)
    // const { name, value } = event.target;
    // setCredentialsInfo({ ...credentialsInfo, [name]: value });
  }
  const handleInputChangeWallets = (event) => {
    const { name, value } = event.target
    setCredentialsInfoWallet({ ...credentialsInfoWallet, [name]: value })
    console.log(credentialsInfoWallet)
    // const { name, value } = event.target;
    // setCredentialsInfo({ ...credentialsInfo, [name]: value });
  }
  const [personData, setPersonData] = useState()
  const [organizationData, setOrganizationData] = useState([])
  const [portfolioData, setPortfolioData] = useState([])
  const [dataDeleteId, setDataDeleteId] = useState('')
  console.log(editData)
  console.log(editData.ownership_percent)
  const columns = [
    // {
    // dataField: 'party_id',
    // text: "Party ID",
    // sort: true,
    // formatter: (cell, row, rowIndex, formatExtraData) => {

    // return (
    // <>
    // <Tooltip title={row.party_id}>
    // <IconButton
    // style={{ color: "white", fontSize: "15px", marginTop: "-7%",marginLeft:"2%" }}
    // >
    // {row.party_id.slice(0,6)}
    // </IconButton>
    // </Tooltip>
    // </>
    // );
    // },
    // },
    // {
    // dataField: "",
    // text: "Portfolio ID",
    // sort: true,
    // formatter: (cell, row, rowIndex, formatExtraData) => {
    // console.log()
    // return (
    // <>
    // <Tooltip title={idData}>
    // <IconButton
    // style={{ color: "white", fontSize: "15px", marginTop: "-7%",marginLeft:"2%" }}
    // >
    // {idData.slice(0,6)}
    // </IconButton>
    // </Tooltip>
    // </>
    // );
    // },
    // },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return <p style={{ cursor: 'pointer' }}>{row.name}</p>
      }
    },
    {
      dataField: 'ownership_percentage',
      text: 'Ownership %',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ cursor: 'pointer', color: 'white' }}>
            {ownershipData === false
              ? (
                <p>{row.ownership_percentage}</p>
                )
              : (
                <p>{editData.ownership_percent}</p>
                )}
          </p>
        )
      }
    },

    {
      dataField: '',
      text: 'Manage',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div>
            {/* <p
 className="name-assets"
 style={{
 display: "flex",
 flexDirection: "row",
 cursor: "pointer",
 color: "white"
 }}

 >
 {console.log(row)}
 Edit
 </p> */}
            <span onClick={() => handleEdit(row)}>
              <EditOutlinedIcon />
            </span>
            <span
              style={{ color: 'red', cursor: 'pointer' }}
              onClick={() => handleEditDelete(row)}
            >
              <DeleteOutlineOutlinedIcon />
            </span>
            {/* <p
 className="name-assets"
 style={{
 display: "flex",
 flexDirection: "row",
 cursor: "pointer",
 color: "red",
 marginTop:'-8%',
 marginLeft:'13%',
 boxShadow:'none',
 marginTop:'11%'

 }}
 >
 {console.log(row)}
 Delete
 </p> */}
          </div>
        )
      }
    },
    {
      dataField: '',
      text: 'View Details',
      formatter: (cell, row) => {
        console.log(row.party_id)
        console.log(row.portfolio_id)
        return (
          <Link to={`/PMS/PartyMainPage/:${row.party_id}/:${row.portfolio_id}`} className="status">
            <Image src={check} alt="" />
          </Link>
        )
      }
    }
  ]
  const loadOrganizationData = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllPerson', {
        params: { userId: getId }
      })
      .then((response) => {
        // console.log(result3)
        setResult(response.data)
      })

    console.log(result)
    // setResult(response.data);
    // setWalletData(response.data.wallet_asset);
  }
  const getAllPortFolio = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/getAllOrganisation', {
        params: { userId: getId }
      })
      .then((response) => {
        // console.log(result3)

        setResult2(response.data)
        // setResult(response.data);
        // setWalletData(response.data.wallet_asset);
      })
  }
  const totalOrgandPersons = [...result, ...result2]
  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('110%')
      setm('-8%')
      setmar('-30%')
      setmar1('-30%')
      setMargin('8%')
      setWidthData('0%')
      console.log(showDashboard)
      console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('4%')
      setmar('-10%')
      setmar1('-17%')
      setW('100%')
      setMargin('22%')
      setWidthData('10%')
      console.log(showDashboard)
      console.log(newWidth)
    }
  }
  const getPrtyPortfolioOfaPortfolio = async () => {
    console.log('Data')
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/getPrtyPortfolioOfaPortfolio',
      params: {
        portfolio_id: idData
      }
    }
    axios(config).then(function (response) {
      console.log(response.data)
      setResult3(response.data)
    })
  }
  const rar = []
  result3?.forEach((elm) => {
    const r = totalOrgandPersons?.filter((i) => i.party_id == elm.party_id)
    console.log(r)
    rar.push({
      party_id: elm.party_id,
      portfolio_id: elm.portfolio_id,
      name: r?.[0]?.name,
      ownership_percentage: elm.ownership_percentage
    })
  })
  console.log(rar)
  // result3?.forEach(elm=>{
  // var r = result2?.filter(i=>i.party_id==elm.party_id)
  // console.log(r)
  // rar.push({'party_id':elm.party_id,'portfolio_id':elm.portfolio_id ,'name':r?.[0]?.name, 'ownership_percentage':elm.ownership_percentage})
  // })
  // console.log(result3)
  useEffect(() => {
    getPrtyPortfolioOfaPortfolio()
    loadOrganizationData()
    getAllPortFolio()
    portfolio()
  }, [])
  const handleEdit = (row) => {
    handleShow(row)
    console.log(row)
  }
  const handleEditDelete = (row) => {
    setShowDelete(true)
    console.log(row.party_id)
    setDataDeleteId(row.party_id)
  }
  const handleDelete = async () => {
    console.log(dataDeleteId)
    const config = {
      method: 'delete',
      url: '${process.env.REACT_APP_BASE_URL}/deleteUserFromPortfolio',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        party_id: dataDeleteId,
        portfolio_id: idData
      }
    }
    console.log(config)
    await axios(config)
      .then(function (response) {
        console.log(response)
        // navigate('/PMS/SuccessMessage')
      })
      .catch(function (error) {
        console.log(error)
      })
    await getPrtyPortfolioOfaPortfolio()
  }

  console.log(result)
  const NameData1 = []
  const Partyid = []
  for (let i = 0; i < result.length; i++) {
    NameData1.push(result[i]?.name)
    Partyid.push(result[i]?.party_id)
  }
  console.log(NameData1)
  console.log(Partyid)
  console.log(result)
  console.log(result2)
  console.log(result3)
  for (let i = 0; i < result3.length; i++) {
    resultUpdatedData.push(result3[i]?.party_id)
  }
  const handleChange = (selected) => {
    setOptionSelected(selected)
  }
  const handleChangeData = (event) => {
    console.log(event.target.value)
    if (event.target.value == 'Add Investments') {
      handleShowInvestment()
    } else if (event.target.value == 'Add Wallets') {
      handleShowWallets()
    } else if (event.target.value == 'Add Exchanges') {
      handleShowExchanges()
    }
  }
  const handleOrganization = (event) => {
    console.log(event.target.value)
    setPersonData(event.target.value)
  }
  const handlePerson = (event) => {
    console.log(event.target.value)
    setPersonData(event.target.value)
  }
  const handleClick1 = async (k) => {
    console.log(k)
    const brr = []
    console.log(result2)
    console.log('s')
    console.log(rar)
    for (let i = 0; i < rar.length; i++) {
      brr.push({
        party_id: rar[i].party_id,
        ownership_percentage: rar[i].ownership_percentage
      })
    }
    console.log(brr)
    //  var k = personData;
    console.log(k)
    const pe = result2?.filter((i) => i.name == k)
    console.log(pe)
    console.log(pe?.[0]?.party_id)
    brr.push({ party_id: pe?.[0]?.party_id, ownership_percentage: '0' })
    console.log(brr)
    const config = {
      method: 'post',
      url: '${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        party_detail: brr,
        portfolio_id: idData,
        user_id: getId
      }
    }
    await axios(config)
      .then(function (response) {
        console.log('clicked')
        console.log(response)
        setAlert(true)
        // setTimeout(),1000);

        // setAlert(true)
        // setTimeout(()=>{ navigate('/PMS/Admin/Party')},1500)
      })
      .catch(function (error) {
        console.log(error)
      })
    getPrtyPortfolioOfaPortfolio()
    // portfolioData.push(pe)
    // setPortfolioData(portfolioData)
  }
  const handleClick2 = async (k) => {
    console.log(k)
    const brr = []
    console.log(result)
    console.log('s')
    console.log(rar)
    for (let i = 0; i < rar.length; i++) {
      brr.push({ party_id: rar[i].party_id, ownership_percentage: rar[i].ownership_percentage })
    }
    console.log(brr)
    //  var k = personData;
    console.log(k)
    const pe = result?.filter((i) => i.name == k)
    console.log(pe)
    console.log(pe?.[0]?.party_id)
    brr.push({ party_id: pe?.[0]?.party_id, ownership_percentage: '0' })
    console.log(brr)
    const config = {
      method: 'post',
      url: '${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        party_detail: brr,
        portfolio_id: idData,
        user_id: getId
      }
    }
    await axios(config)
      .then(function (response) {
        console.log('clicked')
        console.log(response)
        setAlert(true)
        // setTimeout(),1000);

        // setAlert(true)
        // setTimeout(()=>{ navigate('/PMS/Admin/Party')},1500)
      })
      .catch(function (error) {
        console.log(error)
      })
    getPrtyPortfolioOfaPortfolio()
    // portfolioData.push(pe)
    // setPortfolioData(portfolioData)
  }
  const portfolio = async () => {
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/getAllPortfolio'
    }
    axios(config).then(function (response) {
      console.log(response.data)
      setPort(response.data)
    })
  }
  console.log(idData)
  const pf = Port?.filter(i => i.portfolio_id == idData)
  console.log(pf)

  // const handleClick =async()=>{
  // console.log('s')
  // var p = personData.split(" : ")
  // console.log(p[0])
  // var pe = totalOrgandPersons?.filter(i=>i.name==p[0])
  // console.log(pe?.[0].party_id)

  // var config = {
  // method : 'post',
  // url: '${process.env.REACT_APP_BASE_URL}/admin/createPartyPortfolio',
  // headers: {
  // 'Content-Type':'application/json'
  // },
  // data: {
  // party_id : pe?.[0].party_id,
  // portfolio_id : idData,
  // ownership_percent: '100',
  // user_id: getId
  // }
  // }
  // await axios(config).then(function (response){
  // console.log("clicked");
  // console.log(response)

  // // setAlert(true)
  // // setTimeout(()=>{ navigate('/PMS/Admin/Party')},1500)
  // }).catch( function(error){
  // console.log(error)
  // })
  // // portfolioData.push(pe)
  // // setPortfolioData(portfolioData)
  // }
  console.log(portfolioData)
  // portfolioData.push(organizationData);
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      console.log(per, party, port, getId)
      const config = {
        method: 'post',
        url: '${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          party_detail: [
            {
              party_id: party,
              ownership_percent: per
            }
          ]
        }
      }
      await axios(config)
        .then(function (response) {
          console.log(response)
          console.log('clicked')
          setTimeout(() => {
            setShow(false)
            // navigate("/PMS/Admin/Party");
          }, 1500)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    setValidated(true)

    // axios.post('http://192.168.86.179:8180/debank_add_investment',
    // {
    // headers:
    // {
    // 'Content-Type':'application/json'
    // },
    // data: credentialsInfo,
    // })
    // // console.log(data)
    // .then(response => console.log(response));
  }
  const me = []
  result?.forEach((el) => {
    console.log(el.party_id)
    const m = result3?.filter((i) => i.party_id != el.party_id)
    console.log(m)
    me.push({ party_id: el?.name })
  })

  console.log(me)
  const handleSelect = (event) => {
    console.log(event.target.value)
    setSelectData(event.target.value)
  }
  return (
    <div>
      {showDashboard === true ? <SidebarAdmin /> : <SidebarIconsAdmin />}
      <div className="mainmyassets">
        <Row>

          <Col lg={newWidth}>
            <Header />
            {showDashboard === true
              ? (
                <KeyboardDoubleArrowLeftIcon
                  sx={{ fontSize: 30 }}
                  onClick={handleToggle}
                  style={{ color: 'white', marginLeft: '-2%', marginTop: '1%' }}
                />
                )
              : (
                <KeyboardDoubleArrowRightIcon
                  sx={{ fontSize: 30 }}
                  onClick={handleToggle}
                  style={{
                    color: 'white',
                    marginLeft: '-12.5%',
                    marginTop: '-1.2%'
                  }}
                />
                )}
            <div className="d-flex flex-direction-column justify-content-around" style={{ hieght: '700px', width: '30%', backgroundColor: 'white', color: 'black', marginLeft: '4%', paddingTop: '5%', paddingBottom: '16%', alignItems: 'center', textAlign: 'center', borderTopRightRadius: '15px', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
              <h4>Sidebar</h4>
              <ul style={{ marginTop: '3%', paddingTop: '3%' }}>
                <li>Option A</li>
                <li>Option B</li>
                <li>Option C</li>
              </ul>
            </div>
            {/* <hr
              style={{
                backgroundColor: "darkgrey",
                width: w,
                marginLeft: m,
                marginTop: "-1%",
              }}
            />  */}
            {/* <div className="maindashinfo" style={{marginRight:"3%",marginLeft:"3%"}}>
 <div
 className="assets-table-item"
 style={{
 marginLeft: widthData,
 marginRight: "6%",
 marginTop: "4%",
 paddingBottom: "3%",
 }}
 > */}
            {/* <div className="table-heading-wrap">
 <h5 style={{ fontSize: "22px" }}>
 <span>
 <Image src={investmentIcon} />
 </span>
 Single Portfolio Page
 </h5>
 </div> */}

            <Modal
              show={showInvestment}
              onHide={handleCloseInvestment}
              style={{ width: '40%', marginLeft: '30%' }}
            >
              <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
                {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
                <IconButton
                  style={{ position: 'absolute', top: '0', right: '0' }}
                  onClick={() => setShowInvestment(false)}
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
                >
                  <h2 style={{ marginTop: '-3', color: 'white', marginLeft: '15%', marginBottom: '2%' }}>Party Investments</h2>
                  <h4 >Add Investments</h4>
                  <Form.Label
                    htmlFor="name"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfoInvest.invest_name
                    })}
                    style={{ marginTop: '-8%', width: '50%', marginLeft: '25%' }}
                  >
                    Name
                    <Form.Control
                      type="text"
                      id="name"
                      name="invest_name"
                      onChange={handleInputChangeInvest}
                      required
                      style={{ border: '1px solid white', color: 'white' }}
                      placeholder="Enter Name"
                    />
                    <Form.Control.Feedback type="invalid">
                      Name Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="type"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfoInvest.invest_type
                    })}
                    style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-8%' }}
                  >
                    {' '}
                    Investment
                    <Form.Control
                      type="text"
                      id="type"
                      name="invest_type"
                      onChange={handleInputChangeInvest}
                      required
                      placeholder="Enter Investment"
                      style={{ border: '1px solid white', color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Type Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="investment"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfoInvest.date_of_invest
                    })}
                    style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-8%' }}
                  >
                    {' '}
                    Date
                    <Form.Control
                      type="date"
                      id="investment"
                      name="date_of_invest"
                      onChange={handleInputChangeInvest}
                      required
                      style={{
                        border: '1px solid white',
                        // colorScheme: "dark",
                        color: 'white'
                      }}
                    // style={{backgroundColor:'white'}}
                    />
                    <Form.Control.Feedback type="invalid">
                      Date Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="value"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfoInvest.invest_value
                    })}
                    style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-8%' }}
                  >
                    {' '}
                    Investment Value
                    <Form.Control
                      type="text"
                      id="value"
                      name="invest_value"
                      onChange={handleInputChangeInvest}
                      required
                      placeholder="Enter Investment Value"
                      style={{ border: '1px solid white', color: 'white' }}
                    />
                    {/* <span style={{backgroundColor:"transparent",color:"black"}}>Enter Value</span> */}
                    <Form.Control.Feedback type="invalid">
                      Value Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn btn-gray"
                    onClick={handleAddInvestment}
                    style={{ width: '50%', marginLeft: '25%', marginTop: '-6%', boxShadow: 'none' }}
                  >
                    Save
                  </Button>
                </Form>

              </Modal.Body>
            </Modal>
            <Modal
              show={showWallets}
              onHide={handleCloseWallets}
              style={{ width: '40%', marginLeft: '30%' }}
            >
              <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
                {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
                <IconButton
                  style={{ position: 'absolute', top: '0', right: '0' }}
                  onClick={() => setShowWallets(false)}
                >
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
                  <h2 style={{ marginTop: '-3', color: 'white', marginLeft: '15%', marginBottom: '2%' }}>Party Wallets</h2>
                  <h4 style={{ marginTop: '-3', color: 'white', marginLeft: '2%', marginBottom: '4%' }}>Add Wallet</h4>
                  <Form.Label
                    htmlFor="name"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.walletName
                    })}
                    style={{ marginTop: '-8%', width: '50%', marginLeft: '25%' }}
                  >
                    Wallet Name
                    <Form.Control
                      type="text"
                      id="name"
                      name="walletName"
                      onChange={handleInputChangeWallets}
                      required
                      placeHolder="Wallet Name"
                      style={{ border: '1px solid white', color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Wallet Name Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="key"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.wallet_purpose
                    })}
                    style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-8%' }}
                  >
                    Wallet Purpose
                    <Form.Control
                      type="text"
                      id="key"
                      name="wallet_purpose"
                      onChange={handleInputChangeWallets}
                      required
                      placeHolder="Wallet Purpose"
                      style={{ border: '1px solid white', color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      purpose Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{ width: '50%', marginLeft: '25%', marginTop: '-6%', boxShadow: 'none' }}
                    onClick={handleAddWallet}
                  >
                    Save
                  </Button>
                  {alertWallet ? (
                    <Snackbar
                      open={alertWallet}
                      // autoHideDuration={4000}
                      onClose={handleCloseWallet2}
                      sx={{ marginLeft: '50%', marginBottom: '35%', width: '25%' }}
                    >
                      <Alert
                        onClose={handleCloseWallet2}
                        severity="success"
                        sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
                      >
                        Added wallet successfully
                      </Alert>
                    </Snackbar>
                  )
                    : <></>
                  }
                </Form>

              </Modal.Body>
            </Modal>
            <Modal
              show={showExchanges}
              onHide={handleCloseExchanges}
              style={{ width: '40%', marginLeft: '30%' }}
            >
              <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
                {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
                <IconButton
                  style={{ position: 'absolute', top: '0', right: '0' }}
                  onClick={() => setShowExchanges(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: '#222429' }}>
                <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitForm}>
                  <h2 style={{ marginTop: '-3', color: 'white', marginLeft: '15%', marginBottom: '2%' }}>Party Exchanges</h2>
                  <h4 style={{ marginTop: '-3', color: 'white', marginLeft: '2%', marginBottom: '4%' }}>Add Exchanges</h4>
                  <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': credentialsInfoExchange.walletName })}
                    style={{ marginTop: '-8%', width: '50%', marginLeft: '25%' }}
                  >
                    exchange Name
                    <Form.Control
                      type="text"
                      id="name"
                      name="walletName"
                      onChange={handleInputChangeExchanges}
                      required
                      placeHolder="Exchange Name"
                      style={{ border: '1px solid white', color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Exchange Name Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label htmlFor="key" className={cx('custom-form-box', { 'focus-add': credentialsInfoExchange.wallet_purpose })}
                    style={{ width: '50%', marginBottom: '10%', marginLeft: '25%', marginTop: '-8%' }}
                  >
                    Access key
                    <Form.Control
                      type="text"
                      id="key"
                      name="wallet_purpose"
                      onChange={handleInputChangeExchanges}
                      required
                      placeHolder="Access Key"
                      style={{ border: '1px solid', color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Key Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{ width: '50%', marginLeft: '25%', marginTop: '-6%', boxShadow: 'none', color: 'white' }}
                    onClick={handleAddExchange}
                  >
                    Save
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <Modal
              show={show}
              onHide={handleClose}
              style={{ width: '45%', marginLeft: '35%' }}
            >
              <Modal.Header style={{ background: 'grey', border: 'none' }}>
                {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
                <IconButton
                  style={{ position: 'absolute', top: '0', right: '0' }}
                  onClick={() => setShow(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Modal.Header>
              <Modal.Body style={{ background: 'grey' }}>
                {/* {!isWalletConnected ? ( */}
                <Form
                  className="custom-form"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitForm}
                >
                  <h4 style={{ color: 'black' }}>Change Ownership %</h4>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': credentialsInfo.ownership_percentage
                    })}
                    style={{ width: '50%', marginLeft: '25%', color: 'black' }}
                  >
                    {' '}
                    Ownerhsip %
                    <Form.Control
                      type="text"
                      id="portfolio_name"
                      name="ownership_percentage"
                      onChange={handleInputChange}
                      required
                      style={{ color: 'black' }}
                      placeHolder={editData.ownership_percentage}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ownership is Required.
                    </Form.Control.Feedback>
                  </Form.Label>

                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{ width: '50%', marginLeft: '25%' }}
                    onClick={handleClick1}
                  >
                    Save
                  </Button>
                </Form>
                {/* ) : ( */}
                {/* <SuccessMessage message=" Exchange Successfully Added" /> */}
                {/* )} */}
              </Modal.Body>
            </Modal>
            <Modal
              show={showDelete}
              onHide={handleCloseDelete}
              style={{
                width: '35%',
                marginTop: '20%',
                marginLeft: '39%',
                overflow: 'hidden',
                backgroundColor: '#222429',
                height: '22%',
                border: '1px solid grey',
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
                    marginLeft: '11%'
                  }}
                >
                  Are you sure you want to Delete this investment ?
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
                  variant="danger"
                  style={{ width: '25%' }}
                  onClick={() => {
                    handleDelete()
                    handleCloseDelete()
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="success"
                  onClick={handleClose}
                  style={{ width: '25%' }}
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            {alert ? (
              <Snackbar
                open={alert}
                autoHideDuration={2000}
                onClose={() => setAlert(false)}
                sx={{ marginLeft: '45%', marginBottom: '40%', width: '25%' }}
              >
                <Alert
                  onClose={() => setAlert(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Added successfully
                  {!alert}
                </Alert>
              </Snackbar>
            ) : (
              // setTimeout((!alert),3000)
              <></>
            )}
            {/* </div> */}
            {/* </div> */}
            <Row
            // style={{ marginLeft: "-14%" }
            >
              <Col lg={7}>
                <div
                  id="abc"
                  style={{
                    width: '100%',
                    paddingBottom: '10%',
                    height: '60%',
                    marginLeft: mar
                  }}
                >
                  <div
                    className="heading day"
                    style={{
                      // marginRight: "5%",
                      // marginLeft: "-5%",
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      marginTop: '-2%'
                      // paddingTop: "6%",
                    }}
                  >

                    <span style={{ fontFamily: 'system-ui', marginBottom: '5%', marginLeft: '-30%', color: 'white' }}>{pf?.[0]?.portfolio_name}</span>

                    <span style={{ marginTop: '2%', marginRight: '-88%' }}>
                      {/* <FormControl
                    //  style={{marginLeft:'105%'}}
                     >
                    <InputLabel id="demo-simple-select-helper-label" style={{fontSize:'17px', overflow:'visible'}}>Assets</InputLabel>
                    <Select
           labelId="demo-simple-select-label"
            id="demo-simple-select"
          className="btn btn-gray"
          value={type}
            label='Assets'
          // displayEmpty
          // inputProps={{ 'aria-label': 'Without label' }}
          style={{width:'150px',marginLleft:'-40%',borderRadius:'15px',border:'1px solid white', boxShadow:'none'}}
          onChange={handleChange2}

        >
          {/* <MenuItem value="">
            <em>View</em>
          </MenuItem> */}
                      {/* <MenuItem value='view'>View</MenuItem> */}
                      {/* <MenuItem value='add'>Add</MenuItem> */}
                      {/* <MenuItem value='investment'>Investment</MenuItem> */}
                      {/* </Select> */}
                      {/* </FormControl > */}
                      {/* {type=='view'?  */}
                      <FormControl
                        style={{ marginRight: '76%', width: '5%' }}
                      >

                        <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '17px', overflow: 'visible' }}>View</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // className={classes.select}
                          className="btn btn-gray data"
                          value={a}
                          label="Select"
                          // value={a}
                          // displayEmpty
                          // inputProps={{ 'aria-label': 'Without label' }}
                          style={{ width: '150px', marginLleft: '-40%', borderRadius: '15px', boxShadow: 'none' }}
                          onChange={handleChange5}

                        >
                          {/* <MenuItem value="">
            <em>View</em>
          </MenuItem> */}
                          <MenuItem value={'wallet'}>Wallet</MenuItem>
                          <MenuItem value={'exchange'}>Exchange</MenuItem>
                          <MenuItem value={'investment'}>Investment</MenuItem>
                        </Select>
                      </FormControl>
                    </span>
                    <span style={{ marginLeft: '140%', marginTop: '-9.5%' }}>
                      {/* : (type=='add' ?  */}
                      <FormControl style={{ marginRight: '66%' }}>
                        <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '17px', overflow: 'visible' }}>Add</InputLabel>

                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          className="btn btn-gray"
                          value={b}
                          label="Select"
                          // displayEmpty
                          // inputProps={{ 'aria-label': 'Without label' }}
                          style={{ width: '150px', marginLleft: '-40%', borderRadius: '15px', boxShadow: 'none' }}
                          onChange={handleChange3}

                        >
                          {/* <MenuItem value="">
            <em>View</em>
          </MenuItem> */}
                          <MenuItem value={'wallet1'}>Wallet</MenuItem>
                          <MenuItem value={'exchange1'}>Exchange</MenuItem>
                          <MenuItem value={'investment1'}>Investment</MenuItem>
                        </Select>
                      </FormControl>
                      {/* :<></>)} */}
                    </span>
                    {/* <select
                      className="days"
                      style={{ width: "30%",marginBottom:"7%" }}
                      onChange={handleSelect}
                    >
                      <option>Organizations</option>
                      <option>Persons</option>
                    </select>
                    {selectData == "Persons" ? (
                      <>
                        <select
                          className="days"
                          onChange={handlePerson}
                          style={{ width: "30%" }}
                        >
                          {result?.map((e) => (
                            <option>{e.name}</option>
                            // <option>Asset 2</option>
                            // <option>Asset 3</option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <>
                        <select
                          className="days"
                          onChange={handleOrganization}
                          style={{ width: "30%" }}
                        >
                          {result2?.map((e) => (
                            <option>{e.name}</option>
                            // <option>Asset 2</option>
                            // <option>Asset 3</option>
                          ))}
                        </select>
                      </>
                    )} */}
                  </div>
                </div>
              </Col>
              {/* <Col lg={4}> */}
              {/* <button
                    type="submit"
                    className="btn btn-gray"
                    style={{
                      cursor: "pointer",
                      width: "47%",
                      height: "15%",
                      boxShadow: "none",
                      fontSize: "13px",
                      marginLeft: "-46%",
                      marginTop:"25%",
                    }}
                    onClick={handleClick1}
                  >
                    <AddCircleOutlineIcon /> Organisations/Persons
                  </button> */}
              {/* </Col> */}
            </Row>
            <Row style={{ marginLeft: '4%' }}>
              <Col lg={10}>
                <div
                  // className="maindashtable"
                  // id="abc"
                  style={{
                    width: w,
                    paddingBottom: '6%',
                    marginLeft: mar1,
                    height: '95%',
                    marginTop: '-15%'
                  }}
                >
                  <div
                    className="dashheading"
                    style={{
                      marginBottom: '4%',
                      position: 'sticky',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}
                  >
                    <TextField
                      id="standard-search"
                      label="Search"
                      type="search"
                      // label="Filled success" variant="filled" color="#e8eaf6" focused
                      // className="btn btn-gray"
                      variant="standard"
                      style={{ boxShadow: 'none', width: '155px', height: '48px', marginTop: '-17%', marginLeft: '71%', background: 'hsl(218deg 9% 18% / 78%', borderRadius: '18px' }}
                      // value={value}
                      onChange={(event) => {
                        console.log(event.target.value, rar)
                        setSea(event.target.value)
                        const x = rar?.filter(i => i.name.toLowerCase().includes(event.target.value.toLowerCase()))
                        // rar.name.toLowerCase().includes(event.target.value.toLowerCase());
                        console.log(x)
                        setSearch(x)
                        // console.log(x)
                      }}
                    />
                    {/* <h3 style={{ fontSize: "18px" }}>{newName}</h3> */}

                    {/* :
        <FormControl
                      style={{marginRight:'50%', width:'5%'}}
                     >
                    <InputLabel id="demo-simple-select-helper-label" style={{fontSize:'17px', overflow:'visible'}}></InputLabel>

        </FormControl> */}

                    {/* <Link className="btn btn-gray" to={`/PMS/Investments/:${idData}`}  style={{color:"white",width:"13%",fontSize:"15px",width:"15%",boxShadow:"none"}}>
                        <h6  style={{backgroundColor:"transparent",color:"white",fontSize:"15px"}} >View Investments</h6>
                    </Link>
                    <Link
                      className="btn btn-gray"
                      style={{
                        color: "white",
                        width: "13%",
                        fontSize: "15px",
                        boxShadow: "none",
                      }}
                      to={`/PMS/MainManageAssetsWallets/:${idData}`}
                    >
                      <h6
                        style={{
                          backgroundColor: "transparent",
                          color: "white",
                          fontSize: "15px",
                        }}
                      >
                        View Wallets
                      </h6>
                    </Link>
                    <Link className="btn btn-gray" style={{color:"white",width:"13%",fontSize:"15px",boxShadow:"none"}} to={`/PMS/ViewExchanges/:${idData}`}>
                      <h6 style={{backgroundColor:"transparent",color:"white",fontSize:"15px"}} >View Exchanges</h6>
                    </Link> */}

                    {/* <select
                      className="btn btn-gray"
                      style={{
                        color: "white",
                        fontSize: "20px",
                        cursor: "pointer",
                        width: "20%",
                        boxShadow: "none",
                      }}
                      onClick={handleChangeData}
                    >
                      {" "}
                      <option >
                        Add Wallets
                      </option>
                      <option>
                        Add Investments
                      </option>
                      <option >
                        Add Exchanges
                      </option>
                    </select> */}
                    {/* <span>
                     <Autocomplete
  disablePortal
  className="btn btn-gray"
  // id="combo-box-demo"
  options={wallet}
  //  onChange={(e,k)=>{
  //    handleClick2(k)
  //  }}
  style={{border:'1px solid white',fill:'white', boxShadow:'none', width:'115%'}}
  sx={{ width: 300 }}
   renderInput={(params) => <TextField {...params} style={{color:'white'}}label="Add" />}
/>
</span> */}
                  </div>
                  {/* {sea ?
                  <CommonTablePortfolio1 data={search} columns={columns} style={{marginLeft:"-10%",marginTop:"-4%"}}/>
                  :

                  <CommonTablePortfolio1 data={rar} columns={columns} style={{marginLeft:"-10%",marginTop:"-3%"}} />
} */}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default PartyPageMain
