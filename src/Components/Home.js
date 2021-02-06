import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import './ChildLogin.css';
import ParentPage from './ParentPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import FaceIcon from '@material-ui/icons/Face';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { firestore } from '../lib/firebase.js';
import SchoolIcon from '@material-ui/icons/School';
import Grid from '@material-ui/core/Grid';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

const ParentLogin = (props) => {
    /*
    const classes = makeStyles(() => (
        setdisplay: {
          display:'visible',
        },
        unsetdisplay: {
            display:'none',
        },
    )
    */
    const [styles,setStyles]=useState(true);
    const loginCheck=()=>{
        setStyles(false);
        console.log(styles);
    }
    return (
        <div class="form-wrapper" style={{ display: styles ? '' : 'none' }}>
            <Container maxwidth="xl"><h1>〇〇サービス</h1></Container>
                <Grid　container alignItems="center" justify="center">
                    <Grid item xs={2}><FaceIcon/></Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" color="primary" onClick={()=>loginCheck()}><Link to="/ChildLogin">がくせいのかたはこちら </Link></Button>
                    </Grid>
                </Grid>
                <Grid　container alignItems="center" justify="center">
                    <Grid item xs={2}><AccessibilityIcon/></Grid>
                    <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={()=>loginCheck()}><Link to="/ParentLogin">親御様はこちら</Link></Button>
                    </Grid>
                </Grid>
                <Grid　container alignItems="center" justify="center">
                    <Grid item xs={2}><SchoolIcon/></Grid>
                    <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={()=>loginCheck()}><Link to="/TeacherLogin">
                        教員用サービスはこちら
                    </Link></Button>
                </Grid>
            </Grid>
            <h1/>

        </div>
    )
}


export default ParentLogin;
