const fs = require('fs');
const path = require('path');

// Define the path to your JSON file
const jsonFilePath = path.join(__dirname,'..', 'data', 'csvjson.json');

// Function to update the JSON file with imageUrl field
const addImageUrlToJson = async () => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(jsonFilePath, 'utf8');

    // Parse the JSON data
    const products = JSON.parse(data);

    // Loop through each product and add the imageUrl field
    const updatedProducts = products.map((product) => {
      return {
        ...product,
        imageUrl: `/images/${product.id}.jpg`, // Add imageUrl field with the format "id.jpg"
      };
    });

    // Write the updated products back to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(updatedProducts, null, 2), 'utf8');
    console.log('Updated JSON file with imageUrl field.');
  } catch (error) {
    console.error('Error updating JSON file:', error);
  }
};

// Run the function to update the JSON file
addImageUrlToJson();
