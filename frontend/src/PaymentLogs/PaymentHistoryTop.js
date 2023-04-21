import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../common/CommonTable/CommonTable.css'
import moment from 'moment'
import CommonTableInvH1 from '../common/CommonTable/CommonTableInvH1'
let res=[]
function PaymentHistoryTop (props) {
  const [resultAuditHistory, setResultAuditHistory] = useState([])
  useEffect(()=>{
console.log('abc')
  },[resultAuditHistory])
  const resultData = async () => {
    let res=[]
    
    await axios.get(`${process.env.REACT_APP_BASE_URL}/getPaymentlogs`
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
        setAlertNoRecord(true)
        setResultAuditHistory([])
      }
      for(let a of temp2){
        if(a.pay_id==props.pay_id.payment_id ){
            res.push(a)
        }
      }
      setResultAuditHistory(res)
    })  
  }
 
  // console.log(resultAuditHistory)
  // const newfilterres = resultAuditHistory.filter(i => i.previous_purchase_price != i.new_purchase_price || i.previous_quantity != i.new_quantity )
  // console.log(newfilterres)
  // 
 useEffect(()=>{
  resultData()
 },[])
 
  // console.log(resultAuditHistory)
  const [serialNumber, setSerialNumber] = useState(0)
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
          <span style={{whiteSpace:'nowrap',textAlign:'center'}}
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
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
          <span style={{whiteSpace:'nowrap',textAlign:'center'}}
          >
            {row.sender}
          </span>
        </>
        )
      }
    }, 
    {
      dataField: 'reciever',
      text: 'Receiver',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
          <span style={{whiteSpace:'nowrap',textAlign:'center'}}
          >
            {row.reciever}
          </span>
        </>
        )
      }
    }, 
    {
      dataField: 'payment_type',
      text: 'Payment Type',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
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
          <span style={{color:'#00ff00',textAlign:'center'}}>
            {parseInt(row.amount).toLocaleString()}
          </span> : 
           <span style={{color:'#ff0000',textAlign:'center'}}>
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
          <span style={{textAlign:'center'}}
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
          <span style={{color:'#00ff00',textAlign:'center'}} >
            {parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </span> : 
          <span style={{color:'#ff0000',textAlign:'center'}}>
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
            <span
            >
              {row.comment}
            </span>
          )
        }
      },
    {
        dataField: 'usertype',
        text: 'Username',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <>
            { row.created_by==null && row.updated_by==null && row.deleted_by==null ? <span style={{marginLeft:'6em'}}>-</span> :
            row.created_by!==""  && row.deleted_by=="" ? 
                <li  style={{
                        color: '#FFC107', textAlign:'center', marginLeft:'-1em', whiteSpace:'nowrap',
                      }}>
                <span style={{color:'#FFC107'}}>Created by- </span><span style={{color:'white'}}>{row.created_by}</span></li> :
                row.updated_by!="" ?
                <li style={{
                  color: '#FFC107',marginLeft:'-1em',whiteSpace:'nowrap'
                }}>
                <span style={{color:'#FFC107'}}>Updated by- </span><span style={{color:'white'}}>{row.updated_by}</span></li> : 
                row.deleted_by!=="" ?
                <li style={{
                  color: '#FFC107',marginLeft:'-1em',whiteSpace:'nowrap'
                }}><span style={{color:'#FFC107'}}>Deleted by- </span><span style={{color:'white'}}>{row.deleted_by}</span></li> :
                '-'}
            </>
          )
        }
      }
  
    // {
    //   dataField: 'comment',
    //   text: 'Remarks',
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <span
    //       >
    //         {row.comment}
    //       </span>
    //     )
    //   }
    // },
  ]
  return ( 
    <div>
      <CommonTableInvH1 data={resultAuditHistory} columns={columns} />
    </div>
  )
}

export default PaymentHistoryTop
