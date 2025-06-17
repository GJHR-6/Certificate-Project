import { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from "react";
//import MOCK_DATA from './MOCK_DATA.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image'
import logo_blue from './img/logo_blue.png';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid'
import swal from 'sweetalert';

import { updateContext } from '../Helper/Context';


const AddNewEmployee = () => {
    

  const [show, setShow] = useState(false);
  const { update, setUpdate } = useContext(updateContext);

  const handleClose = () => {
    setShow(false);
  } //close modal function
  const handleShow = () => setShow(true); //show modal function

  const [data, setAddFormData] = useState({
    id: uuidv4(),
    name: '',
    email: '',
    department: '',
    position: '',
    account: '',
    start_date: '',
    status: '',
  });
  function submit(e){ //function for submiting form
    e.preventDefault();
    try {
      Axios.post("http://localhost:3001/create_employee",
        {employee_id: data.id ,
        full_name: data.name,
        email: data.email,
        status_employee: data.status,
        department: data.department,
        business_ID: data.account,
        pos: data.position,
        start_date:data.start_date
      }).then(() => {
        console.log("success");
        swal({
          text: "New employee created",
          icon: "success"
        });
        setUpdate(!update);

        handleClose();
      })
      
    } catch (error) {
      swal({
        text: error,
        icon:"error"
      });
      
    }
    
     
    }

  //---------------------GET BUSINESS AREA --------------------------------------
  const [business, setBusiness] = useState([])
  
  const getBusiness = () => {
       
        Axios.get("http://localhost:3001/business_area").then((response) => {
            console.log(response);
            setBusiness(response.data);
        })
          
    }

    useEffect(() => {
        getBusiness();
    }, [])

  //---------------------------------------------------------------------------------------
 function handle(e){
    
    const newData={...data}
    newData[e.target.id]=e.target.value
    setAddFormData(newData)
    console.log(newData)
    
  }

  return (
<>
<Button size='sm' variant="outline-success" onClick={handleShow}>
                Add Employee
            </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <Image src={logo_blue} width="300" fluid />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={(e)=>submit(e)}>
            
            <Stack direction="vertical" gap={2}>
              <div className="bg-light border" class="container">
                <div class="mb-3">
                  <h5>Employee Data</h5>
                  <label class="form-label">
                    Name:
                  </label>
                  <input type="text" class="form-control" name="Name" id="name" required="required" onChange={(e) => handle(e)} />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Email:
                  </label>
                  <input type="email" class="form-control" name="Email" id="email" required="required" onChange={(e) => handle(e)}   />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Department:
                  </label>
                  <select class="form-select" name="Department" id="department" required="required" onChange={(e) => handle(e)}  >
                    <option value="" disabled selected hidden>Choose a department</option>
                    <option value="hr">Human Resources</option>
                    <option value="marketing">Marketing</option>
                    <option value="it">IT</option>
                  </select>
                  
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Position:
                  </label>
                  <input type="text" class="form-control" name="Position" id="position" required="required" onChange={(e) => handle(e)}   />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Business area:
                  </label>
                  <select class="form-select" name="Account" id="account" required="required" onChange={(e) => handle(e)}  >
                    <option value="" disabled selected hidden>Choose a Business Area</option>
                    {business.map((item) => (
                      <option value={item.business_ID}>{item.business_name}</option>
                    ))}
                  </select>
                  
                </div>
                <div class="mb-3">
                  <label class="form-label">
                    Start date:
                  </label>
                  <input type="date" class="form-control" name="Start Date" id="start_date" required="required" onChange={(e) => handle(e)}  />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Employee Status:
                  </label>
                  <select class="form-select" name="Status" id="status" required="required" onChange={(e) => handle(e)} >
                    <option value="" disabled selected hidden>Choose a status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                </div>
            </Stack>
              <br />
              <div class="container">
              </div>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  )
}

export default AddNewEmployee

