import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NASA_API_KEY = 'FetyMt44QYT3HZZpeLNnY7cw6BtoHYw34PTLiL5d';
const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY;


class App extends Component {

  state = { nasaResponse: '', dispalyNasaImage: false };

  componentDidMount() {
    fetch(NASA_API_URL)
      .then(response => response.json())
      .then(json => this.setState({ nasaResponse: json }))
      .catch(error => alert(error.message));
    this.setState({
      dispalyNasaImage: true
    });
  }

  dispalyNasaImage = () => {

    console.log(this.state.nasaResponse);

    return (
      <div>
        <h3 style={{marginTop: "50px"}}> NASA Image of the Day ({this.state.nasaResponse.date}) </h3>
        <br></br>
        <img src={this.state.nasaResponse.url} alt="NASA" ></img>
        <h2>{this.state.nasaResponse.title}</h2>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Planetside Horizons
          </h1>
          <p>
            This application provides location about planets and other celestial bodies in the solar system.
          </p>
          <Link to="/planets">
            <button>Take me to the planets!</button>
          </Link>
          <div>
          {this.state.dispalyNasaImage ? (
            this.dispalyNasaImage()
          ) : (
            null
          )}
          </div>
          

        </header>
      </div>
    );
  }
}

export default App;
