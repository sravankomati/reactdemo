import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import Model from "./Model";

export default function Student() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getApi = async () => {
      var result = await axios.get(
        "http://localhost:4000/api/student/getalldata",
        {
          headers: {
            Authorization: localStorage.getItem("id"),
          },
        }
      );
      if(result.data.err){
        toast.error("Something went wrong please login");
        setTimeout(() => {
            window.location = "/login"
        }, 3000)
      }
      else{
        setdata(result.data.response);
      }
    };
    getApi();
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div style={{ padding: "15px" }}>
      <h1 style={{ textAlign: "center" }}>List of students</h1>
      <Button
        variant='success'
        style={{ float: "right", }}
        onClick={handleShow} className=" btn-rounded"
      >
        Marks  <i class="fa-sharp fa-solid fa-address-card"></i>
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>StudentName</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.StudentName}</td>
                <td>{item.Email}</td>
                <td>{item.Gender}</td>
                <td>{item.Class}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Model
        show={show}
        handleClose={handleClose}
        // show={handleClose}
      />
    </div>
  );
}
