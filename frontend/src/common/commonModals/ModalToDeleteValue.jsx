import React from 'react'
import { Modal,Button } from 'react-bootstrap';
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import { setOpenCommonModalDeleteStatus } from '../../Redux/appSlice';
function ModalDeleteExchangeValue({row}) {

    const dispatch=useDispatch();
    const {openCommonModalDeleteStatus}=useSelector((store)=>store.app);
    console.log("Row Delete",row);
    const handleDeleteUpdateModal = () => {
      console.log("selected row>>>>>>>>>>>>>",row)
        const config = {
          method: 'delete',
          url: `${process.env.REACT_APP_BASE_URL}/deleteExchangeData`,
          params: {
            api_key: row?.apikey
          }
        }
      axios(config)
        .then(function (response) {
          console.log(response)
          if(response.status===200)
          {
            setTimeout(() => {
              dispatch(setOpenCommonModalDeleteStatus(false))
            }, 2000)
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
      const handleClose=()=>{
        console.log("selected row>>>>>>>>>>>>>",row)
        dispatch(setOpenCommonModalDeleteStatus(false))
      }
      console.log("Row Delete",row);
  return (
    <>
        <Modal show={openCommonModalDeleteStatus}  style={{ width: '30rem', marginTop: '17rem', overflow: 'hidden', marginLeft: '35%', backgroundColor: '#222429', height: '8rem', border: '1px solid grey', borderRadius: '15px' }}>
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <Modal.Title style={{ color: 'white', fontSize: '16px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to delete this Exchange Item?</Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-3%' }}>
            <Button variant="success" style={{ width: '25%', marginBottom: '2%', backgroundColor: '#006400'  }}
              onClick={() => {
                console.log("PRINT!@#");
                handleDeleteUpdateModal()
              }
              }
            >
              Yes
            </Button>
            <Button variant="danger" onClick={handleClose} style={{ width: '25%',  backgroundColor: '#b30000' }}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

export default ModalDeleteExchangeValue;