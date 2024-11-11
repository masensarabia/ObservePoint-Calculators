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

// Pre-populate the "ObservePoint Scanning Rate" field with 70
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('opRate').value = 70;
});

function calculateSavings() {
    try {
        // Manual Employee Testing calculations
        let manualTime = parseFloat(document.getElementById('manualTime').value) || 0;
        let pagesToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, '')) || 0;
        let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, '')) || 0;

        let totalManualTestingTime = (manualTime * pagesToTest) / 60; // in hours
        let totalManualCost = totalManualTestingTime * manualRate;

        document.getElementById('totalManualTime').textContent = totalManualTestingTime.toLocaleString() + " hours";
        document.getElementById('totalManualCost').textContent = "$" + totalManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // ObservePoint Scanning calculations
        let opRate = parseFloat(document.getElementById('opRate').value) || 0;
        let opPages = parseFloat(document.getElementById('opPages').value.replace(/,/g, '')) || 0;
        let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, '')) || 0;

        let totalOPTestingTime = (opPages / opRate) / 60; // in hours
        let totalOPCost = opPages * opCost;

        document.getElementById('totalOPTime').textContent = totalOPTestingTime.toFixed(4) + " hours";
        document.getElementById('totalOPCost').textContent = "$" + totalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // Time and Cost Saved
        let timeSaved = totalManualTestingTime - totalOPTestingTime;
        let moneySaved = totalManualCost - totalOPCost;

        document.getElementById('totalHoursSaved').textContent = timeSaved.toFixed(2) + " hours";
        document.getElementById('totalMoneySaved').textContent = "$" + moneySaved.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // Calculate percentages
        let timeReductionPercentage = ((totalManualTestingTime - totalOPTestingTime) / totalManualTestingTime) * 100;
        let costReductionPercentage = ((totalManualCost - totalOPCost) / totalManualCost) * 100;

        // Productivity Improvements
        let numberOfEmployees = 6; // Example: VShred uses 6 employees
        let organizationProductivity = totalManualTestingTime / totalOPTestingTime;
        let individualProductivity = organizationProductivity / numberOfEmployees;

        // Display Results in Sentence Form
        let resultsSentence = `
            Results in percentage for OP Platform: 
            ${timeReductionPercentage.toFixed(2)}% reduction in time spent and 
            ${costReductionPercentage.toFixed(2)}% of the cost were saved compared to manual testing, 
            making the organization as a whole ${organizationProductivity.toFixed(2)} times more productive, 
            while individual employees were ${individualProductivity.toFixed(2)} times more productive.
        `;

        document.getElementById('resultsSection').textContent = resultsSentence;
    } catch (error) {
        console.error("An error occurred: ", error);
    }
}
