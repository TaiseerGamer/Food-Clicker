let money = 0;
const coin = document.getElementById("coin");
const moneyEl = document.getElementById("money");
const historyEl = document.getElementById("history");

// Summer event status (on by default in v0.0.1)
const summerEventActive = true;

// Normal foods
const commonFoods = [
  "Apple", "Bread", "Banana", "Orange", "Carrot"
];
const rareFoods = [
  "Cheese", "Pizza", "Chocolate", "Ice Cream", "Donut"
];
const epicFoods = [
  "Sushi", "Caviar", "Gold Cake", "Tiger Steak", "Dragon Fruit"
];

// Summer event foods (new in v0.0.1)
const summerCommonFoods = [
  "Watermelon", "Pineapple", "Coconut", "Mango", "Berry"
];
const summerRareFoods = [
  "Summer Salad", "Grilled Shrimp", "Tropical Smoothie", "Ice Polo", "Fruit Tart"
];
const summerEpicFoods = [
  "Golden Pineapple", "Sakura Shrimp", "Diamond Coconut", "Crystal Mango", "Summer Crown"
];

// Track Summer Collector challenge
let summerFoodsCollected = new Set();
let summerCollectorDone = false;

function updateMoney() {
  moneyEl.textContent = "Money: " + money;
  document.getElementById("buyBox1").disabled = money < 10;
  document.getElementById("buyBox2").disabled = money < 25;
  document.getElementById("buyBox3").disabled = money < 50;
}

coin.addEventListener("click", () => {
  money += 1;
  updateMoney();
});

function openBox(boxLevel) {
  let roll = Math.random();
  let food = "";
  let rarity = "common";
  let isSummerFood = false;

  // Summer event: higher chance for summer foods
  let summerChanceBoost = summerEventActive ? 0.25 : 0; // 25% more summer chance

  if (boxLevel === 1) {
    if (roll < 0.7 - summerChanceBoost * 0.3) {
      if (summerEventActive && Math.random() < (0.4 + summerChanceBoost)) {
        food = summerCommonFoods[Math.floor(Math.random() * summerCommonFoods.length)];
        isSummerFood = true;
      } else {
        food = commonFoods[Math.floor(Math.random() * commonFoods.length)];
      }
    } else if (roll < 0.95 - summerChanceBoost * 0.2) {
      if (summerEventActive && Math.random() < (0.5 + summerChanceBoost)) {
        food = summerRareFoods[Math.floor(Math.random() * summerRareFoods.length)];
        rarity = "rare";
        isSummerFood = true;
      } else {
        food = rareFoods[Math.floor(Math.random() * rareFoods.length)];
        rarity = "rare";
      }
    } else {
      if (summerEventActive && Math.random() < (0.6 + summerChanceBoost)) {
        food = summerEpicFoods[Math.floor(Math.random() * summerEpicFoods.length)];
        rarity = "epic";
        isSummerFood = true;
      } else {
        food = epicFoods[Math.floor(Math.random() * epicFoods.length)];
        rarity = "epic";
      }
    }
  } else if (boxLevel === 2) {
    if (roll < 0.5 - summerChanceBoost * 0.3) {
      if (summerEventActive && Math.random() < (0.4 + summerChanceBoost)) {
        food = summerCommonFoods[Math.floor(Math.random() * summerCommonFoods.length)];
        isSummerFood = true;
      } else {
        food = commonFoods[Math.floor(Math.random() * commonFoods.length)];
      }
    } else if (roll < 0.9 - summerChanceBoost * 0.2) {
      if (summerEventActive && Math.random() < (0.5 + summerChanceBoost)) {
        food = summerRareFoods[Math.floor(Math.random() * summerRareFoods.length)];
        rarity = "rare";
        isSummerFood = true;
      } else {
        food = rareFoods[Math.floor(Math.random() * rareFoods.length)];
        rarity = "rare";
      }
    } else {
      if (summerEventActive && Math.random() < (0.6 + summerChanceBoost)) {
        food = summerEpicFoods[Math.floor(Math.random() * summerEpicFoods.length)];
        rarity = "epic";
        isSummerFood = true;
      } else {
        food = epicFoods[Math.floor(Math.random() * epicFoods.length)];
        rarity = "epic";
      }
    }
  } else if (boxLevel === 3) {
    if (roll < 0.3 - summerChanceBoost * 0.3) {
      if (summerEventActive && Math.random() < (0.4 + summerChanceBoost)) {
        food = summerCommonFoods[Math.floor(Math.random() * summerCommonFoods.length)];
        isSummerFood = true;
      } else {
        food = commonFoods[Math.floor(Math.random() * commonFoods.length)];
      }
    } else if (roll < 0.8 - summerChanceBoost * 0.2) {
      if (summerEventActive && Math.random() < (0.5 + summerChanceBoost)) {
        food = summerRareFoods[Math.floor(Math.random() * summerRareFoods.length)];
        rarity = "rare";
        isSummerFood = true;
      } else {
        food = rareFoods[Math.floor(Math.random() * rareFoods.length)];
        rarity = "rare";
      }
    } else {
      if (summerEventActive && Math.random() < (0.6 + summerChanceBoost)) {
        food = summerEpicFoods[Math.floor(Math.random() * summerEpicFoods.length)];
        rarity = "epic";
        isSummerFood = true;
      } else {
        food = epicFoods[Math.floor(Math.random() * epicFoods.length)];
        rarity = "epic";
      }
    }
  }

  // Track unique summer foods for Summer Challenge
  if (summerEventActive && isSummerFood) {
    summerFoodsCollected.add(food);

    // Check if player completed the challenge (5 different summer foods)
    if (!summerCollectorDone && summerFoodsCollected.size >= 5) {
      summerCollectorDone = true;
      money += 10; // Reward
      setTimeout(() => {
        logBadge("🏅 Summer Collector Badge! +10 money reward!");
      }, 100);
    }
  }

  return { food, rarity, isSummerFood };
}

function logFood(food, rarity, after = "") {
  const p = document.createElement("p");
  if (rarity === "common") {
    p.className = "common";
  } else if (rarity === "rare") {
    p.className = "rare";
  } else if (rarity === "epic") {
    p.className = "epic";
  }

  let text = `Got ${food} (${rarity}) ${after}`;

  // Highlight Summer event foods
  if (rarity !== undefined) {
    // Check if food is in summer lists
    const isSummer =
      summerCommonFoods.includes(food) ||
      summerRareFoods.includes(food) ||
      summerEpicFoods.includes(food);

    if (isSummer) {
      p.className = "summer";
      text = `☀️ ${food} (${rarity} - Summer) ${after}`;
    }
  }

  p.textContent = text;
  historyEl.appendChild(p);
  historyEl.scrollTop = historyEl.scrollHeight;
}

function logBadge(text) {
  const p = document.createElement("p");
  p.className = "badge";
  p.textContent = text;
  historyEl.appendChild(p);
  historyEl.scrollTop = historyEl.scrollHeight;
}

document.getElementById("buyBox1").addEventListener("click", () => {
  if (money >= 10) {
    money -= 10;
    updateMoney();
    const item = openBox(1);
    logFood(item.food, item.rarity, "(Box 1)");
  }
});

document.getElementById("buyBox2").addEventListener("click", () => {
  if (money >= 25) {
    money -= 25;
    updateMoney();
    const item = openBox(2);
    logFood(item.food, item.rarity, "(Box 2)");
  }
});

document.getElementById("buyBox3").addEventListener("click", () => {
  if (money >= 50) {
    money -= 50;
    updateMoney();
    const item = openBox(3);
    logFood(item.food, item.rarity, "(Box 3)");
  }
});