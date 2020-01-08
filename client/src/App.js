import React, { Component } from 'react';
import './App.css';
import BinMap from './routes/binmap'
import TabMenu from './components/menu/menu'


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
                <BinMap/>
                <TabMenu/>
            </div>
        );
    }
}


export default App
