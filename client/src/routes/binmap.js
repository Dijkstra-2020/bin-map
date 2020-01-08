import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import SelectSearch from 'react-select-search'


const url = "http://" + window.location.hostname;


class BinMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
        apiResponse: "",
        dbResponse: "",
        options: [],
        pos: { lat: 48.812130, lng: 2.356810 },
        current: { lat: 0, lng: 0},
        value: undefined,
        bin: [],
        activeMarker: null,
        selectedPlace: {},
        showingInfoWindow: false
    };
  }

  async getPosition(id) {
    const response = await fetch(url + ":9000/bin/position", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(id),
    });
    return await response.json();
  }


  handleChange = event => {
    const value = { '_id': event.value };
    const position = this.getPosition(value);
    position.then(pos => {
      this.setState({ pos: pos });
      console.log(this.state.pos);
    }).catch(error => {
      console.log(error);
    });
    this.setState({ value: event.value });
  };


  componentDidMount() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              this.setState({current: pos});
              this.setState({pos: pos});
          });
      }
    fetch(url + ":9000/bin")
      .then(results => { return results.json() })
      .then(datas => {
        this.setState({bin : datas});
        datas = datas.map((bin) => {
          return { name: bin['name'], value: bin['_id'] }
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

  currentMarker() {
      if (navigator.geolocation)
        return (
            <Marker
                name={"Ta position"}
                position={this.state.current}
                onClick={this.onMarkerClick}
            />
            )
  }

  getMarkerInfo() {
      if (this.state.activeMarker != null) {
          return (
          <React.Fragment>
          <h3>{this.state.selectedPlace.name}</h3><p>Position lat:{this.state.selectedPlace.position.lat} lng:{this.state.selectedPlace.position.lng}</p>
          </React.Fragment>
          );
      }
  }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
        console.log(props);
    }

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false,
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };


    addInfo() {
        if (this.state.bin.length > 0)
          return (
              this.state.bin.map(item =>
                <Marker
                    key={item.name}
                    onClick={this.onMarkerClick}
                    name={item.name}
                    position={{lat: item.lat, lng: item.lng}}
                    icon={{
                        url: require(item.lock === false ? ('../trash.png') : ('../trash-lock.png')),
                        scaledSize: new this.props.google.maps.Size(16,16)
                }}
                />
            )
          );
    }



render() {
  return (
    <div className="Binmap">
      <h1>BinMap</h1>
      <SelectSearch options={this.state.options} value={this.state.value} name="bin" placeholder="Selectionner une poubelle" onChange={this.handleChange} />


      <div className="Map">
        <Map
          google={this.props.google}
          zoom={12}
          onClick={this.onMapClicked}
          initialCenter={this.state.pos}
          center={this.state.pos}
        >
          {this.addInfo()}
            {this.currentMarker()}
            <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}>
                <div>
                    {this.getMarkerInfo()}
                </div>
            </InfoWindow>
        </Map>
      </div>

    </div>
  );
}
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyC3iJhPLVygKr7HUMH58b4uOvfC8m5s1H0")
})(BinMap)
