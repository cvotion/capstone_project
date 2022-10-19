import React, {useState, useEffect} from 'react'
import axios from 'axios' 
import { getFavoriteSpots } from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'react-bootstrap/Button';



const Favorites = () => {

  const [favoriteArr, setFavoriteArr] = useState([])
  // const dispatch = useDispatch()
  const userIdFromRedux = useSelector(state => state.userId)
  const [refresh, setRefresh] = useState(false)
 const [userIdFromLocalStorage, setUserIdFromLocalStorage] = useState("")
  // const favoriteSpotsResult = dispatch(getFavoriteSpots(userIdFromRedux))
  // console.log("inside fav component", userIdFromRedux, favoriteSpotsResult);

  useEffect(() => {
    
    const getData = async () => {
      const userIdFromLocalStorage1 = JSON.parse(localStorage.getItem('token'))
      const userIdFromLocalStorage = userIdFromLocalStorage1.userId
      setUserIdFromLocalStorage(userIdFromLocalStorage)
      
      let response = await axios.post('/favSpot', userIdFromLocalStorage)
      setFavoriteArr(response.data)
    }
    getData()
  }, [refresh])
    console.log(favoriteArr);

    const handleDelete = (restroomId) => {
      let obj = {restroomId: restroomId, userIdFromLocalStorage: userIdFromLocalStorage}
      console.log(obj);
      console.log(userIdFromLocalStorage);
      axios.post("/deleteFavSpot", obj)
      setRefresh(!refresh)
    }
  return (
    <>
     
    <div class="cards-list1">

      {favoriteArr.map(favSpot =>{
        return (
          
          <div class="card1 1">
            <div class="card_image">
              <Button variant="light">x</Button>
              <div class="card_title title-black">
                {favSpot.name}
              </div>
              <div>
                <p>{favSpot.street}</p>
              </div>
            </div>
          </div>
          
        )
      })}

    </div>


    </>
  )
}

export default Favorites
