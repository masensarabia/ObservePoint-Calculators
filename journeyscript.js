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
document.getElementById('opPages').addEventListener('input', function() {
    formatNumberWithCommas(this);
});
document.getElementById('actualPagesTested').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

document.getElementById('actualManualTime').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

// Pre-populate the "Actual ObservePoint Scanning Rate" field with 70
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('actualOPRate').value = 70;
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
    let opRate = parseFloat(document.getElementById('opRate').value); // 2 minutes per step
    let opJourneysAnnually = journeysToTest * testFrequency * 12; // Calculating journeys annually

    let opJourneyTime = stepsPerJourney * opRate; // Time per journey (steps * time per step)
    let totalOPTestingTimeAnnually = (opJourneysAnnually * opJourneyTime) / 60; // Total time in hours (Annually)
    let totalOPTestingTimeMonthly = totalOPTestingTimeAnnually / 12; // Total time in hours (Monthly)
    let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, '')); // Cost per journey
    let totalOPCostAnnually = opJourneysAnnually * opCost; // Total cost annually
    let totalOPCostMonthly = totalOPCostAnnually / 12; // Total cost monthly

    // Update the HTML with results
    document.getElementById('totalOPTimeMonthly').textContent = totalOPTestingTimeMonthly.toFixed(4) + " hours";
    document.getElementById('totalOPTimeAnnually').textContent = totalOPTestingTimeAnnually.toFixed(4) + " hours";
    document.getElementById('totalOPCostMonthly').textContent = "$" + totalOPCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('totalOPCost').textContent = "$" + totalOPCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Time and Cost Saved (Hypothetical)
    let timeSavedMonthly = totalManualTestingTimeMonthly - totalOPTestingTimeMonthly;
    let moneySavedMonthly = totalManualCostMonthly - totalOPCostMonthly;

    let timeSavedAnnually = totalManualTestingTimeAnnually - totalOPTestingTimeAnnually;
    let moneySavedAnnually = totalManualCostAnnually - totalOPCostAnnually;

    document.getElementById('totalHoursSaved').textContent = timeSavedMonthly.toFixed(2) + " hours (monthly) / " + timeSavedAnnually.toFixed(2) + " hours (annually)";
    document.getElementById('totalMoneySaved').textContent = "$" + moneySavedMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 }) + " (monthly) / $" + moneySavedAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 }) + " (annually)";

    // Additional Metrics: FTE and Annual Cost per Employee
    let annualHoursPerFTE = 2080; // Assuming 40 hours per week for 52 weeks
    let totalFTEs = totalManualTestingTimeAnnually / annualHoursPerFTE;
    let annualCostPerFTE = totalManualCostAnnually / totalFTEs;

    document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";
    document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value.replace(/,/g, ''));
    let actualPagesTested = parseFloat(document.getElementById('actualJourneysTested').value.replace(/,/g, ''));

    let actualManualCost = actualManualTime * manualRate;

    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value.replace(/[^0-9.]/g, ''));

    let actualOPTestingTime = (actualPagesTested / actualOPRate) / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage;

    document.getElementById('actualOPTime').textContent = actualOPTestingTime.toFixed(4) + " hours";
    document.getElementById('actualOPTotalCost').textContent = "$" + actualTotalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual Time & Cost Saved (Summary)
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;

    document.getElementById('actualTotalHoursSaved').textContent = actualTimeSaved.toFixed(4) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + actualCostSaved.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
