function calculateScanningTimes() {
    // Get input values for manual employee testing
    const manualTestTime = parseFloat(document.getElementById('manualTestTime').value) || 0;
    const numPagesTest = parseInt(document.getElementById('numPagesTest').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value) || 0;

    // Get input values for ObservePoint scanning
    const pagesPerMinute = parseFloat(document.getElementById('pagesPerMinute').value) || 0;
    const costPerPage = parseFloat(document.getElementById('costPerPage').value) || 0;

    // Calculate manual testing time
    const totalManualTestingTimeMinutes = manualTestTime * numPagesTest;
    const totalManualTestingTimeHours = totalManualTestingTimeMinutes / 60;
    const manualDays = Math.floor(totalManualTestingTimeHours / 24);
    const manualHours = Math.floor(totalManualTestingTimeHours % 24);
    const manualMinutes = totalManualTestingTimeMinutes % 60;
    const manualTimeOutput = `${manualDays} days ${manualHours} hrs ${manualMinutes.toFixed(0)} mins`;

    // Calculate cost for manual testing
    const totalCostManualTesting = totalManualTestingTimeHours * hourlyRate;

    // Calculate ObservePoint scanning time
    const totalObservePointScanningTimeMinutes = numPagesTest / pagesPerMinute;
    const totalObservePointScanningTimeHours = totalObservePointScanningTimeMinutes / 60;
    const observePointDays = Math.floor(totalObservePointScanningTimeHours / 24);
    const observePointHours = Math.floor(totalObservePointScanningTimeHours % 24);
    const observePointMinutes = totalObservePointScanningTimeMinutes % 60;
    const observePointTimeOutput = `${observePointDays} days ${observePointHours} hrs ${observePointMinutes.toFixed(0)} mins`;

    // Calculate cost for ObservePoint scanning
    const totalCostObservePoint = numPagesTest * costPerPage;

    // Calculate ROI metrics
    const hoursSaved = totalManualTestingTimeHours - totalObservePointScanningTimeHours;
    const moneySaved = totalCostManualTesting - totalCostObservePoint;

    // Format dollar amounts
    const formattedTotalCostObservePoint = `$${totalCostObservePoint.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const formattedTotalCostManualTesting = `$${totalCostManualTesting.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    const formattedMoneySaved = `$${moneySaved.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

    // Set output values
    document.getElementById('manualTimeOutput').innerText = manualTimeOutput;
    document.getElementById('manualCostOutput').innerText = formattedTotalCostManualTesting;
    document.getElementById('observePointTimeOutput').innerText = observePointTimeOutput;
    document.getElementById('observePointCostOutput').innerText = formattedTotalCostObservePoint;
    document.getElementById('hoursSavedOutput').innerText = `${hoursSaved.toFixed(2)} hrs`;
    document.getElementById('moneySavedOutput').innerText = formattedMoneySaved;
}
