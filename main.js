// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]
const valid6 = "4913143594962082491";
const valid7 = "6011281136657161355";
const valid8 = "378440888133909";
const valid9 = "3542831842199945724";
const valid10 = "5581691848750339";


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
const batch = [valid1, valid2, valid3, valid4, valid5, valid6, valid7, valid8, valid9, valid10, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// Add your functions below:
function generateCardFromStringToArray(cardString) {
  // takes a string of digits and converts it into an array of single digits
  return cardString.split('').map( char => parseInt(char) );
}

function generateCardFromArrayToString(cardArray) {
  // takes an array of single digits and converts it into a string of digits
  return cardArray.join('');
}

function validateCred(cardArray) {
  // returns a boolean corresponding to the validity of a credit card number
  // provided as a string of digits or as an array of single digits. The algorithme
  // used was the Luhn algorithm.
  if (typeof cardArray === 'string') {
    cardArray = generateCardFromStringToArray(cardArray);
  }
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
  // returns a filtered array of invalid creait card numbers when provided with an array of credit card numbers
  return nestedCardsArray.filter( cardArray => !validateCred(cardArray) );
}

function idCompanyFromCard(cardArray) {
  // returns the name of the credit card issuing company based on the credit card number.
  // "Company not found" is returned when no company is found
  if (typeof cardArray === 'string') {
    cardArray = generateCardFromStringToArray(cardArray);
  }
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

function displayValidityAndCompany(cardArray) {
  // Given a credit card number, logs to the console whether the card is valid or invalid and adds the credit card issuing company int brackets
  console.log("The credit card is " + (validateCred(cardArray) ? "valid" : "invalid") + " (" + idCompanyFromCard(cardArray) + ").");
}

function idInvalidCardCompanies(nestedCardsArray) {
  // Provided with an array of credit card numbers returns an array of the unique corresponding credit card issuing companies
  const invalidCompanies = [];
  nestedCardsArray.forEach( cardArray => {
    const company = idCompanyFromCard(cardArray);
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

/* Test function validateCred() */
displayValidityAndCompany(valid1); // shall return valid
displayValidityAndCompany(valid2); // shall return valid
displayValidityAndCompany(valid3); // shall return valid
displayValidityAndCompany(valid4); // shall return valid
displayValidityAndCompany(valid5); // shall return valid
displayValidityAndCompany(valid6); // shall return valid
displayValidityAndCompany(valid7); // shall return valid
displayValidityAndCompany(valid8); // shall return valid
displayValidityAndCompany(valid9); // shall return valid
displayValidityAndCompany(valid10); // shall return valid

displayValidityAndCompany(invalid1); // shall return invalid
displayValidityAndCompany(invalid2); // shall return invalid
displayValidityAndCompany(invalid3); // shall return invalid
displayValidityAndCompany(invalid4); // shall return invalid
displayValidityAndCompany(invalid5); // shall return invalid

displayValidityAndCompany(mystery1);
displayValidityAndCompany(mystery2);
displayValidityAndCompany(mystery3);
displayValidityAndCompany(mystery4);
displayValidityAndCompany(mystery5);


/* Test function findInvalidCards()
console.log(findInvalidCards(batch));
*/

/* Test function idInvalidCardCompanies()
const testNested = findInvalidCards(batch);
testNested.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
console.log(idInvalidCardCompanies(testNested));
*/