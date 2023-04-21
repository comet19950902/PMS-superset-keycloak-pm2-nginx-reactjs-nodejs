import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'
import AuditHistorySingleInvestment from '../../Admin/DashboardAdmin/AuditHistorySingleInvestment'

const CommonTablePortfolio1 = (props) => {
  const expandRow = {
    renderer: row => (
      <div style={{ marginRight: '8%', marginLeft: '-7%' }}>
        {console.log(row)}
        <AuditHistorySingleInvestment investment_id={row.investment_id} />

      </div>
    ),
    showExpandColumn: true
  }
  console.log(expandRow)
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
    total = total + props.data[i]?.ownership_percentage
  }
  console.log(total)

  return (
    <div className="tablet">
      {props.data && (
        <ToolkitProvider
          bootstrap4
          keyField="investment_name"
          data={props.data}
          columns={props.columns}
          search
          exportCSV={true}
          defaultSorted={defaultSorted}
        >
          {(props) => (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ overflowY: 'auto' }} className="search-box-wrap">
                {/* <SearchBar {...props.searchProps} /> */}
                <select className="tabel-select">
                  <option value="">Sort By</option>
                  <option value="">A to Z</option>
                  <option value="">Z to A</option>
                </select>
              </div>
              <div style={{ height: '72vh', overflowY: 'auto' }}>
                <BootstrapTable
                  {...props.baseProps}
                  wrapperClasses="table-responsive"
                  expandRow={expandRow}
                // cellEdit={cellEditFactory({
                //   mode: "click",
                //   blurToSave: true
                // })}
                />
              </div>

            </div>
          )}
        </ToolkitProvider>
      )}

    </div>

  )
}

export default CommonTablePortfolio1
