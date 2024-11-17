from flask import Flask, request, jsonify, send_from_directory
import os
import pickle as pkl
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS
import random

# Flask app setup
app = Flask(__name__, static_folder="client/build", static_url_path="")
CORS(app, origins=["http://localhost:3000"])

# Paths for dataset and uploaded images
UPLOAD_FOLDER = 'uploads'
DATASET_FOLDER = 'dataset'

# Load models and features
try:
    svm_classifier = pkl.load(open("models/category_classifier.pkl", "rb"))
    label_encoder = pkl.load(open("models/label_encoder.pkl", "rb"))
    database_features = pkl.load(open("features/Images_features.pkl", "rb"))
    database_filenames = pkl.load(open("features/filenames.pkl", "rb"))
    print("Models and features loaded successfully.")
except Exception as e:
    print(f"Error loading models or features: {e}")

# Feature extraction model
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False
model = tf.keras.models.Sequential([base_model, tf.keras.layers.GlobalMaxPool2D()])

# Function to extract features from images
def extract_features_from_images(image_path, model):
    try:
        img = load_img(image_path, target_size=(224, 224))
        img_array = img_to_array(img)
        img_expand_dim = np.expand_dims(img_array, axis=0)
        img_preprocess = preprocess_input(img_expand_dim)
        result = model.predict(img_preprocess).flatten()
        normalized_result = result / np.linalg.norm(result)
        print(f"Features extracted for {image_path}")
        return normalized_result
    except Exception as e:
        print(f"Error in feature extraction: {e}")
        raise

# Function for classification and recommendations
def classify_and_recommend(image_path, model, classifier, encoder, db_features, db_filenames):
    try:
        # Extract features from the uploaded image
        features = extract_features_from_images(image_path, model)

        # Predict the category using SVM
        category_idx = classifier.predict([features])[0]
        category = encoder.inverse_transform([category_idx])[0]
        print(f"Predicted category: {category}")

        # Generate recommendations from other categories
        other_categories = [cat for cat in encoder.classes_ if cat != category]
        recommendations = {}

        for other_category in other_categories:
            category_folder = os.path.join(DATASET_FOLDER, other_category)
            
            if not os.path.exists(category_folder):
                print(f"Category folder not found: {category_folder}")
                continue

            category_filenames = [
                f for f in os.listdir(category_folder)
                if f.lower().endswith(('.jpg', '.jpeg', '.png'))
            ]

            if not category_filenames:
                print(f"No images found in category folder: {category_folder}")
                continue

            random_filenames = random.sample(category_filenames, min(3, len(category_filenames)))
            recommendations[other_category] = [
                f"dataset/{other_category}/{filename}" for filename in random_filenames
            ]

            print(f"Recommendations for {other_category}: {recommendations[other_category]}")

        if not recommendations:
            print("No recommendations were generated.")
        return category, recommendations
    except Exception as e:
        print(f"Error in classify_and_recommend: {e}")
        raise

# API route for uploading image and getting recommendations
@app.route('/api/upload', methods=['POST'])
def upload_image():
    if 'photo' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['photo']
    if file.filename == '':
        return jsonify({"error": "No selected file"}).jsonify(), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    file.save(file_path)
    
    try:
        category, recommendations = classify_and_recommend(
            file_path, model, svm_classifier, label_encoder, database_features, database_filenames
        )
        response = {
            "category": category,
            "recommendations": recommendations,
            "uploaded_image": f"http://localhost:5000/uploads/{file.filename}"
        }
        return jsonify(response)
    except Exception as e:
        print(f"Error during image upload: {e}")
        return jsonify({"error": f"An error occurred during processing: {e}"}), 500

# Route to serve uploaded images
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Route to serve dataset images
@app.route('/dataset/<path:filename>')
def dataset_file(filename):
    return send_from_directory(DATASET_FOLDER, filename)

@app.route('/api/get_similar_images', methods=['POST'])
def get_similar_images():
    data = request.get_json()

    # Debug: Log the incoming request data
    print(f"Received data: {data}")

    image_path = data.get('image_path')

    if not image_path:
        print("No image path provided")
        return jsonify({"error": "No image path provided"}), 400

    try:
        # Extract features of the uploaded image
        uploaded_image_features = extract_features_from_images(image_path, model)

        # Calculate similarity with the images in your database
        similarities = cosine_similarity([uploaded_image_features], database_features)

        # Get the indices of the most similar images
        similar_indices = similarities[0].argsort()[-5:][::-1]  # Top 5 most similar images

        # Retrieve filenames of the most similar images
        similar_images = [database_filenames[idx] for idx in similar_indices]

        # Return the list of similar images in the response
        return jsonify({"similar_images": similar_images})
    except Exception as e:
        print(f"Error in get_similar_images: {e}")
        return jsonify({"error": "An error occurred while fetching similar images"}), 500


# Serve React frontend (production build)
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
