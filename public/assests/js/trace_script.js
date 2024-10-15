let currentSlide = 0;
const slides = document.querySelectorAll('.slides');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds
let income = 0; // Declare a global variable for income

function generateBudget() {
    income = parseFloat(document.getElementById('income').value); // Assign the value to the global variable
    
    if (income <= 0 || isNaN(income)) {
        alert("Please enter a valid income.");
        return;
    }

    // Define three different budget plans
    const plans = {
        least: {
            Savings: 0.05,
            Housing: 0.30,
            Food: 0.15,
            Utilities: 0.07,
            Transportation: 0.10,
            Entertainment: 0.05,
            Education: 0.13,
            Health: 0.10,
            Clothing: 0.05
        },
        default: {
            Savings: 0.15,
            Housing: 0.25,
            Food: 0.15,
            Utilities: 0.07,
            Transportation: 0.10,
            Entertainment: 0.05,
            Education: 0.13,
            Health: 0.05,
            Clothing: 0.05
        },
        best: {
            Savings: 0.30,
            Housing: 0.20,
            Food: 0.10,
            Utilities: 0.05,
            Transportation: 0.10,
            Entertainment: 0.05,
            Education: 0.10,
            Health: 0.05,
            Clothing: 0.05
        }
    };

    // Clear previous budget details for all three plans
    document.querySelectorAll('.budget-plan').forEach(plan => plan.innerHTML = '');

    // Generate the budget for each plan
    for (let planType in plans) {
        const budgetPercentages = plans[planType];
        const budgetPlanDiv = document.querySelector(`#${planType}-savings-plan .budget-plan`);
        
        for (let category in budgetPercentages) {
            let amount = income * budgetPercentages[category];
            let budgetItem = document.createElement('div');
            budgetItem.className = 'budget-item';
            budgetItem.innerHTML = `<span>${category}</span><span> ₹${amount.toFixed(2)}</span>`;
            budgetPlanDiv.appendChild(budgetItem);
        }
    }
}


function selectPlan(planName) {
    const userName = "{{userName}}"; // This should now be populated by the backend
  
    fetch('/updatePlan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedPlan: planName, userName: userName })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Notify the user of the update status
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  



function calculateExpenses() {
    const expenses = {
        housing: getExpense('housing-expense', 'housing-timeframe'),
        food: getExpense('food-expense', 'food-timeframe'),
        utilities: getExpense('utilities-expense', 'utilities-timeframe'),
        transportation: getExpense('transportation-expense', 'transportation-timeframe'),
        entertainment: getExpense('entertainment-expense', 'entertainment-timeframe'),
        education: getExpense('education-expense', 'education-timeframe'),
        health: getExpense('health-expense', 'health-timeframe'),
        clothing: getExpense('clothing-expense', 'clothing-timeframe'),
        savings: getExpense('savings-expense', 'savings-timeframe')
    };

    const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
    
    const resultDiv = document.getElementById('expenses-result');
    resultDiv.innerHTML = `<h3>Total Expenses: ₹${totalExpenses.toFixed(2)}</h3>`;
    
    if (totalExpenses > income) {
        resultDiv.innerHTML += `<p style="color:red;">Warning: Your expenses exceed your income!</p>`;
        suggestBudgetPlan(totalExpenses);
    } else {
        resultDiv.innerHTML += `<p style="color:green;">Good job! Your expenses are within your budget.</p>`;
    }

    // Render chart comparing income and expenses
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.display = 'block'; // Show the chart container
    renderChart(income, totalExpenses);
}

function getExpense(expenseId, timeframeId) {
    const amount = parseFloat(document.getElementById(expenseId).value) || 0;
    const timeframe = document.getElementById(timeframeId).value;
    
    switch (timeframe) {
        case 'monthly':
            return amount; // Monthly expenses are taken as is
        case 'weekly':
            return amount * 4; // Assume 4 weeks in a month
        case 'yearly':
            return amount / 12; // Divide yearly amount to get monthly for comparison
        default:
            return 0; // Default case
    }
}

function suggestBudgetPlan(totalExpenses) {
    let suggestion = "";
    let planDetails = "";

    if (totalExpenses > income * 0.75) {
        suggestion = "Consider the 'Least Savings' plan.";
        planDetails = generatePlanDetails('least');
    } else if (totalExpenses > income * 0.5) {
        suggestion = "You can follow the 'Default' plan.";
        planDetails = generatePlanDetails('default');
    } else {
        suggestion = "Great! You can aim for the 'Best Savings' plan.";
        planDetails = generatePlanDetails('best');
    }

    const resultDiv = document.getElementById('expenses-result');
    resultDiv.innerHTML += `<p>${suggestion}</p>`;
    resultDiv.innerHTML += `<div class="plan-details">${planDetails}</div>`;
}

function generatePlanDetails(planType) {
    const plans = {
        least: {
            Savings: 0.05,
            Housing: 0.30,
            Food: 0.15,
            Utilities: 0.07,
            Transportation: 0.10,
            Entertainment: 0.05,
            Education: 0.13,
            Health: 0.10,
            Clothing: 0.05
        },
        default: {
            Savings: 0.15,
            Housing: 0.25,
            Food: 0.15,
            Utilities: 0.07,
            Transportation: 0.10,
            Entertainment: 0.05,
            Education: 0.13,
            Health: 0.05,
            Clothing: 0.05
        },
        best: {
            Savings: 0.30,
            Housing: 0.20,
            Food: 0.10,
            Utilities: 0.05,
            Transportation: 0.10,
            Entertainment: 0.05,
            Education: 0.10,
            Health: 0.05,
            Clothing: 0.05
        }
    };

    let budgetDetails = `<h4>${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan:</h4><ul>`;
    const budgetPercentages = plans[planType];

    for (let category in budgetPercentages) {
        let amount = income * budgetPercentages[category];
        budgetDetails += `<li>${category}: ₹${amount.toFixed(2)} (${(budgetPercentages[category] * 100).toFixed(0)}%)</li>`;
    }
    budgetDetails += `</ul>`;

    return budgetDetails;
}


function renderChart(income, expenses) {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Amount (₹)', // Updated label
                data: [income, expenses],
                backgroundColor: [
                    'rgba(0, 255, 255, 0.6)', // Income color
                    'rgba(128, 0, 128, 0.6)', // Expenses color
                ],
                borderColor: [
                    'rgba(0, 255, 255, 1)',
                    'rgba(128, 0, 128, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount (₹)' // Y-axis title updated
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + value; // Add Rupee symbol to Y-axis ticks
                        }
                    }
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Budget Comparison'
                }
            }
        }
    });
}

// Function to prompt for category adjustment
function askCategory() {
    document.getElementById('category-selection').style.display = 'block';
}

function skipCategory() {
    alert('No additional savings will be added.');
    // You can proceed with final steps here
}

function allowPlanSelection() {
    // Logic to enable selection of one of the three plans
    alert('Please select one of the updated budget plans.');
    // You can further refine this to let users pick a plan and finalize it
}

document.querySelectorAll('.plan').forEach(plan => {
    plan.addEventListener('click', function() {
        // Remove other plans
        document.querySelectorAll('.plan').forEach(otherPlan => {
            if (otherPlan !== this) {
                otherPlan.style.display = 'none'; // Hide other plans
            }
        });

        // Add a class to the selected plan if you need special styles
        this.classList.add('selected-plan');
    });
});

function showAmountInput() {
    const category = document.getElementById("category").value;
    if (category) {
        document.getElementById("amount-input").style.display = "block";
        document.getElementById("update-button").style.display = "inline-block";
    } else {
        document.getElementById("amount-input").style.display = "none";
        document.getElementById("update-button").style.display = "none";
    }
}

function updatePlans() {
    const category = document.getElementById("category").value.toLowerCase(); // Get the selected category
    const amount = parseFloat(document.getElementById("amount").value); // Get the entered amount
    
    if (!category || isNaN(amount) || amount <= 0) {
        alert("Please select a valid category and enter a positive amount.");
        return;
    }

    // Get the selected plan
    const selectedPlan = document.querySelector('.plan.selected-plan');
    if (!selectedPlan) {
        alert("Please select a budget plan first.");
        return;
    }

    const planType = selectedPlan.id.split('-')[0]; // e.g., 'least', 'default', or 'best'

    // Update the selected category
    const budgetPlanDiv = document.querySelector(`#${planType}-savings-plan .budget-plan`);
    const budgetItems = budgetPlanDiv.querySelectorAll('.budget-item');
    let categoryUpdated = false;

    budgetItems.forEach(item => {
        const itemCategory = item.firstChild.textContent.toLowerCase();
        if (itemCategory === category) {
            const currentAmount = parseFloat(item.children[1].textContent.replace(' ₹', ''));
            const updatedAmount = currentAmount + amount;
            item.children[1].textContent = ` ₹${updatedAmount.toFixed(2)}`;
            categoryUpdated = true;
        } else if (categoryUpdated) {
            // Only subtract from other categories if the current category was updated
            const currentAmount = parseFloat(item.children[1].textContent.replace(' ₹', ''));
            const updatedAmount = currentAmount - amount / (budgetItems.length - 1); // Distribute the amount decrease
            item.children[1].textContent = ` ₹${updatedAmount.toFixed(2)}`;
        }
    });

    if (categoryUpdated) {
        alert(`Updated the ${category} category in the ${planType} savings plan by ₹${amount}.`);
    } else {
        alert("The selected category was not found in the budget plan.");
    }
}


// Add event listeners to buttons
document.getElementById("generateBudgetButton").addEventListener("click", generateBudget);
document.getElementById("calculateExpensesButton").addEventListener("click", calculateExpenses);
document.getElementById("askCategoryButton").addEventListener("click", askCategory);
document.getElementById("skipCategoryButton").addEventListener("click", skipCategory);
document.getElementById("update-button").addEventListener("click", updatePlans);
document.getElementById("category").addEventListener("change", showAmountInput);
