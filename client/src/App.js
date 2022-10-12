import React, {useEffect, useState,componentDidMount} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from './secret.js'
import NavigationBar from './navigation/NavigationBar'

const App = () => {
  
  const [restrooms, setRestrooms] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLng, setUserLng] = useState()

  


  // const setRestroomsData = (data) =>{
  //   setRestrooms(data)
  // }

  useEffect(() => {
    
    
    // MapBox
    mapboxgl.accessToken = `${keys.mapboxToken}`;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-95.37, 29.76], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    // Add the control to the map.
    map.addControl(geolocate);
    // console.log(geolocate._accuracyCircleMarker._lngLat)
    map.on('load', () => {
      geolocate.trigger();
    });
    // Locating user for API call
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  const success = async (pos)=> {
    const crd = pos.coords;
    setUserLat(crd.latitude)
    setUserLng(crd.longitude)
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    let results = await fetch(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=50&offset=0&lat=${crd.latitude}&lng=${crd.longitude}`)
    let data = await results.json()
    setRestrooms(data)
    data.forEach(restroom =>{
      console.log('getting restroom', restrooms)
      let marker = new mapboxgl.Marker()
          .setLngLat([restroom.longitude, restroom.latitude])
          .addTo(map);
    })
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
    navigator.geolocation.getCurrentPosition(success, error, options);

    

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

  
  
  
  console.log(`Restrooms:`, restrooms)
  return (
    <>


      <div id='map' style={{width: "700px", height: "400px"}}></div>  

    
    </>
  )
}

export default App