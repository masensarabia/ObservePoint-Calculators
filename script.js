// Function to format numbers with commas
function formatNumberWithCommas(input) {
    let value = input.value.replace(/,/g, ''); // Remove commas
    if (!isNaN(value) && value !== '') {
        input.value = parseFloat(value).toLocaleString(); // Add commas
    }
}

// Add event listeners for formatting numbers with commas
document.getElementById('pagesToTest').addEventListener('input', function() {
    formatNumberWithCommas(this);
});
document.getElementById('opPages').addEventListener('input', function() {
    formatNumberWithCommas(this);
});

// Main calculation function
function calculateSavings() {
    try {
        // Manual Testing Inputs
        let manualTime = parseFloat(document.getElementById('manualTime').value) || 0;
        let pagesToTest = parseFloat(document.getElementById('pagesToTest').value.replace(/,/g, '')) || 0;
        let manualRate = parseFloat(document.getElementById('manualRate').value.replace(/[^0-9.]/g, '')) || 0;

        // ObservePoint Scanning Inputs
        let opRate = parseFloat(document.getElementById('opRate').value) || 0;
        let opPages = parseFloat(document.getElementById('opPages').value.replace(/,/g, '')) || 0;
        let opCost = parseFloat(document.getElementById('opCost').value.replace(/[^0-9.]/g, '')) || 0;

        // Manual Testing Calculations
        let totalManualTestingTime = (manualTime * pagesToTest) / 60; // Hours
        let totalManualCost = totalManualTestingTime * manualRate;

        document.getElementById('totalManualTime').textContent = `${totalManualTestingTime.toFixed(2)} hours`;
        document.getElementById('totalManualCost').textContent = `$${totalManualCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // ObservePoint Scanning Calculations
        let totalOPTestingTime = (opPages / opRate) / 60; // Hours
        let totalOPCost = opPages * opCost;

        document.getElementById('totalOPTime').textContent = `${totalOPTestingTime.toFixed(2)} hours`;
        document.getElementById('totalOPCost').textContent = `$${totalOPCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // Savings Calculations
        let timeSaved = totalManualTestingTime - totalOPTestingTime;
        let moneySaved = totalManualCost - totalOPCost;

        document.getElementById('totalHoursSaved').textContent = `${timeSaved.toFixed(2)} hours`;
        document.getElementById('totalMoneySaved').textContent = `$${moneySaved.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

        // FTE Calculation
        let annualHoursPerFTE = 2080; // 40 hours per week for 52 weeks
        let totalFTEs = totalManualTestingTime / annualHoursPerFTE;
        document.getElementById('totalFTEs').textContent = `${totalFTEs.toFixed(2)} FTEs`;

        // Reduction Percentages
        let timeReductionPercentage = ((timeSaved / totalManualTestingTime) * 100).toFixed(2);
        let costReductionPercentage = ((moneySaved / totalManualCost) * 100).toFixed(2);

        document.getElementById('timeReductionPercentage').textContent = `${timeReductionPercentage}%`;
        document.getElementById('costReductionPercentage').textContent = `${costReductionPercentage}%`;

        // Result Summary
        let resultSentence = `Results in percentage for OP Platform: ${timeReductionPercentage}% reduction in time spent and ${costReductionPercentage}% of the cost were saved compared to manual testing, making the organization as a whole ${((totalManualTestingTime / totalOPTestingTime).toFixed(2))} times more productive, while individual employees were ${(manualTime / (opRate / 60)).toFixed(2)} times more productive.`;

        // Style the result sentence prominently
        let resultElement = document.createElement('div');
        resultElement.classList.add('result-sentence');
        resultElement.style.marginTop = "20px";
        resultElement.style.padding = "15px";
        resultElement.style.border = "2px solid gold";
        resultElement.style.backgroundColor = "black";
        resultElement.style.color = "gold";
        resultElement.style.fontSize = "18px";
        resultElement.style.textAlign = "center";
        resultElement.style.fontWeight = "bold";
        resultElement.textContent = resultSentence;

        // Append or update the result sentence
        let existingResult = document.querySelector('.result-sentence');
        if (existingResult) {
            existingResult.textContent = resultSentence;
        } else {
            document.querySelector('.results-summary').appendChild(resultElement);
        }
    } catch (error) {
        console.error("An error occurred during calculation:", error);
    }
}
