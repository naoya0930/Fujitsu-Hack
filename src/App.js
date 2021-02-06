import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import About from './Components/About';
import ParentLogin from './Components/ParentLogin';
import ParentPage from './Components/ParentPage';
import ChildLogin from './Components/ChildLogin';
import ChildPage from './Components/ChildPage';
import TeacherPage from './Components/TeacherPage';
import TeacherLogin from './Components/TeacherLogin';
import Movie from './Components/Movie';

//import Home from './Home';
//const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const App = () => {
  Notification.requestPermission().then((permission) => {
      switch (permission) {
          case 'granted':
// 許可された場合
          break;
          case 'denied':
// ブロックされた場合
          break;
          case 'default':
// 無視された場合
          break;
          default:
          break;
          }
          });
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
            <Route path='/TeacherPage' component={TeacherPage}/>
            <Route path='/TeacherLogin' component={TeacherLogin}/>
            <Route path='/Movie' component={Movie}/>
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
