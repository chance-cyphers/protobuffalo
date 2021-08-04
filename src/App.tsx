import React from 'react';
import './App.css';
import ProtoView from "./components/protoview/protoview";
import {loadProtoClicked} from "./actions/actions";
import {unstable_createMuiStrictModeTheme as createTheme, Divider, Grid, makeStyles, ThemeProvider} from "@material-ui/core";
import {connect} from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      light: '#6ab7ff',
      main: '#1e88e5',
      dark: '#005cb2'
    },
    secondary: {
      main: '#8d6e63',
      light: '#be9c91',
      dark: '#5f4339'
    },
    background: {
      default: '#005cb2'
    },
    type: "light"
  },
});


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    color: '#eee'
  },
  title: {
    padding: theme.spacing(2),
  },
  protoList: {
    backgroundColor: theme.palette.primary.dark
  },
  protoListItem: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderWidth: "10px",
    borderColor: "red"
  }
}));


function App(props: any) {

  const classes = useStyles();

  function handleClick() {
    props.loadProtoClicked();
  }

  return (
      <ThemeProvider theme={theme}>
        <Grid container className={classes.root}>

          <Grid item xs={3}>
            <div className={classes.protoList}>
              <div className={classes.protoListItem}>Protos</div>
              <Divider/>
              <Divider/>
              <Divider/>
              <div className={classes.protoListItem} onClick={handleClick}>new</div>
              <Divider/>
              <div className={classes.protoListItem}>My Proto</div>
              <Divider/>
              <div className={classes.protoListItem}>Some Other Proto</div>
            </div>
          </Grid>

          <Grid item xs={9}>
            {/*<Button variant="contained" onClick={handleClick}>Load Proto</Button>*/}
            <ProtoView/>
          </Grid>

        </Grid>
      </ThemeProvider>
  );
}

export default connect(null, {loadProtoClicked})(App);
