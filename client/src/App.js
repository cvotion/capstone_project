import React, {useEffect, useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from './secret.js'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const App = () => {
  
  const [restrooms, setRestrooms] = useState([])
  const [userLat, setUserLat] = useState()
  const [userLng, setUserLng] = useState()
  const [show, setShow] = useState(false);

  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [directions, setDirections] = useState("")
  const [comment, setComment] = useState("")
  const [ada, setAda] = useState()
  const [changingTable, setChangingTable] = useState()
  const [upVote, setUpVote] = useState("")
  const [downVote, setDownVote] = useState("")
  const [unisex, setUnisex] = useState()
  const [restLat, setRestLat] = useState("")
  const [restLng, setRestLng] = useState("")

//   "id": 63630,
// "name": "Barrilleaux’s Restaurant & Wine Bar",
// "street": "2000 Burgundy St",
// "city": "New Orleans ",
// "state": "LA",
// "accessible": false,
// "unisex": true,
// "directions": "There are 2 unisex restrooms. One at the back of the restaurant and one around the corner behind the bar.",
// "comment": "You should be a paying customer. Staff is very welcoming. Closed Mon-Wednesday. ",
// "latitude": 29.966284,
// "longitude": -90.058931,
// "created_at": "2022-10-10T15:17:11.364Z",
// "updated_at": "2022-10-10T15:17:11.474Z",
// "downvote": 0,
// "upvote": 1,
// "country": "US",
// "changing_table": false,

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
            restroomModal(restroom)
            handleShow()
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


  const restroomModal = (restroom) => {
    setName(restroom.name)
    setStreet(restroom.street)
    setCity(restroom.city)
    setState(restroom.state)
    setDirections(restroom.directions)
    setComment(restroom.comment)
    setAda(restroom.ada)
    setUnisex(restroom.unisex)
    setChangingTable(restroom.changingTable)
    setUpVote(restroom.upVote)
    setDownVote(restroom.downVote)
    setRestLat(restroom.latitude)
    setRestLng(restroom.longitude)
  }
  
  
  return (
    <>

      <div id='map' style={{width: "700px", height: "400px"}}></div> 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h4>{street}, {city}, {state}</h4>
            <p>{directions}</p>
            <p>{comment}</p>
          </div>
          <div>
            <p>Unisex: {unisex?"Yes":"No"}</p>
            <p>Accessible: {ada?"Yes":"No"}</p>
            <p>Changing Table: {changingTable?"Yes":"No"}</p>
          </div>
          <div>
            <p>Upvotes: {upVote}</p>
            <p>Downvotes: {downVote}</p>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Navigation
          </Button>
        </Modal.Footer>
      </Modal> 

    </>
  )
}

export default App