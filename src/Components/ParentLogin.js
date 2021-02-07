import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import ParentPage from './ParentPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';

import { firestore } from '../lib/firebase.js';

const ParentLogin = (props) => {

    const [name2, setname2] = useState('');
    const [password2,setpassword2]=useState('');
    const [roginMsg ,setRoginMsg]=useState('ログインしてください');
    const handleChangeName=(e)=>{
        setname2(e.target.value);
    }
    const handleChange=(e)=> {
        setpassword2(e.target.value);
    }
    const loginCheck=()=>{
        console.log("parent1  pass");
        //console.log(name2);
        //console.log(password2);
        //TODO: まじでセキュリティ的にやばいのでAPI建てるなりで修正する
        firestore.collection('HackApp').doc('Users').collection('parents').get().then((d)=>{
            let dx=d.docs.map(item=>item.data());
            //console.log(dx);
            dx.map(element => {
                console.log(element.parent_id);
                console.log(element.parent_pass);
                //console.log(element.user_id);
                if(element.parent_id===name2&&element.parent_pass===password2) {
                    props.history.push({
                        pathname: '/ParentPage',
                        state: {user_id:element.user_id}
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
            <Container maxwidth="xl"><h1>親ログインページ</h1></Container>
            <form>

                <div>
                    <h3>名前</h3>
                    <label for="name"></label>
                    <input type="name" name="names2" required="required" placeholder="名前" onChange={e=>handleChangeName(e)} value={name2}></input>
                </div>
                <div>
                    <h3>パスワード</h3>
                    <label for="password"></label>
                    <input type="password" name="password2" required="required" placeholder="パスワード" onChange={e=>handleChange(e)} value={password2}></input>
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


export default ParentLogin;
