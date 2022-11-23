const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeviceSchema = new Schema(
  {
    category: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    display: {
      type: String,
    },
    color_0: {
      type: String,
    },
    color_1: {
      type: String,
    },
    color_2: {
      type: String,
    },
    color_3: {
      type: String,
    },
    color_4: {
      type: String,
    },
    color_5: {
      type: String,
    },
    price: {
      type: String,
    },
    chip_name: {
      type: String,
    },
    chip_cores: {
      type: String,
    },
    ram: {
      type: String,
    },
    storage: {
      type: String,
    },
    touchId: {
      type: String,
    },
    faceId: {
      type: String,
    },
    wireless_0: {
      type: String,
    },
    wireless_1: {
      type: String,
    },
    camera_front: {
      type: String,
    },
    audio_microphone: {
      type: String,
    },
    audio_speakers: {
      type: String,
    },
    size_height: {
      type: String,
    },
    size_width: {
      type: String,
    },
    size_depth: {
      type: String,
    },
    size_weight: {
      type: String,
    },
    os: {
      type: String,
    },
    InTheBox_0: {
      type: String,
    },
    InTheBox_1: {
      type: String,
    },
    InTheBox_2: {
      type: String,
    },
    InTheBox_3: {
      type: String,
    },
    InTheBox_4: {
      type: String,
    },
    InTheBox_5: {
      type: String,
    },
    orderInfo_inStock: {
      type: String,
    },
    orderInfo_reviews: {
      type: String,
    },
    camera_back: {
      type: String,
    },
    wireless_2: {
      type: String,
    },
    publicid: {
      type: String,
    },
  },
  { collection: "devices" },
  { collation: { locale: "en_US", strength: 1 } }
);

const Device = mongoose.model("Device", DeviceSchema);

module.exports = Device;
