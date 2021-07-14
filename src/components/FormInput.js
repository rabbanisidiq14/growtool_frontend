import FloatingLabel from "react-bootstrap-floating-label";
import { Card, Button, Container, Col, Row, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

const lightBlueBoxStyle = {
  borderColor: "#F2F7FF",
  backgroundColor: "#F2F7FF",
  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
};

function FormInputSell(props) {
  const [data, setData] = useState([]);

  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/portfolios")
    .then(response => {setData(response.data); setItemName(response.data[0].name)})
    .catch(error => console.log(error));
  }, [props.isRefresh]);

  function handleSubmit(event){
    event.preventDefault();
    axios.post("http://127.0.0.1:8000/api/sell", {name: itemName, amount: itemAmount, price: itemPrice});
    props.setIsRefresh(!props.isRefresh);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col sm>
            <select
              style={{
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                height: "46px",
              }}
              label="Item's Name"
              className="form-control mb-3"
              name="name"
              onChange={(e) => setItemName(e.target.value)}
            >
              {
                data ? 
                  data.map((data) => { return <option key={data.id} value={data.name}>{data.name}</option> })
                : null
              }
            </select>
          </Col>
          <Col sm>
            <FloatingLabel
              style={lightBlueBoxStyle}
              label="Item's Amount"
              className="mb-3"
              type="number"
              value={itemAmount}
              onChange={(e) => setItemAmount(e.target.value)}
            />
          </Col>
          <Col sm>
            <FloatingLabel
              style={lightBlueBoxStyle}
              label="Item's Price"
              className="mb-3"
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </Col>
          <Col>
            <Button
              type="submit"
              variant="primary"
              style={{
                color: "black",
                width: "120px",
                ...lightBlueBoxStyle,
              }}
            >
              Done
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
function FormInputBuy(props) {
  const [itemName, setItemName] = useState("");
  const [itemAmount, setItemAmount] = useState(0);
  const [itemPrice, setItemPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/buy", {name: itemName, amount: itemAmount, price: itemPrice});
    props.setIsRefresh(!props.isRefresh);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col sm>
              <FloatingLabel
                style={lightBlueBoxStyle}
                label="Item's Name"
                className="mb-3"
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </Col>
            <Col sm>
              <FloatingLabel
                style={lightBlueBoxStyle}
                label="Item's Amount"
                className="mb-3"
                type="number"
                value={itemAmount}
                onChange={(e) => setItemAmount(e.target.value)}
              />
            </Col>
            <Col sm>
              <FloatingLabel
                style={lightBlueBoxStyle}
                label="Item's Price"
                className="mb-3"
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
            </Col>
            <Col>
              <Button
                type="submit"
                variant="primary"
                style={{
                  color: "black",
                  width: "120px",
                  ...lightBlueBoxStyle,
                }}
              >
                Done
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
}
function FormInput(props) {
  const styles = {
    marginTop: "10px",
    ...props.style,
  };

  const [isBuy, setIsBuy] = useState(true);

  return (
    <Card style={styles}>
      <Card.Body>
        <select
          className="form-control"
          style={{ width: "120px", ...lightBlueBoxStyle }}
          onChange={(e) => setIsBuy(e.target.value === "buy" ? true : false)}
        >
          <option value="buy">Buy Item</option>
          <option value="sell">Sell Item</option>
        </select>
      </Card.Body>
      <Card.Body>
        {isBuy ? (
          <FormInputBuy 
            isRefresh={props.isRefresh}
            setIsRefresh={props.setIsRefresh}
          />
        ) : (
          <FormInputSell 
            isRefresh={props.isRefresh}
            setIsRefresh={props.setIsRefresh}
          />
        )}
      </Card.Body>
    </Card>
  );
}
export default FormInput;
