import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createBrowserHistory } from 'history';   //Historique

import { Route, Router } from "react-router-dom";
import {Registry} from "./Utils";


// Importer les pages ici
import BinMap from './routes/binmap'
import Employees from './routes/employees'
import Squads from './routes/squads'
import User from './routes/user'



let history = createBrowserHistory();
Registry.register("history", history);



// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Router history={history}>
      <div>
          <Route path="/" exact component={App}/>
      </div>
  </Router>,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
