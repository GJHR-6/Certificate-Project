import { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from "react";
import Image from 'react-bootstrap/Image'
import logo_blue from './img/logo_blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Axios from 'axios';
import swal from 'sweetalert';
import { updateContext } from '../Helper/Context';

const BusinessForm = () => {
    const https = require('https')
  const [show, setShow] = useState(false);
  const { update, setUpdate } = useContext(updateContext);
  const handleClose = () => {
    setShow(false);
  } //close modal function
  const handleShow = () => setShow(true); //show modal function

  const [name, setName]= useState("")
  
  function submit(e) {
    e.preventDefault();
    console.log(name)
    try {
      Axios.post("http://localhost:3001/create_business", { name }
      ).then(() => {
        swal({
          text: "New Bussines Area Created",
          icon: "success"
        });
        setUpdate(!update);
      });

      handleClose();

      
    } catch (error) {
      swal({
        text: error,
        icon: "error"
      });
    }
  };
  
  function handle(e){
    setName(e.target.value);
  }

  return (
<>
      <Button size='sm' variant="outline-danger" onClick={handleShow}>
        Add Business Area
      </Button>

      <Modal show={show} 
      onHide={handleClose}
      backdrop="static" keyboard={false}
      dialogClassName="modal-90w"
      >
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
                  <h5>Add Business Area</h5>
                  {/*Name input*/}
                              

                <div class="mb-3">
                  <label class="form-label">
                    Business area:
                  </label>
                  <input type="text" class="form-control" id="account" name="Account" required="required" placeholder="Enter an account..." onChange={(e)=>handle(e)} />
   
                </div>
              </div>
              
              </div>
            </Stack>
              <Button type="submit" variant="primary"/*onClick={(e)=>submit(e)}*/>
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

export default BusinessForm

