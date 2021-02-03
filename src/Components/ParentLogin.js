import React from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import ParentPage from './ParentPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';

class About extends React.Component {
  constructor(props) {
        super(props);
        this.state = {names2:null, password2:'',Login2:null}
        this.handleChange = this.handleChange.bind(this)
        this.handleClick_his = this.handleClick_his.bind(this)
        this.handleClick_error = this.handleClick_error.bind(this)
        }
  handleChange (e) {
        let name = e.target.name; // フォームのname属性を取得
        this.setState({[name]: e.target.value}) // name属性 = stateのkey名なのでstateに保存
        }
  handleClick_error(e){
        this.setState({Login2:'ログイン失敗'})
        // name属性 = stateのkey名なのでstateに保存
        }
  handleClick_his(e){
        this.props.history.push({
        pathname: '/ParentPage',
        state: {names2: this.state.names2}
        })
        }
  render(){
    return(
      <div class="form-wrapper">
      <Container maxwidth="xl"><h1>親ログインページ</h1></Container>
  <form>

    <div class="form-item">
    <h3>名前</h3>
      <label for="name"></label>
      <input type="name" name="names2" required="required" placeholder="名前"　value={this.state.names2}
        onChange={this.handleChange}></input>
    </div>
    <div class="form-item">
    <h3>パスワード</h3>
      <label for="password"></label>
      <input type="password" name="password2" required="required" placeholder="パスワード"　value={this.state.password2}
        onChange={this.handleChange}></input>
    </div>
      {this.state.names2===this.state.password2 ?
        <Button variant="contained" color="primary" onClick={this.handleClick_his}>
      サインイン</Button>
      :<Button variant="contained" color="primary"onClick={this.handleClick_error}>サインイン</Button>}
      <div class="form-item">
      <h3>{this.state.Login2}</h3>
      </div>
  </form>
  </div>
    )
  }
}


export default About;
