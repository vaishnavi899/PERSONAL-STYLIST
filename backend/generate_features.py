import os
import pickle as pkl
import numpy as np
import tensorflow as tf  # Import TensorFlow here
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPool2D
from numpy.linalg import norm

# Load the ResNet50 model
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False
model = tf.keras.models.Sequential([base_model, GlobalMaxPool2D()])

# Dataset directory
dataset_dir = "dataset"
categories = ["bottomwear", "topwear", "shoes", "accessories"]

# Extract features
features = []
filenames = []

for category in categories:
    category_path = os.path.join(dataset_dir, category)
    for file_name in os.listdir(category_path):
        file_path = os.path.join(category_path, file_name)
        img = image.load_img(file_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_expand_dim = np.expand_dims(img_array, axis=0)
        img_preprocessed = preprocess_input(img_expand_dim)
        feature_vector = model.predict(img_preprocessed).flatten()
        feature_vector_normalized = feature_vector / norm(feature_vector)

        features.append(feature_vector_normalized)
        filenames.append(f"{category}/{file_name}")

# Save features and filenames
os.makedirs("features", exist_ok=True)

with open("features/Images_features.pkl", "wb") as f:
    pkl.dump(features, f)

with open("features/filenames.pkl", "wb") as f:
    pkl.dump(filenames, f)

print("Feature extraction complete. Saved to 'features/Images_features.pkl' and 'features/filenames.pkl'.")
