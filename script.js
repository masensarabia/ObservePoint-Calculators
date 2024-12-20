// Function to format numbers with commas
function formatNumberWithCommas(input) {
    let value = input.value.replace(/,/g, ''); // Remove commas
    if (!isNaN(value) && value !== '') {
        input.value = parseFloat(value).toLocaleString(); // Add commas
    }
}

// Add event listeners for formatting numbers with commas
document.getElementById('pagesToTest').addEventListener('input', function () {
    formatNumberWithCommas(this);
});
document.getElementById('opPages').addEventListener('input', function () {
    formatNumberWithCommas(this);
});

// Main calculation function
function calculateSavings() {
    try {
        // Manual Testing Inputs
        let manualTime = parseFloat(document.getElementById('manualTime').value) || 0;
        let pagesToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, '')) || 0;
        let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, '')) || 0;
        let manualEmployees = parseFloat(document.getElementById('manualEmployees').value) || 1; // Default to 1 employee

        // ObservePoint Scanning Inputs
        let opRate = parseFloat(document.getElementById('opRate').value) || 0;
        let opPages = parseFloat(document.getElementById('opPages').value.replace(/,/g, '')) || 0;
        let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, '')) || 0;

        // Manual Testing Calculations
        let totalManualTestingTime = (manualTime * pagesToTest) / 60; // Convert to hours
        let totalManualCost = totalManualTestingTime * manualRate;

        document.getElementById('totalManualTime').textContent = `${totalManualTestingTime.toFixed(2)} hours`;
        document.getElementById('totalManualCost').textContent = `$${totalManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // ObservePoint Scanning Calculations
        let totalOPTestingTime = (opPages / opRate) / 60; // Convert to hours
        let totalOPCost = opPages * opCost;

        document.getElementById('totalOPTime').textContent = `${totalOPTestingTime.toFixed(2)} hours`;
        document.getElementById('totalOPCost').textContent = `$${totalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // Savings Calculations
        let timeSaved = totalManualTestingTime - totalOPTestingTime;
        let moneySaved = totalManualCost - totalOPCost;

        document.getElementById('totalHoursSaved').textContent = `${timeSaved.toFixed(2)} hours`;
        document.getElementById('totalMoneySaved').textContent = `$${moneySaved.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // FTE Calculation
        let annualHoursPerFTE = 2080; // 40 hours per week for 52 weeks
        let totalFTEs = totalManualTestingTime / annualHoursPerFTE;

        // Ensure FTE is valid and display
        totalFTEs = isNaN(totalFTEs) || !isFinite(totalFTEs) ? 0 : totalFTEs;
        document.getElementById('totalFTEs').textContent = `${totalFTEs.toFixed(2)} FTEs`;

        // Annual Cost per FTE Calculation
        let annualCostPerFTE = totalFTEs > 0 ? (totalManualCost / totalFTEs) : 0;
        document.getElementById('annualCostPerFTE').textContent = `$${annualCostPerFTE.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // Reduction Percentages
        let timeReductionPercentage = totalManualTestingTime > 0 ? ((timeSaved / totalManualTestingTime) * 100).toFixed(2) : 0;
        let costReductionPercentage = totalManualCost > 0 ? ((moneySaved / totalManualCost) * 100).toFixed(2) : 0;

        document.getElementById('timeReductionPercentage').textContent = `${timeReductionPercentage}%`;
        document.getElementById('costReductionPercentage').textContent = `${costReductionPercentage}%`;

        // Individual Employee Productivity
        let employeeProductivity = opRate > 0 ? ((manualTime / (1 / opRate)) / manualEmployees).toFixed(2) : 0;

        // Update the Result Sentence
        updateResultSentence(timeReductionPercentage, costReductionPercentage, manualEmployees, employeeProductivity);

    } catch (error) {
        console.error("An error occurred during calculation:", error);
    }
}

// Function to update the result sentence
function updateResultSentence(timeReduction, costReduction, manualEmployees, employeeProductivity) {
    let resultElement = document.querySelector('.result-sentence');

    // Construct the sentence dynamically
    let resultSentence = `
        Results in percentage for OP Platform: 
        <span class="highlight-percentage">${timeReduction}%</span> reduction in time spent and 
        <span class="highlight-percentage">${costReduction}%</span> of the cost were saved compared to manual testing, 
        while individual employees (based on ${manualEmployees} employee(s)) were 
        <span class="highlight-percentage">${employeeProductivity} times</span> more productive.
    `;

    // Update the result sentence dynamically
    resultElement.innerHTML = resultSentence;
}
