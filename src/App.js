import React, { Component } from 'react';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {


  render() {
    return (
      <BrowserRouter basename='/'>
        <div className="App">
          <Layout>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
