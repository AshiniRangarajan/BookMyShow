import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchParams] = useSearchParams();
  const showId = searchParams.get('show');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/seats/show/${showId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSeats(response.data);
      } catch (error) {
        alert('Failed to fetch seats');
      }
    };
    if (showId) fetchSeats();
  }, [showId]);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  const bookSeats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.post('http://localhost:5000/api/bookings', {
        user: user.id,
        show: showId,
        seats: selectedSeats
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refetch seats to update status
      const response = await axios.get(`http://localhost:5000/api/seats/show/${showId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSeats(response.data);
      setSelectedSeats([]);
      alert('Booking successful!');
      navigate('/confirmation');
    } catch (error) {
      alert(error.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div>
      <h2>Seat Selection</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '5px' }}>
        {seats.map(seat => (
          <button
            key={seat._id}
            onClick={() => toggleSeat(seat._id)}
            disabled={seat.status === 'booked'}
            style={{
              backgroundColor: selectedSeats.includes(seat._id) ? 'green' : seat.status === 'booked' ? 'darkred' : 'gray',
              padding: '10px',
              border: '1px solid black'
            }}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <button onClick={bookSeats}>Book Seats</button>
    </div>
  );
};

export default SeatSelection;
