import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import SelectSearch from 'react-select-search'

const url = "http://" + window.location.hostname;

class App extends Component {

  constructor() {
    super();
    this.state = { apiResponse: "", dbResponse: "", options: [] };
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

  componentDidMount() {
      fetch(url+ ":9000/bin")
          .then(results => {return results.json()})
          .then(datas => {
              datas = datas.map((bin) => {
                  return {name: bin['name'], value: bin['_id']}
              });
              return datas;
          }).then(options => {
              this.setState({
                  options: options
              });
          }).catch(error => {
              console.log(error);
          });
  }

    componentWillMount() {
    this.callAPI();
    this.callDB();
  }

  render() {
      return (
      <div className="App">
          <h1>BinMap</h1>
          <SelectSearch options={this.state.options} name="bin" placeholder="Selectionner une poubelle" />
          <div className="Map">
	    <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{
                lat: 35.5496939,
                lng: -120.7060049
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
