import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../common/CommonTable/CommonTable.css'
import CommonTableInvH from '../../common/CommonTable/CommonTableInvH.js'
import moment from 'moment'
let res=[]
function InvestmentHistoryTop (props) {
  const [resultAuditHistory, setResultAuditHistory] = useState([])
  useEffect(()=>{
console.log('abc')
  },[resultAuditHistory])
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
      // console.log(response.data)
      if(props.days==30){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 30*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    } else if(props.days==90){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 90*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    } else if(props.days==180){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 180*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    } else if(props.days==365){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 365*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    } else if(props.days==1095){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 1095*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    }else if(props.days==1825){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 1825*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    } else if(props.days==3650){
         let d2 = Math.floor(new Date().getTime() / 1000);
       let d1 = d2 - 3650*86400
        let r1 = response.data.filter(
          (item) =>
            new Date(item.date_of_investment).getTime() / 1000 >= d1 &&
            new Date(item.date_of_investment).getTime() / 1000 <= d2 
        );
        console.log(r1)
      
      for(let a of r1){
        if(a.investment_name===props.portfolio_id.investment_name ){
            res.push(a)
        }
      }
      const temp = res?.map(rec=>{
        return {...rec, purchase_price:rec.purchase_type!=null ? parseFloat(rec.purchase_price) : parseFloat(rec.sell_nav),
        buy_value: rec.purchase_type!=null ? parseFloat(rec.buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.quantity)),
       quantity:parseInt(rec.quantity), date:rec.purchase_type!=null ? moment(rec.date_of_investment).format('YYYY-MM-DD') : moment(rec.sell_date).format('YYYY-MM-DD'),
       
      }
      })
      if (temp) {
        temp.sort((a, b) => {
          const x = new Date(a.updated_date).getTime() / 1000
          const y = new Date(b.updated_date).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      setResultAuditHistory(temp)
    }
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
    {
      dataField: 'investment_type',
      text: 'Asset',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', textAlign:'center',marginLeft:'-2em' }}>
            {row.investment_type}
          </p>
        )
      }
    },
    {
      dataField: 'purchase_type',
      text: 'Type',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', textAlign:'center',marginLeft:'-2em' }}>
            {row.purchase_type==null ? row.sell_type : row.purchase_type}
          </p>
        )
      }
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
    //   filter: dateFilter({
    //     placeholder:'date',
    //   getFilter: filter => {
    //     dateIFilter = filter;
    //   }
    //   }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px', whiteSpace: 'nowrap',textAlign:'center',marginLeft:'-2em' }}>
            {moment(row.date).format('Do MMMM YYYY') }
          </p>
        )
      }
    },
    {
      dataField: 'quantity',
      text: 'Qty',
      sort: true,
    //   filter: textFilter({
    //     placeholder:'quantity',
    //   }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px',textAlign:'center',marginLeft:'-2em' }}>
            {row.quantity}
          </p>
        )
      }
    },
    {
      dataField: 'purchase_price',
      text: 'Price',
      sort: true,
    //   filter: textFilter({
    //     placeholder:'purchase-price',
    //   }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white', fontSize: '14px',textAlign:'center',marginLeft:'-2em' }}>
        ${row.purchase_type!=null ? parseFloat(row.purchase_price).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') : parseFloat(row.sell_nav).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'buy_value',
      text: 'Value',
      sort: true,
    //   filter: textFilter({
    //     placeholder:'purchase-value',
    //   }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
          {
          row.currency=='USD' ?
          <p style={{ color: 'white', fontSize: '14px',textAlign:'center',marginLeft:'-2em' }}>
             ${parseFloat(row.buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')} 
          </p> : <p style={{ color: 'white',textAlign:'center',marginLeft:'-2em' }}>
                  ${parseFloat(row.buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
                  <p style={{ color: 'white' }}>{parseFloat(row.exchange_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')+' ' +row.currency?.toUpperCase()}</p> 
                </p>
          }
          </>
        )
        }
    },
    

  ]
  return ( 
    <div>
      <CommonTableInvH data={resultAuditHistory} columns={columns} />
    </div>
  )
}

export default InvestmentHistoryTop
