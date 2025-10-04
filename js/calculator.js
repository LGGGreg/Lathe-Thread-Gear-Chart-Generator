/**
 * Mini-Lathe Change Gear Calculator
 * Modernized version with ES6+ syntax
 * Based on Al Harral's GEARS.BAS
 */

class GearCalculator {
    constructor() {
        this.RESULT_TOLERANCE = 0.002;
        this.MIN_GEAR_SUM = 160;
        this.GEAR_CLEARANCE = 10;
        this.init();
    }

    init() {
        // Try to load from localStorage first, then URL parameters, then defaults
        this.loadSettings();

        this.setupEventListeners();
        this.calculateGears();
    }

    loadSettings() {
        const saved = localStorage.getItem('gearCalculatorSettings');

        if (saved) {
            // Load from localStorage
            const settings = JSON.parse(saved);
            document.getElementById("gears1").value = settings.gears1 || "20,20,20,21,25,30,35,40,40,45,45";
            document.getElementById("gears2").value = settings.gears2 || "48,50,50,54,55,57,60,60,65,72,80,80";
            document.getElementById("gears3").value = settings.gears3 || "";

            // Set leadscrew type
            if (settings.leadscrewType === 'metric') {
                document.getElementById("metric_ls").checked = true;
            } else {
                document.getElementById("imperial_ls").checked = true;
            }

            // Set includeall checkbox
            document.getElementById("includeall").checked = settings.includeAll !== false;
        } else {
            // Load from URL parameters or use defaults
            const gears1 = this.getParameterByName("gears1", "20,20,20,21,25,30,35,40,40,45,45");
            const gears2 = this.getParameterByName("gears2", "48,50,50,54,55,57,60,60,65,72,80,80");
            const gears3 = this.getParameterByName("gears3", "");

            document.getElementById("gears1").value = gears1;
            document.getElementById("gears2").value = gears2;
            document.getElementById("gears3").value = gears3;
        }
    }

    saveSettings() {
        const settings = {
            gears1: document.getElementById("gears1").value,
            gears2: document.getElementById("gears2").value,
            gears3: document.getElementById("gears3").value,
            leadscrewType: document.getElementById("imperial_ls").checked ? 'imperial' : 'metric',
            includeAll: document.getElementById("includeall").checked
        };

        localStorage.setItem('gearCalculatorSettings', JSON.stringify(settings));
        alert('Settings saved! They will be loaded automatically next time.');
    }

    setupEventListeners() {
        // Radio button changes
        document.querySelectorAll('input[name="leadscrew_type"], input[name="target"]').forEach(radio => {
            radio.addEventListener('change', () => this.radioChange());
        });

        // Calculate button
        document.querySelector('input[type="submit"]').addEventListener('click', (e) => {
            e.preventDefault();
            this.calculateGears();
        });

        // Gear input changes
        ['gears1', 'gears2', 'gears3'].forEach(id => {
            const input = document.getElementById(id);
            input.addEventListener('keyup', (e) => {
                e.target.value = e.target.value.replace(/[^0-9, ]/g, '');
            });
            input.addEventListener('change', () => this.updateGearsURL());
        });
    }

    getParameterByName(name, defaultValue = "") {
        const url = new URL(window.location.href);
        return url.searchParams.get(name) || defaultValue;
    }

    updateURLWithoutReload(url) {
        window.history.replaceState({}, '', url);
    }

    getURLWithoutQuery() {
        return window.location.origin + window.location.pathname;
    }

    resultOkay(actualValue, targetValue) {
        if (!targetValue || targetValue === 0) return false;
        return Math.abs((actualValue / targetValue) - 1.0) < this.RESULT_TOLERANCE;
    }

    getGears(args) {
        const gearsAvailable = args.gears;

        // Determine leadscrew pitch
        let leadscrew = 1.5; // Default metric
        if (args.leadscrew_tpi) {
            leadscrew = 25.4 / args.leadscrew_tpi;
        }

        const pitch = args.pitch || null;
        const tpi = args.tpi || null;

        if (!pitch && !tpi) return [];

        const solutions = [];

        // Try two-gear solutions first
        for (let a = 0; a < gearsAvailable.length; a++) {
            const ga = gearsAvailable[a];
            for (let d = 0; d < gearsAvailable.length; d++) {
                if (a === d) continue;
                
                const gd = gearsAvailable[d];
                const pitchResult = leadscrew * ga / gd;
                const tpiResult = 25.4 / pitchResult;

                if (this.resultOkay(pitchResult, pitch) || this.resultOkay(tpiResult, tpi)) {
                    const isDuplicate = solutions.some(s => 
                        s.Gears[0] === ga && s.Gears[1] === null && 
                        s.Gears[2] === null && s.Gears[3] === gd
                    );

                    if (!isDuplicate) {
                        solutions.push({
                            Gears: [ga, null, null, gd],
                            Pitch: pitchResult,
                            TPI: tpiResult
                        });
                    }
                }
            }
        }

        // If we have solutions and not forcing four-gear display, return them
        const includeAll = document.getElementById("includeall").checked;
        if (solutions.length > 0 && !includeAll) {
            return solutions;
        }

        // Try four-gear solutions
        for (let a = 0; a < gearsAvailable.length; a++) {
            const ga = gearsAvailable[a];
            for (let b = 0; b < gearsAvailable.length; b++) {
                const gb = gearsAvailable[b];
                for (let c = 0; c < gearsAvailable.length; c++) {
                    const gc = gearsAvailable[c];
                    for (let d = 0; d < gearsAvailable.length; d++) {
                        const gd = gearsAvailable[d];

                        // Check for duplicate gears
                        if (a === b || a === c || a === d || b === c || b === d || c === d) {
                            continue;
                        }

                        // Check if gears will fit
                        if ((gb + this.GEAR_CLEARANCE) > (gc + gd)) {
                            continue;
                        }

                        // Check if they will reach the two shafts
                        if ((ga + gb + gc + gd) < this.MIN_GEAR_SUM) {
                            continue;
                        }

                        const pitchResult = leadscrew * (ga * gc) / (gb * gd);
                        const tpiResult = 25.4 / pitchResult;

                        if (this.resultOkay(pitchResult, pitch) || this.resultOkay(tpiResult, tpi)) {
                            const isDuplicate = solutions.some(s =>
                                s.Gears[0] === ga && s.Gears[1] === gb &&
                                s.Gears[2] === gc && s.Gears[3] === gd
                            );

                            if (!isDuplicate) {
                                solutions.push({
                                    Gears: [ga, gb, gc, gd],
                                    Pitch: pitchResult,
                                    TPI: tpiResult
                                });
                            }
                        }
                    }
                }
            }
        }

        return solutions;
    }

    radioChange() {
        const tpiRequest = document.getElementById("gettpi");
        const pitchRow = document.getElementById("pitch-row");
        const tpiRow = document.getElementById("tpi-row");

        if (tpiRequest.checked) {
            pitchRow.classList.add('hidden');
            tpiRow.classList.remove('hidden');
        } else {
            tpiRow.classList.add('hidden');
            pitchRow.classList.remove('hidden');
        }
    }

    calculateGears() {
        const args = {};
        
        // Check leadscrew type
        const imperialLeadscrew = document.getElementById("imperial_ls");
        if (imperialLeadscrew.checked) {
            args.leadscrew_tpi = 16;
        }

        // Check target type
        const tpiRequest = document.getElementById("gettpi");
        const isImperial = tpiRequest.checked;
        
        if (isImperial) {
            args.tpi = parseFloat(document.getElementById("tpi").value);
        } else {
            args.pitch = parseFloat(document.getElementById("pitch").value);
        }

        // Parse gear lists
        const parseGears = (str) => str.replace(/\s/g, '')
            .replace(/,*$/g, '')
            .replace(/^,*/g, '')
            .split(',')
            .map(Number)
            .filter(n => !isNaN(n) && n > 0);

        const gears1 = parseGears(document.getElementById("gears1").value);
        const gears2 = parseGears(document.getElementById("gears2").value);
        const gears3 = parseGears(document.getElementById("gears3").value);
        args.gears = [...gears1, ...gears2, ...gears3];

        // Calculate solutions
        const solutions = this.getGears(args);

        // Get target value for error calculation
        const targetValue = isImperial ? args.tpi : args.pitch;

        // Display results
        this.displayResults(solutions, isImperial, targetValue);
    }

    displayResults(solutions, isImperial, targetValue) {
        const holder = document.getElementById("holder");
        holder.innerHTML = "";

        if (solutions.length === 0) {
            holder.innerHTML = "<p class='error-message'>ERROR: Could not find any gear combinations that work.</p>";
            return;
        }

        // Create table
        const table = document.createElement("table");
        table.classList.add("asbTable", "tightHeight");

        // Create header
        const headerRow = table.insertRow(0);
        ['Gear A', 'Gear B', 'Gear C', 'Gear D', isImperial ? 'Actual TPI' : 'Actual Pitch (mm)', 'Error %'].forEach(text => {
            const th = document.createElement('th');
            th.innerHTML = `<b>${text}</b>`;
            th.className = 'border';
            headerRow.appendChild(th);
        });

        // Add data rows
        solutions.forEach((solution, index) => {
            const row = table.insertRow(index + 1);
            const gears = solution.Gears;

            gears.forEach((gear, gearIndex) => {
                const cell = row.insertCell(gearIndex);
                cell.className = 'border';
                if (gear === null && gearIndex === 1) {
                    cell.innerHTML = "ANY";
                } else if (gear === null) {
                    cell.innerHTML = "";
                } else {
                    cell.innerHTML = gear;
                }
            });

            // Add actual value cell
            const valueCell = row.insertCell(4);
            valueCell.className = 'border';
            const actualValue = isImperial ? solution.TPI : solution.Pitch;
            valueCell.innerHTML = this.formatNumber(actualValue);

            // Add error percentage cell
            const errorCell = row.insertCell(5);
            errorCell.className = 'border';
            if (targetValue && targetValue !== 0) {
                const errorPercent = ((actualValue - targetValue) / targetValue) * 100;
                errorCell.innerHTML = this.formatNumber(errorPercent) + '%';
            } else {
                errorCell.innerHTML = 'N/A';
            }
        });

        holder.appendChild(table);
    }

    formatNumber(num) {
        let str = num.toFixed(5);
        // Remove trailing zeros
        while (str.includes('.') && (str.endsWith('0') || str.endsWith('.'))) {
            if (str.endsWith('.')) {
                str = str.slice(0, -1);
                break;
            }
            str = str.slice(0, -1);
        }
        return str;
    }

    updateGearsURL() {
        const gears1 = document.getElementById("gears1").value.replace(/[^0-9,]/g, '');
        const gears2 = document.getElementById("gears2").value.replace(/[^0-9,]/g, '');
        const gears3 = document.getElementById("gears3").value.replace(/[^0-9,]/g, '');

        const baseURL = this.getURLWithoutQuery();
        const newURL = `${baseURL}?gears1=${gears1}&gears2=${gears2}&gears3=${gears3}`;
        this.updateURLWithoutReload(newURL);
    }
}

// Initialize calculator when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new GearCalculator());
} else {
    new GearCalculator();
}

// Collapsible section toggle function
function toggleCollapsible(sectionId) {
    const content = document.getElementById(`${sectionId}-content`);
    const toggle = document.getElementById(`${sectionId}-toggle`);

    if (content.classList.contains('open')) {
        content.classList.remove('open');
        toggle.classList.remove('open');
    } else {
        content.classList.add('open');
        toggle.classList.add('open');
    }
}

// Global function to save settings (called from HTML button)
function saveSettings() {
    // Get the calculator instance from the global scope
    const gears1 = document.getElementById("gears1").value;
    const gears2 = document.getElementById("gears2").value;
    const gears3 = document.getElementById("gears3").value;
    const leadscrewType = document.getElementById("imperial_ls").checked ? 'imperial' : 'metric';
    const includeAll = document.getElementById("includeall").checked;

    const settings = {
        gears1,
        gears2,
        gears3,
        leadscrewType,
        includeAll
    };

    localStorage.setItem('gearCalculatorSettings', JSON.stringify(settings));
    alert('✅ Settings saved! They will be loaded automatically next time.');
}

/**
 * Optimize gear selection to minimize changes across chart
 *
 * Algorithm: Greedy Frequency-Based Selection with 2-Gear Preference
 * 1. Get all possible solutions for each target (up to 10 per target)
 * 2. Build frequency map: count how often each gear appears in each position
 * 3. Score each solution based on:
 *    - 2-gear solution bonus: B=ANY, C=- (+1000 points) ← STRONGLY PREFERRED!
 *    - Frequency score: how common is this gear in this position? (×10 points)
 *    - Reuse bonus: is this gear already selected for this position? (+100 points)
 * 4. Greedy selection: for each target, pick the highest-scoring solution
 * 5. Update tracking as we go to prefer already-selected gears
 *
 * This minimizes gear changes by preferring:
 * - 2-gear solutions (B and C are hard to change!) - HIGHEST PRIORITY
 * - Gears that appear frequently across many threads
 * - Gears already selected for previous threads
 *
 * Complexity: O(n * m) where n = targets, m = solutions per target (max 10)
 * Max iterations: n * 10 (typically 34 * 10 = 340, well under 100 per target)
 */
function optimizeGearSelections(targets, calc, gears, leadscrewTpi) {
    // Step 1: Get all solutions for all targets
    const allSolutions = targets.map(target => {
        const args = { gears: gears };
        if (target.type === 'tpi') {
            args.tpi = target.value;
        } else {
            args.pitch = target.value;
        }
        if (leadscrewTpi) {
            args.leadscrew_tpi = leadscrewTpi;
        }

        const solutions = calc.getGears(args);
        return {
            target: target,
            solutions: solutions.slice(0, 10) // Limit to top 10 solutions per target
        };
    });

    // Step 2: Build frequency map of all gears in all solutions
    const gearFrequency = {};
    allSolutions.forEach(item => {
        item.solutions.forEach(sol => {
            for (let i = 0; i < 4; i++) {
                const gear = sol.Gears[i];
                if (gear !== null && gear !== undefined) {
                    const key = `pos${i}_${gear}`;
                    gearFrequency[key] = (gearFrequency[key] || 0) + 1;
                }
            }
        });
    });

    // Step 3: Score each solution based on gear commonality
    const scoreSolution = (solution, selectedGears) => {
        let score = 0;

        // STRONGLY prefer 2-gear solutions (B=ANY, C=-)
        // Gears B and C are hard to change, so 2-gear solutions are much better
        const isTwoGearSolution = (solution.Gears[1] === null && solution.Gears[2] === undefined);
        if (isTwoGearSolution) {
            score += 1000; // HUGE bonus for 2-gear solutions!
        }

        for (let i = 0; i < 4; i++) {
            const gear = solution.Gears[i];
            if (gear !== null && gear !== undefined) {
                // Frequency score: how common is this gear in this position?
                const freqKey = `pos${i}_${gear}`;
                score += (gearFrequency[freqKey] || 0) * 10;

                // Reuse bonus: have we already selected this gear for this position?
                const selectedKey = `pos${i}_${gear}`;
                if (selectedGears[selectedKey]) {
                    score += 100; // Big bonus for reusing already-selected gears
                }
            }
        }
        return score;
    };

    // Step 4: Greedy selection - pick best solution for each target
    const selectedSolutions = [];
    const selectedGears = {}; // Track which gears we've used in which positions

    allSolutions.forEach(item => {
        if (item.solutions.length === 0) {
            selectedSolutions.push(null); // No solution available
            return;
        }

        // Score all solutions for this target
        const scoredSolutions = item.solutions.map(sol => ({
            solution: sol,
            score: scoreSolution(sol, selectedGears)
        }));

        // Sort by score (highest first)
        scoredSolutions.sort((a, b) => b.score - a.score);

        // Select the best solution
        const best = scoredSolutions[0].solution;
        selectedSolutions.push(best);

        // Update selected gears tracking
        for (let i = 0; i < 4; i++) {
            const gear = best.Gears[i];
            if (gear !== null && gear !== undefined) {
                const key = `pos${i}_${gear}`;
                selectedGears[key] = true;
            }
        }
    });

    return selectedSolutions;
}

// Global function to calculate thread chart
function calculateThreadChart() {
    const chartTpiInput = document.getElementById("chart-tpi").value;
    const chartPitchInput = document.getElementById("chart-pitch").value;
    const resultsDiv = document.getElementById("chart-results");

    // Parse inputs
    const parseValues = (str) => str.replace(/\s/g, '')
        .replace(/,*$/g, '')
        .replace(/^,*/g, '')
        .split(',')
        .map(Number)
        .filter(n => !isNaN(n) && n > 0);

    const tpiValues = chartTpiInput ? parseValues(chartTpiInput) : [];
    const pitchValues = chartPitchInput ? parseValues(chartPitchInput) : [];

    if (tpiValues.length === 0 && pitchValues.length === 0) {
        resultsDiv.innerHTML = "<p class='error-message'>Please enter at least one TPI or pitch value.</p>";
        return;
    }

    // Get gears
    const gears1 = parseValues(document.getElementById("gears1").value);
    const gears2 = parseValues(document.getElementById("gears2").value);
    const gears3 = parseValues(document.getElementById("gears3").value);
    const gears = [...gears1, ...gears2, ...gears3];

    if (gears.length === 0) {
        resultsDiv.innerHTML = "<p class='error-message'>Please enter available gears in the Setup section.</p>";
        return;
    }

    // Get leadscrew type
    const imperialLeadscrew = document.getElementById("imperial_ls").checked;
    const leadscrewTpi = imperialLeadscrew ? 16 : null;

    // Create calculator instance to use getGears method
    const calc = new GearCalculator();

    // Build target list for optimization
    const targets = [];
    tpiValues.forEach(tpi => targets.push({ type: 'tpi', value: tpi }));
    pitchValues.forEach(pitch => targets.push({ type: 'pitch', value: pitch }));

    // Use optimization algorithm to select best gear combinations
    const optimizedSolutions = optimizeGearSelections(targets, calc, gears, leadscrewTpi);

    // Build chart data from optimized solutions
    const chartData = [];
    let targetIndex = 0;

    // Add TPI solutions
    tpiValues.forEach(targetTpi => {
        const sol = optimizedSolutions[targetIndex++];

        if (sol) {
            chartData.push({
                type: 'tpi',
                target: `${targetTpi} TPI`,
                gearA: sol.Gears[0] || '-',
                gearB: sol.Gears[1] === null ? 'ANY' : (sol.Gears[1] || '-'),
                gearC: sol.Gears[2] || '-',
                gearD: sol.Gears[3] || '-',
                actual: calc.formatNumber(sol.TPI) + ' TPI',
                error: ((sol.TPI - targetTpi) / targetTpi * 100).toFixed(4) + '%'
            });
        } else {
            chartData.push({
                type: 'tpi',
                target: `${targetTpi} TPI`,
                gearA: 'N/A',
                gearB: 'N/A',
                gearC: 'N/A',
                gearD: 'N/A',
                actual: 'No solution',
                error: 'N/A'
            });
        }
    });

    // Add header break if we have both TPI and pitch values
    if (tpiValues.length > 0 && pitchValues.length > 0) {
        chartData.push({
            type: 'header',
            target: 'METRIC THREADS',
            gearA: '',
            gearB: '',
            gearC: '',
            gearD: '',
            actual: '',
            error: ''
        });
    }

    // Add pitch solutions
    pitchValues.forEach(targetPitch => {
        const sol = optimizedSolutions[targetIndex++];

        if (sol) {
            chartData.push({
                type: 'pitch',
                target: `${targetPitch} mm`,
                gearA: sol.Gears[0] || '-',
                gearB: sol.Gears[1] === null ? 'ANY' : (sol.Gears[1] || '-'),
                gearC: sol.Gears[2] || '-',
                gearD: sol.Gears[3] || '-',
                actual: calc.formatNumber(sol.Pitch) + ' mm',
                error: ((sol.Pitch - targetPitch) / targetPitch * 100).toFixed(4) + '%'
            });
        } else {
            chartData.push({
                type: 'pitch',
                target: `${targetPitch} mm`,
                gearA: 'N/A',
                gearB: 'N/A',
                gearC: 'N/A',
                gearD: 'N/A',
                actual: 'No solution',
                error: 'N/A'
            });
        }
    });

    // Display results
    displayThreadChart(chartData);
}

function displayThreadChart(chartData) {
    const resultsDiv = document.getElementById("chart-results");

    if (chartData.length === 0) {
        resultsDiv.innerHTML = "<p class='error-message'>No results to display.</p>";
        return;
    }

    let html = '';

    // Add export button at the top
    html += '<div style="margin-bottom: 1rem;">';
    html += '<button type="button" onclick="exportChartToCSV()" style="padding: 0.75rem 1.5rem; background-color: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: bold;">';
    html += '📥 Export as CSV';
    html += '</button>';
    html += '</div>';

    html += '<div style="overflow-x: auto;">';
    html += '<table class="asbTable tightHeight">';
    html += '<thead><tr>';
    html += '<th class="border"><b>Target</b></th>';
    html += '<th class="border"><b>Gear A</b></th>';
    html += '<th class="border"><b>Gear B</b></th>';
    html += '<th class="border"><b>Gear C</b></th>';
    html += '<th class="border"><b>Gear D</b></th>';
    html += '<th class="border"><b>Actual</b></th>';
    html += '<th class="border"><b>Error %</b></th>';
    html += '</tr></thead>';
    html += '<tbody>';

    chartData.forEach(row => {
        if (row.type === 'header') {
            // Add header row for metric section
            html += '<tr style="background-color: #3498db; color: white; font-weight: bold;">';
            html += `<td class="border" colspan="7" style="text-align: center; padding: 0.75rem;">${row.target}</td>`;
            html += '</tr>';
        } else {
            html += '<tr>';
            html += `<td class="border">${row.target}</td>`;
            html += `<td class="border">${row.gearA}</td>`;
            html += `<td class="border">${row.gearB}</td>`;
            html += `<td class="border">${row.gearC}</td>`;
            html += `<td class="border">${row.gearD}</td>`;
            html += `<td class="border">${row.actual}</td>`;
            html += `<td class="border">${row.error}</td>`;
            html += '</tr>';
        }
    });

    html += '</tbody></table></div>';

    resultsDiv.innerHTML = html;

    // Store chart data globally for export (filter out header rows)
    window.currentChartData = chartData.filter(row => row.type !== 'header');
}

// Global function to export chart to CSV
function exportChartToCSV() {
    if (!window.currentChartData || window.currentChartData.length === 0) {
        alert('No chart data to export.');
        return;
    }

    // Create CSV content
    let csv = 'Target,Gear A,Gear B,Gear C,Gear D,Actual,Error %\n';

    window.currentChartData.forEach(row => {
        csv += `"${row.target}",${row.gearA},${row.gearB},${row.gearC},${row.gearD},"${row.actual}","${row.error}"\n`;
    });

    // Create blob and download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'thread_chart_' + new Date().toISOString().slice(0,10) + '.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
