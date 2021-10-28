import React from 'react'
import TextField from '@material-ui/core/TextField';
import {useState} from 'react'
import Button from '@material-ui/core/Button';

export default function AddVac({history}) {
    const [descrip, setdescrip] = useState("")
    const [place, setplace] = useState("")
    const [price, setprice] = useState("")
    const [start_date, setsdate] = useState()
    const [end_date, setedate] = useState()
    const [picture, setpicture] = useState("")


   

    return (
        <div >
          <form  className="addvac"  type="submit" required>
            
         <h2 id='addhead'>Vacation Description</h2>
          <TextField onChange={(e)=>{setdescrip(e.target.value)}} type="text" id="outlined-basic" label="VACATION DESCRIPTION" variant="outlined" fullWidth required/>
        <h2 id='addhead'>Location</h2>
          <TextField onChange={(e)=>{setplace(e.target.value)}} type="text" id="outlined-basic" label="PLACE?" variant="outlined" fullWidth required/>
          <h2 id='addhead'>Price</h2>
          <TextField onChange={(e)=>{setprice(e.target.value+"$")}} type="text" id="outlined-basic" label="$$" variant="outlined" fullWidth required/>
          <h2 id='addhead'>Start-Date</h2>
          <TextField
          id="date"
          label="from date:"
          type="date"
          defaultValue="xxxx-xx-xx"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }} onChange={(e)=>{ setsdate(e.target.value)}}
        />
          <h2 id='addhead'>End-Date</h2>
          <TextField
          id="date"
          label="to date:"
          type="date"
          defaultValue="xxxx-xx-xx"
          fullWidth
          InputLabelProps={{
            shrink: true,


        }} onChange={(e)=>{ setedate(e.target.value)}}
        />
          <h2 id='addhead'>Add picture</h2>
          <TextField  onChange={(e)=>{setpicture(e.target.value)}} id="outlined-basic" label="IMAGE-ADRESS-URL" variant="outlined" fullWidth  />
          <h2 id='addhead'>Submit!</h2>
             <Button  onClick={  async (e)=>{ ;
            e.preventDefault()
                try {
                    const res = await fetch('http://localhost:2225/vacation/add',{
                        method:"POST",
                        headers:{"content-type":"application/json"},
                        body:JSON.stringify({descrip,place,price,start_date,end_date,picture})
                    })
                        const data = await res.json()
                        console.log(data);
                        history.push("/home")
                        alert("Vacation added")


                    
                } catch (err) {
                    console.log(err);
                    alert(err)
                   
                }

            }
                
            }
            variant="contained" color="primary" fullWidth type="submit" required>ADD VACATION</Button>
           
            <h1>{}</h1>

          </form>
        </div>
    )
}
