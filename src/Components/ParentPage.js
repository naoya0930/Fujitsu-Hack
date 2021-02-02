import React from 'react'
import Button from '@material-ui/core/Button';
import Createicon from '@material-ui/icons/Create';

class About extends React.Component {
  render(){
    return(
      <div>
        <h1>Parent Page</h1>
        <h2>I am </h2>
        <Button variant="contained" color="primary">すごいぼたん</Button>
        <Createicon/>
      </div>
    )
  }
}


export default About;