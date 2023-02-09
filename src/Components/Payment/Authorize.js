import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function Authorize() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Authorize.net Form</h1>
      <Container>
        <Form action='http://localhost:4000/pay1' method='post'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text' name='username' placeholder='Username' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Amount</Form.Label>
            <Form.Control type='number' name='amount' placeholder='Amount' />
            <Form.Control type='text' name='tab' value='.net' hidden />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Credit Card no.</Form.Label>
            <Form.Control type='text' name='cc' placeholder='Credit Card no.' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>CVV no.</Form.Label>
            <Form.Control type='text' name='cvv' placeholder='CVV' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Expiration date</Form.Label>
            <Form.Control
              type='text'
              name='expire'
              placeholder='Expiration date (mmyy)'
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
