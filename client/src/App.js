import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import SelectSearch from 'react-select-search'

const url = "http://" + window.location.hostname;
const options = [
    {name: 'Poubelle 1', value: '1'},
    {name: 'Poubelle 2', value: '2'},
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "", dbResponse: "" };
  }
  callAPI() {
    fetch(url+":9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  callDB() {
    fetch(url+":9000/testDB")
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
          <SelectSearch options={options} name="bin" placeholder="Selectionner une poubelle" />
          <div className="Map">
	    <Map
            google={this.props.google}
            zoom={12}
            initialCenter={{
                lat: 48.812130,
                lng: 2.356810
            }}
        />
          </div>
          <p className="App-intro">{this.state.apiResponse}</p>
          <p className="App-intro">{this.state.dbResponse}</p>
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ("AIzaSyC3iJhPLVygKr7HUMH58b4uOvfC8m5s1H0")
})(App)
