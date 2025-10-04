#!/usr/bin/env node

/**
 * Command-line test runner for gear calculator
 * Uses Puppeteer to run tests in headless browser
 * 
 * Usage:
 *   node tests/run-tests.js
 *   npm test (if configured in package.json)
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    gray: '\x1b[90m'
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

async function runTests() {
    console.log(colorize('\n🧪 Gear Calculator Test Suite\n', 'bright'));
    console.log(colorize('Starting headless browser...', 'gray'));
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
        const page = await browser.newPage();
        
        // Set up console message handler
        const logs = [];
        page.on('console', msg => {
            const text = msg.text();
            logs.push(text);
        });
        
        // Load test page
        const testFile = path.join(__dirname, 'test-algorithm.html');
        const testUrl = `file://${testFile.replace(/\\/g, '/')}`;
        
        console.log(colorize(`Loading tests from: ${testFile}`, 'gray'));
        await page.goto(testUrl, { waitUntil: 'networkidle0' });
        
        console.log(colorize('Running tests...\n', 'gray'));
        
        // Run tests and capture results
        const results = await page.evaluate(() => {
            return new Promise((resolve) => {
                // Clear any previous results
                if (typeof clearResults === 'function') {
                    clearResults();
                }
                
                // Run all tests
                if (typeof runAllTests === 'function') {
                    runAllTests();
                    
                    // Wait for tests to complete (they use setTimeout)
                    setTimeout(() => {
                        resolve(window.testResults || { error: 'No results found' });
                    }, 1000);
                } else {
                    resolve({ error: 'runAllTests function not found' });
                }
            });
        });
        
        // Get detailed logs from page
        const detailedLogs = await page.evaluate(() => {
            const resultDiv = document.getElementById('results');
            if (!resultDiv) return [];
            
            const testDivs = resultDiv.querySelectorAll('.test-result');
            return Array.from(testDivs).map(div => ({
                text: div.textContent,
                type: div.className.includes('pass') ? 'pass' : 
                      div.className.includes('fail') ? 'fail' : 'info'
            }));
        });
        
        // Display results
        console.log(colorize('═'.repeat(60), 'cyan'));
        console.log(colorize('  TEST RESULTS', 'bright'));
        console.log(colorize('═'.repeat(60), 'cyan'));
        console.log();
        
        // Show detailed logs
        detailedLogs.forEach(log => {
            let symbol = '  ';
            let color = 'reset';
            
            if (log.type === 'pass') {
                symbol = '✓ ';
                color = 'green';
            } else if (log.type === 'fail') {
                symbol = '✗ ';
                color = 'red';
            } else if (log.text.startsWith('===')) {
                color = 'cyan';
                symbol = '';
            } else {
                color = 'gray';
            }
            
            console.log(colorize(symbol + log.text, color));
        });
        
        console.log();
        console.log(colorize('─'.repeat(60), 'gray'));
        
        // Summary
        if (results.error) {
            console.log(colorize(`\n❌ Error: ${results.error}\n`, 'red'));
            process.exit(1);
        } else {
            const { passed, failed, total } = results;
            const successRate = (passed / total * 100).toFixed(1);
            
            console.log(colorize('\n📊 SUMMARY:', 'bright'));
            console.log(colorize(`   Total Tests: ${total}`, 'cyan'));
            console.log(colorize(`   Passed: ${passed} ✓`, 'green'));
            
            if (failed > 0) {
                console.log(colorize(`   Failed: ${failed} ✗`, 'red'));
            }
            
            console.log(colorize(`   Success Rate: ${successRate}%`, failed === 0 ? 'green' : 'yellow'));
            
            // Detailed results
            if (results.details) {
                console.log(colorize('\n📈 DETAILS:', 'bright'));
                
                if (results.details.detection) {
                    const { twoGearCount, fourGearCount, total } = results.details.detection;
                    console.log(colorize(`   Detection: ${twoGearCount} 2-gear, ${fourGearCount} 4-gear (${total} total solutions)`, 'cyan'));
                }
                
                if (results.details.scoring) {
                    const { score2, score4, ratio } = results.details.scoring;
                    console.log(colorize(`   Scoring: 2-gear=${score2.toLocaleString()}, 4-gear=${score4.toLocaleString()} (${ratio.toFixed(0)}x ratio)`, 'cyan'));
                }
                
                if (results.details.optimization) {
                    const { total2Gear, total4Gear, percent } = results.details.optimization;
                    console.log(colorize(`   Optimization: ${total2Gear} 2-gear, ${total4Gear} 4-gear (${percent}% 2-gear)`, 'cyan'));
                }
            }
            
            console.log();
            
            if (failed === 0) {
                console.log(colorize('✅ All tests passed!\n', 'green'));
                process.exit(0);
            } else {
                console.log(colorize('❌ Some tests failed!\n', 'red'));
                process.exit(1);
            }
        }
        
    } catch (error) {
        console.error(colorize(`\n❌ Error running tests: ${error.message}\n`, 'red'));
        console.error(error.stack);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

// Check if puppeteer is installed
try {
    require.resolve('puppeteer');
} catch (e) {
    console.error(colorize('\n❌ Puppeteer not installed!', 'red'));
    console.error(colorize('\nPlease install it with:', 'yellow'));
    console.error(colorize('  npm install --save-dev puppeteer\n', 'cyan'));
    process.exit(1);
}

// Run tests
runTests().catch(error => {
    console.error(colorize(`\n❌ Fatal error: ${error.message}\n`, 'red'));
    process.exit(1);
});

