import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import Button from 'react-bootstrap/Button';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  handleClick = async (e) => {
    const genrePredictionURL = 'https://fy8onqbppj.execute-api.us-west-2.amazonaws.com/genrepredict';
    const query = 'An evil sorceress transports the gang back to the age chivalrous knights, spell-casting wizards, and fire-breathing dragons.';
    await axios.get(genrePredictionURL, {
      params: { 
        query: query 
      }
    })
    .then((res) => {
      console.log(res);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button onClick={this.handleClick}>TEST</Button>
        </header>
      </div>
    );
  }
} 

export default App;
