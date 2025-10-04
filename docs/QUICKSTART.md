# Quick Start Guide

## 🚀 Get Started in 30 Seconds

### Step 1: Open the Calculator
Double-click `index.html` or drag it into your web browser.

### Step 2: Enter Your Gears
In the "Available Gears" fields, enter your gear tooth counts separated by commas:
```
Field 1: 20,20,30,35,40,40,45
Field 2: 50,55,57,60,65,80,80
Field 3: (optional additional gears)
```

### Step 3: Set Your Target
1. Choose your leadscrew type (Metric 1.5mm or Imperial 16 TPI)
2. Choose target type (Metric Pitch or Imperial TPI)
3. Enter your desired thread pitch or TPI

### Step 4: Calculate
Click "Calculate Gear Combinations" and view your results!

---

## 📖 Common Use Cases

### Example 1: Cutting Metric Threads
**Goal**: Cut M6 threads (1.0mm pitch) on a metric lathe

1. Leadscrew: ✓ Metric (1.5 mm pitch)
2. Available Gears: 20,20,30,35,40,40,45,50,55,57,60,65,80,80
3. Target Type: ✓ Metric Pitch
4. Target Pitch: `1.0` mm
5. Click Calculate

**Result**: You'll see gear combinations like:
- Gear A: 40, Gear B: ANY, Gear C: -, Gear D: 60 → 1.0mm

### Example 2: Cutting Imperial Threads
**Goal**: Cut 16 TPI threads on an imperial lathe

1. Leadscrew: ✓ Imperial (16 tpi)
2. Available Gears: 20,20,30,35,40,40,45,50,55,57,60,65,80,80
3. Target Type: ✓ Imperial TPI
4. Target TPI: `16`
5. Click Calculate

**Result**: Simple solution with matching gears

### Example 3: Cutting Metric on Imperial Lathe
**Goal**: Cut 1.5mm pitch threads on a 16 TPI lathe

1. Leadscrew: ✓ Imperial (16 tpi)
2. Available Gears: 20,20,30,35,40,40,45,50,55,57,60,65,80,80
3. Target Type: ✓ Metric Pitch
4. Target Pitch: `1.5` mm
5. Click Calculate

**Result**: Four-gear compound solutions

---

## 🎓 Understanding Results

### Reading the Table

| Gear A | Gear B | Gear C | Gear D | Actual TPI |
|--------|--------|--------|--------|------------|
| 80     | ANY    | -      | 65     | 13         |
| 40     | 30     | 60     | 65     | 13         |

**Gear A**: Mounts on the spindle (driver)
**Gear B**: First idler (if needed) - "ANY" means any gear works
**Gear C**: Second idler (if needed) - "-" means not used
**Gear D**: Mounts on leadscrew (driven)
**Actual Value**: The precise result you'll get

### Two-Gear vs Four-Gear

**Two-Gear (Simple)**
```
Spindle → [A] → [D] → Leadscrew
```
- Faster to set up
- Fewer gears needed
- Direct drive

**Four-Gear (Compound)**
```
Spindle → [A] → [B] → [C] → [D] → Leadscrew
```
- More gear combinations possible
- Can achieve ratios impossible with two gears
- Requires idler gears

---

## 💡 Pro Tips

### Tip 1: Start Simple
Always check "two-gear" solutions first. They're easier to set up and less prone to error.

### Tip 2: Duplicate Gears
If you have multiple gears of the same size, list them multiple times:
```
20,20,40,40,80,80
```
This tells the calculator you can use them in different positions.

### Tip 3: URL Bookmarks
The calculator saves your gear list in the URL. Bookmark it for quick access:
```
index.html?gears1=20,30,40&gears2=50,60,80
```

### Tip 4: Check "Always Show Four-Gear"
If you want to see ALL possible combinations (not just the simplest), check this option.

### Tip 5: Verify Fit
The calculator checks mathematical fit, but always verify:
- Gears don't collide
- You have the physical gears
- Gears reach between shafts

---

## 🔧 Troubleshooting

### "Could not find any gear combinations"
**Causes**:
- Target is impossible with your gear set
- Target is too far from what's achievable
- Not enough gears entered

**Solutions**:
- Try a different target value
- Add more gears to your collection
- Check if you entered gears correctly

### Results seem wrong
**Check**:
- Leadscrew type is correct (metric vs imperial)
- Target type matches (pitch vs TPI)
- Gears are entered as tooth counts (not diameters)

### Calculator doesn't load
**Check**:
- Using a modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript is enabled
- Files are in correct folders (css/, js/, images/)

---

## 📱 Mobile Use

The calculator works great on phones and tablets:

1. **Landscape Mode**: Recommended for viewing results table
2. **Zoom**: Pinch to zoom if text is small
3. **Bookmark**: Add to home screen for quick access

---

## 🎯 Next Steps

Once you're comfortable with basics:

1. **Read the full README.md** for detailed information
2. **Check CHANGELOG.md** to see what's new
3. **Experiment** with different gear combinations
4. **Share** the calculator with fellow machinists

---

## ❓ FAQ

**Q: Does this work offline?**
A: Yes! 100% offline after first load.

**Q: Can I use this on my phone?**
A: Absolutely! It's fully responsive.

**Q: Are the results accurate?**
A: Yes, uses the same proven algorithm as Al Harral's GEARS.BAS.

**Q: Can I modify the code?**
A: Yes! It's open source. See js/calculator.js.

**Q: What if I have different gears?**
A: Just enter your actual gear tooth counts.

**Q: Why "ANY" for Gear B?**
A: In two-gear solutions, the idler doesn't affect the ratio.

---

## 🆘 Need Help?

1. Check the **Instructions** section in the calculator
2. Read the **README.md** for detailed docs
3. Review **CHANGELOG.md** for recent changes
4. Search mini-lathe forums for threading help

---

**Happy Threading!** 🔩

*Remember: Measure twice, cut once!*

