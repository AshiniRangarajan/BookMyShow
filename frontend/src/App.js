import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import MovieList from './components/MovieList';
import ShowSelection from './components/ShowSelection';
import SeatSelection from './components/SeatSelection';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/shows" element={<ShowSelection />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
