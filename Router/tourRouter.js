const express = require('express');

const tourController = require('../controller/tourController');

const router = express.Router();

//tour-stats
router.route('/tour-stats').get(tourController.tourStats);

//monthly-plane
router.route('/monthly-plan/:year').get(tourController.monthlyPlane);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
