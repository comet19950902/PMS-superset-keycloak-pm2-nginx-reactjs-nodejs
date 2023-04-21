import {React,useState} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css';
import { Link, useLocation } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { Image, Row, Col, Form } from "react-bootstrap";
 import Dropdown from 'react-bootstrap/Dropdown';
 import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import SortIcon from '@mui/icons-material/Sort';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import AuditHistorySingleInvestment from '../../Admin/DashboardAdmin/AuditHistorySingleInvestment'
import InvestmentHistoryTop from '../../Admin/DashboardAdmin/InvestmentHistoryTop';
import { setExpandRowCol } from '../../Redux/appSlice';
import { useLoaderData } from 'react-router-dom';
import PaymentHistoryTop from '../../PaymentLogs/PaymentHistoryTop';

const CommonTableInvTop = (props) => {
  const location = useLocation()
const {expandRowCol}=useSelector((store)=>store.app);
// console.log("expandRowCol",expandRowCol);
const dispatch = useDispatch();
const [show,setShow]=useState(false)
  console.log(props)
  const expandRow = {
    // onlyOneExpanding: true,
    // expandByColumnOnly: true,
    renderer: row => {
      
      return (
        <>
        { location.pathname=='/PMS/TransactionInvestmentHistory' ?
      <div >
        {<InvestmentHistoryTop days={props.days}   portfolio_id={row} />} 
      </div> : 
      <div>
          {<PaymentHistoryTop   pay_id={row} />}  
      </div>
      
      }
      </>
      ) 
      
    },
    showExpandColumn: true,
    expanded: [0]
  }
   console.log(expandRow)
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
            // console.log(column.toggle)
            onColumnToggle(column.dataField)
          }
            }
        />
    )}
      </Dropdown.Menu>
    </Dropdown>
  );
  const Record= props.loading ? "" :  !(props.data.length>0) && 'no record found'
  const keyName= location.pathname=='/PMS/TransactionInvestmentHistory' ? "investment_name" : 'payment_id'
  const tableClass= location.pathname=='/PMS/TransactionInvestmentHistory' ? "table-responsive investment-border" : "table-responsive"
  
  return (
    <div className="tablet" style={{width:'100%'}} >
      {props.data && (
        <ToolkitProvider
          bootstrap4
          keyField={keyName}
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
                    wrapperClasses={tableClass}
                    noDataIndication={Record}
                    expandRow={expandRow}
                    expandColumnOptions={ { expandColumnVisible: true } }
                    

                  />
                </Col>
                <Col style={{ flexDirection: 'column', flex: 0, position:'fixed', width:'.5em',right:'16.5em',top:'5em',display:'flex',flexDirection:'row',zIndex:1 }}>
                  <CustomToggleList {...props.columnToggleProps} />
                  <MyExportCSV { ...props.csvProps } />
                </Col>
              </Row>
            )}
        </ToolkitProvider>
      )}
    </div>
  )
}

export default CommonTableInvTop
