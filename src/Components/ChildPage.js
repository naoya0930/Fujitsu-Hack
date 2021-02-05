import React from 'react'
import {useState, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
//import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import Table from '@material-ui/core/Table';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';

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

//MenuAppBarの関数
function MenuAppBar() {
  const classes = styled();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Login' : 'Logout'}/>
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{margin:'auto',width:'100%',fontSize: "24px"}}>
            名前：原祥太
          </Typography>
          <Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "24px"}}>
            ユーザーID:0000067
          </Typography>
          {auth && (
            <div>
              <IconButton aria-label="account of current user" aria-controls="menu-appbar"aria-haspopup="true"onClick={handleMenu}color="inherit">
                <AccountCircle/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>)}
        </Toolbar>
      </AppBar>
    </div>
  );
}

//Table表示の関数
function Tab() {
  const columns: ColDef[] = [
  {field: 'id', headerName: '授業ID', width: 150 },
  {field: 'classname', headerName: '授業名', width: 150 },
  {field: 'subject', headerName: '教科', width: 130 },
  {field: 'url',headerName: '授業URL',width: 500,},
  {field: 'status',headerName: '履修状況',width: 150,},
      ];
  const rows = [
    { id: 1, classname: '数1A', subject: '数学', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 2, classname: '基礎英語', subject: '英語', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',status: '授業中'  },
    { id: 3, classname: '漢文', subject: '国語', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 4, classname: '道徳', subject: '道徳', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',status: '授業中'  },
    { id: 5, classname: '生物基礎', subject: '理科', url: null ,status: '授業中' },
    { id: 6, classname: '地理', subject: '社会', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 7, classname: '数1A', subject: '数学', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 8, classname: '基礎英語', subject: '英語', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',status: '授業中'  },
    { id: 9, classname: '漢文', subject: '国語', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 10, classname: '道徳', subject: '道徳', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',status: '授業中'  },
    { id: 11, classname: '生物基礎', subject: '理科', url: null ,status: '授業中' },
    { id: 12, classname: '地理', subject: '社会', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 13, classname: '数1A', subject: '数学', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 14, classname: '基礎英語', subject: '英語', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',status: '授業中'  },
    { id: 15, classname: '漢文', subject: '国語', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 16, classname: '道徳', subject: '道徳', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',status: '授業中'  },
    { id: 17, classname: '生物基礎', subject: '理科', url: null ,status: '授業中' },
    { id: 18, classname: '地理', subject: '社会', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 19, classname: 'Clifford', subject: 'Ferrara', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 20, classname: 'Frances', subject: 'Rossini', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5' ,status: '授業中' },
    { id: 21, classname: 'Roxie', subject: 'Harvey', url: 'https://qiita.com/niwango/items/456e2854288dd16fbab5',　status: '授業中'  },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={10}/>
    </div>
  );
}
class About extends React.Component {
  render(){
    return(
      <div>
      <MenuAppBar/>
        <CssBaseline/><Container><Button variant="contained" style={{margin:'auto',width:'100%',fontSize: "40px"}}>
         <h1>授業履修状況</h1></Button></Container>
          <CssBaseline/><Container><Tab/></Container>
      </div>
      )
  }
}

export default About;
