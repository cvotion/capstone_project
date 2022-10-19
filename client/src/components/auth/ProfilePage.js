import React, {useState, useEffect} from 'react'
// import Image from '../images/SafeWhiz-1.png'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from '../../secret.js'

import axios from 'axios'

mapboxgl.accessToken = `${keys.mapboxToken}`;




const ProfilePage = () => {

const [user, setUser] = useState([])
useEffect(() => {

//   console.log(id)
//   console.log(id2)

const getData = async () => { 
     let userId = JSON.parse(localStorage.getItem('token'))
    
 
    let result = await axios.post('/profilepage', userId)
    console.log(result)
    setUser(result.data)
}
getData()

}, [])

console.log(user)


const [usercity, setUsercity] = useState('')

// https://api.mapbox.com/geocoding/v5/mapbox.places/29.76,-95.37.json?access_token=${keys.mapboxToken}

useEffect(()=>{
  
  const options = {
    enableHighAccuracy: true,
    timeout: 50000,
    maximumAge: 0
  };

  const success = async (pos)=> {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    let results = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${crd.longitude},${crd.latitude}.json?access_token=${keys.mapboxToken}`)
    let data = await results.json()
    setUsercity(data.features[2].context[1].text)
    console.log('user city state',usercity)
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  

  navigator.geolocation.getCurrentPosition(success, error, options);
  }, [usercity])

  useEffect(()=>{
    console.log('user city changed', usercity)
  }, [usercity])


  return (
    <>




<section class="profile">
  <header class="header">
    <div class="details">
      {/* <img src="" alt="John Doe" class="profile-pic"/> */}
      <h1 class="heading">{user.firstName} {user.lastName}</h1>
      <div class="location">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
</svg>
        <p>{usercity}</p>

       
      </div>
      <div class="stats">
        <div class="col-4">
          <h4>0</h4>
          <p>Badges</p>
        </div>
        <div class="col-4">
          <h4>0</h4>
          <p>Places Visited</p>
        </div>
        <div class="col-4">
          <h4>0</h4>
          <p>Favorites</p>
        </div>
      </div>
    </div>
  </header>
</section>
        



     
    </>
  )
}

export default ProfilePage

