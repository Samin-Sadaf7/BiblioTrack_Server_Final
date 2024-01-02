import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInGoogle, signin, signup } from '../../actions/auth';
import Input from './Input';
import useStyles from './styles';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [showPassword, setShowPassword] =useState(false);
    const classes = useStyles(); 
    const [isSignup, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const handleSubmit = (e) => {
            e.preventDefault();
            if (isSignup) {
                dispatch(signup(form, navigate));
            }else {
                dispatch(signin(form, navigate));
            }
    };
    const handleGoogleLoginSuccess =(tokenResponse)=>{
        const accessToken = tokenResponse.access_token;
        console.log(accessToken);
        dispatch(signInGoogle(accessToken,navigate))
    };
    const handleChange = (e) =>{ 
            setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleShowPassword = () => {
            setShowPassword((prevShowPassword)=>!prevShowPassword);
    };
    const switchMode = () => {
            setIsSignUp((prevIsSignUp)=>!prevIsSignUp);
            setShowPassword(false);
    };
    const handleGoogleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});
   return (
    <Container component = "main" maxWidth ="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar} >
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant ="h5">{isSignup?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name= "firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name= "lastName" label="Last Name" handleChange={handleChange} autoFocus half/>            
                            </>
                        )
                    }
                    <Input name ="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name ="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                    {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account?Sign In' : "Don't have an account?Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
                <button  onClick={() => handleGoogleLogin()}  className={classes.googleButton}>
                <i className="fa-brands fa-google"></i>  Sign in with google</button>
        </Paper>
    </Container>
  )
}

export default Auth;
