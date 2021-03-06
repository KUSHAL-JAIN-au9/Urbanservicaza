import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import {AUTH} from '../../constants/actionTypes';
import {signup, signin} from '../../actions/authActions';
import useStyles from './styles';
import {toast} from 'react-toastify';
import Input from './Input';
import Icon from './Icon';


const initialState = {firstName:'', lastName:'', email:'', phone: '', city: '', password:'' ,confirmPassword: ''}

const Auth = () => {

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(form, history))
        }else{
            dispatch(signin(form, history))
        }

    };

    const handleShowPassword = () => setShowPassword(!showPassword);

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = (res) => {
        // console.log(res)
        // optional chaining operator
        // the question mark operator is a special operator that's not going to throw an error if we don't have access to res object
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
        dispatch({ type: AUTH, data: { result, token } });

        history.push("/");
        toast.success("Successfully signed-In...")

        } catch (error) {
        console.log(error);
        }
    }

    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

    return (

        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    { isSignup ? "Sign up" : "Sign in" }
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit}>

                    <Grid container spacing={2}>
                    { isSignup && (
                    <>
                        <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />

                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                        <Input name="city" label="City" handleChange={handleChange} />

                        <Input name="phone" label="Phone Number" handleChange={handleChange} />
                    </>
                    )}

                    <Input name="email" label="Email Address" handleChange={handleChange} type="email" />

                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />

                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }

                    </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} disabled={!form.email || !form.password}>
                        { isSignup ? "Sign Up" : "Sign In" }
                    </Button>

                    <GoogleLogin
                        clientId="896500833577-7fkj9rt1t83oqnli8ban9urbp15eathi.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
