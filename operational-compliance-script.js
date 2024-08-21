function calculateCMPImplementationCosts() {
    // Manual CMP Implementation
    var hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    var timeImplementIncorrectly = parseFloat(document.getElementById('timeIncorrect').value);
    var timeTestPage = parseFloat(document.getElementById('timeTest').value);
    var numberOfPages = parseFloat(document.getElementById('numberOfPages').value);
    var costOfFine = parseFloat(document.getElementById('costOfFine').value);

    var timeImplementCorrectly = timeImplementIncorrectly + (timeTestPage / 60) * numberOfPages;
    var costImplementIncorrectly = (hourlyRate * timeImplementIncorrectly) + costOfFine;
    var costImplementCorrectly = hourlyRate * timeImplementCorrectly;
    var costTestPages = hourlyRate * (timeTestPage / 60) * numberOfPages;
    var totalCostCorrectly = costImplementCorrectly + costTestPages;
    var totalCostPrivacyFines = costOfFine;
    var totalSavingsManual = totalCostPrivacyFines - totalCostCorrectly;

    // Time to Hours/Minutes Format
    function convertToHoursMinutes(totalHours) {
        var hours = Math.floor(totalHours);
        var minutes = Math.round((totalHours % 1) * 60);
        return hours + " hrs " + minutes + " mins";
    }

    // Update the Results in the HTML
    document.getElementById('timeImplementCorrectly').textContent = convertToHoursMinutes(timeImplementCorrectly);
    document.getElementById('costImplementIncorrectly').textContent = "$" + costImplementIncorrectly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('costImplementCorrectly').textContent = "$" + costImplementCorrectly.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('totalSavingsManual').textContent = "$" + totalSavingsManual.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // ObservePoint Scanning
    var costPerPage = parseFloat(document.getElementById('costPerPage').value);
    var scanningRate = parseFloat(document.getElementById('scanningRate').value);
    var timeObservePointScan = (numberOfPages / scanningRate) / 60;
    var costObservePointScan = costPerPage * numberOfPages;
    var totalSavingsObservePoint = totalCostCorrectly - costObservePointScan;

    document.getElementById('timeObservePointScan').textContent = convertToHoursMinutes(timeObservePointScan);
    document.getElementById('costObservePointScan').textContent = "$" + costObservePointScan.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('totalSavingsObservePoint').textContent = "$" + totalSavingsObservePoint.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
