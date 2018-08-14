const datasource = [
  { pair: "USD CHF", buy: 0.99143, sell: 0.99043 },
  { pair: "GBP USD", buy: 1.28495, sell: 1.2836 },
  { pair: "GBP CHF", buy: 1.27378, sell: 1.27147 },
  { pair: "EUR SEK", buy: 9.632, sell: 9.6055 },
  { pair: "USD JPY", buy: 110.467, sell: 110.417 },
  { pair: "EUR JPY", buy: 120.589, sell: 120.491 }
];

const priceDigits = 7;
const singleApp = document.querySelector(".app-panel");
const panelsSection = document.querySelector(".multiple-panels");

// function buyPriceUpdate() {
//   let buyPrice = datasource[0].buy;
//   const arrow = document.querySelector(".arrow-box").firstElementChild;
//   arrow.classList.remove("fa-caret-up");
//   arrow.classList.remove("fa-caret-down");
//   //pick bitween 0 and 1
//   let difference = Math.floor(Math.random() * 2);
//   // diff = 0 -> subtract 10%
//   if (difference === 0) {
//     buyPrice -= 0.1 * buyPrice;
//     arrow.classList.add("fa-caret-down");
//   } else {
//     // diff = 1 -> add 10%
//     buyPrice += 0.1 * buyPrice;
//     arrow.classList.add("fa-caret-up");
//   }

//   let buyPr1 = document.querySelector(".app-panel").querySelector(".buy1");
//   buyPr1.textContent = buyPrice.toString().slice(0, 4);

//   let buyPr2 = document.querySelector(".app-panel").querySelector(".buy2");
//   buyPr2.textContent = buyPrice.toString().slice(4, 6);

//   let buyPr3 = document.querySelector(".app-panel").querySelector(".buy3");
//   buyPr3.textContent = buyPrice.toString().slice(6);
// }

//Panels multiplication

function panelsCreation() {
  for (let i = 0; i < datasource.length; i++) {
    let currentApp = singleApp.cloneNode(true);
    // Currencies update
    let currentCurrency1 = currentApp.querySelectorAll(".currency1");
    let currentCurrency2 = currentApp.querySelectorAll(".currency2");
    currentCurrency1.forEach(element => {
      element.innerHTML = datasource[i].pair.slice(0, 3);
    });
    currentCurrency2.forEach(element => {
      element.innerHTML = datasource[i].pair.slice(4);
    });
    //check price digits amount
    let currentSellPriceStr = datasource[i].sell.toString();
    let currentBuyPriceStr = datasource[i].buy.toString();
    if (currentSellPriceStr.length < 7) {
      for (let j = 0; j < priceDigits - currentSellPriceStr.length; j++) {
        currentSellPriceStr += "0";
      }
    }
    if (currentBuyPriceStr.length < 7) {
      for (let k = 0; k < priceDigits - currentBuyPriceStr.length + 1; k++) {
        currentBuyPriceStr += "0";
      }
    }
    // Sell price update
    let sellPr1 = currentApp.querySelector(".sell1");
    sellPr1.textContent = currentSellPriceStr.slice(0, 4);

    let sellPr2 = currentApp.querySelector(".sell2");
    sellPr2.textContent = currentSellPriceStr.slice(4, 6);

    let sellPr3 = currentApp.querySelector(".sell3");
    sellPr3.textContent = currentSellPriceStr.slice(6);

    // Buy price update
    let buyPr1 = currentApp.querySelector(".buy1");
    buyPr1.textContent = currentBuyPriceStr.slice(0, 4);
    let buyPr2 = currentApp.querySelector(".buy2");
    buyPr2.textContent = currentBuyPriceStr.slice(4, 6);
    let buyPr3 = currentApp.querySelector(".buy3");
    buyPr3.textContent = currentBuyPriceStr.slice(6);

    //Append elements
    panelsSection.appendChild(currentApp);

    //Price update

    function buyPriceUpdate() {
      let buyPrice = datasource[0].buy;
      const arrow = document.querySelector(".arrow-box").firstElementChild;
      arrow.classList.remove("fa-caret-up");
      arrow.classList.remove("fa-caret-down");
      //pick bitween 0 and 1
      let difference = Math.floor(Math.random() * 2);
      // diff = 0 -> subtract 10%
      if (difference === 0) {
        buyPrice -= 0.1 * buyPrice;
        arrow.classList.add("fa-caret-down");
      } else {
        // diff = 1 -> add 10%
        buyPrice += 0.1 * buyPrice;
        arrow.classList.add("fa-caret-up");
      }

      let buyPr1 = document.querySelector(".app-panel").querySelector(".buy1");
      buyPr1.textContent = buyPrice.toString().slice(0, 4);

      let buyPr2 = document.querySelector(".app-panel").querySelector(".buy2");
      buyPr2.textContent = buyPrice.toString().slice(4, 6);

      let buyPr3 = document.querySelector(".app-panel").querySelector(".buy3");
      buyPr3.textContent = buyPrice.toString().slice(6);
    }
    //uyPriceUpdate();

    setInterval(function() {
      buyPriceUpdate();
    }, 1000);
  }
}

panelsCreation();

// buyPriceUpdate();

// module.exports = {
//   //function
// };
