import React, { Component } from "react";
import "video-react/dist/video-react.css"; // import css
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

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
  }
  componentWillMount() {
    window.addEventListener("focus", this.onFocus)
  }
  onFocus = () => {
    console.log("アクティぶ")
    this.endTime = Date.now();
    this.elapsedTime += (this.endTime-this.startTime)
    this.setState({
      nowTime:this.getTime(0)+"  状態：アクティブです"
      });
  }

  onblur = () => {
    console.log("非アクティぶ")
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
    const push_tag = (event) => {
      const title    = 'お子さんが授業を終了しました';
      const options  = {
        body : 'お子さんが{授業名}の終了を始めました',
        icon : 'アイコン画像のパス',
        data : {foo : '任意のデータ'}
        };
      const notification = new Notification(title, options);
      notification.addEventListener('click', (event) => {
      console.dir(event);}, false);
      };

    return (
      <div>
      <Link to="/ChildPage" onClick={push_tag}><Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "18px"}}>
        戻る
      </Typography></Link>
      <Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "18px"}}>
        日時:{this.state.nowTime}　非アクティブだった合計時間(秒){this.elapsedTime/1000}
      </Typography>
      <CssBaseline/><Container>
        <iframe width="800" height="600" src={this.full_url} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe></Container>
        <Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "18px"}}>
          日時:{this.state.nowTime}　非アクティブだった合計時間(秒){this.elapsedTime/1000}
        </Typography>
        </div>
    );
  }
}

export default withRouter(AppMovie);
