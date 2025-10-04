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
        // Load gear values from URL parameters or use defaults
        const gears1 = this.getParameterByName("gears1", "20,20,20,21,25,30,35,40,40,45,45");
        const gears2 = this.getParameterByName("gears2", "48,50,50,54,55,57,60,60,65,72,80,80");
        const gears3 = this.getParameterByName("gears3", "");

        document.getElementById("gears1").value = gears1;
        document.getElementById("gears2").value = gears2;
        document.getElementById("gears3").value = gears3;

        this.setupEventListeners();
        this.calculateGears();
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
        const pitchInput = document.getElementById("pitch");
        const tpiInput = document.getElementById("tpi");

        if (tpiRequest.checked) {
            pitchInput.disabled = true;
            tpiInput.disabled = false;
        } else {
            tpiInput.disabled = true;
            pitchInput.disabled = false;
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

