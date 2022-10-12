import React, {useEffect, useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from './secret.js'

const App = () => {
  
  const [restrooms, setRestrooms] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLng, setUserLng] = useState()
  
  // Create map and locate user for API call
  useEffect(() => {
    
    mapboxgl.accessToken = `${keys.mapboxToken}`;

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-95.37, 29.76], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );
      
    // Initialize the geolocate control.
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    // Add the control to the map.
    map.addControl(geolocate);
    map.on('load', () => {
      geolocate.trigger();
    });

      
    let restroomList;
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
      
      restroomList = await results.json()
      console.log('success', restroomList)
      // setRestrooms(restroomList)
      restroomList.forEach((restroom)=>{
        console.log('here', restroom)

        let popup = new mapboxgl.Popup({offset: 25})
          .setText(restroom.name)

        let marker = new mapboxgl.Marker()
          .setLngLat([restroom.longitude, restroom.latitude])
          .setPopup(popup)
          .addTo(map)
          
          marker.getElement().addEventListener('click', (e)=>{
            console.log([restroom.longitude, restroom.latitude]);
          })
      })
    }

    //https://api.mapbox.com/directions/v5/mapbox/driving/-95.691092%2C29.8499825%3B-95.715239%2C29.8322942?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1Ijoic2NoZWx0ZW1hdCIsImEiOiJjbDhodGx1c2YxMGcwNDBuen
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
      
  }, [])

  // useEffect(() => {
    
  //   if(restrooms.length > 0){
  //     restrooms.forEach((restroom)=>{
  //       console.log('here', restroom.latitude)
  //       let marker = new mapboxgl.Marker()
  //           .setLngLat([restroom.longitude, restroom.latitude])
  //           .addTo(map);
  //     })

  //   }
  // }, [restrooms])


  
  return (
    <>

      <div id='map' style={{width: "700px", height: "400px"}}></div>  

    </>
  )
}

export default App