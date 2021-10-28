import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
     

      
        <div className="nav">
               <h4>{localStorage.username==="admin"?<Link to="/charts">VIEW CHARTS</Link>:""}</h4>
               <h4>{localStorage.username === "admin"?<Link id="link" to="/add">ADD VACATION</Link> :""}</h4>
               <h1>{`Hello ${localStorage.username} !`}</h1>
          
        
          
        </div>
    )
}
