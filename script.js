// BMI
function calculateBMI() {
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value) / 100;
  if (weight && height) {
    const bmi = weight / (height * height);
    document.getElementById("bmiResult").innerText = `Your BMI: ${bmi.toFixed(2)}`;
  } else {
    alert("Please enter valid weight and height");
  }
}

// Calories
function calculateCalories() {
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("activityWeight").value);
  const height = parseFloat(document.getElementById("activityHeight").value);
  const activity = parseFloat(document.getElementById("activity").value);

  if (age && weight && height && activity) {
    let bmr;
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const tdee = bmr * activity;
    document.getElementById("calorieResult").innerText = `BMR: ${Math.round(bmr)} kcal/day | TDEE: ${Math.round(tdee)} kcal/day`;

    // ✅ Step 3: Add this
    const customBMR = calculateBMR(age, gender, weight, height);
    updateActivityTable(customBMR);
  } else {
    alert("Fill all fields with valid values");
  }
}


// Weight Tracker
function logWeight() {
  const weight = document.getElementById("logWeight").value;
  if (!weight) return;
  const date = new Date().toLocaleDateString();
  const entry = `${date}: ${weight} kg`;

  let history = JSON.parse(localStorage.getItem("weightHistory")) || [];
  history.unshift(entry);
  localStorage.setItem("weightHistory", JSON.stringify(history));

  displayWeightHistory();
}

function displayWeightHistory() {
  const list = document.getElementById("weightHistory");
  list.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("weightHistory")) || [];
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

displayWeightHistory();

// Vegan Meal
const meals = [
  "Vegan Chickpea Curry with Rice",
  "Peanut Butter Banana Toast",
  "Tofu Stir Fry with Veggies",
  "Vegan Protein Smoothie",
  "Oats with Almond Milk & Fruits",
  "Quinoa Salad with Hummus",
];

function suggestMeal() {
  const meal = meals[Math.floor(Math.random() * meals.length)];
  document.getElementById("meal").innerText = `Try: ${meal}`;
}

function calculateBMR(age, gender, weight, height) {
  if (gender === 'Male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function updateActivityTable(bmr) {
  const activityFactors = {
    "1.2": "Sedentary (little or no exercise)",
    "1.375": "Light (1–3 days/week)",
    "1.55": "Moderate (4–5 days/week)",
    "1.6": "Intense (daily or 3–4 intense workouts)",
    "1.725": "Very Intense (6–7 days/week)",
    "1.9": "Extra Active (physical job or 2+ hrs training)"
  };

  const tableBody = document.getElementById("activityBody");
  tableBody.innerHTML = ""; // Clear old data

  for (const factor in activityFactors) {
    const calories = Math.round(bmr * parseFloat(factor));
    const row = `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${factor}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${activityFactors[factor]}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${calories} kcal</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }
}

function tryUpdateActivityTable() {
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("activityWeight").value);
  const height = parseFloat(document.getElementById("activityHeight").value);

  if (age && gender && weight && height) {
    const bmr = calculateBMR(age, gender, weight, height);
    updateActivityTable(bmr);

    // Show guidance
    document.getElementById("factorGuide").style.display = "block";
  }
}

document.getElementById("age").addEventListener("input", tryUpdateActivityTable);
document.getElementById("gender").addEventListener("change", tryUpdateActivityTable);
document.getElementById("activityWeight").addEventListener("input", tryUpdateActivityTable);
document.getElementById("activityHeight").addEventListener("input", tryUpdateActivityTable);
