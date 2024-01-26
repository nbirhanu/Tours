const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

//using express
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

//read file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//GET ALL API
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

//POST API
const createTour = (req, res) => {
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
};

// GET DOCUMENT BY ID
const getTourById = (req, res) => {
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
};

//UPDATE TOUR
const updateTour = (req, res) => {
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
};
//DELETE TOUR
const deleteTour = (req, res) => {
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
};

//ROUTES

const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
