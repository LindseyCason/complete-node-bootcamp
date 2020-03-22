const express = require('express');
const app = express();
app.use(express.json());
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
const baseURL = '/api/v1/tours';
//ROUTE HANDLERS COLLECTION
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

const getTourByID = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //this trick converts a num string to num

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  const tour = tours.find(e => e.id === id); //this will search through and compare the id provided in the params to the element id(e.id) and only return the TRUE match
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

const updateTourByID = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'succcess',
    data: {
      tour: '<UPDATED TOUR>'
    }
  });
};

const deleteTourByID = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }

  res.status(204).json({
    status: 'succcess',
    data: null
  });
};

//SHORTEN CODE
app
  .route(`${baseURL}`)
  .get(getAllTours)
  .post(createTour);

app
  .route(`${baseURL}/:id`)
  .get(getTourByID)
  .patch(updateTourByID)
  .delete(deleteTourByID);

//SERVER PORT
const port = 3000;
app.listen(3000, () => {
  console.log(`App running on ${port}...`);
});
