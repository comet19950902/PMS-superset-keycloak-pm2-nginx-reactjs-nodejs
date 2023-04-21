import React, { useEffect, useState } from 'react'
import { Col, Image, Row, Modal } from 'react-bootstrap'
import '../../common/Modal.css'
import axios from 'axios'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from '../../store/Dashboard/Sidebar'
import Button from 'react-bootstrap/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import check from '../../assets/images/check.png'
const ViewWalletsAdmin = () => {
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
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
  const location = useLocation()
  const getId = '39d9a7d0-025c-44d3-9209-99c6c1f5aa8b'
  console.log(location)
  const userId = location.pathname.slice(23)
  console.log(userId)
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
  const loadFunctionGetAllWallets = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/get_wallets', {
        params: { userId }
      })
      .then((response) => {
        setResult2(response.data)
        // refresh_wallet()
      })
  }
  const wallet_data = result2?.[0]?.walletId
  console.log(wallet_data)
  console.log(getId)
  console.log(userId)
  const assets = async () => {
    console.log('Data')
    const config = {
      method: 'get',
      url: '${process.env.REACT_APP_BASE_URL}/admin/getAddressofUsersWallet',
      params: {

        admin_id: getId,
        user_id: userId,
        wallet_id: '4a47bdd9-a3c5-4ef9-b584-85042ca5aa8c'
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
    console.log(dataId)
    console.log(getId)
    const config = {
      method: 'delete',
      url: '${process.env.REACT_APP_BASE_URL}/admin/getAddressofUsersWallet',
      params: {
        walletId: dataId,
        userId: getId
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
    loadFunctionGetAllWallets()
    assets()
  }, [])
  console.log(result)
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
      dataField: 'address_id',
      text: 'Name',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <span></span>
            <Tooltip title={row.address_id}>
              <IconButton style={{ color: 'white', fontSize: '12px' }}>
                {(row.address_id).slice(0, 6)}...
              </IconButton>
            </Tooltip>
          </>
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
            <div className="d-flex justify-content-around" style={{ marginRight: '48%' }} >
              <Link to='/PMS/AddWallet' style={{ color: 'white', textDecoration: 'none', marginLeft: '-48%' }} >Add Wallet</Link>
              <p
                // className="name-assets"
                style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', color: 'red', marginRight: '11%', marginLeft: '2%' }}
                onClick={() =>
                  handleShow(row.wallet_id)
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
    },
    {
      dataField: 'Details',
      text: 'View Details',
      formatter: (cell, row) => {
        return (
          <Link to={`/PMS/MainManageAssetsSubWallets/:${row.wallet_id}`} className="status">
            <Image src={check} alt="" />
          </Link>
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
                <Modal.Footer style={{ backgroundColor: '#222429', borderTop: 'none', paddingRight: '34%', marginTop: '-3%' }}>

                  <Button variant="danger" style={{ width: '25%', marginBottom: '2%' }}
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

export default ViewWalletsAdmin
