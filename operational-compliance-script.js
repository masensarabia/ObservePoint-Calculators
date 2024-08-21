function calculateCMPImplementationCosts() {
    // Get input values
    var hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    var timeIncorrect = parseFloat(document.getElementById('timeIncorrect').value);
    var timeTest = parseFloat(document.getElementById('timeTest').value);
    var numberOfPages = parseFloat(document.getElementById('numberOfPages').value);
    var costOfFine = parseFloat(document.getElementById('costOfFine').value);

    // Calculate time and costs for manual implementation
    var timeCorrect = timeIncorrect + (timeTest / 60) * numberOfPages;
    var costImplementIncorrectly = hourlyRate * timeIncorrect + costOfFine;
    var costImplementCorrectly = hourlyRate * timeCorrect;
    var totalCostCorrectly = costImplementCorrectly + hourlyRate * (timeTest / 60) * numberOfPages;

    // Calculate ObservePoint scanning
    var costPerPage = parseFloat(document.getElementById('costPerPage').value);
    var scanningRate = parseFloat(document.getElementById('scanningRate').value);
    var timeObservePointScan = (numberOfPages / scanningRate) / 60;
    var costObservePointScan = costPerPage * numberOfPages;
    var totalSavingsObservePoint = totalCostCorrectly - costObservePointScan;

    // Display results
    document.getElementById('costImplementIncorrectly').innerText = formatCurrency(costImplementIncorrectly);
    document.getElementById('costImplementCorrectly').innerText = formatCurrency(costImplementCorrectly);
    document.getElementById('timeImplementCorrectly').innerText = formatTime(timeCorrect);
    document.getElementById('totalCostPrivacyFines').innerText = formatCurrency(costOfFine);
    document.getElementById('totalSavingsManual').innerText = formatCurrency(costImplementIncorrectly - totalCostCorrectly);
    document.getElementById('timeObservePointScan').innerText = formatTime(timeObservePointScan);
    document.getElementById('costObservePointScan').innerText = formatCurrency(costObservePointScan);
    document.getElementById('totalSavingsObservePoint').innerText = formatCurrency(totalSavingsObservePoint);
}

function formatCurrency(value) {
    return "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatTime(hours) {
    var h = Math.floor(hours);
    var m = Math.round((hours % 1) * 60);
    return h + " hrs " + m + " mins";
}

