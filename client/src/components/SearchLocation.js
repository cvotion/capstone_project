import React, {useEffect, useState} from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'
import {keys} from '../secret.js'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addFavoriteSpots } from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';

mapboxgl.accessToken = `${keys.mapboxToken}`;

const SearchLocation = () => {

  // search states
  const [searchInput, setSearchInput] = useState("")
  const [searchCoordinates, setSearchCoordinates] = useState([])

  // map states
  const [markers, setMarkers] = useState([])
  const [mapObj, setMapObj] = useState()
  const [sourceFlag, setSourceFlag] = useState(false)

  // restroom api lat lng state
  const [restLat, setRestLat] = useState(0)
  const [restLng, setRestLng] = useState(0)

  // modal states
  const [name, setName] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [directions, setDirections] = useState("")
  const [comment, setComment] = useState("")
  const [ada, setAda] = useState()
  const [changingTable, setChangingTable] = useState()
  const [upVote, setUpVote] = useState(0)
  const [downVote, setDownVote] = useState(0)
  const [unisex, setUnisex] = useState()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    initializeMap()
  }, [])
  

  const initializeMap = () => {
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

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map.addControl(geolocate); // Add the control to the map.
    map.on('load', () => {
      geolocate.trigger();
    });
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mapboxResults = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchInput}.json?access_token=${keys.mapboxToken}`)

    let response = await mapboxResults.json();

    // console.log(response);
    console.log(response.features[0].center);
    let coordinates = response.features[0].center
    setSearchCoordinates(coordinates)

    let restroomResults = await fetch(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=50&offset=0&lat=${coordinates[1]}&lng=${coordinates[0]}`)

    let restroomResponse = await restroomResults.json()
    console.log(restroomResponse);
    setMarkers(restroomResponse)

    //create new map w markers after search

    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: coordinates, // starting position [lng, lat]
      zoom: 9 // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // console.log("new map created");
    setMapObj(map)

    restroomResponse.forEach(restroom =>{

      let marker = new mapboxgl.Marker()
        .setLngLat([restroom.longitude, restroom.latitude])
        .addTo(map)

      marker.getElement().addEventListener('click', (e)=>{
        console.log([restroom.longitude, restroom.latitude]);
        console.log(sourceFlag)
        
        restroomModal(restroom)

        setRestLat(restroom.latitude)
        setRestLng(restroom.longitude)

        console.log("restroom modal", restroom.latitude, restroom.longitude);
        console.log('variables', restLat, restLng);

        // mapObj.removeSource('route')
        handleShow()
        // console.log(navigation);
        
      })

      // console.log("marker created");
    })
  }

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
  }

  //handle add favorite action
  const userIdFromRedux = useSelector(state => state.userId)
  console.log(userIdFromRedux)
  const dispatch = useDispatch()
  const handleFavorite = (e)=>{
     e.preventDefault()
     dispatch(addFavoriteSpots({name, street, city, state, userIdFromRedux}))
  }

  return (
    <>
    
    <div className='map-container'>
      <div id='map' style={{width: "100%", height: "100%"}}></div> 
    </div>

    <Form onSubmit={handleSubmit}>
      <Form.Group className="" controlId="formBasicEmail">
        <div className='d-flex'>
          <Form.Control type="search" placeholder="Search a Location" value={searchInput} onChange={e => setSearchInput(e.target.value)} />
          <Button variant="light" type='submit'>Search</Button>
        </div>
      </Form.Group>
    </Form>

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

        {/* <Button variant="primary" onClick={getDirections}>

          Navigation
        </Button> */}

        <Button variant="warning" onClick={handleFavorite}>
          Favorite
        </Button>
      </Modal.Footer>
    </Modal> 
    
    </>
  )
}

export default SearchLocation