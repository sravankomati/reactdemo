import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function TransectionList() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      var result = await axios.get("http://localhost:4000/paymentlist1");
      setdata(result.data.result);
    };
    getApi();
  }, []);

  return (
    <div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Transection id</th>
              <th>Username</th>
              <th>Payment method</th>
              <th>Currency</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.payment_id}</td>
                  <td>{item.username}</td>
                  <td>{item.paymentMethod}</td>
                  <td>{item.currency}</td>
                  <td>{item.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
