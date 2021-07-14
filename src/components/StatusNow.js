import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';

function StatusNow(props){
  const [data, setData] = useState({});
  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/status")
    .then(response => setData(response.data))
    .catch(error => console.log(error));
    props.setIsRefresh(false);
  }, [props.isRefresh]);

  const styles = {
    marginTop: '20px',
    ...props.style
  };
  return(
    <Card style={styles}>
      <Card.Body>
        <p>Invested : {Number(data.invested).toFixed(2)}WLs</p>
        <p>Gain/Loss : <span style={data.gainLoss > 0 ? {color: 'green'} : {color: 'red'}}>{Number(data.gainLoss).toFixed(2)}WLs ({Number(data.gainLossPercent).toFixed(2)}%)</span> 
        </p>
        <p>Total Now : {Number(data.totalNow).toFixed(2)}WLs</p>
      </Card.Body>
    </Card>
  )
}

export default StatusNow;