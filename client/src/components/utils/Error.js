import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';

class Errors extends Component {
    render(){
        const { errors } = this.props;
        let errorMessage = errors;
        
        const msg = Object.keys(errorMessage).map(key => {
            return (
                <Box key={key}>{errorMessage[key]}</Box>
            ); 
        }) 
        return msg                   
    }    
}

const mapStateToProps = (state, ownProps) => {
    return {
        errors: ownProps.errorMessage
    };
};

export default connect(mapStateToProps)(Errors)
