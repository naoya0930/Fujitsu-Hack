import React, { Component } from "react";
import "video-react/dist/video-react.css"; // import css
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

import { firestorage } from '../lib/firebase.js';

const classes = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
}));

function setupcamera(){
  var video = document.getElementById('webcam');
  var snapshotCanvas = document.getElementById('snapshot');
  var stream = navigator.mediaDevices
  .getUserMedia({
    audio: false,
    video: true ,
    facingMode: "user",
  }).then(function(stream) {
    video.srcObject = stream;
    video.play();
    setTimeout(function(){ snapshot(video, snapshotCanvas, stream);}, 1000);
    //setInterval(function(){snapshot(video, snapshotCanvas, stream);},1000000);
  }).catch(function (error) {
    console.error('mediaDevice.getUserMedia() error:', error);
    return;
  });
}
    
function snapshot(video, canvas, stream){
  var ctx = canvas.getContext('2d');
  canvas.width =video.videoWidth;
  canvas.height =video.videoHeight;
  var w = canvas.width;
  var h = canvas.height;
  ctx.drawImage(video, 0, 0, w, h);

  console.log(w,h);

  // Create a root reference
  var storageRef = firestorage.ref();
  // Create a reference to 'mountains.jpg'
  var mountainsRef = storageRef.child('mountains.jpg');

  canvas.toBlob(function(blob) {
    var img = document.createElement('image');
    img.srcObject = stream;
    
    mountainsRef.put(blob).then(function(img) {
      console.log('Uploaded a blob or file!');
    });
  }, 'image/jpeg', 0.95);
  
}

class AppMovie extends Component {
  constructor(props) {
    super(props);
    this.u = "https://www.youtube.com/embed/"
    this.full_url = this.u+this.props.location.state.url.slice(17)
    this.startTime = 0
    this.endTime = 0
    this.elapsedTime = null
    this.state = {
      nowTime: '状態：アクティブかどうか判定します'
    };

    this.video = document.getElementById('webcam');
    this.canvas = document.getElementById('snapshot');
  }

  getTime(timelag = 0) {
    let japanTime = new Date().getTime()
    let nowTime = new Date(japanTime + timelag*60*60*1000)
    let year = nowTime.getFullYear()
    let month = nowTime.getMonth() + 1
    let date = nowTime.getDate()
    let hours = nowTime.getHours()
    let minutes = nowTime.getMinutes()
    let seconds = nowTime.getSeconds()

    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    if (seconds < 10) seconds = `0${seconds}`

    const time = `${year}年 ${month}月 ${date}日 ${hours}:${minutes}:${seconds}`
    return time
  }

  componentDidMount(){
    window.addEventListener("blur", this.onblur)
    setupcamera();
  }
  componentWillMount() {
    window.addEventListener("focus", this.onFocus)
  }
  onFocus = () => {
    this.endTime = Date.now();
    this.elapsedTime += (this.endTime-this.startTime)
    this.setState({
      nowTime:this.getTime(0)+"  状態：アクティブです"
      });
  }

  onblur = () => {
    this.setState({
        nowTime: this.getTime(0)+"  状態：非アクティブです"
         // 開始時
      });
    this.startTime = Date.now();
  }

  render() {
    //const play = (event) =>{
      //this.setState({
        //  nowTime: this.getTime(0)
        //});
      //};
    // ウィンドウがアクティブでなくなった際に実行する関数
    //const pause = (event) => {
      //this.setState({
        //  nowTime: this.getTime(0)
        //});
      //};
    		// 実行させる処理を記述
    // ウィンドウをフォーカスしたら指定した関数を実行
    //window.addEventListener('focus', play);
    // ウィンドウからフォーカスが外れたら指定した関数を実行
    //window.addEventListener('blur', pause);

    return (
      <div>
      <Link to="/ChildPage"><Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "18px"}}>
        戻る
      </Typography></Link>
      <CssBaseline/><Container>
        <iframe width="800" height="600" src={this.full_url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe></Container>
        <Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "18px"}}>
          日時:{this.state.nowTime}　非アクティブだった合計時間(秒){this.elapsedTime/1000}
        </Typography>
        <video id="webcam" hidden></video>
        <canvas id="snapshot" hidden></canvas>
        </div>
    );
  }
}

export default withRouter(AppMovie);
