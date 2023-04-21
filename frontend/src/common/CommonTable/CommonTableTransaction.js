import React, { useState,useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import { Row, Col, Form } from 'react-bootstrap'
import {useSelector,useDispatch} from "react-redux";
import { setSelectedColumnId, setSelectedColumnValueTable,setHiddenValueForColumn,setSelectedColumnIdValue } from '../../Redux/appSlice';
import Dropdown from 'react-bootstrap/Dropdown'
import SortIcon from '@mui/icons-material/Sort'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
import { useLocation } from 'react-router-dom'
import Spinner from '../../common/spinner'
const CommonTableTransaction = (props) => {
  const location=useLocation()
  const [loading,setLoading]=useState(false)
   console.log(props)
  const dispatch=useDispatch();
  const {selectedColumnValueTable,selectedColumnId,hiddenValueForColumn,selectedColumnIdValue}=useSelector((store)=>store.app);
  const [checkboxStateData,setCheckboxData]=useState("");
  const [show, toggleShow] = useState(false)
  const [state, setState] = useState(false)
   
 
  
  // const newData = [{
  //   hash:false,
  //   usd_result:false,
  //   tron_address_id:false
  //    hash_id:false,

  //   } , ...props.data];


  // console.log(props )
  // for(let b of props.columns){
  //  for(let c of f){
  //   var x = props.columns.filter(i=>i.dataField!=c.dataField)
  //   console.log(c)
  //  }
  // }

  const handleToggleValue=(data)=>{
    dispatch(setHiddenValueForColumn(true))
  }
  const handleclick = () => {
    setState(current => !current)
  }
  const handleClose = () => {
    toggleShow(false)
  }
  const MyExportCSV = (props) => {
    const handleClick = () => {
      
        props.onExport();
    };
    useEffect(()=>{
      
    },[])
    return (
      <div style={{marginLeft:'7px',top:'5px',position:'relative'}}>
        <span style={{color:'#FFC107', cursor:'pointer'}} onClick={ handleClick }><SystemUpdateAltIcon style={{marginTop:'4px',height:'20px'}}/></span>
      </div>
    );
  };
  const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
    <Dropdown alignRight={true} style={{top:'-6px',marginLeft:'45px'}}>
      <Dropdown.Toggle
        id={'options-button'}
        variant="borderless-dark"
        bsPrefix="no-chevron"
        size="sm"
        style={{ color: '#FFC107', fontSize: '25px', fontWeight: '700' }}
      >
        <SortIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ willChange: 'transform', fontSize: '14px', background: 'rgb(31, 33, 37)', borderColor: 'white' }}>
        {columns.filter(i=>i.dataField!='address_type' && i.dataField!='token_type' && i.dataField!='transac_amt')
          ?.map(column => ({
            ...column,
             toggle: toggles[column.dataField]
          }))
          .map((column, index) =>
          <Form.Check
          type="switch"
          key={column.dataField}
          inline
          multiple
          label={column.text}
          id={column.dataField}
           checked={!selectedColumnId.includes(column.dataField)}
           aria-checked={column.toggle ? 'true' : 'false'}
          onChange={() => {
            // console.log(column.toggle);
            // console.log(e.target.checked);
            //console.log(column?.toggle);
             onColumnToggle(column.dataField);
               dispatch(setSelectedColumnIdValue(column?.dataField))
            // const postData={"Type":selectedColumnIdValue,"Value":selectedColumnValueTable};
           
           
            

             if(column.toggle==true)
              {
                 dispatch(setSelectedColumnId({type:"ADD_FILTER",value:column?.dataField}));
              
            }
             else
            {
               dispatch(setSelectedColumnId(column?.dataField)) 
               dispatch(setSelectedColumnId({type:"REMOVE_FILTER",value:column?.dataField}))   
             
             handleToggleValue(column);
            }
          
            
          }
          }
        />
          )}
      </Dropdown.Menu>
    </Dropdown>
  )
  const Record= props.loading ? "" :  !(props.data.length>0) && 'no record found'
  return (
    <div className="tablet" style={{width:'100%'}} >
      {
        props.data && (
          <ToolkitProvider
            bootstrap4
            keyField="id"
            data={props.data}
            columns={props.columns}
            columnToggle
            draggable
            search
            exportCSV={ {
              fileName: 'Transactions.csv',
              onlyExportFiltered: true, exportAll: false 
              // separator: '|',
              // ignoreHeader: true,
              // noAutoBOM: false,
              // blobType: 'text/csv;charset=ansi'
            } }>
            {(props) => (
             
              <Row>
              
                <Col style={{ flexDirection: 'column', maxWidth:'100%', flex: 1 }}>
                  <BootstrapTable filter={filterFactory()}
                    {...props.baseProps}
                    // wrapperClasses="transaction"
                    noDataIndication={Record}
                  /> 
                 
                </Col>
                <Col style={{ flexDirection: 'column', flex: 0,position:'absolute',right:'16.5em',top:'2rem',width:'0.5em',display:'flex',flexDirection:'row' }}>
              <CustomToggleList {  ...props.columnToggleProps} />
              <MyExportCSV { ...props.csvProps  } />
             
            </Col>
            
              </Row>
              
            )}
          </ToolkitProvider>
        )
      }
    </div >
  )
}

export default CommonTableTransaction
