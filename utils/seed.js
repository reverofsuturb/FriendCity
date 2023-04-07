const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomEmail, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing courses
  await User.deleteMany({});

  // Drop existing students
  await Thought.deleteMany({});

  const thoughtsa = [];

  for (let i = 0; i < 20; i++) {
    const thoughtText = getRandomThoughts();
    const username = getRandomName();

    thoughtsa.push({ 
      thoughtText,
      username,
    });
  }
  // Create empty array to hold the students
  const users = [];
  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = [getRandomThoughts()];
    const username = getRandomName();
    const email = getRandomEmail();
    const friends = getRandomName();

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  // Add students to the collection and await the results
  await Thought.collection.insertMany(thoughtsa);
  await User.collection.insertMany(users);



  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});