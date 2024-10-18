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
    let opRate = parseFloat(document.getElementById('opRate').value);
    let totalJourneysAnnually = journeysToTest * testFrequency * 12;
    let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, ''));

    let totalOPTestingTimeAnnually = (totalJourneysAnnually * stepsPerJourney * 2) / 60;
    let totalOPCostMonthly = (totalJourneysAnnually / 12) * opCost;
    let totalOPCostAnnually = totalJourneysAnnually * opCost;

    document.getElementById('opJourneys').textContent = totalJourneysAnnually.toLocaleString();
    document.getElementById('totalOPTime').textContent = totalOPTestingTimeAnnually.toFixed(2) + " hours";
    document.getElementById('totalOPCostMonthly').textContent = "$" + totalOPCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('totalOPCost').textContent = "$" + totalOPCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Time and Cost Saved
    let timeSavedMonthly = Math.max(0, totalManualTestingTimeMonthly - (totalOPTestingTimeAnnually / 12));
    let costSavedMonthly = Math.max(0, totalManualCostMonthly - totalOPCostMonthly);
    let timeSavedAnnually = Math.max(0, totalManualTestingTimeAnnually - totalOPTestingTimeAnnually);
    let costSavedAnnually = Math.max(0, totalManualCostAnnually - totalOPCostAnnually);

    document.getElementById('totalHoursSaved').textContent = timeSavedMonthly.toFixed(2) + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + costSavedMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Additional Metrics: FTE and Annual Cost per Employee
    let annualHoursPerFTE = 2080; // Assuming 40 hours per week for 52 weeks
    let totalFTEs = totalManualTestingTimeAnnually / annualHoursPerFTE;

    if (totalFTEs > 0) {
        let annualCostPerFTE = totalManualCostAnnually / totalFTEs;
        document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, { minimumFractionDigits: 2 });
    } else {
        document.getElementById('annualCostPerFTE').textContent = "$0";
    }

    document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";

    // Actual Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value.replace(/,/g, ''));
    let actualManualCost = actualManualTime * manualRate;

    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 });
}

