import React, { useEffect, useRef, useState  } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'




const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  // API options for fetching movie data from TMDB
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGVkYzM2ZjI4NzRhMGNkZmY2OWI5YWYyZTA5ZTAzOCIsIm5iZiI6MTc0MDk5NDIzOS4zNjA5OTk4LCJzdWIiOiI2N2M1NzZiZmVjZTAxY2VkYTFlNzY0OTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gh2D4fv3WxyKDmPyzimWAB-t_iLoZPJkPkIrRe56D6A'
    }
  };
  
 
 // handling horizontal scrolling
const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;  // Scrolls left or right based on wheel movement
};

 // useEffect to fetch movie data 
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?
  language=en-US&page=1`, options)
  .then(response => response.json())
  .then(response => setApiData(response.results))
  .catch(err => console.error(err));

  //  event listener for scrolling effect
  cardsRef.current.addEventListener('wheel', handleWheel);
},[])

  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
          // Linking each movie card to a player page with the movie ID
          return <Link to={`/player/${card.id}`}className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
