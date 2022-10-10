import React from 'react'
import mapboxgl from 'mapbox-gl'
import {keys} from './secret.js'

const App = () => {

  mapboxgl.accessToken = `${keys.mapboxToken}`;
  const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
  });

  map.on('load', () => {
    map.addLayer({
        id: 'terrain-data',
        type: 'line',
        source: {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        },
        'source-layer': 'contour'
    });
  });

  return (
    <>

      <div id='map'></div>  
    
    </>
  )
}

export default App