
import React, { useState, useEffect,useRef } from 'react'

import CommonTable from '../../common/CommonTable/CommonTable'
import { Link, useNavigate } from 'react-router-dom'
import cx from 'classnames'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import axios from 'axios'
import Header from '../../common/Header/Header'
import SearchBox from '../../common/SearchBox/SearchBox'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import SidebarAdmin from './SidebarAdmin'
import Spinner from '../../common/spinner'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, TextField } from '@mui/material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import '../DashboardAdmin/DashboardAdmin.css'
import Dropdown from 'react-bootstrap/Dropdown'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined'
import '../styling.css'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  paper: {
    background: 'rgb(31, 33, 37) !important',
    color: 'white !important'
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.

  },
  option: {
    '&:hover': {
      backgroundColor: 'grey !important',
      color: 'white !important'
    }
  }

  //  },

})

const base_url = process.env.REACT_APP_BASE_URL
function MainAdmin () {
  const styles = useStyles()
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red'
      },
      '&:hover fieldset': {
        borderColor: 'yellow'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green'
      }
    }
  })
  const getId = localStorage.getItem('sub_Id')
  const roleId = localStorage.getItem('role').split(',')
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }; <DeleteOutlineOutlinedIcon style={{ color: '#b30000' }} />
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [loading, setLoading] = useState(true)
  const inputRef = useRef(null);
  const [alertPort, setAlertPort] = useState(false)
  const navigate = useNavigate()

  const handleClosePort = () => {
    setAlertPort(false)
  }
  const [credentialsInfo, setCredentialsInfo] = useState({
    user_id: getId
  })
  const [dataId, setDataId] = useState('')
  const [result4, setResult4] = useState([])
  const [dataRow, setDataRow] = useState([])
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [portId, setPortId] = useState('')
 const [alertDeleteError, setAlertDeleteError]=useState(false)
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [showPerson, setShowPerson] = useState(false)
  const [showOrganization, setShowOrganization] = useState(false)
  const [showAllPortFolios, setShowAllPortFolios] = useState(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [wid, setWid] = useState('159%')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [m, setm] = useState('2%')
  const [mar, setmar] = useState('0%')
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
  const [result21, setResult21] = useState([])
  // const [result3, setResult3] = useState([]);
  const [result3, setResult3] = useState([])
  const [result5, setResult5] = useState([])
  const [port_wal, setport_wal] = useState([])
  const [Port, setResultPort] = useState([])
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [blankSpaceError, setBlankSpaceError]=useState(false)
  const [p_name, setp_name] = useState('')
  const [editPort, setEditPort] = useState('')
  const [alertAl, setAlertAl] = useState(false)
  const [alertSp, setAlertSp] = useState(false)
  const [showEp, setShowEp] = useState(false)
  const total = [...result, ...result4]
  const total1 = [...result2, ...result21]
  const [dropdown, setDropdown] = useState(false)
  const [resultAccountant, setResultAccount] = useState([])
  const [showAccountant, setShowAccountant] = useState(false)
  const [accoutantName, setAccountantName] = useState('')
  const [portfolioId, setPortfolioId] = useState('')
  const [portfolioName, setPortfolioName] = useState('')
  const [alertAccountant, setAlertAccountant] = useState(false)
  const [isOpenDeleteAccountant, setIsDeleteAccountant] = useState(false)
  const [accountantId, setAccountantId] = useState([])
  const [resultAccountantData, setResultAccountantData] = useState([])

  const handleAccountant = (row) => {
    setPortfolioId(row.portfolio_id)
    setPortfolioName(row.portfolio_name)
    setShowAccountant(true)
  }
  const handleDropDown = () => {
    if (dropdown === true) {
      setDropdown(false)
      // console.log(dropdown)
    } else {
      setDropdown(true)
      // console.log(dropdown)
    }
  }
  let acdata = []
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
      .then(function (response) {
        // console.log(response.data)
        const p_data = response.data
        acdata = p_data
        setResultAccount(p_data)
      })
  }
  const handleDeleteAccountant = async (accountant_id) => {
    setAccountantId(accountant_id)
    setIsDeleteAccountant(true)
  }
  const DeleteAccountant = async () => {
    await axios
      .delete(`${base_url}/delete_accountant_portfolio/${accountantId?.[0]?.portfolio_account_id}`, {

      }).then((response) => {
        const rs1 = response.data
        // console.log(rs1)

        //  allportfolioUser()

        setIsDeleteAccountant(false)
      })
    accountant()
  }
  const handleSubmitAccountant = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      const accountantId = resultAccountantData?.filter(i => i.username === accoutantName)
      // console.log(accountantId?.[0]?.user_id, getId, portfolioId)
      const config = {
        method: 'post',
        url: `${base_url}/admin/add_portfolio_manager`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          user_id: getId,
          portfolio_id: portfolioId,
          accountant_id: accountantId?.[0]?.user_id,
          user_role: 'admin'

        }
      }
      await axios(config)
        .then(function (response) {
          // console.log(response.data)
          // allportfolioUser()
          accountant()

          setAlertAccountant(true)
          setTimeout(() => {
            setAlertAccountant(false)
            setShowAccountant(false)
          }, 3000)
        })
      accountant()
    }
  }
  const allportfolioUser = async () => {
    setLoading(true)
    setSea('')
    await axios
      .get(`${base_url}/all_portfolios_details`, {
        params: {
          user_id: getId
        }
        // [...new Set(result.map(e=>e.investment_name))]
      }).then((response) => {
        const rs = response.data
       
        for(let a of rs){
          let total =0
          a.obj2=[]
        for(let b of a.walletsdata){
          b.total_bal = total + b.totalwalletbalance + b.totalwalletbalance_btc+parseFloat(b.totalwalletbalance_tron)
        }
      var holder = {};
      
      a.total_investments.filter(i=>i.status==='Active').forEach(function(d) {
        
        if (holder.hasOwnProperty(d.investment_name)) {
          holder[d.investment_name] = parseFloat(holder[d.investment_name]) + parseFloat(d.buy_value);
        } else {
          holder[d.investment_name] = parseFloat(d.buy_value);
        }
      });
      // console.log(holder)
     
      
      for (var prop in holder) {
        a.obj2.push({ investment_name:prop, buy_value: holder[prop] });
      }
    }
  //  console.log(rs)
      const temp = rs.map(record=>{
          return {...record, total_investments:record.obj2}
        })
        const arr = []
        if (rs !== 'Error // Cannot find portfolio list') {
          if (roleId.includes('accountant') === true && roleId.includes('admin') === false) {
            const  a = acdata?.filter(i => i.accountant_id === getId)
            a?.forEach(el => {
              const m = temp?.filter(j => j.portfolio_id == el.portfolio_id)
              // console.log(m)
              if(m.length>0){
              const me = { ...m }
              arr.push(Object.values(me)[0])
              }
            })
          
            // console.log(arr)
            setResult3(arr)
            setLoading(false)
          } else if (roleId.includes('accountant') === true && roleId.includes('admin') === true) {
            setResult3(temp)
            setLoading(false)
          } else {
            setResult3(temp)
            setLoading(false)
            
          }
        } else {
          setResult3([])
          setLoading(false)
        }
      })
  }
  const portfolio_data = async () => {
    await axios
      .get(`${base_url}/all_portfolio_users_data`, {
        params: {
          user_id: getId,
          user_role: (roleId?.includes('admin') === true) ? 'admin' : 'accountant'
        }
      }).then((response) => {
        const rs1 = response.data
        if (rs1 !== 'error') {
          setResult5(rs1)
        } else {
          setResult5([])
        }
      })
  }

  const accountantData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/accontant_list`,
        {
          params: {
            user_role: 'admin'
          }
        })
      .then(function (response) {
        // console.log(response.data)
        setResultAccountantData(response.data)
      })
  }
  useEffect(async () => {
    await accountantData()
    await accountant()
    await allportfolioUser()
    await portfolio_data()
    // console.log(sea)
  }, [])
  // console.log(result3)
  for (const r of result3) {
     r.partydata1 = []
     r.portfolio = []
    const x = result5?.filter(i => i.portfolio_id === r.portfolio_id)
    const y = resultAccountant?.filter(i => i.portfolio_id === r.portfolio_id)
    r.portfolio.push(y)
    r.partydata1.push(x)
}

  const handleSubmitEditForm = async (e) => {
    e.preventDefault()
    setValidated(true)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }else if(p_name.trim()==''){
    //  console.log('not accept blank space')
     setBlankSpaceError(true)
     setTimeout(()=>{
      setBlankSpaceError(false)
     },3000)
    }
     else {
      // console.log(p_name, editPort)
      const m = result3?.filter(i => i.portfolio_name === p_name)
      if (m.length > 0) {
        // console.log('already exist')
        setAlertAl(true)
        setTimeout(() => {
          setAlertAl(false)
        }, 2000)
      } else {
        // console.log(credentialsInfo);
        const config = {
          method: 'post',
          url: `${base_url}/EditPortfolioName`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            portfolio_name: p_name,
            portfolio_id: editPort
          }
        }
        await axios(config)
          .then(function (response) {
            // console.log(response.data)
            setAlert(true)
            setTimeout(
              () => {
                setAlert(false)
                setShowEp(false)
              },
              3000
            )
            allportfolioUser()
            setValidated(false)
          })
          .catch(function (error) {
            // console.log(error)
          })
      }
    }
  }
  const handleClose = () => {
    setSea('')
    // inputRef.current.value = null;
    setSea('')
    setShow(false)
    setShow1(false)
    setShow2(false)
    setShowEp(false)
  }
  const handleShow = (e) => {
    setAlertPort(false)
    setShow(true)
    setValidated(false)
  }
  const handleShow1 = (row, rowIndex) => {
    setPortId(row.portfolio_id)
    setShow1(true)
  }
  const handleDeleteUpdate = async () => {
    console.log(result3,portId)
    let del_port = result3.filter(i=>i.portfolio_id==portId)
    // console.log(del_port)
    if((del_port[0]?.total_investments.length>0 || del_port[0]?.walletsdata.length>0 || del_port[0]?.total_exchange.length>0)
    // || (del_port[0]?.total_investments.length==0 && del_port[0]?.walletsdata.length==0) || (del_port[0]?.walletsdata.length==0 && del_port[0]?.total_exchange.length==0)
    ){
      setAlertDeleteError(true)
setTimeout(()=>setAlertDeleteError(false),3000)
    }else{
      // console.log('yes')
    await axios
      .delete(`${base_url}/deletePortfolioData`, {
        params: { portfolio_id: portId }
      })
      .then((response) => {
        if(response.data=='PORTFOLIO DELETED'){
       
    setSearch([])
    setSea('')
        allportfolioUser()
        }
      })
      .catch(function (error) {
        // console.log(error)
      })
    }
  }

  const handleShowEp = (row) => {
    setEditPort(row.portfolio_id)
    setp_name(row.portfolio_name)
    setShowEp(true)
    setValidated(false)
  }

  
  const handleSubmitForm = async (e) => {
    setValidated(true)
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }else if(name.trim()==''){
     setBlankSpaceError(true)
     setTimeout(()=>{
      setBlankSpaceError(false)
     },3000)
    } else {
      // console.log(m)
      if (name !== ' ') {
        const config = {
          method: 'post',
          url: `${base_url}/admin/createPortfolio`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            portfolio_name: name.charAt(0)?.toUpperCase()+name.slice(1).toLowerCase(),
            user_id: getId,
            user_role: 'admin'
          }
        }
        await axios(config)
          .then(function (response) {
            // console.log(response)
            if (response.data == 'ALREADY EXIST') {
              // console.log('already exist')
              setAlertAl(true)
              setTimeout(() => {
                setAlertAl(false)
              }, 2000)
            } else {
              allportfolioUser()
              setAlertPort(true)
              setTimeout(() => {
                setAlertPort(false)
                setShow(false)
              }, 3000)
            }
            setValidated(true)
          })
          .catch(function (error) {
            // console.log(error)
          })
      } else {
        setAlertSp(true)
        setTimeout(() => {
          setAlertSp(false)
          setShow(false)
        }, 2000)
      }
    }
  }

  const newlist = []
  const list = []

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
      setW('100%')
      setWid('159%')
      setmar('0%')
      setMargin('22%')
      setWidthData('6%')
    }
  }

  const columns3 = [

    {
      dataField: 'portfolio_name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div style={{ width:'200px' }}>
              <Tooltip title={'view portfolio'}>
                <span onClick={() => navigate(`/PMS/Admin/Assets/:${row.portfolio_id}`, { state: { id: 1, data: row } })} className="namePortData" style={{  cursor: 'pointer' }}>
                  {row.portfolio_name.charAt(0).toUpperCase() + row.portfolio_name.slice(1)}
                </span>
              </Tooltip>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'walletsdata',
      text: 'Wallets',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {
              row.walletsdata?.map(e =>
                <li key={e.portfolio_id} style={{ cursor: 'pointer', color: '#FFC107',whiteSpace:'nowrap' }} onClick={() => navigate('/PMS/Admin/Transactions', { state: { id: 1, data3: {'w_id':e.wallet_id,'p_id':row.portfolio_id } }})} >
                  {e.wallet_name.length>50 ?
                  <Tooltip title={'view wallet'}>
                    <span className="namePortData" style={{whiteSpace:'break-spaces'}}   > { e.wallet_name.charAt(0).toUpperCase()+e.wallet_name.slice(1)} - ${e.total_bal.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
                    </Tooltip> :   <Tooltip title={'view wallet'}>
                    <span className="namePortData"   > { e.wallet_name.charAt(0).toUpperCase()+e.wallet_name.slice(1)} - ${e.total_bal.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
                    </Tooltip>}

                </li>
                
              )
            }
            
          </ul>
        )
      }
    },
    {
      dataField: 'total_investments',
      text: 'Investment',
      sort: true,
      // style: {
      //   width: '15em',
      // },
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {
              row.total_investments?.map(e =>
                <li key={e.investment_id} style={{ cursor: 'pointer', color: '#FFC107',whiteSpace:'nowrap' }} onClick={() => navigate('/PMS/TransactionInvestmentHistory', { state: { id: 1, data1: row.portfolio_name, inv_name:e.investment_name } })} >
                  <Tooltip title={'view investment'}>
                    <span className="namePortData" >{e.investment_name.charAt(0).toUpperCase()+e.investment_name.slice(1)} - ${parseFloat(e.buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
                  </Tooltip>
                </li>
              )
            }
          </ul>
        )
      }
    },
    {
      dataField: 'total_exchange',
      text: 'Exchange',
      sort: true,
      // style: {
      //   width: '15em',
      // },
      formatter: (cell, row, rowIndex, formatExtraData) => {

        // console.log(row.total_exchange)
        let t = 0
        let array1=[]
        const array = [...new Map(row.total_exchange.map(item =>
          [item.api_key, item])).values()]
          // console.log(array)
        for (const a of array) {
         for(let b of row.total_exchange){
          if(a.api_key===b.api_key){
          t = t + parseFloat(b.free_value)
          }
         }
         array1.push({'exchange_name':a.exchange_name,'free_value':t})
        }
      //  console.log(array1)
        return (
          <ul style={{marginLeft:'-3em'}}>
             {
              array1?.map(e => (
                <li style={{  cursor: 'pointer', color: '#FFC107',whiteSpace:'nowrap' }} onClick={() => navigate('/PMS/TransactionExchangeHistory', { state: { id: 1, data: row.portfolio_id, e_name: e.exchange_name } })} >
                  <Tooltip title={'view exchange'}>
                    <span className="namePortData">{e.exchange_name.charAt(0).toUpperCase()+e.exchange_name.slice(1)} - ${parseFloat(e.free_value.toFixed(2)).toLocaleString().replace(/\.00$/, '')}</span>
                  </Tooltip>
                </li>
              ))
            } 
          </ul>
        )
      }
    },

    {
      dataField: 'partydata1',
      text: 'Person/Organisation',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {
              row.partydata1?.[0]?.[0]?.partydata?.map(e =>
                <li key={row.portfolio_id + e.party_id} style={{  color: '#FFC107', cursor: 'pointer',whiteSpace:'break-spaces' }} onClick={() => navigate(`/PMS/Admin/SinglePortfolioPage/:${row.portfolio_id}`)} >
                  <span className="namePortData"> {e.name.charAt(0).toUpperCase()+e.name.slice(1)} - {e.ownership}% </span>
                </li>
              )
            }
          </ul>
        )
      }
    },
    {
      dataField: 'portfolio',
      text: 'Accountant',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <ul style={{marginLeft:'-3em'}}>
            {
              row.portfolio?.[0]?.map(e =>
                <li key={e.portfolio_id + e.accountant_id} style={{  color: '#FFC107',whiteSpace:'break-spaces' }} >
                  <span className="namePortData"> {e.accountant_name.charAt(0).toUpperCase()+e.accountant_name.slice(1)}</span> <span style={{ color: '#b30000', cursor: 'pointer' }} onClick={() => {
                    const acId = row?.portfolio?.[0]?.filter(i => i.accountant_name === e.accountant_name)
                    handleDeleteAccountant(acId)
                  }}><HighlightOffIcon style={{ height: '16px' }} /></span>
                </li>
              )
            }
          </ul>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div
              style={{
                cursor: 'pointer',
                lineHeight: 'normal',

              }}
              onClick={handleDropDown}
            >
              <Dropdown alignRight={true}>
                <Dropdown.Toggle
                  id={'options-button'}
                  // @ts-ignore
                  variant="borderless-dark"
                  bsPrefix="no-chevron"
                  size="sm"
                  style={{ color: '#FFC107', fontSize: '25px', fontWeight: '700' }}
                >
                  ...
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ willChange: 'transform', fontSize: '14px', background: '#222429', border:'0.2em solid white' }}>
                  {(roleId.includes('admin') === true)
                    ? <Dropdown.Item href="#" onClick={() => navigate('/PMs/MainManageAssetsWallets', { state: { id: 1, data: row } })}>
                      <AddCircleOutlineOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                      <span >Add wallet</span>
                    </Dropdown.Item>
                    : <></>}
                  {(roleId.includes('admin') === true)
                    ? <Dropdown.Item href="#" onClick={() => navigate('/PMS/Investments', { state: { id: 1, data: row } })}>
                      <AddCircleOutlineOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                      <span>Add investment</span>
                    </Dropdown.Item>
                    : <></>}
                  {(roleId.includes('admin') === true)
                    ? <Dropdown.Item href="#" onClick={() => navigate('/PMs/ViewExchanges', { state: { id: 1, data: row } })}>
                      <AddCircleOutlineOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                      <span>Add exchange</span>
                    </Dropdown.Item>
                    : <></>}
                  {(roleId.includes('admin') === true)
                    ? <Dropdown.Item href="#" onClick={() => handleAccountant(row)}>
                      <AddCircleOutlineOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                      <span>Add Accountant</span>
                    </Dropdown.Item>
                    : <></>}
                  <Dropdown.Item href={`/PMS/Admin/SinglePortfolioPage/:${row.portfolio_id}`}>
                    <SwitchAccountOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                    <span>Manage ownership</span>
                  </Dropdown.Item>
                  {/* <Dropdown.Item href={`/PMS/Admin/SinglePortfolioPage/:${row.portfolio_id}`}>
                    <SwitchAccountOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                    <span>Manage organisation</span>
                  </Dropdown.Item> */}
                  <Dropdown.Item href="#" onClick={() => handleShowEp(row)}>
                    <EditOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                    <span>Edit Portfolio Name</span>
                  </Dropdown.Item>
                  {(roleId.includes('admin') === true)
                    ? <Dropdown.Item href="#" onClick={() => handleShow1(row, rowIndex)}>
                      <DeleteOutlineOutlinedIcon style={{ fontSize: '14px', color: '#FFC107', marginRight: '4px', marginLeft: '-15px', marginTop: '-3px' }} />
                      <span>Delete</span>
                    </Dropdown.Item>
                    : <></>}

                </Dropdown.Menu>
              </Dropdown>
            </div>
          </>

        )
      }
    }
  ]
  const columns31 = [

    {
      dataField: 'portfolio_name',
      text: 'Name',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row)
        return (
          <>
            <div style={{ whiteSpace:'break-spaces' }}>
              <Tooltip title={'view portfolio'}>
                <span onClick={() => navigate(`/PMS/Admin/Assets/:${row.portfolio_id}`, { state: { id: 1, data: row } })} className="namePortData" style={{ cursor: 'pointer' }}>
                {row.portfolio_name.charAt(0).toUpperCase() + row.portfolio_name.slice(1)}
                </span>
              </Tooltip>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'walletsdata',
      text: 'wallets',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row.walletsdata)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}

            {
              row.walletsdata?.map(e =>
                // console.log(a.totalBalance)
                <li style={{  cursor: 'pointer', color: '#FFC107',whiteSpace:'break-spaces' }} onClick={() => navigate('/PMS/Admin/Transactions', { state: { id: 1, data3: {'w_id':e.wallet_id,'p_id':row.portfolio_id } }})} >
                  <Tooltip title={'view wallet'}>
                    <span className="namePortData" > {e.wallet_name.charAt(0).toUpperCase()+e.wallet_name.slice(1)}- ${e.total_bal.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</span>
                  </Tooltip>
                </li>
                // )

              )

            }
          </>
        )
      }
    },
    {
      dataField: 'total_investments',
      text: 'Investment',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}

            {
              row.total_investments?.map(e =>
                <li style={{  cursor: 'pointer', color: '#FFC107',whiteSpace:'break-spaces' }} onClick={() => navigate('/PMS/Investments', { state: { id: 1, data: row } })}>
                  <Tooltip title={'view investment'}>
                    <span className="namePortData" >{e.investment_name.charAt(0).toUpperCase()+e.investment_name.slice(1)} - ${(parseInt(e.quantity * e.purchase_price).toLocaleString())+'.'}</span>
                  </Tooltip>
                </li>

              )
            }
          </>
        )
      }
    },
    {
      dataField: 'total_exchange',
      text: 'Exchange',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        //  console.log(row.total_exchange)
        let t = 0
        const dis = []
        for (const a of row.total_exchange) {
          t = t + parseFloat(a.free_value)
        }
        const array = [...new Map(row.total_exchange.map(item =>
          [item.api_key, item])).values()]
        // console.log(t, array)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}

            {
              array?.map(e => (
                <li style={{  cursor: 'pointer', color: '#FFC107',whiteSpace:'break-spaces' }} onClick={() => navigate('/PMS/ViewExchanges', { state: { id: 1, data: row } })} >
                  <Tooltip title={'view exchange'}>
                    <span className="namePortData">{e.exchange_name.charAt(0).toUpperCase()+e.exchange_name.slice(1)} - ${parseFloat(t.toFixed(2)).toLocaleString().replace(/\.00$/, '')}</span>
                  </Tooltip>
                </li>

              ))
            }
          </>
        )
      }
    }
  ]
  const [bigData, setBigData] = useState(true)
  const [isHovering, setIsHovering] = useState(true)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  return (
    <React.Fragment>
      <Container fluid>
        {/* <Row className="justify-content-end">
          <Header />
        </Row> */}
        <Row>
          {/* <Col md={2} className="justify-content-center">
            <SidebarAdmin />
          </Col> */}
          <Col lg={12}>
            <Row className="d-flex justify-content-center">
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Portfolios</h3>
              </span>
              {
                (roleId.includes('admin') === true)
                  ? <Link
                    className="p-2 pageheader"
                    to="#"
                    style={{
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      marginLeft: '1%',
                      color: '#FFC107',
                      top:'11px',
                      position:'relative'
                    }}
                    onClick={handleShow}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Link>
                  : <></>
              }
              <SearchBox
              value={sea}
                onChange={(event) => {
                   setSea(event.target.value)
                  const x = result3?.filter(i => i.portfolio_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.total_investments?.[0]?.investment_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.total_investments?.[1]?.investment_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.walletsdata?.[0]?.wallet_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.walletsdata?.[1]?.wallet_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.total_exchange?.[0]?.exchange_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.partydata1?.[0]?.[0]?.partydata?.[0]?.name.toLowerCase().includes(event.target.value.toLowerCase())
                 || i.partydata1?.[0]?.[0]?.partydata?.[1]?.name.toLowerCase().includes(event.target.value.toLowerCase())
                 || i.portfolio?.[0]?.[0]?.accountant_name.toLowerCase().includes(event.target.value.toLowerCase())
                  || i.portfolio?.[0]?.[1]?.accountant_name.toLowerCase().includes(event.target.value.toLowerCase())
                
                  )
                  if(x.length==0){
                    // console.log('no data')
                    
                    setAlertNoRecord(true)
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
              ? <CommonTable loading={loading} data={search} columns={(roleId.includes('admin') === true) ? columns3 : columns31} />
              : <CommonTable loading={loading} data={ result3 } columns={(roleId.includes('admin') === true) ? columns3 : columns31} />}
          </Col>
        </Row>
      </Container>
      <Modal
        show={showAccountant}
        onHide={() => setShowAccountant(false)}
        style={{ width: '25rem', marginLeft: '40%' }} >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
              onClick={() => setShowAccountant(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          {alertAccountant
            ? (
              <Snackbar
                open={alertAccountant}
                onClose={() => setAlertAccountant(false)}
                sx={{
                  marginLeft: '35%',
                  marginBottom: '40%',
                  width: '25%'
                }}
              >
                <Alert
                  onClose={() => setAlertAccountant(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Added accountant successfully
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
          <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form className="custom-form" noValidate validated={validated} onSubmit={handleSubmitAccountant}>
              <h4 >Add Accountant</h4>
              <span style={{ color: 'white', marginLeft: '4px', fontWeight: 'bold' }}>Portfolio name - <span style={{ marginLeft: '2px' }}>{portfolioName}</span></span>
              <FormControl style={{ marginLeft: '10px', marginBottom: '33px', marginTop: '7px' }}>
                <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '17px', marginLeft: '-2%', marginTop: '-1%', overflow: 'visible', color: 'grey' }}>Accountant</InputLabel>

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
                  value={accoutantName}
                  label="Select"

                  style={{ width: '253px', borderRadius: '15px', boxShadow: 'none' }}
                  sx={{
                    width: 300,
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '0px',
                      height:'54px',
                      border:'1px solid hsl(0deg 0% 44% / 63%) !important',
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
                       paddingRight:'61%',
                       paddingTop:'12px',
                  },

                  }}
                  onChange={(e) => setAccountantName(e.target.value)} >
                  {resultAccountantData?.map(i =>
                    <MenuItem value={i.username}>{i.username}</MenuItem>
                  )}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  marginTop: '-3%',
                  color: 'white',
                  boxShadow: 'none'
                }}
              // onClick={handleAddExchange}
              >
                Save
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal show={showEp}
        //  onHide={handleClose}
        style={{ width: '28%', marginLeft: '35%' }}>
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
              onClick={() => setShowEp(false)}
            >
              <CloseIcon />
            </IconButton>

          </Modal.Header>
          {alert ? (
            <Snackbar
              open={alert}
              autoHideDuration={4000}
              onClose={handleClose}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',

                width: '25%'
              }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Portfolio Name Updated Successfully
              </Alert>
            </Snackbar>
          )
            : <></>
          }
          {alertAl ? (
            <Snackbar
              open={alertAl}
              onClose={() => setAlertAl(false)}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',

                width: '25%'
              }}
            >
              <Alert
                onClose={() => setAlertAl(false)}
                severity="error"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Already exist
              </Alert>
            </Snackbar>
          )
            : <></>
          }
          {blankSpaceError ? (
            <Snackbar
              open={blankSpaceError}
              onClose={() => setBlankSpaceError(false)}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',

                width: '25%'
              }}
            >
              <Alert
                onClose={() => setBlankSpaceError(false)}
                severity="error"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Portfolio name cannot be blank
              </Alert>
            </Snackbar>
          )
            : <></>
          }
          <Modal.Body style={{ backgroundColor: '#222429' }}>

            {/* {!isWalletConnected ? ( */}
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmitEditForm}
            >

              <h4 >Edit Portfolio</h4>

              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': p_name
                })}
                style={{ width: '62%', marginLeft: '19%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={p_name}
                  onChange={(e) => setp_name(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Portfolio name is Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{ width: '50%', marginLeft: '25%', boxShadow: 'none', color: 'white' }} >
                save
              </Button>
            </Form>
          </Modal.Body>
        </div>
      </Modal>
      <Modal
        show={show2} onHide={handleClose} style={{
          width: '100%',
          paddingBottom: '6%',
          marginTop: '3%',
          marginLeft: '2%',
          height: '95%'

        }}>
        <Modal.Header
          style={{ backgroundColor: '#222429', border: 'none' }}
        >
          <IconButton
            style={{ position: 'absolute', top: '0', right: '0', color:'white' }}
            onClick={() => setShow2(false)}
          >
            <CloseIcon />
          </IconButton>

        </Modal.Header>
        <Modal.Body style={{
          backgroundColor: '#222429'
        }}>
          <div >
            <h3 style={{ fontSize: '18px' }}>List of portfolio</h3>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose} style={{ width: '30rem', marginTop: '17rem', overflow: 'hidden', marginLeft: '35%', backgroundColor: '#222429', height: '8rem', border: '1px solid white', borderRadius: '15px' }}>
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <Modal.Title style={{ color: 'white', fontSize: '16px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this portfolio ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ backgroundColor: '#222429', border: 'none', paddingRight: '34%', marginTop: '-3%' }}>
          <Button variant="success" style={{ width: '25%', marginBottom: '2%',  backgroundColor: '#006400' }}
            onClick={() => {
              handleDeleteUpdate()
              // console.log(sea)
              handleClose()
            }}
          >
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose} style={{ width: '25%', backgroundColor: '#b30000' }}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isOpenDeleteAccountant} onHide={() => setIsDeleteAccountant(false)} style={{ width: '30rem', marginTop: '17rem', overflow: 'hidden', marginLeft: '35%', backgroundColor: '#222429', height: '8rem', border: '1px solid white', borderRadius: '15px' }} >
        <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
          <Modal.Title style={{ color: 'white', fontSize: '16px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this accountant ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{ backgroundColor: '#222429', border: 'none', paddingRight: '34%', marginTop: '-3%' }}>

          <Button variant="danger" style={{ width: '25%', marginBottom: '2%', backgroundColor: '#b30000' }}
            onClick={() => {
              DeleteAccountant()
              setIsDeleteAccountant(false)
            }
            }
          >
            Yes
          </Button>
          <Button variant="success" onClick={() => setIsDeleteAccountant(false)} style={{ width: '25%', backgroundColor: '#006400' }}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose} style={{ width: '28%', marginLeft: '35%' }} >
        <div style={{ border: '1px solid white' }}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
              onClick={() => setShow(false)}
            >
              <CloseIcon />
            </IconButton>

          </Modal.Header>

          <Modal.Body style={{ backgroundColor: '#222429' }}>

            {!isWalletConnected
              ? (
                <Form
                  className="custom-form"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmitForm}
                >
                  <h4 >Create Portfolio</h4>
                  <Form.Label
                    htmlFor="exchange"
                    className={cx('custom-form-box', {
                      'focus-add': name
                    })}
                    style={{ width: '62%', marginLeft: '19%' }}
                  >
                    <Form.Control
                      type="text"
                      id="portfolio_name"
                      name="portfolio_name"
                      placeholder="Portfolio Name"
                      onChange={(e) => { setname(e.target.value) }}
                      required
                      style={{ color: 'white' }}
                    />
                    <Form.Control.Feedback type="invalid">
                      Portfolio Name is Required.
                    </Form.Control.Feedback>
                  </Form.Label>
                  <Button
                    type="submit"
                    variant=""
                    className="btn-gray"
                    style={{ width: '50%', marginLeft: '25%', boxShadow: 'none' }}
                  >
                    Save
                  </Button>
                </Form>
                )
              : (
                <SuccessMessage message=" Exchange Successfully Added" />
                )}
          </Modal.Body>
          {alertPort ? (
            <Snackbar
              open={alertPort}
              onClose={handleClosePort}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',

                width: '25%'
              }}
            >
              <Alert
                onClose={handleClosePort}
                severity="success"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Portfolio Added successfully
              </Alert>
            </Snackbar>
          )
            : <></>
          }
          {blankSpaceError ? (
            <Snackbar
              open={blankSpaceError}
              onClose={() => setBlankSpaceError(false)}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',

                width: '25%'
              }}
            >
              <Alert
                onClose={() => setBlankSpaceError(false)}
                severity="error"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Portfolio name cannot be blank
              </Alert>
            </Snackbar>
          )
            : <></>
          }
          {alertSp ? (
            <Snackbar
              open={alertSp}
              onClose={() => setAlertSp(false)}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',

                width: '25%'
              }}
            >
              <Alert
                onClose={() => setAlertSp(false)}
                severity="error"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Please enter your proper name
              </Alert>
            </Snackbar>
          )
            : <></>
          }
          {alertAl ? (
            <Snackbar
              open={alertAl}
              onClose={() => setAlertAl(false)}
              sx={{
                // marginTop:'-2%',
                marginLeft: '35%',
                marginBottom: '38%',
                width: '25%'
              }}
            >
              <Alert
                onClose={() => setAlertAl(false)}
                severity="error"
                sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
              >
                Already exist
              </Alert>
            </Snackbar>
          )
            : <></>
          }
        </div>
      </Modal>
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
      {alertDeleteError
                    ? (
                      <Snackbar
                        open={alertDeleteError}
                        onClose={() => setAlertDeleteError(false)}
                        anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
                       sx={{
                        width:'20em'
                      }}
                      >
                        <Alert
                          onClose={() => setAlertDeleteError(false)}
                          severity="error"
                          sx={{
                            width: '100%',
                            backgroundColor: 'white',
                            color: 'black'
                          }}
                        >
                           Portfolio contains data of wallet, investment, exchange you can not delete this portfolio
                        </Alert>
                      </Snackbar>
                      )
                    : (
                      <></>
                      )}
      
    </React.Fragment>
  )
}
export default MainAdmin