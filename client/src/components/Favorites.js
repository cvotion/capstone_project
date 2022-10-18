import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { getFavoriteSpots } from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';



const Favorites = () => {
  const [favoriteArr, setFavoriteArr] = useState([])
  // const dispatch = useDispatch()
  const userIdFromRedux = useSelector(state => state.userId)

  // const favoriteSpotsResult = dispatch(getFavoriteSpots(userIdFromRedux))
  // console.log("inside fav component", userIdFromRedux, favoriteSpotsResult);

  useEffect(() => {
    
    const getData = async () => {
      const userIdFromLocalStorage1 = JSON.parse(localStorage.getItem('token'))
      const userIdFromLocalStorage = userIdFromLocalStorage1.userId
      
      let response = await axios.post('/favSpot', userIdFromLocalStorage)
      setFavoriteArr(response.data)
    }
    getData()
  }, [])
    console.log(favoriteArr);

  return (
    <>
     



<div class="cards-list1">
  
<div class="card1 1">
  <div class="card_image"> </div>
  <div class="card_title title-white">
  My Pee Spot
  </div>
</div>

{favoriteArr.map(favSpot =>{
  return <h1>{favSpot.name}</h1>
})}
  


</div>






     
    </>
  )
}

export default Favorites
