import React, { useEffect, useState } from 'react'
import { Col, Row, Modal } from 'react-bootstrap'
import '../../common/Modal.css'
import axios from 'axios'
import CommonTable from '../../common/CommonTable/CommonTable'
import Header from '../../common/Header/Header'
import { Link, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import check from '../../assets/images/check.png'
import SidebarAdmin from './SidebarAdmin'
import Switch from '@mui/material/Switch'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import SidebarIconsAdmin from './SidebarIconsAdmin'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Alert, TextField } from '@mui/material'
import filterFactory, { selectFilter, Comparator } from 'react-bootstrap-table2-filter'
const ViewExchangesDetail = () => {
  const getId = localStorage.getItem('sub_Id')
  const location = useLocation()
  const portfolio_id = location.pathname.slice(26)
  console.log(portfolio_id)
  const [result, setResult] = useState([])
  const [dataId, setDataId] = useState('')
  const [wallet, setWallet] = useState('')
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [m, setm] = useState('-10%')
  const [wid, setWid] = useState('159%')
  const [mar, setmar] = useState('0%')
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
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
      console.log(showDashboard)
      console.log(newWidth)
    } else {
      setNewWidth('10')
      setm('2.5%')
      setWid('159%')
      setmar('0%')
      setW('100%')
      setMargin('22%')
      setWidthData('6%')
      console.log(showDashboard)
      console.log(newWidth)
    }
  }
  const handleShow = (row) => {
    console.log(row)
    // setDataId(id);
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
      url: '${process.env.REACT_APP_BASE_URL}/getExchangeData',
      params:
      {
        portfolio_id
      }
    }
    await axios(config).then(function (response) {
      console.log(response)
      setResult(response.data)
    }).catch(function (error) {
      console.log(error)
    })
  }
  console.log(result)
  const delete_asset = async (dataId) => {
    console.log(dataId)
    console.log(getId)
    const config = {
      method: 'delete',
      url: '${process.env.REACT_APP_BASE_URL}//deleteWallet',
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
    assets()
  }, [])
  const result1 = []
  //   const re = [...new Set(result.map(item => item.exchange_name))];
  // result1.push({'exchange_name':re[0]})
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
  const selectOptions = [
    { value: 0, label: 'good' },
    { value: 1, label: 'Bad' },
    { value: 2, label: 'unknown' }
  ]
  const columns = [
    {
      dataField: 'assetName',
      text: 'Name',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p className="name-assets">
            {/* {console.log(row.wallet_name)} */}
            {row.assetName}
          </p>
        )
      }
    },
    // {
    //   dataField: 'quality',
    //   text: 'Product Quailty',
    //   // formatter: cell => selectOptions.find(opt => opt.value === cell).label,
    //   filter: selectFilter({
    //     options: selectOptions
    //   })
    // },
    //   {
    //     dataField: "",
    //     text: "View Details",
    //     formatter: (cell,row) => {

    //       return (
    //         <Link to={`/PMS/ViewExchangesDetail/:${row.portfolio_id}`}  className="status">
    //           <Image src={check} alt="" />
    //         </Link>
    //       );
    //     },
    //   },
    // {
    //   dataField: "apikey",
    //   text: "API Key",
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <Tooltip title={row.apikey}>
    //           <IconButton style={{ color: "white", fontSize: "17px",marginBottom:"4%" }}>
    //             {(row.apikey).slice(0, 7)}.....
    //           </IconButton>
    //         </Tooltip>
    //     );
    //   },
    // },
    {
      dataField: 'accountType',
      text: 'Account Type',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p className="name-assets">
            {/* {console.log(row.wallet_name)} */}
            {row.accountType}
          </p>
        )
      }
    },
    {
      dataField: 'free',
      text: 'Free',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p className="name-assets">
            {/* {console.log(row.wallet_name)} */}
            ${row.free}
          </p>
        )
      }
    }
  ]

  const [bigData, setBigData] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setBigData(false)
  }
  //

  return (
    <div>
      <div className="mainmyassets" style={{ overflow: 'hidden', height: '100vh' }} >
        <Row>
          {/* {showDashboard === true ? <SidebarAdmin /> : <SidebarIconsAdmin />} */}
          <Col lg={12}
          // style={{marginLeft:"4%"}}
          >
            <Header />
            {/* {showDashboard === true ? (<KeyboardDoubleArrowLeftIcon
            sx={{ fontSize: 30 }}
            onClick={handleToggle}
            style={{ color: "white", marginLeft:"-2%", marginTop: "1%" }}
          />) : (<KeyboardDoubleArrowRightIcon
            sx={{ fontSize: 30 }}
            onClick={handleToggle}
            style={{ color: "white", marginLeft:"-13.5%" ,marginTop: "-1.2%" }}
          />)} */}
            <div
              className="d-flex justify-content-between"
              style={{ marginRight: '5%' }}
            >
              <Col lg={12}>
                <div
                // onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{postion:"absolute",height:"28vh",marginLeft:"-5%"}}
                >
                  {/* {isHovering ? */}
                  {/* <> */}
                  <div className="d-flex justify-content-evenly">
                    {/* <h3 style={{color:"white",fontSize:"18px",marginLeft:"2%"}}>Navigation Bar</h3> */}
                    {/* <Switch
                   onChange={()=>{
                     console.log("Clicked")
                     setBigData(!bigData)
                     console.log(bigData)
                    }}
                   sx={{marginLeft:"2%",marginTop:"-0.5%"}}

                 /> */}
                  </div>
                  <div

                  //  style={{marginTop:(getId=="951e7fdc-6ea9-4e59-8f49-98a4349ca20d")? "0%":"0%"}}
                  >
                    <SidebarAdmin />
                  </div>
                  {/* </>
             :<SidebarIconsAdmin />} */}
                </div>

                <div
                  id="abc"
                  style={{
                    // overflowY: "scroll",
                    // marginLeft:bigData && isHovering ?"15%":"0%",
                    // width:(bigData==true && isHovering==true) ?"85%":"100%",
                    marginLeft: '4%',
                    height: '100vh',
                    width: '100%'
                  }}
                >
                  <div className="d-flex justify-content-center"
                    style={{ marginTop: '3%' }}
                  >
                    <span
                    //  style={{  marginTop:'3.5%',
                    //   marginLeft:'9%'}}
                    >
                      <h5 style={{ fontSize: '22px', color: 'white', marginLeft: '119%' }}>
                        Exchanges
                      </h5>
                    </span>
                    <Link to={'/PMS/ViewExchanges'} style={{
                      marginLeft: '88%'
                      //  marginBottom:'-4%',
                    }}>
                      <ArrowCircleLeftOutlinedIcon style={{ color: 'white', fontSize: '25px' }} />
                    </Link>

                  </div>
                  {/* <h3 style={{ marginBottom:'-5%',marginLeft:'5%',color:'white',fontSize: "18px" }}>Investments</h3> */}
                  {/* <div
                        className="dashheading"
                        style={{

                          marginBottom: "-8%"
                          }}
                      > */}
                  {/* <TextField
          id="standard-search"
          label="Search"
          type="search"
          // label="Filled success" variant="filled" color="#e8eaf6" focused
          // className="btn btn-gray"
          variant="standard"
          style={{boxShadow:'none', width:'155px',height:'48px', marginTop:'-14%', marginLeft:'71%',borderRadius:'18px'
          }}
          // sx={{
          //   ".css-x2l1vy-MuiInputBase-root-MuiOutlinedInput-root": {
          //     color: "white",
          //   },
          //   ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
          //     borderColor:'white'
          //   },
          //   '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root':{
          //     color:'white !important'
          //   },
          //   '.css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
          //     borderColor: 'white !important'
          //   },
          //   '.css-1c2i806-MuiFormLabel-root-MuiInputLabel-root':{
          //     color: 'white !important'
          //   },
          //   '.css-1ptx2yq-MuiInputBase-root-MuiInput-root':{
          //    color: 'white !important'
          //   },
          //   '.css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root':{
          //     color:'white !important'
          //   },
          //   '.css-1ptx2yq-MuiInputBase-root-MuiInput-root:after': {
          //     borderBottom: '2px solid grey !important '
          //   },
          //   '.css-1ptx2yq-MuiInputBase-root-MuiInput-root:before':{
          //    borderBottom: '2px solid white !important'
          //   },
          //   '.css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':{
          //     color: 'white !important'

          //    } ,
          //    '.css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root':{
          //     borderRadius: '15px !important'
          //    },
          //    '#demo-simple-select:active':
          //    {
          //     border: ',blue !important'
          //    },
          //    '.css-i4bv87-MuiSvgIcon-root':{
          //     fill: 'white'
          //    },

          //    '.css-hfutr2-MuiSvgIcon-root-MuiSelect-icon':{
          //     fill: 'white !important'
          //    },

          //     '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
          //         color:'white !important'
          //     },
          //   '.css-1d3z3hw-MuiOutlinedInput-notchedOutline':{
          //     borderColor:'white !important'
          //   }
          // }}
          // value={value}
          // onChange={(event)=>{
          //   console.log(event.target.value, data)
          //    setSea(event.target.value)
          //   var x= data?.filter(i=>i.assetName.toLowerCase().includes(event.target.value.toLowerCase()))
          //   // rar.name.toLowerCase().includes(event.target.value.toLowerCase());
          //   console.log(x)
          //    setSearch(x)
          // }}
          */}
                  <Modal show={show} onHide={handleClose} style={{ width: '35%', marginTop: '20%', overflow: 'hidden', marginLeft: '39%', backgroundColor: '#222429', height: '23%', border: '1px solid grey', borderRadius: '15px' }}>
                    <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
                      <Modal.Title style={{ color: 'white', fontSize: '18px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this exchange ?</Modal.Title>
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
                  {/* </div> */}
                  {/* {sea ?
                  <CommonTable data={search} columns={columns} />
                  : */}

                  <CommonTable data={result} columns={columns} />

                  {/* } */}
                  {/* </div>
                       <CommonTable data={data2} columns={columns2}/> */}
                </div>
                {/* </div>
                       <CommonTable data={data} columns={columns}/> */}

              </Col>
            </div>
            {/* <div className="maindashinfo">
            <Modal show={show} onHide={handleClose} style={{width:"35%",marginTop:"20%",overflow:'hidden',marginLeft:"39%", backgroundColor:"#222429",height:"22%",border:"1px solid grey",borderRadius:"15px"}}>
        <Modal.Header style={{backgroundColor:"#222429",border:"none"}}>
          <Modal.Title style={{color:"white",fontSize:"18px",marginTop:'-5%', marginLeft:'11%'}}>Are you sure you want to Delete this Asset ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer style={{backgroundColor:"#222429",borderTop:"none",paddingRight:"34%", marginTop:'-3%'}}>

          <Button variant="danger" style={{width:"25%",marginBottom:"2%"}}
            onClick={()=>{
                handleDeleteUpdate()
                handleClose()
            }
            }
          >
              Yes
          </Button>
          <Button variant="success" onClick={handleClose} style={{width:"25%"}}>
              No
          </Button>
        </Modal.Footer>
      </Modal>
                <div style={{marginTop:"8%",marginRight:"10%",marginBottom:"4%"}}>
                  <h2 style={{color:"white"}}>Exchanges</h2>
                  <CommonTable css="4%" data={data} columns={columns} />
                </div>
              </div> */}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ViewExchangesDetail
