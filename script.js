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
