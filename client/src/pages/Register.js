import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser, hideError } from '../redux/actions/user/userActions';
import { formLoading, hasErrors } from '../redux/actions/utils/utilsActions';
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
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Error from '../components/utils/Error';

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
        try{
            this.props.createUser(this.state).then(() => {
                this.props.formLoading(false);
                const { hasErrors } = this.props.utilsReducer;
                if(!hasErrors){
                    this.props.history.push('/login');
                }
            });
        }catch(err){
            throw(err);
        }  
    }

    handleClose = e => {
        this.props.hideError();
    }

    render() {

        /*
         *  Tal como se menciona abajo, luego de usar connect y mapStateToProps, se puede acceder al estado
         *  y siempre que se genere un cambio en este, podremos enterarnos, cada vez que se llame al Action
         *  de Redux.            
         *  La forma de acceder a las propiedades del state se determina segun la forma declarada en el Reducer
         *  > this.props.{nombre reducer}.{nombre propiedad}.{demas propiedades}
        */        
        const { errorMessage } = this.props;
        const { snackOpen } = this.props.userReducer;
        const { classes } = this.props;
        const { errorFields } = this.props
        const errorFieldNames = Object.values(errorFields);
        const { loading } = this.props.utilsReducer;

        return (

            <Box>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        <Error errorMessage={errorMessage}/>
                    </Alert>
                </Snackbar>
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
                                            error={errorFieldNames.includes("firstname")}
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
                                            error={errorFieldNames.includes("lastname")}
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
                                            error={errorFieldNames.includes("email")}                                
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
                                            error={errorFieldNames.includes("password")}                                        
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
                                            error={errorFieldNames.includes("repassword")}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={loading}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Box component="span">
                                            <Link to="/forgot" disabled={loading}>
                                                Forgot password?
                                            </Link>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box component="span">
                                            <Link to="/login" disabled={loading}>
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
            </Box>
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

/*
    Connect es quien genera el vinculo del estado con el componente, pasando el mapStateToProps nos sucribimos a los cambios
    y ante cualquiera actualizacion de valores podremos verlo, de la misma forma pasando null, podemos no suscribirnos.
*/
function mapStateToProps(state) {
    let keys = {};
    let message = {};    
    const { userReducer } = state;
    if(userReducer){
        const { errors } = userReducer;  
        if(errors){
            message = Object.values(errors.data.errors);
            keys = Object.keys(errors.data.errors);
        }
    }

    return { 
        userReducer: state.userReducer,
        errorMessage: message,
        errorFields: keys,
        utilsReducer: state.utilsReducer
    }
}
export default connect(
    mapStateToProps, 
    { 
        createUser, 
        hideError, 
        formLoading, 
        hasErrors 
    })
    (withStyles(styles)(Register));