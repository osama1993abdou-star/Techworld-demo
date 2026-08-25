# Banner Images

Add hero and banner images to this folder.

## Required Banner Images

1. **hero-bg.jpg** - Main homepage hero background (1920x1080px)
2. **hero-pattern.svg** - Optional decorative pattern overlay

## Hero Background Requirements

- **Format**: JPG or WebP
- **Dimensions**: 1920x1080px (Full HD)
- **Size**: 200-500KB (optimized)
- **Subject**: Technology-related, professional, modern
- **Style**: Clean, not too busy (text will overlay)

## Content Ideas

Hero background should convey:
- Modern technology
- Professional IT environment
- Innovation and progress
- Business success
- Digital transformation

Good subjects:
- Modern office with technology
- Data center / servers
- Abstract tech patterns
- Business people collaborating
- Clean, minimal tech aesthetic

## Where to Get Images

### Option 1: From Techworld Website
Download hero image from https://www.techworld-it.com

### Option 2: Free Stock Photos
- [Unsplash](https://unsplash.com/)
  - Search: "technology office", "data center", "modern workspace"
- [Pexels](https://www.pexels.com/)
  - Search: "IT infrastructure", "business technology"

### Option 3: Create Custom
- Use Canva or Figma
- Create gradient background with tech elements
- Add subtle patterns or shapes

## Tips for Good Hero Images

1. **Not too dark**: Ensure text is readable
2. **Not too busy**: Avoid cluttered backgrounds
3. **Professional**: High quality, sharp, clear
4. **On-brand**: Matches Techworld blue (#139dd8)
5. **Optimized**: Compress for fast loading

## Image Overlay

The CSS includes a dark overlay (.hero-overlay) that:
- Darkens the background for better text contrast
- Can be adjusted in `css/home.css`
- Default opacity: 0.9 (90%)

So you can use lighter images as the overlay will darken them.

## Optimization

1. **Resize** to exactly 1920x1080px
2. **Compress** using:
   - [TinyJPG](https://tinyjpg.com/)
   - [Squoosh](https://squoosh.app/)
3. **Convert** to WebP for better compression (with JPG fallback)
4. Target file size: 200-300KB

## File Names

```
hero-bg.jpg           ← Main hero background
hero-bg.webp         ← WebP version (optional)
hero-pattern.svg     ← Decorative pattern (optional)
about-banner.jpg     ← About page banner (optional)
services-banner.jpg  ← Services page banner (optional)
```

## Testing

After adding hero image:
1. Open `index.html`
2. Check that image loads
3. Verify text is readable over image
4. Test on different screen sizes
5. Check loading speed

## Current Usage

Hero image is used in:
- `index.html` - Homepage hero section
  ```html
  <div class="hero-background">
    <img src="images/banners/hero-bg.jpg" alt="Technology Background">
  </div>
  ```

Replace with your actual image!

