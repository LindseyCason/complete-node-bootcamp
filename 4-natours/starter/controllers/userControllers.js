const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users
    }
  });
};

exports.getUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is not yet implemented'
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is not yet implemented'
  });
};
exports.deleteUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is not yet implemented'
  });
};
exports.updateUserByID = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This is not yet implemented'
  });
};
