import React from 'react'

import Button from '@material-ui/core/Button';

import './ChildLogin.css';

class About extends React.Component {
  render(){
    return(
      <div class="form-wrapper">
        <h1>ログインページ</h1>
  <form>
    
    <div class="form-item">
    <h3>名前</h3>
      <label for="name"></label>
      <input type="name" name="name" required="required" placeholder="名前"></input>
    </div>
    <div class="form-item">
    <h3>パスワード</h3>
      <label for="password"></label>
      <input type="password" name="password" required="required" placeholder="パスワード"></input>
    </div>
  
      <Button variant="contained" color="primary">サインイン</Button>
  </form>
</div>
    )
  }
}


export default About;