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
document.getElementById('testFrequency').addEventListener('input', function () {
    formatNumberWithCommas(this);
});
document.getElementById('stepsPerJourney').addEventListener('input', function () {
    formatNumberWithCommas(this);
});
document.getElementById('manualRate').addEventListener('input', function () {
    formatNumberWithCommas(this);
});
document.getElementById('opCost').addEventListener('input', function () {
    formatNumberWithCommas(this);
});
document.getElementById('actualManualTime').addEventListener('input', function () {
    formatNumberWithCommas(this);
});

// Pre-populate the "Actual ObservePoint Scanning Rate" field with 70
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('actualOPRate').value = 70;
});

function calculateSavings() {
    // Manual Employee Testing calculations
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let journeysToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, ''));
    let testFrequency = parseFloat(document.getElementById('testFrequency').value.replace(/,/g, ''));
    let stepsPerJourney = parseFloat(document.getElementById('stepsPerJourney').value.replace(/,/g, ''));
    let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, ''));

    // Calculate monthly and annual manual testing time and cost
    let totalManualTestingTimeMonthly = (manualTime * journeysToTest * testFrequency) / 60;
    let totalManualCostMonthly = totalManualTestingTimeMonthly * manualRate;
    let totalManualTestingTimeAnnually = totalManualTestingTimeMonthly * 12;
    let totalManualCostAnnually = totalManualCostMonthly * 12;

    document.getElementById('totalManualTime').textContent = totalManualTestingTimeMonthly.toLocaleString() + " hours";
    document.getElementById('totalManualCost').textContent = "$" + totalManualCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('totalAnnualManualTime').textContent = totalManualTestingTimeAnnually.toLocaleString() + " hours";
    document.getElementById('totalAnnualManualCost').textContent = "$" + totalManualCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Calculate total number of journeys tested annually
    let totalJourneysAnnually = journeysToTest * testFrequency * 12;
    document.getElementById('opJourneys').textContent = totalJourneysAnnually.toLocaleString();

    // ObservePoint Scanning calculations
    let opRate = parseFloat(document.getElementById('opRate').value);
    let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, ''));

    let totalOPTestingTimeAnnually = (totalJourneysAnnually * stepsPerJourney * opRate) / 60;
    let totalOPCostAnnually = totalJourneysAnnually * opCost;
    let totalOPCostMonthly = totalOPCostAnnually / 12;

    document.getElementById('totalOPTime').textContent = totalOPTestingTimeAnnually.toFixed(4) + " hours";
    document.getElementById('totalOPCostMonthly').textContent = "$" + totalOPCostMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 });
    document.getElementById('totalOPCost').textContent = "$" + totalOPCostAnnually.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Time and Cost Saved (Hypothetical)
    let timeSaved = totalManualTestingTimeAnnually - totalOPTestingTimeAnnually;
    let moneySaved = totalManualCostAnnually - totalOPCostAnnually;

    document.getElementById('totalHoursSaved').textContent = timeSaved.toFixed(2) + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + moneySaved.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Additional Metrics: FTE and Annual Cost per Employee
    let annualHoursPerFTE = 2080; // Assuming 40 hours per week for 52 weeks
    let totalFTEs = totalManualTestingTimeAnnually / annualHoursPerFTE;
    let annualCostPerFTE = totalManualCostAnnually / totalFTEs;

    document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";
    document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value.replace(/,/g, ''));
    let actualJourneysTested = parseFloat(document.getElementById('actualJourneysTested').value.replace(/,/g, ''));

    let actualManualCost = actualManualTime * manualRate;
    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value.replace(/[^0-9.]/g, ''));

    let actualOPTestingTime = (actualJourneysTested * stepsPerJourney * actualOPRate) / 60;
    let actualTotalOPCost = actualJourneysTested * actualOPCostPerPage;

    document.getElementById('actualOPTime').textContent = actualOPTestingTime.toFixed(4) + " hours";
    document.getElementById('actualOPTotalCost').textContent = "$" + actualTotalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2 });

    // Actual Time & Cost Saved (Summary)
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;

    document.getElementById('actualTotalHoursSaved').textContent = actualTimeSaved.toFixed(4) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + actualCostSaved.toLocaleString(undefined, { minimumFractionDigits: 2 });
}
