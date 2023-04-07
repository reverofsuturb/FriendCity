const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomEmail, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  
  // Create empty array to hold the students
  const users = [];

  for (let i = 0; i < 15; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data

    const username = getRandomName();
    const email = getRandomEmail();

    users.push({
      username,
      email,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);



  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});