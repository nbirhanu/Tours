const Tour = require('./../model/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

// POST API
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    //EXECUTE
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitingFields()
      .pagination();
    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

// GET DOCUMENT BY ID
exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

// UPDATE TOUR
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};
// DELETE TOUR
exports.deleteTour = async (req, res) => {
  try {
    const tourDelete = await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'success',
      data: {
        tourDelete,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

//AGGREGATION
exports.tourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$ratingsAverage',
          numOfTours: { $sum: 1 },
          numOfRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgprice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};

//MONTHLYPLANE
exports.monthlyPlane = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-12`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStart: { $sum: 1 },
          Tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTourStart: -1 },
      },
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'error',
      message: err,
    });
  }
};
