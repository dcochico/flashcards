const createRound = deck => ({
  deck: deck,
  currentCard: deck.cards[0],
  turns: 0,
  incorrectGuesses: []
});

module.exports = { createRound };