import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Paypal() {
  const [data, setdata] = useState({
    username: "",
    amount: "",
    tab: "",
  });
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(data);
  //   window.location=""
  //   // var response = await axios.post(
  //   //   "http://localhost:4000/api/student/login",
  //   //   data
  //   // );
  // };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Paypal Form</h1>
      <Container>
        <Form  action="http://localhost:4000/pay1" method="post">
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              value={data.username}
              onChange={(e) => onchange(e)}
              placeholder='Username'
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type='number'
              name='amount'
              value={data.amount}
              onChange={(e) => onchange(e)}
              placeholder='Amount'
            />
            <Form.Control type="text" name="tab" value="paypal" hidden />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
