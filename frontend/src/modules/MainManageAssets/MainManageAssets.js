import React, { useEffect, useState } from 'react'
import './MainManageAssets.css'
import axios from 'axios'
import { Col, Row } from 'react-bootstrap'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import { Link } from 'react-router-dom'
import Sidebar from '../../store/Dashboard/Sidebar'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../../common/Modal.css'
const MainManageAssets = () => {
  const getId = localStorage.getItem('sub_Id')
  console.log(getId)
  const [result, setResult] = useState([])
  const [dataId, setDataId] = useState('')
  const [wallet, setWallet] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = (id) => {
    console.log(id)
    setDataId(id)
    console.log(dataId)
    setShow(true)
  }
  const handleDeleteUpdate = () => {
    console.log(dataId)
    //    delete_asset(wal)
    delete_asset(dataId)
  }
  const handleSubmit = () => {
    console.log('Clicked')
  }
  // var userData={
  //     walletId:"w75"
  // }
  const assets = async () => {
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/getAllWalletsofUSer',
      params: {
        user_id: getId
      }
    }
    await axios(config).then(function (response) {
      console.log(response)
      setResult(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
  const delete_asset = async (dataId) => {
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/delete_wallet',
      params: {
        walletId: dataId
      }
    }
    await axios(config).then(function (response) {
      console.log(response)

      // setResult(response.data)
    }).catch(function (error) {
      console.log(error)
    })
    await assets()
  }
  useEffect(() => {
    assets()
  }, [])
  //  console.log(result)
  const data = result
  // const data = [
  //   {
  //     id: 1,
  //     name: ` Asset 1`,
  //   },
  //   {
  //     id: 2,
  //     name: "Asset 2",
  //   },
  //   {
  //     id: 3,
  //     name: "Asset 3",
  //   },
  //   {
  //     id: 4,
  //     name: "Asset 4",
  //   },
  //   {
  //     id: 5,
  //     name: "Asset 5",
  //   },
  //   {
  //     id: 6,
  //     name: "Asset 6",
  //   },
  // ];
  const columns = [
    {
      dataField: 'wallet_name',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p className="name-assets">
            <span></span>
            {/* {console.log(row.wallet_name)} */}
            {row.wallet_name}
          </p>
        )
      }
    },

    {
      dataField: '',
      text: 'Actions',
      formatter: (cell, row) => {
        // console.log(row)
        return (
          <>

            {/* <p>Manage Asset</p> */}
            <div className="d-flex justify-content-around" style={{ marginRight: '59%' }} >
              <Link to='/PMS/AddWallet' style={{ color: 'white', textDecoration: 'none', marginLeft: '-48%' }} >Add Asset</Link>
              <p
                // className="name-assets"
                style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', color: 'red', marginRight: '11%' }}
                onClick={() =>
                  handleShow(row.walletId)
                }
              >
                Delete Asset
              </p>
            </div>

            {/* <div className="actionbtns" style={{marginTop:'-21px', marginLeft:'120px'}}  */}
            {/* onClick={()=> */}
            {
      //     handleShow(row.walletId)
      //  }}
      //  onClick={()=>{
      //     console.log(row?.walletId)
      //   var wal = row?.walletId
      //    delete_asset(wal)

      // }}
      // >

            /* <Link to='/PMS/MainManageAssets' style={{color:'red'}}>Remove Asset</Link> */}

            {/* </div> */}
          </>
        )
      }
    }
  ]

  return (
    <div>
      <div className="mainmyassets">
        <Row>
          <Col lg={2}>
            <Sidebar />
          </Col>
          <Col lg={10}>
            <Header />
            <hr style={{ backgroundColor: 'darkgrey', width: '100%', marginLeft: '2%' }} />
            <div className="maindashinfo">
              <Modal show={show} onHide={handleClose} style={{ width: '35%', marginTop: '20%', overflow: 'hidden', marginLeft: '39%', backgroundColor: '#222429', height: '22%', border: '1px solid grey', borderRadius: '15px' }}>
                <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
                  <Modal.Title style={{ color: 'white', fontSize: '18px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this Asset ?</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-4%' }}>

                  <Button variant="danger" style={{ width: '25%' }}
                    onClick={() => {
                      handleDeleteUpdate()
                      handleClose()
                    }
                    }
                  >
                    Yes
                  </Button>
                  <Button variant="success" onClick={handleClose} style={{ width: '25%' }}>
                    No
                  </Button>
                </Modal.Footer>
              </Modal>
              <div style={{ marginTop: '8%', marginRight: '10%', marginBottom: '4%' }}>
                <CommonTable css="4%" data={data} columns={columns} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default MainManageAssets
