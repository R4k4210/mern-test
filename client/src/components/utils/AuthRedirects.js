import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import store from '../../redux/Store';
import axios from 'axios';
import { api } from '../../config/keys';

export default function withAuth(ComponentToProtect) {
    return class extends Component {
    
        state = {
            loading: true,
            redirect: false,
        };

        componentDidMount() {
            const { userReducer } = store.getState();
            let token = "";
            if(userReducer.member){
                token = userReducer.member.token;
            }
            
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    "x-auth-token": token,
                }
            }

            axios.post(`${api.token}/checkToken`, null, config)
                .then(response => {
                    if(response.data.authorized){
                        this.setState({ loading: false, redirect: false });
                    }else{
                        this.setState({ loading: false, redirect: true });
                    }
                    
                })
                .catch(error => {
                    console.log(error);
                    this.setState({ loading: false, redirect: true });
                })
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                console.log("redirect to login");
                return <Redirect to="/login" />;
            }
            return <ComponentToProtect {...this.props} />;
        }
        
    }
}
