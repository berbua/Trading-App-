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

//update of selling pirce
function updateSellPrice(panel, sellPr) {
  panel.querySelector(".sell1").textContent = sellPr.toString().slice(0, 4);
  panel.querySelector(".sell2").textContent = sellPr.toString().slice(4, 6);
  panel.querySelector(".sell3").textContent = sellPr.toString().slice(6);
}

//update of buying price

function updateBuyPrice(panel, buyPr) {
  panel.querySelector(".buy1").textContent = buyPr.toString().slice(0, 4);
  panel.querySelector(".buy2").textContent = buyPr.toString().slice(4, 6);
  panel.querySelector(".buy3").textContent = buyPr.toString().slice(4, 6);
}

function panelDataUpdate() {
  for (let i = 0; i < datasource.length; i++) {
    //update currencies
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
    if (currentSellPriceStr.length < priceDigits) {
      for (let j = 0; j < priceDigits - currentSellPriceStr.length + 1; j++) {
        currentSellPriceStr += "0";
      }
    }
    if (currentBuyPriceStr.length < priceDigits) {
      for (let k = 0; k < priceDigits - currentBuyPriceStr.length + 1; k++) {
        currentBuyPriceStr += "0";
      }
    }
    // Sell price update
    updateSellPrice(currentPanel, datasource[i].sell);

    // Buy price update
    updateBuyPrice(currentPanel, datasource[i].buy);
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

//Update buying price +- 10%
function refreshBuyPrice() {
  const panels = document.querySelectorAll(".app-panel");
  panels.forEach(app => {
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
      arrow.classList.add("fa-caret-down");
    } else {
      // diff = 1 -> add 10%
      buyPriceNew += 0.1 * buyPrice;
      arrow.classList.add("fa-caret-up");
    }
    //Update panel buy prices
    updateBuyPrice(app, buyPriceNew);
  });
}

//Price update interval assignment to button
const testBtn = document.getElementById("test_btn");
let running = false;
let testInterval;

function startTesting() {
  running = true;
  testInterval = setInterval(refreshBuyPrice, 1000);
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
