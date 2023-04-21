import React, { useState, useEffect } from 'react'
import CommonAccoutantTable from '../common/CommonTable/CommonAccountantTable'
import axios from 'axios'
import cx from 'classnames';
import moment from 'moment'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Header from '../common/Header/Header'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin'
import 'react-phone-number-input/style.css'
import { Container, Row, Col,Modal,Form, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom'
import Spinner from '../common/spinner'
import { textFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useSelector, useDispatch } from "react-redux";
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SearchBox from '../common/SearchBox/SearchBox'
import { LegendToggleRounded } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
import { Label } from 'react-md';
import { setDayWithOptions } from 'date-fns/fp';
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
function Ledger () {
  const styles = useStyles()
  const { selectedColumnId } = useSelector((store) => store.app);
  const getId = localStorage.getItem('sub_Id')
  const [result4, setResult4] = useState([])
  const [sea, setSea] = useState('')
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const [game,setGame] = useState('')
  const [entity,setEntity] = useState('')
  const [selectType, setSelectType] = useState('')
  const [host,setHost]=useState('')
  const [creditor,setCreditor]=useState('')
  const [player,setPlayer]=useState('')
  const [result, setResult] = useState('')
  const [search, setSearch] = useState([])
  const [shares,setShares] = useState([])
  const [loading,setLoading]=useState(false)
  const [gameData, setGameData] = useState([])
  const [ledgerData, setLedgerData] = useState([])
  const [validated,setValidated] = useState(false)
  const [showModalLedger, setShowModalLedger] = useState('')
  const [resultUser, setResultUser] = useState([])
  const handleModalLedger=()=>{
    setShowModalLedger(true)
  }
  const handleSelect=(e)=>{
    setSelectType(e.target.value)
    if(e.target.value==='game'){
      console.log('game')
    }
  }
  const handleAddLedger=()=>{

  }
  
  const gameApi = async () => {
  }
  const LedgerApi = async () => {
    setLoading(true)
    await axios.get(`${process.env.REACT_APP_BASE_URL}/get_ledgre`)
      .then(function (response) {
         if (response.data) {
          response.data.sort((a, b) => {
            const x = a.date
            const y = b.date
            return x > y ? -1 : x < y ? 1 : 0
          })
        }
        const temp2 = response.data.map(rec=>{
          const amt = parseFloat(rec.amount)
          return {...rec, amount:amt, date: moment(parseInt(rec.date)).format('YYYY-MM-DD,h:mm:ss a')}
        })
        if(temp2.length==0){
          setLoading(false)
          setLedgerData([])
          setAlertNoRecord([])
        }
        setLoading(false)
        setLedgerData(temp2)
      })
  }
  const handleGame=(e)=>{
  setGame(e.target.value)
  let x= gameData.filter(i=>i.game==e.target.value)
  setShares(x?.[0]?.shares)
  setHost(x?.[0]?.host)
  setResult(x?.[0]?.result)
  setPlayer(x?.[0]?.player)
  setCreditor(x?.[0]?.creditor)
  }
  const  filterByAmount=(filterValue,ledgerData)=>{
console.log(typeof(filterValue),ledgerData.filter(i => parseFloat(i.amount)))
if (filterValue) {
  return ledgerData.filter(i => parseFloat(i.amount) == parseFloat(filterValue));
}
return ledgerData;
}
  const handleEntity=(e)=>{
    setEntity(e.target.value)
  }
  useEffect(async () => {
    await gameApi()
    await LedgerApi()
    //await allportfolioUser()
  }, [])
  
  const columns4 = [
    {
      dataField: 'creditor',
      text: 'Creditor',
      sort: true,
      hidden: (selectedColumnId?.includes("creditor") == true),
      filter: textFilter({
        placeholder: 'creditor'
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.creditor?.charAt(0)?.toUpperCase() + row.creditor?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'debtor',
      text: 'Debtor',
      sort: true,
      hidden: (selectedColumnId?.includes("debtor") == true),
      filter: textFilter({
        placeholder: 'debtor'
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.debtor?.charAt(0)?.toUpperCase() + row.debtor?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      hidden: (selectedColumnId?.includes("date") == true),
      filter: dateFilter({
        placeholder: 'date'
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // let date = moment(parseInt(row.date)/1000,'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
        // let date =moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a").split(',')
        return (
          <>
          {row.date===null ?
                <span style={{ color: "white", fontSize: "14px" }}>N/A</span> :
               <span style={{ color: "white", fontSize: "14px" }}>
               {moment(row.date).format('Do MMMM YYYY, h:mm:ss a')?.split(',')[0] } <br/>
                {moment(row.date).format('Do MMMM YYYY, h:mm:ss a')?.split(',')[1]}
              </span>}
           </>
        );
      },
    },
    {
      dataField: 'amount',
      text: 'Amount',
      sort: true,
      hidden: (selectedColumnId?.includes("amount") == true),
      filter: numberFilter({
        placeholder: 'amount',
        // onFilter: filterByAmount
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
            {row.amount>0 ?
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer',color:'#00ff00' }}>
                 {'+'+'$'+parseFloat(row.amount).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
              </span> :
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer',color:'#ff0000' }}>
               {'-'+'$'+row.amount.toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '').replace('-','')}
            </span> 
             }      
            </div>
          </>
        )
      }
    },
    {
      dataField: 'currency',
      text: 'Currency',
      sort: true,
      hidden: (selectedColumnId?.includes("currency") == true),
      filter: textFilter({
        placeholder: 'currency'
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.currency?.charAt(0)?.toUpperCase() + row.currency?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      hidden: (selectedColumnId?.includes("type") == true),
      filter: textFilter({
        placeholder: 'type'
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.type?.charAt(0)?.toUpperCase() + row.type?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'ledgre_type',
      text: 'Ledger-Type',
      sort: true,
      hidden: (selectedColumnId?.includes("ledgre_type") == true),
      filter: textFilter({
        placeholder: 'type'
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.ledgre_type?.charAt(0)?.toUpperCase() + row.ledgre_type?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'game',
      text: 'Game info',
      sort: true,
      hidden: (selectedColumnId?.includes("game") == true),
      filter: textFilter({
        placeholder: 'game info'
      }),
         formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          < >
          {row.ledgre_type==='Accountancy' ?
          row.percentage==='' ?
             <ul style={{marginLeft:'-2em'}}>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Game</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.game?.charAt(0).toUpperCase() + row.game?.slice(1).toLowerCase()}</span>
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107',width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Game-Details</span>
               <span style={{ color: 'white',marginLeft: '3%' }}>{row.game_details?.charAt(0).toUpperCase() + row.game_details?.slice(1).toLowerCase()}</span> 
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Venue</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.venue?.charAt(0).toUpperCase() + row.venue?.slice(1).toLowerCase()}</span>
              </li>
              </ul>
              :
              <ul style={{marginLeft:'-3em'}}>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Game</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.game?.charAt(0).toUpperCase() + row.game?.slice(1).toLowerCase()}</span>
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107',width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Game-Details</span>
             <span style={{ color: 'white',marginLeft: '3%' }}>{row.game_details?.charAt(0).toUpperCase() + row.game_details?.slice(1).toLowerCase()}</span> 
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Venue</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.venue?.charAt(0).toUpperCase() + row.venue?.slice(1).toLowerCase()}</span>
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Ownership</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.percentage+'%'}</span> 
              </li>
              </ul> : <div style={{marginLeft:'2em'}}>-</div>}
          </>
        )
      }
    },
    // {
    //   dataField: 'portfolio',
    //   text: 'Portfolios',
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //         {row.portfolio?.[0]?.map(i =>
    //           <li>{i.portfolio_name}</li>
    //         )}
    //       </>
    //     )
    //   }
    // }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row >
          <Col lg={12}>
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Ledger</h3>
              </span>
              {/* <span className="p-2 pageheader">
                    <Link
                      to="#"
                      style={{
                        boxShadow: 'none',
                        cursor: 'pointer',
                        background: 'none',
                        color: '#FFC107'
                      }}
                      onClick={handleModalLedger}
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </Link>
                  </span> */}
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = ledgerData?.filter((i) =>
                  i.creditor.toLowerCase().includes(event.target.value.toLowerCase())
                  )
                  console.log(x)
                  if(x.length==0){
                    //  setAlertNoRecord([])
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
              ? (
                <CommonAccoutantTable
                  data={search}
                  columns={columns4}
                />
                )
              : (
                <CommonAccoutantTable
                loading={loading}
                  data={ledgerData}
                  columns={columns4}
                />
                )}
                <Modal
        show={showModalLedger}
        onHide={()=>setShowModalLedger(false)}
        style={{ width: '28%', marginLeft: '35%' }} >
          <div style={{border: '1px solid white'}}>
          <Modal.Header
            style={{ backgroundColor: '#222429', border: 'none' }}
          >
            {/* <Modal.Title>Edit PortFolio Section</Modal.Title> */}
            <IconButton
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                color: 'white'
              }}
              onClick={() => setShowModalLedger(false)}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
                 <Modal.Body style={{ backgroundColor: '#222429' }}>
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleAddLedger}
            >
              <h4>
                Add Ledger
              </h4>
              <FormControl
                style={{
                  width: '72%',
                  marginLeft:'1.9%',
                  marginBottom: '23px'
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  labelId="demo-simple-select-label"
                  style={{
                    fontSize: '17px',
                    overflow: 'visible',
                    color: 'grey'
                  }}
                >
                  {' '}
                  Select 
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
                value={selectType}
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
                        height:'54px',
                        border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:'unset'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important'
                    },
                    '.MuiSelect-icon': {
                      fill: 'grey !important'
                    },
                    ".MuiOutlinedInput-input": {
                      color: "white",
                       fontSize: "15px"
                  },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={handleSelect}
                >

                  <MenuItem value={'game'}>Game</MenuItem>
                  <MenuItem value={'payment'}>Payment</MenuItem>
                </Select>
              </FormControl>
              {selectType==='game' ? 
              <>
              <FormControl
              style={{
                width: '72%',
                marginLeft:'1.9%',
                marginBottom: '23px'
              }}
            >
              <InputLabel
                id="demo-simple-select-helper-label"
                labelId="demo-simple-select-label"
                style={{
                  fontSize: '17px',
                  overflow: 'visible',
                  color: 'grey'
                }}
              >
                {' '}
                Select Game
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
              value={game}
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
                      height:'54px',
                      border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                      borderColor:'unset'
                  },
                  '.MuiInputLabel-root': {
                    color: 'grey !important'
                  },
                  '.MuiSelect-icon': {
                    fill: 'grey !important'
                  },
                  ".MuiOutlinedInput-input": {
                    color: "white",
                     fontSize: "15px"
                },
                  ' .MuiInputLabel-root.Mui-focused': {
                    marginTop: '-3% !important',
                    marginLeft: '-5% !important'
                  }
                }}
                onChange={handleGame}
              >
                {gameData.map((el,index)=>(
                <MenuItem value={el.game}>{el.game}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl
              style={{
                width: '72%',
                marginLeft:'1.9%',
                marginBottom: '23px'
              }}
            >
              <InputLabel
                id="demo-simple-select-helper-label"
                labelId="demo-simple-select-label"
                style={{
                  fontSize: '17px',
                  overflow: 'visible',
                  color: 'grey'
                }}
              >
                {' '}
                Select Entity
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
              value={entity}
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
                      height:'54px',
                      border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                      borderColor:'unset'
                  },
                  '.MuiInputLabel-root': {
                    color: 'grey !important'
                  },
                  '.MuiSelect-icon': {
                    fill: 'grey !important'
                  },
                  ".MuiOutlinedInput-input": {
                    color: "white",
                     fontSize: "15px"
                },
                  ' .MuiInputLabel-root.Mui-focused': {
                    marginTop: '-3% !important',
                    marginLeft: '-5% !important'
                  }
                }}
                onChange={handleEntity}
              >
                {entityData.map((el,index)=>(
                <MenuItem value={el.name}>{el.name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
              
              <br/>
              {game!='' ? 
              <>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': host
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="host"
                  placeholder="host"
                  value={host}
                  // onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                
              </Form.Label> 
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': player
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="player"
                  placeholder="player"
                  value={player}
                  // onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                
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
                  id="name"
                  name="name"
                  placeholder="Creditor"
                  value={creditor}
                  // onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': result
                })}
                style={{ width: '100%', marginLeft: '0%',marginTop:'1.5em' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="result"
                  placeholder="result"
                  value={result}
                  // onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                
              </Form.Label> 
              </Form.Label> 
              {shares.map((item,index)=>(
                <>
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  // 'focus-add': shareholder
                })}
                style={{ width: '42%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="host"
                  placeholder="shareholder"
                  value={item.shareholder}
                  // onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
              </Form.Label> 
              <Form.Label
                htmlFor="creditor"
                className={cx('custom-form-box', {
                  // 'focus-add': ownership
                })}
                style={{ width: '28%', marginLeft: '59%',marginTop:'-4.9em' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="creditor"
                  placeholder="ownership"
                  value={item.owner_ship}
                  // onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
              </Form.Label> </>))}
              </>
            :<></>}
               </>
              : <></> }

              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{
                  width: '50%',
                  marginLeft: '25%',
                  marginTop: '-3%',
                  boxShadow: 'none'
                }}
              //  onClick={handleAddWalletData}
              >
                Save
              </Button>
              {/* {alertEntity ? (
                <Snackbar
                  open={alertEntity}
                  // autoHideDuration={4000}
                  onClose={handleClose}
                  sx={{
                    marginLeft: '36%',
                    marginBottom: '40%',
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
                    Added ledger successfully
                  </Alert>
                </Snackbar>
              )
                : (
                  <></>
                  )} */}
            </Form>
          </Modal.Body>
          </div>
      </Modal>
          </Col>
        </Row>
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
      </Container>
    </React.Fragment >
  )
}
export default Ledger;
