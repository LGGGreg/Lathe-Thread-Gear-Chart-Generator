# Mini-Lathe Change Gear Calculator

A modernized, offline-capable web calculator for determining change gear combinations on 7x12 mini-lathes (like the Sieg SC2).

## 🎯 Features

- **Fully Offline**: Works completely without internet connection
- **Modern Design**: Clean, responsive interface that works on all devices
- **Fast & Lightweight**: No external dependencies, loads instantly
- **Mobile-Friendly**: Optimized for phones, tablets, and desktops
- **Dual Mode**: Supports both metric (mm pitch) and imperial (TPI) calculations
- **Flexible Input**: Handles both 1.5mm pitch and 16 TPI leadscrews

## 🚀 Quick Start

1. Open `index.html` in any modern web browser
2. Enter your available gear tooth counts (comma-separated)
3. Select your leadscrew type and target thread specification
4. Click "Calculate Gear Combinations"
5. View all possible gear arrangements

That's it! No installation, no internet required.

## 📁 File Structure

```
Mini Lath Web Calc/
├── index.html              # Main calculator page (modernized)
├── css/
│   └── styles.css         # Modern, consolidated styles
├── js/
│   └── calculator.js      # ES6+ calculator logic
├── images/
│   ├── change_gears.webp  # Gear configuration diagram
│   └── logo-50px.webp     # Logo image
├── README.md              # This file
└── CGTK - Mini-Lathe Change Gear Calculator.htm  # Original (archived)
```

## 🔧 How It Works

The calculator uses the same proven algorithm from Al Harral's GEARS.BAS:

1. **Two-Gear Solutions**: First attempts simple A-D gear combinations
2. **Four-Gear Solutions**: If needed, calculates compound A-B-C-D arrangements
3. **Validation**: Checks gear fit constraints and shaft reach requirements
4. **Precision**: Matches target within 0.2% tolerance

### Gear Positions

- **Gear A**: Driver gear mounted on the spindle
- **Gear B**: First idler gear (optional)
- **Gear C**: Second idler gear (optional)
- **Gear D**: Driven gear on the leadscrew

## 💡 Usage Tips

### Default Gear Sets

The calculator comes pre-loaded with common mini-lathe gear sets:
- **Set 1**: 20, 20, 30, 35, 40, 40, 45
- **Set 2**: 50, 55, 57, 60, 65, 80, 80

You can modify these to match your actual gear collection.

### Understanding Results

- **"ANY" in Gear B**: Any idler gear will work for that solution
- **Empty cells**: That gear position is not used
- **Actual Value**: The precise pitch/TPI you'll achieve (usually very close to target)

### URL Parameters

The calculator supports URL parameters for easy sharing:
```
index.html?gears1=20,30,40&gears2=50,60,80&gears3=
```

## 🎨 Modernization Changes

This version has been completely modernized from the original:

### ✅ What's New

- **Clean HTML5**: Removed 3000+ lines of DarkReader pollution and legacy markup
- **Modern JavaScript**:
  - ES6+ class-based architecture
  - No jQuery dependency
  - Vanilla JS DOM manipulation
  - Arrow functions and modern syntax
- **Simplified CSS**:
  - Consolidated from 5+ files to 1 clean stylesheet
  - Removed 2000+ lines of unused styles
  - Modern flexbox/grid layouts
  - CSS custom properties ready
- **Better UX**:
  - Improved mobile responsiveness
  - Clearer form labels and instructions
  - Better error messages
  - Accessible design
- **Offline-First**:
  - No Google Fonts CDN
  - No external CSS/JS libraries
  - All assets local
  - Works without internet

### 📦 What Was Removed

- External navigation to cgtk.co.uk
- DarkReader browser extension styles
- Duplicate jQuery includes
- FontAwesome icons (not needed)
- Unused template CSS
- PayPal donation buttons
- External RSS/Atom feeds

### 🔄 What Stayed

- **Core Algorithm**: 100% faithful to Al Harral's GEARS.BAS logic
- **Calculation Accuracy**: Identical results to original
- **Gear Constraints**: Same validation rules
- **URL Parameters**: Backward compatible

## 🌐 Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**No Internet Explorer support** (it's 2025, time to upgrade!)

## 🤝 Credits

- **Original Algorithm**: Al Harral ([varmintal.com](http://www.varmintal.com/alath.htm))
- **Original Web Version**: A. S. Budden (CGTK.co.uk)
- **Modernization**: 2025 update for offline use and modern web standards

## 📄 License

This tool is free for personal and commercial use. The original algorithm is based on Al Harral's GEARS.BAS.

---

**Happy Threading!** 🔩⚙️
