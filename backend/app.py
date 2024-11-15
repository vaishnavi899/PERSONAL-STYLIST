from flask import Flask, request, jsonify
import os
import numpy as np
import pickle as pkl
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPool2D
from tensorflow.keras.models import Sequential
from numpy.linalg import norm

app = Flask(__name__)

# Load saved models and features
svm_classifier = pkl.load(open("models/category_classifier.pkl", "rb"))
label_encoder = pkl.load(open("models/label_encoder.pkl", "rb"))
database_features = pkl.load(open("features/Images_features.pkl", "rb"))
database_filenames = pkl.load(open("features/filenames.pkl", "rb"))

# Load ResNet50 for feature extraction
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False
model = Sequential([base_model, GlobalMaxPool2D()])

# Function to extract features from an image
def extract_features(image_path, model):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_expand_dim = np.expand_dims(img_array, axis=0)
    img_preprocess = preprocess_input(img_expand_dim)
    result = model.predict(img_preprocess).flatten()
    norm_result = result / norm(result)
    return norm_result

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files.get('photo')
    if not file:
        return jsonify({"message": "No photo uploaded"}), 400

    # Save the uploaded file
    upload_path = os.path.join('uploads', file.filename)
    os.makedirs('uploads', exist_ok=True)  # Ensure the uploads directory exists
    file.save(upload_path)

    # Extract features and classify the image
    category, recommendations = classify_and_recommend(upload_path)

    return jsonify({
        "message": "Photo uploaded successfully",
        "category": category,
        "recommendations": recommendations
    }), 200

def classify_and_recommend(image_path):
    features = extract_features(image_path, model)

    # Classify the image into a category
    category_idx = svm_classifier.predict([features])[0]
    category = label_encoder.inverse_transform([category_idx])[0]

    # Find recommendations for other categories
    other_categories = [cat for cat in label_encoder.classes_ if cat != category]
    recommendations = {}

    for other_category in other_categories:
        indices = [i for i, fname in enumerate(database_filenames) if other_category in fname]
        if not indices:
            continue

        # Get features and filenames for the current category
        category_features = np.array([database_features[i] for i in indices])
        category_filenames = [database_filenames[i] for i in indices]

        # Compute cosine similarity
        similarities = np.dot(category_features, features) / (
            norm(category_features, axis=1) * norm(features)
        )
        top_indices = similarities.argsort()[-3:][::-1]  # Top 3 matches
        recommendations[other_category] = [category_filenames[i] for i in top_indices]

    return category, recommendations

if __name__ == '__main__':
    app.run(debug=True)

