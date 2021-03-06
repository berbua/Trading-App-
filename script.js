const datasource = [
  { pair: "USD CHF", buy: 0.99143, sell: 0.99043 },
  { pair: "GBP USD", buy: 1.28495, sell: 1.2836 },
  { pair: "GBP CHF", buy: 1.27378, sell: 1.27147 },
  { pair: "EUR SEK", buy: 9.632, sell: 9.6055 },
  { pair: "USD JPY", buy: 110.467, sell: 110.417 },
  { pair: "EUR JPY", buy: 120.589, sell: 120.491 }
];

//datasource update with panel id property
const addPanelsToDatasource = () => {
  const panels = document.querySelectorAll(".app-panel");
  for (i = 0; i < datasource.length; i++) {
    datasource[i].panel = panels[i].id;
  }
};
addPanelsToDatasource();

//update of selling pirce on single panel
const updateSellPrice = (panel, sellPr) => {
  panel.querySelector(".sell1").textContent = sellPr.toString().slice(0, 4);
  panel.querySelector(".sell2").textContent = sellPr.toString().slice(4, 6);
  panel.querySelector(".sell3").textContent = sellPr.toString().slice(6, 7);
};

//update of buying price on single panel

const updateBuyPrice = (panel, buyPr) => {
  panel.querySelector(".buy1").textContent = buyPr.toString().slice(0, 4);
  panel.querySelector(".buy2").textContent = buyPr.toString().slice(4, 6);
  panel.querySelector(".buy3").textContent = buyPr.toString().slice(6, 7);
};

// Currencies update on single panel

const updateCurrency = (appPanel, data) => {
  const currency1 = appPanel.querySelectorAll(".currency1");
  const currency2 = appPanel.querySelectorAll(".currency2");
  currency1.forEach(element => {
    element.innerHTML = data.pair.slice(0, 3);
  });
  currency2.forEach(element => {
    element.innerHTML = data.pair.slice(4);
  });
};

//Check & update number of price digits if shorter than needed (digitsNo)

const updateSellPriceDigits = (digitsNo, sellPr) => {
  if (sellPr.length < digitsNo) {
    for (let j = 0; j < digitsNo - sellPr.length + 1; j++) {
      sellPr += "0";
    }
  }
  return sellPr;
};

const updateBuyPriceDigits = (digitsNo, buyPr) => {
  if (buyPr.length < digitsNo) {
    for (let k = 0; k < digitsNo - buyPr.length + 1; k++) {
      buyPr += "0";
    }
  }
  return buyPr;
};

// Update buy price to change arrow color
//Add new price property to datasource
const addNewPriceToDatasource = () => {
  for (j = 0; j < datasource.length; j++) {
    datasource[j].newPrice = datasource[j].buy;
  }
};
addNewPriceToDatasource();

//Assign arrow color to buy price deviation

const updateArrowColor = (arrowElement, currentBuyPrice, newBuyPr) => {
  let arr = arrowElement.querySelector(".arrow-box").firstElementChild;
  arr.classList.remove("fa-caret-up");
  arr.classList.remove("fa-caret-down");
  if (currentBuyPrice < newBuyPr) {
    arr.classList.add("fa-caret-up");
  } else if (currentBuyPrice > newBuyPr) {
    arr.classList.add("fa-caret-down");
  } else if (currentBuyPrice === newBuyPr) {
    arr.classList.remove("fa-caret-up");
    arr.classList.remove("fa-caret-down");
  }
};

//Update the data on panels

const panelDataUpdate = () => {
  for (let i = 0; i < datasource.length; i++) {
    //price digits amount
    let digit = 7;
    let currentPanel = document.getElementById(datasource[i].panel);
    //update currencies
    updateCurrency(currentPanel, datasource[i]);

    //update no of digits
    let currentSelPr = updateSellPriceDigits(
      digit,
      datasource[i].sell.toString()
    );
    let currentBuyPr = updateBuyPriceDigits(
      digit,
      datasource[i].buy.toString()
    );
    // Sell price update
    updateSellPrice(currentPanel, currentSelPr);
    // Buy price update
    updateBuyPrice(currentPanel, currentBuyPr);

    //Adjust arrow color
    let currentBuyPrNum = parseFloat(currentBuyPr);
    let newBuyPrice = datasource[i].newPrice;

    updateArrowColor(currentPanel, currentBuyPrNum, newBuyPrice);
  }
};

panelDataUpdate();

//Update new buying price +- 10%
const refreshBuyPrice = function() {
  for (let m = 0; m < datasource.length; m++) {
    //Pick from 0 to 1
    let random = Math.floor(Math.random() * 2);
    // diff = 1 -> subtract 10%
    if (random === 0) {
      datasource[m].buy = datasource[m].newPrice;
      datasource[m].newPrice -= 0.1 * datasource[m].newPrice;
    } else {
      // diff = 1 -> add 10%
      datasource[m].buy = datasource[m].newPrice;
      datasource[m].newPrice += 0.1 * datasource[m].newPrice;
    }
    updateBuyPrice(
      document.getElementById(datasource[m].panel),
      datasource[m].newPrice
    );
    updateArrowColor(
      document.getElementById(datasource[m].panel),
      datasource[m].buy,
      datasource[m].newPrice
    );
  }
};

//Price update interval assignment to button
const testArrowChanges = () => {
  const testBtn = document.getElementById("test_btn");
  let running = false;
  let testInterval;

  const startTesting = () => {
    running = true;
    testInterval = setInterval(refreshBuyPrice, 1000);
  };

  const stopTesting = () => {
    running = false;
    clearInterval(testInterval);
  };

  const testBtnClicked = () => {
    if (running === true) {
      stopTesting();
    } else {
      startTesting();
    }
  };

  testBtn.addEventListener("click", testBtnClicked);
};

testArrowChanges();
