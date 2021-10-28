
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment'






const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
 
}));

export default function Item({picture,descrip,place,price,start,end,vac}) {
  const classes = useStyles();
  
  const user_id = localStorage.id
  const vacation_id = vac.id


  const likeVac = async (user_id,vacation_id)=>{
  try {

    const res = await fetch('http://localhost:2225/vacation/like',{
      method:"POST",
      headers:{"authorization": localStorage.token, 'Content-Type': 'application/json'},
      body:JSON.stringify({user_id,vacation_id})
    

    })
    if(res.ok){
      alert('Vacation liked')
    }

  } catch (err) {
    console.log(err);
  }

}




const deleteVac = async (id)=>{
  try {
    const res = await fetch(`http://localhost:2225/vacation/delete`,{
      body:JSON.stringify({id}),
      method:"delete",
      headers: {"content-type":"application/json"}
       
      
    })
  
    const data = await res.json()
    console.log(data);

    
  } catch (err) {
    console.log(err);
  }

}








  return (
      <div className="vacs">
          
    <Card id="card" className={classes.root}  >
      <CardHeader        
        title={place}
        subheader={"FROM: "+moment(start).format('DD-MM-YYYY')+" | TO: "+moment(end).format('DD-MM-YYYY')}
      />
    <AirplanemodeActiveIcon></AirplanemodeActiveIcon>

      <CardMedia 
        className={classes.media}
        image={picture}
        title="Paella dish"
        src={picture}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        <p id="descrip">{descrip}</p>
      </Typography>
      </CardContent>
      <CardActions >
      {localStorage.username === "admin"? <button id="delbtn" onClick={()=>{deleteVac(vac.id);window.location.reload(false)} }>Delete</button>:"" }
        
      {localStorage.username !=="admin"?<IconButton  onClick={()=>{likeVac(user_id,vacation_id);console.log(user_id,vacation_id);}}><FavoriteIcon/></IconButton>:""}
      <h2>{price}</h2>
      </CardActions>
     
    </Card>
    </div>
  );
}
