import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import "./App.css";
import License from './components/license';

function App() {
  const [data, setData] = useState({ features: [] });
 
  useEffect(() => {
    
    const fetchData = async () => {
      const result = await axios(
        'https://usgs-gage.web.app/usgs-data-live/gageGeo/04096405,04096515,04097500,040975299,04097540,04099000,04100500,04101000,04101500,04101535,04101800,04102500,04099750',
      );
 
      setData(result.data);
    };
 
    fetchData();
  }, []);
 
  return (
    
    <div className="App">

       
    <Map center={[42, -85.5]} zoom={9} scrollWheelZoom={true}>
      
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
    />

    {data.features.map(d => (
      <Marker key = {d.properties.ID} 
      position = {[d.geometry.coordinates[1], d.geometry.coordinates[0]]}>
        <Popup position={[d.geometry.coordinates[1], d.geometry.coordinates[0]]}>
          <div>
            <h2>{"ID: " + d.properties.ID}</h2>
            <p>{"Info: " + d.properties.info}</p>
            <p>{"Status: " + d.properties.status}</p>
          </div>
          </Popup>
        </Marker>
      
    ))}
    </Map>
  </div>

  );
}
 
export default App;
