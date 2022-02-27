# Credit-Card-Checker
This project comes from a JavaScript Back-End Codecademy Challenge Project.
It includes the following functions:

function generateCardFromStringToArray(cardString) converts a credit card number from a string of digits representation to an array of single digits
function generateCardFromArrayToString(cardArray) converts a credit card number from an array of digits representation to a string of digits.

function validateCred(cardArray) given a credit card number represented either as an array of digits or as a string of digits the function will 
return a boolean true if the credit card number is valid according the Luhn algorithm and assuming the check digit is inlucled in the credit card number
and will return false otherwise.

function idCompanyFromCard(cardArray) given a credit card number represented either as an array of digits or as a string of digits the function will 
returna credit card company which issued the card, based on the following source (https://www.freeformatter.com/credit-card-number-generator-validator.html#validate).
If a company card is not found the function will return a string "Company not found".

function displayValidityAndCompany(cardArray) displays a line in the console saying "The credit card is valid_or_invalid (company_which_issued_the_credit_card)".

function findInvalidCards(nestedCardsArray) allows an array of credit card numbers to be processed the array of invalid credit card numbers based on function validateCred.

function idInvalidCardCompanies(nestedCardsArray) takes an array of credit card numbers and returns their credit card company issuer based on function idCompanyFromCard.
