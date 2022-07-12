const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'store-vue',
  api_key: 884648627383716,
  api_secret: 'AwnzFC2sep4DmqMhJrTXOgCtUOk',
});

module.exports = cloudinary;