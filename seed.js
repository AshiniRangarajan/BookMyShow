const mongoose = require('mongoose');

const User = require('./models/User');
const Movie = require('./models/Movie');
const Theatre = require('./models/Theatre');
const Show = require('./models/Show');
const Seat = require('./models/Seat');
const Booking = require('./models/Booking');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  // Clear existing data
  await User.deleteMany();
  await Movie.deleteMany();
  await Theatre.deleteMany();
  await Show.deleteMany();
  await Seat.deleteMany();
  await Booking.deleteMany();

  // Add movies
  const movie1 = new Movie({
    title: 'Ponniyin Selvan',
    description: 'Historical epic',
    genre: ['Action', 'Drama'],
    language: 'Tamil',
    duration: 150,
    releaseDate: new Date('2022-09-30'),
    image: 'https://tse3.mm.bing.net/th/id/OIP.Zl3Sg6o9E7MGXWYn6J9gpgHaKH?cb=ucfimg2&ucfimg=1&rs=1&rm=2'
  });
  await movie1.save();

  const movie2 = new Movie({
    title: 'Vikram',
    description: 'Action thriller',
    genre: ['Action', 'Thriller'],
    language: 'Tamil',
    duration: 140,
    releaseDate: new Date('2022-06-03'),
    image: 'https://i.pinimg.com/736x/83/72/da/8372da30db0bf65e0623d48694ff0b20.jpg'
  });
  await movie2.save();

  const movie3 = new Movie({
    title: 'Master',
    description: 'Action drama',
    genre: ['Action', 'Drama'],
    language: 'Tamil',
    duration: 130,
    releaseDate: new Date('2021-01-13'),
    image: 'https://wallpapercave.com/wp/wp5429971.jpg'
  });
  await movie3.save();

  const movie4 = new Movie({
    title: 'Kaathuvaakula Rendu Kaadhal',
    description: 'Romantic comedy',
    genre: ['Romance', 'Comedy'],
    language: 'Tamil',
    duration: 120,
    releaseDate: new Date('2022-04-29'),
    image: 'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/5637623893f6beb0fe3ca191072aa52eeef0137d86e717308de5566f0bd7d6d4._RI_TTW_.jpg'
  });
  await movie4.save();

  const movie5 = new Movie({
    title: 'Oh My Dog',
    description: 'Comedy',
    genre: ['Comedy'],
    language: 'Tamil',
    duration: 110,
    releaseDate: new Date('2022-09-16'),
    image: 'https://th.bing.com/th/id/OIP.XR-O_8a2wPN2so4srQk6lQHaLH?w=105&h=180&c=7&r=0&o=7&cb=ucfimg2&dpr=1.5&pid=1.7&rm=3&ucfimg=1'
  });
  await movie5.save();

  // Add theatres
  const theatre1 = new Theatre({
    name: 'PVR Chennai',
    location: 'T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600017'
  });
  await theatre1.save();

  const theatre2 = new Theatre({
    name: 'INOX Mylapore',
    location: 'Mylapore',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600004'
  });
  await theatre2.save();

  const theatre3 = new Theatre({
    name: 'AGS Cinemas',
    location: 'Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641001'
  });
  await theatre3.save();

  const theatre4 = new Theatre({
    name: 'Kasi Talkies',
    location: 'Madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    pincode: '625001'
  });
  await theatre4.save();

  // Add shows
  const show1 = new Show({
    movie: movie1._id,
    theatre: theatre1._id,
    date: new Date('2023-10-01'),
    time: '10:00 AM',
    price: 200
  });
  await show1.save();

  const show2 = new Show({
    movie: movie1._id,
    theatre: theatre2._id,
    date: new Date('2023-10-01'),
    time: '2:00 PM',
    price: 250
  });
  await show2.save();

  const show3 = new Show({
    movie: movie2._id,
    theatre: theatre1._id,
    date: new Date('2023-10-01'),
    time: '6:00 PM',
    price: 220
  });
  await show3.save();

  const show4 = new Show({
    movie: movie3._id,
    theatre: theatre3._id,
    date: new Date('2023-10-01'),
    time: '4:00 PM',
    price: 180
  });
  await show4.save();

  const show5 = new Show({
    movie: movie4._id,
    theatre: theatre4._id,
    date: new Date('2023-10-01'),
    time: '7:00 PM',
    price: 160
  });
  await show5.save();

  const show6 = new Show({
    movie: movie5._id,
    theatre: theatre1._id,
    date: new Date('2023-10-01'),
    time: '9:00 PM',
    price: 150
  });
  await show6.save();

  // Add seats for shows
  const addSeats = async (theatreId, showId) => {
    for (let row = 1; row <= 20; row++) {
      for (let col = 1; col <= 20; col++) {
        const seat = new Seat({
          theatre: theatreId,
          show: showId,
          seatNumber: `${row}-${col}`,
          row: row.toString()
        });
        await seat.save();
      }
    }
  };

  await addSeats(theatre1._id, show1._id);
  await addSeats(theatre2._id, show2._id);
  await addSeats(theatre1._id, show3._id);
  await addSeats(theatre3._id, show4._id);
  await addSeats(theatre4._id, show5._id);
  await addSeats(theatre1._id, show6._id);

  console.log('Sample data seeded');
  mongoose.connection.close();
};

seedData().catch(console.error);
