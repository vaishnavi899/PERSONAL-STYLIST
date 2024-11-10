import sys
import json
import numpy as np
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.layers import GlobalAveragePooling2D
import os

# Set up model for feature extraction (only load the model once)
base_model = ResNet50(weights='imagenet', include_top=False)
x = base_model.output
x = GlobalAveragePooling2D()(x)
model = Model(inputs=base_model.input, outputs=x)

# Function to extract features from an image
def extract_features(img_path):
    # Check if the file exists
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"The image file {img_path} was not found.")

    # Load the image and convert it to the correct format for ResNet50
    try:
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
    except Exception as e:
        raise ValueError(f"Error processing the image {img_path}: {str(e)}")
    
    # Extract features
    features = model.predict(img_array)
    return features.flatten()  # Flatten the features to a 1D vector

# Main block that runs when the script is called
if __name__ == "__main__":
    # Get the image path from the command-line arguments
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Please provide the image path as an argument."}))
        sys.exit(1)

    img_path = sys.argv[1]
    
    try:
        # Extract features from the image
        features = extract_features(img_path)
        
        # Return the extracted features as a JSON object
        result = {"features": features.tolist()}
        print(json.dumps(result))  # Ensure valid JSON output
    
    except FileNotFoundError as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
    except ValueError as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": f"An error occurred: {str(e)}"}))
        sys.exit(1)



