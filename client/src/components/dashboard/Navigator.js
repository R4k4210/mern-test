import React, {Component} from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';

class Navigator extends Component {

    render(){
        const { userReducer } = this.props;

        return(
            <div>
                <Avatar alt="Remy Sharp" src={userReducer.member.user.picture} />
                <h1>Welcome {userReducer.member.user.firstname} {userReducer.member.user.lastname}</h1>
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