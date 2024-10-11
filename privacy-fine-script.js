let selectedRegionsSet = new Set();
const totalRegionOptions = document.getElementById("region").options.length; // Get the total number of region options

// Add region and display it properly in the "Selected Regions" section
function addRegion() {
    const selectedRegionOptions = Array.from(document.getElementById("region").selectedOptions).map((option) => option.value);
    let gdprSelected = false; // Flag to check if a GDPR option is selected

    selectedRegionOptions.forEach((region) => {
        selectedRegionsSet.add(region); // Add region to the set

        // Check if GDPR is selected
        if (region === "gdpr-2%" || region === "gdpr-4%") {
            gdprSelected = true;
        }
    });

    // Toggle the visibility of the annualRevenueInput field
    const annualRevenueInput = document.getElementById("annualRevenueInput");
    if (gdprSelected) {
        annualRevenueInput.style.display = "block";
    } else {
        annualRevenueInput.style.display = "none";
    }

    displaySelectedRegions(); // Display the selected regions

    // If "Region to Violation Field" is selected, dynamically add fields
    const violationType = document.getElementById("violationType").value;
    if (violationType === "region") {
        handleViolationTypeChange(); // Re-trigger to add violation fields
    }
}

function displaySelectedRegions() {
    const selectedRegionsDiv = document.getElementById("selectedRegions");
    selectedRegionsDiv.innerHTML = ""; // Clear the content
    selectedRegionsSet.forEach((region) => {
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
    const violationType = document.getElementById("violationType").value;
    if (violationType === "region") {
        handleViolationTypeChange(); // Re-trigger to adjust violation fields
    }
}

function handleViolationTypeChange() {
    const violationType = document.getElementById("violationType").value;
    const violationsContainer = document.getElementById("multipleViolationsContainer");
    const singleViolationField = document.getElementById("violations"); // Single violation input field

    // Clear previous fields completely
    violationsContainer.innerHTML = "";

    // If "multiple" or "region" is selected, hide the single violation input
    if (violationType === "multiple" || violationType === "region") {
        singleViolationField.style.display = "none";

        if (violationType === "multiple") {
            // Create dropdown for selecting how many fields to display based on total region options
            const select = document.createElement("select");
            select.id = "multipleViolationCount";
            for (let i = 1; i <= totalRegionOptions; i++) {
                // Using total region options for the count
                const option = document.createElement("option");
                option.value = i;
                option.text = i;
                select.appendChild(option);
            }
            select.addEventListener("change", function () {
                createMultipleViolationFields(this.value);
            });
            violationsContainer.appendChild(select);
        } else if (violationType === "region") {
            // Create one violation field for each region selected
            selectedRegionsSet.forEach((region) => {
                createViolationFieldForRegion(region);
            });
        }
    } else {
        // If "one" is selected, show the single violation input field and hide the others
        singleViolationField.style.display = "block";
    }
}

function createMultipleViolationFields(count) {
    const violationsContainer = document.getElementById("multipleViolationsContainer");

    // Clear all existing fields in the container
    violationsContainer.innerHTML = "";

    // Add dropdown for selecting number of violations
    const selectLabel = document.createElement("label");
    selectLabel.textContent = "Select Number of Violations:";
    const select = document.createElement("select");
    select.id = "multipleViolationCount";

    for (let i = 1; i <= totalRegionOptions; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }

    // Set the dropdown value to the current count
    select.value = count;

    // Add event listener to regenerate fields when dropdown changes
    select.addEventListener("change", function () {
        createMultipleViolationFields(this.value);
    });

    violationsContainer.appendChild(selectLabel);
    violationsContainer.appendChild(select);

    // Create input fields starting from the second one (first can be hidden or used as you prefer)
    for (let i = 1; i <= count; i++) {
        const label = document.createElement("label");
        label.textContent = `Number of Violations ${i}:`;
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("calculator-input");
        input.id = `violations${i}`;
        input.placeholder = "Enter number of violations";
        violationsContainer.appendChild(label);
        violationsContainer.appendChild(input);
    }
}

// Create individual violation fields based on selected regions
function createViolationFieldForRegion(region) {
    const violationsContainer = document.getElementById("multipleViolationsContainer");
    const label = document.createElement("label");
    label.textContent = `Number of Violations for ${capitalizeFirstLetter(region)}:`;
    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("calculator-input");
    input.id = `violations_${region}`;
    input.placeholder = "Enter number of violations";
    violationsContainer.appendChild(label);
    violationsContainer.appendChild(input);
}

// Add a row to the results table
function addRowToTable(region, violations, totalFine, currency) {
    const resultsTableBody = document.getElementById("resultsTable").querySelector("tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${capitalizeFirstLetter(region)}</td>
        <td>${violations !== "N/A" ? violations : "N/A"}</td>
        <td>${new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(totalFine)}</td>
        <td>${currency}</td>
    `;
    resultsTableBody.appendChild(row);
}

function calculateFine() {
    const violationType = document.getElementById("violationType").value;
    const annualRevenueElement = document.getElementById("annualRevenue");
    const annualRevenue = annualRevenueElement ? parseFloat(annualRevenueElement.value.replace(/,/g, "")) || 0 : 0;
    const singleViolationInput = document.getElementById("violations").value;
    const numberOfViolations = parseInt(singleViolationInput.replace(/,/g, ""), 10) || 0;

    // Clear the table body before adding new rows
    const resultsTableBody = document.getElementById("resultsTable").querySelector("tbody");
    resultsTableBody.innerHTML = "";  // Reset table

    let totalFineOverall = 0; // To accumulate total fine across all regions

    // Process each selected region
    selectedRegionsSet.forEach((region) => {
        let finePerViolation = 0;
        let currency = "USD"; // Default currency set to USD
        let regionTotalFine = 0;  // Total fine for a specific region

        // GDPR calculation block
        if (region === "gdpr-2%" || region === "gdpr-4%") {
            if (region === "gdpr-2%") {
                totalFine = 0.02 * annualRevenue;
                currency = "EUR";
            } else if (region === "gdpr-4%") {
                totalFine = 0.04 * annualRevenue;
                currency = "EUR";
            }

            // Add GDPR row to the table and skip further logic for this region
            addRowToTable(region, "N/A", totalFine, currency);
            totalFineOverall += totalFine;
            return;
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
                break;
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

            default:
                finePerViolation = 0;
        }

        // Handle the "one" violation field type
        if (violationType === "one") {
            const totalFine = numberOfViolations * finePerViolation;

            // Add row to the table for this region
            addRowToTable(region, numberOfViolations, totalFine, currency);
            totalFineOverall += totalFine;  // Sum total fines

        } else if (violationType === "multiple") {
            // Handle multiple violations
            const violationCount = parseInt(document.getElementById("multipleViolationCount").value, 10);

            // Process each violation field for this region
            for (let i = 1; i <= violationCount; i++) {
                const violationField = document.getElementById(`violations${i}`);
                const violations = violationField ? parseInt(violationField.value.replace(/,/g, ""), 10) || 0 : 0;
                const totalFine = violations * finePerViolation;

                // Add row for each violation
                addRowToTable(region, violations, totalFine, currency);

                regionTotalFine += totalFine; // Add to region's total fine
                totalFineOverall += totalFine; // Accumulate overall fine
            }

            // Add a subtotal row for this region
            addRowToTable(`${capitalizeFirstLetter(region)} Total`, "", regionTotalFine, currency);

            // Add a blank row for spacing between different regions
            addRowToTable("", "", "", "");

        } else if (violationType === "region") {
            const violationField = document.getElementById(`violations_${region}`);
            const violations = violationField ? parseInt(violationField.value.replace(/,/g, ""), 10) || 0 : 0;
            const totalFine = violations * finePerViolation;

            // Add row to the table for this region
            addRowToTable(region, violations, totalFine, currency);
            totalFineOverall += totalFine;  // Sum total fines
        }
    });

    // Update total fine display
    document.getElementById("totalFine").textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(totalFineOverall);
}

// Utility function to add a row in the results table
function addRowToTable(region, violations, totalFine, currency) {
    const resultsTableBody = document.getElementById("resultsTable").querySelector("tbody");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${region ? capitalizeFirstLetter(region) : ""}</td>
        <td>${violations !== "N/A" ? violations : ""}</td>
        <td>${totalFine ? new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(totalFine) : ""}</td>
        <td>${currency || ""}</td>
    `;
    resultsTableBody.appendChild(row);
}

// Capitalize first letter of any string (for region names)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function exportToCSV() {
    const resultsTable = document.getElementById("resultsTable");
    const rows = Array.from(resultsTable.querySelectorAll("tr"));

    // Start with the header row
    let csvContent = "Region,Number of Violations,Total Fine,Currency\n";

    rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll("td")).map(cell => {
            let cellText = cell.innerText.trim();

            // Forcing Excel to treat all numbers as text by adding a single quote before the number
            if (!isNaN(cellText) && cellText.length > 0) {
                cellText = `'${cellText}`;  // Force it as text
            }

            return cellText ? cellText : ""; // Default empty cells to blank
        });
        csvContent += cells.join(",") + "\n";
    });

    // Generate the CSV file for download
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "privacy_fine_calculator_results.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}












// Helper function to format numbers with commas
function formatWithCommas(value) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Event listener to add commas as you type
document.getElementById("violations").addEventListener("input", function (e) {
    let value = e.target.value.replace(/,/g, ""); // Remove any existing commas
    if (!isNaN(value) && value !== "") {
        let formattedValue = formatWithCommas(value); // Format the value with commas
        e.target.value = formattedValue;
    }
});

// Event listener to add commas as you type for annual revenue
document.getElementById("annualRevenue").addEventListener("input", function (e) {
    let value = e.target.value.replace(/,/g, ""); // Remove any existing commas
    if (!isNaN(value) && value !== "") {
        let formattedValue = formatWithCommas(value); // Format the value with commas
        e.target.value = formattedValue;
    }
});
