// Add region and allow removal of selected regions
function addRegion() {
    const regionSelect = document.getElementById('region');
    const selectedRegions = Array.from(regionSelect.selectedOptions).map(option => option.value);
    const regionDisplay = document.getElementById('regionDisplay');
    regionDisplay.innerHTML = ''; // Clear current displayed regions

    selectedRegions.forEach(region => {
        const regionSpan = document.createElement('span');
        regionSpan.className = 'region-tag';
        regionSpan.textContent = region;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove-region';
        removeBtn.textContent = '✖';
        removeBtn.onclick = function () {
            removeRegion(region);
        };

        regionSpan.appendChild(removeBtn);
        regionDisplay.appendChild(regionSpan);
    });

    toggleFineOptions(); // Make sure to handle the GDPR logic after updating regions
}

// Remove region from the list
function removeRegion(regionToRemove) {
    const regionSelect = document.getElementById('region');
    Array.from(regionSelect.options).forEach(option => {
        if (option.value === regionToRemove) {
            option.selected = false;
        }
    });

    addRegion(); // Update displayed regions after removal
}

// Toggle annual revenue input for GDPR regions
function toggleFineOptions() {
    const selectedRegions = Array.from(document.getElementById('region').selectedOptions).map(option => option.value);
    const annualRevenueInput = document.getElementById('annualRevenueInput');

    // Check if either GDPR option is selected and show/hide the annual revenue input
    if (selectedRegions.includes('gdpr-2%') || selectedRegions.includes('gdpr-4%')) {
        annualRevenueInput.style.display = 'block';
    } else {
        annualRevenueInput.style.display = 'none';
    }
}

// Calculate fine based on selected regions and violations
function calculateFine() {
    const violations = parseInt(document.getElementById('violations').value);
    const regions = Array.from(document.getElementById('region').selectedOptions).map(option => option.value);
    const annualRevenue = parseFloat(document.getElementById('annualRevenue').value);
    let totalFineOutput = '';
    let currency = "USD";

    if (!violations || violations <= 0) {
        alert("Please enter a valid number of violations.");
        return;
    }

    regions.forEach(region => {
        let finePerViolation = 0;
        let totalFine = 0;

        switch (region) {
            case "utah":
                finePerViolation = 7500;
                break;
            case "california":
                finePerViolation = 2500; // Negligence
                break;
            case "california-intentional":
                finePerViolation = 7500; // Intentional
                break;
            case "california-minors":
                finePerViolation = 7500; // Minors
                break;
            case "colorado":
                finePerViolation = 20000; // Standard
                break;
            case "colorado-elderly":
                finePerViolation = 50000; // Elderly Involved
                break;
            case "virginia":
                finePerViolation = 7500;
                break;
            case "connecticut":
                finePerViolation = 5000;
                break;
            case "delaware":
                finePerViolation = 10000;
                break;
            case "indiana":
                finePerViolation = 7500;
                break;
            case "iowa":
                finePerViolation = 7500;
                break;
            case "kentucky":
                finePerViolation = 7500;
                break;
            case "maryland":
                finePerViolation = 10000;
                break;
            case "minnesota":
                finePerViolation = 7500; // Placeholder, adjust as needed
                break;
            case "montana":
                finePerViolation = 7500;
                break;
            case "nebraska":
                finePerViolation = 7500;
                break;
            case "newhampshire":
                finePerViolation = 7500;
                break;
            case "newjersey":
                finePerViolation = 10000;
                break;
            case "oregon":
                finePerViolation = 7500;
                break;
            case "rhodeisland":
                finePerViolation = 7500;
                break;
            case "tennessee":
                finePerViolation = 7500;
                break;
            case "texas":
                finePerViolation = 7500;
                break;
            case "washington":
                finePerViolation = 7500;
                break;
            case "gdpr-2%":
                totalFine = 0.02 * annualRevenue;
                currency = "EUR";
                break;
            case "gdpr-4%":
                totalFine = 0.04 * annualRevenue;
                currency = "EUR";
                break;
            default:
                finePerViolation = 0;
        }

        if (region !== 'gdpr-2%' && region !== 'gdpr-4%') {
            totalFine = violations * finePerViolation;
        }

        // Format the fine for the region
        const formattedFine = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(totalFine);

        // Append the result for each region
        totalFineOutput += `${capitalizeFirstLetter(region)}: ${formattedFine}<br>`;
    });

    // Display the results in the "totalFine" section
    document.getElementById('totalFine').innerHTML = totalFineOutput;
}

// Capitalize first letter of region name
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
