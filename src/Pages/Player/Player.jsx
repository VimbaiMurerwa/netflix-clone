import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  
    const {id} = useParams();
    const navigate = useNavigate();   // Hook to navigate back or forward in the app
  
 // State to store video data fetched from the API
  const[apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: ""
  })

  // API request options, including authentication
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGVkYzM2ZjI4NzRhMGNkZmY2OWI5YWYyZTA5ZTAzOCIsIm5iZiI6MTc0MDk5NDIzOS4zNjA5OTk4LCJzdWIiOiI2N2M1NzZiZmVjZTAxY2VkYTFlNzY0OTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gh2D4fv3WxyKDmPyzimWAB-t_iLoZPJkPkIrRe56D6A'
    }
  };
   
  useEffect(()=>{
      // Fetching the movie trailer video from TMDB API
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))  // Setting the first video from the API response
    .catch(err => console.error(err));
  }, [id]);  


  return (
    <div className="player">
       {/* Back button to navigate to the previous page */}
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{apiData. published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>

      </div>
    </div>
  )
}

export default Player
