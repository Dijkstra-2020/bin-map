import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const url = "http://" + window.location.hostname;

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
      const mapStyles = {
          width: '100%',
          height: '100%',
      };

      return (
      <div className="App">
          <h1>BinMap</h1>
          <div className="Map">
	    <Map
            google={this.props.google}
            zoom={10}
            initialCenter={{
                lat: 35.5496939,
                lng: -120.7060049
            }}
            style={mapStyles}
        />
          </div>
          <p className="App-intro">{this.state.apiResponse}</p>
          <p className="App-intro">{this.state.dbResponse}</p>
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: ("AIzaSyBn2fjl7XeGM2AwJUELskaplk_wL6hm1yY")
})(App)
