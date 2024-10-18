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
    document.getElementById('actualOPRate').value = 2;
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
    document.getElementById('actualOPRate').value = 2;
});

function calculateSavings() {
    // Manual Employee Testing calculations
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let journeysToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, ''));
    let testFrequency = parseFloat(document.getElementById('testFrequency').value.replace(/,/g, ''));
    let stepsPerJourney = parseFloat(document.getElementById('stepsPerJourney').value.replace(/,/g, ''));
    let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, ''));

    let totalManualTestingTimeMonthly = (manualTime * journeysToTest * testFrequency) / 60;
    let totalManualCostMonthly = totalManualTestingTimeMonthly * manualRate;
    let totalManualTestingTimeAnnually = totalManualTestingTimeMonthly * 12;
    let totalManualCostAnnually = totalManualCostMonthly * 12;

    document.getElementById('totalManualTime').textContent = totalManualTestingTimeMonthly.toLocaleString() + " hours";
    document.getElementById('totalManualCost').textContent = "$" + totalManualCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('totalAnnualManualTime').textContent = totalManualTestingTimeAnnually.toLocaleString() + " hours";
    document.getElementById('totalAnnualManualCost').textContent = "$" + totalManualCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // ObservePoint Scanning calculations
    let opRate = parseFloat(document.getElementById('opRate').value); // Time per step in minutes
    let totalJourneysAnnually = journeysToTest * testFrequency * 12;
    let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, ''));

    // Calculate monthly and annual testing time for ObservePoint
    let totalOPActionsMonthly = journeysToTest * stepsPerJourney; // Total actions per month
    let totalOPTestingTimeMonthly = (totalOPActionsMonthly * opRate) / 60; // In hours
    let totalOPTestingTimeAnnually = totalOPTestingTimeMonthly * 12; // Annually

    let totalOPCostMonthly = (totalJourneysAnnually / 12) * opCost;
    let totalOPCostAnnually = totalJourneysAnnually * opCost;

    document.getElementById('opJourneys').textContent = totalJourneysAnnually.toLocaleString();
    document.getElementById('totalOPTime').textContent = totalOPTestingTimeAnnually.toFixed(2) + " hours";
    document.getElementById('totalOPCostMonthly').textContent = "$" + totalOPCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('totalOPCost').textContent = "$" + totalOPCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Time and Cost Saved
    let timeSavedMonthly = totalManualTestingTimeMonthly - totalOPTestingTimeMonthly;
    let costSavedMonthly = totalManualCostMonthly - totalOPCostMonthly;
    let timeSavedAnnually = totalManualTestingTimeAnnually - totalOPTestingTimeAnnually;
    let costSavedAnnually = totalManualCostAnnually - totalOPCostAnnually;

    document.getElementById('totalHoursSaved').textContent = (timeSavedMonthly > 0 ? timeSavedMonthly.toFixed(2) : 0) + " hours";
    document.getElementById('totalHoursSavedAnnually').textContent = (timeSavedAnnually > 0 ? timeSavedAnnually.toFixed(2) : 0) + " hours";
    document.getElementById('totalMoneySaved').textContent = (costSavedMonthly > 0 ? "$" + costSavedMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "$0");
    document.getElementById('totalMoneySavedAnnually').textContent = (costSavedAnnually > 0 ? "$" + costSavedAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "$0");

    // Additional Metrics: FTE and Annual Cost per Employee
    let annualHoursPerFTE = 2080; // Assuming 40 hours per week for 52 weeks
    let totalFTEs = totalManualTestingTimeAnnually / annualHoursPerFTE;
    let annualCostPerFTE = totalManualCostAnnually / totalFTEs;

    document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";
    document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual Testing Calculations
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value.replace(/,/g, ''));
    let actualManualCost = actualManualTime * manualRate;
    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual ObservePoint Testing Calculations
    let actualOPActions = parseFloat(document.getElementById('actualJourneysTested').value) * stepsPerJourney;
    let actualOPTime = (actualOPActions * opRate) / 60;
    let actualOPCost = actualOPActions * opCost;

    document.getElementById('actualOPTime').textContent = actualOPTime.toFixed(2) + " hours";
    document.getElementById('actualOPTotalCost').textContent = "$" + actualOPCost.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

