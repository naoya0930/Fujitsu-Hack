import React from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import ChildPage from './ChildPage';
import Container from '@material-ui/core/Container';
import { firestore } from '../lib/firebase.js';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Link } from 'react-router-dom'
import {useEffect, useState} from 'react'

class About extends React.Component {
  constructor(props) {
        super(props);
        //this.state = {names:null, password:null,Login:null,users:[]}
        this.state = {users:[]}
        this.handleChange = this.handleChange.bind(this)
        this.handleClick_error = this.handleClick_error.bind(this)
        this.handleClick_his = this.handleClick_his.bind(this)

        }
  static async getInitialProps() {
    let result = await
    firestore.collection('users').get().then(snapshot => {
      let data = []
      snapshot.forEach((doc) => {
          data.push(Object.assign({id: doc.id}, doc.data()))
              })
              console.log(data);
              return data
            }).catch(error => {
              return []
            })
          return {datas: result}
        }

  handleChange (e) {
        let name = e.target.name; // フォームのname属性を取得
        this.setState({[name]: e.target.value}) // name属性 = stateのkey名なのでstateに保存
          // name属性 = stateのkey名なのでstateに保存
        }
  handleClick_error(e){
        this.setState({Login:'ログイン失敗'})
         // name属性 = stateのkey名なのでstateに保存
        }
  handleClick_his(e){
        this.props.history.push({
        pathname: '/ChildPage',
        state: {names: this.state.names}
        })
        }
  render(){
    return(
      <div class="form-wrapper">
        <Container maxwidth="xl"><h1>子供ログインページ</h1></Container>
        <form>

    <div class="form-item">
    <h3>名前</h3>
      <label for="name"></label>
      <input type="name" name="names" required="required" placeholder="名前" value={this.state.names}
        onChange={this.handleChange}></input>
    </div>
    <div class="form-item">
    <h3>パスワード</h3>
      <label for="password"></label>
      <input type="password" name="password" required="required" placeholder="パスワード" value={this.state.password}
        onChange={this.handleChange}></input>
    </div>
    {this.state.names===this.state.password ?
    <Button variant="contained" color="primary" onClick={this.handleClick_his}>
      サインイン</Button>
      :<Button variant="contained" color="primary" onClick={this.handleClick_error}>サインイン</Button>}
    <div class="form-item">
    <h3>{this.state.Login}</h3>
    <h3>{this.props.datas.map(users =>
            <li key={users.age}>
                <Link href="/p/[detailid]" as={`/p/${users.id}`}>
                  <a>{users.age}</a>
                </Link>
            </li>)}</h3>
    </div>
    </form>
    </div>
  );
  }
}

export default withRouter(About);
