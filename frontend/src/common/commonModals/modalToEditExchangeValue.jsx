import React,{useEffect, useState} from 'react';
import { Modal,Button,Form } from 'react-bootstrap';
import { Alert, Snackbar,IconButton } from '@mui/material'
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import { setOpenEditExchangeModalStatus } from '../../Redux/appSlice';
import CloseIcon from '@mui/icons-material/Close'
import cx from 'classnames';

function ModalToEditExchangeValue({row}) {

    const dispatch=useDispatch();
    // console.log("selected row",row);
        const [spaceError, setSpaceError]= useState(false)
        const [alreadyExist,setAlreadyExist]=useState(false)
    const {openEditExchangeModalStatus}=useSelector((store)=>store.app); 
    const [alertUpdate,setAlertUpdate] =useState(false);
    const [result,setResult]=useState([])
    const [rowEdit,setRowEdit]=useState(row);
    const [validated, setValidated] = useState(false);

    const exchange = async () => {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/getExchangeData`,
        params:
        {
          portfolio_id:row.portfolio_id
        }
      }
      await axios(config).then(function (response) {
        setResult(response.data)
      }).catch(function (error) {
        // console.log(error)
      })
    }
    useEffect(()=>{
      exchange()
    },[])
    const handleUpdateForm=async(e)=>{
      // console.log(rowEdit)
       e.preventDefault()
      setValidated(true)
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        // e.preventDefault()
        e.stopPropagation()
      }
      else if((result.filter(i=>i.exchange_name==rowEdit.exchange_name)).length>0){
        // console.log('already exist')
        setAlreadyExist(true)
        setTimeout(() => setAlreadyExist(false), 3000)
      }
      else if((result.filter(i=>i.exchange_name==rowEdit.exchange_name.trim())).length>0  ){
        // console.log('already exist')
        setAlreadyExist(true)
        setTimeout(() => setAlreadyExist(false), 3000)
      }
      else if( rowEdit.exchange_name.trim()=='' ) {
        // console.log('no')
        setSpaceError(true)
              setTimeout(() => setSpaceError(false), 3000)
      }else{
        // console.log('no',result.filter(i=>i.exchange_name==rowEdit.exchange_name))
        const config = {
          method: 'post',
          url: `${process.env.REACT_APP_BASE_URL}/updateExchange`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            apikey: rowEdit.apikey,
            exchange_name: rowEdit.exchange_name,
          }
        }
        await axios(config)
          .then(function (response) {
            // console.log(response)
           if(response.status===200)
           {
            setAlertUpdate(true)
            setTimeout(() => {
              setAlertUpdate(false)
              dispatch(setOpenEditExchangeModalStatus(false))
            }, 2000)
           }
          })
          .catch(function (error) {
            // console.log(error)
          })
    }
  }
    // console.log(rowEdit)
  return (
    <>
         <Modal
        show={openEditExchangeModalStatus}
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
              onClick={() => dispatch(setOpenEditExchangeModalStatus(false))}
            >
              <CloseIcon />
            </IconButton>
          </Modal.Header>
          {alertUpdate
            ? (
              <Snackbar
                open={alertUpdate}
                anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
              >
              <Alert
              severity="success"
              sx={{
                width: '100%',
                backgroundColor: 'white',
                color: 'black'
              }}
            >
              Exchange Updated Successfully
            </Alert> 
              </Snackbar>
            )
            : (
              <></>
            )}
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
               {alreadyExist ? (
            <Snackbar
              open={alreadyExist}
              // autoHideDuration={4000}
              onClose={() => setAlreadyExist(false)}
              anchorOrigin={{
                          vertical: "top",
                           horizontal: "center"
                       }}
            >
              <Alert
                onClose={() => setAlreadyExist(false)}
                severity="error"
                sx={{
                  width: '100%',
                  backgroundColor: 'white',
                  color: 'black'
                }}
              >
                Exchange name already exist
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
              onSubmit={handleUpdateForm}
            >
              <h4>
                Update Exchange
              </h4> 
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': rowEdit?.exchange_name
                })}
                style={{ width: '72%', marginLeft: '15%' }}
              >
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={rowEdit?.exchange_name}
                  placeholder="exchange"
                  onChange={(e) => setRowEdit({exchange_name:e.target.value,apikey:rowEdit.apikey,portfolio_id:rowEdit.portfolio_id})}
                  required
                  style={{ color: 'white' }}
                />
                <Form.Control.Feedback type="invalid">
                  Exchange Required.
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
    </>
  )
}

export default ModalToEditExchangeValue;