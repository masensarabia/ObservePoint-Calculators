function calculateSavings() {
    // Input Values for Manual Employee Testing
    const manualTestTime = parseFloat(document.getElementById('manualTestTime').value);
    const pagesToTest = parseFloat(document.getElementById('pagesToTest').value);
    const manualHourlyRate = parseFloat(document.getElementById('manualHourlyRate').value);

    // Calculate Manual Testing Outputs
    const totalManualTestingTime = (manualTestTime * pagesToTest) / 60;
    const totalManualTestingCost = totalManualTestingTime * manualHourlyRate;

    // Input Values for ObservePoint Scanning
    const opScanningRate = parseFloat(document.getElementById('opScanningRate').value);
    const opPagesToScan = parseFloat(document.getElementById('opPagesToScan').value);
    const opCostPerPage = parseFloat(document.getElementById('opCostPerPage').value);

    // Calculate ObservePoint Scanning Outputs
    const totalOPScanningTime = opPagesToScan / opScanningRate;
    const totalOPScanningCost = opPagesToScan * opCostPerPage;

    // Calculate Savings
    const hoursSaved = totalManualTestingTime - totalOPScanningTime;
    const moneySaved = totalManualTestingCost - totalOPScanningCost;

    // Display the results
    document.getElementById('totalManualTestingTime').textContent = `${totalManualTestingTime.toFixed(2)} hours`;
    document.getElementById('totalManualTestingCost').textContent = `$${totalManualTestingCost.toFixed(2)}`;
    document.getElementById('totalOPScanningTime').textContent = `${totalOPScanningTime.toFixed(2)} hours`;
    document.getElementById('totalOPScanningCost').textContent = `$${totalOPScanningCost.toFixed(2)}`;
    document.getElementById('hoursSaved').textContent = `${hoursSaved.toFixed(2)} hours`;
    document.getElementById('moneySaved').textContent = `$${moneySaved.toFixed(2)}`;
}
