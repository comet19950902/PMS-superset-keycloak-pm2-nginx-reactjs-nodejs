import React, { useState,useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory from 'react-bootstrap-table2-filter'
import { Row, Col, Form } from 'react-bootstrap'
import Dropdown from 'react-bootstrap/Dropdown'
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import SortIcon from '@mui/icons-material/Sort'
import {useSelector,useDispatch} from "react-redux";
import { setSelectedColumnId, setSelectedColumnValueTable,setHiddenValueForColumn,setSelectedColumnIdValue} from '../../Redux/appSlice';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
import { useLocation } from 'react-router-dom'
let s=[]
let d=[]
let f =[]
let selectArray=[]
const CommonTableAccountant = (props) => {
  const location =useLocation()
  const [loading,setLoading]=useState(false)
  console.log(location,props)
  const dispatch=useDispatch();
  const {selectedColumnValueTable,selectedColumnId,hiddenValueForColumn,selectedColumnIdValue,addCheckboxValue }=useSelector((store)=>store.app);
  
  console.log(props )
  // for(let b of props.columns){
  //  for(let c of f){
  //   var x = props.columns.filter(i=>i.dataField!=c.dataField)
  //   console.log(c)
  //  }
  // }
  const handleToggleValue=(data)=>{
    dispatch(setHiddenValueForColumn(true))
  }

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
  
    return (
      <div style={{marginLeft:'8px'}}>
        <span style={{color:'#FFC107', cursor:'pointer'}} onClick={ handleClick }><SystemUpdateAltIcon style={{marginTop:'4px',height:'20px'}}/></span>
      </div>
    );
  };
  const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
    <Dropdown alignRight={true} style={{position:'fixed',top:'63px'}}>
      <Dropdown.Toggle
        id={'options-button'}
        variant="borderless-dark"
        bsPrefix="no-chevron"
        size="sm"
        style={{ color: '#FFC107', fontSize: '25px', fontWeight: '700' }}
      >
        <SortIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu  className='dropdown_scroll' style={{ willChange: 'transform', fontSize: '14px',height:'20rem',overflow:'auto', background: 'rgb(31, 33, 37)', border:'0.3em solid white' }}>
        {columns
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
          //aria-checked={column.toggle ? 'true' : 'false'}
          onChange={() => {
            onColumnToggle(column.dataField);
            dispatch(setSelectedColumnIdValue(column?.dataField))
            const postData={"Type":selectedColumnIdValue,"Value":selectedColumnValueTable};
             if(column.toggle==true)
              {
                // console.log(selectedColumnId);
                dispatch(setSelectedColumnId({type:"ADD_FILTER",value:column?.dataField}));
              
            }
             else
            {
              // console.log("else part",selectedColumnId);
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
  const selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      // console.log(row);
      // console.log(isSelect);
      if(isSelect){
        console.log(props)
        props.selectData.push(row)
        console.log(props)
         props.setSelectData(props.selectData)
      }else{
        props.selectData.pop(row)
         props.setSelectData(props.selectData)
      }
      // console.log(rowIndex);
      // console.log(e);
    },
    onSelectAll: (isSelect, rows, e) => {
      // console.log(isSelect);
      // console.log(rows);
      // console.log(e);
      if(isSelect){
        console.log(props)
        props?.selectData?.push(rows)
        console.log(props,props.selectData)
         props?.setSelectData(props.selectData[0])
      }else{
        props?.selectData?.pop(rows)
         props?.setSelectData([])
      }
    }
  };
  const Record= props.loading ? "" :  !(props.data?.length>0) && 'no record found'
  console.log(selectRow)
  return (
    <div className="tablet" style={{width:'100%'}} >
      {
        props.data && (
          <ToolkitProvider
            bootstrap4
            keyField="game_id"
            data={props.data}
            columns={props.columns}
            columnToggle
            // selectRow={ selectRow }
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
                  <BootstrapTable 
                  filter={location.pathname=='/PMS/deleted_entries' ? undefined : filterFactory()}
                    {...props.baseProps}
                    selectRow={ location.pathname=='/PMS/payments' || location.pathname=='/PMS/ledger' ? undefined : selectRow }
                    wrapperClasses="table-responsive"
                    noDataIndication={Record}
            //      cellEdit={cellEditFactory({
            //   mode: "checkbox",
            //   blurToSave: true,
            //   afterSaveCell: (oldValue, newValue, row, column) => {}
            // })}
                  /> 
                  

                </Col>
                {location.pathname=='/PMS/deleted_entries' ? <></> :
                <Col style={{ flexDirection: 'column', flex: 0,position:'fixed',right:'16.5em',marginTop:'-2.6em',width:'0.5em',display:'flex',flexDirection:'row',zIndex:1 }}>
              <CustomToggleList {  ...props.columnToggleProps} />
               {/* <MyExportCSV { ...props.csvProps } />  */}
            </Col>}
              </Row>
            )}
          </ToolkitProvider>
        )
      }
    </div >
  )
}

export default CommonTableAccountant