import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Login.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../redux/actions/user/userActions';
import PropTypes from 'prop-types';

class Register extends Component{
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

        if(this.state['password'] !== this.state['repassword']){
            alert("Password must match re-password");
        }else{
            //console.log("State antes de create => ", this.state);
            this.props.createUser(this.state);
        }
    }

    render(){
        
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

        return(
            <div className="form-container col-lg-12">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h2 className="text-center h4 mb-4">Create Account</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            name="name" 
                            aria-describedby="nameHelp" 
                            placeholder="Enter name"
                            onChange={this.handleChange}
                            value={this.state.name || ''}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" name="email" 
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                            onChange={this.handleChange}
                            value={this.state.email || ''}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            placeholder="Enter Password"
                            onChange={this.handleChange}
                            value={this.state.password || ''}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="re-password">Re-password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="repassword" 
                            name="repassword" 
                            placeholder="Re-enter Password"
                            onChange={this.handleChange}
                            value={this.state.repassword || ''}
                        />
                    </div>
                    <div className="row form-buttons">
                        <button type="submit" className="btn btn-primary">Register</button> 
                        <Link to="/login">I already have an account. Sign in</Link>
                    </div>
                </form>

            </div>
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
    usar esta funcion. Tambien permite al componente suscribirse al state y enterarse de los cambios.
*/
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
 
/*
    Connect es quien genera el vinculo del estado con el componente, pasando el mapStateToProps nos sucribimos a los cambios
    y ante cualquiera actualizacion de valores podremos verlo, de la misma forma pasando null, podemos no suscribirnos.
*/
export default connect(mapStateToProps, { createUser })(Register);