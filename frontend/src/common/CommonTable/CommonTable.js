import {React,useState,useEffect} from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
import { useLocation } from 'react-router-dom'
import Spinner from '../spinner'

let status = localStorage.setItem('status',false)
const CommonTable = (props) => {
  const location=useLocation()
  const [loading,setLoading]=useState(false)
  const [showMsg, setShowMsg]=useState(false)
  console.log(props,status)
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]

const Record= props.loading ? "" :  !(props.data.length>0) && props.loading==false && 'no record found'
  return (
    <div className="tablet" >
      {props.data && (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={props.data }
          columns={props.columns}
          search
          exportCSV={true}
        >
          {(props) => (
            <div>
              <div className="search-box-wrap">
                <select className="tabel-select">
                  <option value="">Sort By</option>
                  <option value="">A to Z</option>
                  <option value="">Z to A</option>
                </select>
              </div>
              <div>
                {console.log(props)}
            
                <BootstrapTable
                  {...props.baseProps}
                  
                 rowEvents={ props.rowEvents } 
                  wrapperClasses="table-responsive"
                   noDataIndication={Record}
                /> 
              
                {/* {loading
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
              : null} */}
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </div>
  )

}

export default CommonTable
