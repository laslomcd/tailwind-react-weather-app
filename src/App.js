import React from 'react';
import './App.css';

import axios from "axios";
import apiKey from "./api";

import CurrentWeather from './components/CurrentWeather';
import FutureWeather from './components/FutureWeather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemperature: {
        actual: "",
        feels: "",
        summary: "",
        icon: ""
      },
      location: {
        name: "Toledo",
        region: "Ohio",
        lat: "41.7",
        lng: "-83.5"
      },
      daily: []
    }
  }

  componentDidMount() {
    this.fetchWeather();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.address.value);
    this.setState({
      ...this.state,
      location: {
        name: e.target.address.value,
      }
    })
    this.fetchWeather();
    // console.log(this.state);
  }

  fetchWeather = () => {
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q&q=${this.state.location.name}&days=10&aqi=no&alerts=no`

    axios.get(url)
      .then(response => {
        const newicon = `http://${response.data.current.condition.icon.slice(2)}`;
        // console.log(response.data.forecast);
        this.setState({
          currentTemperature: {
            actual: response.data.current.temp_f,
            feels: response.data.current.feelslike_f,
            summary: response.data.current.condition.text,
            icon: newicon
          },
          location: {
            name: response.data.location.name,
            region: response.data.location.region,
            lat: response.data.location.lat,
            lng: response.data.location.lon
          },
          daily: response.data.forecast.forecastday
        })
      })
    // console.log(this.state)
  }

  toDayOfWeek = (timestamp) => {
    const newDate = new Date(timestamp * 1000);
    const days = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[newDate.getDay()];
  }


  render() {
    return (
      <div className="bg-blue-200 flex justify-center pt-16 h-screen">
        <div className="text-white mb-8">
          <form onSubmit={this.handleSubmit}>
            <div className="places-input text-gray-800">
            <input type="search" id="address" className="w-full rounded p-2" placeholder="Enter a city" />
              {/* <p className="ml-3">Selected: <strong id="address-value">none</strong></p> */}
              <button type="submit" className="bg-black text-white rounded-full p-3 mt-1">Submit</button>
          </div>
          </form>
          
          <div className="weather-container font-sans w-128 max-w-lg overflow-hidden rounded-lg bg-gray-900 shadow-lg mt-4">
            <CurrentWeather
              actual={this.state.currentTemperature.actual}
              feels={this.state.currentTemperature.feels}
              summary={this.state.currentTemperature.summary}
              icon={this.state.currentTemperature.icon}
              name={this.state.location.name}
              region={this.state.location.region}
            />
            <FutureWeather
              daily={this.state.daily}
              toDayOfWeek={this.toDayOfWeek}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
