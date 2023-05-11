const evaluateGuess = guess => guess === card.correctAnswer ? 'correct!' : 'incorrect!';

const takeTurn = (guess, round) => {
  let feedback = 'correct!';
  if (guess !== round.currentCard.correctAnswer) {
    round.incorrectGuesses.push(round.currentCard);
    feedback = 'incorrect!';
  }
  round.turns++;
  round.currentCard = round.deck.cards[round.turns];
  return feedback;
};

const calculatePercentCorrect = round => Math.floor(((round.turns - round.incorrectGuesses.length) / round.turns) * 100);

const endRound = round => `** Round over! ** You answered ${calculatePercentCorrect(round)}% of the questions correctly!`;

module.exports = {
  evaluateGuess,
  takeTurn,
  calculatePercentCorrect,
  endRound
};