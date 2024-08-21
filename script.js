function calculateROI() {
    const numPageScans = parseFloat(document.getElementById('numPageScans').value);
    const avgCostPerError = parseFloat(document.getElementById('avgCostPerError').value);
    const errorDetectionRate = parseFloat(document.getElementById('errorDetectionRate').value);
    const timeSavedPerPage = parseFloat(document.getElementById('timeSavedPerPage').value);
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const subscriptionCost = parseFloat(document.getElementById('subscriptionCost').value);

    const totalErrorsDetected = numPageScans * errorDetectionRate;
    const costSavingsFromErrorDetection = totalErrorsDetected * avgCostPerError;
    const timeSavedMinutes = numPageScans * timeSavedPerPage;
    const timeSavedHours = timeSavedMinutes / 60;
    const costSavingsFromTimeEfficiency = timeSavedHours * hourlyRate;
    const totalSavings = costSavingsFromErrorDetection + costSavingsFromTimeEfficiency;
    const netSavings = totalSavings - subscriptionCost;
    const roiPercentage = (netSavings / subscriptionCost) * 100;

    document.getElementById('totalErrorsDetected').innerText = totalErrorsDetected.toFixed(2);
    document.getElementById('costSavingsFromErrorDetection').innerText = `$${costSavingsFromErrorDetection.toFixed(2)}`;
    document.getElementById('timeSavedMinutes').innerText = timeSavedMinutes.toFixed(2);
    document.getElementById('timeSavedHours').innerText = timeSavedHours.toFixed(2);
    document.getElementById('costSavingsFromTimeEfficiency').innerText = `$${costSavingsFromTimeEfficiency.toFixed(2)}`;
    document.getElementById('totalSavings').innerText = `$${totalSavings.toFixed(2)}`;
    document.getElementById('netSavings').innerText = `$${netSavings.toFixed(2)}`;
    document.getElementById('roiPercentage').innerText = `${roiPercentage.toFixed(2)}%`;
}
