// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// Add your functions below:
function generateCardFromStringToArray(cardString) {
  return cardString.split('');
}

function generateCardFromArrayToString(cardArray) {
  return cardArray.join('');
}

function validateCred(cardArray) {
  const length = cardArray.length;
  const reverseArray = cardArray.map((digit, index) => cardArray[(length - 1) - index ]);
  return reverseArray.map( (digit, index) => {
    if (index % 2 === 0) {
      return digit;
    } else {

      doubleDigit = digit * 2;
      return doubleDigit > 9 ? doubleDigit - 9 : doubleDigit;
    }
  }).reduce((acc, cur) => acc + cur) % 10 === 0;
}

function findInvalidCards(nestedCardsArray) {
  return nestedCardsArray.filter( cardArray => !validateCred(cardArray) );
}

function idCompanyFromCard(cardArray) {
  let companyFound = "Company not found";
  const cardString = generateCardFromArrayToString(cardArray);
  const companyTable = {
    "American Express": [34, 37],
    "Diners CLub - Carte Blanche": [300, 301, 302, 303, 304, 305],
    "Diners CLub - International": [36],
    "Diners Club - USA & Canada": [54],
    "Discover": [6011, 622, 644, 645, 647, 648, 649, 65],
    "InstaPayment": [603, 638, 639],
    "JCB": [35],
    "Maestro": [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763],
    "MasterCard": [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
    "Visa": [4],
    "Visa Electron": [4026, 417500, 4508, 4844, 4913, 4917]
  };
  for (const [key, values] of Object.entries(companyTable)) {
    values.forEach(value => { 
      if (cardString.indexOf(value.toString()) === 0) {
        companyFound = key;
      }
    })
  }
  return companyFound;
}

function idInvalidCardCompanies(nestedCardsArray) {
  const invalidCompanies = [];
  nestedCardsArray.forEach( cardArray => {
    const company = idCompanyFromCard(cardArray); // companyTable[cardArray[0]] || "Company not found" ;
    if (!invalidCompanies.includes(company)) {
      invalidCompanies.push(company);
    }
  });
  return invalidCompanies.sort();
}

// Test your functions below:
/* Test function generateCardFromStringToArray()
console.log(generateCardFromStringToArray('1234567890123456'));
console.log(generateCardFromArrayToString(generateCardFromStringToArray('1234567890123456')));
*/

/* Test function validateCred()
console.log(validateCred(valid1)); // shall return true
console.log(validateCred(valid2)); // shall return true
console.log(validateCred(valid3)); // shall return true
console.log(validateCred(valid4)); // shall return true
console.log(validateCred(valid5)); // shall return true
console.log(validateCred(invalid1)); // shall return false
console.log(validateCred(invalid2)); // shall return false
console.log(validateCred(invalid3)); // shall return false
console.log(validateCred(invalid4)); // shall return false
console.log(validateCred(invalid5)); // shall return false
console.log(validateCred(mystery1));
console.log(validateCred(mystery2));
console.log(validateCred(mystery3));
console.log(validateCred(mystery4));
console.log(validateCred(mystery5));
*/

/* Test function findInvalidCards()
console.log(findInvalidCards(batch));
*/

/* Test function idInvalidCardCompanies() */
const testNested = findInvalidCards(batch);
testNested.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
console.log(idInvalidCardCompanies(testNested));
