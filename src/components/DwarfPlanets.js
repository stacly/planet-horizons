import React, { Component } from "react";
import DWARF_PLANETS from '../data/dwarfPlanets'
import '../Planets.css'
// import jwebb from '../assets/jwebb.jpeg'

class DwarfPlanet extends Component {

    constructor() {
        super();
        this.state = {
            showPlanetInfo: false, 
            planetInfo: {}
        }
    }

    togglePlanetInfo = () => {
        this.setState({
            showPlanetInfo: !this.state.showPlanetInfo
        });
        console.log('showPlanetInfo:', this.state.showPlanetInfo);
        console.log('planetInfo:', this.state.planetInfo);
    }

    displayPlanetInfo = () => {

        var numMoons = 0;
        try {
            if (this.state.planetInfo.moons !== null) {
                numMoons = Object.keys(this.state.planetInfo.moons).length;
            }
        } catch {
            numMoons = 0;
        }
        
        var mass;

        try {
            if (this.state.planetInfo.mass !== undefined) {
                const massVal = Object.values(this.state.planetInfo.mass).at(0);
                const massExp = Object.values(this.state.planetInfo.mass).at(1);
                mass = String(massVal) + "×10^" + String(massExp) + "kg";
            }
        } catch {
            mass = "unknown";
        }


        return (
            <div className="Planet-desc" style={{color: "white", width: "200%", transform: "translateX(-25%)", textAlign: "left", marginLeft: "5vh" }}>
                <p> Number of Moons: <b> {numMoons} </b> </p>
                <p> Semimajor Axis: <b> {this.state.planetInfo.semimajorAxis} {"km"} </b> </p>
                <p> Orbital Perihelion: <b> {this.state.planetInfo.perihelion === 0 ? "unknown" : this.state.planetInfo.perihelion + " km"}</b> </p>
                <p> Orbital Aphelion: <b> {this.state.planetInfo.aphelion === 0 ? "unknown" : this.state.planetInfo.aphelion + " km"}</b> </p>
                <p> Orbital Eccentricity: <b> {this.state.planetInfo.eccentricity} </b> </p>
                <p> Orbital Inclination: <b> {this.state.planetInfo.inclination}{"\u00B0"}</b> </p>
                <p> Axial Tilt: <b> {this.state.planetInfo.axialTilt}{"\u00B0"}</b> </p>
                <p> Average Temperature: <b> {this.state.planetInfo.avgTemp === 0 ? "unknown" : this.state.planetInfo.avgTemp + "\u00B0K"}</b> </p>
                <p> Mass: {mass} </p>
                <p> Gravity: <b> {this.state.planetInfo.gravity === 0 ? "unknown" : this.state.planetInfo.gravity + " m/s^2"} </b> </p>
                <p> Escape Speed: <b> {this.state.planetInfo.escape === 0 ? "unknown" : this.state.planetInfo.escape + " m/s^2"} </b> </p>
                <p> Radius: <b> {this.state.planetInfo.meanRadius} {"km"}</b> </p>
            </div>
        )
    }

    render() {

        const { name, displaySize, image, whRatio, transformImage } = this.props.planet;

        const planetClick = () => {
            console.log(name, "clicked");
            fetch('https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=englishName%2Ceq%2C' + name)
                .then(response => response.json())
                .then(json => this.setState({ planetInfo: Object.values(json).at(0).at(0) }))
                .catch(error => alert(error.message));
            this.togglePlanetInfo();
        }

        return (
            <div className="item" style={{ display: "inline-block", margin: "100px", width: "200px"}} >
                <span style={{ display: 'block' }}>
                    <img src={image} onClick={planetClick} alt="planet" style={{ width: 180 * displaySize * whRatio, height: 180 * displaySize, transform: "translateX("+transformImage+")" }} />
                </span>
                <h2 style={{color:"#008080"}}>{name}</h2>
                    {this.state.showPlanetInfo ? (
                        this.displayPlanetInfo()
                    ) : (
                        null
                    )}
            </div>
            

        );
    }
}

class DwarfPlanets extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#0c131a', position: 'absolute', width: "100%", height: "100%"}}>
                <div style={{marginBottom: "50vh"}}>
                {DWARF_PLANETS.map(DWARF_PLANET => {
                    return <DwarfPlanet key={DWARF_PLANET.id} planet={DWARF_PLANET} />
                })}
                </div>
            </div>
        );
    }
}

export default DwarfPlanets;
