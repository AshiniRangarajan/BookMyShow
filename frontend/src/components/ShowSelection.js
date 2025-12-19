import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ShowSelection = () => {
  const [shows, setShows] = useState([]);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get('movie');

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shows?movie=${movieId}`);
        setShows(response.data);
        if (response.data.length > 0) {
          setMovie(response.data[0].movie);
        }
      } catch (error) {
        alert('Failed to fetch shows');
      }
    };
    if (movieId) {
      fetchShows();
    }
  }, [movieId]);

  const selectShow = (showId) => {
    navigate(`/seats?show=${showId}`);
  };

  // Group shows by theatre
  const groupedShows = shows.reduce((acc, show) => {
    const theatreId = show.theatre._id;
    if (!acc[theatreId]) {
      acc[theatreId] = {
        theatre: show.theatre,
        shows: []
      };
    }
    acc[theatreId].shows.push(show);
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <h2>{movie ? movie.title : 'Movie'} - Theatre Selection</h2>
      {Object.values(groupedShows).map(({ theatre, shows }) => (
        <div key={theatre._id} style={{ marginBottom: '30px', border: '1px solid #ccc', borderRadius: '8px', padding: '15px' }}>
          <h3>{theatre.name}</h3>
          <p>Location: {theatre.location}, {theatre.city}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {shows.map(show => (
              <button
                key={show._id}
                onClick={() => selectShow(show._id)}
                style={{
                  padding: '10px 15px',
                  border: '1px solid #007bff',
                  borderRadius: '5px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              >
                {new Date(show.date).toLocaleDateString()} - {show.time} - ₹{show.price}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowSelection;
