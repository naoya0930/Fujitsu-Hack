import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import ParentPage from './ParentPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import { firestore } from '../lib/firebase.js';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ChildLogin = (props) => {
    const [name1, setname1] = useState('');
    const [password1,setpassword1]=useState('');
    const [roginMsg ,setRoginMsg]=useState('ログインしてください');
    const handleChangeName=(e)=>{
        setname1(e.target.value);
    }
    const handleChange=(e)=> {
        setpassword1(e.target.value);
    }
    const loginCheck=()=>{
        console.log("child1  pass");
        //console.log(name2);
        //console.log(password2);
        //TODO: まじでセキュリティ的にやばいのでAPI建てるなりで修正する
        firestore.collection('HackApp').doc('Users').collection('Users').get().then((d)=>{
            let dx=d.docs.map(item=>item.data());
            //console.log(dx);
            dx.forEach(element => {
                //console.log(element.user_id);
                //console.log(element.user_pass);
                if(element.user_id===name1&&element.user_pass===password1) {
                    //console.log("OK");
                    props.history.push({
                        pathname: '/ChildPage',
                        state: {}
                        })
                }else{
                    //console.log("NG");
                    setRoginMsg("ログインに失敗しました！");
                }});
        });
    }


    //render(){
    return (
        <div class="form-wrapper">
        <Container maxwidth="xl"><h1>こどもログインページ</h1></Container>
        <form>

            <div>
                <h3>なまえ</h3>
                <label for="name"></label>
                <input type="name" name="names1" required="required" placeholder="名前" onChange={e=>handleChangeName(e)} value={name1}></input>
            </div>
            <div>
                <h3>パスワード</h3>
                <label for="password"></label>
                <input type="password" name="password1" required="required" placeholder="パスワード" onChange={e=>handleChange(e)} value={password1}></input>
            </div>
            <div>
                <Button variant="contained" color="primary"　onClick={loginCheck}>
                    サインイン
                </Button>
                <h3>{roginMsg}</h3>
            </div>
        </form>
        <br/>
    </div>
  );
}

//export default withRouter(About);
export default ChildLogin;
