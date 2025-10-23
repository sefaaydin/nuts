# 🌰 Mega Kuruyemiş - Premium Turkish Nuts & Dried Fruits Website

Modern, warm, and appetizing website design for a Turkish nuts and dried fruits brand.

## 🎨 Design Features

### Visual Style
- **Color Palette**: Earthy tones with brown, beige, cream, and warm orange/red accents
- **Typography**: Playfair Display (serif) for headings, Inter (sans-serif) for body text
- **Theme**: Natural, rustic, yet elegant aesthetic
- **Textures**: Subtle patterns and gradients for depth

### Sections

#### 📍 Header
- Fixed top navigation with white background
- Logo and main menu (Home, About, Products, News, Gallery, Contact)
- Smooth scroll navigation
- Responsive hamburger menu for mobile

#### 🎯 Hero Section
- Large high-resolution product imagery
- Gradient orange-red background
- Animated floating nut decorations
- Call-to-action button

#### 📖 About Section
- Side-by-side layout (image + text)
- Brush-stroke style image masks
- Feature highlights with icons
- Slide-in animations

#### 🛍️ Products Section
- 3-4 column grid layout
- Product cards with hover effects
- Badge system (Premium, Fresh, Popular, Bestseller)
- Smooth transitions

#### 📰 News Section
- Card-based layout
- Featured images with overlay effects
- Date stamps and read more links

#### 🖼️ Gallery Section
- Grid layout with equal-sized images
- Click to enlarge modal functionality
- Hover overlay effects

#### 📞 Contact Section
- Contact information display
- Working contact form with validation
- Success notifications

#### 🔗 Footer
- Company information
- Quick links navigation
- Mini gallery preview
- Social media icons
- Soft beige/brown background

## ✨ Interactive Features

### Animations
- Fade-in effects on page load
- Slide-in animations on scroll
- Hover transformations on cards
- Smooth scroll between sections
- Parallax effects on hero section

### User Experience
- Active navigation highlighting based on scroll position
- Ripple effects on buttons
- Modal gallery viewer
- Form submission notifications
- Mobile-responsive hamburger menu

## 🚀 Getting Started

### Installation

Simply open the `index.html` file in any modern web browser:

```bash
# Option 1: Direct file opening
open index.html

# Option 2: Using a local server (recommended)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Using VS Code Live Server
# Right-click on index.html and select "Open with Live Server"
```

### File Structure

```
/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Interactive features and animations
└── README.md           # This file
```

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌟 Key Technologies

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Custom Properties, Animations
- **JavaScript (ES6+)**: Intersection Observer, Event Listeners
- **Google Fonts**: Playfair Display & Inter

## 🎨 Color Scheme

```css
Primary Brown:   #8B4513
Dark Brown:      #5C3317
Light Brown:     #A0826D
Beige:           #F5E6D3
Cream:           #FFF8F0
Warm Orange:     #E87722
Warm Red:        #C74528
```

## 📝 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-brown: #8B4513;
    --warm-orange: #E87722;
    /* ... more variables */
}
```

### Adding Products

Add new product cards in the `products-grid` section of `index.html`:

```html
<div class="product-card fade-up">
    <div class="product-image">
        <img src="your-image.jpg" alt="Product name">
        <div class="product-badge">Badge</div>
    </div>
    <div class="product-content">
        <h3>Product Name</h3>
        <p>Product Description</p>
    </div>
</div>
```

## 🔧 Performance Optimizations

- Lazy loading for images
- Intersection Observer for scroll animations
- Optimized CSS with minimal repaints
- Efficient event listeners
- Smooth scroll behavior

## 📄 License

This project is created for Mega Kuruyemiş brand. All rights reserved.

## 💡 Future Enhancements

- E-commerce functionality
- Multi-language support (TR/EN)
- Product filtering and search
- Shopping cart integration
- Customer reviews section
- Blog/recipe section
- Newsletter subscription

---

**Designed with ❤️ for natural taste**

🌰 Mega Kuruyemiş - Where Quality Meets Tradition
