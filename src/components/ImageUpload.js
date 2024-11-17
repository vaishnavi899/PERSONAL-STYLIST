import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); // For previewing the selected image
  const [category, setCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [similarImages, setSimilarImages] = useState([]);

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Set the preview image
      setMessage(""); // Reset message
      setSimilarImages([]); // Clear similar images if a new file is selected
    }
  };

  // Handle form submission and image upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedImage) {
      setMessage("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedImage);

    try {
      setMessage("Uploading...");
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { category, recommendations, uploaded_image } = response.data;
      setCategory(category);
      setRecommendations(recommendations);
      setUploadedImage(uploaded_image);
      setMessage("Upload successful!");
    } catch (error) {
      setMessage("Error uploading image. Please try again.");
      console.error(error);
    }
  };

  // Handle click on recommended image to fetch similar images
  const handleImageClick = async (imagePath) => {
    try {
      setMessage("Fetching similar images...");
      const response = await axios.post("http://localhost:5000/api/get_similar_images", {
        image_path: imagePath,  // Updated to use 'image_path'
      });

      setSimilarImages(response.data.similar_images || []);
      setMessage(""); // Clear the message after fetching similar images
    } catch (error) {
      setMessage("Error fetching similar images. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Upload an Image for Classification and Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Upload Image</button>
      </form>

      {message && <p>{message}</p>}

      {previewImage && (
        <div>
          <h3>Selected Image:</h3>
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
      )}

      {uploadedImage && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
      )}

      {category && (
        <div>
          <h3>Classified Category: {category}</h3>
        </div>
      )}

      {Object.keys(recommendations).length > 0 && (
        <div>
          <h3>Recommended Items from Other Categories:</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
            {Object.keys(recommendations).map((recCategory, index) => (
              <div key={index}>
                <h4>{recCategory}</h4>
                <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                  {recommendations[recCategory].map((filename, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000/${filename}`}  // Ensure URL path is correct
                      alt={`Recommended item ${idx + 1}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                      onClick={() => handleImageClick(filename)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {similarImages.length > 0 && (
        <div>
          <h3>Similar Images:</h3>
          <div>
            {similarImages.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:5000/dataset/${image}`}  // Ensure correct path from backend
                alt={`Similar item ${index + 1}`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
