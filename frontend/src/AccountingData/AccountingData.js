import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonAccountantTable from "../common/CommonTable/CommonAccountantTable";
import axios from "axios";
import { textFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { v4 as uuidv4 } from 'uuid';
import cx from 'classnames';
import Spinner from '../common/spinner'
import moment from 'moment'
import { Link } from 'react-router-dom';

import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import CloseIcon from '@mui/icons-material/Close';
import Header from "../common/Header/Header";
import "./AccountingData.css";
import SidebarAdmin from "../Admin/DashboardAdmin/SidebarAdmin";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import "react-phone-number-input/style.css";
import Tooltip from '@mui/material/Tooltip';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import Checkbox from '@mui/material/Checkbox';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchBox from "../common/SearchBox/SearchBox";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { set } from "date-fns";
import { Alert, TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar'
import ModalForEditRowData from "./ModalForEditRowData";
import ModalForCloneData from "./ModalForCloneData";
import { setOpenModalEditRow, setOpenModalCloneRow, setOpenModalToAddData, setOpenModalToEditSelectedRow, setResultShowData, setEditAccountancyRowData, setAddCheckboxValue } from "../Redux/appSlice";
import ModalForAddRowData from "./ModalForAddRowData";
import ModalForEditSelectedRows from "./ModalForEditSelectedRows";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { RowingFontIcon } from "react-md";
import  { read, utils, writeFile } from 'xlsx';
import { UploadFile } from "@mui/icons-material";

function AccountingData() {
  const dispatch = useDispatch();


  const { selectedColumnId } = useSelector((store) => store.app);
  const array = [];
  const { openModalEditRow, openModalCloneRow, openModalToAddData, openModalToEditSelectedRow, resultShowData, editAccountancyRowData, addCheckboxValue } = useSelector((store) => store.app);
  const getId = localStorage.getItem("sub_Id");
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openMultiDeleteModal, setOpenMultiDeleteModal] = useState(false);
  const [result4, setResult4] = useState([]);
  const [rowData, setRowData] = useState([]);
  const arrayValue = [];
  const [alertNoRecord,setAlertNoRecord]=useState(false)
  const temp = arrayValue?.filter(item => item.game_id);
  const [sea, setSea] = useState("");
  const [loading,setLoading]=useState(true)
  const [selectData,setSelectData]=useState([])
  const [search, setSearch] = useState([]);
  const [resultUser, setResultUser] = useState([]);
  const [deleteItem, setDeleteItem] = useState([]);
  const [allAccountancyData, setAllAccountancyData]=useState([])
  const [checked, setChecked] = useState(false);
  const [gameIdExistError,setGameIdExistError]=useState(false)
  const [alertDateError, setAlertDateError] = useState(false)
  const [alertWeekError, setAlertWeekError] = useState(false)
  const [alertStatusError, setAlertStatusError] = useState(false)
  const [alertGameIdError, setAlertGameIdError] = useState(false)
  const [resultShareholdersData, setResultShareholdersData] = useState([])
  const [alertOwnershipError, setAlertOwnershipError] = useState(false)
  const [alertShareholderError, setAlertShareholderError] = useState(false)
  const [alertColumnError, setAlertColumnError] = useState(false)
  const [alertGameUpdateSuccess, setAlertGameUpdateSuccess] = useState(false)
  const [validated, setValidated] = useState(false);
  let gameFilter, gameDetailsFilter, venueFilter, typeFilter, weekFilter, DateFilter, hostFilter, creditorFilter, playerFilter, shareholderFilter, resultFilter, ownershipFilter, idFilter
  // console.log('selected',selectedColumnId)
  console.log(selectData)
  const shareholderListData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/get_share_holder`, {
      })
      .then(function (response) {
        // console.log(response.data)

        setResultShareholdersData(response.data)

      })
      .catch(function (error) {
        // console.log(error)
      })
  }
  const handleData = async () => {
    setLoading(true)
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASE_URL}/get_accountancy`,
    }
    await axios(config).then(function (response) {
      // console.log(response)
      setLoading(false)
     setAllAccountancyData(response.data)
      // const d1 = Math.floor(new Date(new Date().getFullYear(), 0, 1).getTime()/1000)
      const ONE_WEEK = 60 * 60 * 24 * 7;
      // const ONE_DAY = 60 * 60 * 24;
      // const ONE_HOUR = 60 * 60;

      // console.log(new Date(response.data[0].date_updated).getTime()/1000)
      const data1 = response.data.filter(item => item.status == 'A')

      const temp2 = data1?.map(record => {
        let currentDate = new Date();
        let res = record.exchange_rate != null ? parseFloat(record.result) / parseFloat(record.exchange_rate) : "-"
        let rowDate = moment(record.date, 'YYYY-MM-DD', true).isValid() ? new Date(record.date).getTime() / 1000 : new Date(record.date.split("/")[2],record.date.split("/")[1]-1,record.date.split("/")[0]).getTime() / 1000
        let startDate = rowDate < new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime() / 1000 ? new Date(new Date(currentDate.getFullYear(), -12, 1)).getTime() / 1000 : new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime() / 1000;
        // var days = Math.floor((rowDate - startDate) /
        //     (24 * 60 * 60 * 1000));   
        // var weekNumber = Math.ceil(days / 7);
        console.log(new Date(currentDate.getFullYear(), 0, 1),new Date(currentDate.getFullYear(), -12, 1))
        let diff = Math.ceil((rowDate - startDate))
        let weekNumber = Math.ceil(diff / ONE_WEEK)
        return { ...record, weeks: weekNumber, result_USD: parseFloat(parseFloat(res).toFixed(2)) ,result:parseFloat(record.result), game_id: parseInt(record.game_id),exchange_rate:parseFloat(record.exchange_rate) }
      })
      // if (temp2) {
      //   var d = []
      //   for (let i = 0; i < temp2.length; i++) {
      //     if (d[temp2[i].game_id]) {
      //       // d[temp2[i].game_id].owner_ship.push(temp2[i]['owner_ship'])
      //       d[temp2[i].game_id].shareholder.push({'share_id':temp2[i]['share_holder_id'],'shareholder':temp2[i]['shareholders'],'owner':temp2[i]['owner_ship']})
      //     } else {
      //       d[temp2[i].game_id] = temp2[i]
      //       // console.log(d)
      //       let x = d[temp2[i]['game_id']]['owner_ship']
      //       d[temp2[i]['game_id']]['owner_ship'] = []
      //       // d[temp2[i].game_id]['owner_ship'].push(x)
      //       let y = d[temp2[i].game_id]['shareholders']
      //       d[temp2[i].game_id]['shareholder'] = []
      //       let z = d[temp2[i]['game_id']]['share_holder_id']
      //       d[temp2[i]['game_id']]['share_holder_id'] = []
      //       d[temp2[i].game_id]['shareholder'].push({'share_id':z,'shareholder':y, 'owner':x})

      //     }
      //   }
      // }
      //  console.log(d)

      // console.log(Object.values(d))

      // console.log("temp2",temp2);
      const gameArray = [...temp2];
      for (let i = 0; i < gameArray.length; i++) {
        gameArray[i].shares = []
        // gameArray[i].id=i+1
        let shareArray = [];
        let shareholderArray = []
        if (gameArray[i].shareholders != null) {
          shareholderArray = gameArray[i].shareholders.split(',');
          let ownerShipArray = []
          ownerShipArray = gameArray[i].shareholders_percentage.split(',');

          for (let j = 0; j < shareholderArray.length; j++) {
            let shareObject = {
              shareholder: shareholderArray[j],
              owner_ship: ownerShipArray[j]
            }
            shareArray.push(shareObject);
          }
          gameArray[i].shares = [...shareArray];
          shareArray = [];
          shareholderArray = [];
          ownerShipArray = [];
        }
      }
      if (gameArray) {
        gameArray.sort((a, b) => {
          const x = new Date(a.date_updated).getTime() / 1000
          const y = new Date(b.date_updated).getTime() / 1000
          return x > y ? -1 : x < y ? 1 : 0
        })
      }
      if(gameArray.length==0){
        dispatch(setResultShowData([]))
        setAlertNoRecord(true)
        setLoading(false)
      }else{
        setLoading(false)
        dispatch(setResultShowData(gameArray))
      }

       
     
     


    }).catch(function (error) {
      // console.log(error)
    })

  }
  let exportdataArray = []
  if (resultShowData) {
    for (let e of resultShowData) {
      exportdataArray.push({
        'game_id': parseInt(e.game_id), 'game': e.game, 'game_details': e.game_details, 'venue': e.venue, 'type': e.type, 'weeks': parseInt(e.weeks), 'date': moment(e.date, 'YYYY-MM-DD', true).isValid() ? e.date.split('-')[2]+'/'+e.date.split('-')[1]+'/'+e.date.split('-')[0] : new Date(new Date(e.date.split("/")[2],e.date.split("/")[1]-1,e.date.split("/")[0]).getTime()).toLocaleDateString('en-GB', {
          day: 'numeric', month: 'numeric', year: 'numeric'
        }).replace(/ /g, '/') ,
        'host': e.host, 'group_': e.group_, 'player': e.player, 'result': e.result, 'currency': e.currency, 'exchange_rate': e.exchange_rate, 'result_USD': e.result_USD, 'shareholders': e.shareholders, 'shareholders_percentage': e.shareholders_percentage, 'comment': e.comment

      })
    }
  }
  const handleSampleExportHandler=()=>{
    const headings = [[
      'game_id','game','game_details','venue','type','weeks','date','host','group_','player','result','currency','exchange_rate','result_USD','shareholders','shareholders_percentage','comment'
  ]];
  const note=[['note']]
  const wb = utils.book_new({cellText:true});
  const ws = utils.json_to_sheet([]);
  // const ws1 = utils.json_to_sheet(['note']);
    //  utils.sheet_add_aoa(ws,'YourValue');
   utils.sheet_add_aoa(ws,headings);
  
//  utils.sheet_add_json(ws, ['note'], { origin: 'A1', skipHeader:false ,cellDates:false,cellText:true, raw:false });
  utils.book_append_sheet(wb, ws,'Report');
   writeFile(wb, 'sample_report.xlsx');
  }
  // console.log('res', resultShowData)
  const handleExport = () => {
    const headings = [[
        'game_id','game','game_details','venue','type','weeks','date','host','group_','player','result','currency','exchange_rate','result_USD','shareholders','shareholders_percentage','comment'
    ]];
    const wb = utils.book_new({cellText:true});
    const ws = utils.json_to_sheet([]);
     utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, exportdataArray, { origin: 'A1', skipHeader:false ,cellDates:false,cellText:true, raw:false });
    utils.book_append_sheet(wb, ws,'Report');
     writeFile(wb, 'account report.xlsx');
 
  }
  const exportApi = async (importDataArray) => {
    
     let importData=importDataArray.map(el=>{
      return {...el,date:el.date?.split('/')[2]+'-'+el.date?.split('/')[1]+'-'+el.date?.split('/')[0]}
     })
     console.log(importData)
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/update_all_game`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "share_holder": importData,
      }
    }
    await axios(config)
      .then(function (response) {
        // console.log(response);
        handleData()
        setAlertGameUpdateSuccess(true)
        setTimeout(() => {
          location.reload()
          setAlertGameUpdateSuccess(false)
        }, 2000)
      })
      .catch(function (error) {
        // console.log(error)
      })
  }
  const handleImport = ($event) => {
    const files = $event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          let ind = 0
          let ind1 = 0
          //  console.log('obj',wb.Sheets[sheets[0]],utils.sheet_to_json(wb.Sheets[sheets[0]]))
          const importDataArray = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            console.log('import', importDataArray)
          // for (let i = 0; i < Object.values(wb.Sheets[sheets[0]]).length; i++) {
          //   if (Object.values(wb.Sheets[sheets[0]])[i]['w'] == 'date') {
          //     ind = i
          //      break
          //   }
          // }

          // importDataArray.forEach((e, i) => {
          //   let x = Object.keys(wb.Sheets[sheets[0]]).sort().indexOf(Object.keys(wb.Sheets[sheets[0]])[ind])
          //    e['date'] =wb.Sheets[sheets[0]][(Object.keys(wb.Sheets[sheets[0]])).sort()[(x + 1) + i]]['w']
          // })
          //  console.log(importDataArray,Object.keys(wb.Sheets[sheets[0]]))
          if(importDataArray.length==0){
            console.log('empty array',resultShowData)
            // handleMultiDeleteValue()
            return
          }
          function checkDuplicy(importDataObj, exportdataObj) {
            let flag = false
            let flagOwnership = false
            let flagShareholder = false
            let flagDate = false
            let flagGameId = false
            let flagWeek = false
            let flagStatus=false
            if (Object.keys(importDataObj).length === Object.keys(exportdataObj).length) {
              
               for (let i = 0; i < Object.keys(importDataObj).length; i++) {

                if (Object.keys(importDataObj)[i] === Object.keys(exportdataObj)[i]) {
                  // console.log('ok')
                  flag = true
                } else {
                  flag = false
                  // console.log('not ok')
                  setAlertColumnError(true)
                  setTimeout(() => {
                    setAlertColumnError(false)
                  }, 2000)
                  return
                }
              }
            }
            allAccountancyData.sort((a,b)=>{
              const x = parseInt(a.game_id)
              const y= parseInt(b.game_id)
              return x > y ? 1 : x < y ? -1 : 0
              })
              // console.log(importData)
              let importUpdateArr=[]
              let importNewArr=[]
              let importDataWithId=[]
               for(let i=0;i<importDataArray.length;i++){
                if(!importDataArray[i].game_id){
                console.log(importDataArray[i])
                importNewArr.push(importDataArray[i])
                  importDataWithId= importNewArr.map((record,index)=>{
                  return {...record,game_id:parseInt(allAccountancyData.slice(-1)[0].game_id)+1+index}
                })
              }
              else{
                  importUpdateArr.push(importDataArray[i])
                }
               }
               let importApiArray=[...importUpdateArr,...importDataWithId]
            const uniqueValues = new Set(importApiArray.map(v => v.game_id));
            let importData=importApiArray.map(record=>{
              return {...record, status:'A'}
            })
            console.log('alert4',importData)
            const accountingData= allAccountancyData.filter(i=>i.status=='I')
            //  console.log( accountingData)
             if (uniqueValues.size < importApiArray.length) {

              //  console.log('duplicates found',importApiArray,allAccountancyData.slice(-1)[0])
              
               var valueArr = importApiArray.map(function(item){ return item.game_id });
               var isDuplicate = valueArr.some(function(item, idx){ 
                   return valueArr.indexOf(item) != idx 
               });
               console.log(isDuplicate);
               if(isDuplicate==true){
                setGameIdExistError(true)
                location.reload()
                setTimeout(()=>setGameIdExistError(false),3000)
               }else{
                exportApi(importApiArray)
               } 
                    //  exportApi(importDataWithId)
              // flagGameId = false
              //   setAlertGameIdError(true)
              //   setTimeout(() => {
              //     //  location.reload()
              //     setAlertGameIdError(false)
              //   }, 3000)
            } 
            else if(accountingData.length==0){
              flagStatus=true
            } else if(accountingData.length>0){
              // console.log( accountingData)
                const results = importData.filter(({ status: id1 , game_id :gameId1 }) => !allAccountancyData.some(({ status: id2,game_id:gameId2 }) => id2 != id1 && gameId1==gameId2));
                const resultsCheck = importData.filter(({ status: id1 , game_id :gameId1 }) => allAccountancyData.some(({ status: id2,game_id:gameId2 }) => id2 != id1 && gameId1==gameId2));
                // console.log(resultsCheck)
                if(resultsCheck.length>0){
                  // importDataArray=[...results]
                  // console.log(importDataArray)
                  // flagStatus=true
                    exportApi(results)
                  // console.log(results)
                setAlertStatusError(true)
                setTimeout(() => {
                setAlertStatusError(false)
                }, 3000)
                } else if(resultsCheck.length==0){
                  // console.log('true',results)
                  exportApi(results)
                }
              }else{
              // console.log('right')
              flagGameId = true
            }
            for (let j = 0; j < importApiArray.length; j++) {
              
              // console.log(importDataArray.includes(importDataArray[j].game_id))
              if(parseInt(importApiArray[j].game_id)===importApiArray[j].game_id){
                flagGameId = true
              }else  {
                flagGameId = false
                console.log('game id err',importApiArray[j])
                // console.log('game false')
                setAlertGameIdError(true)
                setTimeout(() => {
                  location.reload()
                  setAlertGameIdError(false)
                }, 3000)
                return
              }
              
              
              // var DataArr = resultShareholdersData.map(function(item){ return item.game_id });
              // var isDuplicate = valueArr.some(function(item, idx){ 
              //     return valueArr.indexOf(item) != idx 
              // });
              for (let l = 0; l < importApiArray[j].shareholders?.split(',').length; l++) {
                let f = resultShareholdersData.filter(item => item.share_holder_name == importApiArray[j]?.shareholders.split(',')[l])
                  console.log('f',f)
                if (f.length == 0) {
                  // console.log('share err')
                  flagShareholder = false
                  setAlertShareholderError(true)
                  setTimeout(() => {
                      location.reload()
                    setAlertShareholderError(false)
                  }, 3000)
                  return
                } else {
                  // console.log('share')
                  flagShareholder = true
                  //  return
                }

              }
              if (importApiArray[j].shareholders_percentage === 100) {
                flagOwnership = true
              } else {
                let totalOwnership = 0
                for (let k = 0; k < importApiArray[j]?.shareholders_percentage?.split(',').length; k++) {
                  totalOwnership = totalOwnership + parseFloat(importApiArray[j]?.shareholders_percentage?.split(',')[k])
                }
                // console.log('tea',totalOwnership)

                if (!(totalOwnership === 100)) {
                  flagOwnership = false
                  // console.log('alert3')
                  setAlertOwnershipError(true)
                  setTimeout(() => {
                      location.reload()
                    setAlertOwnershipError(false)
                  }, 3000)
                  return
                } else {
                  flagOwnership = true
                  // console.log('else')
                }
              }

              // console.log(' date true',importDataArray[j],importDataArray[j].date,moment(importDataArray[j].date, 'DD/MM/YYYY',true).isValid())
              //  console.log('date',moment(new Date(importDataArray[j].date)).format('DD/MM/YYYY'),moment(importDataArray[j].date,'X').format('Do MMMM YYYY, h:mm:ss a'))
                // console.log(moment(importDataArray[j].date, 'DD/MM/YYYY', true).isValid())
              if (moment(importApiArray[j].date, 'YYYY-MM-DD', true).isValid() || moment(importApiArray[j].date, 'DD/MM/YYYY', true).isValid() || moment(importApiArray[j].date, 'DD/M/YY', true).isValid()) {
                flagDate = true
                // console.log(' date true', importDataArray[j].date)
              } else {
                flagDate = false
                setAlertDateError(true)
                setTimeout(() => {
                   location.reload()
                  setAlertDateError(false)
                }, 3000)
                // console.log(' date false')
                return
              }
              // console.log('game',importDataArray[j].game_id,parseInt(importDataArray[j].game_id) )
              if (parseInt(importApiArray[j].game_id) != importApiArray[j].game_id) {
                flagGameId = true
                // console.log('game id err')
                setAlertGameIdError(true)
                setTimeout(() => {
                  location.reload()
                  setAlertGameIdError(false)
                }, 3000)
                return
              } else {
                flagGameId = true
                // console.log('fixed')
              }
            //   let one_week = 60 * 60 * 24 * 7;
            //   let currentDate = new Date();
            //   let rowDate =  new Date(importDataArray[j].date.split("/")[2],importDataArray[j].date.split("/")[1]-1,importDataArray[j].date.split("/")[0]).getTime() / 1000
            //     console.log(rowDate, importDataArray[j].date)
            //   let startDate = new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime() / 1000;
            //   let diff = Math.ceil((rowDate - startDate))
            //   let weekNumber = Math.ceil(diff / one_week)
            //   console.log(rowDate, importDataArray[j].date,weekNumber,importDataArray[j].weeks)
            //   if (weekNumber === importDataArray[j].weeks) {
            //     flagWeek = true
            //     console.log('true')
            //   } else {
            //     flagWeek = true
            //     setAlertWeekError(true)
            //     setTimeout(() => {
            //       setAlertWeekError(false)
            //     }, 3000)
            //     console.log('false')
            //     return
            //   }
             }
              
           
             
            if (flagOwnership && flagShareholder && flagDate && flagGameId && flagStatus) {

              //  console.log('api')
             
              // console.log(importDataArray)
                    exportApi(importApiArray)
            } else {
              // console.log('alert1')
            }
          }
      
          checkDuplicy(importDataArray[0], exportdataArray[0])


          // for(let r of importDataArray){
          //     for(let rr of r.owner_ship.split(',')){
          //       t = t + parseInt(rr)
          //     }   
          //     if(t===100){
          //       console.log('success')
          //     }else{
          //      console.log('bad format')
          //   }
          // }
        }
      }
      // dispatch(setResultShowData(rows))
      reader.readAsArrayBuffer(file);
    }
  }
  // console.log(resultShowData)

  // let accShareholderArray = []
  // for(let i=0 ;i<resultShowData?.length;i++){
  //     accShareholderArray = [...accShareholderArray , ...resultShowData[i].shareholders?.split(',') ] 
  // }

  // console.log("accShareholderArray",accShareholderArray);

  // console.log(new Set(accShareholderArray));
  // let uniqueShareholder = [...new Set(accShareholderArray)];
  // console.log("uniqueShareholders",uniqueShareholder);
  // let shareholderColumns = [];
  // let rowObj ={};
  // for(let j=0;j<uniqueShareholder.length;j++){
  //     rowObj = {
  //       dataField: uniqueShareholder[j],
  //       text: uniqueShareholder[j]?.charAt(0)?.toUpperCase() + uniqueShareholder[j]?.slice(1),
  //       // sort: true,
  //       hidden: (selectedColumnId?.includes(uniqueShareholder[j]) == true),
  //       toggle: false,
  //   formatter: (cell, row, rowIndex, formatExtraData) => {
  //     let eachShareholder = row.shares.filter((ele)=> (ele.shareholder === uniqueShareholder[j])? ele :"")
  //     return (
  //       <>
  //             <span> {eachShareholder[0]?.owner_ship===undefined ? '-' : eachShareholder[0]?.owner_ship+"%" }
  //             </span>
  //       </>
  //     )}
  //     }
  //     shareholderColumns.push(rowObj);
  // }// for close

  // console.log("shareHolderColumns",shareholderColumns);
  // for(let k=0;k<resultShowData?.length;k++){
  //   console.log( uniqueShareholder)
  //   for(let l=0;uniqueShareholder?.length;l++){
  //   }
  // }


  useEffect(async () => {
    // setTimeout(async()=>{
    await handleData();
    await shareholderListData()
    // },5000)
  }, [])

  
  // console.log(resultShowData)

  // console.log(d)
  // console.log(resultShowData)
  // if(resultShowData){
  //   let test={}
  //   for(let data of resultShowData){

  //     if(test[data.game_id]){
  //       test[data.game_id].push(data)
  //     }
  //     else{
  //       test[data.game_id] = []
  //       test[data.game_id].push(data)
  //     }
  //     console.log(data.shares,test[data.game_id][0])
  //     data['shares']?.push(test[data.game_id][0])
  //     console.log(data)
  //   }
  //   console.log(resultShowData)
  // }

  // console.log(new Date(resultShowData?.[0]?.date_updated).getTime()/1000);

  const handleShowAddDataModal = () => {
    setValidated(false);
    dispatch(setOpenModalToAddData(true));
  }
  const handleShowComment = (data) => {
    dispatch(setEditAccountancyRowData(data))
    setRowData(data);
    setValidated(false)
    dispatch(setOpenModalEditRow(true));
  }
  const handleShowClone = (data) => {
    dispatch(setEditAccountancyRowData(data))
    setRowData(data);
    setValidated(false)
    dispatch(setOpenModalCloneRow(true));
  }
  const handleShowMultiDelete = () => {
    if(selectData.length>0){
    setOpenMultiDeleteModal(true)
    }
  }
  const handleCloseMultiDelete = () => {
    setOpenMultiDeleteModal(false)
  }
  const handleMultiDeleteUpdate = () => {
    handleMultiDeleteValue(selectData)
  }
  // console.log(addCheckboxValue);
  const handleMultiDeleteValue = async (selectData) => {
    var newData = [];
    for (const a of selectData) {
      newData.push({ "game_id": a.game_id, "status": "I" })
    }
    // addCheckboxValue.filter(item=>newData.push({"game_id":item.game_id,"status":"I"}))
    const config = {
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/updatestatus`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "status_detail": newData,
      }
    }
    await axios(config)
      .then(function (response) {
        // console.log(response);
        setSelectData([])
        // dispatch(setAddCheckboxValue({ type: "REMOVE_ITEM", value: [] }))
        handleData()
      })
      .catch(function (error) {
        console.log(error)
      })

  }

  const handleShowDelete = (row) => {
    // console.log(row);
    setDeleteItem(row)
    setOpenDeleteModal(true);
  }
  const handleClose = () => {
    setOpenDeleteModal(false)
  }

  const handleDeleteUpdate = () => {
    handleDeleteValue(deleteItem)
  }
  const handleDeleteValue = async (arrayValue) => {
    // console.log(arrayValue);

    const config = {
      method: 'delete',
      url: `${process.env.REACT_APP_BASE_URL}/updateStatus`,
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        game_id: deleteItem
      }
    }
    // console.log(config.params);
    await axios(config)
      .then(function (response) {
        handleData()
      })
      .catch(function (error) {
        // console.log(error)
      })

  }

  const handleDelete1 = (row) => {
    // dispatch(setAddCheckboxValue(row))
  }
  const columns4 = [
    // {
    //   dataField: 'share_holder_id',
    //    text: 'Select',
    //   hidden: (selectedColumnId?.includes("share_holder_id") === true),
    //   toggle: false,
    //   // editor: {
    //   //   type: 'checkbox',
    //   //   value: 'Y:N',
    //   // },
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     return (
    //       <>
    //         <span onClick={(e) => {
    //            handleDelete1(row)
    //         }}
    //           style={{ cursor: 'pointer', color: '#FFC107' }}
    //         >
    //           <input style={{ height: "0.7em", cursor: "pointer", width: '2em' }} type="checkbox" defaultChecked={checked} />
    //         </span>
    //       </>
    //     )
    //   }
    // },
    {
      dataField: "game_id",
      text: "Id",
      sort: true,
      hidden: (selectedColumnId?.includes("game_id") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'id',
        onFilter: filterVal => {
                  if(resultShowData.filter(i=>i.game_id==filterVal).length==0){
                    // setAlertNoRecord(true)
                    console.log(`Filter Value: ${filterVal}`,resultShowData)
                  }
          
        },
        getFilter: filter => {
          idFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.game_id}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: "game",
      text: "Game",
      sort: true,
      hidden: (selectedColumnId?.includes("game") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'game',
        getFilter: filter => {
          gameFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {

        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.game?.charAt(0)?.toUpperCase() + row.game?.slice(1).toLowerCase()}
              </span>

            </div>
          </>
        )
      }
    },

    {
      dataField: "game_details",
      text: "Game Details",
      sort: true,
      hidden: (selectedColumnId?.includes("game_details") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'game-details',
        getFilter: filter => {
          gameDetailsFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.game_details?.charAt(0)?.toUpperCase() + row.game_details?.slice(1).toLowerCase()}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: "venue",
      text: "Venue",
      sort: true,
      hidden: (selectedColumnId?.includes("venue") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'venue',
        getFilter: filter => {
          venueFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.venue?.charAt(0)?.toUpperCase() + row.venue?.slice(1).toLowerCase()}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      hidden: (selectedColumnId?.includes("type") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'type',
        getFilter: filter => {
          typeFilter = filter
        }
      }),
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
      dataField: "weeks",
      text: "Weeks",
      sort: true,
      sort: true,
      hidden: (selectedColumnId?.includes("weeks") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'week',
        getFilter: filter => {
          weekFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        //   const d1 = Math.floor(new Date(new Date().getFullYear(), 0, 1).getTime()/1000)
        const ONE_WEEK = 60 * 60 * 24 * 7;
        // const ONE_DAY = 60 * 60 * 24;
        // const ONE_HOUR = 60 * 60;
        // const d2 = Math.floor(new Date(row.date).getTime() / 1000)
        //   const difference_ms = Math.abs(d1 - d2);
        //   const week = Math.floor(difference_ms / ONE_WEEK);

        //   const hour = Math.floor(difference_ms / ONE_HOUR);
        //   const day = Math.floor(hour / 24);
        //   const h = hour - (day * 24)
        //   console.log(week, difference_ms, day, h)
        let currentDate = new Date();
        let rowDate = new Date(row.date).getTime() / 1000
        let startDate = new Date(new Date(currentDate.getFullYear(), 0, 1)).getTime() / 1000;
        // var days = Math.floor((rowDate - startDate) /
        //     (24 * 60 * 60 * 1000));   
        // var weekNumber = Math.ceil(days / 7);
        let diff = Math.ceil((rowDate - startDate))
        let weekNumber = Math.ceil(diff / ONE_WEEK)

        return (
          <span>
            {/* {row.weeks > 0 ?
            row.weeks + "weeks" + "," + row.day + "days" + "," + row.hour + "hrs" + +" " + "ago"
            : row.day > 0 ?
              row.day + "days" + "," + row.hour + "hrs" + " " + "ago"
              : row.hour > 0 ?
                row.hour + "hrs" + " " + "ago"
                : ""
            } */}
            {row.weeks
              //  > 0 ?
              // (weekNumber 
              //   + "weeks" + "," + day + "days" + "," + h + "hrs" +" " + "ago")
              // : day > 0 ?
              //   (day + "days" + "," + h + "hrs" + " " + "ago")
              //   : h > 0 ?
              //     (h + "hrs" + " " + "ago")
              //     : ""
            }
          </span>
        )
      }
    },
    {
      dataField: "date",
      text: "Date",
      sort: true,
      sort: true,
      hidden: (selectedColumnId?.includes("date") == true),
      toggle: false,
      filter: dateFilter({
        placeholder: 'date',
        getFilter: filter => {
          DateFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {moment(row.date, 'YYYY-MM-DD', true).isValid() ? moment(row.date).format('Do MMMM YYYY') : new Date(new Date(row.date.split("/")[2],row.date.split("/")[1]-1,row.date.split("/")[0]).getTime()).toLocaleDateString('en-GB', {
  day: 'numeric', month: 'long', year: 'numeric'
}).replace(/ /g, ' ')}
          </span>
        )
      }
    },
    {
      dataField: "host",
      text: "Host",
      sort: true,
      sort: true,
      hidden: (selectedColumnId?.includes("host") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'host',
        getFilter: filter => {
          hostFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.host?.charAt(0)?.toUpperCase() + row.host?.slice(1).toLowerCase()}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: "group_",
      text: "Group",
      sort: true,
      sort: true,
      hidden: (selectedColumnId?.includes("group_") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'group',
        getFilter: filter => {
          creditorFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.group_?.charAt(0).toUpperCase() + row.group_?.slice(1).toLowerCase()}
              </span>

            </div>
          </>
        )
      }
    },
    {
      dataField: "player",
      text: "Player",
      sort: true,
      hidden: (selectedColumnId?.includes("player") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'player',
        getFilter: filter => {
          playerFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div>
              <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
                {row.player?.charAt(0).toUpperCase() + row.player?.slice(1).toLowerCase()}
              </span>

            </div>
          </>
        )
      }
    },

    {
      dataField: "result",
      text: "Result",
      sort: true,
      hidden: (selectedColumnId?.includes("result") === true),
      toggle: false,
      filter: textFilter({
        placeholder: 'result',
        getFilter: filter => {
          resultFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {row.result > 0 ? <p style={{ color: '#00ff00' }}>{parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p> : <p style={{ color: '#ff0000' }}>{parseFloat(row.result).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p>}
          </span>
        )
      }
    },
    {
      dataField: "currency",
      text: "Currency",
      sort: true,
      hidden: (selectedColumnId?.includes("currency") === true),
      toggle: false,
      filter: textFilter({
        placeholder: 'currency',
        getFilter: filter => {
          let currencyFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            {row.currency != undefined ? <span style={{ color: 'white' }}>{row.currency}</span> : <span style={{ color: 'white' }} >-</span>}
          </>
        )
      }
    },
    {
      dataField: "exchange_rate",
      text: "Exchange-Rate",
      sort: true,
      hidden: (selectedColumnId?.includes("exchange_rate") === true),
      toggle: false,
      filter: textFilter({
        placeholder: 'exchange-rate',
        getFilter: filter => {
          resultFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {row.exchange_rate != undefined ? <p style={{ color: 'white' }}>{parseFloat(row.exchange_rate).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '')}</p> : <p style={{ color: 'white' }}>-</p>}
          </span>
        )
      }
    },
    {
      dataField: "result_USD",
      text: "Result USD($)",
      sort: true,
      hidden: (selectedColumnId?.includes("result_USD($)") === true),
      toggle: false,
      filter: numberFilter({
        placeholder: 'result-USD',
        // getFilter: filter => {
        //   resultFilter = filter
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
     
        console.log(row)
        // let res=parseFloat(row.result) * parseFloat(row.exchange_rate)
        return (
          <span
          >
            {parseFloat(row.result_USD) > 0 ? <p style={{ color: '#00ff00' }}>{'$'+parseFloat(row.result_USD).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '') }</p>  : <p style={{ color: '#ff0000' }}>{'-'+'$'+parseFloat(row.result_USD).toLocaleString('en-US', {minimumFractionDigits:2,maximumFractionDigits:2}).replace(/\.00$/, '').replace('-','')}</p>}
          </span>
        )
      }
    },
    {
      dataField: "shares",
      text: "ShareHolder",
      sort: true,
      hidden: (selectedColumnId?.includes("shares") == true),
      toggle: false,
      filter: textFilter({
        placeholder: 'shareholder',
        getFilter: filter => {
          shareholderFilter = filter
        }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        //  let abc =row.owner_ship.split(",").map(value=>parseInt(value,10).slice())
        //  console.log(abc)
        return (
          <ul style={{marginLeft:'-2em'}}>
            {
              row.shares?.map((e, i) => (
                <li style={{color:'#FFC107'}} key={e}>
                  <p style={{color:'white'}}>{e.shareholder?.charAt(0).toUpperCase() + e.shareholder?.slice(1)}- {e.owner_ship}%</p>
                </li>

              ))
            }
          </ul>
        )
      }
    },
    {
      dataField: "comment",
      text: "Comment",
      sort: true,
      hidden: (selectedColumnId?.includes("comment") === true),
      toggle: false,
      filter: textFilter({
        placeholder: 'comment',
        // getFilter: filter => {
        //   resultFilter = filter
        // }
      }),
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <span
          >
            {row.comment != undefined ? <p style={{ color: 'white' }}>{row.comment}</p> : <p style={{ color: 'white',marginLeft:'2em' }}>-</p>}
          </span>
        )
      }
    },
    // {
    //   dataField: "shubham",
    //   text: "shubham",
    //   sort: true,
    //   hidden: (selectedColumnId?.includes("result") === true),
    //   toggle: false,
    //   filter: textFilter({
    //     placeholder: 'result',
    //     getFilter: filter => {
    //       resultFilter = filter
    //     }
    //   }),
    //   formatter: (cell, row, rowIndex, formatExtraData) => {
    //     console.log('744',row,rowIndex)
    //     let eachShareholder = row.shares.filter((ele)=> (ele.shareholder === "shubham")? ele :"")
    //     return (
    //       <span
    //       >
    //         {eachShareholder[0].owner_ship}
    //         {/* {row.result>0 ? <p style={{color:'#00ff00'}}>{'$'+row.result}</p> : <p style={{ color:'#ff0000' }}>{'$'+row.result}</p>} */}
    //       </span>
    //     )
    //   }
    // },
    // ...shareholderColumns,

    
    {
      dataField: 'action',
      text: 'Actions',
      // sort: true,
      hidden: (selectedColumnId?.includes("action") === true),
      toggle: false,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <Tooltip title="Clone">
              <span
                style={{ cursor: 'pointer', color: '#FFC107' }}
                onClick={() => {
                  handleShowClone(row)
                  // dispatch(setOpenModalEditRow(true));
                }}
              >
                <FileCopyIcon />
              </span>
            </Tooltip>
            <span
              style={{ cursor: 'pointer', color: '#FFC107' }}
              onClick={() => handleShowComment(row)}
            >
              <Tooltip title={'edit'}>
                <EditOutlinedIcon />
              </Tooltip>
            </span>
          </>
        )
      }
    },

  ];
  let abc = []
  // abc= ([...columns4,{datafield:resultShareholdersData}])
  //  console.log('columnsAccount', abc,resultShareholdersData)
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Row className="d-flex justify-content-center">
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Accounting Data</h3>
              </span>
              <span style={{ marginTop: "1.7%" }}>
                <Tooltip title="Add Accounting Data">
                  <Link
                    to="#"
                    style={{
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      color: '#FFC107',top:'15px',
                      position:'relative'
                    }}
                    onClick={handleShowAddDataModal}
                  >
                    <AddCircleOutlineOutlinedIcon />
                  </Link>
                </Tooltip>
              </span>
              <div className="upload-data">
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    <label className="custom-file-label"  htmlFor="inputGroupFile">Choose file</label>
                  </div>
                </div>
                <Link
                to="#"
                className=" retrieve-transaction"
                onClick={handleSampleExportHandler}
                style={{ position: 'relative', top: '22px',marginRight:'-2em' }}
              > Download Template
              </Link>
               / {/* <button className="download-sample" onClick={handleSampleExportHandler}>Template</button> */}
                <span style={{ color: '#FFC107', cursor: 'pointer' }} onClick={handleExport} >
                  <SystemUpdateAltIcon style={{ marginTop: '20px', height: '20px' }} /></span>
              </div>
              <span className="p-2 pageheader">
                <Tooltip title="Edit shareholders for selected values">
                  <Link
                    to="#"
                    style={{
                      position: 'fixed',
                      right: '13em',
                      top: '4.5em',
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      color: '#FFC107'
                    }}
                    onClick={() => {
                      dispatch(setOpenModalToEditSelectedRow(true))
                    }}
                  >
                    <EditOutlinedIcon />
                  </Link>
                </Tooltip>
              </span>
              <span className="p-2 pageheader">
                <Tooltip title="Delete Selected Values">
                  <span
                    to="#"
                    style={{
                      position: 'fixed',
                      right: '11em',
                      top: '4.5em',
                      boxShadow: 'none',
                      cursor: 'pointer',
                      background: 'none',
                      color: 'red'
                    }}
                    onClick={() => handleShowMultiDelete(arrayValue)}
                  >
                    <DeleteOutlineIcon />
                  </span>
                </Tooltip>
              </span>
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  var regExp = /^[A-Za-z0-9]+$/;
                  setSea(event.target.value);
                  console.log(typeof(event.target.value),typeof(moment(resultShowData?.[0].date).format('Do MMMM YYYY')))
                  const x = resultShowData?.filter((i) =>
                   String(i.game_id).includes(event.target.value) ||
                   String(i.result_USD).includes(event.target.value) ||
                    String(i.result).includes(event.target.value) ||
                      i.game.toLowerCase().includes(event.target.value.toLowerCase())
                       || i.game_details.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.venue.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.type.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.host.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.group_.toLowerCase().includes(event.target.value.toLowerCase())
                        || i.player.toLowerCase().includes(event.target.value.toLowerCase())
                      || i.currency.toLowerCase().includes(event.target.value.toLowerCase())
                       || i.comment!=null && i.comment.toLowerCase().includes(event.target.value.toLowerCase())
                        ||  i.shares?.[0]?.shareholder==event.target.value.toLowerCase()
                       || i.shares?.[1]?.shareholder==event.target.value.toLowerCase()
                        || String(i.exchange_rate).includes(event.target.value)
                        ||
                        moment(i.date).format('Do MMMM YYYY')==event.target.value
                       || String(i.weeks).includes(event.target.value)
                  );
                  console.log(x)
                 if(x.length==0){
                  //  setAlertNoRecord(true)
                   setSearch([])
                 }else{
                  setSearch(x);
                 }
                  
                 
                }}
              />
              {alertGameUpdateSuccess
                ? (
                  <Snackbar
                    open={alertGameUpdateSuccess}
                    onClose={() => setAlertGameUpdateSuccess(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertGameUpdateSuccess(false)}
                      severity="success"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Upload successfully
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              {alertColumnError
                ? (
                  <Snackbar
                    open={alertColumnError}
                    onClose={() => setAlertColumnError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertColumnError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      columns order can not be change
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              {alertOwnershipError
                ? (
                  <Snackbar
                    open={alertOwnershipError}
                    onClose={() => setAlertOwnershipError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertOwnershipError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      shareholder % must be  100%.
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              {alertDateError
                ? (
                  <Snackbar
                    open={alertDateError}
                    onClose={() => setAlertDateError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertDateError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      invalid date format.
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
                {alertStatusError
                ? (
                  <Snackbar
                    open={alertStatusError}
                    onClose={() => setAlertStatusError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertStatusError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      some game id in trash & rest are uploaded
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              
              {gameIdExistError
                ? (
                  <Snackbar
                    open={gameIdExistError}
                    onClose={() => setGameIdExistError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setGameIdExistError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Game id already exist
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              {alertWeekError
                ? (
                  <Snackbar
                    open={alertWeekError}
                    onClose={() => setAlertWeekError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertWeekError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      invalid Week.
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
              {alertShareholderError
                ? (
                  <Snackbar
                    open={alertShareholderError}
                    onClose={() => setAlertShareholderError(false)}
                    sx={{
                      marginLeft: '42%',
                      marginBottom: '38%',
                      width: '25%'
                    }}
                  >
                    <Alert
                      onClose={() => setAlertShareholderError(false)}
                      severity="error"
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        color: 'black'
                      }}
                    >
                      Please upload correct shareholder
                    </Alert>
                  </Snackbar>
                )
                : (
                  <></>
                )}
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
            {sea ? (
              <CommonAccountantTable data={search} columns={columns4} selectData={selectData} setSelectData={setSelectData} />
            ) : (
              <CommonAccountantTable loading={loading} data={resultShowData} selectData={selectData} setSelectData={setSelectData} columns={columns4} />
            )}
            {
              (openModalEditRow == true)
                ?
                <ModalForEditRowData rowData={rowData} validated={validated} />
                :
                <></>
            }
            {
              (openModalCloneRow == true)
                ?
                <ModalForCloneData rowData={rowData} validated={validated} />
                :
                <></>
            }
            {
              (openModalToAddData == true)
                ?
                <ModalForAddRowData validated={validated} />
                :
                <></>
            }
            {
              (openModalToEditSelectedRow == true)
                ?
                <ModalForEditSelectedRows validated={validated} />
                :
                <>
                </>
            }
          </Col>
        
          <Modal
            show={openMultiDeleteModal}
            onHide={handleCloseMultiDelete}
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
                  fontSize: '16px',
                  marginTop: '-5%',
                  marginLeft: '9%' 
                }}
              >
                Are you sure you want to Delete all these Accounts ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer
              style={{
                backgroundColor: '#222429',
                borderTop: 'none',
                paddingRight: '34%',
                marginTop: '-3%'
              }}
            >
              <Button
                variant="success"
                style={{ width: '25%',backgroundColor: '#006400'  }}
                onClick={() => {
                  handleMultiDeleteUpdate()
                  handleCloseMultiDelete()
                }}
              >
                Yes
              </Button>
              <Button
                variant="danger"
                onClick={handleCloseMultiDelete}
                style={{ width: '25%',  backgroundColor: '#b30000' }}
              >
                No
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={openDeleteModal}
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

                }}
              >
                Are you sure you want to Delete this Account ?
              </Modal.Title>
            </Modal.Header>
            <Modal.Footer
              style={{
                color: 'white',
                fontSize: '18px',
                marginTop: '-5%',
                marginLeft: '11%'
              }}
            >
              <Button
                variant="danger"
                style={{ width: '25%', backgroundColor: '#b30000' }}
                onClick={() => {
                  handleDeleteUpdate()
                  handleClose()
                }}
              >
                Yes
              </Button>
              <Button
                variant="success"
                onClick={handleClose}
                style={{ width: '25%', backgroundColor: '#006400' }}
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
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default AccountingData;