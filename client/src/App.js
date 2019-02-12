import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to='/'>Home</Link>
            <Link to='/otherpage'>Other Page</Link>
            <Route exact path="/" component={Fib} />
            <Route exact path="/otherpage" component={OtherPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
