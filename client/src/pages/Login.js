import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/Login.css';
import {Link} from 'react-router-dom';

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
        console.log(this.state);
    }

    render(){
        return(
            <div className="form-container">
                <form className="form" onSubmit={this.handleSubmit} action="/dashboard">
                    <h2 className="text-center h4 mb-4">Sign in</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
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
                            placeholder="Password"
                            onChange={this.handleChange}
                            value={this.state.password || ''} 
                        />
                    </div>
                    <div className="row form-buttons">
                        <button type="submit" className="btn btn-primary">Sign in</button> 
                        <Link to="/register">Create account</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;