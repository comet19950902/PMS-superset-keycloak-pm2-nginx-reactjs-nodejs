import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'

import './CommonTablePortfolio.css'
const CommonTablePortfolio = (props) => {
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]

  // const { SearchBar } = Search;
  let total = 0
  console.log({ props: props.data })
  for (let i = 0; i < props.data.length; i++) {
    total = total + props.data[i].ownership_percentage
  }
  console.log(total)

  return (
    <div>
      <div style={{
        maxHeight: '72vh',
        marginTop: '-3%',
        // overflowY:"scroll",
        borderRadius: '12px',
        border: '1px solid grey',
        width: '106%',
        marginBottom: '4%'
      }}>
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
                  {/* <SearchBar {...props.searchProps} /> */}
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
                  // cellEdit={cellEditFactory({
                  //   mode: "click",
                  //   blurToSave: true
                  // })}
                  // style={{height:'98vh'}}
                  />
                </div>

              </div>
            )}
          </ToolkitProvider>
        )}
      </div>
      <h3 style={{ marginTop: '5%', color: 'white', marginLeft: '5%', marginBottom: '3%', fontSize: '14px' }}>Total Ownership : {total}</h3>
    </div>
  )
}

export default CommonTablePortfolio
