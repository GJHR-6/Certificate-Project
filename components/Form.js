import { useState, useEffect, useRef , useContext} from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from "react";
import Image from 'react-bootstrap/Image'
import logo_blue from './img/logo_blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack'
import { v4 as uuidv4 } from 'uuid'
import swal from 'sweetalert';
import { title } from 'process';
import { icons } from 'react-icons';
import { updateContext } from '../Helper/Context';


 

function Addform() {

  const https = require('https')
  
  const [show, setShow] = useState(false); //show/hide window
  const [employee, setEmployee] = useState([]);
  const [course, setCourse] = useState([]);
  const { update, setUpdate } = useContext(updateContext);

  //Definig UseState hook to store forms values
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataCourse, setDataCourse] = useState([]);
  const [data, setData] = useState({
            transaction_ID: uuidv4(),
            start_date:"",
            status:"",
            training_date: "",
            end_training_date: "",
            training_delivery:"",
            instructor_name: "",
            training_status: "",
            answer:"",
            comments: ""

  });

  //-------------------------------------SHOW / HIDE WINDOW FUNCTION ----------------------------------------------
  const handleClose = () => {
    setShow(false);
  } //close modal function
  const handleShow = () => setShow(true); //show modal function

  

  //------------------------------------- GET EMPLOYEES AND COURSES --------------------------------------------------


  

  useEffect(() => {
      function getEmployee() {
        fetch("http://localhost:3001/show_employee")
          .then(response => {
            return response.json();
          })
          .then(response => {
            setEmployee(response);
        })
        }
      
    function getCourses(){
      fetch("http://localhost:3001/show_course")
        .then(response => {
          return response.json();
        })
        .then(response => {
        setCourse(response);
        
      } )
    }

    getEmployee();
    getCourses();
  }, [update])

  //console.log(employee)
  //------------------------------------------------------------------------------------------------------------------------

  function submit(e){ //funtion for submiting form
    e.preventDefault();
    var sent = false; // false if message wasn't delivered to firefly, true if the message was sent
    
    const url = "https://u0jg2nhvzc-u0yodsdby1-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/default/messages/broadcast"

    const message=JSON.stringify({
      header:{
        tag:"new_course_assigned",
        topics: [`${dataEmployee[0].employee_ID}`,
                `${data.transaction_ID}`]
      },
      data: [
        {
          value:{
            "transaction_ID": data.transaction_ID,
            "employee_ID": dataEmployee[0].employee_ID,
            "name": dataEmployee[0].full_name,
            "business": dataEmployee[0].business_name,
            "department": dataEmployee[0].department,
            "position": dataEmployee[0].pos,
            "start_date": dataEmployee[0].start_date,
            "status_employee": dataEmployee[0].status_employee,
            "course_ID": dataCourse[0].course_ID,
            "course_name": dataCourse[0].course_name,
            "training_category": dataCourse[0].training_category,
            "provider":dataCourse[0].provider,
            "start_couse_date":data.training_date,
            "end_course_date": data.end_training_date,
            "training_status": data.status,
            "training_delivery": data.training_delivery,
            "instructor": data.instructor_name,
            "grade": 0,
            "answer_certificate": data.answer,
            "Comments": data.comments,
          }
        
        }
      ] 
})

    
    var fireflyRequestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic dTB4Z3VhZm9wMTpKTGQ3RGNvQjNBemN2Z0hieXBRckFrR3hBdmVPRkozWG5kOWFhYmNYaHRj',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000/'

      },
      body: message,
      redirect: 'follow'
    };

    

    fetch(url, fireflyRequestOptions)
      .then(response => response.json() )
      .then(result => console.log(result))
      .catch(error => swal({
        title: 'Error',
        text: error,
        icon:'error'
      }))
      .then(() => fetch("http://localhost:3001/assign_course", requestOptions))
      .then(response => response.json())
      .then(json => console.log(json))
      .finally(data => {
          swal({
          title: 'Course Assigned',
          icon: 'success'
          });
        setUpdate(!update);
        })
      .catch(error => console.log('error', error));
   

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "transaction_ID": data.transaction_ID,
  "employee_ID": dataEmployee[0].employee_ID,
  "course_ID": dataCourse[0].course_ID,
  "start_couse_date":data.training_date,
  "end_course_date": data.end_training_date,
  "training_status": data.status,
  "training_delivery": data.training_delivery,
  "instructor": data.instructor_name,
  "grade": 0,
  "answer_certificate": data.answer,
  "Comments": data.comments,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
    handleReset();
    setShow(false);
    
  }

//------------------------------------------------------HANDLE INPUTS---------------------------------------------------------------------  
  
  function handle(e) {
    
    const newData={...data}
    newData[e.target.id]=e.target.value
    setData(newData)
    console.log(data)
    
  }
 //--------------------------------------------------------FUNCTION TO FILL OUT INPUTS--------------------------------------------------------------------------------
  //GET EMPLOYEE DATA
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };

  //clean form after closing
  const handleReset = () =>{
    Array.from(document.querySelectorAll('input')).forEach(
      input => (input.value = "")
    );

    setData({
      transaction_ID: uuidv4(),
      start_date: "",
      status: "",
      training_date: "",
      end_training_date: "",
      training_delivery: "",
      instructor_name: "",
      training_status: "",
      answer: "",
      comments: ""
    });

  }


  function employeeSelected(e) {
    const idEmployee = e.target.value;
    console.log(idEmployee)
    
  fetch(`http://localhost:3001/get_employee/${idEmployee}`, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(result => {
      setDataEmployee(result)
    })
  .catch(error => console.log('error', error));
  }

  
  function courseSelected (e) {
    const idCourse = e.target.value;
    console.log(idCourse);
    fetch(`http://localhost:3001/get_course/${idCourse}`, requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((response => {
        setDataCourse(response);
        
    }))

  }



  return (
    <div className='App-form'>{
   }
      <>
        <Button size='sm' variant="outline-warning" onClick={handleShow} >
         Assign Course
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
            
            <Stack direction="horizontal" gap={2}>
     
              <div className="bg-light border" class="container">
                <div class="mb-3">
                  <h5>Add employee</h5>
                  {/*Name input*/}
                  <label class="form-label">
                    Name:
                  </label>
                    <select class="form-select" name="name" id="name" required="required"
                      onChange={employeeSelected}>
                    <option value="" hidden defaultValue={""} hidden>Choose an Employee</option>
                      {employee.map((employees => 
                        <option key={employees.employee_ID} value={employees.employee_ID}>{employees.full_name}</option>
                      ))}
                  </select>
                </div>

              


              <div class="mb-3">
                  <label class="form-label">
                    Course name:
                  </label>
                    <select type="text" class="form-select" id="course_name" name="Course Name"  required="required" placeholder="Enter a course Name..." onChange={courseSelected}>
                      <option value="1"  selected >Choose a Course</option>

                      {course.map((courses) => (
                        <option value={courses.course_ID}>{courses.course_name}</option>
                      ))}
                    </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Training delivery:
                  </label>
                  <select class="form-select" id="training_delivery" name="Training Delivery" required="required" placeholder="Enter a training delivery..." onChange={(e)=>handle(e)}>
                    <option value="" disabled selected hidden>Choose a training delivery</option>
                    <option value="instructor">Instructor-Led Training</option>
                    <option value="self-pased">Self-Pased Training</option>
                  </select>
                </div>

              <div class="mb-3" >
                  <label class="form-label">
                    Start Course Date:
                  </label>
                  <input type="date" class="form-control" id="training_date" name="Trainig Date" required="required" placeholder="Enter a trainig date..." onChange={(e)=>handle(e)} />
                  </div>
                  
                  <div class="mb-3" >
                  <label class="form-label">
                    End Course Date:
                  </label>
                  <input type="date" class="form-control" id="end_training_date" name="Trainig Date" required="required" placeholder="Enter a trainig date..." onChange={(e)=>handle(e)} />
                </div>


                <div class="mb-3">
                  <label class="form-label">
                    Instructor name:
                  </label>
                  <input type="text" class="form-control" id="instructor_name" name="Instructor Name"  required="required" placeholder="Enter instructor name..." onChange={(e)=>handle(e)} />
                </div>

                <div class="mb-3">
                  <label class="form-label">
                    Training status:
                  </label>
                  <select  class="form-select" id="training_status" name="Training Status" required="required" onChange={(e)=>handle(e)}>
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
                  <select class="form-select" id="answer" name="answer" required="required" onChange={(e)=>handle(e)}>
                    <option value="" disabled selected hidden>Choose an option</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </Stack>
            <div class="mb-3">

                  <label class="form-label">
                    Comments:
                  </label>
                  <textarea type="text" class="form-control" rows="3" id="comments" name="Comments" placeholder="Enter Comments..." onChange={(e)=>handle(e)} />
                </div>
              <div class="container">
              </div>
              
            
            </form>
          </Modal.Body>
          <Modal.Footer>
          <Stack direction="vertical" gap={2} >
        <Button type="submit" variant="primary"onClick={(e)=>submit(e)}>Save changes</Button>
        <Button variant="secondary" onClick={handleClose}>close</Button>
    </Stack>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

//end course date, certificate expiration date and passing grade not included because these fields are going to be provided when employee has finished the course

export default Addform