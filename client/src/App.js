import React, { Component } from 'react';
import './App.css';
import SimpleBottomNavigation from './components/menu/menu'
import BinMap from './components/map/map'
import Settings from './components/parametres/parametres'


const url = "http://" + window.location.hostname;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            dbResponse: ""
        };
    }
    callAPI() {
        fetch(url + ":9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }

    callDB() {
        fetch(url + ":9000/testDB")
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
                <h1>BinMap</h1>

                <BinMap></BinMap>

                <Settings></Settings>

                <SimpleBottomNavigation>
                </SimpleBottomNavigation>

                <p className="App-intro">{this.state.apiResponse}</p>
                <p className="App-intro">{this.state.dbResponse}</p>
            </div>
        );
    }
}


export default App;
