import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { getFavoriteSpots } from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';



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
    <div className='favorites-backround'>
     
    <div class="cards-list1">

      {favoriteArr.map(favSpot =>{
        return (
          
          <div class="card1 mb-5">
            <div class="card_image">
              <Button variant="light">x</Button>
              <div class="card_title title-black">
                {favSpot.name}
              </div>
              <div className='card1a'>
                <p>{favSpot.street},</p>
                <p>{favSpot.city}, {favSpot.state}</p>
              </div>
            </div>
          </div>
          
        )
      })}

    </div>


    </div>
  )
}

export default Favorites
