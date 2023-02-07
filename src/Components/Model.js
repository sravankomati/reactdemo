import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const Model = ({ show, handleClose }) => {
  const [formFields, setFormFields] = useState([{ name: "", marks: "" }]);
  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    var store = [];
    formFields.map((i) => {
      if (i.name && i.marks) {
        store.push({ name: i.name, marks: Number(i.marks) });
      }
    });
    if (store.length > 0) {
      var response = await axios.post(
        "http://localhost:4000/api/marks/add",
        { Subjects: store },
        {
          headers: {
            Authorization: localStorage.getItem("id"),
          },
        }
      );
      if (response.data.messsage) {
        toast.success("your marks is added");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        toast.error(response.data.err);
      }
    } else {
      toast.error("Please enter data ");
    }
  };

  const addFields = () => {
    let object = {
      name: "",
      marks: "",
    };
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adding subject with marks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {formFields.map((form, index) => {
            return (
              <div key={index} style={{ marginBottom: "20px" }}>
                <input
                  name='name'
                  placeholder='Name'
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.name}
                />
                <input
                  name='marks'
                  placeholder='marks'
                  type={"number"}
                  onChange={(event) => handleFormChange(event, index)}
                  value={form.marks}
                />
                {index == 0 ? (
                  <button onClick={addFields}>Add</button>
                ) : (
                  <button onClick={() => removeFields(index)}>Remove</button>
                )}
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          style={{ width: "100%", borderRadius: "20px" }}
          onClick={submit}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Model;
