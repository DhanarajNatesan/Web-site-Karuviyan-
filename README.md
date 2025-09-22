# KARUVIYAAN - Hero Section

A modern, interactive hero section for KARUVIYAAN with the specified design requirements and color theme.

## 🎨 Design Features

### Color Theme
- **Primary Color**: `#6C55F9` (Purple)
- **Secondary Color**: `#898798` (Gray)
- **Background**: Dark theme with gradient overlays

### Hero Section Components

1. **Background Video/Image**
   - Large, high-quality hero video loop
   - Fallback background image support
   - Gradient overlay for better text readability

2. **Interactive Elements**
   - Canvas-based particle system with cursor interaction
   - Floating mechanical parts (gears, pistons, springs)
   - Custom cursor effects
   - Parallax scrolling effects

3. **Content**
   - **Headline**: "Devising Solutions"
   - **Subheadline**: "Ignite the most powerful ideas you have ever built for our people."
   - **CTA Buttons**: "Get a Quote" and "Explore Services"

4. **Animations**
   - Fade-in animations for content
   - Glowing text effects
   - Hover animations for buttons
   - Ripple effects on button clicks
   - Floating shape animations

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. For development, use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

## 📁 File Structure

```
KARUVIYAAN/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript interactions and effects
└── README.md           # This file
```

## 🎯 Customization

### Changing Colors
Update the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6C55F9;    /* Your primary color */
    --secondary-color: #898798;  /* Your secondary color */
}
```

### Updating Content
Modify the content in `index.html`:
```html
<h1 class="hero-headline">Your Headline</h1>
<p class="hero-subheadline">Your subheadline text</p>
<button class="cta-button primary">Your CTA Text</button>
```

### Background Video
Replace the video source in `index.html`:
```html
<video autoplay muted loop playsinline class="hero-video">
    <source src="path/to/your/video.mp4" type="video/mp4">
</video>
```

### Adding Your Own Background Image
If you prefer an image instead of video:
```html
<div class="hero-background">
    <img src="path/to/your/image.jpg" alt="Hero Background" class="hero-image">
    <div class="hero-overlay"></div>
</div>
```

## 🔧 Technical Features

### Interactive Canvas
- Particle system with 50 animated particles
- Mouse interaction that repels particles
- Dynamic connections between nearby particles
- Responsive to window resizing

### Mechanical Parts Animation
- Rotating gears, pistons, and springs
- Random positioning and movement
- Bounce effects off screen edges
- Low opacity for subtle background effect

### Cursor Effects
- Custom cursor with brand colors
- Scale animation on button hover
- Color change on interactive elements

### Performance Optimizations
- RequestAnimationFrame for smooth animations
- Efficient particle rendering
- Responsive design for all screen sizes
- Optimized CSS animations

## 📱 Responsive Design

The hero section is fully responsive and includes:
- Mobile-first design approach
- Flexible typography using `clamp()`
- Adaptive button layouts
- Hidden floating elements on mobile
- Touch-friendly interactions

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Animation Classes

### Available CSS Animations
- `fadeInUp`: Content entrance animation
- `glow`: Text glow effect
- `float`: Floating shape animation
- `ripple`: Button click effect

### JavaScript Classes
- `InteractiveCanvas`: Particle system
- `MechanicalParts`: Mechanical animations
- `CursorEffects`: Custom cursor
- `ParallaxEffect`: Scroll effects

## 🔍 SEO & Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- ARIA labels for interactive elements
- Keyboard navigation support

## 📝 License

This project is created for KARUVIYAAN. Feel free to modify and use according to your needs.

## 🤝 Contributing

To enhance this hero section:
1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or customization requests, please contact the development team.

---

**Built with ❤️ for KARUVIYAAN** 