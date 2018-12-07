import React, { Component } from 'react';
import { Provider } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import store from './ui/store';
import Table from './ui/components/containers/Table';

import './App.css';

const styles = {
  typography: {
    margin: 'auto',
  },
}

class App extends Component {
  render() {
    const { classes: { typography } } = this.props;
    return (
      <Provider store={store}>
        <div className="App">
          <AppBar position= 'sticky'>
            <Toolbar>
            <Typography variant="h6" color="inherit" classes={{root: typography}}>
              Video Capabilities Detector
            </Typography>
            </Toolbar>
          </AppBar>
          <Table />
        </div>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
