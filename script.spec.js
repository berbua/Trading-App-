//  Tests

/*To test your app, you should write a test harness that changes the prices randomly
 every 1 second to within +/- 10% of the original value.
 If the buy price increases, show a green upwards facing arrow between
  the two price indicators.
  If the buy price decreases, show a red downwards facing arrow.*/

let appTest = require("./script.js");

describe("#translate", function() {
  it("translates a word beginning with a vowel", function() {
    s = appTest.translate("apple");
    expect(s).toEqual("appleay");
  });

  it("translates a word beginning with a consonant", function() {
    s = pigLatin.translate("banana");
    expect(s).toEqual("ananabay");
  });
});
