const { prototypeData } = require('./src/data');
const { createCard } = require('./src/card');
const { createDeck } = require('./src/deck');
const { createRound } = require('./src/round');
const { printMessage, printQuestion } = require('./src/game');
console.log('Your project is running...');

const start = myDeck => {
  const cards = myDeck.map(card => createCard(card.id, card.question, card.answers, card.correctAnswer));
  const deck = createDeck(cards);
  const round = createRound(deck);
  printMessage(deck);
  printQuestion(round);
};

start(prototypeData);
