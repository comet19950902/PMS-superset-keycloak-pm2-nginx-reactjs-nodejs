import React, { useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Form from 'react-bootstrap'
import SortIcon from '@mui/icons-material/Sort'
import Tooltip from '@mui/material/Tooltip'
import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit'
import './CommonTable.css'

const { ToggleList } = ColumnToggle
const CommonTableTransaction = (props) => {
  const [show, toggleShow] = React.useState(false)
  const [toggle, setToggle] = useState({})
  const [hideData, setHideData] = useState(false)
  const defaultSorted = [
    {
      dataField: 'id',
      order: 'asc'
    }
  ]
  const [showcolumn, setShowColumn] = useState(props.columns)
  const [state, setState] = useState(false)
  const handleclick = () => {
    console.log('show: ' + state)
    setState(current => !current)

    console.log('show2: ' + state)
  }
  const handleClose = () => {
    toggleShow(false)
  }
  // const { SearchBar } = Search;

  console.log({ props: props.data }, props, props.columns)

  const CustomToggleList = ({ columns, onColumnToggle, toggles }) => (

    <div
      style={{
        display: 'grid',
        visibility: 'visible',
        //  marginTop:'-1.7rem',
        // marginTop:'0.3rem',
        height: '1rem'

        //  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      }}
    >
      {showcolumn
        ?.map(column => ({
          ...column,
          toggle: toggles[column.dataField],
          hidden: !column.hidden
        }))
        .map((column, index) =>

          <Form.Check
            type="switch"
            key={column.dataField}
            inline
            label={column.text}
            id={column.dataField}
            checked={column.toggle}
            aria-checked={column.toggle ? 'true' : 'false'}
            onChange={() => {
              onColumnToggle(column.dataField)
              console.log(column)
            }
            }

          />

        )}

    </div>

  )

  return (
    <div className="tablet" >
      {props.data && (
        <ToolkitProvider
          bootstrap4
          keyField="id"
          data={props.data}
          columns={showcolumn}
          columnToggle
          draggable

          search
          exportCSV={true}
        // defaultSorted={defaultSorted}
        >
          {(props) => (
            <div style={{ backgroundColor: '#1F2125' }}>
              <span
                id="showHideCollums"
                // className="btn btn-primary"
                onClick={() => {
                  console.log(props)
                  toggleShow(!show)
                }
                }
                style={{
                  marginLeft: '96%',
                  color: 'rgb(255, 194, 7)',
                  //  borderColor:'rgb(255, 194, 7)',
                  // backgroundColor:'rgb(255, 194, 7)',
                  fontSize: '12px',
                  height: '32px',
                  width: '5rem',
                  borderColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <Tooltip title={'hide/sort'}>
                  <SortIcon />
                </Tooltip>

              </span>
              {/* <div onClick={handleClose} style={{  color:'rgb(255, 194, 7)'}}>  <SortIcon /></div> */}

              {/* </div>
            <div
            // style={{overflowY:"scroll"}}
            > */}
              <div className="search-box-wrap">
                {/* <SearchBar {...props.searchProps} /> */}
                <select className="tabel-select">
                  <option value="">Sort By</option>
                  <option value="">A to Z</option>
                  <option value="">Z to A</option>
                </select>
              </div>
              <div >
                {show === true &&
                  <div className="filter-wrapper">
                    <div
                      className="card card-body"
                      style={{
                        // padding: 5 + "px",
                        // display: state ? "contents" : "none"
                        display: 'contents'
                      }}
                    >
                      <CustomToggleList {...props.columnToggleProps} />
                    </div>
                  </div>
                }

                {/* <hr/> */}
                <BootstrapTable style={{ width: '70rem' }}
                  filter={filterFactory()}
                  // className="table-fixed table table-responsive"
                  {...props.baseProps}
                  // pagination={paginationFactory({ sizePerPage: 5 })}
                  wrapperClasses="table-responsive"

                  noDataIndication="no data found"
                />

              </div>

            </div>
          )}
        </ToolkitProvider>
      )}

    </div>
  )
}

export default CommonTableTransaction
