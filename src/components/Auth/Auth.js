import React, {useState } from 'react';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import {GoogleLogin,GoogleLogout} from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwtDecode from 'jwt-decode';
import Icon from './icon'

import useStyles from './styles';
import Input from './Input';
import{signin,signup} from '../../actions/auth'


const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

const Auth = () => {
 
 
const classes = useStyles();
const [showPassword,setShowPassword] = useState(false);
const [isSignup, setIsSignup] = useState(false);
const [formData,setFormData] = useState(initialState)
const dispatch = useDispatch()
const navigate = useNavigate();
const handleShowPassword = () => setShowPassword((prevShowPassword)=>!prevShowPassword);



  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(isSignup){
    dispatch(signup(formData,navigate))
  }else{
    dispatch(signin(formData, navigate))
  }}

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const switchMode = ()=>{
    setIsSignup((prevIsSignup)=>!prevIsSignup);
    handleShowPassword(false)
  }

  const googleSuccess = async(res)=>{
    const decoded= jwtDecode(res.credential)
    const profile = res?.profileObject
 
   console.log(decoded);
    };
  

  const googleFailure = (error)=>{
    console.log(error)
    console.log('Google sign in was unsuccesful. try again later')}
  
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          
                <GoogleLogin
           clientId="778341672354-0maifj8sfc4q7mjslqpo1ur14tarf3i5.apps.googleusercontent.com"
           render={(renderProps) => (
             <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
               Google Sign In
             </Button>
           )}
           onSuccess={googleSuccess}
           onFailure={googleFailure}
           cookiePolicy="single_host_origin"
          />
         <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button onClick={switchMode}>
                        { isSignup ? 'Already have an account? Sign in' : "dont have an account? Sign Up "}
                    </Button>
                </Grid>
         </Grid>
        
          
        </form>
      </Paper>
    </Container>
  );
           }        

export default Auth;