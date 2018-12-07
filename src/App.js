import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './ui/store';
import Table from './ui/components/containers/Table';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Table />
        </div>
      </Provider>
    );
  }
}

export default App;
