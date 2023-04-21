import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import '../common/Modal.css'
import Header from '../common/Header/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SidebarAdmin from './DashboardAdmin/SidebarAdmin'
import { Alert, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import Button from 'react-bootstrap/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Autocomplete from '@mui/material/Autocomplete'
import cx from 'classnames'
import CommonTableSingle from '../common/CommonTable/CommonTableSingle'
import './DashboardAdmin/DashboardAdmin.css'
import { MuiTelInput } from 'mui-tel-input'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import '../Admin/styling.css'
import Spinner from '../common/spinner'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import SearchBox from '../common/SearchBox/SearchBox'
import CommonTableTransaction from '../common/CommonTable/CommonTableTransaction'
const useStyles = makeStyles({
  option: {
    '&:hover': {
      backgroundColor: 'grey !important',
      color: 'white !important'
    }
  }
})
function SinglePortFolioPage () {
  const styles = useStyles()
  const location = useLocation()
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const idData = location.pathname.split(':')[1]
  const portfolioName = location.pathname.slice(70)
  const newName = portfolioName.replace('%', ' ')
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [loading, setLoading]=useState(false)
  const navigate = useNavigate()
  const [dataId, setDataId] = useState('')
  const [dataRow, setDataRow] = useState([])
  const [selectData, setSelectData] = useState('Organizations')
  const [show, setShow] = useState(false)
  const [show4, setShow4] = useState(false)
  const [show41, setShow41] = useState(false)
  const [sea, setSea] = useState('')
  const [showName, setShowName] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [optionSelected, setOptionSelected] = useState(null)
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
  const [result3, setResult3] = useState([])
  const [resultOwn, setResultOwn] = useState([])
  const [resultUpdatedData, setResultUpdatedData] = useState([])
  const [party, setparty] = useState('')
  const [port, setport] = useState('')
  const [per, setper] = useState('')
  const [search, setSearch] = useState([])
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('0%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('120%')
  const [m, setm] = useState('4%')
  const [mar1, setmar1] = useState('-22%')
  const [mar, setmar] = useState('-6%')
  const [value, setValue] = useState('')
  const [pp, setPp] = useState('')
  const handleClose = () => {
    setShow(false)
    setShow4(false)
    setShow41(false)
    setAlertA(false)
    setAlertEx(false)
  }
  const [ownershipData, setOwnershipData] = useState(false)
  const [showWallets, setShowWallets] = useState(false)
  const [showRow, setShowRow] = useState(false)
  const handleCloseRowsEdit = () => setShowRow(false)
  const handleCloseWallets = () => setShowWallets(false)
  const handleCloseDelete = () => setShowDelete(false)
  const [Port, setPort] = useState([])
  const [editData, setEditData] = useState([])
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [type, setType] = useState('')
  const [ownership, setOwnership] = useState('')
  const [owner, setOwner] = useState([])
  const [name, setname] = useState('')
  const [w_name, setw_name] = useState('')
  const [w_purpose, setw_purpose] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [Oname, setOname] = useState('')
  const [tax, setTax] = useState('')
  const [address, setaddress] = useState('')
  const [city, setCity] = useState('')
  const [country, setcountry] = useState('')
  const [edit, setEdit] = useState([])
  const [alertWallet, setAlertWallet] = useState(false)
  const [alertO, setAlertO] = useState(false)
  const [alertA, setAlertA] = useState(false)
  const [alertEx, setAlertEx] = useState(false)
  const handleCloseWallet2 = () => {
    setAlertWallet(false)
  }
  const handleChangePh = (newValue, info) => {
    setValue(newValue)
  }
  const handleRowsEdit = (k) => {
    setPp(k)
    setAllrow(rar)
    setAlertA(false)
    setAlertO(false)
    setShowRow(true)
    setValidated(false)
  }
  const handleOpen4 = (e) => {
    setShow4(true)
    setValidated(false)
  }
  const handleOpen41 = () => {
    setShow41(true)
    setValidated(false)
  }
  const handleChangeEdit = (event) => {
    const re = /^[0-9\b]+$/
    setOwnership(event.target.value)
  }
  const handleChange5 = (event) => {
    setA(event.target.value)
    if (event.target.value === 'wallet') {
      navigate(`/PMS/MainManageAssetsWallets/:${idData}`)
    } else if (event.target.value === 'exchange') {
      navigate(`/PMS/ViewExchanges/:${idData}`)
    } else if (event.target.value === 'investment') {
      navigate(`/PMS/Investments/:${idData}`)
    }
  }
  const handleChange2 = (event) => {
    setType(event.target.value)
    if (event.target.value === 'wallet') {
      navigate(`/PMS/MainManageAssetsWallets/:${idData}`)
    } else if (event.target.value === 'exchange') {
      navigate(`/PMS/ViewExchanges/:${idData}`)
    } else if (event.target.value === 'investment') {
      navigate(`/PMS/Investments/:${idData}`)
    }
  }
  const handleChange3 = (event) => {
    setB(event.target.value)
    if (event.target.value == 'investment1') {
      navigate('/PMS/Investments', { state: { id: 1, data: idData } })
    } else if (event.target.value == 'wallet1') {
      navigate('/PMS/MainManageAssetsWallets')
      setB('')
    } else if (event.target.value == 'exchange1') {
      navigate('/PMS/ViewExchanges', { state: { id: 1, data: idData } })
    } else if (event.target.value == 'person') {
      handleOpen4()
      setB('')
    } else if (event.target.value == 'organisation') {
      handleOpen41()
      setB('')
    }
  }
  const handleShow = (row) => {
    setport(row?.portfolio_id)
    setparty(row?.party_id)
    setEditData(row)
    setShow(true)
    setAlertO(false)
    setOwnershipData(true)
  }
  const handleShowWallets = () => {
    setShowWallets(true)
  }
  const handleShowDelete = () => {
    setShowName(true)
  }
  const handleformPer = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/admin/createperson`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          user_name: name,
          email_id: email,
          user_phone: value
        }
      }
      await axios(config)
        .then(function (response) {
          const pd = response.data
          setAlertA(true)
          const config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              portfolio_id: idData,
              user_id: getId,
              party_detail: [
                {
                  party_id: pd[0].party_id,
                  ownership_percentage: '0'
                }
              ]
            }
          }
          axios(config)
            .then(function (response) {
              setAlertA(true)
              getPrtyPortfolioOfaPortfolio()
              loadOrganizationData()
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    setValidated(true)
    handleClose()
  }
  const handleformOrgn = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/admin/createorganisation`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          user_role: 'admin',
          tax_id: tax,
          name: Oname,
          address,
          city,
          country
        }
      }
      await axios(config)
        .then(function (response) {
          const od = response.data
          setAlertA(true)
          const config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              portfolio_id: idData,
              user_id: getId,
              party_detail: [
                {
                  party_id: od[0].party_id,
                  ownership_percentage: '0'
                }
              ]
            }
          }
          axios(config)
            .then(function (response) {
              setAlertA(true)
              getPrtyPortfolioOfaPortfolio()
              loadOrganizationData()
              handleClose()
            })
            .catch(function (error) {
              console.log(error)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    setValidated(true)
  }
  const [credentialsInfo, setCredentialsInfo] = useState({
  })
  const [credentialsInfoExchange, setCredentialsInfoExchange] = useState({
    portfolio_id: idData,
    userId: getId
  })
  const [credentialsInfoWallet, setCredentialsInfoWallet] = useState({
    portfolio_id: idData
  })
  const [alertInvest, setAlertInvest] = useState(false)
  const handleAddWallet = async (e) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/create_wallet`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        portfolio_id: idData,
        walletName: w_name,
        wallet_purpose: w_purpose
      }
    }
    await axios(config)
      .then(function (response) {
        setShowWallets(false)
        navigate('/PMS/Admin_dashboard')
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleInputChange = (event) => {
    setOwnershipData(true)
    const { name, value } = event.target.value
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const handleInputChangeExchanges = (event) => {
    const { name, value } = event.target
    setCredentialsInfoExchange({ ...credentialsInfoExchange, [name]: value })
  }
  const handleInputChangeWallets = (event) => {
    const { name, value } = event.target
    setCredentialsInfoWallet({ ...credentialsInfoWallet, [name]: value })
  }
  const [personData, setPersonData] = useState()
  const [organizationData, setOrganizationData] = useState([])
  const [portfolioData, setPortfolioData] = useState([])
  const [dataDeleteId, setDataDeleteId] = useState('')
  const [allRows, setAllrow] = useState([])
  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{width:'25em'}}>
        <p style={{ cursor: 'pointer' }}>{row.name}</p>
        </div>
        )
      }
    },
    {
      dataField: 'ownership_percentage',
      text: 'Ownership %',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{width:'25em'}}>
          <p style={{ cursor: 'pointer', color: 'white',marginLeft:'2em' }}>
            <p>{row.ownership_percentage}%</p>
          </p>
          </div>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{width:'50px'}}>
            <span
              style={{ cursor: 'pointer', color: '#FFC107' }}
              onClick={() => handleEdit(row)}
            >
              <EditOutlinedIcon />
            </span>
            <span
              style={{ color: '#b30000', cursor: 'pointer' }}
              onClick={() => handleEditDelete(row)}
            >
              <DeleteOutlineOutlinedIcon />
            </span>
          </div>
        )
      }
    }
  ]
  const columnNew = [
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
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
            <p>{row.ownership_percentage}%</p>
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
            <span
              style={{ cursor: 'pointer', color: '#FFC107' }}
              onClick={() => handleEdit(row)}
            >
              <EditOutlinedIcon />
            </span>
          </div>
        )
      }
    }
  ]
  const loadOrganizationData = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllPerson`, {
        params: { userId: getId }
      })
      .then((response) => {
        setLoading(false)
        setResult(response.data)
      })
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAllOrganisation`, {
        params: { userId: getId }
      })
      .then((response) => {
        setLoading(false)
        setResult2(response.data)
      })
  }
  const totalOrgandPersons = [...result, ...result2]
  const handleToggle = () => {
    setShowDashboard(!showDashboard)
    if (showDashboard === true) {
      setNewWidth('10')
      setW('135%')
      setm('-8%')
      setmar('-30%')
      setmar1('-37%')
      setMargin('8%')
      setWidthData('0%')
    } else {
      setNewWidth('10')
      setm('4%')
      setmar('-10%')
      setmar1('-22%')
      setW('120%')
      setMargin('22%')
      setWidthData('10%')
    }
  }
  const getPrtyPortfolioOfaPortfolio = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getPrtyPortfolioOfaPortfolio`,
      params: {
        portfolio_id: idData
      }
    }
    await axios(config).then(function (response) {
      setResult3(response.data)
    })
  }
  var rar = []
  result3?.forEach(async (elm) => {
    const r = totalOrgandPersons?.filter((i) => i.party_id == elm.party_id)
    rar.push({
      party_id: elm.party_id,
      portfolio_id: elm.portfolio_id,
      name: r?.[0]?.name,
      ownership_percentage: elm.ownership_percentage
    })
  })
  let total = 0
  for (const a of rar) {
    total = total + a.ownership_percentage
  }
  useEffect(async () => {
    await getPrtyPortfolioOfaPortfolio()
    await loadOrganizationData()
    portfolio()
  }, [])
  const handleEdit = (row) => {
    handleShow(row)
    setEdit(row)
    setAllrow(rar)
    setOwnership(row.ownership_percentage)
  }
  const handleEditDelete = (row) => {
    setShowDelete(true)
    setDataDeleteId(row.party_id)
  }
  const handleDelete = async () => {
    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/deleteUserFromPortfolio`,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        party_id: dataDeleteId,
        portfolio_id: idData
      }
    }
    await axios(config)
      .then(function (response) {
        getPrtyPortfolioOfaPortfolio()
      })
      .catch(function (error) {
        console.log(error)
      })
    await getPrtyPortfolioOfaPortfolio()
  }
  const handleChange = (selected) => {
    setOptionSelected(selected)
  }
  const handleChangeData = (event) => {
    if (event.target.value == 'Add Investments') {
    } else if (event.target.value == 'Add Wallets') {
      handleShowWallets()
    } else if (event.target.value == 'Add Exchanges') {
    }
  }
  const handleOrganization = (event) => {
    setPersonData(event.target.value)
  }
  const handlePerson = (event) => {
    setPersonData(event.target.value)
  }
  const handleClickNewPO = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
      setValidated(true)
    } else {
      const pe = totalOrgandPersons?.filter((i) => i.name == pp)
      let tot = 0
      for (const a of rar) {
        tot = a.ownership_percentage + tot
      }
      if (parseInt(tot) + parseInt(ownership) > 100) {
        setAlertO(true)
        setShowRow(true)
        setTimeout(() => {
          setAlertO(false)
        }, 3000)
      } else {
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            portfolio_id: idData,
            user_id: getId,
            user_role: 'admin',
            party_detail: [
              {
                party_id: pe?.[0]?.party_id,
                ownership_percentage: ownership
              }
            ]
          }
        }
        await axios(config)
          .then(function (response) {
            setAlertA(true)
            getPrtyPortfolioOfaPortfolio()
            setShowRow(false)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
  const handleClick1 = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const brr = 0
      let tot = 0
      for (const a of rar) {
        tot = a.ownership_percentage + tot
      }
      if (
        parseInt(tot) -
        parseInt(edit.ownership_percentage) +
        parseInt(ownership) >
        100
      ) {
        setAlertO(true)
        setShow(true)
        setTimeout(() => {
          setAlertO(false)
          setShow(false)
        }, 4000)
      } else {
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            portfolio_id: idData,
            user_id: getId,
            user_role: 'admin',
            party_detail: [
              {
                party_id: edit.party_id,
                ownership_percentage: ownership
              }
            ]
          }
        }
      await axios(config)
        .then(function (response) {
          getPrtyPortfolioOfaPortfolio()
          setAlert(true)
          setTimeout(() => {
            setAlert(false)
            setShow(false)
          }, 3000)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  }
  const handleClickP = async (k) => {
    const brr = []
    for (let i = 0; i < rar.length; i++) {
      brr.push({
        party_id: rar[i].party_id,
        ownership_percentage: rar[i].ownership_percentage
      })
    }
    const pe = result?.filter((i) => i.name == k)
    if (brr.length == 0) {
      brr.push({ party_id: pe?.[0]?.party_id, ownership_percentage: '100' })
    } else {
      brr.push({ party_id: pe?.[0]?.party_id, ownership_percentage: '0' })
    }
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
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
        setAlertA(true)
      })
      .catch(function (error) {
        console.log(error)
      })
    getPrtyPortfolioOfaPortfolio()
  }
  const handleClickOrgn = async (k) => {
    const brr = []
    for (let i = 0; i < rar.length; i++) {
      brr.push({
        party_id: rar[i].party_id,
        ownership_percentage: rar[i].ownership_percentage
      })
    }
    const pe = result2?.filter((i) => i.name == k)
    if (brr.length == 0) {
      brr.push({ party_id: pe?.[0]?.party_id, ownership_percentage: '100' })
    } else {
      brr.push({ party_id: pe?.[0]?.party_id, ownership_percentage: '0' })
    }
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
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
        setAlertA(true)
      })
      .catch(function (error) {
        console.log(error)
      })
    getPrtyPortfolioOfaPortfolio()
  }
  const portfolio = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getAllPortfolio`
    }
    axios(config).then(function (response) {
      setPort(response.data)
    })
  }
  const pf = Port?.filter((i) => i.portfolio_id == idData)
  const handleSubmitForm = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/admin/updatePartyPortfolio`,
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
          setTimeout(() => {
            setShow(false)
          }, 1500)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
  const me = []
  result?.forEach((el) => {
    const m = result3?.filter((i) => i.party_id != el.party_id)
    me.push({ party_id: el?.name })
  })
  const handleSelect = (event) => {
    setSelectData(event.target.value)
  }
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12} >
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Portfolio name&nbsp;-&nbsp;{pf?.[0]?.portfolio_name}</h3>
              </span>
              <Autocomplete
                className="p-2 pageheader"
                disablePortal
                id="combo-box-demo"
                options={result?.map((e) => e.name)}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper
                    style={{
                      background: 'rgb(31, 33, 37)',
                      color: 'white'
                    }}
                  >
                    {children}
                  </Paper>
                )}
                onChange={(e, k) => {
                  const x = rar?.filter((i) => i.name === k)
                  if (x.length > 0) {
                    setTimeout(() => {
                      setAlertEx(true)
                    }, 2000)
                  } else if (k.length > 0) {
                    handleRowsEdit(k)
                  }
                }}
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
                    marginTop:'-9px'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Person"
                  />
                )}
              />
              <Autocomplete
                className="p-2 pageheader"
                disablePortal
                id="combo-box-demo"
                options={result2?.map((e) => e.name)}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper
                    style={{
                      background: 'rgb(31, 33, 37)',
                      color: 'white'
                    }}
                  >
                    {children}
                  </Paper>
                )}
                onChange={(e, k) => {
                  const x = rar?.filter((i) => i.name == k)
                  if (x.length > 0) {
                    setTimeout(() => {
                      setAlertEx(true)
                    }, 2000)
                  } else if (k.length > 0) {
                    handleRowsEdit(k)
                  }
                }}
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
                    width: '200px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid #d9d9d9 !important',
                    left: '4px'
                  },
                  '.MuiInputLabel-root':{
                    marginTop:'-9px'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Organisation"
                  />
                )}
              />
              <SearchBox
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = rar?.filter((i) =>
                    i.name
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                  setSearch(x)
                }}
              />
              {alertA
                ? (
                  <Snackbar
                    open={alertA}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    sx={{
                      marginLeft: '44%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Added successfully
                    </Alert>
                  </Snackbar>
                  )
                : (
                  <></>
                  )}
              {alertEx
                ? (
                  <Snackbar
                    open={alertEx}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    sx={{
                      marginLeft: '44%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Already exists
                    </Alert>
                  </Snackbar>
                  )
                : (
                  <></>
                  )}
            </Row>
            <Modal
              show={show4}
              style={{ width: '45%', marginLeft: '35%' }}
            >
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
                  onClick={() => setShow4(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Modal.Header>
              {alertA
                ? (
                  <Snackbar
                    open={alertA}
                    onClose={handleClose}
                    sx={{
                      marginLeft: '44%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      added successfully
                    </Alert>
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
                >
                  <h4>Add person details</h4>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': name
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      onChange={(e) => setname(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Name is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': email
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="email"
                      name="email"
                      placeholder="email"
                      onChange={(e) => setemail(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      email is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <MuiTelInput
                    defaultCountry="IN"
                    value={value}
                    onChange={handleChangePh}
                    style={{
                      marginLeft: '17%',
                      marginTop: '1%',
                      marginBottom: '3%'
                    }}
                    sx={{
                      '.MuiOutlinedInput-root': {
                        marginLeft: '15%'
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant=""
                    className="btn btn-gray"
                    style={{
                      width: '50%',
                      marginLeft: '25%',
                      boxShadow: 'none',
                      color: 'white'
                    }}
                    onClick={handleformPer}
                  >
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              </div>
            </Modal>
            <Modal
              show={show41}
              onHide={handleClose}
              style={{
                width: '45%',
                marginTop: '-1%',
                marginLeft: '35%',
                paddingBottom: '2%'
              }}
            >
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
                  onClick={() => setShow41(false)}
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
                  <h4 >
                    Add organisation
                  </h4>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': Oname
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="name"
                      placeholder="name"
                      onChange={(e) => setOname(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Name is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': tax
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="tax"
                      name="tax"
                      placeholder="tax id"
                      onChange={(e) => setTax(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      tax id is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': address
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="address"
                      name="address"
                      placeholder="address"
                      onChange={(e) => setaddress(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      address is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': city
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="city"
                      name="city"
                      placeholder="city"
                      onChange={(e) => setCity(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      city is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': country
                    })}
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <Form.Control
                      type="text"
                      id="city"
                      name="country"
                      placeholder="country"
                      onChange={(e) => setcountry(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      country is Required.
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
                    onClick={handleformOrgn}
                  >
                    Save
                  </Button>
                </Form>
              </Modal.Body>
              </div>
            </Modal>
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
            <div className='transaction-wallet'>
            {sea
              ? (
                <CommonTableTransaction
                  data={search}
                  columns={roleId.includes('admin') === true ? columns : columnNew}
                />
                )
              : (
                <CommonTableTransaction
                loading={loading}
                  data={rar}
                  columns={roleId.includes('admin') === true ? columns : columnNew}
                />
                )}
                </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <h3
                style={{
                  color: 'white',
                  marginLeft: '11%',
                  fontSize: '20px',
                  overflow: 'none',
                  width: '33%'
                }}
              >
                Total Ownership :
              </h3>
              <h3 style={{ color: 'white', width: '33%' }}>{total} % </h3>
            </div>
          </Col>
        </Row>
        <Row
        >
          <Col lg={9}>
            <Modal
              show={showRow}
              style={{ width: '28%', marginLeft: '35%' }}
            >
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
                    onClick={() => setShowRow(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#222429' }}>
                  <Form
                    className="custom-form"
                    noValidate
                    validated={validated}
                    onSubmit={handleClickNewPO}
                  >
                    <h4 >
                      Add Ownership %
                    </h4>
                    <span
                      style={{
                        color: 'white',
                        marginLeft: '52px',
                        fontWeight: 'bold'
                      }}
                    >
                      Person/Organisation -{' '}
                      <span
                        style={{ marginLeft: '2px', fontWeight: '200' }}
                      >
                        {pp}
                      </span>
                    </span>
                    <Form.Label
                      htmlFor="exchange"
                      className={cx('custom-form-box', {
                      })}
                      style={{
                        width: '72%',
                        marginLeft: '50px',
                        marginTop: '39px',
                        color: 'white'
                      }}
                    >
                      Ownership %
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        id="portfolio_name"
                        name="ownership"
                        onChange={(event) =>
                          setOwnership(event.target.value)
                        }
                        required
                        style={{ color: 'white' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Ownership is Required.
                      </Form.Control.Feedback>
                    </Form.Label>
                    <Button
                      type="submit"
                      variant=""
                      className="btn-gray"
                      style={{
                        width: '50%',
                        marginLeft: '25%',
                        boxShadow: 'none'
                      }}
                    >
                      Save
                    </Button>
                  </Form>
                </Modal.Body>
                {alertO
                  ? (
                    <Snackbar
                      open={alertO}
                      onClose={() => setAlertO(false)}
                      sx={{
                        marginLeft: '40%',
                        marginBottom: '40%',
                        width: '25%'
                      }}
                    >
                      <Alert
                        onClose={() => setAlertO(false)}
                        severity="error"
                        sx={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: 'black'
                        }}
                      >
                        Total Ownership must be equal to 100%
                      </Alert>
                    </Snackbar>
                    )
                  : (
                    <></>
                    )}
              </div>
            </Modal>
            <Modal
              show={showWallets}
              onHide={handleCloseWallets}
              style={{ width: '40%', marginLeft: '30%' }}
            >
              <Modal.Header
                style={{ backgroundColor: '#222429', border: 'none' }}
              >
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
                >
                  <h4>Add Wallet</h4>
                  <Form.Label
                    htmlFor="name"
                    className={cx('custom-form-box', {
                      'focus-add': w_name
                    })}
                    style={{
                      marginTop: '-4%',
                      width: '50%',
                      marginLeft: '25%'
                    }}
                  >
                    <Form.Control
                      type="text"
                      id="name"
                      name="walletName"
                      placeholder="name"
                      onChange={(e) => setw_name(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Wallet Name Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Form.Label
                    htmlFor="key"
                    className={cx('custom-form-box', {
                      'focus-add': w_purpose
                    })}
                    style={{
                      width: '50%',
                      marginBottom: '10%',
                      marginLeft: '25%',
                      marginTop: '-2%'
                    }}
                  >
                    <Form.Control
                      type="text"
                      id="key"
                      name="wallet_purpose"
                      placeholder="purpose"
                      onChange={(e) => setw_purpose(e.target.value)}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      purpose Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{
                      width: '50%',
                      marginLeft: '25%',
                      marginTop: '-3%'
                    }}
                    onClick={handleAddWallet}
                  >
                    Save
                  </Button>
                  {alertWallet
                    ? (
                      <Snackbar
                        open={alertWallet}
                        onClose={handleCloseWallet2}
                        sx={{
                          marginLeft: '36%',
                          marginBottom: '45%',
                          width: '25%'
                        }}
                      >
                        <Alert
                          onClose={handleCloseWallet2}
                          severity="success"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                          Added wallet successfully
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                  {alertInvest
                    ? (
                      <Snackbar
                        open={alertInvest}
                        autoHideDuration={2000}
                        onClose={() => setAlertInvest(false)}
                        sx={{
                          marginLeft: '45%',
                          marginBottom: '49%',
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
                          Added Investment successfully
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
                </Form>
              </Modal.Body>
            </Modal>
            <Modal
              show={show}
              style={{ width: '28%', marginLeft: '35%' }}
            >
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
                    onClick={() => setShow(false)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#222429' }}>
                  <Form
                    className="custom-form"
                    noValidate
                    validated={validated}
                    onSubmit={handleClick1}
                  >
                    <h4>
                      Change Ownership %
                    </h4>
                    <Form.Label
                      htmlFor="exchange"
                      className={cx('custom-form-box', {
                        'focus-add': ownership
                      })}
                      style={{
                        width: '72%',
                        marginLeft: '15%',
                        color: 'white'
                      }}
                    >
                      {' '}
                      Ownership %
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        id="portfolio_name"
                        name="ownership_percentage"
                        placeholder="Ownership_Percentage"
                        onChange={handleChangeEdit}
                        required
                        style={{ color: 'white' }}
                        value={ownership}
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
                    >
                      Save
                    </Button>
                  </Form>
                </Modal.Body>
                {alertO
                  ? (
                    <Snackbar
                      open={alertO}
                      onClose={() => setAlertO(false)}
                      sx={{
                        marginLeft: '40%',
                        marginBottom: '40%',
                        width: '25%'
                      }}
                    >
                      <Alert
                        onClose={() => setAlertO(false)}
                        severity="error"
                        sx={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: 'black'
                        }}
                      >
                        Total Ownership must be equal to 100%
                      </Alert>
                    </Snackbar>
                    )
                  : (
                    <></>
                    )}
              </div>
            </Modal>
            <Modal
              show={showDelete}
              onHide={handleCloseDelete}
              style={{
                width: '30rem',
                marginTop: '17rem',
                marginLeft: '35%',
                overflow: 'hidden',
                backgroundColor: '#222429',
                height: '8rem',
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
                  Are you sure you want to Delete this ownership ?
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
                  style={{ width: '25%', backgroundColor: '#b30000' }}
                  onClick={() => {
                    handleDelete()
                    handleCloseDelete()
                  }}
                >
                  Yes
                </Button>
                <Button
                  variant="success"
                  onClick={handleCloseDelete}
                  style={{ width: '25%', backgroundColor: '#006400' }}
                >
                  No
                </Button>
              </Modal.Footer>
            </Modal>
            {alert
              ? (
                <Snackbar
                  open={alert}
                  autoHideDuration={4000}
                  onClose={() => setAlert(false)}
                  sx={{ marginLeft: '45%', marginBottom: '35%', width: '25%' }}
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
                    change successfully
                  </Alert>
                </Snackbar>
                )
              : (
                <></>
                )}
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  )
}
export default SinglePortFolioPage
