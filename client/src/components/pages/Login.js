import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login';

class Login extends Component{
    render(){
        return(
            <div className="form-container">
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;