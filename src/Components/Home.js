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

const Home=(props)=>{
    const [styles,setStyles]=useState(true);
    const loginCheck=()=>{
        setStyles(false);
        props.history.push({
            pathname: '/TeacherLogin',
            state: {}
            })
        //console.log(styles);
    }
    const loginStudent=()=>{
        setStyles(false);
        props.history.push({
            pathname: '/ChildLogin',
            state: {}
        })
        //console.log(styles);
    }
    const loginParent=()=>{

        setStyles(false);
        props.history.push({
            pathname: '/ParentLogin',
            state: {}
        })
    }
    useEffect(() => {
        if(styles===false){
            styles=true;
        }
    }, [])

    return (
        <div>
        <div class="form-wrapper" style={{ display: styles ? '' : 'none' }}>
            <Container maxwidth="xl"><h1>Study Drug</h1></Container>
                <Grid　container alignItems="center" justify="center">
                    <Grid item xs={2}><FaceIcon/></Grid>
                    <Grid item xs={8}>
                        <Button variant="contained" color="primary" onClick={loginStudent}>がくせいのかたはこちら</Button>
                    </Grid>
                </Grid>
                <Grid　container alignItems="center" justify="center">
                    <Grid item xs={2}><AccessibilityIcon/></Grid>
                    <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={loginParent}>親御様はこちら</Button>
                    </Grid>
                </Grid>
                <Grid　container alignItems="center" justify="center">
                    <Grid item xs={2}><SchoolIcon/></Grid>
                    <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={loginCheck}>
                        教員用サービスはこちら
                    </Button>
                    
                </Grid>
                <h1>___</h1>
            </Grid>
        </div>
        </div>
    )
}
export default Home;
