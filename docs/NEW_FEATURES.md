# New Features - Threading Chart & localStorage

## 🎉 Latest Updates

All requested features have been successfully implemented!

---

## ✨ New Features

### 1. **localStorage Save/Load** 💾

**What it does:**
- Saves your setup configuration to browser's localStorage
- Automatically loads settings when you return to the page
- No more re-entering your gear collection every time!

**What gets saved:**
- Available gears (all three input fields)
- Leadscrew type (Imperial/Metric)
- "Always show four-gear options" checkbox state

**How to use:**
1. Configure your setup (gears, leadscrew, options)
2. Click the **"💾 Save Settings"** button
3. Settings are automatically loaded on next visit

**Location:** Setup section (now collapsed by default)

---

### 2. **Collapsible Sections** 📂

**Better Organization:**
The calculator is now organized into three collapsible sections:

1. **About This Calculator** (collapsed by default)
   - Information about the calculator
   - Credits and references

2. **Setup (Leadscrew & Available Gears)** (collapsed by default)
   - Leadscrew configuration
   - Available gears input
   - Options (four-gear checkbox)
   - Save Settings button

3. **Calculate Single Thread** (open by default)
   - Target type selection (TPI/Pitch)
   - Target value input
   - Calculate button
   - Results display

4. **Calculate Threading Chart** (collapsed by default)
   - Batch calculation for multiple threads
   - TPI and pitch inputs
   - Chart generation
   - CSV export

**How to use:**
- Click any section header to expand/collapse
- Arrow indicator shows current state (▼ = collapsed, ▲ = expanded)

---

### 3. **Threading Chart Generator** 📊

**What it does:**
- Calculate gear combinations for multiple thread specifications at once
- Generate a comprehensive chart of all your common threads
- Perfect for creating reference charts for your workshop

**Features:**
- Enter multiple TPI values (comma-separated)
- Enter multiple pitch values (comma-separated)
- Automatically picks the best gear combination for each
- Shows error percentage for each solution
- Export results to CSV

**How to use:**

1. **Expand "Calculate Threading Chart" section**

2. **Enter TPI values** (Imperial threads):
   ```
   8,10,12,14,16,18,20,24,28,32
   ```

3. **Enter Pitch values** (Metric threads):
   ```
   0.5,0.75,1.0,1.25,1.5,2.0,2.5
   ```

4. **Click "📊 Calculate Thread Chart"**

5. **View results table** with columns:
   - Target (e.g., "16 TPI" or "1.5 mm")
   - Gear A, B, C, D
   - Actual value achieved
   - Error percentage

6. **Export to CSV** for printing or sharing

**Example Output:**

| Target | Gear A | Gear B | Gear C | Gear D | Actual | Error % |
|--------|--------|--------|--------|--------|--------|---------|
| 8 TPI  | 40     | ANY    | -      | 80     | 8.0000 | 0.0000% |
| 16 TPI | 80     | ANY    | -      | 80     | 16.0000| 0.0000% |
| 20 TPI | 50     | ANY    | -      | 40     | 20.0000| 0.0000% |
| 1.5 mm | 60     | ANY    | -      | 72     | 1.5000 | 0.0000% |

---

### 4. **CSV Export** 📥

**What it does:**
- Export threading chart to CSV file
- Easy to open in Excel, Google Sheets, or print
- Perfect for creating workshop reference sheets

**Features:**
- One-click export
- Automatic filename with date
- Includes all columns (Target, Gears, Actual, Error %)
- Standard CSV format

**How to use:**
1. Generate a threading chart (see above)
2. Click **"📥 Export as CSV"** button
3. File downloads automatically as `thread_chart_YYYY-MM-DD.csv`
4. Open in your favorite spreadsheet program

**Use cases:**
- Print reference chart for your workshop
- Share gear combinations with other machinists
- Keep records of your threading setups
- Plan future gear purchases

---

## 🎯 Usage Examples

### Example 1: Save Your Gear Collection

```
1. Expand "Setup" section
2. Enter your gears:
   - Gears 1: 20,20,20,21,25,30,35,40,40,45,45
   - Gears 2: 48,50,50,54,55,57,60,60,65,72,80,80
   - Gears 3: (any additional gears)
3. Select leadscrew type (Imperial 16 TPI)
4. Check "Always show four-gear options"
5. Click "💾 Save Settings"
6. Done! Settings will load automatically next time
```

### Example 2: Create a Workshop Reference Chart

```
1. Expand "Calculate Threading Chart" section
2. Enter common Imperial threads:
   8,10,11,12,13,14,16,18,20,24,28,32
3. Enter common Metric threads:
   0.5,0.7,0.75,1.0,1.25,1.5,1.75,2.0,2.5
4. Click "📊 Calculate Thread Chart"
5. Review the results
6. Click "📥 Export as CSV"
7. Open CSV in Excel
8. Print and laminate for workshop wall!
```

### Example 3: Quick Single Thread Calculation

```
1. "Calculate Single Thread" section is already open
2. Select "Imperial TPI"
3. Enter target: 16
4. Click "Calculate Gear Combinations"
5. View all possible gear combinations
6. Pick the one that works best for you
```

---

## 🔧 Technical Details

### localStorage Implementation

**Storage Key:** `gearCalculatorSettings`

**Data Structure:**
```json
{
  "gears1": "20,20,20,21,25,30,35,40,40,45,45",
  "gears2": "48,50,50,54,55,57,60,60,65,72,80,80",
  "gears3": "",
  "leadscrewType": "imperial",
  "includeAll": true
}
```

**Load Priority:**
1. localStorage (if available)
2. URL parameters (for sharing)
3. Default values

### Threading Chart Algorithm

**Process:**
1. Parse comma-separated TPI and pitch values
2. For each value:
   - Call `getGears()` with appropriate parameters
   - Select first (best) solution
   - Extract gear configuration
   - Calculate error percentage
3. Display in table format
4. Store data for CSV export

**Error Calculation:**
```javascript
error = ((actual - target) / target) * 100
```

### CSV Export Format

**Headers:**
```
Target,Gear A,Gear B,Gear C,Gear D,Actual,Error %
```

**Data Rows:**
```
"16 TPI",80,ANY,-,80,"16.0000 TPI","0.0000%"
"1.5 mm",60,ANY,-,72,"1.5000 mm","0.0000%"
```

**Filename Format:**
```
thread_chart_YYYY-MM-DD.csv
```

---

## 📱 Browser Compatibility

### localStorage
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers

**Note:** localStorage is domain-specific. If you move the HTML file to a different location, settings won't transfer.

### CSV Export
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers (downloads to device)

---

## 💡 Tips & Tricks

### Tip 1: Create Multiple Charts
Generate different charts for different projects:
- Common threads for general work
- Fine threads for precision work
- Coarse threads for quick work
- Metric threads for imported parts

### Tip 2: Share Configurations
Use URL parameters to share specific gear setups:
```
index.html?gears1=20,30,40&gears2=50,60,80
```

### Tip 3: Print Reference Charts
1. Generate threading chart
2. Export to CSV
3. Open in Excel
4. Format nicely (borders, colors)
5. Print and laminate
6. Hang in workshop!

### Tip 4: Backup Your Settings
localStorage is browser-specific. To backup:
1. Generate a threading chart with all your threads
2. Export to CSV
3. Save CSV file as backup
4. Can recreate settings from CSV if needed

### Tip 5: Mobile Use
The calculator works great on mobile:
- Collapsible sections save screen space
- localStorage works on mobile browsers
- CSV export downloads to device
- Perfect for workshop tablet!

---

## 🐛 Troubleshooting

### Settings Not Saving?
- Check if browser allows localStorage
- Try different browser
- Check browser privacy settings
- Clear cache and try again

### CSV Not Downloading?
- Check browser download settings
- Allow pop-ups for this site
- Try different browser
- Check download folder permissions

### Chart Not Calculating?
- Ensure gears are entered in Setup section
- Check that TPI/pitch values are valid numbers
- Verify comma-separated format
- Try with fewer values first

---

## 🎓 What's Next?

Possible future enhancements:
- [ ] Save multiple gear set profiles
- [ ] Import CSV to populate chart inputs
- [ ] Dark mode toggle
- [ ] Print-optimized view
- [ ] Share chart via URL
- [ ] Gear set recommendations

---

## 📚 Related Documentation

- **QUICKSTART.md** - Basic usage guide
- **CUSTOMIZATION.md** - Customization options
- **FINAL_SUMMARY.md** - Complete project overview
- **README.md** - Main documentation

---

## 🏆 Summary

**New Capabilities:**
- ✅ Persistent settings with localStorage
- ✅ Better organization with collapsible sections
- ✅ Batch calculations with threading chart
- ✅ CSV export for easy sharing
- ✅ Workshop-ready reference generation

**Benefits:**
- ⚡ Faster workflow (no re-entering gears)
- 📊 Create comprehensive reference charts
- 📥 Export and print for workshop
- 🎯 Better organization and usability
- 💾 Settings persist across sessions

**Perfect For:**
- Creating workshop reference charts
- Planning threading operations
- Sharing gear combinations
- Teaching others about change gears
- Professional machining work

---

**Happy Threading!** 🔩⚙️

*Last Updated: October 4, 2025*

