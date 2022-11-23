const mongoose = require("mongoose");
const Device = require("../models/product");

const getDevices = async (_req, res) => {
  Device.find({}, (err, devices) => {
    if (err) {
      res.status(500).end();
      return;
    }

    res.json(devices);
  });
};

module.exports = {
  getDevices,
};
