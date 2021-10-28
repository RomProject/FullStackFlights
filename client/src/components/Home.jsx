import React from 'react'
import {useState,useEffect} from 'react'
import List from './List'
import Button from '@material-ui/core/Button'

import Navbar from './Navbar'

export default function Home({history}) {
    const [vacation, setvacation] = useState([])
    



    


  

    useEffect(() => {
        const fetchVac = async () =>{

            try{
                const res = await fetch('http://localhost:2225/vacation',{
                method:"get",
                headers:{"authorization": localStorage.token}

                })
                const data = await res.json()
                setvacation(data)
                console.log(data);

            } catch (err) {
                console.log(err);
            }
        }
     
        fetchVac()
    }, [])


  

    return (
        <div>
     
    
         <Navbar/>
         <Button id="logout" variant="contained"  onClick={()=>{localStorage.removeItem('token')
           history.push("/login")}}
         color="primary">Log Out</Button>

            <List vacation ={vacation}  setvacation={setvacation}   />
        </div>
    )
}








