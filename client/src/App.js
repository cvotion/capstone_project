import React, {useEffect} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from './secret.js'

const App = () => {

  useEffect(() => {

    mapboxgl.accessToken = `${keys.mapboxToken}`;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-95.37, 29.76], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    // map.on('load', () => {
    //   map.addLayer({
    //       id: 'terrain-data',
    //       type: 'line',
    //       source: {
    //           type: 'vector',
    //           url: 'mapbox://mapbox.mapbox-terrain-v2'
    //       },
    //       'source-layer': 'contour'
    //   });
    // });

    // return () =>{
    //   map.remove()
    // }

  }, [])
  

  return (
    <>

      <div id='map' style={{width: "700px", height: "400px"}}></div>  
    
    </>
  )
}

export default App