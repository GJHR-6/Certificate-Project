import Axios from 'axios'
import { useState, useEffect } from 'react'
import React from 'react'


function Connection () {

    const [business, setBusiness] = useState([])

    const getBusiness=()=>{
       
        Axios.get("http://localhost:3001/business_area").then((response) => {
            console.log(response);
            setBusiness(response.data);
        })
          
    }

    useEffect(() => {
        getBusiness();
    }, [])
    
     
    return(
        <div>
            <button onClick={getBusiness}>Get Business</button>
            {business.map((item) => {
                return <div>
                    {item.business_ID}
                    {item.business_name}
                </div>
            })}
        </div>
            )
    
  }



export default Connection







