import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import ParentPage from './ParentPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import { firestore } from '../lib/firebase.js';

const TeacherLogin=(props)=> {
    const [name3, setname3] = useState('');
    const [password3,setpassword3]=useState('');
    const [roginMsg ,setRoginMsg]=useState('ログインしてください');
    const handleChangeName=(e)=>{
        setname3(e.target.value);
    }
    const handleChange=(e)=> {
        setpassword3(e.target.value);
    }
    const loginCheck=()=>{
        console.log("parent1  pass");
        //console.log(name3);
        //console.log(password3);
        //TODO: まじでセキュリティ的にやばいのでAPI建てるなりで修正する
        firestore.collection('HackApp').doc('Users').collection('teachers').get().then((d)=>{
            let dx=d.docs.map(item=>item.data());
            //console.log(dx);
            dx.forEach(element => {
                //console.log(element.parent_id);
                //console.log(element.parent_pass);
                if(element.teacher_id===name3&&element.teacher_pass===password3) {
                    //console.log("OK");
                    props.history.push({
                        pathname: '/TeacherPage',
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
            <Container maxwidth="xl"><h1>先生ログインページ</h1></Container>
            <form>
                <div>
                    <h3>名前</h3>
                    <label for="name"></label>
                    <input type="name" name="names2" required="required" placeholder="名前" onChange={e=>handleChangeName(e)} value={name3}></input>
                </div>
                <div>
                    <h3>パスワード</h3>
                    <label for="password"></label>
                    <input type="password" name="password2" required="required" placeholder="パスワード" onChange={e=>handleChange(e)} value={password3}></input>
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
    )
}

export default TeacherLogin;
