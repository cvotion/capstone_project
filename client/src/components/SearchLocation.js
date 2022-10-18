import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from './secret.js'

mapboxgl.accessToken = `${keys.mapboxToken}`;

const SearchLocation = () => {

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-95.37, 29.76], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });


  return (
    <>
    
    
    </>
  )
}

export default SearchLocation