import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import './App.css'

class App extends Component {
  render () {
    return (
        <div className="App">
          <Login />
        </div>
    )
  }
}

export default App;
