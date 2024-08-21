function calculateSavings() {
    // Hypothetical Manual Employee Testing
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value);
    let manualRate = parseFloat(document.getElementById('manualRate').value);
    
    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;
    
    document.getElementById('totalManualTime').textContent = formatNumber(totalManualTestingTime) + " hours";
    document.getElementById('totalManualCost').textContent = "$" + formatNumber(totalManualCost);

    // Hypothetical ObservePoint Scanning
    let opRate = parseFloat(document.getElementById('opRate').value);
    let opPages = parseFloat(document.getElementById('opPages').value);
    let opCost = parseFloat(document.getElementById('opCost').value);
    
    let totalOPTestingTime = opPages / opRate / 60;
    let totalOPCost = opPages * opCost;
    
    document.getElementById('totalOPTime').textContent = formatNumber(totalOPTestingTime) + " hours";
    document.getElementById('totalOPCost').textContent = "$" + formatNumber(totalOPCost);
    
    // Time and Cost Saved (Hypothetical)
    let timeSaved = totalManualTestingTime - totalOPTestingTime;
    let moneySaved = totalManualCost - totalOPCost;
    
    document.getElementById('totalHoursSaved').textContent = formatNumber(timeSaved) + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + formatNumber(moneySaved);

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value);
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value);
    let actualManualCost = actualManualTime * manualRate;
    
    document.getElementById('actualManualCost').textContent = "$" + formatNumber(actualManualCost);
    
    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value);
    
    let actualOPTestingTime = actualPagesTested / actualOPRate / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage;
    
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;
    
    document.getElementById('actualTimeSaved').textContent = formatNumber(actualTimeSaved) + " hours";
    document.getElementById('actualCostSaved').textContent = "$" + formatNumber(actualCostSaved);

    // Actual Time and Cost Saved (Summary)
    document.getElementById('actualTotalHoursSaved').textContent = formatNumber(actualTimeSaved) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + formatNumber(actualCostSaved);

    // Fix for the zero cost issue
    document.getElementById('actualOPTotalCost').textContent = "$" + formatNumber(actualTotalOPCost);
}

// Function to format numbers with commas
function formatNumber(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
