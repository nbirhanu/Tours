const fs = require('fs');
const express = require('express');

//using express
const app = express();

app.use(express.json());

//read file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//GET API

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
});

//POST DOCUMENT API

app.post('/api/v1/tours', (req, res) => {
  const newTour = Object.assign(req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
