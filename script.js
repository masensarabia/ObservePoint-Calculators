function calculateSavings() {
    // Hypothetical Manual Employee Testing
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value);
    let manualRate = parseFloat(document.getElementById('manualRate').value);
    
    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;
    
    document.getElementById('totalManualTime').textContent = formatNumber(totalManualTestingTime) + " hours";
    document.getElementById('totalManualCost').textContent = formatCurrency(totalManualCost);

    // Hypothetical ObservePoint Scanning
    let opRate = parseFloat(document.getElementById('opRate').value);
    let opPages = parseFloat(document.getElementById('opPages').value);
    let opCost = parseFloat(document.getElementById('opCost').value);
    
    let totalOPTestingTime = (opPages / opRate) / 60;
    let totalOPCost = opPages * opCost;
    
    document.getElementById('totalOPTime').textContent = formatNumber(totalOPTestingTime) + " hours";
    document.getElementById('totalOPCost').textContent = formatCurrency(totalOPCost);
    
    // Time and Cost Saved (Hypothetical)
    let timeSaved = totalManualTestingTime - totalOPTestingTime;
    let moneySaved = totalManualCost - totalOPCost;
    
    document.getElementById('totalHoursSaved').textContent = formatNumber(timeSaved) + " hours";
    document.getElementById('totalMoneySaved').textContent = formatCurrency(moneySaved);

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value);
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value);
    let actualManualCost = (actualManualTime * manualRate);
    
    document.getElementById('actualManualCost').textContent = formatCurrency(actualManualCost);
    
    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value);
    
    let actualOPTestingTime = (actualPagesTested / actualOPRate) / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage;
    
    document.getElementById('actualOPTime').textContent = formatNumber(actualOPTestingTime) + " hours";
    document.getElementById('actualOPCost').textContent = formatCurrency(actualTotalOPCost);
    
    // Actual Time and Cost Saved (Summary)
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;
    
    document.getElementById('actualTotalHoursSaved').textContent = formatNumber(actualTimeSaved) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = formatCurrency(actualCostSaved);
}

// Helper functions to format numbers and currencies
function formatNumber(number) {
    return number.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

function formatCurrency(number) {
    return "$" + number.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).slice(1);
}
