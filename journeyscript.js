// Function to format numbers with commas
function formatNumberWithCommas(input) {
    let value = input.value.replace(/,/g, ''); // Remove commas
    if (!isNaN(value) && value !== '') {
        input.value = parseFloat(value).toLocaleString(); // Add commas
    }
}

// Add event listeners for formatting numbers with commas
document.getElementById('pagesToTest').addEventListener('input', function() {
    formatNumberWithCommas(this);
});
document.getElementById('actualManualTime').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

// Pre-populate the "Actual ObservePoint Scanning Rate" field with 70
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('actualOPRate').value = 0.5;
});

// Function to format numbers with commas
function formatNumberWithCommas(input) {
    let value = input.value.replace(/,/g, ''); // Remove commas
    if (!isNaN(value) && value !== '') {
        input.value = parseFloat(value).toLocaleString(); // Add commas
    }
}

// Add event listeners for formatting numbers with commas
document.getElementById('pagesToTest').addEventListener('input', function() {
    formatNumberWithCommas(this);
});
document.getElementById('actualManualTime').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

// Pre-populate the "Actual ObservePoint Scanning Rate" field with 70
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('opRate').value = 0.5;
});

function calculateSavings() {
    try {
        // Manual Employee Testing calculations
        let manualTime = parseFloat(document.getElementById('manualTime').value) || 0;
        let journeysToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, '')) || 0;
        let testFrequency = parseFloat(document.getElementById('testFrequency').value.replace(/,/g, '')) || 0;
        let stepsPerJourney = parseFloat(document.getElementById('stepsPerJourney').value.replace(/,/g, '')) || 0;
        let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, '')) || 0;

        let totalManualTestingTimeMonthly = (manualTime * journeysToTest * testFrequency) / 60;
        let totalManualCostMonthly = totalManualTestingTimeMonthly * manualRate;
        let totalManualTestingTimeAnnually = totalManualTestingTimeMonthly * 12;
        let totalManualCostAnnually = totalManualCostMonthly * 12;

        document.getElementById('totalManualTime').textContent = totalManualTestingTimeMonthly.toFixed(2) + " hours";
        document.getElementById('totalManualCost').textContent = "$" + totalManualCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
        document.getElementById('totalAnnualManualTime').textContent = totalManualTestingTimeAnnually.toFixed(2) + " hours";
        document.getElementById('totalAnnualManualCost').textContent = "$" + totalManualCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // ObservePoint Scanning calculations
        let opRate = parseFloat(document.getElementById('opRate').value) || 0;
        let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, '')) || 0;

        let totalJourneysAnnually = journeysToTest * testFrequency * 12;

        // Calculate ObservePoint Scanning Time based on actions and steps
        let totalOPTestingTimeAnnually = (totalJourneysAnnually * stepsPerJourney * opRate) / 60;
        let totalOPTestingTimeMonthly = totalOPTestingTimeAnnually / 12;
        let totalOPCostMonthly = (totalJourneysAnnually / 12) * opCost;
        let totalOPCostAnnually = totalJourneysAnnually * opCost;

        document.getElementById('opJourneys').textContent = totalJourneysAnnually.toLocaleString();
        document.getElementById('totalOPTime').textContent = totalOPTestingTimeAnnually.toFixed(2) + " hours";
        document.getElementById('totalOPTimeMonthly').textContent = totalOPTestingTimeMonthly.toFixed(2) + " hours"; // Monthly OP time
        document.getElementById('totalOPCostMonthly').textContent = "$" + totalOPCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
        document.getElementById('totalOPCost').textContent = "$" + totalOPCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // Time and Cost Saved
        let timeSavedMonthly = totalManualTestingTimeMonthly - totalOPTestingTimeMonthly;
        let costSavedMonthly = totalManualCostMonthly - totalOPCostMonthly;
        let timeSavedAnnually = totalManualTestingTimeAnnually - totalOPTestingTimeAnnually;
        let costSavedAnnually = totalManualCostAnnually - totalOPCostAnnually;

        document.getElementById('totalHoursSaved').textContent = timeSavedMonthly.toFixed(2) + " hours";
        document.getElementById('totalMoneySaved').textContent = "$" + costSavedMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
        document.getElementById('totalHoursSavedAnnually').textContent = timeSavedAnnually.toFixed(2) + " hours";
        document.getElementById('totalMoneySavedAnnually').textContent = "$" + costSavedAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // Additional Metrics: FTE and Annual Cost per Employee
        let annualHoursPerFTE = 2080; // Assuming 40 hours per week for 52 weeks
        let totalFTEs = totalManualTestingTimeAnnually / annualHoursPerFTE;
        let annualCostPerFTE = totalManualCostAnnually / totalFTEs;

        document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";
        document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, { minimumFractionDigits: 2 });

        // Actual Testing
        let actualManualTime = parseFloat(document.getElementById('actualManualTime').value.replace(/,/g, '')) || 0;
        let actualManualCost = actualManualTime * manualRate;

        document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 });
    } catch (error) {
        console.error("An error occurred: ", error);
    }
}


