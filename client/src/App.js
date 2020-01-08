import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { SigninPage } from './components/SigninPage';

class App extends React.Component {
    render() {
        return (
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
        );
    }
}

export { App };