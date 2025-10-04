# Mini-Lathe Change Gear Calculator

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modernized, offline-capable web calculator for determining change gear combinations on 7x12 mini-lathes (like the Sieg SC2).

## 🌐 Live Demo

**Try it now:** [https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/](https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/)

No installation needed - just click and use!

## 🎯 Features

- **Fully Offline**: Works completely without internet connection
- **Modern Design**: Clean, responsive interface that works on all devices
- **Fast & Lightweight**: No external dependencies, loads instantly
- **Mobile-Friendly**: Optimized for phones, tablets, and desktops
- **Dual Mode**: Supports both metric (mm pitch) and imperial (TPI) calculations
- **Flexible Input**: Handles both 1.5mm pitch and 16 TPI leadscrews
- **Smart Optimization**: Intelligently minimizes gear changes across threading charts
- **Threading Chart Generator**: Create comprehensive reference charts for your workshop
- **CSV Export**: Export charts for printing or spreadsheet use
- **Persistent Settings**: Saves your gear collection and preferences

## 🚀 Quick Start

### Online (Easiest)

Just visit: **[https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/](https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/)**

### Offline

1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. Works completely offline - no internet required!

### Using the Calculator

1. Enter your available gear tooth counts (comma-separated)
2. Select your leadscrew type (metric 1.5mm or imperial 16 TPI)
3. Choose single thread calculation or generate a full threading chart
4. View optimized gear combinations
5. Export charts as CSV for your workshop

That's it! No installation, no server, no dependencies.

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

## 🚀 Deployment

This calculator is hosted on **GitHub Pages** and automatically deploys when you push to the `main` branch.

**Live URL:** [https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/](https://lgggreg.github.io/Lathe-Thread-Gear-Chart-Generator/)

### How It Works

1. Push changes to `main` branch
2. GitHub automatically builds and deploys
3. Site updates in 1-2 minutes
4. No server configuration needed!

See [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) for detailed setup instructions.

## 🤝 Credits

- **Original Algorithm**: Al Harral ([varmintal.com](http://www.varmintal.com/alath.htm))
- **Original Web Version**: A. S. Budden (CGTK.co.uk)
- **Modernization**: 2025 update for offline use and modern web standards

## 📄 License

This tool is free for personal and commercial use. The original algorithm is based on Al Harral's GEARS.BAS.

---

**Happy Threading!** 🔩⚙️
