import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './table.scss';
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import Update from './Update';
import Stack from 'react-bootstrap/Stack';
import Add from './Add.js';
import Form from './Form'
import BusinessForm from './BusinessForm'
import CourseForm from './CourseForm'
import AddNewEmployee from './AddNewEmployee'
import './options.css'
import swal from 'sweetalert';

import { updateContext } from '../Helper/Context';



const CertificateTable = () => {


  const [loading, setLoading] = useState(false); //useState hook for the state of datTable
  const [tableSearch, setTableSearch] = useState([]);
  const [posts, setPosts] = useState([]);//useState hook to retrieve dat`a from firefly api
  const [search, setSearch] = useState("");//useState hook for search input
  const [file, setFile] = useState(); //useState hook for files
  const [deletedRecord, setDeleteRecord] = useState(); //hook to select record tobe deleted
  const [update, setUpdate] = useState(false);
  


  //https endpoint
  const url = "http://localhost:3001/table"


  //This hook is to get the messages from firefly and post them in the table 
  useEffect(() => {
    try {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPosts(data);
          setTableSearch(data);
          setLoading(false);

        })
    }
    catch (e) {
      console.log(e);
    }

  }, [update])
  //console.log(posts);

  //filter function
  const handleChange = e => {
    setSearch(e.target.value);
    filterBar(e.target.value);
  }

  //re render page after adding new course, new employeeor new business area

  const filterBar = (searchTerm) => {
    try {
      var search = tableSearch.filter((post => {
        if (post.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.business_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.status_employee?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.course_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.training_delivery?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.training_category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.training_status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.provider?.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return post;
        }
      }))
      setPosts(search);
      console.log("type")
    }
    catch (e) {
      console.log(e.message)
    }

  }

  function deleteRecord(transaction_ID) {
   swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this record!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
      .then((willDelete) => {
  if (willDelete) {
    fetch(`http://localhost:3001/delete_course/${transaction_ID}`)
      .then(response => {
        if (response.ok) {
          swal("Your assigned course has been deleted!", {
          icon: "success",
          });
          setUpdate(!update)
        }

        else {
          throw Error();
        }

      })
      .catch(error => {
        swal({
          title: 'Error',
          text: error,
          icon:'error'
        })
      });
  } else {
        swal("The delete action has been canceled");
  }
      });

  
  }


  return (

    <updateContext.Provider value={{update, setUpdate}}>

      <div className="app-container">
        {/*Table Sructure, includes Bootrastap*/}
        <div class="container">
          <div class="row mt-2">
            <div class="col-12"></div>
            <div class="col-12">
              <div class="table-responsive" >
                <h2 class="table-title" align="center">Certification Record</h2>

                {/*Creating filter component
          define a input for the search bar, adding some styles*/}
                <div className='App-filter'>
                  <h3>Search Filter</h3>

                  <form>
                    <div className="newEmployee" align="right" >
                    </div>
                    <input type="text"
                      placeholder='Type...'
                      value={search}
                      id="search"
                      onChange={handleChange} />
                    <i><BiSearchAlt size={25} /></i>
                  </form>
                </div>
                <div className="options">
                  <Form />
                  <AddNewEmployee />
                  <CourseForm />
                  <BusinessForm />
                </div>
                {/*Beggining of the table*/}
                    <table class="table table-borderless table-hover sticky table-hover table-fixed ">
                      <thead class="text-nowrap">
                        <tr>
                          <th scope="col">Actions</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Department</th>
                          <th scope="col">Position</th>
                          <th scope="col">Business Area</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Course Name</th>
                          <th scope="col">Training category</th>
                          <th scope="col">Start Course Date</th>
                          <th scope="col">End Course Date</th>
                          <th scope="col">Training Delivery</th>
                          <th scope="col">Provider</th>
                          <th scope="col">Instructor Name</th>
                          <th scope="col">Training Status</th>
                          <th scope="col">Certificate?</th>
                          <th scope="col" >Certificate Expiration Date</th>
                          <th scope="col">Comments</th>
                          <th scope="col">Certificate</th>
                        </tr>
                      </thead>
                      <tbody class=" align-middle break-word">
                        {loading ? (<h4>Loading ...</h4>) :
                          (posts && posts.map(contacts =>
                            <tr key={contacts.transaction_ID}>
                              <td>
                                <Stack direction="horizontal" gap={2}>
                                  {/*Assign course button*/}
                                  <p><Add name={contacts.full_name}
                                    mail={contacts.email}
                                      department={contacts.department}
                                    account={contacts.business_name}
                                    start_date={contacts.start_date}
                                    status={contacts.status_employee}
                                    position={contacts.pos}
                                    id={contacts.employee_ID}
                                  />
                                  </p>

                                  {/*Edit button*/}
                                  <p>
                                    <Update
                                    name={contacts.full_name}
                                    mail={contacts.email}
                                    department={contacts.department}
                                    account={contacts.business_name}
                                    start_date={contacts.start_date}
                                    status={contacts.status_employee}
                                    position={contacts.pos}
                                    course_name={contacts.course_name}
                                    training_category={contacts.training_category}
                                    training_date={contacts.start_couse_date}
                                    end_date={contacts.end_course_date}
                                    training_delivery={contacts.training_delivery}
                                    provider={contacts.provider}
                                    instructor_name={contacts.instructor}
                                    training_status={contacts.training_status}
                                    answer={contacts.answer_certificate}
                                    comments={contacts.Comments}
                                    id={contacts.transaction_ID}
                                    employee_id={ contacts.employee_ID}

                                      
                                    />
                                  </p>

                                  {/*Delete button*/}
                                  <p><button className="btn btn-danger btn-sm"
                                    onClick={() => {
                                      deleteRecord(contacts.transaction_ID);
                                    }}
                                  > <BsFillTrashFill /> 
                                  </button></p>
                                </Stack>

                              </td>
                              <td>{contacts.full_name}</td>
                              <td>{contacts.email}</td>
                              <td>{contacts.department}</td>
                              <td>{contacts.pos}</td>
                              <td>{contacts.business_name}</td>
                              <td>{contacts.start_date}</td>
                              <td>{contacts.status_employee}</td>
                              <td>{contacts.course_name}</td>
                              <td>{contacts.training_category}</td>
                              <td>{contacts.start_couse_date}</td>
                              <td>{contacts.end_course_date}</td>
                              <td>{contacts.training_delivery}</td>
                              <td>{contacts.provider}</td>
                              <td>{contacts.instructor}</td>
                              <td>{contacts.training_status}</td>
                              <td>{contacts.answer_certificate}</td>
                              <td>{contacts.expiration_date}</td>
                              <td>{contacts.Comments}</td>
                              <td>
                                <div className="d-flex custom-upload">
                                  <p className='upload'>

                                    <input type="file" id="certificate" />
                                    <div className=''>
                                      <button class="btn btn-primary btn-sm submit-button" >Submit</button>
                                    </div>
                                  </p>
                                  <p><button class="btn btn-secondary btn-sm download-button" variant='secondary'>Download</button></p>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
            
                
                <div class="col-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </updateContext.Provider>

  )
}


export default CertificateTable