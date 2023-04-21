import React, { useState, useEffect } from 'react'
import CommonTable from '../../common/CommonTable/CommonTable'
import axios from 'axios'
import Header from '../../common/Header/Header'
import SidebarAdmin from '../DashboardAdmin/SidebarAdmin'
import { Container, Row, Col } from 'react-bootstrap'
import 'react-phone-number-input/style.css'
import SearchBox from '../../common/SearchBox/SearchBox'
import Spinner from '../../common/spinner'
function Accountant () {
  const getId = localStorage.getItem('sub_Id')
  const [result4, setResult4] = useState([])
  const [sea, setSea] = useState('')
  const [loading,setLoading]=useState(false)
  const [search, setSearch] = useState([])
  const [resultUser, setResultUser] = useState([])
  const [accountList, setAccountList] = useState([])
  const allportfolioUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/all_portfolios_details`, {
        params: {
          user_id: getId
        }
      }).then((response) => {
        const rs = response.data
        if (response.data != 'Error // Cannot find portfolio list') {
          setResultUser(rs)
        } else {
          setResultUser([])
        }
      })
  }
  const accountant = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/accontant_list`, {
        params: { user_role: 'admin' }
      })
      .then(function (response) {
        console.log(response.data)
        const p_data = response.data
        setAccountList(p_data)
        setLoading(false)
        // for (const a of p_data) {
        //   a.portfolio = []
        //   axios
        //     .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
        //     .then(function (response1) {
        //       console.log(response1.data)
        //       const m = response1.data?.filter(i => i.accountant_id == a.user_id)
        //       a.portfolio?.push(m)
        //     })
        //      setResult4(p_data)
        // }
       
      })
  }
  const allAccountant=async()=>{
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/all_accountant_and_portfolio`)
    .then(function (response1) {
      console.log(response1.data)
      setResult4(response1.data)
    })
  }
  useEffect(async () => {
    await accountant()
    await allAccountant()
    await allportfolioUser()
  }, [])
  for(let a of accountList){
    a.portfolio=[]
    const m = result4?.filter(i => i.accountant_id == a.user_id && i.portfolio_name!=null)
  a.portfolio?.push(m)
  }
console.log(accountList)
  const columns4 = [
    {
      dataField: 'username',
      text: 'Name',
      sort: true
    },
    {
      dataField: 'email',
      text: 'Email',
      sort: true
    },
    {
      dataField: 'portfolio',
      text: 'Portfolios',
      sort: true,
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log(row)
        return (
          <ul style={{marginLeft:'-3em'}}>
            {row.portfolio?.[0]?.map(i =>
              <li style={{color:'#FFC107'}}>
                <p style={{color:'white'}}>{i.portfolio_name!=null ? i.portfolio_name : "N/A" }</p>
                </li>
            )}
          </ul>
        )
      }
    }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Row className="d-flex justify-content-center" >
              <span className="p-2 pageheader">
                <h3 className="pagetitle">Accountants</h3>
              </span>
              <SearchBox
                className="auto-ml p-2 pageheader"
                onChange={(event) => {
                  setSea(event.target.value)
                  const x = accountList?.filter((i) =>
                     i.username.toLowerCase().includes(event.target.value.toLowerCase())
                     || i.email==event.target.value
                  || i.portfolio?.[0]?.[0]?.portfolio_name==event.target.value
                  || i.portfolio?.[0]?.[1]?.portfolio_name==event.target.value
                  )
                  //  console.log(x)
                   if(x.length>0){
                  setSearch(x)
                   }else{
                    setSearch([])
                   }
                }}
              />
            </Row>
            {loading
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
              : null}
            {sea
              ? (
                <CommonTable
                  data={search}
                  columns={columns4}
                />
                )
              : (
                <CommonTable
                loading={loading}
                  data={accountList}
                  columns={columns4}
                />
                )}
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  )
}
export default Accountant
