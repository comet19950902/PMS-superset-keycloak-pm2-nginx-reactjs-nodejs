import React, { useState, useEffect } from 'react'
import CommonTable from '../common/CommonTable/CommonTable'
import axios from 'axios';
import { Modal,Form } from 'react-bootstrap';
import cx from 'classnames';
import "./AccountingPage.css";
import Header from '../common/Header/Header'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Container, Row, Col } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import SearchBox from '../common/SearchBox/SearchBox';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';
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
  })
function AccountingInput () {
    const styles = useStyles();
  const getId = localStorage.getItem('sub_Id')
  const [result4, setResult4] = useState([])
  const [sea, setSea] = useState('')
  const [search, setSearch] = useState([])
  const[game,setGame]=useState("");
  const[shareholderName,setShareholderName]=useState("");
  const[shareholderPercentage,setShareholderPercentage]=useState("");
  const[gameDetails,setGameDetails]=useState("");
  const[venue,setVenue]=useState("");
  const[type,setType]=useState("");
  const[host,setHost]=useState("");
  const[creditor,setCreditor]=useState("");
  const[player,setPlayer]=useState("");
  const [resultUser, setResultUser] = useState([]);
  const[validated,setValidated]=useState(false);
  const [addressT, setAddressT] = useState("");
 
  const accountant = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/accontant_list`, {
        params: { user_role: 'admin' }
      })
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    }
        const getShareholderNames= async()=>{
        await axios
        .get(`${process.env.REACT_APP_BASE_URL}/get_share_holder`)
        .then(function (response){
                console.log(response);
        })
        .catch(function (error) {
            console.log(error)
            })
        }
    useEffect(async () => {
    //await getShareholderNames()
    //await accountant()
    }, [])
  const handleSubmitData=(e)=>{
    setValidated(true)
    e.preventDefault()
    console.log(game,gameDetails,venue,type,host,creditor,player);
  }
  
  return (
    <React.Fragment style={{overflow:"auto"}}>
      <Container fluid style={{overflow:"auto"}}>
      <Row className="justify-content-end">
          <Header />
        </Row>
        <Row>
        <Col md={2} className="justify-content-center">
            <SidebarAdmin />
          </Col>
          <Col lg={10} onClick={()=>{
            setValidated(false)
          }}>
            <Row  >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Accounting Input</h3>
              </span>
              {/* <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = result4?.filter((i) =>
                    i.username
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                  setSearch(x)
                }}
              /> */}
              <div id="accouting-form">
                  <h5 className='pageTitle'>
                    Add Accounting Inputs
                  </h5>
              <Form
              className="custom-form"
              id="accounting-form-details"
              noValidate
              validated={validated}
              onSubmit={handleSubmitData}
            >
              <Form.Label
                htmlFor="name"
                className={cx('custom-form-box', {
                  'focus-add': game
                })}
                style={{ width: '15em', marginLeft: '3em' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="walletName"
                  placeholder="Game"
                  onChange={(e) => setGame(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                   name
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Game Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': gameDetails
                })}
                style={{
                  width: '15em',
                  marginLeft: '3em',
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="wallet_purpose"
                  placeholder="Game Details"
                  onChange={(e) => setGameDetails(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Game Details Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': venue
                })}
                style={{
                  width:"15em",
                  marginLeft: '3em',
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="wallet_purpose"
                  placeholder="Venue"
                  onChange={(e) => setVenue(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Venue Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': type
                })}
                style={{
                  width:"15em",
                  marginLeft: '3em',
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="wallet_purpose"
                  placeholder="Type"
                  onChange={(e) => setType(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Type Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': host
                })}
                style={{
                  width:"15em",
                  marginLeft: '3em',
                  
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="wallet_purpose"
                  placeholder="Host"
                  onChange={(e) => setHost(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Host Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': creditor
                })}
                style={{
                  width:"15em",
                  marginLeft: '3em',
                  
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="wallet_purpose"
                  placeholder="Creditor"
                  onChange={(e) => setCreditor(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Creditor Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Form.Label
                htmlFor="key"
                className={cx('custom-form-box', {
                  'focus-add': gameDetails
                })}
                style={{
                  width:"15em",
                  marginLeft: '3em',
                  
                }}
              >
                <Form.Control
                  type="text"
                  id="key"
                  name="player"
                  placeholder="Player"
                  onChange={(e) => setPlayer(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                  purpose
                </span> */}
                <Form.Control.Feedback type="invalid">
                  Player Required.
                </Form.Control.Feedback>
              </Form.Label> 
               <FormControl
                style={{
                    width:"15em",
                  marginLeft: '3em',
                }}
              >
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{
                    fontSize: '17px',
                    overflow: 'visible',
                    color: 'grey'
                  }}
                >
                  {' '}
                  Shareholder's Name
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
                  value={addressT}
                  label="Select"
                  style={{
                    // width:"239px",
                    height: '54px',
                    borderRadius: '15px',
                    boxShadow: 'none'
                  }}
                  sx={{
                    '.MuiOutlinedInput-notchedOutline': {
                      borderRadius: '7px'
                    },
                    '.MuiInputLabel-root': {
                      color: 'grey !important'
                    },
                    '.MuiSelect-icon': {
                      fill: 'grey !important'
                    },
                    ' .MuiInputLabel-root.Mui-focused': {
                      marginTop: '-3% !important',
                      marginLeft: '-5% !important'
                    }
                  }}
                  onChange={(e) => setAddressT(e.target.value)}
                >
                  <MenuItem value={'BTC'}>BTC</MenuItem>
                  <MenuItem value={'ETH'}>ERC20/ETH</MenuItem>
                  <MenuItem value={'TRON'}>TRC20/TRON</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{
                    height:"3.5em",
                  width: '15em',
                  marginLeft: '3em',
                  boxShadow: 'none'
                }}
              //  onClick={handleAddWalletData}
              >
                Save
              </Button>
            </Form>
              </div>

            </Row>
            {/* {sea
              ? (
                <CommonTable
                  data={search}
                  columns={columns4}
                />
                )
              : (
                <CommonTable
                  data={result4}
                  columns={columns4}
                />
                )} */}
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  )
}
export default AccountingInput;
