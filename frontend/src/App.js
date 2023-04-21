
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routes/routes'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import Sidebar from './store/Dashboard/Sidebar'
import SidebarAdmin from './Admin/DashboardAdmin/SidebarAdmin'
import { Container, Row, Col, Form } from 'react-bootstrap'
import Header from './common/Header/Header'
const App = () => {
  return (
    <BrowserRouter>
    <div className="justify-content-end">
          <Header />
        </div> 
    <div style={{display:'flex'}}>
        
     <Col md={2} className="justify-content-center">
            <SidebarAdmin />
          </Col>  
         
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            exact
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
