import React from 'react'
import {useState} from 'react'
import Button from '@material-ui/core/Button'
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
//import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import { DataGrid, ColDef} from '@material-ui/data-grid';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import ChildLogin from './ChildLogin';
import { withRouter } from 'react-router-dom'
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const About =() => {
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

  const createData = (lecture_id, lecture_name, lecture_subject, lecture_url, lecture_status) =>  {
  return { lecture_id, lecture_name, lecture_subject, lecture_url, lecture_status };
  }

  const rows = [
  createData(1,'数1A','数学','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(2,'基礎英語','英語','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(3,'漢文','国語', 'https://youtu.be/G9JlVSA7Vtc' ,'授業前'),
  createData(4,'道徳','道徳','https://youtu.be/G9JlVSA7Vtc','授業終了'),
  createData(5,'生物基礎', '理科','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(6,'地理', '社会','https://youtu.be/G9JlVSA7Vtc' ,'授業中'),
  createData(7,'数1A','数学','https://youtu.be/G9JlVSA7Vtc','授業終了'),
  createData(8,'基礎英語','英語','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(9,'漢文','国語', 'https://youtu.be/G9JlVSA7Vtc' ,'授業中'),
  createData(10,'道徳','道徳','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(11,'生物基礎', '理科','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(12,'地理', '社会','https://youtu.be/G9JlVSA7Vtc' ,'授業終了'),
  createData(13,'数1A','数学','https://youtu.be/G9JlVSA7Vtc5','授業中'),
  createData(14,'基礎英語','英語','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(15,'漢文','国語', 'https://youtu.be/G9JlVSA7Vtc' ,'授業中'),
  createData(16,'道徳','道徳','https://youtu.be/G9JlVSA7Vtc','授業前'),
  createData(17,'生物基礎', '理科','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(18,'地理', '社会','https://youtu.be/G9JlVSA7Vtc' ,'授業中'),
  createData(19,'数1A','数学','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(20,'基礎英語','英語','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(21,'漢文','国語', 'https://youtu.be/G9JlVSA7Vtc' ,'授業中'),
  createData(22,'道徳','道徳','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(23,'生物基礎', '理科','https://youtu.be/G9JlVSA7Vtc','授業中'),
  createData(24,'地理', '社会','https://youtu.be/G9JlVSA7Vtc' ,'授業中'),
];

  const headCells = [
  { id: 'lecture_id', numeric: false, disablePadding: true, label: '授業ID' },
  { id: 'lecture_name', numeric: true, disablePadding: false, label: '授業名' },
  { id: 'lecture_subject', numeric: true, disablePadding: false, label: '教科' },
  { id: 'lecture_url', numeric: false, disablePadding: false, label: '授業URL' },
  { id: 'lecture_status', numeric: true, disablePadding: false, label: '履修状況' },
];

  const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

  const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

  const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

  const EnhancedTableHead = (props) => {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

  EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

  const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

  const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          授業を受けよう
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

  EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

  const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

  const EnhancedTable = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const push_tag = (event) => {
    const title    = 'お子さんが授業を開始しました';
    const options  = {
      body : 'お子さんが{授業名}の受講を始めました',
      icon : 'アイコン画像のパス',
      data : {foo : '任意のデータ'}
      };
    const notification = new Notification(title, options);
    notification.addEventListener('click', (event) => {
    console.dir(event);}, false);
    };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.lecture_name}</TableCell>
                      <TableCell align="right">{row.lecture_subject}</TableCell>
                      <Link to={{
                      pathname: '/Movie',
                      state: {url:row.lecture_url},
                      }}>
                      <TableCell align="right" onClick={push_tag}>{row.lecture_url}</TableCell></Link>
                      <TableCell align="right">{row.lecture_status}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
//MenuAppBarの関数
  const MenuAppBar = () => {
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
            名前:
          </Typography>
          <Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "24px"}}>
            パスワード:
          </Typography>
          <Route path='/ChildLogin' component={ChildLogin}/>


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

    return(
      <div>
      <Link to="/ChildLogin"><Typography variant="h6" className={classes.title} style={{margin:'auto',width:'250%',fontSize: "18px"}}>
        ログインページにもどる
      </Typography></Link>
      <MenuAppBar/>
        <CssBaseline/><Container><Button variant="contained" style={{margin:'auto',width:'100%',fontSize: "40px"}}>

         <h0>授業履修状況</h0></Button></Container>
          <CssBaseline/><Container><EnhancedTable/></Container>
      </div>
      )
}

export default withRouter(About);
