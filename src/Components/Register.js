import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Register() {
  const [data, setdata] = useState({
    StudentName: "",
    Email: "",
    Password: "",
  });
  const onchange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    var response = await axios.post(
      "http://localhost:4000/api/student/add",
      data
    );
    // console.log(response);
    if (response.data.message) {
      toast.success("you have register now login");
      setTimeout(() => {
        window.location = "/login";
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
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='StudentName'
            value={data.StudentName}
            onChange={(e) => onchange(e)}
            placeholder='Enter username'
          />
        </Form.Group>
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
