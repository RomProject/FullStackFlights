import React from 'react'
import {Bar, Line} from 'react-chartjs-2'
import {useState,useEffect} from 'react' 

export default function Charts() {
   

    const [chartData, setchartData] = useState([])
  

    useEffect(() => {
        const countries = async ()=>{
            try {
                const res = await fetch('http://localhost:2225/vacation/place')
                const data = await res.json()

                setchartData({
            
                    labels:data.map(name=>name.place),
                    datasets:[
                        {
                            label:'Followers',
                            data:data.map(name=>name.followers),
                            backgroundColor:[
                                'rgba(75,192,192,0.6)'
                            ],
                            borderWidth:4
                        }
                    ]
                })
                
                
            } catch (err) {
                console.log(err);
            }

        }
        countries()
        
        
     
    }, [])

    
    return (
        <div className="bar">
          <Bar data={chartData}  />
           
        </div>
    )
}
