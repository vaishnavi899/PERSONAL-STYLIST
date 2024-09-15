const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dzu9mi3iq',   // replace with your Cloud Name
  api_key: '925493564748383',         // replace with your API Key
  api_secret: '3XhF83B90eGXl59e3J4uy6qb3wk'    // replace with your API Secret
});

module.exports = cloudinary;
