import {useState, useEffect, useMemo} from 'react'
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Add from './Add.js';
import {CSVLink} from 'react-csv';
import { map } from 'lodash';
import Form from './Form.js'
import './table.scss';
import Pagination from './Pagination.js';


function GetData(){
    const [data, setData] = useState([]) //State Hook for blockchain data
   

    //https endpoint
    const url="https://u0czezo9fq-u0i7ecpugr-firefly-os.us0-aws-ws.kaleido.io/api/v1/namespaces/string/data?"
    //Auth header
    const header={
        method: 'GET',
        headers: {
            'Authorization': 'Basic dTBwMmg5MzBtMDpqTDlIMjh4bjBnSVJVUmFEZ1dBVVdCU3hSb2NjRjdsU3hFcVNFOTVTT3d3',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type, x-requested-with',
            'Origin': 'http://localhost:3000/'
         }
    }

    useEffect(() => {
        fetch(url,header)
        .then(response => response.json())
        .then(data => {
            setData(data)
        })
    }, [])

    return data

}

function Page(){
    let PageSize = 10; //amount of records to display on the table
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
      }, [currentPage]);
    

}

const pagination

export default function Table(){
    const data = GetData()

    return (

    <div className= "app-container">
      {/*Table Sructure, includes Bootrastap*/}
      <div class="container">
       <div class="row mt-2">
         <div class="col-12"></div>
           <div class="col-12">
              <div class="table-responsive" >
                <h2 class="table-title" align="center">Certification Record</h2>
            </div>
            <div align="right" className="newEmployee">
             <Form  />
            </div>
            <table class="table table-hover">
              <thead class="table-light align--text-top text-center">
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
                <th scope="col" >Certificate Expiration Date</th>
                <th scope="col">Comments</th>
                <th scope="col">Certificate</th>
                </tr>
              </thead>
              <tbody>
              {data.map(contacts=>(
                  <tr key={contacts.value.id}>
                    <td>
                      <Stack direction="horizontal" gap={2}>
                        {/*Asign course button*/}
                      <p><Add /></p>
                      <p>
                        {/*Edit button*/}
                        <Button class="btn btn-info"> <BsPencilFill /> </Button>
                      </p>
                      {/*Delete button*/}
                      <p><Button variant='danger'> <BsFillTrashFill /> </Button></p>
                      </Stack>

                    </td>
                    <td>{contacts.value.name}</td>
                    <td>{contacts.value.email}</td>
                    <td>{contacts.value.department}</td>
                    <td>{contacts.value.position}</td>
                    <td>{contacts.value.account}</td>
                    <td>{contacts.value.Start_Date}</td>
                    <td>{contacts.value.status}</td>
                    <td>{contacts.value.course_name}</td>
                    <td>{contacts.value.training_category}</td>
                    <td>{contacts.value.trainig_date}</td>
                    <td>{contacts.value.end_date}</td>
                    <td>{contacts.value.training_delivery}</td>
                    <td>{contacts.value.provider}</td>
                    <td>{contacts.value.instructor_name}</td>
                    <td>{contacts.value.training_status}</td>
                    <td> N/D{/*contacts.value.certificate_Expiration_Date*/}</td>
                    <td>{contacts.value.comments}</td>
                     <td>
                      <div class="d-flex">
                      <p>
                        <input type="file" class="form-control-file" id="certificate"/>
                      </p>
                      <p><Button variant='secondary'>Download</Button></p>
                      </div>
                    </td>


                  </tr>
                ))}
            </tbody>
            </table>
      </div>
      <Pagination 
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={PageSize}
            onPageChange={page=> setCurrentPage(page)}/>
       </div>
      <div class="col-6"></div>
    </div>

  </div>
      
      
    )
}