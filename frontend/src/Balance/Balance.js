import React, { useState, useEffect } from 'react'
import CommonTable from '../common/CommonTable/CommonTable'
import axios from 'axios'
import cx from 'classnames';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Header from '../common/Header/Header'
import moment from 'moment'
import Spinner from '../common/spinner'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin'
import 'react-phone-number-input/style.css'
import { Container, Row, Col,Modal,Form, Button } from 'react-bootstrap';
import { Link} from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Autocomplete from '@mui/material/Autocomplete'
import { TextField } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import SearchBox from '../common/SearchBox/SearchBox'
import { LegendToggleRounded } from '@mui/icons-material'
import { makeStyles } from '@material-ui/core/styles'
import { Label } from 'react-md';
import { setDayWithOptions } from 'date-fns/fp';
import Paper from '@material-ui/core/Paper'
const useStyles = makeStyles({
  paper: {
    background: 'rgb(31, 33, 37) !important',
    color: 'white !important'
  },
  option: {
    '&:hover': {
      backgroundColor: 'grey !important',
      color: 'white !important'
    }
  }
})
let entity_data=[]
function Balance () {
  const styles = useStyles()
  const getId = localStorage.getItem('sub_Id')
  const [balanceData, setBalanceData] = useState([])
  const [balanceKey, setBalanceKey] = useState('')
  const [sea, setSea] = useState('')
  const [loading,setLoading]=useState(true)
  const [search, setSearch] = useState([])
  const [defaultEntity, setDefaultEntity]=useState('')
  const [showModal, setShowModal]=useState(false)
  const [ledgerData, setLedgerData] = useState([])
  const [paymentData, setPaymentData] = useState([])
  const [entityData, setEntityData] = useState([])
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const handleOpenModal=(row)=>{
    console.log(row)
    setBalanceKey(row)
    setShowModal(true)
  }
  const handleClose=()=>{
    setShowModal(false)
  }
  


  const BalanceGetApi = async (balance_id,name) => {
    setLoading(true)
    let remaining_bal
     await axios.get(`${process.env.REACT_APP_BASE_URL}/get_pms_balance`,
     {
        params: { creditor: name }
       }
    )
      .then(function (response1) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/get_payment`
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
        return { ...record,payment_id:parseInt(record.payment_id), payment_type:type, result:res, date_updated:moment(record.date_updated).format('YYYY-MM-DD'),amount:parseFloat(record.amount),exchange_rate:parseFloat(record.exchange_rate), date:record.date_updated }
      })
      console.log(temp2)
      const creditArr = temp2.filter((ele) => ele.sender.toLowerCase() ===name && ele.status=='Active' );
const debit = temp2.filter((ele)=> ele.reciever.toLowerCase() === name && ele.status=='Active');
console.log(creditArr,debit)
const totalBuyandSell =creditArr.reduce((acc,curr)=>{
  if(!acc.name.includes(curr?.reciever.toLowerCase())){
    acc = {...acc , name:[...acc.name,curr?.reciever.toLowerCase()]}
  }
  return acc;
},{name:[]});
console.log(totalBuyandSell);
const totalCreditPerson = totalBuyandSell.name.map((ele) => {
  const t = creditArr.reduce((acc,curr)=>{
      if(curr.reciever.toLowerCase() === ele){
        acc = acc + curr.result;
      }
    return acc;
  },0)
  return {name:ele,amount:t}
})
console.log("totalCreditPerson",totalCreditPerson);

const totalDebitPerson = totalBuyandSell.name.map((ele) => {
  const t = debit.reduce((acc,curr)=>{
      if(curr.sender.toLowerCase() === ele){
        acc = acc + curr.result;
      }
    return acc;
  },0)
  return {name:ele,amount:t}
})

console.log("totalDebitPerson",totalDebitPerson);
remaining_bal = totalBuyandSell.name.map((ele)=>{
  const balance = totalCreditPerson.find(item=>item.name === ele).amount - totalDebitPerson.find(item=>item.name === ele).amount
  
  return {creditor:name,debiter:ele,balance:balance}
});

// if(response1.data.filter(i=>i.e_id===balance_id).length==0){
//   setAlertNoRecord(true)
//   setBalanceData([])
//   // BalancePostApi(balance_id)
// }else
if(response.data.length>0){
 setLoading(false)
  let res=[]
  let temp=[]
  console.log(remaining_bal,response1.data)
 for(let a of response1.data){
  console.log('a')
  if(a.game==''){
    console.log('b')
    for(let b of remaining_bal){
      if(a.debtor==b.debiter){
        res.push({...a,balance:b.balance})
      }
    }
  // if(a.creditor==remaining_bal?.[0]?.creditor){
  //   res=[{...a,balance:remaining_bal?.[0]?.balance}]
  // }
//  console.log(res)
//  setBalanceData(res)
//   console.log(response.data,name)
  
//   let res=[]
//   let res1=[]
//   let res2=[]
//   for(let a of response.data){
//     console.log(a)
//     if(a.creditor==name){
//       console.log(a.creditor)
//     res.push(a)
//     }
//      if(a.debtor==name){
//      res1.push(a)
//     }
//   }
//   console.log(res,res1)
//   if(res.length>0){
//     if(res1.length==0){
//      const result = res.map((obj, i, srcArray) => {
//       return { ...obj, balance: parseFloat(obj.amount) - parseFloat(srcArray[i + 1]?.amount) || parseFloat(obj.amount) };
//     })
//      result.sort((a, b) => {
//       var x = parseInt(a.date)
//      var y = parseInt(b.date)
//      return x < y ? 1 : x > y ? -1 : 0
//    })
//     setBalanceData([...new Map(result.map(x=>[(x.creditor),x])).values()])
//     console.log(result)
//   }
//   }else{
//  for(let b of res){
//   if(res1.filter(i=>i.amount!=b.amount).length>0){
//     res2.push(b)
//   }
//  }
//  console.log(res2)
//   let cred_res = res2.reduce((sum, current) => parseFloat(sum) + parseFloat(current.amount), 0);
//   let debt_res = res1.reduce((sum, current) => parseFloat(sum) + parseFloat(current.amount), 0);
//      console.log(cred_res,res1,res2,debt_res)
//    const temp=res2.map(record=>{
//     return {...record, balance: parseFloat(cred_res)-parseFloat(debt_res)}
//    })  
//   // res.sort((a, b) => {
//   //     var x = parseInt(a.date)
//   //    var y = parseInt(b.date)
//   //    return x < y ? 1 : x > y ? -1 : 0
//   //  })
//   // console.log(res.slice(-1)[0])
//   //   const result = [...new Map(res.map(x=>[(x.creditor),x])).values()].map((obj, i, srcArray) => {
//   //     return { ...obj, balance: parseFloat(obj.amount) - parseFloat(srcArray[i + 1]?.amount) || parseFloat(obj.amount) };
//   //   })
 
  
//     //  console.log(result,name,[...result])
//   //   console.log([...new Map(result.map(x=>[(x.e_id),x])).values()])
//      setBalanceData([...new Map(temp.map(x=>[(x.creditor),x])).values()])
}
else{
  for(let c of response1.data){
    if(c.game!=''){
    res.push({...c,balance: parseFloat(c.amount)})
    }
  }
//  temp = response1.data.map(record=>{
//   if(record.game!='' && recor){
//   return {...record, balance: parseFloat(record.amount)}
//   }
// })
// setBalanceData(temp)
}   
 }  
//  console.log([...[...new Map(res.map(x=>[(x.debtor),x])).values()],...temp])
 setBalanceData([...[...new Map(res.map(x=>[(x.debtor),x])).values()]])
}
setLoading(false)
})
      })
  }
  const BalancePostApi = async (balance_id) => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/pms_balance`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id:balance_id
      }
    }
    await axios(config)
      .then(function (response) { 
        console.log(response.data)
        if(response.data=='No Record Found'){
          // console.log('no record')
          setBalanceData([])
          setAlertNoRecord([])
         
        }else if(response.data.affectedRows){
          BalanceGetApi(balance_id)
        } 
         
      })
  }

  const BalanceUpdateApi = async () => {
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/delete_balance`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id:balanceKey.id
      }
    }
    await axios(config)
      .then(function (response) { 
        if(response.data.affectedRows){
          BalanceGetApi(balanceKey.e_id)
        }
      })
  }
  const EntityApi = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/get_entity`)
      .then(function (response) {
        if(response.data.length>0){
          setEntityData(response.data)
        let UniqueBalance= response.data[0].id
          BalanceGetApi(UniqueBalance,response.data?.[0]?.name)
          setDefaultEntity(response.data?.[0]?.name)
         
        }
      })
  }

  const handleChangeEntity=(k)=>{
    let res=[]
    let temp=[]
    setBalanceData([])
    let entityId = entityData.filter(i=>i.name==k)
    // let balanceFilt = balanceData.filter(i=>i.e_id==entityId?.[0]?.id)
    // console.log(balanceFilt,balanceData,entityId)
    // if(balanceFilt.length>0){
      // BalancePostApi(entityId?.[0]?.id)
      BalanceGetApi(entityId?.[0]?.id,entityId?.[0]?.name)
      setDefaultEntity(k)
    // }
    // else{
    //   BalancePostApi(entityId?.[0]?.id)
    // setDefaultEntity(k)
    // }
  }
 
  useEffect(async () => {
    await EntityApi()
   
   
    //await allportfolioUser()
  }, [])
  
  const columns4 = [
    {
      dataField: 'creditor',
      text: 'Creditor',
      sort: true,
      // hidden: (selectedColumnId?.includes("creditor") == true),
      // filter: textFilter({
      //   placeholder: 'creditor'
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.creditor?.charAt(0)?.toUpperCase() + row.creditor?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'debtor',
      text: 'Debtor',
      sort: true,
      // hidden: (selectedColumnId?.includes("debtor") == true),
      // filter: textFilter({
      //   placeholder: 'debtor'
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.debtor?.charAt(0)?.toUpperCase() + row.debtor?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
      // hidden: (selectedColumnId?.includes("date") == true),
      // filter: dateFilter({
      //   placeholder: 'date'
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        let date = moment(parseInt(row.date)/1000,'X').format('Do MMMM YYYY, h:mm:ss a').split(',')
        // let date =moment(row.timestamp).format("MMMM Do YYYY, h:mm:ss a").split(',')
        return (
          <>
          {row.date===null ?
                <span style={{ color: "white", fontSize: "14px" }}>N/A</span> :
               <span style={{ color: "white", fontSize: "14px" }}>
               {date[0] } <br/>
                {date[1]}
              </span>}
           </>
        );
      },
    },
    {
      dataField: 'balance',
      text: 'Balance',
      sort: true,
      // hidden: (selectedColumnId?.includes("amount") == true),
      // filter: numberFilter({
      //   placeholder: 'amount',
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
            {row.amount>0 ?
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer',color:'#00ff00' }}>
                $ {parseFloat(row.balance).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
              </span> :
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer',color:'#ff0000' }}>
              $ {parseFloat(row.balance).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}
            </span> 
             }      
            </div>
          </>
        )
      }
    },
    {
      dataField: 'currency',
      text: 'Currency',
      sort: true,
      // hidden: (selectedColumnId?.includes("currency") == true),
      // filter: textFilter({
      //   placeholder: 'currency'
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.currency?.charAt(0)?.toUpperCase() + row.currency?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'type',
      text: 'Type',
      sort: true,
      // hidden: (selectedColumnId?.includes("type") == true),
      // filter: textFilter({
      //   placeholder: 'type'
      // }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.type?.charAt(0)?.toUpperCase() + row.type?.slice(1)}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: 'game',
      text: 'Game info',
      sort: true,
      // hidden: (selectedColumnId?.includes("game") == true),
      // filter: textFilter({
      //   placeholder: 'game info'
      // }),
         formatter: (cell, row, rowIndex, formatExtraData) => {
        return ( 
          <>
          {row.game=='' ? <span style={{marginLeft:'2em'}}>-</span> :
          <ul style={{marginLeft:'-2em'}}>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Game</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.game}</span>
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107',width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Game-Details</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.game_details}</span>
              </li>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Venue</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.venue}</span>
              </li> 
              {row.percentage=='' ? "" : <>
              <li style={{ whiteSpace: 'nowrap', color: '#FFC107', width:'99%' }}>
              <span style={{ color: '#FFC107' }}>Ownership</span>
              <span style={{ color: 'white',marginLeft: '3%' }}>{row.percentage+'%'}</span> 
              </li></>}
          </ul>}
          </>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
           <button className='cancel' onClick={()=>handleOpenModal(row)}>cancel</button>
          </div>
        )
      }
    }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row >
          <Col lg={12}>
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Balance</h3>
              </span>
              <Autocomplete
                className="p-2 pageheader"
                value={defaultEntity}
                options={entityData?.map((e) =>
                  (e.name)
                )}
                classes={{
                  option: styles.option
                }}
                PaperComponent={({ children }) => (
                  <Paper style={{ background: 'rgb(31, 33, 37)', color: 'white' }}>{children}</Paper>
                )}
                onChange={(e, k) => {
                   handleChangeEntity(k)
                }}
                style={{
                  fill: 'white',
                  boxShadow: 'none',
                  borderRadius: '30%',
                  width:'220px'
                }}
                sx={{
                  width: 300,
                  '.MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    width: '200px',
                    height: '32px',
                    // backgroundColor: '#fff',
                    fontSize: '14px',
                    border:'1px solid #d9d9d9 !important',
                    left: '4px'
                  },
                  '.MuiButtonBase-root': {
                    color: 'white'
                  },
                  '.MuiInputLabel-root':{
                    marginTop:'-6px'
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ color: 'white' }}
                    label="Entity"
                  />
                )}
              />
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = balanceData?.filter((i) =>
                    i.type.toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                  if(x.length==0){
                    setSearch([])
                    setAlertNoRecord(true)
                  }
                  console.log(x)
                  setSearch(x)
                }}
              />
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
                <CommonTable
                  data={search}
                  columns={columns4}
                />
                )
              : (
                <CommonTable
                loading={loading}
                  data={balanceData}
                  columns={columns4}
                />
                )}
          </Col>
        </Row>
        <Modal
        show={showModal}
        onHide={handleClose}
        style={{
          width: '30rem',
          marginTop: '17rem',
          overflow: 'hidden',
          marginLeft: '35%',
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
              marginTop: '-5%',
              marginLeft: '11%'
            }}
          >
            Are you sure you want to cancel the debt ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer
          style={{
            backgroundColor: '#222429',
            borderTop: 'none',
            paddingRight: '34%',
            marginTop: '-4%'
          }}
        >
          <Button
            variant="success"
            style={{ width: '25%',backgroundColor: '#006400'
          
          }}
            onClick={() => {
              BalanceUpdateApi()
              handleClose()
            }}
          >
            Yes
          </Button>
          <Button
             variant="danger"
            onClick={handleClose}
            style={{ width: '25%',backgroundColor: '#b30000'  }}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
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
    </React.Fragment >
  )
}
export default Balance;
