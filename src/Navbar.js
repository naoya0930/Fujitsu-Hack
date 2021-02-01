import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render(){
    return(
      <div>
        <Link to="/">Home</Link>
        <p/>
        <Link to="/About">About</Link>
        <p/>
        <Link to="/ChildPage">ChildPage</Link>
        <p/>
        <Link to="/ChildLogin">ChildLogin </Link>
        <p/>
        <Link to="/ParentPage">ParentPage </Link>
        <p/>
        <Link to="/ParentLogin">ParentLogin </Link>
      </div>
    )
  }
}

export default Navbar;