import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Login() {
  const [data, setdata] = useState({
    Email: "",
    Password: "",
  });
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    var response = await axios.post(
      "http://localhost:4000/api/student/login",
      data
    );
    // console.log(response);
    if (response.data.message) {
      localStorage.setItem("id", response.data.token);
      toast.success("you are logined");
      setTimeout(() => {
        window.location = "/list";
      }, 3000);
    } else {
      toast.error(response.data.err);
    }
  };
  return (
    <div className='container'>
      <h1>Student Register from</h1>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='Email'
            value={data.Email}
            onChange={(e) => onchange(e)}
            placeholder='Enter email'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='Password'
            value={data.Password}
            onChange={(e) => onchange(e)}
            placeholder='Password'
          />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={(e) => onSubmit(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
