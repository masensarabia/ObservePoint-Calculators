let selectedRegionsSet = new Set();

function addRegion() {
    const selectedRegionOptions = Array.from(document.getElementById('region').selectedOptions).map(option => option.value);
    selectedRegionOptions.forEach(region => {
        selectedRegionsSet.add(region); // Add region to the set
    });
    displaySelectedRegions(); // Display the selected regions
}

function displaySelectedRegions() {
    const selectedRegionsDiv = document.getElementById('selectedRegions');
    selectedRegionsDiv.innerHTML = ''; // Clear the content
    selectedRegionsSet.forEach(region => {
        selectedRegionsDiv.innerHTML += `
            <div class="selected-region">
                ${capitalizeFirstLetter(region)} 
                <button class="remove-btn" onclick="removeRegion('${region}')">x</button>
            </div>
        `;
    });
}

function removeRegion(region) {
    selectedRegionsSet.delete(region); // Remove the region from the set
    displaySelectedRegions(); // Update the displayed list
}

function calculateFine() {
    const violations = parseInt(document.getElementById('violations').value);
    const annualRevenue = parseFloat(document.getElementById('annualRevenue').value.replace(/,/g, ''));
    let totalFineOutput = '';
    let currency = "USD";

    if (!violations || violations <= 0) {
        alert("Please enter a valid number of violations.");
        return;
    }

    selectedRegionsSet.forEach(region => {
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
                finePerViolation = 7500;
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Adding commas in the annual revenue input
document.getElementById('annualRevenue').addEventListener('input', function (e) {
    let value = e.target.value.replace(/,/g, ''); // Remove any existing commas
    if (isNaN(value)) {
        e.target.value = ''; // Clear the input if it's not a valid number
    } else {
        e.target.value = formatWithCommas(value); // Format and display the value with commas
    }
});

function formatWithCommas(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
