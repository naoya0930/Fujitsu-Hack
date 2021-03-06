import React, { getInitialState, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import Createicon from '@material-ui/icons/Create';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import GridList from '@material-ui/core/GridList';
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
  GridList: {
    display: 'flex',
    "flex-wrap": 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(1)',
    height: 'auto',
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
    marginBottom: 0,
  },
  classNow:{
    marginTop: 5,
    //marginBottom: 5,
    borderColor: "#00A0A0",
    display: 'flex',
    alignItems: "center",
    width: "auto",
  },
  classText:{
    fontWeight: 600,
    marginLeft: 10,
    textAlign:'left',
    "white-space": 'nowrap',
  },
  classTime:{
    fontWeight: 600,
    textAlign:'left',
    minWidth: 50,
  },
  classPast:{
    marginLeft: 2,
    marginRight: 2,
    borderColor: "#00A0A0",
    display: 'flex',
    alignItems: "center",
    minWidth: 220,
  },
  statisticsGrid:{
    alignItems: "center",
    height: "100%",
  },
  statisticsP:{
    marginTop: 5,
    marginBottom: 5,
    borderColor: "#00A0A0",
    alignItems: "center",
    display: "flex",
    "flex-wrap": "wrap",
  },
  statisticsCard:{
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "#00A0A0",
    alignItems: "center",
    display: 'flex',
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
    const [title,settitle]=useState([]);
    const [options,setoptions]=useState([]);
    const [lesson_status,setlesson_status]=useState([]);
    const colors = ["#00FF00", "#0000FF"];

    const [Concentration_Time,set_Concentration]=useState([{value:400}, {value:300}]);
    const [Gaze_Time,set_Gaze]=useState([{value:200}, {value:500}]);
    const [Active_Time,set_Active]=useState([{value:500}, {value:200}]);


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
                setlesson_status('休憩中')


                let concentrate_sum = 0;
                let active_sum = 0;
                let gaze_sum = 0;
                let item_lectured_count = 0;
                let gaze_lectured_count = 0;
                data.forEach((item)=>{
                    if(item.lecture_status==='0'){
                        //今受けている授業中=0
                        x.push(item);
                        setlesson_status('授業中')

                        //setUserEndLecture(x);
                    }else if(item.lecture_status==='1'){
                        //未来の授業1
                        y.push(item);
                        //setUserNowLecture(userNowLecture.push(item.data()));
                    }else{
                        //過去の授業2
                        z.push(item);
                        concentrate_sum += item.user_concentration;
                        active_sum += item.user_activation;
                        if(item.capture_count>0){
                          gaze_sum += item.look_count/item.capture_count;
                          gaze_lectured_count++;
                        }
                        item_lectured_count++;
                        //console.log(item.user_concentration, item.user_activation, active_sum)
                        //setUserFutureLecture(userFutureLecture.push(item.data()));
                    }
                })
                if(lesson_status=='授業中'){
                settitle('授業開始')
                console.log('授業開始')
                setoptions({body : 'お子さんの授業が開始しました',
                icon : 'アイコン画像のパス',
                data : {foo : '任意のデータ'}})
                new Notification(title, options);
                }
                else{
                settitle('授業終了')
                setoptions({body : 'お子さんの授業が終了しました',
                icon : 'アイコン画像のパス',
                data : {foo : '任意のデータ'}})
                console.log('授業終了')
                new Notification(title, options);
                }
                setUserEndLecture(z);
                setUserNowLecture(x);
                setUserFutureLecture(y);
                setUserLectures(data);
                
                if (gaze_lectured_count==0) gaze_lectured_count=1;
                set_Concentration([{value: concentrate_sum/item_lectured_count},{value: 100-(concentrate_sum/item_lectured_count)}])
                set_Active([{value: active_sum/item_lectured_count},{value: 100-(active_sum/item_lectured_count)}])
                set_Gaze([{value: gaze_sum/gaze_lectured_count},{value: 1-(gaze_sum/gaze_lectured_count)}])
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

    function put_Time(time){
      time = time.toDate();

      const formatter = new Intl.NumberFormat('ja', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });

      return ( <span>{time.getHours()}:{formatter.format(time.getMinutes())}</span> );
    }

    function requestChildImage(){
      var storageRef = firestorage.ref();
      var img = document.getElementById('childimage');
      img.hidden = !img.hidden;
      storageRef.child(userId+'.jpg').getDownloadURL().then(function(url){
        img.src = url;
      }).catch( function (error) {
        console.log("Firestorage Image GET and Show : " + error.message)
        //強制非表示
        img.hidden = false;
        img.src = "";
      });
    }

    function LectureCard(item, cardstyle, view_concentrate=true){

      var concentrate_rate = item.user_concentration
      var activation_rate = item.user_activation
      var look_count = item.look_count
      var capture_count = item.capture_count
      if(capture_count==0)capture_count=1
      var look_rate=look_count/capture_count;

      return (
        <Card variant="elevation" color="#000000" style={cardstyle}>
          <CardContent >
            <Typography style={styles.classText} variant="h4" component="h2">
            {item.lecture_name}
            </Typography>
            <Typography style={styles.classTime}>
              {put_Time(item.lecture_start_at)}~{put_Time(item.lecture_end_at)}</Typography>
                {function (){
                  if(view_concentrate){
                    return (
                    <p>
                      <Typography display="inline">集中度：</Typography>
                      <Typography style={styles.classTime} display="inline">{Math.floor(concentrate_rate)}%</Typography>
                    </p>
                    );
                  }else{
                    return (
                      <p></p>
                    );
                  }
                }()}
                {function (){
                    if(view_concentrate){
                      return (
                      <span>
                        <p>
                        <Typography display="inline">ページアクティブ率:</Typography>
                        <Typography style={styles.classTime} display="inline">{Math.floor(activation_rate)}%</Typography>
                        <br/>
                        <Typography display="inline">注視度:</Typography>
                        <Typography style={styles.classTime} display="inline">{Math.floor(look_rate*100)}%</Typography>
                        </p>
                      </span>
                      );
                    }else{
                      return (
                        <p></p>
                      );
                    }
                  }()}
          </CardContent>
        </Card>
      );
    }

    function DrawLectureStatus(status_text){
      if(status_text == "授業中"){
        return (
          <Button class="alert alert-danger" style={styles.status} onClick={requestChildImage}>
            <h2 style={styles.statusText}><Createicon/>{status_text}</h2>
          </Button>
        )
      }else{
        return (
          <Button class="alert alert-success" style={styles.status} onClick={requestChildImage}>
            <h2 style={styles.statusText}><FreeBreakfastIcon/>{status_text}</h2>
          </Button>
        )
      }
    }

    return(
      <body>
          {/*<h1>{userName}さんのページです</h1>*/}
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
              value={childid}
              variant="filled"
              style={styles.formControl}
              onChange={chialdname_change}
            >
              <MenuItem value={childid}>
                <em>{userName}</em>
              </MenuItem>
            </Select>
        </FormControl>
        {DrawLectureStatus(lesson_status)}
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
              {LectureCard(x, styles.classText, false)}
            </p>
            )}
            {function(){
              if(userNowLecture.length==0){
                return (
                <p style={styles.classNow}>
                <Typography gutterBottom>
                現在受けている授業はありません
                </Typography>
                </p>
                )
              }
            }()}
          </CardContent>
        </Card>
        <Card variant="elevation" style={styles.mainCard}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>
              これまで受けた授業
            </Typography>
            <GridList styles={styles.GridList} cols={2.5}>
              <p style={styles.classNow}>
                {userEndLecture.map((item)=>{
                  return LectureCard(item, styles.classPast);
                })
                }
              </p>
            </GridList>
          </CardContent>
        </Card>

        <Card variant="elevation" color="#000000" >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              統計
            </Typography>
          </CardContent>

          <CardContent style={styles.statisticsCard}>
            {/*<GridList styles={styles.statisticsGrid} cols={3}>*/}
            <p style={styles.statisticsP}>
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
            </p>
          </CardContent>
        </Card>
      </div>
      </body>
    )
}

export default ParentPage;
