let selectedRegionsSet = new Set();
const totalRegionOptions = document.getElementById('region').options.length; // Get the total number of region options

// Add region and display it properly in the "Selected Regions" section
function addRegion() {
    const selectedRegionOptions = Array.from(document.getElementById('region').selectedOptions).map(option => option.value);
    let gdprSelected = false; // Flag to check if a GDPR option is selected

    selectedRegionOptions.forEach(region => {
        selectedRegionsSet.add(region); // Add region to the set

        // Check if GDPR is selected
        if (region === 'gdpr-2%' || region === 'gdpr-4%') {
            gdprSelected = true;
        }
    });

    // Toggle the visibility of the annualRevenueInput field
    const annualRevenueInput = document.getElementById('annualRevenueInput');
    if (gdprSelected) {
        annualRevenueInput.style.display = 'block';
    } else {
        annualRevenueInput.style.display = 'none';
    }

    displaySelectedRegions(); // Display the selected regions

    // If "Region to Violation Field" is selected, dynamically add fields
    const violationType = document.getElementById('violationType').value;
    if (violationType === 'region') {
        handleViolationTypeChange(); // Re-trigger to add violation fields
    }
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

// Remove region and refresh the list of selected regions
function removeRegion(region) {
    selectedRegionsSet.delete(region); // Remove the region from the set
    displaySelectedRegions(); // Update the displayed list

    // If "Region to Violation Field" is selected, dynamically remove fields
    const violationType = document.getElementById('violationType').value;
    if (violationType === 'region') {
        handleViolationTypeChange(); // Re-trigger to adjust violation fields
    }
}

function handleViolationTypeChange() {
    const violationType = document.getElementById('violationType').value;
    const violationsContainer = document.getElementById('multipleViolationsContainer');

    // Clear previous fields completely
    violationsContainer.innerHTML = '';

    if (violationType === 'multiple') {
        // Create dropdown for selecting how many fields to display based on total region options
        const select = document.createElement('select');
        select.id = 'multipleViolationCount';
        for (let i = 1; i <= totalRegionOptions; i++) {  // Using total region options for the count
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            select.appendChild(option);
        }
        select.addEventListener('change', function () {
            createMultipleViolationFields(this.value);
        });
        violationsContainer.appendChild(select);

    } else if (violationType === 'region') {
        // Create one violation field for each region selected
        selectedRegionsSet.forEach(region => {
            createViolationFieldForRegion(region);
        });
    }
}


// Dynamically creates multiple violation fields based on the count selected
function createMultipleViolationFields(count) {
    const violationsContainer = document.getElementById('multipleViolationsContainer');

    // Clear all except the first default field
    while (violationsContainer.children.length > 2) { // Ensures we don't remove the first field
        violationsContainer.removeChild(violationsContainer.lastChild);
    }

    // Create fields starting from 2 to the selected number
    for (let i = 1; i < count; i++) {
        const label = document.createElement('label');
        label.textContent = `Number of Violations ${i + 1}:`;
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('calculator-input');
        input.id = `violations${i + 1}`;
        input.placeholder = 'Enter number of violations';
        violationsContainer.appendChild(label);
        violationsContainer.appendChild(input);
    }
}


// Create individual violation fields based on selected regions
function createViolationFieldForRegion(region) {
    const violationsContainer = document.getElementById('multipleViolationsContainer');
    const label = document.createElement('label');
    label.textContent = `Number of Violations for ${capitalizeFirstLetter(region)}:`;
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('calculator-input');
    input.id = `violations_${region}`;
    input.placeholder = 'Enter number of violations';
    violationsContainer.appendChild(label);
    violationsContainer.appendChild(input);
}



function calculateFine() {
    const violationType = document.getElementById('violationType').value;
    const annualRevenue = parseFloat(document.getElementById('annualRevenue').value.replace(/,/g, ''));
    let totalFineOutput = '';

    selectedRegionsSet.forEach(region => {
        let finePerViolation = 0;
        let totalFine = 0;
        let violations = 0;
        let currency = "USD"; // Default currency set to USD

        // Handle different violation input types
        if (violationType === 'one') {
            const violationsInput = document.getElementById('violations').value.replace(/,/g, '');
            violations = parseInt(violationsInput, 10);

        } else if (violationType === 'multiple') {
            const violationCount = document.getElementById('multipleViolationCount').value;
            for (let i = 0; i < violationCount; i++) {
                const violationField = document.getElementById(`violations${i + 1}`).value.replace(/,/g, '');
                violations += parseInt(violationField, 10);
            }

        } else if (violationType === 'region') {
            const violationField = document.getElementById(`violations_${region}`).value.replace(/,/g, '');
            violations = parseInt(violationField, 10);
        }


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
            case "connecticut":
                finePerViolation = 5000;
                break;
            case "delaware":
                finePerViolation = 10000;
                break;
            case "florida":
                finePerViolation = 50000;
                break;
            case "indiana":
                finePerViolation = 7500;
                break;
            case "iowa":
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
            case "virginia":
                finePerViolation = 7500;
                break;
            case "washington":
                finePerViolation = 7500;
                break;

            // Newly added states
            case "michigan":
                finePerViolation = 7500;
                break;
            case "pennsylvania":
                finePerViolation = 7500;
                break;
            case "illinois":
                finePerViolation = 7500;
                break;
            case "kentucky":
                finePerViolation = 7500;
                break; // Kentucky (added)
            case "maine":
                finePerViolation = 7500;
                break;
            case "newyork":
                finePerViolation = 7500;
                break;
            case "northcarolina":
                finePerViolation = 7500;
                break;
            case "westvirginia":
                finePerViolation = 7500;
                break;
            case "wisconsin":
                finePerViolation = 7500;
                break;

            // GDPR fines based on percentage of annual revenue
            case "gdpr-2%":
                totalFine = 0.02 * annualRevenue;
                currency = "EUR"; // Set currency to EUR for GDPR
                break;
            case "gdpr-4%":
                totalFine = 0.04 * annualRevenue;
                currency = "EUR"; // Set currency to EUR for GDPR
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

        // Append the result for each region with currency abbreviation
        totalFineOutput += `${capitalizeFirstLetter(region)}: ${formattedFine} ${currency === 'USD' ? 'USD' : 'EUR'}<br>`;
    });

    // Display the results in the "totalFine" section
    document.getElementById('totalFine').innerHTML = totalFineOutput;
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to format numbers with commas
function formatWithCommas(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Event listener to add commas as you type
document.getElementById('violations').addEventListener('input', function (e) {
    let value = e.target.value.replace(/,/g, ''); // Remove any existing commas
    if (!isNaN(value) && value !== '') {
        let formattedValue = formatWithCommas(value); // Format the value with commas
        e.target.value = formattedValue;
    }
});

// Event listener to add commas as you type for annual revenue
document.getElementById('annualRevenue').addEventListener('input', function (e) {
    let value = e.target.value.replace(/,/g, ''); // Remove any existing commas
    if (!isNaN(value) && value !== '') {
        let formattedValue = formatWithCommas(value); // Format the value with commas
        e.target.value = formattedValue;
    }
});





