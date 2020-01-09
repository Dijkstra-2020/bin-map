import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SigninPage } from './components/SigninPage';
import './App.css';
import BinMap from './routes/binmap'
import TabMenu from './components/menu/menu'


const url = "http://" + window.location.hostname + ":9000";
//const url = "https://" + window.location.hostname + ":8443";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            dbResponse: ""
        };
    }
    callAPI() {
        fetch(url + "/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    callDB() {
        fetch(url + "/testDB")
            .then(res => res.text())
            .then(res => this.setState({ dbResponse: res }))
            .catch(err => err);
    }

      componentWillMount() {
        this.callAPI();
        this.callDB();
    }

    render() {
        return (
            <div className="App">
                <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signin" component={SigninPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


export default App
