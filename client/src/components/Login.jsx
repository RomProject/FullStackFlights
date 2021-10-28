import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {useState} from 'react'




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));








export default function Login({history}) {
  const classes = useStyles();

  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [data, setdata] = useState("")

   
  return (

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}  required>
          <TextField onChange={(e)=>{setusername(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField onChange={(e)=>{setpassword(e.target.value)}}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
           
          />
      
          <Button onClick={ async ()=>{
              try {
                const res = await fetch('http://localhost:2225/auth/login',{
                method:"post",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({username, password})
                

                  })
                
                  const data = await res.json()
                  setdata(data)
                  if(data.token){
                    localStorage.token = data.token
                    localStorage.username = data.username
                    
                    function parseJwt(token) {
                      const base64Url = token.split(".")[1];
                      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
                      const jsonPayload = decodeURIComponent(
                        atob(base64)
                          .split("")
                          .map(function (c) {
                            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                          })
                          .join("")
                      );
                      return JSON.parse(jsonPayload);
                    }
                    localStorage.id = parseJwt(localStorage.token).id
                    
                 
                    history.push('/home')
                    
                  

                  }


                
              } catch (err) {
                console.log(err);
              }


          }}
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        
         <h1 id="logerror"> {data.loginfo}</h1>
          <Grid container>
            <Grid item xs>
              
            </Grid>
            <Link href="register" >Dont have an account?Register</Link>
          </Grid>
          
  
        </form>
      </div>
      <Box mt={8}>
      </Box>
      
    </Container>
  
  );
 
}
