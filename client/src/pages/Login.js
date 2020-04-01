import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInUser } from '../redux/actions/user/userActions';
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
            this.props.history.push("/dashboard");
        }catch(err){
            throw(err);
        }
    }

    render(){
        const { member } = this.props;
        if(member.user){
            console.log("MEMBER +> ", member.user.data);
        }        
        const { classes } = this.props;
        return(
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
        )
    }
}

Login.propTypes = {
    signInUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
};

export default connect(mapStateToProps, { signInUser })(withStyles(styles)(Login));