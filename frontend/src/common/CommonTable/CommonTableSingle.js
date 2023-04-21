import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
const CommonTableSingle = (props) => {
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]

  return (
    <div className="tablet">
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
            <div>
              <div className="search-box-wrap">
                <select className="tabel-select">
                  <option value="">Sort By</option>
                  <option value="">A to Z</option>
                  <option value="">Z to A</option>
                </select>
              </div>
              <div>

                <BootstrapTable
                  {...props.baseProps}
                  wrapperClasses="table-responsive"
                />
              </div>
            </div>
          )}
        </ToolkitProvider>
      )}
    </div>
  )
}

export default CommonTableSingle
