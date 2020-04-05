import React, {Component} from 'react';
import { connect } from 'react-redux';

class Navigator extends Component {
    componentDidMount(){
        console.log("Dashboard => ", this.props);
    }
    render(){
        return(
            <div>
                <h1>PUTO EL QUE LEE</h1>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { 
        userReducer: state.userReducer,
        utilsReducer: state.utilsReducer
    }
}
export default connect(
    mapStateToProps 
    )(Navigator);