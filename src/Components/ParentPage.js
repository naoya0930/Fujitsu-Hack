import React, { getInitialState, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import Createicon from '@material-ui/icons/Create';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ParentLogin from './ParentLogin';
import {PieChart, Pie, Cell} from 'recharts';

import { firestore } from '../lib/firebase.js';
import { assign } from 'lodash';

import { firestorage } from '../lib/firebase.js';

var styles = ({
  div:{
    margin: 10,
    //marginLeft: 10,
    //marginRight: 10,
  },
  formControl: {
    //margin: 10,
    width: '100%',
    //minWidth: 120,
  },
  selectEmpty: {
    //marginTop: theme.spacing(2),
  },
  status:{
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 2,
    width: '100%',
  },
  statusText:{
    fontWeight: 600,
    textAlign:'center',
  },
  mainCard:{
    marginTop: 5,
    marginBottom: 5,
  },
  classNow:{
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "#00A0A0",
    display: 'flex',
    alignItems: "center",
  },
  classText:{
    fontWeight: 600,
    marginLeft: 10,
    textAlign:'left',
    marginRight: 30,
  },
  classTime:{
    fontWeight: 600,
    textAlign:'left',
    minWidth: 50,
  },
  classPast:{
    borderWidth: 3,
    marginLeft: 2,
    marginRight: 2,
    borderColor: "#00A0A0",
    display: 'flex',
    alignItems: "center",
    minWidth: 150,
  },
  statisticsCard:{
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "#00A0A0",
    display: 'flex',
    alignItems: "center",
  },
});

const ParentPage =(props)=> {
    //TODO: undefined のときの処理
    const [childid,setChildid]=useState('user1');
        /*=useState(typeof props.location.state.user_id);*/
    const [userId, setUserId]=useState('');
    const [userName, setUserName]=useState('');
    const [userLectures, setUserLectures]=useState([]);
    const [userEndLecture, setUserEndLecture]=useState([]);
    const [userNowLecture, setUserNowLecture]=useState([]);
    const [userFutureLecture, setUserFutureLecture]=useState([]);

    const colors = ["#00FF00", "#0000FF"];

    const Concentration_Time = [{value:400}, {value:300}]
    const Gaze_Time = [{value:200}, {value:500}]
    const Active_Time = [{value:500}, {value:200}]

    useEffect(() => {
        firestore.collection('HackApp').doc('Users').collection('Users').where('user_id','==',childid).get().then((d)=>{
            //何故かasyncが必須。
            let dx=d.docs.map(item=>item.data());
            dx.map(element=>{
                //console.log(childid);
                //console.log(element.user_id);
                setUserId(element.user_id);
                setUserName(element.user_name);
                //const data = element.lectures.map((item)=>{item.data()});
                //setUserLectures(data);
            });
            d.docs.forEach(item=>item.ref.collection('lectures').onSnapshot((coll)=>{
                let data=coll.docs.map(item=>item.data());
                //console.log(data);
                //終わった授業などを仕分け
                let x=[];
                let y=[];
                let z=[];
                data.forEach((item)=>{
                    if(item.lecture_status==='0'){
                        //今受けている
                        x.push(item);
                        //setUserEndLecture(x);
                    }else if(item.lecture_status==='1'){
                        //未来の授業
                        y.push(item);
                        //setUserNowLecture(userNowLecture.push(item.data()));
                    }else{
                        //過去の授業
                        z.push(item);
                        //setUserFutureLecture(userFutureLecture.push(item.data()));
                    }
                })
                setUserEndLecture(z);
                setUserNowLecture(x);
                setUserFutureLecture(y);
                setUserLectures(data);　//全部のデータ入ってる
            }));
        });
    }, []);

    function DrawGraph(data, colors){
      let sum = 0;
      data.map((entry, index) => {
        sum += entry.value;
      })

      return (
        <PieChart width={250} height={250}>
          {/*}<text x={"50%"} y={"50%"} textAnchor="middle">{"50%"}</text>{/**/}
          <text  x={"50%"} y={"52%"} fontSize={20} fontwewight={600} textAnchor="middle">
          {Math.round(100*data[0].value/sum)} %
          </text>
          <Pie data={data}
          cx="50%" cy="50%"
          innerRadius={45}
          outerRadius={80}
          activeIndex={0}
          startAngle={90}
          endAngle={90-360}
          >
            {
              data.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index]} label={{position: 'inside'}} />
              ))
            }
          </Pie>
        </PieChart>
      );
    };

    function chialdname_change(event){
      var new_child = event.target.value;
    };

    function requestChildImage(){
      var storageRef = firestorage.ref();
      var img = document.getElementById('childimage');
      img.hidden = !img.hidden;
      storageRef.child('mountains.jpg').getDownloadURL().then(function(url){
        img.src = url;
      }).catch( function (error) {
        console.log("Firestorage Image GET and Show : " + error.message)
        //強制非表示
        img.hidden = false;
        img.src = "";
      });
    };

    return(
      <body>
          <h1>{userName}さんのページです</h1>
      <div style={styles.div}>
      <Link to="/ParentLogin"><Typography variant="h6" style={{margin:'auto',width:'250%',fontSize: "18px"}}>
        ログインページにもどる
      </Typography></Link>
        <br/>
        <FormControl variant="filled" style={styles.formControl}>
          <InputLabel id="child-select-label">名前</InputLabel>
            <Select
              labelId="child-select-label"
              id="child-select"
              value={""}
              variant="filled"
              style={styles.formControl}
              onChange={chialdname_change}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
        <Button class="alert alert-danger" style={styles.status} onClick={requestChildImage}>
          <h2 style={styles.statusText}><Createicon/>授業中</h2>
        </Button>
        <Card variant="elevation" style={styles.mainCard}>
          <CardMedia component="img" id="childimage" hidden></CardMedia>
        </Card>
        {/*
        <Box class="border rounded" style={styles.classNow}>
          <h2 style={styles.classText}>数学</h2>
          <p style={styles.classTime}>10:20~<br/>11:50</p>
        </Box>
        */}

        <Card variant="elevation" color="#000000" style={styles.mainCard}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>
              授業中の科目
            </Typography>
            {userNowLecture.map((x)=>
            <p style={styles.classNow}>
              <Typography style={styles.classText} variant="h4" component="h2">
                  {x.lecture_name}
              </Typography>
              <Typography style={styles.classTime}>aaa~aaa<br/></Typography>
            </p>
            )}
          </CardContent>
        </Card>
        <Card variant="elevation" color="#000000" style={styles.mainCard}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>
              これまで受けた授業
            </Typography>
            {//userEndLecture.map((x)=>{
            <p style={styles.classNow}>
              <Card variant="elevation" color="#000000" style={styles.classPast}>
                <CardContent >
                  <Typography style={styles.classText} variant="h4" component="h2">
                  英語
                  </Typography>
                  <Typography style={styles.classTime}>10:20~11:50</Typography>
                  <p>
                    <Typography display="inline">集中度：</Typography>
                    <Typography style={styles.classTime} display="inline">75%</Typography>
                  </p>
                </CardContent>
              </Card>
              <Card variant="elevation" color="#000000" style={styles.classPast}>
                <CardContent >
                  <Typography style={styles.classText} variant="h4" component="h2">
                  国語
                  </Typography>
                  <Typography style={styles.classTime}>10:20~11:50</Typography>
                  <p>
                    <Typography display="inline">集中度：</Typography>
                    <Typography style={styles.classTime} display="inline">75%</Typography>
                  </p>
                </CardContent>
              </Card>
            </p>
            //})
        }
          </CardContent>
        </Card>

        <Card variant="elevation" color="#000000" >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              統計
            </Typography>
          </CardContent>
          <CardContent style={styles.statisticsCard}>
            <Card variant="elevation" color="#000000" style={styles.classPast}>
              <CardContent >
                <Typography style={styles.classText} textAlign='center' variant="h5" component="h2">
                  集中度
                </Typography>
                {DrawGraph(Concentration_Time, colors)}
              </CardContent>
            </Card>
            <Card variant="elevation" color="#000000" style={styles.classPast}>
              <CardContent >
                <Typography style={styles.classText} textAlign='center' variant="h5" component="h2">
                注視度
                </Typography>
                {DrawGraph(Gaze_Time, colors)}
              </CardContent>
            </Card>
            <Card variant="elevation" color="#000000" style={styles.classPast}>
              <CardContent >
                <Typography style={styles.classText} textAlign='center' variant="h5" component="h2">
                アクティブ度
                </Typography>
                {DrawGraph(Active_Time, colors)}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      </body>
    )
}

export default ParentPage;
