let income=0; // Declare a global variable for income

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
        const budgetPlanDiv = document.querySelector(#${planType}-savings-plan .budget-plan);
        
        for (let category in budgetPercentages) {
            let amount = income * budgetPercentages[category];
            let budgetItem = document.createElement('div');
            budgetItem.className = 'budget-item';
            budgetItem.innerHTML = <span>${category}</span><span> £${amount.toFixed(2)}</span>;
            budgetPlanDiv.appendChild(budgetItem);
        }
    }
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
    resultDiv.innerHTML = <h3>Total Expenses: £${totalExpenses.toFixed(2)}</h3>;
    
    if (totalExpenses > income) {
        resultDiv.innerHTML += <p style="color:red;">Warning: Your expenses exceed your income!</p>;
        suggestBudgetPlan(totalExpenses);
    } else {
        resultDiv.innerHTML += <p style="color:green;">Good job! Your expenses are within your budget.</p>;
    }

    // Render chart comparing income and expenses
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

    if (totalExpenses > income * 0.75) {
        suggestion = "Consider the 'Least Savings' plan.";
    } else if (totalExpenses > income * 0.5) {
        suggestion = "You can follow the 'Default' plan.";
    } else {
        suggestion = "Great! You can aim for the 'Best Savings' plan.";
    }

    const resultDiv = document.getElementById('expenses-result');
    resultDiv.innerHTML += <p>${suggestion}</p>;
}

function renderChart(income, expenses) {
    const ctx = document.getElementById('budgetChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Amount (£)',
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
                        text: 'Amount (£)'
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