import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Button, Card, Container, Col, Row, Form} from 'react-bootstrap';

function Portfolio(props){
    const lightBlueBoxStyle = {
      borderColor: '#F2F7FF',
      backgroundColor: '#F2F7FF',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
    }

    const [isEditMode, setIsEditMode] = useState(false);
    const [valueCurrentPrice, setValueCurrentPrice] = useState(props.data.currentPrice);

    let gl = valueCurrentPrice*props.data.amount - (props.data.initialPrice * props.data.amount);
    let glPercent = (gl/(props.data.initialPrice * props.data.amount)*100).toFixed(2);

    function handleSubmitCurrentPrice(event){
      event.preventDefault();
      setIsEditMode(false);
      // berisi edit current price yg di database
      axios.post("http://127.0.0.1:8000/api/currentPrice", {id: props.data.id, currentPrice: valueCurrentPrice});
      props.setIsRefresh(!props.isRefresh);
    }

    return (
      <>
        <Row style={{
          marginBottom: '10px',
          ...lightBlueBoxStyle
        }}>
          <Container style={{paddingTop: '12px'}}>
            <Row>
              <Col>
                <Card.Subtitle>Nama</Card.Subtitle>
                <p>{props.data.name}</p>
              </Col>
              <Col></Col>
              <Col style={{textAlign: 'right'}}>
                <Card.Subtitle>Current Price</Card.Subtitle>
                {
                  !isEditMode ? 
                  <p>{valueCurrentPrice}WLs <Button onClick={(e) => setIsEditMode(true)}>Edit</Button></p>
                  :
                  <>
                    <Row>
                      <Col className="px-0 text-center col-auto">
                        <Button onClick={(e) => setIsEditMode(false)} className="border-0 bg-transparent text-dark">X</Button>
                      </Col>
                        <Col className="text-center">
                          <Form onSubmit={handleSubmitCurrentPrice}>
                            <Row>
                              <Col>
                                <p>
                                  <input
                                    name="currentPrice"
                                    className="form-control"
                                    type="number"
                                    value={valueCurrentPrice}
                                    onChange={(event) => setValueCurrentPrice(event.target.value)}
                                  />
                                </p>
                              </Col>
                            </Row>
                          </Form>
                        </Col>
                    </Row>
                  </>
                }
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Subtitle>Amount</Card.Subtitle>
                <p>{props.data.amount}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Subtitle>Price</Card.Subtitle>
                <p>{Number(props.data.initialPrice).toFixed(2)}WLs</p>
              </Col>
              <Col>
                <Card.Subtitle>Total Invested</Card.Subtitle>
                <p>{Number(props.data.initialPrice*props.data.amount).toFixed(2)}WLs</p>
              </Col>
              <Col>
                <Card.Subtitle>Gain/Loss</Card.Subtitle>
                <p style={gl > 0 ? {color: 'green'} : {color: 'red'}}>{Number(gl).toFixed(2)}WLs ({Number(glPercent).toFixed(2)}%)</p>
              </Col>
              <Col style={{textAlign: 'right'}}>
                <Card.Subtitle>Total Now</Card.Subtitle>
                <p>{Number(props.data.amount * valueCurrentPrice).toFixed(2)}WLs</p>
              </Col>
            </Row>
          </Container>
        </Row>
      </>
    )
}
function Portfolios(props){
  const [portfoliosData, setPortfoliosData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/portfolios")
    .then(response => setPortfoliosData(response.data));
  }, [props.isRefresh]);

  const styles = {
    paddingBottom: '10px',
    marginTop: '10px',
    ...props.style
  };
    
    return (
      <Card style={styles}>
        <Card.Body> 
          <p>Portfolios</p>
        </Card.Body>
        <Container style={{
          overflow: 'auto',
          height: '300px'
        }}>
          {
            portfoliosData.map((data) => {
              return <Portfolio 
              data={data} 
              key={data.id}
              isRefresh = {props.isRefresh}
              setIsRefresh = {props.setIsRefresh}
            />
            })
          }
  
        </Container>
      </Card>
    )
}

export default Portfolios;