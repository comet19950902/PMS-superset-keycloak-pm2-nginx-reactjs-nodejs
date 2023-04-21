import React, { useState } from 'react'
import './FinalDashboard.css'
import { SUPERSET_URL } from '../../config/env'
import { Container, Col, Row, Modal } from 'react-bootstrap'
import '../../common/Modal.css'
import Header from '../../common/Header/Header'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import FitScreenSharpIcon from '@mui/icons-material/FitScreenSharp'
import SidebarAdmin from '../../Admin/DashboardAdmin/SidebarAdmin'

const FinalDashboard = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)

  const handleShow = () => {
    console.log('clicked')
    setShow(true)
  }

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-end">
          <Header />
        </Row>
        <Row>
          <Col lg={2} className="justify-content-md-center">
            <SidebarAdmin />
          </Col>
          <Col lg={10}>
            <div
              className="maindashinfo"
              id="response" >
              <div
                className="maindashtable" >
                <div className="dashheading" style={{ paddingTop: '2%', paddingLeft: '5%', paddingRight: '5%' }}>
                  <FitScreenSharpIcon style={{ color: 'white', fontSize: '45px', cursor: 'pointer' }} onClick={handleShow} />
                </div>
                <iframe
                  width="100%"
                  height="100%"
                  seamless
                  frameBorder="0"
                  id="geeks"
                  style={{ height: '650px', width: '94%', marginLeft: '3%', padding: '2.5%', borderRadius: '44px' }}
                  src={`${SUPERSET_URL}`}
                >
                </iframe>
              </div>
              <Modal fullscreen show={show} onHide={handleClose} style={{ paddingTop: '4%', marginTop: '-5%' }} >
                <Modal.Body style={{}}>
                  <IconButton
                    style={{ position: 'absolute', top: '0', right: '0' }}
                    onClick={() => setShow(false)} >
                    <CloseIcon />
                  </IconButton>
                  <iframe
                    width="1200"
                    height="750"
                    seamless
                    frameBorder="0"
                    id="geeks"
                    style={{ overflowX: 'scroll', backgroundColor: 'transparent', marginRight: '320px' }}
                    src={`${SUPERSET_URL}`}
                  >
                  </iframe>
                </Modal.Body>
              </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}
export default FinalDashboard
