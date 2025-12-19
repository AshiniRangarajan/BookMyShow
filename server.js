const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/theatres', require('./routes/theatreRoutes'));
app.use('/api/shows', require('./routes/showRoutes'));
app.use('/api/seats', require('./routes/seatRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
