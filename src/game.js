const { countCards } = require('./deck');
const util = require('./util');

const printMessage = deck => {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(deck)} cards.
  -----------------------------------------------------------------------`);
}

const printQuestion = round => util.main(round);

module.exports = { printMessage, printQuestion };
