import React from 'react'
import GoogleMapReact from 'google-map-react'
import station from '../images/SubStation.png';
import '../css/global.css';

const LocationPin = ({ text }) => (
  <div className="pin">
	<img src={station} className="station" alt="station" />
    <p className="pin-text">{text}</p>
  </div>
) 
const Map = ({ location, zoomLevel }) => {
	const center = {lat: parseFloat(location[0].latitude), lng: parseFloat(location[0].longitude)};
return (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBdtpkdduiWB8SxMkYSRnQFeNTnexyGmWY' }}
        defaultCenter={center}
        defaultZoom={zoomLevel}
        resetBoundsOnResize={true}
        style={{height: '280px'}}
      >
      { !location[0].name ? '' :
			location.map((loc, index) => (
				<LocationPin key={index}
          lat={parseFloat(loc.latitude)}
          lng={parseFloat(loc.longitude)}
          text={loc.name}
        />
			))
		}
      </GoogleMapReact>
    </div>
  </div>
)
}

export default Map