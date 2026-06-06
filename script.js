let money = 0;
const coin = document.getElementById("coin");
const moneyEl = document.getElementById("money");
const historyEl = document.getElementById("history");

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

const commonFoods = [
  "Apple", "Bread", "Banana", "Orange", "Carrot"
];
const rareFoods = [
  "Cheese", "Pizza", "Chocolate", "Ice Cream", "Donut"
];
const epicFoods = [
  "Sushi", "Caviar", "Gold Cake", "Tiger Steak", "Dragon Fruit"
];

function openBox(boxLevel) {
  let roll = Math.random();
  let food = "";
  let rarity = "common";

  if (boxLevel === 1) {
    if (roll < 0.7) {
      food = commonFoods[Math.floor(Math.random() * commonFoods.length)];
    } else if (roll < 0.95) {
      food = rareFoods[Math.floor(Math.random() * rareFoods.length)];
      rarity = "rare";
    } else {
      food = epicFoods[Math.floor(Math.random() * epicFoods.length)];
      rarity = "epic";
    }
  } else if (boxLevel === 2) {
    if (roll < 0.5) {
      food = commonFoods[Math.floor(Math.random() * commonFoods.length)];
    } else if (roll < 0.9) {
      food = rareFoods[Math.floor(Math.random() * rareFoods.length)];
      rarity = "rare";
    } else {
      food = epicFoods[Math.floor(Math.random() * epicFoods.length)];
      rarity = "epic";
    }
  } else if (boxLevel === 3) {
    if (roll < 0.3) {
      food = commonFoods[Math.floor(Math.random() * commonFoods.length)];
    } else if (roll < 0.8) {
      food = rareFoods[Math.floor(Math.random() * rareFoods.length)];
      rarity = "rare";
    } else {
      food = epicFoods[Math.floor(Math.random() * epicFoods.length)];
      rarity = "epic";
    }
  }

  return { food, rarity };
}

function logFood(food, rarity, after = "") {
  const p = document.createElement("p");
  p.className = rarity;
  p.textContent = `Got ${food} (${rarity}) ${after}`;
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