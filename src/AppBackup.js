import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "./App.css";
import airData from "./data/airData.json";
import useSwr from "swr";
import axios from "axios"

const fetchData = async () => {
return axios.get("https://usgs-gage.web.app/usgs-data-live/gageGeo/04097500")
      .then((response) => console.log(response.data));}

const fetcher = (...args) => fetch(...args).then(response => response.json());


export default function App() {
  
  const fetchData = async () => {
    return await axios.get("https://usgs-gage.web.app/usgs-data-live/gageGeo/04097500")
          .then((response) => console.log(response.data));}
    
    const fetcher = (...args) => fetch(...args).then(response => response.json());
  
  const gageData = fetchData();
  const url = "https://usgs-gage.web.app/usgs-data-live/gageGeo/04097500";
  const { data, error } = useSwr(url, { fetcher });
  //console.log(data);

  return (
  <Map center={[42, -85]} zoom={6} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {airData.features.map(d => (
      
      <Marker key = {d.properties.ID} 
      position = {[d.geometry.coordinates[1], d.geometry.coordinates[0]]}
      />
    ))}
  </Map>
  );
}



