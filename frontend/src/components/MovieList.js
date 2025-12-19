import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
      } catch (error) {
        alert('Failed to fetch movies');
      }
    };
    fetchMovies();
  }, []);

  const selectMovie = (movieId) => {
    navigate(`/shows?movie=${movieId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Movie List</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {movies.map(movie => (
          <div
            key={movie._id}
            onClick={() => selectMovie(movie._id)}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              cursor: 'pointer',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <h3>{movie.title}</h3>
            <p>Language: {movie.language}</p>
            <p>Genre: {movie.genre.join(', ')}</p>
            <p>Duration: {movie.duration} mins</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
