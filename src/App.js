import './App.css';
import React, { useEffect, useState } from 'react';
import {Card, Container, Col, Row} from 'react-bootstrap';

import Logs from './components/Logs';
import Portfolios from './components/Portfolios';
import FormInput from './components/FormInput';
import StatusNow from './components/StatusNow';

function App() {
  const [isRefresh, setIsRefresh] = useState(true);
  const blueBoxStyle = {
    borderColor: '#C7DDFF',
    backgroundColor: '#C7DDFF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
  }
  return (
    <>
      <Container className="mb-4">
        <Row>
          <Card style={blueBoxStyle}>
            <Card.Body>Navbar</Card.Body>
          </Card>
        </Row>
        <Row>
          <Col>
            <Container>
              <Row className="p-0">
                <StatusNow
                  style={blueBoxStyle}
                  isRefresh={isRefresh}
                  setIsRefresh={setIsRefresh}
                />
              </Row>
              <Row className="p-0">
                <FormInput 
                  style={blueBoxStyle}
                  isRefresh={isRefresh}
                  setIsRefresh={setIsRefresh}
                />
              </Row>
              <Row>
                <Col sm className="p-0">
                  <Logs 
                    style={blueBoxStyle}
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                  />
                </Col>
                <Col sm className="p-0">
                  <Portfolios 
                    style={blueBoxStyle}
                    isRefresh={isRefresh}
                    setIsRefresh={setIsRefresh}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
