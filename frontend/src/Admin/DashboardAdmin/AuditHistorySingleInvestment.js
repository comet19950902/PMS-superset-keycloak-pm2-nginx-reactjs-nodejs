import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../common/CommonTable/CommonTable.css'
import CommonTableInvH1 from '../../common/CommonTable/CommonTableInvH1.js'
import moment from 'moment'

function AuditHistorySingleInvestment (props) {
  // console.log(props.investment_id)
  const [resultAuditHistory, setResultAuditHistory] = useState([])
  const resultData = async () => {
    let res1=[]
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/gethistoryOfInvestment`,
      params: {
        investment_id: ((props.investment_id).investment_id).length>36 ? ((props.investment_id).investment_id).slice(0,36) : (props.investment_id).investment_id
      }
    }
    await axios(config).then(function (response) {
      //  console.log(response.data)
      // for(let a of response.data){
      //   if(a.buy_value==a.new_buy_value){
      //    res1.push(a)
      //   break;
      //   }else if(a.buy_value!=a.new_buy_value){
      //    res1.push(a)
      //   }
      //  }
      if (response.data) {
        response.data.sort((a, b) => {
          const x = new Date(a.new_date_of_investment_modified).getTime() / 1000
          const y = new Date(b.new_date_of_investment_modified).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
     for(let a of response.data){
      
      if(a.purchase_type==props.investment_id.purchase_type && a.sell_type==null){
        res1.push(a)
        // console.log(a)
      }
      else if(a.purchase_type==null && a.sell_type==props.investment_id.sell_type && a.comments===props.investment_id.comments){
        res1.push(a)
        // console.log(a)
      } 
     }
    //  let del_data={...res1.filter(i=>i.status=='InActive')}
    //  if(Object.values(del_data)[0]!=undefined){
    //   setResultAuditHistory([...res1,Object.values(del_data)[0]])
    //  }else{
      const temp =res1.map(rec=>{
        return {...rec, new_purchase_price: rec.purchase_type!=null ? parseFloat(rec.new_purchase_price) : parseFloat(rec.sell_nav),
        new_buy_value: rec.purchase_type!=null ? parseFloat(rec.new_buy_value) : parseFloat(parseFloat(rec.sell_nav)* parseInt(rec.new_quantity)),
        new_quantity: parseInt(rec.new_quantity)
        }
      })
      setResultAuditHistory(temp)
    //  }
    //  console.log()
      
    })
  }
  // console.log(resultAuditHistory)
  
  // console.log(newfilterres)
  useEffect(async () => {
    await resultData()
  }, [])
  // console.log(resultAuditHistory)
  const [serialNumber, setSerialNumber] = useState(0)
  const columns = [
    {
      dataField: '',
      text: 'S.No',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(rowIndex)
        return (
          <p style={{ color: 'white', textAlign:'center', marginLeft:'-2em'}}>
            {rowIndex + 1}
          </p>
        )
      }
    },
    // {
    //     dataField: "investment_name",
    //     text: "Name",
    //   },
    // {
    //   dataField: 'investment_type',
    //   text: 'Asset',
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white' }}>
    //         {row.investment_type}
    //       </p>
    //     )
    //   }
    // },
    //  {
    //   dataField: 'purchase_type',
    //   text: 'Type',
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <p style={{ color: 'white', fontSize: '14px' }}>
    //         {row.purchase_type==null ? row.sell_type : row.purchase_type}
    //       </p>
    //     )
    //   }
    // },
    {
      dataField: 'new_date_of_investment_modified',
      text: 'Date',
      sort: true,
      // sortingOrder:["asc"],
      formatter: (cell, row, rowIndex, formatExtraData) => {
        // console.log(row.updated_date);
        const date = new Date(row.new_date_of_investment_modified).toString()
        const newDate = new Date(date).getTime()
        const istDate = new Date(newDate)
        // console.log(newDate)
        // console.log(istDate)
        // var dd=date.getDate();
        // var mm=date.getMonth()+1;
        // var yy=date.getFullYear();
        // console.log(dd);
        // console.log(mm);
        // console.log(yy);
        return (
        

            <p style={{ color: 'white',textAlign:'center', marginLeft:'-2em' }}>
              {moment(row.new_date_of_investment_modified).format('Do MMMM YYYY, h:mm:ss a').split(',')[0]}<br/>
              {moment(row.new_date_of_investment_modified).format('Do MMMM YYYY, h:mm:ss a').split(',')[1]}
              {/* {dd}/{mm}/{yy} */}
            </p>

          // </p>
        )
      }
    },
    {
      dataField: 'new_quantity',
      text: 'Qty',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white',textAlign:'center', marginLeft:'-2em' }}>
            {parseInt(row.new_quantity)}
          </p>
        )
      }
    },
   {
      dataField: 'new_purchase_price',
      text: 'Price',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white',textAlign:'center', marginLeft:'-2em' }}>
            ${parseFloat(row.new_purchase_price).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
          </p>
        )
      }
    },
    {
      dataField: 'new_buy_value',
      text: 'Value',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <p style={{ color: 'white',textAlign:'center', marginLeft:'-2em'}}>
             ${parseFloat(row.new_buy_value).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')  } 
          </p>
        )
      }
    },
    // {
    //   dataField: "date_of_investment",
    //   text: "Created Date",

    // },
    
    {
      dataField: 'user_type',
      text: 'Username',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
          {row.created_by_name!==null  && row.deleted_by==null? 
              <li  style={{
                      color: '#FFC107', textAlign:'center'
                    }}>
              <span style={{color:'#FFC107'}}>Created by- </span><span style={{color:'white'}}>{row.created_by_name}</span></li> :
              row.updated_by_name!=null ?
              <li style={{
                color: '#FFC107',  textAlign:'center'
              }}>
              <span style={{color:'#FFC107'}}>Updated by- </span><span style={{color:'white'}}>{row.updated_by_name}</span></li> : 
              row.deleted_by!==null ?
              <li style={{
                color: '#FFC107',  textAlign:'center'
              }}><span style={{color:'#FFC107'}}>Deleted by- </span><span style={{color:'white'}}>{row.deleted_by}</span></li> :
              '-'}
          </>
        )
      }
    }

  ]
  return (
    <div>
      <CommonTableInvH1 data={resultAuditHistory} columns={columns} />
    </div>
  )
}

export default AuditHistorySingleInvestment
