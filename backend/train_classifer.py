import os
import pickle
import numpy as np
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.layers import GlobalMaxPool2D
from tensorflow.keras.models import Sequential
from numpy.linalg import norm

# Define directories
dataset_dir = "dataset"  # Dataset directory with subfolders for each category
categories = ["bottomwear", "topwear", "shoes", "accessories"]  # Update as needed
features_dir = "features"
models_dir = "models"

# Ensure the directories exist
os.makedirs(features_dir, exist_ok=True)
os.makedirs(models_dir, exist_ok=True)

# Load ResNet50 for feature extraction
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
base_model.trainable = False
model = Sequential([base_model, GlobalMaxPool2D()])

def extract_features(img_path):
    """Extract features from an image using ResNet50."""
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    features = model.predict(img_array).flatten()
    return features / norm(features)

# Prepare training data
X_train = []  # Features
y_train = []  # Labels

for category in categories:
    category_dir = os.path.join(dataset_dir, category)
    for img_name in os.listdir(category_dir):
        img_path = os.path.join(category_dir, img_name)
        try:
            features = extract_features(img_path)
            X_train.append(features)
            y_train.append(category)
        except Exception as e:
            print(f"Error processing image {img_name}: {e}")

# Convert to numpy arrays
X_train = np.array(X_train)
y_train = np.array(y_train)

# Encode labels
label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)

# Train the SVM classifier
svm_classifier = SVC(kernel='linear', probability=True)
svm_classifier.fit(X_train, y_train_encoded)

# Save the models
with open(os.path.join(models_dir, 'category_classifier.pkl'), 'wb') as f:
    pickle.dump(svm_classifier, f)

with open(os.path.join(models_dir, 'label_encoder.pkl'), 'wb') as f:
    pickle.dump(label_encoder, f)

print("Training complete. Models saved in the 'models/' directory.")
