import {Card, Container, Col, Row} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const lightBlueBoxStyle = {
    borderColor: '#F2F7FF',
    backgroundColor: '#F2F7FF',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)'
}

function LogBuy(props){
    const created_at = new Date(props.data.created_at);
    const created_atToString = created_at.getDate() + "/" + (created_at.getMonth() + 1) + "/" + created_at.getFullYear() 
    const total = props.data.amount * props.data.price;
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
                <Col>
                <Card.Subtitle>Date</Card.Subtitle>
                <p>{created_atToString}</p>
                </Col>
                <Col style={{textAlign: 'right'}}>
                <Card.Subtitle style={{color: 'blue'}}>Buy</Card.Subtitle>
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
                <p>{Number(props.data.price).toFixed(2)}WLs</p>
                </Col>
                <Col>
                </Col>
                <Col style={{textAlign: 'right'}}>
                <Card.Subtitle>Total</Card.Subtitle>
                <p>{Number(total).toFixed(2)}WLs</p>
                </Col>
            </Row>
            </Container>
        </Row>
        </>
    )
}

function LogSell(props){
    const created_at = new Date(props.data.created_at);
    const created_atToString = created_at.getDate() + "/" + (created_at.getMonth() + 1) + "/" + created_at.getFullYear() 
    const total = props.data.amount * props.data.price;

    let gl = total - (props.data.initialPrice * props.data.amount);
    let glPercent = (gl/(props.data.initialPrice * props.data.amount)*100).toFixed(2);
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
                <Col>
                  <Card.Subtitle>Date</Card.Subtitle>
                    <p>{created_atToString}</p>
                </Col>
                <Col style={{textAlign: 'right'}}>
                   <Card.Subtitle style={{color: 'red'}}>Sell</Card.Subtitle>
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
                    <p>{Number(props.data.price).toFixed(2)}WLs</p>
                </Col>
                <Col>
                    <Card.Subtitle>Gain/Loss</Card.Subtitle>
                    <p style={gl > 0 ? {color: 'green'} : {color: 'red'}}>{Number(gl).toFixed(2)}WLs ({Number(glPercent).toFixed(2) > 0 ? '+' : '-'}{Number(glPercent).toFixed(2)}%)</p>
                </Col>
                <Col style={{textAlign: 'right'}}>
                    <Card.Subtitle>Total</Card.Subtitle>
                    <p>{Number(total).toFixed(2)}WLs</p>
                </Col>
            </Row>
            </Container>
        </Row>
        </>
    )
}
function Logs(props){
    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/logs")
        .then(response => setLogsData(response.data));
    }, [props.isRefresh]);

    const styles = {
        marginTop: '10px',
        paddingBottom: '10px',
        ...props.style
    };

    return (
        <Card style={styles}>
        <Card.Body>
            <p>Logs</p>
        </Card.Body>
        <Container style={{
            overflow: 'auto',
            height: '300px'
        }}>
            {
                logsData.map((data) => {
                    return data.type == 'buy' ? <LogBuy data={data} key={data.id}/> : <LogSell data={data} key={data.id} />
                })
            }
        </Container>
        </Card>
    )
}

export default Logs;