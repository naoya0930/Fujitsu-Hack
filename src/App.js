import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import About from './Components/About';
import ParentLogin from './Components/ParentLogin';
import ParentPage from './Components/ParentPage';
import ChildLogin from './Components/ChildLogin';
import ChildPage from './Components/ChildPage';

//import Home from './Home';

const App = () => {
    return (
        <div className="App">
          <Router>
            <div>
              <Navbar /><hr/>
              <Route path='/About' component={About}/>
              <Route path='/ChildPage' component={ChildPage}/>
              <Route path='/ChildLogin' component={ChildLogin}/>
              <Route path='/ParentLogin' component={ParentLogin}/>
              <Route path='/ParentPage' component={ParentPage}/>
            </div>
          </Router>
        </div>
      );
}



/*
function App() {
  return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/About">About</Link>
    </div>
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
      </header>
    </div>
  );
}
*/

export default App;
