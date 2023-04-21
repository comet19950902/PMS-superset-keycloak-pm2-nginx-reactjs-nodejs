import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdOutlineDeleteOutline,MdModeEditOutline } from "react-icons/md";
import { useState } from "react";
import { setOpenCommonModalDeleteStatus,setOpenEditExchangeModalStatus } from "../Redux/appSlice";
import { useSelector,useDispatch } from "react-redux";
import "./RawTable.css";
import { useFormik } from 'formik';
import { useEffect } from "react";
import axios from "axios";
import ModalToEditExchangeValue from "./commonModals/modalToEditExchangeValue";
import ModalDeleteExchangeValue from "./commonModals/ModalToDeleteValue";

export default function RawTableExchange({data,columns}) {
  const [result,setResult]=useState([]);
    const dispatch=useDispatch();
    // console.log("DATA>>>>>>>>>>>",data);
    let roleId = localStorage.getItem('role').split(',')
    const [tableData,setTableData]=useState([]);
    // const [result1,setResult1]=useState([]);
    const [name, setName] = useState(null);
    const [keyStatus, setKeyStatus] = useState(null);
    const [condition, setCondition] = useState(false);
    const [spanOrderKey,setOrderKey]=useState(null);
    const [spanOrderName,setSpanOrderName]=useState(null);  
    const [spanCondition,setSpanCondition]=useState(false);
    const [dataEditRowModal,setDataEditRowModal]=useState([]);
    const [dataDeleteRowModal,setDataDeleteRowModal]=useState([]);
    const {openCommonModalDeleteStatus,openEditExchangeModalStatus}=useSelector((store)=>store.app); 
    const exchange = async () => {
      const config = {
        method: 'get',
        url: `${process.env.REACT_APP_BASE_URL}/getExchangeData`,
        params:
        {
          portfolio_id:data[0]?.portfolio_id
        }
      }
      await axios(config).then(function (response) {
        response.data.sort((a,b)=>{
          const x = parseInt(a.takerCommission)
          const y = parseInt(b.takerCommission)
          return x > y ? -1 : x < y ? 1 : 0
    })
        setResult(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  useEffect(()=>{
    exchange()
  },[data,openEditExchangeModalStatus,openCommonModalDeleteStatus])
  let result1=( [...new Map(result?.map(item =>
    [item.apikey, item])).values()])
    let uniqueKeyObject ={};
    for(let i=0;i<result1.length;i++){
      let uniqueArray = result.filter(item=>item.apikey===result1[i].apikey)
      uniqueKeyObject = {...uniqueKeyObject , [i] : [...uniqueArray] }
    }
    let apiObject ={}
    for( let j=0;j<Object.keys(uniqueKeyObject).length ;j++){
      let apiTempObject ={
          assetsName:uniqueKeyObject[j].map((ele) => ele.assetName ),
          free:uniqueKeyObject[j].map((ele) => ele.free ),
      }
      apiObject ={...apiObject , [j]:apiTempObject };
      console.log(apiTempObject)
       let total=apiTempObject.free.reduce(
      (prevValue, currentValue) => prevValue + parseFloat(currentValue),
      0
    );
    apiObject ={...apiObject , [j]:apiTempObject };
    }
   
    
    result1=result1.map((ele,index)=>{ return { ...ele ,asset:{assetName:apiObject[index]?.assetsName ,free:apiObject[index]?.free}  } }  );
    // console.log("final array",result1);


    const iconData=[
        {
            name:"Up Arrow",
            icon:<FaArrowUp/>
        },
        {
            name:"Down Arrow",
            icon:<FaArrowDown/>
        }
    ];
  
    const handleClickSpan=(item,key)=>{
      console.log(item,key);
      setOrderKey(key);
      setSpanOrderName(item);
      setSpanCondition((prev)=>!prev);
    //  handleOrderingData()
    if(item.dataField=='exchange_name'){
      result.sort( (a, b) => a > b ? 1 : -1) 
    } else if(item.dataField=='exchange_type'){
      result.sort( (a, b) => a.exchange_type > b.exchange_type ? 1 : a.exchange_type > b.exchange_type ? -1 : 0) 
    }else if(item.dataField=='asset'){
      result.reverse();
    } else if(item.dataField=='accountType'){
      result.sort( (a, b) => a.accountType > b.accountType ? 1 : a.accountType > b.accountType ? -1 : 0) 
    }else if(item.dataField=='free'){
      result.reverse()
    }
  }
  
  // const handleOrderingData=()=>{
  //    console.log(data.reverse(),result1)
  // }
const handleReduce=(item)=>{
  let result=item?.asset.free.reduce(
    (prevValue, currentValue) => prevValue + parseFloat(currentValue),
    0
  );
    return Math.round(result);
}

const handleClickDelete=(item)=>{
  dispatch(setOpenCommonModalDeleteStatus(true))
  setDataDeleteRowModal(item)
  console.log("DELETE",item);
  exchange()
}
// console.log('DELETEMODAL', openCommonModalDeleteStatus,dataDeleteRowModal,openCommonModalDeleteStatus);
const handleClickEdit=(item)=>{
  dispatch(setOpenEditExchangeModalStatus(true))
  setDataEditRowModal(item)
  // console.log("Exchange",item);
   exchange()
}
// console.log(tableData);


  return (
      <div className="container_exchange">
       <div className="container_row_fixed">
       <table className="raw_table">
        <tr>
          {columns?.map((info, key) => (
            <th >
              {info.text}
                {
                iconData?.map((item,key)=>(
                    <span key={key} style={{fontSize:"12px",color:key===spanOrderKey && info.text===spanOrderName.text ?"white":"grey",paddingLeft:"0.2em", cursor:'pointer', fontWeight:'600',fontFamily:'Inter,Helvetica,Arial'}} onClick={()=>handleClickSpan(info,key)}>
                        {item.icon}
                    </span>
                ))
              }   
            </th>
          ))}
        </tr>
        <tbody className="raw_table_body">
        {result1?.map((item, key) => (
          <tr key={key}>
            <td>{item?.exchange_name}</td>
            <td>{item?.exchange_type}</td>
            {name?.assetName?.length === item?.assetName?.length &&
            key === keyStatus &&
            condition ? (
              <td style={{ cursor: "pointer" }}>
                <ul style={{marginLeft:'-2em'}}>
                  {item?.asset?.assetName?.map((value, key) => (
                    <li style={{fontSize:"14px",color:"rgb(255, 193, 7)"}}><span>{value}-${parseFloat(item?.asset?.free[key]).toFixed(2)}</span></li>
                  ))}
                </ul>
                <div
                  onClick={() => {
                    setCondition((prev) => !prev);
                    setName(item);
                    setKeyStatus(key);
                    // console.log("clicked");
                  }}
                  className='less'
                >
                  Show less
                </div>
              </td>
            ) : (
              <td style={{ cursor: "pointer" }}>
                <ul style={{marginLeft:'-2em'}}>
                  {item?.asset?.assetName?.slice(0, 5)?.map((value, key) => (
                    <li style={{fontSize:"14px",color:"rgb(255, 193, 7)"}}><span>{value}-${parseFloat(item?.asset?.free[key]).toFixed(2)}</span></li>
                  ))}
                </ul>
                <div
                  onClick={() => {
                    setCondition((prev) => !prev);
                    setName(item);
                    setKeyStatus(key);
                    console.log("clicked");
                  }}
                  className='more'
                >
                  Show more
                </div>
              </td>
            )}
            {/* <td style={{maxHeight:"10rem"}}>123</td> */}
            <td>{item?.accountType}</td>
            <td>${handleReduce(item)}</td>
            {/* <td>
              <div style={{display:"flex",gap:'0.3rem'}}>
              <p style={{cursor:"pointer"}} onClick={()=>handleClickDelete(item)}>
              <MdOutlineDeleteOutline color="red" fontSize="1.2rem"/>
              </p>
              <p style={{cursor:"pointer"}} onClick={()=>handleClickEdit(item)}>
                <MdModeEditOutline color="rgb(255, 193, 7)" fontSize="1.2rem"/>
              </p>
              </div>
            </td> */}
          </tr>
        ))}

        </tbody>
             </table>
             {
              openCommonModalDeleteStatus
              ?
              <ModalDeleteExchangeValue row={dataDeleteRowModal}/>
              :
             <></>
             }
             {
              openEditExchangeModalStatus
              ?
              <ModalToEditExchangeValue row={dataEditRowModal} />
              :
              <></>
             }
       </div>
      </div>
  );
}
