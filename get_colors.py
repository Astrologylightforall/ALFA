from PIL import Image
import sys

try:
    img = Image.open(r"c:\Users\pc\Desktop\ALFA\clientLogo (2).png")
    img = img.convert('RGB')
    color_dict = {}
    
    # Resize for faster processing
    img.thumbnail((100, 100))
    
    for x in range(img.width):
        for y in range(img.height):
            pixel = img.getpixel((x, y))
            # Ignore Absolute Black/White with very high thresholds if they are borders
            color_dict[pixel] = color_dict.get(pixel, 0) + 1
            
    # Sort by frequency
    sorted_colors = sorted(color_dict.items(), key=lambda x: x[1], reverse=True)
    
    print("Dominant Colors (RGB):")
    for (r, g, b), count in sorted_colors[:8]:
        hex_color = '#{:02x}{:02x}{:02x}'.format(r, g, b)
        print(f"RGB: ({r}, {g}, {b}) -> HEX: {hex_color} -> Count: {count}")
        
except Exception as e:
    print(f"Error analyzing image: {e}")
