// Function to format numbers with commas
function formatNumberWithCommas(input) {
    let value = input.value.replace(/,/g, ''); // Remove commas
    if (!isNaN(value) && value !== '') {
        input.value = parseFloat(value).toLocaleString(); // Add commas
    }
}

// Function to format the input field with a dollar sign
// Function to format the input field with a dollar sign without automatically adding '.00'
function formatDollarInput(input) {
    let value = input.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except decimal point
    if (!isNaN(value) && value !== '') {
        input.value = `$${parseFloat(value).toFixed(2)}`; // Format with a dollar sign and 2 decimal places
        input.value = value; // Allow free typing without auto-formatting
    } else {
        input.value = ''; // Keep it empty if no valid input
    }
}

// Add event listeners for formatting numbers with commas
document.getElementById('pagesToTest').addEventListener('input', function() {
    formatNumberWithCommas(this);
});
document.getElementById('opPages').addEventListener('input', function() {
    formatNumberWithCommas(this);
});
document.getElementById('actualPagesTested').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

// Add event listeners for formatting dollar inputs
document.getElementById('manualRate').addEventListener('input', function() {
    formatDollarInput(this);
});
document.getElementById('opCost').addEventListener('input', function() {
    formatDollarInput(this);
});
document.getElementById('actualOPCost').addEventListener('input', function() {
    formatDollarInput(this);
});

document.getElementById('actualManualTime').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

// Pre-populate the "Actual ObservePoint Scanning Rate" field with 70
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('actualOPRate').value = 70;
});

function calculateSavings() {
    // Hypothetical Manual Employee Testing
    let manualTime = parseFloat(document.getElementById('manualTime').value) || 0;
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, '')) || 0;
    let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, '')) || 0;

    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;

    document.getElementById('totalManualTime').textContent = totalManualTestingTime.toLocaleString() + " hours";
    document.getElementById('totalManualCost').textContent = "$" + totalManualCost.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Hypothetical ObservePoint Scanning
    let opRate = parseFloat(document.getElementById('opRate').value) || 0;
    let opPages = parseFloat(document.getElementById('opPages').value.replace(/,/g, '')) || 0;
    let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, '')) || 0;

    let totalOPTestingTime = (opPages / opRate) / 60;
    let totalOPCost = opPages * opCost;

    document.getElementById('totalOPTime').textContent = totalOPTestingTime.toFixed(4) + " hours";
    document.getElementById('totalOPCost').textContent = "$" + totalOPCost.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Time and Cost Saved (Hypothetical)
    let timeSaved = totalManualTestingTime - totalOPTestingTime;
    let moneySaved = totalManualCost - totalOPCost;

    // Ensure no negative values for time and cost saved
    timeSaved = Math.max(0, timeSaved);
    moneySaved = Math.max(0, moneySaved);

    document.getElementById('totalHoursSaved').textContent = timeSaved.toFixed(2) + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + moneySaved.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Additional Metrics: FTE and Annual Cost per Employee
    let annualHoursPerFTE = 2080; // Assuming 40 hours per week for 52 weeks
    let totalFTEs = totalManualTestingTime > 0 ? totalManualTestingTime / annualHoursPerFTE : 0;
    let annualCostPerFTE = totalFTEs > 0 ? totalManualCost / totalFTEs : 0;

    document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";
    document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value) || 0;
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value.replace(/,/g, '')) || 0;
    let actualManualCost = actualManualTime * manualRate || 0;

    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value) || 0;
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value.replace(/[^0-9.]/g, '')) || 0;

    let actualOPTestingTime = (actualPagesTested / actualOPRate) / 60 || 0;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage || 0;

    let actualTimeSaved = Math.max(0, actualManualTime - actualOPTestingTime);
    let actualCostSaved = Math.max(0, actualManualCost - actualTotalOPCost);

    document.getElementById('actualOPTime').textContent = actualOPTestingTime.toFixed(4) + " hours";
    document.getElementById('actualOPTotalCost').textContent = "$" + actualTotalOPCost.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Actual Time and Cost Saved (Summary)
    document.getElementById('actualTotalHoursSaved').textContent = actualTimeSaved.toFixed(4) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + actualCostSaved.toLocaleString(undefined, {minimumFractionDigits: 2});
}
