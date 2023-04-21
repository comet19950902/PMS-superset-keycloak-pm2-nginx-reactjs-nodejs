import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
import { Image, Row, Col, Form } from "react-bootstrap";
 import Dropdown from 'react-bootstrap/Dropdown';
 import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SortIcon from '@mui/icons-material/Sort';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import AuditHistorySingleInvestment from '../../Admin/DashboardAdmin/AuditHistorySingleInvestment'
//  import WalletInfoFirstLevel from '../../Admin/DashboardAdmin/WalletInfoFirstLevel';

const CommonTableInvestmentInfo = (props) => {
  // const expandRow = {
  //   renderer: row => (
  //     <div>
  //       {console.log(row)}
  //        <WalletInfoFirstLevel  address_id={row} /> 

  //     </div>
  //   ),
  //   showExpandColumn: true,
  // }
  // console.log(expandRow)
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]
  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div  style={{marginLeft:'-2px',top:'-9px',position:'relative'}}>
        <span style={{color:'#FFC107', cursor:'pointer'}} onClick={ handleClick }><SystemUpdateAltIcon style={{marginTop:'4px',height:'20px'}}/></span>
      </div>
    );
  };
  const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (
       <Dropdown alignRight={true} style={{top:'-18px',marginLeft:'56px'}}>
      <Dropdown.Toggle
        id={"options-button"}
        // @ts-ignore
        variant="borderless-dark"
        bsPrefix="no-chevron"
        size="sm"
        style={{ color:'#FFC107',fontSize: '25px', fontWeight:'700'}}
      >
         <SortIcon />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ willChange: "transform",fontSize:'14px', background:'rgb(31, 33, 37)' , borderColor:'white'}}>
        {columns
    ?.map(column => ({
      ...column,
      toggle: toggles[column.dataField],
    }))
    .map((column, index) =>
        <Form.Check
           type="switch"
          key={column.dataField}
          inline
          multiple
          label={column.text}
           id={column.dataField}
           checked={column.toggle}
          aria-checked={column.toggle ? "true" : "false"}
          onChange={() => {
            console.log(column.toggle)
            onColumnToggle(column.dataField)
          }
            }
        />
    )}
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="tablet wallet-table" style={{width:'100%', overflow:'auto'}} >
      {props.data && (
        <ToolkitProvider
          bootstrap4
          keyField="address_id"
          data={props.data}
          columns={props.columns}
          columnToggle
         
          draggable
          search
          exportCSV={ {
            fileName: 'Transactions.csv',
            onlyExportFiltered: true, exportAll: false 
          }}
          defaultSorted={defaultSorted}
        >
          {(props) => (
              <Row>
                
                <Col style={{ flexDirection: 'column', maxWidth:'100%', flex: 1 }}>
                  <BootstrapTable filter={filterFactory()}
                    {...props.baseProps}
                    wrapperClasses=" investment-border"
                   noDataIndication="no data found"
                    // expandRow={expandRow}
                  />
                </Col>
                {/* <Col style={{ flexDirection: 'column', flex: 0, position:'fixed', width:'.5em',right:'16.5em',top:'5em',display:'flex',flexDirection:'row',zIndex:1 }}>
                  <CustomToggleList {...props.columnToggleProps} />
                  <MyExportCSV { ...props.csvProps } />
                </Col> */}
              </Row>
            )}
        </ToolkitProvider>
      )}
    </div>
  )
}

export default CommonTableInvestmentInfo
