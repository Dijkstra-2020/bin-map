import React, { Component } from 'react';
import './App.css';
import SelectSearch from 'react-select-search'
import SimpleBottomNavigation from './components/menu/menu'
import BinMap from './components/map/map'
import Settings from './components/parametres/parametres'
import Employees from './components/employees/employees'


const url = "http://" + window.location.hostname;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            dbResponse: "",
            options: [],
            pos: { lat: 48.812130, lng: 2.356810 },
            value: undefined
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
                <SelectSearch options={this.state.options} value={this.state.value} name="bin" placeholder="Selectionner une poubelle" onChange={this.handleChange} />
                
                <p className="App-intro">{this.state.apiResponse}</p>
                <p className="App-intro">{this.state.dbResponse}</p>

                <BinMap></BinMap>

                <Settings></Settings>

                <SimpleBottomNavigation>
                </SimpleBottomNavigation>

            </div>
        );
    }
}


export default App;
