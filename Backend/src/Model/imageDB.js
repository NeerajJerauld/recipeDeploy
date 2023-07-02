const mongoose = require("./dbConnect");

let Schema = mongoose.Schema;

const imageSchema = new Schema({
    filename: String,
    originalName: String,
    contentType: String
  });


  const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
