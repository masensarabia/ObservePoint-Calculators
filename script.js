function calculateSavings() {
    // Manual Employee Testing Calculations
    let manualTime = parseFloat(document.getElementById('manualTime').value);
    let pagesToTest = parseFloat(document.getElementById('pagesToTest').value);
    let manualRate = parseFloat(document.getElementById('manualRate').value);

    let totalManualTestingTime = (manualTime * pagesToTest) / 60;
    let totalManualCost = totalManualTestingTime * manualRate;

    document.getElementById('totalManualTime').textContent = numberWithCommas(totalManualTestingTime.toFixed(2)) + " hours";
    document.getElementById('totalManualCost').textContent = "$" + numberWithCommas(totalManualCost.toFixed(2));

    // ObservePoint Scanning Calculations
    let opRate = parseFloat(document.getElementById('opRate').value);
    let opPages = parseFloat(document.getElementById('opPages').value);
    let opCost = parseFloat(document.getElementById('opCost').value);

    let totalOPTestingTime = (opPages / opRate) / 60;
    let totalOPCost = opPages * opCost;

    document.getElementById('totalOPTime').textContent = numberWithCommas(totalOPTestingTime.toFixed(2)) + " hours";
    document.getElementById('totalOPCost').textContent = "$" + numberWithCommas(totalOPCost.toFixed(2));

    // Time and Cost Saved Calculations
    let timeSaved = totalManualTestingTime - totalOPTestingTime;
    let costSaved = totalManualCost - totalOPCost;

    document.getElementById('totalHoursSaved').textContent = numberWithCommas(timeSaved.toFixed(2)) + " hours";
    document.getElementById('totalMoneySaved').textContent = "$" + numberWithCommas(costSaved.toFixed(2));

    // Actual Manual Employee Testing Calculations
    let actualManualTime = parseFloat(document.getElementById('actualManualTime').value);
    let actualPagesTested = parseFloat(document.getElementById('actualPagesTested').value);

    let actualManualCost = (actualManualTime / totalManualTestingTime) * totalManualCost;
    document.getElementById('actualManualCost').textContent = "$" + numberWithCommas(actualManualCost.toFixed(2));

    // Actual ObservePoint Testing Calculations
    let actualOPRate = parseFloat(document.getElementById('actualOPRate').value);
    let actualOPCost = parseFloat(document.getElementById('actualOPCost').value);

    let actualOPTestingTime = (actualPagesTested / actualOPRate) / 60;
    let actualTotalOPCost = actualPagesTested * actualOPCost;

    document.getElementById('actualOPTime').textContent = numberWithCommas(actualOPTestingTime.toFixed(2)) + " hours";
    document.getElementById('actualOPCostDisplay').textContent = "$" + numberWithCommas(actualTotalOPCost.toFixed(2));

    // Actual Time and Cost Saved Summary Calculations
    let actualTimeSaved = actualManualTime - actualOPTestingTime;
    let actualCostSaved = actualManualCost - actualTotalOPCost;

    document.getElementById('actualTotalHoursSaved').textContent = numberWithCommas(actualTimeSaved.toFixed(2)) + " hours";
    document.getElementById('actualTotalMoneySaved').textContent = "$" + numberWithCommas(actualCostSaved.toFixed(2));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
