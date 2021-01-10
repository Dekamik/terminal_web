import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Home } from './components/Home';

export default class App extends React.Component {
  render() {
    return (
      <div className="app bg-dark">
        <Home />
      </div>
    );
  }
}
