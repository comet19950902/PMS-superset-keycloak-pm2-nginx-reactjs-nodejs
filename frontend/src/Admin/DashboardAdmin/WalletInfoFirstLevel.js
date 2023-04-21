import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../common/CommonTable/CommonTable.css'
import CommonTableWalletInfoFirst from '../../common/CommonTable/CommonTableWalletInfoFirst'
import moment from 'moment'

function WalletInfoFirstLevel (props) {
    let res=[]
    if(props.address_id.address_type=='TRON'){
        res.push({'token':'TRX','rcv':parseFloat(props.address_id.amt_rcv_trx).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(props.address_id.send_amt_trx).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'total':parseFloat(parseFloat(props.address_id.amt_rcv_trx)-parseFloat(props.address_id.send_amt_trx)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.total_trx},
        {'token':'USDT','rcv':parseFloat(props.address_id.amt_rcv_usdt).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(props.address_id.amt_send_usdt).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'total':parseFloat(parseFloat(props.address_id.amt_rcv_usdt)-parseFloat(props.address_id.amt_send_usdt)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.total_usdt},
        {'token':'USDC','rcv':parseFloat(props.address_id.amt_rcv_usdc).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(parseFloat(props.address_id.amt_send_usdc).toFixed(2)).toLocaleString(),'total':parseFloat(parseFloat(props.address_id.amt_rcv_usdc)-parseFloat(props.address_id.amt_send_usdc)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.total_usdc}
        )
    } else if(props.address_id.address_type=='ETH'){
        res.push({'token':'ETH','rcv':parseFloat(props.address_id.amt_rcv_eth).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(props.address_id.send_amt_eth).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'total':parseFloat(parseFloat(props.address_id.amt_rcv_eth)-parseFloat(props.address_id.send_amt_eth)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.total_eth},
        {'token':'USDT','rcv':parseFloat(props.address_id.amt_rcv_usdt).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(props.address_id.amt_send_usdt).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'total':parseFloat(parseFloat(props.address_id.amt_rcv_usdt)-parseFloat(props.address_id.amt_send_usdt)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.total_usdt},
        {'token':'USDC','rcv':parseFloat(props.address_id.amt_rcv_usdc).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(props.address_id.amt_send_usdc).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'total':parseFloat(parseFloat(props.address_id.amt_rcv_usdc)-parseFloat(props.address_id.amt_send_usdc)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.total_usdc}
        )
    }else if(props.address_id.address_type=='BTC'){
        res.push({'token':'BTC','rcv':parseFloat(props.address_id.total_received).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'send':parseFloat(props.address_id.total_sent).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'total':parseFloat(parseFloat(props.address_id.total_received)-parseFloat(props.address_id.total_sent)).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, ''),'count':props.address_id.transaction}
        )
    }
    console.log(res)
  const [resultAuditHistory, setResultAuditHistory] = useState([])
  const resultData = async () => {
    let res=[]
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/getNewInvestment`,
      params: {
        portfolio_id: props.portfolio_id.portfolio_id,
        investment_name:props.portfolio_id.investment_name
      }
    }
    await axios(config).then(function (response) {
      console.log(response.data)
      if (response.data) {
        response.data.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      for(let a of response.data){
        if(a.investment_name===props.portfolio_id.investment_name){
            res.push(a)
        }
      }
      setResultAuditHistory(res)
    })
  }
  console.log(resultAuditHistory)
  // const newfilterres = resultAuditHistory.filter(i => i.previous_purchase_price != i.new_purchase_price || i.previous_quantity != i.new_quantity )
  // console.log(newfilterres)
//   useEffect(async () => {
//     await resultData()
//   }, [])
  console.log(resultAuditHistory)
  const [serialNumber, setSerialNumber] = useState(0)
  const columns = [
    {
      dataField: 'token',
      text: 'Token',
      sort: true,
    //   filter: textFilter({
    //     placeholder:'type',
    //   getFilter: filter => {
    //     typeIFilter = filter;
    //   }
    //   }),
    },
    {
        dataField: 'send',
        text: 'Total send',
        sort: true,
      //   filter: dateFilter({
      //     placeholder:'date',
      //   getFilter: filter => {
      //     dateIFilter = filter;
      //   }
      //   }),
        formatter: (cell, row, rowIndex, formatExtraData) => {
          return (
            <span style={{ color: 'white', fontSize: '14px',display:'block',paddingLeft:'5em',paddingRight:'5em' }}>
              ${row.send}
            </span>
          )
        }
      },
    {
      dataField: 'rcv',
      text: 'Total received',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace:'break-spaces' }}>
            ${row.rcv}
          </p>
        )
      }
    },
    
    {
      dataField: 'total',
      text: 'Balance',
      sort: true,
    //   filter: textFilter({
    //     placeholder:'quantity',
    //   }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{display:'block',paddingLeft:'5em',paddingRight:'5em'}}>
             {
            parseInt(row.total)>0 ? 
            <span style={{ color: "#00ff00" }}>{ '+'+'$'+row.total}</span>
            : parseInt(row.total)===0 ? 
            <span style={{ color: "#00ff00" }}>{ '$'+0 }</span>
           : 
            <span style={{ color: "#ff0000" }}>{ '-'+'$'+(row.total)?.split('-')[1]}</span>
          
        }
          </div>
        )
      }
    },
    {
      dataField: 'count',
      text: 'Transaction count',
      sort: true,
    //   filter: textFilter({
    //     placeholder:'purchase-price',
    //   }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px' }}>
        {row.count}
          </p>
        )
      }
    },
    
  ]
  return (
    <div>
       <CommonTableWalletInfoFirst data={res} columns={columns} /> 
    </div>
  )
}

export default WalletInfoFirstLevel
