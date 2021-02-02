import React from 'react'
import Button from '@material-ui/core/Button'
import Createicon from '@material-ui/icons/Create'


class About extends React.Component {
  render(props){
    return(
      <div>
        <p></p>
        <h1>About</h1>
        <h2>I am </h2>
        <Button variant="contained" color="primary">すごいぼたん</Button>
        <Createicon/>
      </div>
    )
  }
}


export default About;