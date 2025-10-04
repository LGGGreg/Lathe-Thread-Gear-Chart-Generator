# Test Suite for Gear Calculator

This directory contains automated tests for the Mini-Lathe Change Gear Calculator.

## Files

- **test-algorithm.html** - Browser-based interactive test suite
- **run-tests.js** - Command-line test runner using Puppeteer
- **README.md** - This file

## Running Tests

### Option 1: Browser (Interactive)

Open `test-algorithm.html` in your browser:

```bash
# Windows
start tests/test-algorithm.html

# Or use npm script
npm run test:browser
```

Click "▶️ Run All Tests" to execute the test suite.

### Option 2: Command Line (Automated)

Run tests from the command line:

```bash
# First time: Install dependencies
npm install

# Run tests
npm test

# Or directly
node tests/run-tests.js
```

## Test Coverage

### 1. 2-Gear Detection Tests
- Verifies correct detection of 2-gear solutions `[ga, null, null, gd]`
- Tests with real calculator output
- Ensures 4-gear solutions are not misidentified

### 2. Scoring Algorithm Tests
- Verifies +10M bonus applied to 2-gear solutions
- Confirms 2-gear solutions score higher than 4-gear
- Tests frequency and reuse bonuses

### 3. Optimization Tests
- Tests full optimization with multiple threads
- Verifies 2-gear preference in real scenarios
- Checks that optimization selects best solutions

## Expected Results

All tests should **PASS** ✓

Typical output:
```
✓ PASS: 2-gear solution correctly detected
✓ PASS: At least one 2-gear solution found
✓ PASS: 2-gear solution correctly identified
✓ PASS: 2-gear bonus applied (+10M points)
✓ PASS: 2-gear scores higher than 4-gear
✓ PASS: At least some 2-gear solutions selected
```

## Test Output

### Browser
- Visual pass/fail indicators (green/red)
- Detailed logs with gear structures
- Interactive controls

### Command Line
- Colored terminal output
- Summary statistics
- Exit code 0 (pass) or 1 (fail)

## Adding New Tests

To add a new test:

1. Open `test-algorithm.html`
2. Add a new test function:
```javascript
function testMyFeature() {
    clearResults();
    log('=== Testing My Feature ===', 'info');
    
    // Your test code here
    assert(condition, 'Description of what should be true');
    
    return { /* optional results */ };
}
```
3. Add button in HTML:
```html
<button onclick="testMyFeature()">🔧 Test My Feature</button>
```
4. Add to `runAllTests()` if needed

## Troubleshooting

### Puppeteer Not Installed
```bash
npm install --save-dev puppeteer
```

### Tests Fail in Browser but Pass in CLI (or vice versa)
- Check browser console for errors
- Ensure calculator.js is loaded correctly
- Verify file paths are correct

### All Tests Fail
- Check that calculator.js has the latest fixes
- Verify 2-gear detection uses `=== null` not `=== undefined`
- Ensure optimization algorithm is present

## CI/CD Integration

To integrate with CI/CD:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm install

- name: Run tests
  run: npm test
```

## Performance

- Browser tests: ~1 second
- Command-line tests: ~3-5 seconds (includes browser startup)
- Total test count: ~10-15 assertions

## Future Improvements

- [ ] Add tests for edge cases (no solutions, invalid inputs)
- [ ] Add performance benchmarks
- [ ] Add tests for CSV export
- [ ] Add tests for localStorage
- [ ] Add visual regression tests

