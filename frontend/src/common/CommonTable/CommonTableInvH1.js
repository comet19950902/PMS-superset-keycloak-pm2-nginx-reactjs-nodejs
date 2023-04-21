import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { Row, Col, Form } from 'react-bootstrap'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'

const CommonTableInvH1 = (props) => {
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]

  console.log({ props: props.data })

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
                         <Row>
              
                         <Col style={{ position:'unset',flexDirection: 'column', maxWidth:'100%', flex: 1 }}>

                <BootstrapTable
                  {...props.baseProps}
                  // pagination={paginationFactory({ sizePerPage: 5 })}
                   wrapperClasses=" investment-header"
                  // noDataIndication="no data found"
                // cellEdit={cellEditFactory({
                //   mode: "click",
                //   blurToSave: true
                // })}
                />
             </Col>
              </Row>
          )}
        </ToolkitProvider>
      )}
    </div>
  )
}

export default CommonTableInvH1
