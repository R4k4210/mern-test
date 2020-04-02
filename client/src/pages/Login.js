import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser, hideError } from '../redux/actions/user/userActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import styles from '../components/styles/LoginForm';
import Copyright from '../components/login/Copyright';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import userReducer from '../redux/reducers/UserReducer';

class Login extends Component{
    state = {};

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //Preveemos que se haga un reload de la pagina al hacer submit
    handleSubmit = e => {
        e.preventDefault();
        try{
            this.props.signInUser(this.state.email, this.state.password);
        }catch(err){
            throw(err);
        }
    }

    handleClose = e => {
        this.props.hideError();
    }

    render(){

        const { errors } = this.props.userReducer;
        let message = '';
        if(errors){
            message = errors.data.message;
        }
        
        const { snackOpen } = this.props.userReducer;
        const { classes } = this.props;
        
        return(

            <Box>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.handleChange}
                                value={this.state.email || ''}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                                value={this.state.password || ''} 
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Box component="span">
                                        <Link to="/register">
                                            Forgot password?
                                        </Link>                                
                                    </Box>  
                                    </Grid>
                                <Grid item>
                                    <Box component="span">
                                        <Link to="/register">
                                            Don't have an account? Sign Up
                                        </Link>                                
                                    </Box>                            
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                            <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
            </Box>
        )
    }
}

Login.propTypes = {
    signInUser: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return { 
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps, { signInUser, hideError })(withStyles(styles)(Login));