import React, {Component} from 'react';
import {elastic as Menu} from 'react-burger-menu';
import {Link} from 'react-router-dom';
import '../styles/BurgerMenu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigator extends Component {
    
    render(){
        return(
            <Menu noOverlay>
                <Link id="home" className="menu-item" to="/">Home</Link>
                <Link id="about" className="menu-item" to="/about">About</Link>
                <Link id="contact" className="menu-item" to="/contact">Contact</Link>
            </Menu>
        )
    }
}

export default Navigator;