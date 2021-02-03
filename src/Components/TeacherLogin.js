import React from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import TeacherPage from './TeacherPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';

class About extends React.Component {
  constructor(props) {
        super(props);
        this.state = {names3:null, password3:'',Login3:null}
        this.handleChange = this.handleChange.bind(this)
        this.handleClick_his = this.handleClick_his.bind(this)
        this.handleClick_error = this.handleClick_error.bind(this)
        }
  handleChange (e) {
        let name = e.target.name; // フォームのname属性を取得
        this.setState({[name]: e.target.value}) // name属性 = stateのkey名なのでstateに保存
        }
  handleClick_error(e){
        this.setState({Login3:'ログイン失敗'})
        // name属性 = stateのkey名なのでstateに保存
        }
  handleClick_his(e){
        this.props.history.push({
        pathname: '/TeacherPage',
        state: {names3: this.state.names2}
        })
        }
  render(){
    return(
      <div class="form-wrapper">
      <Container maxwidth="xl"><h1>先生ログインページ</h1></Container>
  <form>

    <div class="form-item">
    <h3>名前</h3>
      <label for="name"></label>
      <input type="name" name="names3" required="required" placeholder="名前"　value={this.state.names3}
        onChange={this.handleChange}></input>
    </div>
    <div class="form-item">
    <h3>パスワード</h3>
      <label for="password"></label>
      <input type="password" name="password3" required="required" placeholder="パスワード"　value={this.state.password3}
        onChange={this.handleChange}></input>
    </div>
      {this.state.names3===this.state.password3 ?
        <Button variant="contained" color="primary" onClick={this.handleClick_his}>
      サインイン</Button>
      :<Button variant="contained" color="primary"onClick={this.handleClick_error}>サインイン</Button>}
      <div class="form-item">
      <h3>{this.state.Login3}</h3>
      </div>
  </form>
  </div>
    )
  }
}


export default About;
