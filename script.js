function calculateSavings() {
    // Manual Employee Testing
    let manualTime = parseFloat(document.getElementById('manualTime').value) || 0;
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value) || 0;
    let manualRate = parseFloat(document.getElementById('manualRate').value) || 0;
    
    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;
    
    document.getElementById('totalManualTime').textContent = totalManualTestingTime.toLocaleString() + " hours";
    document.getElementById('totalManualCost').textContent = "$" + totalManualCost.toLocaleString();

    // ObservePoint Scanning
    let opRate = parseFloat(document.getElementById('opRate').value) || 0;
    let opPages = parseFloat(document.getElementById('opPages').value) || 0;
    let opCost = parseFloat(document.getElementById('opCost').value) || 0;
    
    let totalOPTestingTime = opPages / opRate / 60;
    let totalOPCost = opPages * opCost;
    
    document.getElementById('totalOPTime').textContent = totalOPTestingTime.toLocaleString() + " hours";
    document.getElementById('totalOPCost').textContent = "$" + totalOPCost.toLocaleString();
    
    // Time & Cost Saved
    let timeSaved = totalManualTestingTime - totalOPTestingTime;
    let moneySaved = totalManualCost - totalOPCost;
    
    document.getElementById('totalHoursSaved').textContent = timeSaved.toLocaleString() + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + moneySaved.toLocaleString();

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value) || 0;
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value) || 0;
    let actualManualCost = actualManualTime * manualRate;
    
    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString();
    
    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value) || 0;
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value) || 0;
    
    let actualOPTestingTime = actualPagesTested / actualOPRate / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage;
    
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;
    
    document.getElementById('actualTimeSaved').textContent = actualTimeSaved.toLocaleString() + " hours";
    document.getElementById('actualCostSaved').textContent = "$" + actualCostSaved.toLocaleString();

    // Actual Time & Cost Saved (Summary)
    document.getElementById('actualTotalHoursSaved').textContent = actualTimeSaved.toLocaleString() + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + actualCostSaved.toLocaleString();
}

// Optional: add logging for debugging
console.log('Manual Time:', manualTime, 'Pages to Test:', pagesToTest, 'Manual Rate:', manualRate);
console.log('OP Rate:', opRate, 'OP Pages:', opPages, 'OP Cost:', opCost);
console.log('Actual Manual Time:', actualManualTime, 'Actual Pages Tested:', actualPagesTested, 'Actual OP Rate:', actualOPRate, 'Actual OP Cost Per Page:', actualOPCostPerPage);
