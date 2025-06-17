import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from "react";
import Image from 'react-bootstrap/Image'
import logo_blue from './img/logo_blue.png';
//import MOCK_DATA from './MOCK_DATA.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack'
import { BsPencilFill } from "react-icons/bs";
import swal from 'sweetalert';

function Update(props) {
  const https = require('https')
  const [show, setShow] = useState(false);
  const [personal, setPersonal] = useState(false); //enables personal editing
  const [course, setCourse] = useState(false); //enables course editing
  const handleClose = () => {
    setPersonal(false);
    setCourse(false);
    setShow(false)
  };

  const handleShow = () => {
    
    swal("What information do you like to update?", {
      buttons: {
        personal: {
          text: "Personal Info",
          value: "personal",
        },
        course: {
          text: "Training Info",
          value: "course"
        },
        cancel: "Cancel"

      }
     
})
.then((value) => {
  switch (value) {
 
    case "personal":
      setPersonal(true);
      setShow(true);
      break;
 
    case "course":
      setCourse(true);
      setShow(true);
      break;
 
    default:
      break;
  }
});
    
 

  };

  
  //const [contacts, setContacts] = useState(MOCK_DATA);
  const [data, setAddFormData] = useState({
    id: props.id,
    employee_id: props.employee_id,
    name: props.name,
    email: props.mail,
    department: props.department,
    position: props.position,
    account: props.account,
    start_date: props.start_date,
    status: props.status,
    course_name: props.course_name,
    training_category: props.training_category,
    training_date:props.training_date ,
    end_date: props.end_date,
    training_delivery: props.training_delivery,
    provider: props.provider,
    instructor_name: props.instructor_name,
    training_status: props.training_status,
    answer: props.answer,
    comments: props.comments
  });


  function handle(e){
    
    const newData={...data}
    newData[e.target.id]=e.target.value
    setAddFormData(newData)
    console.log(newData)
    
  }

 
  //Send data to Kaleido
  function submit(e){ //funtion for submiting form
    e.preventDefault();
  
    const options ={ //api call header
      hostname:'u0czezo9fq-u0i7ecpugr-firefly-os.us0-aws-ws.kaleido.io',
      path:'/api/v1/namespaces/string/broadcast/message',
      method:'POST',
      headers: {
          'Authorization': 'Basic dTBwMmg5MzBtMDpqTDlIMjh4bjBnSVJVUmFEZ1dBVVdCU3hSb2NjRjdsU3hFcVNFOTVTT3d3',
          'Content-Type': 'application/json',
          'Origin': 'http://localhost:3000/' }
     
    }

    const message=JSON.stringify({
      header:{
        tag:"test",
        topics:["test"]
      },
      data: [
        {
          value:{
            id: data.id,
            name: data.name,
            email: data.email,
            department: data.department,
            position:data.position,
            account: data.account,
            start_date:data.start_date,
            status: data.status,
            training_category: data.training_category,
            training_date: data.training_date,
            course_name: data.course_name,
            training_delivery:data.training_delivery,
            provider: data.provider,
            instructor_name: data.instructor_name,
            training_status: data.training_status,
            answer: data.answer,
            comments: data.comments
          
          }
        
        }
      ] 
})
  const req = https.request(options,(res) => {
      let data='';
     
      console.log("Status Code:", res.statusCode)
      res.on('data', (chunk)=>{
          data += chunk;
    
      })
      if (res.statusCode = 202)
      {
          alert(`You've asigned a new course` )
      }


      
     res.on('end',()=>{
         console.log("Body:",JSON.parse(message));
      })
      
    })

  req.write(message)
  req.end();
  console.log(data);
  setShow(false);
  e.target.reset();
  
    
  }

  return (
    <div className='App-form'>
      <>
        <button className="btn btn-primary btn-sm" onClick={handleShow}>
            <BsPencilFill />
        </button>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              <Image src={logo_blue} width="300" fluid />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={(e) => submit(e)}>
              {personal == true && (
              <div className="bg-light border" class="container">
                  
                <div class="mb-3">
                  <h5>Employee Data</h5>
                  <label class="form-label">
                    Name:
                  </label>
                  <input type="text" class="form-control" name="Name" id="name" required="required" defaultValue={props.name} onChange={(e)=>handle(e)}/>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Email:
                  </label>
                  <input type="email" class="form-control" name="Email" id="email" required="required" defaultValue={props.mail} onChange={(e)=>handle(e)}  />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Department:
                  </label>
                  <select class="form-control" name="Department" id="department" required="required" defaultValue={props.department} onChange={(e)=>handle(e)} >
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
                  <input type="text" class="form-control" name="Position" id="position" required="required" defaultValue={props.position} onChange={(e)=>handle(e)}  />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Business area:
                  </label>
                  <select class="form-control" name="Account" id="account" required="required" defaultValue={props.account} onChange={(e)=>handle(e)} >
                    <option value="" disabled selected hidden>Choose a business area</option>
                    <option value="cc">Closing Corp</option>
                    <option value="covercube">Covercube</option>
                    <option value="foothill">Foothill</option>
                    <option value="mitchell">Mitchell</option>
                    <option value="zventus">Zventus</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Start date:
                  </label>
                  <input type="date" class="form-control" name="Start Date" id="start_date" required="required" defaultValue={props.start_date} onChange={(e)=>handle(e)}  />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Employee Status:
                  </label>
                  <select class="form-control" name="Status" id="status" required="required" defaultValue={props.status} onChange={(e)=>handle(e)} >
                    <option value="" disabled selected hidden>Choose a status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              )}

              {course == true && (
              <div className="bg-light border" class="container">
                  
                <h5>Asign Course</h5>
                  
                <div class="mb-3">
                  <label class="form-label">
                    Training category:
                  </label>
                  <input type="text" class="form-control" name="Training category" id="training_category" required="required" placeholder="Enter a training category..." defaultValue={props.training_category} onChange={(e)=>handle(e)} />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Course name:
                  </label>
                  <input type="text" class="form-control" name="Course Name"  id="course_name" required="required" placeholder="Enter a course Name..." defaultValue={props.course_name} onChange={(e)=>handle(e)} />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Training delivery:
                  </label>
                  <select class="form-control" name="Training Delivery"  id="training_delivery" required="required" placeholder="Enter a training delivery..." defaultValue={props.training_delivery} onChange={(e)=>handle(e)}>
                    <option value="" disabled selected hidden>Choose a training delivery</option>
                    <option value="instructor">Instructor-Led Training</option>
                    <option value="self-pased">Self-Pased Training</option>
                  </select>
                </div>

                <div class="mb-3" >
                  <label class="form-label">
                    Start Course Date:
                  </label>
                  <input type="date" class="form-control" name="Trainig Date" id="training_date" required="required" placeholder="Enter a trainig date..." defaultValue={props.training_date} onChange={(e)=>handle(e)} />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Provider:
                  </label>
                  <input type="text" class="form-control" name="Provider" id="provider" required="required" placeholder="Enter a provider..." defaultValue={props.provider} onChange={(e)=>handle(e)} />
                </div >

                <div class="mb-3">
                  <label class="form-label">
                    Instructor name:
                  </label>
                  <input type="text" class="form-control" name="Instructor Name" id="instructor_name" required="required" placeholder="Enter an instructor name..." defaultValue={props.instructor_name} onChange={(e)=>handle(e)} />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Training status:
                  </label>
                  <select  class="form-control" name="Training Status" id="training_status" required="required" defaultValue={props.training_status} onChange={(e)=>handle(e)}>
                    <option value="" disabled selected hidden>Choose an option</option>
                    <option value="not-finished">Not finished</option>
                    <option value="finished">Finished</option>
                    <option value="failed">Failed</option>
                    <option value="retaking">Retaking course</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Does the course have certification?
                  </label>
                  <select class="form-control" name="answer" id="answer" required="required" defaultValue={props.answer} onChange={(e)=>handle(e)}>
                    <option value="" disabled selected hidden>Choose an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Comments:
                  </label>
                  <textarea type="text" class="form-control" rows="3" name="Comments"  id="comments"  defaultValue={props.comments} placeholder="Enter Comments..." onChange={(e)=>handle(e)} />
                </div>
              </div>
              )}
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
    </div>
  )
}

//end course date, certificate expiration date and passing grade not included because these fields are going to be provided when employee has finished the course

export default Update