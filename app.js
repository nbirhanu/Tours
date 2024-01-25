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

// GET DOCUMENT BY ID
app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

//UPDATE TOUR

app.patch('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here....>',
    },
  });
});

//DELETE TOUR
app.delete('/api/v1/tours/:id', (req, res) => {
  if (+req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
