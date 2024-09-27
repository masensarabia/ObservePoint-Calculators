function calculateSavings() {
    // Hypothetical Manual Employee Testing
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value);
    let manualRate = parseFloat(document.getElementById('manualRate').value);
    
    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;
    
    document.getElementById('totalManualTime').textContent = totalManualTestingTime.toLocaleString() + " hours";
    document.getElementById('totalManualCost').textContent = "$" + totalManualCost.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Hypothetical ObservePoint Scanning
    let opRate = parseFloat(document.getElementById('opRate').value);
    let opPages = parseFloat(document.getElementById('opPages').value);
    let opCost = parseFloat(document.getElementById('opCost').value);
    
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
    let totalFTEs = totalManualTestingTime / annualHoursPerFTE;
    let annualCostPerFTE = totalManualCost / totalFTEs;

    document.getElementById('totalFTEs').textContent = totalFTEs.toFixed(2) + " FTEs";
    document.getElementById('annualCostPerFTE').textContent = "$" + annualCostPerFTE.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value);
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value);
    let actualManualCost = actualManualTime * manualRate;
    
    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, {minimumFractionDigits: 2});
    
    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value);
    
    let actualOPTestingTime = (actualPagesTested / actualOPRate) / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage;
    
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;

    // Ensure no negative values for actual time and cost saved
    actualTimeSaved = Math.max(0, actualTimeSaved);
    actualCostSaved = Math.max(0, actualCostSaved);
    
    document.getElementById('actualOPTime').textContent = actualOPTestingTime.toFixed(4) + " hours";
    document.getElementById('actualOPTotalCost').textContent = "$" + actualTotalOPCost.toLocaleString(undefined, {minimumFractionDigits: 2});

    // Actual Time and Cost Saved (Summary)
    document.getElementById('actualTotalHoursSaved').textContent = actualTimeSaved.toFixed(4) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + actualCostSaved.toLocaleString(undefined, {minimumFractionDigits: 2});
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('opRate').value = 70; // Set default value for ObservePoint rate
});
