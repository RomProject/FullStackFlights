import React from 'react'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function Register({history}) {
  const classes = useStyles();


  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [fname, setfname] = useState("")
  const [lname, setlname] = useState("")
  const [data, setdata] = useState("")




  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        
        
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} required>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField onChange={(e)=>{setfname(e.target.value)}}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField onChange={(e)=>{setlname(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e)=>{setusername(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(e)=>{setpassword(e.target.value)}}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
       
            </Grid>
          </Grid>
          <Button onClick ={async ()=>{
            try {
                const res = await fetch('http://localhost:2225/auth/register',{
                  method:"post",
                  headers:{"content-type":"application/json"},
                  body:JSON.stringify({username,password,lname,fname}),
                  
                  

                })
                const data = await res.json()
                console.log(data);
                setdata(data)
                
                if(data.sucsses){
                console.log(data.sucsses);
              
                  history.push('/login')
                 

                }




            } catch (err) {
              console.log(err);
            }



          }}
            
            fullWidth
            variant="contained"
            color="primary"
           
          >
            Sign Up
          </Button>
          <h1 id="logerror">{data.info}</h1>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}