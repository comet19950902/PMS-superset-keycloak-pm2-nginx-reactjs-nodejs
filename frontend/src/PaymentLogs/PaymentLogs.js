import React,{useEffect,useState} from "react";
import axios from "axios";
import moment from 'moment';
import Spinner from '../common/spinner'
import { Link, useLocation } from 'react-router-dom'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchBox from "../common/SearchBox/SearchBox";
import Header from "../common/Header/Header";
import CommonTable from "../common/CommonTable/CommonTable";
import SidebarAdmin from "../Admin/DashboardAdmin/SidebarAdmin";
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap'
import CommonTableInvTop from "../common/CommonTable/CommonTableInvTop";
function PaymentLogs() {
    const [paymentData,setPaymentData]=useState([]);
    const [search, setSearch] = useState([]);
    const [sea, setSea] = useState('')
    const [loading,setLoading]=useState(false)
      const [alertNoRecord,setAlertNoRecord]=useState(false)
    const handlePaymentLogsData=async()=>{
      setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/get_payment`
        ).then(function (response) {
          console.log(response.data)
          const temp2 = response.data?.map(record => {
            let type
            if(record.currency==="BTC" || record.currency==="ETH" || record.currency==="USDT" || record.currency==="USDC"){
              type="Crypto"
            }else{
               type="FIAT"
            }
            let res = parseFloat(record.amount) / parseFloat(record.exchange_rate)
            return { ...record, payment_type:type, result:res, amount:parseFloat(record.amount), exchange_rate:parseFloat(record.exchange_rate) }
          })
          if(temp2.length==0){
            setLoading(false)
            setAlertNoRecord(true)
            setPaymentData([])
          }
          temp2.sort((a, b) => {
            const x = new Date(a.date_updated).getTime() / 1000
            const y = new Date(b.date_updated).getTime() / 1000
            return x > y ? -1 : x < y ? 1 : 0
          })

          // let r2 =[...new Map(temp2.map(x=>[(x.pay_id),x])).values()]

         setLoading(false)
          setPaymentData(temp2)
        })
      }
    useEffect(async()=>{
            await handlePaymentLogsData()
    },[])
    const columns = [
      // {
      //   dataField: 'payment',
      //   text: 'Name',
      //   sort: true
      // },
      {
        dataField: 'date_updated',
        text: 'Date',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <>
            <span style={{whiteSpace:'nowrap'}}
            >
              {moment(row.date_updated).format('Do MMMM YYYY')}
            </span>
          </>
          )
        }
      },
      {
        dataField: 'sender',
        text: 'Sender',
        sort: true,
      }, 
      {
        dataField: 'reciever',
        text: 'Receiver',
        sort: true,
      }, 
      {
        dataField: 'payment_type',
        text: 'Payment Type',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <span style={{ textAlign:'center'}}
            >
              {row.currency==="BTC" || row.currency==="ETH" || row.currency==="USDT" || row.currency==="USDC" ? "Crypto" : "FIAT"}
            </span>
          )
        }
      },
      {
        dataField: 'amount',
        text: 'Amount',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <>
            {parseInt(row.amount)>0 ?
            <span style={{color:'#00ff00', textAlign:'center'}}>
              {parseInt(row.amount).toLocaleString()}
            </span> : 
             <span style={{color:'#ff0000', textAlign:'center'}}>
             {parseInt(row.amount).toLocaleString()}
           </span>}
            </>
          )
        }
      },
      {
        dataField: 'currency',
        text: 'Currency',
        sort: true,
      }, 
      {
        dataField: 'exchange_rate',
        text: 'Exchange Rate($)',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <span style={{ textAlign:'center'}}
            >
              {parseFloat(row.exchange_rate).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
            </span>
          )
        }
      },
      {
        dataField: 'result',
        text: 'Result($)',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          const res = parseFloat(row.amount) / parseFloat(row.exchange_rate)
          // console.log(res)
          return (
            <>
            {parseFloat(row.result)>0 ?
            <span style={{color:'#00ff00', textAlign:'center'}} >
              {parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
            </span> : 
            <span style={{color:'#ff0000', textAlign:'center'}}>
              {parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
            </span>}
            </>
          )
        }
      }, 
      {
        dataField: 'comment',
        text: 'Remarks',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <span style={{textAlign:'center'}}
            >
              {row.comment}
            </span>
          )
        }
      },
    ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Row className="d-flex justify-content-center">
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Payment Logs</h3>
              </span>
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = paymentData?.filter((i) =>i.new_comment!=null &&
                    i.new_comment
                      .includes(event.target.value.toLowerCase())
                  )
                  if(x.length==0){
                        setAlertNoRecord(true)
                         setSearch([])
                  }
                  setSearch(x)
                }}
              />
               <Link
                className="p-2"
                to='/PMS/payments' style={{marginTop:'.5%',right:'-3px',position:'fixed'}} >
                <ArrowCircleLeftOutlinedIcon style={{ color: '#FFC107', fontSize: '27px' }} />
              </Link>
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
                <CommonTableInvTop
                  data={search}
                  columns={columns}
                />
                )
              : (
                <CommonTableInvTop
                loading={loading}
                  data={paymentData}
                  columns={columns}
                />
                )}
          </Col>
        </Row>
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
      </Container>
    </React.Fragment>
  );
}

export default PaymentLogs;