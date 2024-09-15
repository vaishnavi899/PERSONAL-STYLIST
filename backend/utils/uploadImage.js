const cloudinary = require('../config/cloudinaryConfig');  // Import the Cloudinary configuration

const uploadImageToCloudinary = async (imagePath) => {
  try {
    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file does not exist at path: ${imagePath}`);
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'stylist', // Optional: Organize images into folders
      timeout: 120000, // Optional: Increase timeout for large files
    });

    // Return the URL of the uploaded image
    return result.secure_url; // Use secure_url for HTTPS access
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

module.exports = uploadImageToCloudinary;
