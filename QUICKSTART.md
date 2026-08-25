# ⚡ Quick Start Guide - Techworld Website

Get your Techworld website up and running in minutes!

---

## 🎯 What You Have

A complete, modern website with:
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Bilingual support (English/Arabic with RTL)
- ✅ Professional homepage with all sections
- ✅ 8 internal pages (About, Services, Solutions, Blog, Contact, Partners, Power BI, Dynamics 365)
- ✅ Modern CSS with animations
- ✅ JavaScript functionality (navigation, language switcher, forms)
- ✅ SEO optimization
- ✅ Accessible and fast

---

## 🚀 Get Started in 3 Steps

### Step 1: Add Your Content (30-60 minutes)

**Required Actions:**
1. **Download images from techworld-it.com:**
   - Partner logos → `images/partners/`
   - Logo & favicon → `images/`
   - Hero image → `images/banners/`
   - Blog images → `images/blog/`

2. **Update contact information:**
   - Search for `+966 XX XXX XXXX` and replace with actual phone
   - Search for `info@techworld-it.com` (already correct or update if different)
   - Update address in footer and contact page

3. **Replace placeholder content:**
   - Update service descriptions from techworld-it.com
   - Add actual blog posts
   - Update About Us page with company info

**See CONTENT-GUIDE.md for detailed instructions**

---

### Step 2: Test Locally (15 minutes)

**Option A: Simple HTTP Server (Python)**
```bash
# Navigate to project folder
cd demotech

# Start server (Python 3)
python -m http.server 8000

# Open browser to http://localhost:8000
```

**Option B: Live Server (VS Code)**
1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

**Test Checklist:**
- [ ] Homepage loads correctly
- [ ] Click through all navigation links
- [ ] Test language switcher (EN ↔ AR)
- [ ] Try mobile menu (resize browser < 768px)
- [ ] Submit contact form (will show success message)
- [ ] Check all internal pages

---

### Step 3: Deploy (15-30 minutes)

**Easiest Method - Netlify Drag & Drop:**

1. Go to [netlify.com](https://www.netlify.com) and sign up (free)
2. Drag your entire `demotech` folder onto Netlify dashboard
3. Wait 30 seconds - your site is live!
4. Optional: Add custom domain (techworld-it.com)

**See DEPLOYMENT.md for other hosting options**

---

## 📁 Project Structure Quick Reference

```
demotech/
├── index.html              ← Homepage (START HERE)
├── css/                    ← All styles
│   └── main.css           ← Main stylesheet (imports all others)
├── js/                     ← JavaScript
│   ├── main.js            ← Core functionality
│   └── translations.js    ← EN/AR translations
├── images/                 ← ADD YOUR IMAGES HERE
│   ├── logo.png           ← Add company logo
│   ├── favicon-32x32.png  ← Add favicon
│   ├── partners/          ← Add partner logos
│   ├── blog/              ← Add blog images
│   └── banners/           ← Add hero images
├── contact.html            ← Contact page
├── about.html              ← About Us
├── services.html           ← Services
├── solutions.html          ← Solutions
├── blog.html               ← Blog listing
├── partners.html           ← Partners
├── powerbi.html            ← Power BI
└── dynamics365.html        ← Dynamics 365
```

---

## 🎨 Quick Customizations

### Change Brand Color
Edit `css/variables.css`:
```css
:root {
  --primary-color: #139dd8;  /* Change this */
}
```

### Update Logo
Replace these files in `images/`:
- `logo.png` (recommended: 200x50px, transparent PNG)
- `favicon-32x32.png` (32x32px)
- `favicon-16x16.png` (16x16px)

### Add a Blog Post
1. Open `index.html`
2. Find the blog section
3. Copy existing blog card structure
4. Update title, date, image, excerpt
5. Repeat for `pages/blog.html`

### Change Homepage Hero Text
Edit `index.html`, find `.hero-title` and `.hero-description`:
```html
<h1 class="hero-title">Your New Title Here</h1>
<p class="hero-description">Your new description here</p>
```

---

## 🔧 Common Tasks

### Task: Update Footer Links
**File:** `index.html` and all pages in `pages/`
**Find:** `<footer class="footer">`
**Edit:** Links in footer sections

### Task: Add Social Media Links
**File:** `index.html` (footer section)
**Find:** `<div class="footer-social">`
**Edit:** Update `href="#"` to actual URLs

### Task: Configure Contact Form
**File:** `js/main.js`
**Find:** `simulateSubmission` function
**Replace with:** Your actual form submission logic (PHP, serverless, etc.)

### Task: Add Google Analytics
**File:** All HTML files
**Add before `</head>`:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

---

## 🌐 Language Support

### How It Works
- Default: English (LTR - Left to Right)
- Switch to Arabic: Automatically switches to RTL (Right to Left)
- User preference saved in browser

### Add/Edit Translations
**File:** `js/translations.js`

Example:
```javascript
en: {
  nav: {
    home: 'Home',      // English text
    services: 'Services'
  }
},
ar: {
  nav: {
    home: 'الرئيسية',  // Arabic text
    services: 'الخدمات'
  }
}
```

---

## 📱 Mobile Testing

**Quick Test:**
1. Open site in Chrome
2. Press F12 (Developer Tools)
3. Click device icon (Toggle Device Toolbar)
4. Test different screen sizes:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

**Real Device Test:**
- Find your computer's local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Access from phone: `http://YOUR-IP:8000`

---

## ✅ Pre-Launch Checklist

**Must Do:**
- [ ] Add logo and favicon
- [ ] Add partner logos (at least top 5)
- [ ] Update contact info (phone, email)
- [ ] Replace placeholder images
- [ ] Test all links
- [ ] Test on mobile
- [ ] Test language switcher

**Should Do:**
- [ ] Add all partner logos
- [ ] Add 3+ blog posts
- [ ] Update service descriptions
- [ ] Add Google Analytics
- [ ] Configure contact form backend
- [ ] Test in multiple browsers

**Nice to Have:**
- [ ] Add team photos
- [ ] Add more blog content
- [ ] Add case studies/testimonials
- [ ] Configure email newsletter
- [ ] Add live chat

---

## 🆘 Need Help?

### Quick Fixes

**Images not showing?**
```
Check: File path is correct
Check: Image file exists in folder
Check: Spelling and case match exactly
```

**Language switcher not working?**
```
Check: JavaScript console for errors (F12)
Check: js/main.js is loaded
Clear: Browser cache and refresh
```

**Mobile menu stuck?**
```
Refresh: Page
Clear: Browser cache
Check: JavaScript console for errors
```

### Documentation
- **Full Documentation:** README.md
- **Content Collection:** CONTENT-GUIDE.md
- **Deployment:** DEPLOYMENT.md
- **This Guide:** QUICKSTART.md

### Support
- **Email:** info@techworld-it.com
- **Website:** www.techworld-it.com

---

## 🎉 You're Ready!

Your website is production-ready. Just add your content and deploy!

**Recommended Timeline:**
- Day 1: Add images and update contact info (1-2 hours)
- Day 2: Test thoroughly and fix any issues (2-3 hours)
- Day 3: Deploy to hosting and configure domain (1-2 hours)
- Day 4: Monitor and final adjustments (1 hour)

**Total time: ~6-8 hours of work**

---

## 📊 What's Included

| Feature | Status |
|---------|--------|
| Responsive Design | ✅ Complete |
| Homepage | ✅ Complete |
| About Page | ✅ Complete |
| Services Page | ✅ Complete |
| Solutions Page | ✅ Complete |
| Blog Page | ✅ Complete |
| Contact Page | ✅ Complete |
| Partners Page | ✅ Complete |
| Power BI Page | ✅ Complete |
| Dynamics 365 Page | ✅ Complete |
| Language Switcher (EN/AR) | ✅ Complete |
| Mobile Navigation | ✅ Complete |
| Contact Form | ✅ Complete (needs backend) |
| SEO Optimization | ✅ Complete |
| Performance Optimized | ✅ Complete |
| Accessibility | ✅ Complete |

---

## 🚀 Next Steps

1. **Review** this entire guide
2. **Follow** Step 1, 2, 3 above
3. **Check** Pre-Launch Checklist
4. **Deploy** your website
5. **Celebrate!** 🎉

---

**Pro Tip:** Bookmark this file - you'll reference it often during setup!

**Good luck! Your beautiful new website is almost ready to go live! 🌟**

