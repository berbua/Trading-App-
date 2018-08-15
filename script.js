const datasource = [
  { pair: "USD CHF", buy: 0.99143, sell: 0.99043 },
  { pair: "GBP USD", buy: 1.28495, sell: 1.2836 },
  { pair: "GBP CHF", buy: 1.27378, sell: 1.27147 },
  { pair: "EUR SEK", buy: 9.632, sell: 9.6055 },
  { pair: "USD JPY", buy: 110.467, sell: 110.417 },
  { pair: "EUR JPY", buy: 120.589, sell: 120.491 }
];

//datasource update with panels
function addPanelsToDatasource() {
  const panels = document.querySelectorAll(".app-panel");
  for (i = 0; i < datasource.length; i++) {
    datasource[i].panel = panels[i].id;
  }
}
addPanelsToDatasource();

function panelDataUpdate() {
  for (let i = 0; i < datasource.length; i++) {
    //update panel currencies
    let currentPanel = document.getElementById(datasource[i].panel);
    let currentCurrency1 = currentPanel.querySelectorAll(".currency1");
    let currentCurrency2 = currentPanel.querySelectorAll(".currency2");
    currentCurrency1.forEach(element => {
      element.innerHTML = datasource[i].pair.slice(0, 3);
    });
    currentCurrency2.forEach(element => {
      element.innerHTML = datasource[i].pair.slice(4);
    });
    //check price digits amount, add 0's if too short
    const priceDigits = 7;
    let currentSellPriceStr = datasource[i].sell.toString();
    let currentBuyPriceStr = datasource[i].buy.toString();
    if (currentSellPriceStr.length < 7) {
      for (let j = 0; j < priceDigits - currentSellPriceStr.length + 1; j++) {
        currentSellPriceStr += "0";
      }
    }
    if (currentBuyPriceStr.length < 7) {
      for (let k = 0; k < priceDigits - currentBuyPriceStr.length + 1; k++) {
        currentBuyPriceStr += "0";
      }
    }

    // Sell price update according to datasource
    const sellPr1 = currentPanel.querySelector(".sell1");
    const sellPr2 = currentPanel.querySelector(".sell2");
    const sellPr3 = currentPanel.querySelector(".sell3");
    sellPr1.textContent = currentSellPriceStr.slice(0, 4);
    sellPr2.textContent = currentSellPriceStr.slice(4, 6);
    sellPr3.textContent = currentSellPriceStr.slice(6);

    // Buy price update according to datasource
    let buyPr1 = currentPanel.querySelector(".buy1");
    let buyPr2 = currentPanel.querySelector(".buy2");
    let buyPr3 = currentPanel.querySelector(".buy3");
    buyPr1.textContent = currentBuyPriceStr.slice(0, 4);
    buyPr2.textContent = currentBuyPriceStr.slice(4, 6);
    buyPr3.textContent = currentBuyPriceStr.slice(6);
  }
}
panelDataUpdate();

// Update buy price to change arrow color
//Add new price property to datasource
function addNewPriceToDatasource() {
  for (j = 0; j < datasource.length; j++) {
    datasource[j].newPrice = datasource[j].buy;
  }
}
addNewPriceToDatasource();

//Update buying price
function buyPriceUpdate() {
  const panels = document.querySelectorAll(".app-panel");
  panels.forEach(app => {
    let currentPanel = app.id;
    let arrow = app.querySelector(".arrow-box").firstElementChild;
    let buyPrice = datasource[parseInt(app.id.toString().slice(5)) - 1].buy;
    let buyPriceNew = buyPrice;

    //remove classes from the icon
    arrow.classList.remove("fa-caret-up");
    arrow.classList.remove("fa-caret-down");
    //Pick from 0 to 1
    let difference = Math.floor(Math.random() * 2);
    // diff = 0 -> subtract 10%
    if (difference === 0) {
      buyPriceNew -= 0.1 * buyPrice;
      arrow.classList.add("fa-caret-up");
    } else {
      // diff = 1 -> add 10%
      buyPriceNew += 0.1 * buyPrice;
      arrow.classList.add("fa-caret-down");
    }
    //Update panel buy prices
    app.querySelector(".buy1").textContent = buyPriceNew.toString().slice(0, 4);
    app.querySelector(".buy2").textContent = buyPriceNew.toString().slice(4, 6);
    app.querySelector(".buy3").textContent = buyPriceNew.toString().slice(6);
  });
}

//Price update interval assignment to button
const testBtn = document.getElementById("test_btn");
let running = false;
let testInterval;

function startTesting() {
  running = true;
  testInterval = setInterval(buyPriceUpdate, 1000);
}

function stopTesting() {
  running = false;
  clearInterval(testInterval);
}

function testBtnClicked() {
  if (running === true) {
    stopTesting();
  } else {
    startTesting();
  }
}

testBtn.addEventListener("click", testBtnClicked);
