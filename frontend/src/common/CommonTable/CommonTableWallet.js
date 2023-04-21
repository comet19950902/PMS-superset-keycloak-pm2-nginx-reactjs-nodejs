import {React,useState,useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
import { useLocation } from 'react-router-dom'
import Spinner from '../../common/spinner'
const CommonTableWallet = (props) => {
  console.log(props)
  const location=useLocation()
  const [loading,setLoading]=useState(false)
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]
  const Record= props.loading ? "" :  !(props.data.length>0) && 'no record found'
  return (
    <div className="tablet" style={{width:'100%'}}>
      {props.data && (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={props.data}
          columns={props.columns}
          search
          exportCSV={true}
          defaultSorted={defaultSorted}
        >
          {(props) => (
            <div >
              <div className="search-box-wrap">
                <select className="tabel-select">
                  <option value="">Sort By</option>
                  <option value="">A to Z</option>
                  <option value="">Z to A</option>
                </select>
              </div>
              <Row>
                <Col style={{ flexDirection: 'column', width: '100%', flex: 1 }}>
                  <BootstrapTable
                    {...props.baseProps}
                    wrapperClasses="table-responsive"
                    style={{ overflowX: 'hidden', height: '100vh', overflowY: 'auto' }}
                    noDataIndication={Record}
                  /> 
                 
                </Col>
              </Row>
            </div>
          )}
        </ToolkitProvider>
      )}
    </div>
  )
}

export default CommonTableWallet
