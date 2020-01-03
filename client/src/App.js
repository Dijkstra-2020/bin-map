import React, {Component} from 'react';
import './App.css';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import SelectSearch from 'react-select-search'

const url = "http://" + window.location.hostname;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        apiResponse: "",
        dbResponse: "",
        options: [],
        pos: {lat: 48.812130, lng: 2.356810},
        poubelles: [],
        value: undefined };
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

  async getPosition(id) {
      const response = await fetch(url+ ":9000/bin/position", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(id),
      });
      return await response.json();
  }

  handleChange = event => {
      const value = {'_id' : event.value};
      const position = this.getPosition(value);
      position.then(pos => {
          this.setState({pos: pos});
          console.log(this.state.pos);
      }).catch(error => {
          console.log(error);
      });
      this.setState({value: event.value});
  };

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
          <SelectSearch options={this.state.options} value={this.state.value} name="bin" placeholder="Selectionner une poubelle" onChange={this.handleChange}/>
          <div className="Map">
	    <Map
            google={this.props.google}
            zoom={12}
            initialCenter={this.state.pos}
            center={this.state.pos}
        >
        </Map>
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
