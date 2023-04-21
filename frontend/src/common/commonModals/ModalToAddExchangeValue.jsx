import React,{useState} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import { Alert, Snackbar,IconButton } from '@mui/material'
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from '@mui/material/FormControl'
import { setOpenModalAddExchangeStatus } from '../../Redux/appSlice';
import CloseIcon from '@mui/icons-material/Close'
import Select from '@mui/material/Select'
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles'
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
function ModalToAddExchangeValue({data, exchangeData}) {
    const dispatch=useDispatch();
    const styles = useStyles()
    const getId = localStorage.getItem('sub_Id')
    // console.log("selected row",data);
    const {openModalAddExchangeStatus}=useSelector((store)=>store.app); 
    const [exName, setExName] = useState('')
    const [exAccess, setExAccess] = useState('')
    const [exchangeTError, setExchangeTError] = useState(false)
    const [exApi, setExApi] = useState('')
    const [alertAccessKeyAlreadyExist, setAlertAccessKeyAlreadyExist]=useState(false)
    const [alertSecretKeyAlreadyExist, setAlertSecretKeyAlreadyExist]=useState(false)
    const [exchangeT, setExchangeT] = useState('')
    const [validated, setValidated] = useState(false)
    const [spaceError, setSpaceError]= useState(false)
    const [alertInvalidSecretKey,setAlertInvalidSecretKey]=useState(false)
    const [alertExch, setAlertExch] = useState(false)
    const [exchangeInfo, setExchangeInfo]=useState([])
  const [alertInvalidKey, setAlertInvalidKey] = useState(false)
  const [alertInvalidAccessKey, setAlertInvalidAccessKey] = useState(false)
  const [alertAlreadyExist, setAlertAlreadyExist] = useState(false)
 
    const handleAddExchange = async (e) => {
      setExchangeTError(false)
      // console.log(exchangeData)
      e.preventDefault()
     setValidated(true)
      // console.log("INFO DATA>>>>>>>>>>>>>>>>>>>>>>>>>>",credentialsInfoInvest);
      const form = e.currentTarget
        const res1 = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_exchange_list_OfPortfolio`,{
      params:{
        portfolio_id: data?.[0]?.portfolio_id ,
    }
  })
      if (form.checkValidity() === false && exchangeT=="") {
        e.preventDefault()
        e.stopPropagation()
        setExchangeTError(true)
        // console.log(exchangeT)
      } else if( exName.trim()=='' || exApi.trim()=='' || exAccess.trim( )=='' ) {
        // console.log('no')
        setSpaceError(true)
              setTimeout(() => setSpaceError(false), 3000)
              // setTimeout(() => dispatch(setOpenModalAddExchangeStatus(false)), 3000)
        // setTimeout(() => setSpaceError(false), 3000)
        // setTimeout(() => setShowWalletsData(false), 3000)
      }else if(exchangeData.filter(i=>i.exchange_name===exName).length>0){
        setAlertAlreadyExist(true)
        // exchange(rs)
        setTimeout(()=>{
          setAlertAlreadyExist(false)
          // setShowExchanges(false)
        }, 3000)
      }
      else if(res1.data.filter(i=>i.exchange_apikey===exApi).length>0 && res1.data.filter(i=>i.exchange_secret_api_key===exAccess).length>0 ){
          // console.log('api key secret mismatch')
        
          setAlertAlreadyExist(true)
          // exchange(rs)
          setTimeout(()=>{
            setAlertAlreadyExist(false)
            // setShowExchanges(false)
          }, 3000)

    }
    else if(res1.data.filter(i=>i.exchange_secret_api_key===exAccess).length>0){
        //  console.log('secret')
         setAlertAccessKeyAlreadyExist(true)
         // exchange(rs)
         setTimeout(()=>{
          setAlertAccessKeyAlreadyExist(false)
           // setShowExchanges(false)
         }, 3000)
    }
       else if(res1.data.filter(i=>i.exchange_apikey===exApi).length>0){
          //  console.log('api key')
          
           setAlertSecretKeyAlreadyExist(true)
           // exchange(rs)
           setTimeout(()=>{
            setAlertSecretKeyAlreadyExist(false)
             // setShowExchanges(false)
           }, 3000)

      }else if(res1.data.filter(i=>i.exchange_secret_api_key===exAccess).length>0){
          //  console.log('secret')
           setAlertAccessKeyAlreadyExist(true)
           // exchange(rs)
           setTimeout(()=>{
            setAlertAccessKeyAlreadyExist(false)
             // setShowExchanges(false)
           }, 3000)
      }
      else{
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/createExchange`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            portfolio_id: data?.[0]?.portfolio_id,
            exchange_name: exName,
            api_key: exApi,
            api_secret: exAccess,
            exchange_type: exchangeT,
            user_id: getId
          }
        }
        await axios(config)
          .then(function (response) {
            // console.log(response)
            const rs = data?.[0]?.portfolio_id
            if(response.data=='BOTH KEY INVALID'){
              setAlertInvalidKey(true)
              setTimeout(()=>{
                setAlertInvalidKey(false)
                // setShowExchanges(false)
              }, 3000)
            }  else if(response.data=='INVALID_SIGNATURE'){
              setAlertInvalidAccessKey(true)
              // exchange(rs)
              setTimeout(()=>{
                setAlertInvalidAccessKey(false)
                // setShowExchanges(false)
              }, 3000)
            }  else if(response.data=='BAD_API_KEY_FMT'){
              setAlertInvalidSecretKey(true)
              // exchange(rs)
              setTimeout(()=>{
                setAlertInvalidSecretKey(false)
                // setShowExchanges(false)
              }, 3000)
            } 
            else if(response.data==='Exchange_apikey Already Exist'){
              setAlertAlreadyExist(true)
              // exchange(rs)
              setTimeout(()=>{
                setAlertAlreadyExist(false)
                // setShowExchanges(false)
              }, 3000)
            }
            else if(response.data) {
              create_exchange_history(exApi, exAccess, rs)
            // exchange(rs)
            setAlertExch(true)
            setTimeout(()=>{
              setAlertExch(false)
              dispatch(setOpenModalAddExchangeStatus(false))
            }, 3000)
            }
          })
          .catch(function (error) {
            // console.log(error)
          })
      }
      setValidated(true)
    }
    const create_exchange_history = (api, secret,rs) => {
      const config = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL}/add_exchange_history`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          portfolio_id:rs,
          api_key: api,
          api_secret: secret,
          user_id: getId
        }
      }
      axios(config)
        .then(function (response) {
          // console.log(response)
        })
    }
  return (
    <>
         <Modal
          show={openModalAddExchangeStatus}
          // onHide={()=>{dispatch(setOpenModalAddExchangeStatus(false))}}
          style={{ width: '28%', marginLeft: '35%' }}
        >
          <div style={{ border: '1px solid white' }}>
            <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
                onClick={()=>{dispatch(setOpenModalAddExchangeStatus(false))}}
              >
                <CloseIcon />
              </IconButton>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#222429' }}>
              <Form className="custom-form" noValidate validated={validated} onSubmit={handleAddExchange}>
                <h4>Add Exchange</h4>
                <span style={{ color: 'white', fontWeight: 'bold',whiteSpace:'nowrap' }}>Portfolio name - <span style={{ marginLeft: '2px' }}>{data?.[0]?.portfolio_name}</span></span>
                <Form.Label htmlFor="name" className={cx('custom-form-box', { 'focus-add': exName })}
                  style={{ width: '72%', marginLeft: '15%' }}
                >
                  <Form.Control
                    type="text"
                    id="name"
                    name="exchange_name"
                    placeholder="Exchange name"
                    onChange={(event) => setExName(event.target.value)}
                     required
                  />
                  <Form.Control.Feedback type="invalid">
                    Exchange Name Required.
                  </Form.Control.Feedback>
                </Form.Label>
                <FormControl  style={{marginBottom: '7px', marginLeft:'14%', width:'84%' }} error={exchangeTError}>
                  <InputLabel id="demo-simple-select-helper-label" style={{ fontSize: '17px', overflow: 'visible', color: 'grey' }}>Exchange</InputLabel>
                  <Select
                   required
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
                    value={exchangeT}
                    label="Select"
                    style={{ width: '86%', boxShadow: 'none' }}
                    sx={{
                      width: 300,
                      '.MuiOutlinedInput-notchedOutline': {
                        borderRadius: '0px',
                        height:'54px',
                        border:'1px solid hsl(0deg 0% 44% / 63%) !important',
                        borderColor:exchangeTError==true ? '#dc3545 !important' : 'unset'
                      },
                      ".MuiOutlinedInput-input": {
                        color: "white !important",
                         fontSize: "15px",
                        //  backgroundColor:'white',
                         paddingBottom:'13px',
                         paddingRight:'61% ',
                         paddingTop:'12px',
                    },
                  //   ".MuiOutlinedInput-notchedOutline": {
                  //      height:"50px"
                  // },
                      '.MuiInputLabel-root': {
                        color: 'grey !important'
                      },
                      '.MuiSelect-icon': {
                        fill: 'grey !important'
                      }
                    }}
                    onChange={(e) => {
                      setExchangeTError(false)
                      setExchangeT(e.target.value)
                    }}
                  >
                    <MenuItem value={'binance'}>Binance</MenuItem>
                    <MenuItem value={'FTX'}>FTX</MenuItem>
                  </Select>
                   {exchangeTError && <span style={{color:'#dc3545', fontSize:'.875em',marginTop:'.25rem', marginLeft:'-2rem'}}>Exchange Type Required</span>}
                  {/* {exchangeTError===true ? <span>exchange type is required</span> : <></>} */}
                </FormControl>
             
                <Form.Label htmlFor="key" className={cx('custom-form-box', { 'focus-add': exAccess })}
                  style={{ width: '72%', marginLeft: '15%' }}
                >
                  <Form.Control
                    type="text"
                    id="key"
                    name="access_key"
                    placeholder="Access-key"
                    onChange={(event) => setExAccess(event.target.value)}
                     required
                  />
                  <Form.Control.Feedback type="invalid">
                    Access Key Required.
                  </Form.Control.Feedback>
                </Form.Label>
                <Form.Label htmlFor="key" className={cx('custom-form-box', { 'focus-add': exApi })}
                  style={{ width: '72%', marginLeft: '15%' }}
                >
                  <Form.Control
                    type="text"
                    id="key"
                    name="api_key"
                    placeholder="Secret-key"
                    onChange={(event) => setExApi(event.target.value)}
                     required
                    style={{ color: 'white' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Secret Key Required.
                  </Form.Control.Feedback>
                </Form.Label>
                <Button
                  type="submit"
                  variant=""
                  className="btn-gray"
                  style={{
                    width: '50%',
                    marginLeft: '25%',
                    color: 'white',
                    boxShadow: 'none'
                  }}
                >
                  Save
                </Button>
              </Form>
            </Modal.Body>
            {spaceError ? (
            <Snackbar
              open={spaceError}
              // autoHideDuration={4000}
              onClose={() => setSpaceError(false)}
              anchorOrigin={{
                vertical: "top",
                 horizontal: "center"
             }}
            >
              <Alert
                onClose={() => setSpaceError(false)}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Please enter valid input
              </Alert>
            </Snackbar>
          )
            : (
              <></>
              )}
            {alertExch
            ? (
              <Snackbar
                open={alertExch}
                onClose={()=>setAlertExch(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
              >
                <Alert
                  onClose={()=>setAlertExch(false)}
                  severity="success"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Exchange added successfully
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
              {alertInvalidKey
            ? (
              <Snackbar
                open={alertInvalidKey}
                onClose={()=>setAlertInvalidKey(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
               sx={{width:'20em'}}
              >
                <Alert
                  onClose={()=>setAlertInvalidKey(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Access Key And Secret Key are Invalid
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
              {alertInvalidSecretKey
            ? (
              <Snackbar
                open={alertInvalidSecretKey}
                onClose={()=>setAlertInvalidSecretKey(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
               sx={{width:'20em'}}
              >
                <Alert
                  onClose={()=>setAlertInvalidSecretKey(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                Secret Key is Invalid
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
              {alertInvalidAccessKey
            ? (
              <Snackbar
                open={alertInvalidAccessKey}
                onClose={()=>setAlertInvalidAccessKey(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
               sx={{width:'20em'}}
              >
                <Alert
                  onClose={()=>setAlertInvalidAccessKey(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Access Key is Invalid
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
              {alertAccessKeyAlreadyExist
            ? (
              <Snackbar
                open={alertAccessKeyAlreadyExist}
                onClose={()=>setAlertAccessKeyAlreadyExist(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
               sx={{width:'20em'}}
              >
                <Alert
                  onClose={()=>setAlertAccessKeyAlreadyExist(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Access Key Already Exists
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
              {alertSecretKeyAlreadyExist
            ? (
              <Snackbar
                open={alertSecretKeyAlreadyExist}
                onClose={()=>setAlertSecretKeyAlreadyExist(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
               sx={{width:'20em'}}
              >
                <Alert
                  onClose={()=>setAlertSecretKeyAlreadyExist(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Secret Key Already Exists
                </Alert>
              </Snackbar>
              )
            : (
              <></>
              )}
               {alertAlreadyExist
            ? (
              <Snackbar
                open={alertAlreadyExist}
                onClose={()=>setAlertAlreadyExist(false)}
                anchorOrigin={{
                  vertical: "top",
                   horizontal: "center"
               }}
               sx={{width:'20em'}}
              >
                <Alert
                  onClose={()=>setAlertAlreadyExist(false)}
                  severity="error"
                  sx={{
                    width: '100%',
                    backgroundColor: 'white',
                    color: 'black'
                  }}
                >
                  Access Key And Secret Key Already Exists
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

export default ModalToAddExchangeValue;