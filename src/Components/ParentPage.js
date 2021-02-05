import React from 'react'
import Button from '@material-ui/core/Button';
import Createicon from '@material-ui/icons/Create';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ParentLogin from './ParentLogin';
import {PieChart, Pie, Cell} from 'recharts';

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


function DrawGraph(data, colors)
{
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


class About extends React.Component {
  constructor(props) {
        super(props);
        this.state = {names2:null}
        }
  render(){
    const Concentration_Time = [
      {
        "name": "True",
        "value": 400
      },
      {
        "name": "False",
        "value": 300
      },
    ]
    const Gaze_Time = [
      {
        "name": "True",
        "value": 200
      },
      {
        "name": "False",
        "value": 500
      },
    ]
    const Active_Time = [
      {
        "name": "True",
        "value": 500
      },
      {
        "name": "False",
        "value": 200
      },
    ]

    const colors = ["#00FF00", "#0000FF"]

    return(
      <body>
      <div style={styles.div}>
      <Link to="/ParentLogin"><Typography variant="h6" style={{margin:'auto',width:'250%',fontSize: "18px"}}>
        ログインページにもどる
      </Typography></Link>
        <br/>
        <Select
          labelId="demo-simple-select-filled"
          id="demo-simple-select-filled"
          value={""}
          label="Age"
          variant="filled"
          style={styles.formControl}
          //onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <p class="alert alert-danger" style={styles.status}>
          <h2 style={styles.statusText}><Createicon/>授業中</h2>
        </p>
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
            <p style={styles.classNow}>
              <Typography style={styles.classText} variant="h4" component="h2">
              数学
              </Typography>
              <Typography style={styles.classTime}>10:20~<br/>11:50</Typography>
            </p>
          </CardContent>
        </Card>
        <Card variant="elevation" color="#000000" style={styles.mainCard}>
          <CardContent >
            <Typography color="textSecondary" gutterBottom>
              これまで受けた授業
            </Typography>
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
}


export default About;
