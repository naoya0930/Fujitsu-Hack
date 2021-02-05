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

export default App;
