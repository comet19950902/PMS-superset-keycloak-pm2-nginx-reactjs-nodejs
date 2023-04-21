import React, { useState, useEffect } from 'react'
import CommonTable from '../common/CommonTable/CommonTable'
import { Link, useNavigate } from 'react-router-dom'
import cx from 'classnames'
import axios from 'axios'
import Header from '../common/Header/Header'
import SidebarAdmin from '../Admin/DashboardAdmin/SidebarAdmin'
import { Row, Col, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import '../common/Modal.css'
import Tooltip from '@mui/material/Tooltip'
import SuccessMessage from '../modules/SuccessMessage/SuccessMessage'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Alert, TextField } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined'
import '../Admin/DashboardAdmin/DashboardAdmin.css'
import { styled } from '@mui/material/styles'
function UserPortfolios () {
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red'
      },
      '&:hover fieldset': {
        borderColor: 'yellow'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green'
      }
    }
  })
  const getId = localStorage.getItem('sub_Id')
  // var data_id;
  // console.log(getId);
  // var data_row;
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCredentialsInfo({ ...credentialsInfo, [name]: value })
  }
  const [validated, setValidated] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertPort, setAlertPort] = useState(false)
  const navigate = useNavigate()
  const handleClosePort = () => {
    setAlertPort(false)
  }
  const [credentialsInfo, setCredentialsInfo] = useState({
    // exchange_id: "",
    //   email: "",
    //   password: "",
    user_id: getId
  })
  const [dataId, setDataId] = useState('')
  const [result4, setResult4] = useState([])
  const [dataRow, setDataRow] = useState([])
  const [search, setSearch] = useState([])
  const [sea, setSea] = useState('')
  const [portId, setPortId] = useState('')
  const [show, setShow] = useState(false)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [showPerson, setShowPerson] = useState(false)
  const [showOrganization, setShowOrganization] = useState(false)
  const [showAllPortFolios, setShowAllPortFolios] = useState(false)
  const [showDashboard, setShowDashboard] = useState(true)
  const [newWidth, setNewWidth] = useState('10')
  const [widthData, setWidthData] = useState('-4%')
  const [margin, setMargin] = useState('8%')
  const [w, setW] = useState('110%')
  const [wid, setWid] = useState('159%')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [m, setm] = useState('2%')
  const [mar, setmar] = useState('0%')
  const [result, setResult] = useState([])
  const [result2, setResult2] = useState([])
  const [result21, setResult21] = useState([])
  // const [result3, setResult3] = useState([]);
  const [result3, setResult3] = useState([])
  const [result5, setResult5] = useState([])
  const [port_wal, setport_wal] = useState([])
  const [Port, setResultPort] = useState([])
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [p_name, setp_name] = useState('')
  const [showEp, setShowEp] = useState(false)
  const total = [...result, ...result4]
  const total1 = [...result2, ...result21]
  const allportfolioUser = async () => {
    await axios
      .get('${process.env.REACT_APP_BASE_URL}/all_portfolios_details', {
        params: {
          user_id: getId
        }
      }).then((response) => {
        const rs = response.data
        setResult3(rs)
      })
    // setResult3(rs)
  }
  useEffect(async () => {
    await allportfolioUser()
  }, [])
  console.log(result3)
  // }
  // console.log(result3?.[0]?.updated_date)
  // console.log(Math.floor(new Date( result3?.[0]?.updated_date).getTime() / 1000))
  // if(result3){
  //   result3.sort((a, b) => {
  //        var x = new Date(a.updated_date).getTime()/1000
  //       var y = new Date(b.updated_date).getTime()/1000
  //       return x > y ? -1 : x < y ? 1 : 0
  //     })
  //   }
  const handleClose = () => {
    setShow(false)
    setShow1(false)
    setShow2(false)
    setShowEp(false)
  }
  const handleShow = (e) => {
    setAlertPort(false)
    setShow(true)
    setValidated(false)
  }
  const handleShow1 = (row, rowIndex) => {
    console.log(row, rowIndex)
    setPortId(row.portfolio_id)
    // const getPrtyPortfolioOfaPortfolio= async() =>{
    // console.log("Data");
    // }
    // console.log(row)
    setShow1(true)
  }
  // const removeItemOnce=async(result3, portId)=> {
  //   var index = result3.indexOf(portId);
  //   console.log(index)
  //   if (index >= -1) {
  //     result3.splice(index, 1);
  //   }
  //   return result3;
  // }
  const handleDeleteUpdate = async () => {
    await axios
      .delete('${process.env.REACT_APP_BASE_URL}/deletePortfolioData', {
        params: { portfolio_id: portId }
      })
      .then((response) => {
        // console.log(response.data)
        allportfolioUser()
      })
      // setTimeout(
      //   async() => {
      //     // await getAllPortFolio()
      //   2000
      // );
      // removeItemOnce(result3,portId)
      // getAllPortFolio()
      //  setResult3(response.data)
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleShow2 = (row) => {
    console.log(row)
    // var config = {
    //     method : 'get',
    //     url: '${process.env.REACT_APP_BASE_URL}/getAllPartyPortfolio',
    //     params: {
    //          party_id: row.party_id,
    //      },
    //      }
    //      axios(config).then(function (response){
    //       console.log(response.data)
    //       setResult3(response.data)
    //     })
    setShow2(true)
  }
  // console.log(total)
  const handleform = () => {
    //  console.log(name,email,phone)
    handleClose()
  }
  const handleShowEp = (row) => {
    setShowEp(true)
  }
  const submit = () => {
    console.log('Submitted')
    setAlert(true)
    setAlertPort(true)
  }
  const submitAfter = () => {
    setAlertPort(false)
    setAlert(false)
    setTimeout(setShow(false), 3000)
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    } else {
      //  console.log(name,getId)
      // console.log(credentialsInfo);
      const config = {
        method: 'post',
        url: '${process.env.REACT_APP_BASE_URL}/admin/createPortfolio',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          portfolio_name: name,
          user_id: getId
        }
      }
      await axios(config)
        .then(function (response) {
          console.log('list data', result3)
          // getAllPortFolio()
          allportfolioUser()
          setAlertPort(true)
          setTimeout(
            () => handleClose(),
            // setAlertPort(false),
            3000
          )
          //  setTimeout(handleClose(),3000)
          // handleClose()
          setValidated(true)
          // result5.forEach(async(el,i)=>{
          //   // var list=[]
          //   result3[i]['portfolio_ids']=[]
          //   for(let j=0;j<el?.length;j++){
          //     var m = result21.filter(s=>s.party_id==el[j].party_id)
          //     var p = result3.filter(p=>p.portfolio_id==el[j]['portfolio_id'])
          //     // if(result3[j].portfolio_id==el[j].portfolio_id){
          //     // var p = result3.filter(p=>p.portfolio_id==el[j].portfolio_id)
          //     // list.push({'portfolio_id': p[0].portfolio_id,'portfolio_name':p[0].portfolio_name})
          //     result3[i]['portfolio_ids'].push({'portfolio_id':el[j].portfolio_id,'name':m[0]?.name,'per':el[j]['ownership_percentage']})
          //   // }
          //   }
          //   console.log("list",list);
          // var newlist=list;
          // newlist.push(list);
          // list=[];
          // })
          // console.log(response);
          // console.log(response.data);
          // console.log("clicked");
          // submit()
          //  setTimeout(submitAfter,3000)
          // setTimeout(() => {
          //   setShow(false)
          //   setAlertPort(false)
          //   // navigate("/PMS/Admin/Party");
          // }, 3000);
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    // e.stopPropagation();
    //   axios.post('http://192.168.86.179:8180/debank_add_investment',
    //   {
    //     headers:
    //     {
    //     'Content-Type':'application/json'
    //   },
    //   data: credentialsInfo,
    // })
    // // console.log(data)
    //       .then(response => console.log(response));
  }
  // result5.forEach(async(el,i)=>{
  //   //  console.log(el[0].portfolio_id)
  //   //  var r = result3.filter(i=>i.portfolio_id==el[0].portfolio_id)
  //   //  console.log(r[0].portfolio_id,el[0]?.portfolio_id)
  //   result3[i]['portfolio_ids']=[]
  //      for(let j=0;j<el?.length;j++){
  //      var m = total1.filter(s=>s.party_id==el[j].party_id)
  //      console.log("list of person/organisatiion",m)
  //     //  result_port?.[i].push({'portfolio_name':'abc',['portfolio_ids']:{'name':m?.[0]?.name,'per':el?.[j]?.['ownership_percentage']}})
  //      result3[i]['portfolio_ids'].push({'name':m[0].name,'per':el[j]['ownership_percentage']
  //    })
  //   }
  //   console.log("list data",result3);
  // })
  const newlist = []
  const list = []
  console.log(result21)
  // result5.forEach(async(el,i)=>{
  // var list=[]
  // result3[i]['portfolio_ids']=[]
  // for(let j=0;j<el?.length;j++){
  // var m = result21.filter(s=>s.party_id==el[j].party_id)
  // var p = result3.filter(p=>p.portfolio_id==el[j]['portfolio_id'])
  // if(result3[j].portfolio_id==el[j].portfolio_id){
  // var p = result3.filter(p=>p.portfolio_id==el[j].portfolio_id)
  // list.push({'portfolio_id': p[0].portfolio_id,'portfolio_name':p[0].portfolio_name})
  // result3[i]['portfolio_ids'].push({'portfolio_id':el[j].portfolio_id,'name':m[0]?.name,'per':el[j]['ownership_percentage']})
  // }
  // }
  // console.log("list",list);
  // var newlist=list;
  // newlist.push(list);
  // list=[];
  // })
  // list.forEach((el,i)=>{
  //   result3[i]['portfolio_ids']=[]
  //   result3[i]['portfolio_ids'].push({'portfolio_id':el[0].portfolio_id,'name':el[0].name,'per':el[0]['ownership_percentage']})
  // })
  // result3.forEach((el,i)=>{
  //   result3[i]['portfolio_ids']=[]
  // var x = list.filter(i=>i.portfolio_id==el.portfolio_id)
  // console.log(x)
  // if(x.length==0){
  //  result3[i]['portfolio_ids'].push(list)
  // }
  // })
  //  console.log("alldata",newlist)
  console.log(result3, list)
  console.log('result5', result5)
  // const loadOrganizationData = async () => {
  //   await axios
  //     .get("${process.env.REACT_APP_BASE_URL}/getAllPerson", {
  //       params: { userId: getId },
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //       setResult2(response.data);
  //       // setWalletData(response.data.wallet_asset);
  //     });
  // };
  // console.log(result);
  // console.log(result2);
  // console.log(result3, result5,total1);
  // for(let i=0;i<total.length;i++){
  //   result3[i]['pi']=[]
  //   total?.forEach(el=>{
  //     console.log(el)
  //     var x = result3?.filter(i=>i.portfolio_id==el?.[0]?.portfolio_id)
  //     console.log(x)
  //     var x = total1?.filter(i=>i.party_id==el?.[0]?.party_id)
  //     console.log(x)
  //      result3[i]['pi'].push({'party_name':x?.[0]?.name})
  //   })
  // }
  // console.log(result3)
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
      setW('100%')
      setWid('159%')
      setmar('0%')
      setMargin('22%')
      setWidthData('6%')
      console.log(showDashboard)
      console.log(newWidth)
    }
  }
  // const data = result;
  // const data2 = result2;
  // const data3=result3;
  // const columns5 = [
  //   {
  //     dataField: "portfolio_id",
  //     text: "Portfolio id",
  //     sort: true,
  //   },
  //   {
  //       dataField: "ownership_percentage",
  //       text: "Ownership",
  //       sort: true,
  //     },
  // ]
  // const columns4 = [
  //   {
  //     dataField: "name",
  //     text: "Name",
  //     sort: true,
  //   },
  // {
  //   dataField: "id",
  //   text: "ID",
  //   sort: false,
  //   formatter: (cell, row, rowIndex, formatExtraData) => {
  //     return (
  //       <>
  //         <Tooltip title={row.id}>
  //           <IconButton
  //             style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
  //           >
  //             {row.id.slice(0, 7)}...
  //           </IconButton>
  //         </Tooltip>
  //       </>
  //     );
  //   },
  // },
  // {
  //   dataField: "email_id",
  //   text: "Email ID",
  //   sort: false,
  // },
  // {
  //   dataField: "phone",
  //   text: "Phone",
  //   sort: false,
  // },
  // {
  //   dataField: "",
  //   text: "Manage",
  //   sort: true,
  //   formatter: (cell, row, rowIndex, formatExtraData) => {
  //     return (
  //       <div>
  { /* <p
              className="name-assets"
              style={{
                display: "flex",
                flexDirection: "row",
                cursor: "pointer",
                color: "red",
              }}
            >
              {console.log(row)}
              Delete Asset
            </p> */ }
  //         <span onClick={()=>handleShow(row)}>
  //         <EditOutlinedIcon />
  //         </span >
  //         <span style={{color:'red'}} onClick={()=>handleShow1(row)}>
  //         <DeleteOutlineOutlinedIcon />
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // {
  //     dataField: "",
  //     text: "Info",
  //     sort: true,
  //     formatter: (cell, row, rowIndex, formatExtraData) => {
  //       return (
  //         <div>
  { /* <p
                className="name-assets"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                {console.log(row)}
                Delete Asset
              </p> */ }
  //         <span onClick={()=>handleShow2(row)}>
  //         <InfoOutlinedIcon />
  //         </span>
  //       </div>
  //     );
  //   },
  // },
  // ];
  // const columns = [
  //   {
  //     dataField: "name",
  //     text: "Name",
  //     sort: true,
  //   },
  //   {
  //     dataField: "id",
  //     text: "ID",
  //     sort: true,
  //     formatter: (cell, row, rowIndex, formatExtraData) => {
  //       return (
  //         <>
  //           <Tooltip title={row.id}>
  //             <IconButton
  //               style={{ color: "white", fontSize: "15px", marginTop: "-13%" }}
  //             >
  //               {row.id.slice(0, 7)}...
  //             </IconButton>
  //           </Tooltip>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     dataField: "tax_id",
  //     text: "Tax_ID",
  //     sort: false,
  //   },
  //   {
  //     dataField: "address",
  //     text: "Address",
  //     sort: false,
  //     formatter: (cell, row, rowIndex, formatExtraData) => {
  //       return (
  //         <Tooltip title={row.address}>
  //           <IconButton
  //             style={{ color: "white", fontSize: "15px", marginTop: "-13%" }}
  //           >
  //             {row.address.slice(0, 7)}
  //           </IconButton>
  //         </Tooltip>
  //       );
  //     },
  //   },
  //   {
  //     dataField: "city",
  //     text: "City",
  //     sort: true,
  //   },
  //   {
  //     dataField: "country",
  //     text: "Country",
  //     sort: true,
  //   },
  //   {
  //     dataField: "",
  //     text: "Manage",
  //     sort: true,
  //     formatter: (cell, row, rowIndex, formatExtraData) => {
  //       return (
  //         <div>
  //           <p
  //             className="name-assets"
  //             style={{
  //               display: "flex",
  //               flexDirection: "row",
  //               cursor: "pointer",
  //               color: "red",
  //             }}
  //           >
  //             {console.log(row)}
  //             Delete Asset
  //           </p>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  // const columns2 = [
  //   {
  //     dataField: "name",
  //     text: "Name",
  //     sort: true,
  //   },
  // {
  //   dataField: "portfolio_id",
  //   text: "Portfolio",
  //   sort: false,
  //   formatter: (cell, row, rowIndex, formatExtraData) => {
  //     return (
  //       <>
  //         <Tooltip title={row.id}>
  //           <IconButton
  //             style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
  //           >
  //             {row.id.slice(0, 7)}...
  //           </IconButton>
  //         </Tooltip>
  //       </>
  //     );
  //   },
  // },
  // {
  //   dataField: "email_id",
  //   text: "Email ID",
  //   sort: false,
  //   formatter: (cell, row, rowIndex, formatExtraData) => {
  //     return (
  //       <>
  //         <Tooltip title={row.email_id}>
  //           <IconButton
  //             style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
  //           >
  //             {row.email_id}
  //           </IconButton>
  //         </Tooltip>
  //       </>
  //     );
  //   },
  // },
  // {
  //   dataField: "phone",
  //   text: "Phone",
  //   sort: false,
  // },
  //   {
  //     dataField: "",
  //     text: "Manage",
  //     sort: true,
  //     formatter: (cell, row, rowIndex, formatExtraData) => {
  //       return (
  //         <div>
  //           <p
  //             className="name-assets"
  //             style={{
  //               display: "flex",
  //               flexDirection: "row",
  //               cursor: "pointer",
  //               color: "red",
  //             }}
  //           >
  //             {console.log(row)}
  //             Delete Asset
  //           </p>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  const a = async (row) => {
  }
  const columns3 = [
    {
      dataField: 'portfolio_name',
      text: 'Name',
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
          <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Tooltip title={'view portfolio'}>
                {/* <IconButton
                style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
              >   */}
                <span onClick={() => navigate(`/PMS/Admin/Assets/:${row.portfolio_id}`)} className="namePortData" style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                  {row.portfolio_name}
                </span>
                {/* </IconButton>  */}
              </Tooltip>
              {/* <span style={{cursor:'pointer'}}
               onClick={()=>handleShowEp(row)}
              >
            <Tooltip title={'edit'}>
            <EditOutlinedIcon style={{fontSize:'1.2rem'}} />
            </Tooltip>
            </span > */}
            </div>
          </>
        )
      }
    },
    // {
    //   dataField: "wallet",
    //   text: "Wallet",
    //   sort: false,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     a(row)
    //   // console.log(port_wal)
    //     return (
    //       <>
    //       {console.log(port_wal)}
    //       {/* {port_wal?.map(e=> */}
    //         {/* <Tooltip title={e.wallet_name}> */}
    //           <IconButton
    //             style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
    //           >
    //             {/* {row.wallet_name.slice(0, 7)}... */}
    //           </IconButton>
    //         {/* </Tooltip> */}
    //       {/* )} */}
    //       </>
    //     );
    //   },
    // },
    // {
    //   dataField: "balance",
    //   text: "balance",
    //   sort: false,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     console.log(row)
    //     return (
    //       <>
    //         {/* <Tooltip title={'person/organisation'}> */}
    //              {/* {
    //             row.portfolio_ids?.map(e=>
    //               <li >{e.name}</li>
    //              )
    //           }    */}
    //           {/* <IconButton */}
    //             {/* style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
    //           > */}
    //                {(row.updated_date).slice(0, 12)}...
    //           {/* </IconButton> */}
    //         {/* </Tooltip> */}
    //       </>
    //     );
    //   },
    // },
    // {
    //   dataField: "addressdata",
    //   text: "balance",
    //   sort: false,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //      console.log(row.walletsdata)
    //     return (
    //       <>
    //         {/* <Tooltip title={'person/organisation'}> */}
    //               {
    //             row.walletsdata?.map( e=>
    //               <li >{e.wallet_name}</li>
    //              )
    //           }
    //           {/* <IconButton */}
    //             {/* style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
    //           > */}
    //           {/* </IconButton> */}
    //         {/* </Tooltip> */}
    //       </>
    //     );
    //   },
    // },
    {
      dataField: 'walletsdata',
      text: 'wallets',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row.walletsdata)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}
            {
              row.walletsdata?.map(e =>
                // console.log(a.totalBalance)
                <li style={{ whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => navigate('/PMS/MainManageAssetsWallets')}>
                  <Tooltip title={'view wallet'}>
                    <span className="namePortData" > {e.wallet_name} - ${e.totalwalletbalance}</span>
                  </Tooltip>
                </li>
                // )
              )
            }
            {/* <IconButton */}
            {/* style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
              > */}
            {/* </IconButton> */}
            {/* </Tooltip> */}
          </>
        )
      }
    },
    {
      dataField: 'total_investments',
      text: 'Investment',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}
            {
              row.total_investments?.map(e =>
                <li style={{ whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => navigate('/PMS/Investments')}>
                  <Tooltip title={'view investment'}>
                    <span className="namePortData" >{e.investment_name} - ${e.investment_value.slice(0, 4)}</span>
                  </Tooltip>
                </li>
              )
            }
            {/* <IconButton */}
            {/* style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
              > */}
            {/* </IconButton> */}
            {/* </Tooltip> */}
          </>
        )
      }
    },
    {
      dataField: 'total_exchange',
      text: 'Exchange',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        let t = 0
        const dis = []
        for (const a of row.total_exchange) {
          t = t + parseFloat(a.free_value)
        }
        const array = [...new Map(row.total_exchange.map(item =>
          [item.api_key, item])).values()]
        console.log(t, array)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}
            {
              array?.map(e => (
                <li style={{ whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => navigate('/PMS/ViewExchanges')}>
                  <Tooltip title={'view exchange'}>
                    <span className="namePortData">{e.exchange_name} - ${t.toFixed(3)}</span>
                  </Tooltip>
                </li>
              ))
            }
            {/* <IconButton */}
            {/* style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
              > */}
            {/* </IconButton> */}
            {/* </Tooltip> */}
          </>
        )
      }
    },
    {
      dataField: 'partydata1',
      text: 'person/organisation',
      sort: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row.partydata1)
        return (
          <>
            {/* <Tooltip title={'person/organisation'}> */}
            {
              row.partydata1?.[0]?.[0]?.partydata?.map(e =>
                <li style={{ whiteSpace: 'nowrap' }} >{e.name} - {e.ownership}%</li>
              )
            }
            {/* <IconButton */}
            {/* style={{ color: "white", fontSize: "15px", marginTop: "-7%" }}
              > */}
            {/* </IconButton> */}
            {/* </Tooltip> */}
          </>
        )
      }
    },
    {
      dataField: '',
      text: 'Action',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <div >
            {/* <span > */}
            <Tooltip title={'Manage'}>
              <Link to={`/PMS/Admin/SinglePortfolioPage/:${row.portfolio_id}`} style={{ color: 'red' }}>
                {/* <Image src={check} alt="" /> */}
                <SwitchAccountOutlinedIcon />
              </Link>
            </Tooltip>
            {/* </span> */}
            {/* <span style={{cursor:'pointer'}} onClick ={()=>navigate(`/PMS/Assets/:${row.portfolio_id}`)}>
            <VisibilityOutlinedIcon style={{pointer:'cursor'}} />
          </span> */}
            {/* <span  style={{ cursor:'pointer'}} onClick={()=>handleShow1(row,rowIndex)}>
          <Tooltip title={'Delete'}>
            <DeleteOutlineOutlinedIcon className= "namePortData"  />
            </Tooltip>
            </span> */}
          </div>
        )
      }
    }
    // {
    //   dataField: "",
    //   text: "Manage",
    //   formatter: (cell, row) => {
    //     return (
    //       <div style={{cursor:'pointer'}}
    //         onClick={() => {
    //           console.log(row.portfolio_id);
    //         }}
    //       >
    //         <Link to={ `/PMS/Admin/SinglePortfolioPage/:${row.portfolio_id}/:${row.portfolio_name}`} style={{color:'white'}}>
    //           {/* <Image src={check} alt="" /> */}
    //           <ArrowForwardOutlinedIcon />
    //         </Link>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   dataField: "View",
    //   text: "View",
    //   sort: true,
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <div style={{cursor:'pointer'}} onClick ={()=>navigate(`/PMS/Assets/:${row.portfolio_id}`)}>
    //         <VisibilityOutlinedIcon style={{pointer:'cursor'}} />
    //       </div>
    //     );
    //   },
    // },
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
  return (
    <div>
      <div className="mainmyassets" style={{ overflow: 'hidden' }}>
        <Row>
          <Col lg={12}>
            <Header />
            <div
              className="d-flex justify-content-between"
              style={{ marginRight: '5%' }}
            >
              <Col lg={12}>
                <SidebarAdmin />
                <div
                  // className="maindashtable"
                  id="abc"
                  style={{
                    // overflowY: "scroll",
                    marginLeft: '4%',
                    height: '100vh',
                    width: '100%'
                  }}
                >
                  <div className="d-flex justify-content-center" style={{ marginBottom: '3%' }} >
                    <span style={{ marginTop: '3.5%' }}>
                      <h3 style={{ color: 'white', fontSize: '21px', fontWeight: 'bold' }}>Portfolios</h3>
                    </span>
                    <TextField
                      // id="standard-search"
                      label="Search"
                      //  type="search"
                      // label="Filled success" variant="filled" color="#e8eaf6" focused
                      //  className="btn btn-gray"
                      variant="standard"
                      style={{
                        boxShadow: 'none',
                        width: '146px',
                        height: '42px',
                        marginTop: '1%',
                        //  marginBottom:'-4%',
                        marginLeft: '58%',
                        //  background: 'hsl(218deg 9% 18% / 78%',
                        borderRadius: '18px'
                      }}
                      sx={{
                        label: {
                          color: 'white'
                        },
                        '.MuiInput-root:after': {
                          borderBottom: '2px solid grey'
                        },
                        '.MuiInput-root:before': {
                          borderBottom: '2px solid white'
                        },
                        '.MuiInput-root.before:hover': {
                          borderBottom: '2px solid white'
                        },
                        '.MuiOutlinedInput-root': {
                          color: 'white '
                        },
                        '.MuiInputLabel-root.Mui-focused': {
                          color: 'white'
                        },
                        '.MuiInput-root': {
                          color: 'white'
                        },
                        '.MuiOutlinedInput-root': {
                          color: 'white '
                        },
                        '.MuiInput-underline': {
                          borderBottom: '1px solid white'
                        }
                      }}
                      // value={value}
                      onChange={(event) => {
                        // console.log(event.target.value, result3)
                        setSea(event.target.value)
                        const x = result3?.filter(i => i.portfolio_name.toLowerCase().includes(event.target.value.toLowerCase()))
                        // rar.name.toLowerCase().includes(event.target.value.toLowerCase());
                        // console.log(x)
                        setSearch(x)
                        // console.log(x)
                      }}
                    />
                  </div>
                  {/* <div
                        className="dashheading"
                        style={{
                          // marginTop:'-10%',
                        marginBottom: "-10%", position: "sticky" }}
                      > */}
                  {/* <div className="heading day">
                          <select
                            className="days"
                            style={{ padding: "3%", paddingLeft: "15px" }}
                          >
                            <option>1 Day</option>
                            <option>1 Week</option>
                            <option>1 Month</option>
                            <option>1 Year</option>
                          </select>
                        </div>  */}
                  {/* </div> */}
                  <div style={{ marginRight: '5%' }}>
                    {sea
                      ? <CommonTable data={search} columns={columns3} />
                      : <CommonTable data={result3} columns={columns3} />
                    }
                  </div>
                </div>
              </Col>
            </div>
          </Col>
          <Modal show={showEp}
            //  onHide={handleClose}
            style={{ width: '45%', marginLeft: '35%' }}>
            <Modal.Header
              style={{ backgroundColor: '#222429', border: 'none' }}
            >
              {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
                onClick={() => setShowEp(false)}
              >
                <CloseIcon />
              </IconButton>
            </Modal.Header>
            {/* {alert ? (
          <Snackbar
          open={alert}
           autoHideDuration={4000}
           onClose={handleClose}
          sx={{
            // marginTop:'-2%',
            marginLeft: "44%",
            marginBottom: "38%",
            width: "25%" }}
        >
          <Alert
             onClose={handleClose}
            severity="success"
            sx={{ width: "100%", backgroundColor: "white", color: "black" }}
          >
            update portfolio successfully
          </Alert>
         </Snackbar>
       ) :
         <></>
        }   */}
            <Modal.Body style={{ backgroundColor: '#222429' }}>
              {/* {!isWalletConnected ? ( */}
              <Form
                className="custom-form"
                noValidate
                validated={validated}
                onSubmit={handleSubmitForm}
              >
                <h4 >Edit portfolio</h4>
                <Form.Label
                  htmlFor="exchange"
                  className={cx('custom-form-box', {
                    'focus-add': p_name
                  })}
                  style={{ width: '50%', marginLeft: '25%' }}
                >
                  <Form.Control
                    type="text"
                    id="name"
                    name="name"
                    value={p_name}
                    onChange={(e) => setp_name(e.target.value)}
                    required
                    style={{ color: 'white' }}
                  />
                  {/* <span style={{ background: "none", color: "white" }}>
                  Enter name
                </span> */}
                  <Form.Control.Feedback type="invalid">
                    Name is Required.
                  </Form.Control.Feedback>
                </Form.Label>
                {/* <Form.Label
                htmlFor="exchange"
                className={cx("custom-form-box", {
                  "focus-add": phone,
                })}
                style={{ width: "50%", marginLeft: "25%" }}
              >
                <Form.Control
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e)=>setphone(e.target.value)}
                  required
                  style={{color:"white"}}
                />
                <span style={{ background: "none", color: "white" }}>
                  Enter phone
                </span>
                <Form.Control.Feedback type="invalid">
                   phone is Required.
                </Form.Control.Feedback>
              </Form.Label> */}
                <Button
                  type="submit"
                  variant=""
                  className="btn-gray"
                  style={{ width: '50%', marginLeft: '25%', boxShadow: 'none', color: 'white' }}
                // onClick={handleform}
                >
                  save
                </Button>
              </Form>
              {/* // ) : (
          //   <SuccessMessage message=" Exchange Successfully Added" />
          // )} */}
            </Modal.Body>
          </Modal>
          {/* <div className="d-flex justify-content-center"> */}
          <Modal
            //   className="maindashtable"
            show={show2} onHide={handleClose} style={{
              //    paddingRight:'45%',width:"100%"
              //    id="abc"
              // overflowY: "scroll",
              width: '100%',
              paddingBottom: '6%',
              marginTop: '3%',
              marginLeft: '2%',
              height: '95%'
            }}>
            <Modal.Header
              style={{ backgroundColor: '#222429', border: 'none' }}
            >
              {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
              <IconButton
                style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={() => setShow2(false)}
              >
                <CloseIcon />
              </IconButton>
            </Modal.Header>
            <Modal.Body style={{
              backgroundColor: '#222429'
            }}>
              <div
              >
                <div
                  className="dashheading"
                  style={{
                    marginTop: '-6%',
                    marginBottom: '2%',
                    marginLeft: '3%'
                  }}
                >
                  <h3 style={{ fontSize: '18px' }}>List of portfolio</h3>
                  {/* <div className="heading day">
                          <select
                            className="days"
                            style={{ padding: "3%", paddingLeft: "15px" }}
                          >
                            <option>1 Day</option>
                            <option>1 Week</option>
                            <option>1 Month</option>
                            <option>1 Year</option>
                          </select>
                        </div>  */}
                </div>
                {/* <CommonTable data={result3} columns={columns5} /> */}
              </div>
            </Modal.Body>
          </Modal>
          {/* </div> */}
        </Row>
        <Modal show={show1} onHide={handleClose} style={{ width: '35%', marginTop: '20%', overflow: 'hidden', marginLeft: '39%', backgroundColor: '#222429', height: '23%', border: '1px solid grey', borderRadius: '15px' }}>
          <Modal.Header style={{ backgroundColor: '#222429', border: 'none' }}>
            <Modal.Title style={{ color: 'white', fontSize: '16px', marginTop: '-5%', marginLeft: '11%' }}>Are you sure you want to Delete this portfolio ?</Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ backgroundColor: '#222429', border: 'none', paddingRight: '34%', marginTop: '-3%' }}>
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
      </div>
      <Modal show={show} onHide={handleClose} style={{ width: '45%', marginLeft: '35%' }}>
        <Modal.Header
          style={{ backgroundColor: '#222429', border: 'none' }}
        >
          {/* <Modal.Title>Create PortFolio Section</Modal.Title> */}
          <IconButton
            style={{ position: 'absolute', top: '0', right: '0', color: 'white' }}
            onClick={() => setShow(false)}
          >
            <CloseIcon />
          </IconButton>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#222429' }}>
          {!isWalletConnected ? (
            <Form
              className="custom-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmitForm}
            >
              <h4 >Create Portfolio</h4>
              <Form.Label
                htmlFor="exchange"
                className={cx('custom-form-box', {
                  'focus-add': name
                })}
                style={{ width: '50%', marginLeft: '25%' }}
              >
                <Form.Control
                  type="text"
                  id="portfolio_name"
                  name="portfolio_name"
                  placeholder="portfolio name"
                  onChange={(e) => setname(e.target.value)}
                  required
                  style={{ color: 'white' }}
                />
                {/* <span style={{ background: "none", color: "white" }}>
                Enter Portfolio
              </span> */}
                <Form.Control.Feedback type="invalid">
                  Portfolio Name is Required.
                </Form.Control.Feedback>
              </Form.Label>
              <Button
                type="submit"
                variant=""
                className="btn-gray"
                style={{ width: '50%', marginLeft: '25%' }}
              >
                Save
              </Button>
            </Form>
          )
            : (
              <SuccessMessage message=" Exchange Successfully Added" />
              )}
        </Modal.Body>
        {alertPort ? (
          <Snackbar
            open={alertPort}
            onClose={handleClosePort}
            sx={{
              // marginTop:'-2%',
              marginLeft: '44%',
              marginBottom: '38%',
              width: '25%'
            }}
          >
            <Alert
              onClose={handleClosePort}
              severity="success"
              sx={{ width: '100%', backgroundColor: 'white', color: 'black' }}
            >
              Portfolio Added successfully
            </Alert>
          </Snackbar>
        )
          : <></>
        }
      </Modal>
    </div>
  )
}
export default UserPortfolios
