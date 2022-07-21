import React, { Component } from "react";
import '../Planets.css'

const NUM_BODIES = 287;

class Search extends Component {

    state = { query: '', body: null, showBodyInfo: false, history: [] };

    updateQuery = (event) => {
        this.setState({ query: event.target.value });
    }

    displayBodyInfo = () => {
        console.log("displayBodyInfo called")
        console.log(this.state.body);

        var numMoons = 0;
        if (this.state.body.moons !== null) {
            numMoons = Object.keys(this.state.body.moons).length;
        }

        
        var mass;

        try {
            if (this.state.body.mass !== undefined) {
                const massVal = Object.values(this.state.body.mass).at(0);
                const massExp = Object.values(this.state.body.mass).at(1);
                mass = String(massVal) + "×10^" + String(massExp) + "kg";
            }
        } catch {
            mass = "unknown";
        }

        return (
            <div className="Planet-desc" style={{ color: "white", textAlign: "center" }}>
                {/* // moons */}
                <h3> Object Name: <b> {this.state.body.englishName} </b> </h3>
                <h3> Body Type: <b> {this.state.body.bodyType} </b> </h3>
                {
                    this.state.body.bodyType === "Moon" ? (
                        <h3> Orbits Around: <b> {this.state.body.aroundPlanet.planet} </b> </h3>
                    ) : (
                        null
                    )
                        
                }
                <h3> Number of Moons: <b> {numMoons} </b> </h3>
                <h3> Semimajor Axis: <b> {this.state.body.semimajorAxis} {"km"} </b> </h3>
                <h3> Orbital Perihelion: <b> {this.state.body.perihelion === 0 ? "unknown" : this.state.body.perihelion + " km"}</b> </h3>
                <h3> Orbital Aphelion: <b> {this.state.body.aphelion === 0 ? "unknown" : this.state.body.aphelion + " km"}</b> </h3>
                <h3> Orbital Eccentricity: <b> {this.state.body.eccentricity} </b> </h3>
                <h3> Orbital Inclination: <b> {this.state.body.inclination}{"\u00B0"}</b> </h3>
                <h3> Axial Tilt: <b> {this.state.body.axialTilt}{"\u00B0"}</b> </h3>
                <h3> Average Temperature: <b> {this.state.body.avgTemp === 0 ? "unknown" : this.state.body.avgTemp + "\u00B0K"}</b> </h3>
                <h3> Mass: {mass} </h3>
                <h3> Gravity: <b> {this.state.body.gravity === 0 ? "unknown" : this.state.body.gravity + " m/s^2"} </b> </h3>
                <h3> Escape Speed: <b> {this.state.body.escape === 0 ? "unknown" : this.state.body.escape + " m/s^2"} </b> </h3>
                <h3> Radius: <b> {this.state.body.meanRadius} {"km"}</b> </h3>
            </div>

        )
    }

    searchQuery = () => {
        fetch('https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=englishName%2Ceq%2C' + this.state.query)
            .then(response => response.json())
            .then(json => {
                const res = Object.values(json).at(0).at(0);
                if (typeof res != "undefined") {
                    this.setState({
                        body: res,
                        showBodyInfo: true
                    });
                } else {
                    alert("No Results for \"" + this.state.query + "\" found.")
                }
            }
            )
            .catch(error => alert(error.message));
    }

    handleKeyPress = event => {
        if (event.key === 'Enter') {
            this.searchQuery();
        }
    }

    randomSearch = () => {
        var n = Math.floor(Math.random() * NUM_BODIES);
        fetch('https://api.le-systeme-solaire.net/rest.php/bodies')
            .then(response => response.json())
            .then(json => {
                const res = Object.values(json).at(0).at(n);
                if (typeof res != "undefined") {
                    this.setState({
                        body: res,
                        showBodyInfo: true
                    });
                } else {
                    alert("No Results for \"" + this.state.query + "\" found.")
                }
            }
            )
            .catch(error => alert(error.message));
    }

    // updateHistory = () => {
    //     var updatedHistory = [];
    //     if (this.state.history.length > 10) {
    //         updatedHistory = this.state.history.slice(0, 8)
    //     }
    //     updatedHistory.concat("pony");
    //     this.setState({
    //         history: updatedHistory
    //     });
    // }

    // displayHistory = () => {
    //     return (
    //         <div style={{color: "green"}}>
    //             {this.updateHistory()}
    //             {this.state.history}
    //         </div>
    //     )
    // }

    render() {
        return (
            <div style={{ height: '100vh', backgroundColor: '#393e48', textAlign: 'center' }}>
                <br />
                <h2 style={{ color: "#008080" }}>Search for an Object in the Solar System</h2>
                <input
                    onChange={this.updateQuery}
                    onKeyPress={this.handleKeyPress}
                    placeholder='Search'
                    style={{ width: '30vh', height: '2vh' }}
                />
                <button style={{ height: '2.6vh' }} onClick={this.searchQuery}>Search</button>
                <button style={{ height: '2.6vh' }} onClick={this.randomSearch}>Random</button>
                {this.state.showBodyInfo ? (
                    this.displayBodyInfo()
                ) : (
                    null
                )}
            </div>
        );
    }
}

export default Search;