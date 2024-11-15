import torch
import torch.nn as nn

class TryOnModel(nn.Module):
    def __init__(self):
        super(TryOnModel, self).__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
        )
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1),
            nn.ReLU(),
            nn.ConvTranspose2d(64, 3, kernel_size=4, stride=2, padding=1),
            nn.Sigmoid(),
        )

    def forward(self, base_image, clothing_image):
        base_encoding = self.encoder(base_image)
        clothing_encoding = self.encoder(clothing_image)
        
        combined = base_encoding + clothing_encoding
        generated_image = self.decoder(combined)
        
        return generated_image
