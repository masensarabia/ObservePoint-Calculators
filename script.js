function calculateSavings() {
    // Manual Employee Testing
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value);
    let manualRate = parseFloat(document.getElementById('manualRate').value);
    
    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;
    
    document.getElementById('totalManualTime').textContent = totalManualTestingTime.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " hours";
    document.getElementById('totalManualCost').textContent = "$" + totalManualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // ObservePoint Scanning
    let opRate = parseFloat(document.getElementById('opRate').value);
    let opPages = parseFloat(document.getElementById('opPages').value);
    let opCost = parseFloat(document.getElementById('opCost').value);
    
    let totalOPTestingTime = (opPages / opRate) / 60;
    let totalOPCost = opPages * opCost;
    
    document.getElementById('totalOPTime').textContent = totalOPTestingTime.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " hours";
    document.getElementById('totalOPCost').textContent = "$" + totalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    // Time and Cost Saved
    let timeSaved = totalManualTestingTime - totalOPTestingTime;
    let moneySaved = totalManualCost - totalOPCost;
    
    document.getElementById('totalHoursSaved').textContent = timeSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + moneySaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Actual Manual Employee Testing
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value);
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value);
    let actualManualCost = actualManualTime * manualRate;
    
    document.getElementById('actualManualCost').textContent = "$" + actualManualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    // Actual ObservePoint Testing
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCostPerPage = parseFloat(document.getElementById('actualOPCost').value);
    
    let actualOPTestingTime = (actualPagesTested / actualOPRate) / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCostPerPage;
    
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;
    
    document.getElementById('actualOPTime').textContent = actualOPTestingTime.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " hours";
    document.getElementById('actualOPCost').textContent = "$" + actualTotalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById('actualTimeSaved').textContent = actualTimeSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " hours";
    document.getElementById('actualCostSaved').textContent = "$" + actualCostSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Actual Time and Cost Saved (Summary)
    document.getElementById('actualTotalHoursSaved').textContent = actualTimeSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + actualCostSaved.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
