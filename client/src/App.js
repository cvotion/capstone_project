import React from 'react'
import mapboxgl from 'react-map-gl'
import {keys} from './secret.js'

const App = () => {

  mapboxgl.accessToken = `${keys.mapboxToken}`;
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
  });

  return (
    <>
      <h1>Home</h1>
      <div>{map}</div>  
    
    </>
  )
}

export default App