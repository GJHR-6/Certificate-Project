import { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import React from "react";
import Image from 'react-bootstrap/Image'
import logo_blue from './img/logo_blue.png';
//import MOCK_DATA from './MOCK_DATA.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import Axios from 'axios';
import swal from 'sweetalert';
import { updateContext } from '../Helper/Context';

const CourseForm = () => {

    const [show, setShow] = useState(false);
    const { update, setUpdate } = useContext(updateContext);
    const handleClose = () => {
        setShow(false);
    } //close modal function
    const handleShow = () => setShow(true); //show modal function

    const [data, setData] = useState({
        //id: uuidv4(),
        training_category: '',
        course_name: '',
        provider: '',
    })
    function submit(e) { //function for submiting form
        e.preventDefault();
        try {
            Axios.post("http://localhost:3001/create_course",
                {
                    course_name: data.course_name,
                    training_category: data.training_category,
                    provider: data.provider
                }).then(() => {
                    console.log("success");
                    swal({
                        text: "Course created",
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

  
    }

    function handle(e) {

        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)

    }

    return (
        <>
            <Button size='sm' variant="outline-primary" onClick={handleShow}>
                Add Course
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Image src={logo_blue} width="300" fluid />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => submit(e)}>

                        <Stack direction="vertical" gap={2}>
                            <div className="bg-light border" class="container">
                                <div class="mb-3">
                                    <h5>Add New Course</h5>
                                    {/*Name input*/}


                                    <div class="mb-3">
                                        <label class="form-label">
                                            Training category:
                                        </label>
                                        <input type="text" class="form-control" name="Training category" id="training_category" required="required" placeholder="Enter a training category..." onChange={(e) => handle(e)} />
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">
                                        Course name:
                                    </label>
                                    <input type="text" class="form-control" name="Course Name" id="course_name" required="required" placeholder="Enter a course Name..." onChange={(e) => handle(e)} />
                                </div>

                                <div class="mb-3">
                                    <label class="form-label">
                                        Provider:
                                    </label>
                                    <input type="text" class="form-control" name="Provider" id="provider" required="required" placeholder="Enter a provider..." onChange={(e) => handle(e)} />
                                </div >

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

export default CourseForm

