// src/components/ImageUploader.js
import React from 'react';

const ImageUploader = ({ onFileChange }) => {
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={e => onFileChange(e.target.files[0])}
            />
        </div>
    );
};

export default ImageUploader;
