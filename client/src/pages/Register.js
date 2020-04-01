import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../redux/actions/user/userActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import styles from '../components/styles/LoginForm';
import Copyright from '../components/login/Copyright';

class Register extends Component {
    //Se debe inicializar state como un objeto vacio, sino el 
    //this.state.name en la prop value da error porque es null
    state = {};
    handleChange = e => {
        /*
        * Esta es la manera clasica, pero se puede sustituir con
        * Babel usando Computed Property Name   
        * ------------------------------------------------------
        * let partialState = {};
        * partialState[e.target.name] = e.target.value;
        * this.setState(partialState);
        */

        //Computed Property Name 
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    //Preveemos que se haga un reload de la pagina al hacer submit
    handleSubmit = e => {
        e.preventDefault();
        if (this.state['password'] !== this.state['repassword']) {
            alert("Password must match re-password");
        } else {
            this.props.createUser(this.state);
        }
    }

    render() {

        /*
         *  Tal como se menciona abajo, luego de usar connect y mapStateToProps, se puede acceder al estado
         *  y siempre que se genere un cambio en este, podremos enterarnos, cada vez que se llame al Action
         *  de Redux.   
         *  const { user } = this.props;
         *  console.log("Mi props => ", this.props);
         *  La forma de acceder a las propiedades del state se determina segun la forma declarada en el Reducer
            if(user.user){
                const u = user.user;
                console.log(u.name);
            }
        */        
        const { classes } = this.props;

        return (

            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Box m={2}>
                        <Typography component="h1" variant="h5">
                            Create account
                        </Typography>
                        </Box>
                        <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        autoComplete="fname"
                                        name="firstname"                                                                                
                                        id="firstname"
                                        label="First Name"
                                        fullWidth
                                        required
                                        autoFocus
                                        onChange={this.handleChange}
                                        value={this.state.firstname || ''} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="lastname"
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="lname"
                                        onChange={this.handleChange}
                                        value={this.state.lastname || ''} 
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"                                
                                        onChange={this.handleChange}
                                        value={this.state.email || ''}                                
                                    />                                    
                                </Grid>
                                <Grid item xs={12}>
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
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="repassword"
                                        label="Re-password"
                                        type="password"
                                        id="repassword"
                                        autoComplete="current-password"
                                        onChange={this.handleChange}
                                        value={this.state.repassword || ''}
                                    />
                                </Grid>
                            </Grid>
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
                                        <Link to="/forgot">
                                            Forgot password?
                                        </Link>
                                    </Box>
                                </Grid>
                                <Grid item>
                                    <Box component="span">
                                        <Link to="/login">
                                            Already have an account? Sign In
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
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
            </Grid>
        )
    }
}

/*
    Se usa prototypes para realizar validaciones de los tipos de props.
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,
*/
Register.propTypes = {
    createUser: PropTypes.func.isRequired
}

/*  
    mapStateToProps te vincula tu componente con el state del store, de esta forma
    cualquier componente que quiera acceder al estado de por ej. el usuario, debe
    usar esta funcion. Tambien permite al componente, al estar suscripto al state, enterarse de los cambios.
*/
const mapStateToProps = (state) => {
    return {
        member: state.member
    }
};

/*
    Connect es quien genera el vinculo del estado con el componente, pasando el mapStateToProps nos sucribimos a los cambios
    y ante cualquiera actualizacion de valores podremos verlo, de la misma forma pasando null, podemos no suscribirnos.
*/
export default connect(mapStateToProps, { createUser })(withStyles(styles)(Register));