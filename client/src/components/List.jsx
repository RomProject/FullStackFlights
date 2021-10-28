import React from 'react'
import Item from './Item'



export default function List({vacation}) {

  


    
    return (
        
        
 


        <div className="list">
             
            {vacation.map(vac=><Item key ={vac.id} descrip ={vac.descrip} place={vac.place} vac={vac} 
             picture = {vac.picture} price = {vac.price} start={vac.start_date} end={vac.end_date}/> )}
        </div>
    )
}
