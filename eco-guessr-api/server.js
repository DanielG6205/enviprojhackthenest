const express = require('express');
const app = express();
const port = 3000;

const locations = [
  {
    name: 'Great Barrier Reef, Australia',
    beforeImageUrl: 'https://example.com/before-great-barrier-reef.jpg',
    afterImageUrl: 'https://example.com/after-great-barrier-reef.jpg',
    center: [18.2871, 147.6992], // existing center
    facts: [
      'Coral bleaching has affected 60% of the reef.',
      'Ocean warming is the primary cause of coral death.',
    ],
  },
  {
    name: 'Amazon Rainforest, Brazil',
    beforeImageUrl: 'https://example.com/before-amazon.jpg',
    afterImageUrl: 'https://example.com/after-amazon.jpg',
    center: [-3.4653, -62.2159], // existing center
    facts: [
      'Over 17% of the Amazon rainforest has been destroyed in the past 50 years.',
      'Deforestation is a leading cause of habitat loss for many species.',
    ],
  },
];

app.get('/get-random-location', (req, res) => {
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  // Add a 'coords' field to match the frontend expectation
  const response = {
    ...randomLocation,
    coords: randomLocation.center, // Rename 'center' to 'coords'
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
