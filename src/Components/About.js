import React, {useEffect, useState} from 'react'
import { firestore } from '../lib/firebase.js';

const About = () => {
    // this.state.users これと同じ
    const [users, setUsers] = useState([])
    const title    = 'Aboutページが開かれました';
    const options  = {
      body : 'Aboutページ',
      icon : 'アイコン画像のパス',
      data : {foo : '任意のデータ'}
      };

    const notification = new Notification(title, options);
    notification.addEventListener('click', (event) => {
    console.dir(event);
      }, false);
    const addUser = (index) => {
        firestore.collection('users').add({
           age: `${index}`,
           name: 'hoge'
       });
     }
     //ライフサイクルが遷移するたびに呼ばれる
      useEffect(() => {
        firestore.collection('users').onSnapshot((collection) => {
            const data = collection.docs.map(item => item.data());
            setUsers(data);
        })
      }, [])

      useEffect(() => {
        console.log(users)
      }, [users])

    return (
        <div>
          <p></p>
          <h1>About</h1>
          <h2>I am </h2>
          <div style={{marginTop:"10rem"}} />
          <button onClick={()=>{addUser(4)}}>addUser_1</button>
          <button onClick={()=>{addUser(5)}}>addUser_2</button>
          <button onClick={()=>{addUser(6)}}>addUser_3</button>
          <button variant="contained" color="primary">すごいぼたん</button>
          {users.map((x, i) => <div key={i}>{`${i}_${x.name}_${x.age}`}</div>)}
        </div>
      )
}

export default About;
