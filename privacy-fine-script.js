function toggleFineOptions() {
    const region = document.getElementById('region').value;
    const annualRevenueInput = document.getElementById('annualRevenueInput');
    if (region === 'gdpr_2' || region === 'gdpr_4') {
        annualRevenueInput.style.display = 'block';
    } else {
        annualRevenueInput.style.display = 'none';
    }
}

function calculateFine() {
    const violations = parseInt(document.getElementById('violations').value);
    const region = document.getElementById('region').value;
    const annualRevenue = parseFloat(document.getElementById('annualRevenue').value);
    
    let finePerViolation = 0;
    let totalFine = 0;
    let currency = "USD";

    switch (region) {
        case "utah":
            finePerViolation = 7500;
            break;
        case "california":
            finePerViolation = 2500; // Negligence
            break;
        case "california_intentional":
            finePerViolation = 7500; // Intentional
            break;
        case "california_minors":
            finePerViolation = 7500; // Minors
            break;
        case "colorado":
            finePerViolation = 20000; // Standard
            break;
        case "colorado_elderly":
            finePerViolation = 50000; // Elderly Involved
            break;
        case "virginia":
            finePerViolation = 7500;
            break;
        case "connecticut":
            finePerViolation = 5000;
            break;
        case "delaware":
            finePerViolation = 10000;
            break;
        case "indiana":
            finePerViolation = 7500;
            break;
        case "iowa":
            finePerViolation = 7500;
            break;
        case "kentucky":
            finePerViolation = 7500;
            break;
        case "maryland":
            finePerViolation = 10000;
            break;
        case "minnesota":
            finePerViolation = 7500; // Placeholder, adjust as needed
            break;
        case "montana":
            finePerViolation = 7500;
            break;
        case "nebraska":
            finePerViolation = 7500;
            break;
        case "newhampshire":
            finePerViolation = 7500;
            break;
        case "newjersey":
            finePerViolation = 10000;
            break;
        case "oregon":
            finePerViolation = 7500;
            break;
        case "rhodeisland":
            finePerViolation = 7500;
            break;
        case "tennessee":
            finePerViolation = 7500;
            break;
        case "texas":
            finePerViolation = 7500;
            break;
        case "washington":
            finePerViolation = 7500;
            break;
        case "gdpr_2":
            totalFine = 0.02 * annualRevenue;
            currency = "EUR";
            break;
        case "gdpr_4":
            totalFine = 0.04 * annualRevenue;
            currency = "EUR";
            break;
        default:
            finePerViolation = 0;
    }

    if (region !== 'gdpr_2' && region !== 'gdpr_4') {
        totalFine = violations * finePerViolation;
    }

    const formattedFine = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(totalFine);

    document.getElementById('totalFine').innerText = `${formattedFine}`;
}