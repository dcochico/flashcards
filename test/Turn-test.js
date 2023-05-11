const chai = require('chai');
const expect = chai.expect;
const { createCard } = require('../src/card');
const { evaluateGuess, takeTurn, calculatePercentCorrect, endRound } = require('../src/turn');
const { createDeck } = require('../src/deck');
const { createRound } = require('../src/round');
const { prototypeData } = require('../src/data');

describe('', () => {
  let card1, card2, card3, deck1, deck2, round1, round2;

  beforeEach(() => {
    card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    deck1 = createDeck([card1, card2, card3]);
    deck2 = createDeck(prototypeData);
    round1 = createRound(deck1);
    round2 = createRound(deck2);
  });

  describe('evaluateGuess', () => {
    it('should be a function', () => expect(evaluateGuess).to.be.a('function'));
    it('should evaluate if a guess is correct or incorrect', () => {
      const card = createCard(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
      const correctGuess = evaluateGuess('object', card);
      const incorrectGuess = evaluateGuess('array', card);
      expect(correctGuess).to.deep.equal('correct!');
      expect(incorrectGuess).to.deep.equal('incorrect!');
    });
  });

  describe('takeTurn', () => {
    it('should be a function', () => expect(takeTurn).to.be.a('function'));
    it('should update the turns count', () => {
      expect(round1.turns).to.deep.equal(0);
      takeTurn('sea otter', round1);
      expect(round1.turns).to.deep.equal(1);
      takeTurn('gallbladder', round1);
      expect(round1.turns).to.deep.equal(2);
    });

    it('should replace current card with next card', () => {
      expect(round1.currentCard).to.deep.equal(card1);
      takeTurn('sea otter', round1);
      expect(round1.currentCard).to.deep.equal(card2);
      takeTurn('gallbladder', round1);
      expect(round1.currentCard).to.deep.equal(card3);
    });

    it('should store each incorrectly guessed card', () => {
      expect(round1.incorrectGuesses).to.deep.equal([]);
      takeTurn('pug', round1);
      expect(round1.incorrectGuesses).to.deep.equal([card1]);
      takeTurn('spleen', round1);
      expect(round1.incorrectGuesses).to.deep.equal([card1, card2]);
      takeTurn('Fitzgerald', round1);
      expect(round1.incorrectGuesses).to.deep.equal([card1, card2]);
    });

    it('should return feedback whether guess is correct or not', () => {
      const turn1 = takeTurn('pug', round1);
      expect(turn1).to.deep.equal('incorrect!')
      const turn2 = takeTurn('gallbladder', round1);
      expect(turn2).to.deep.equal('correct!');
    });
  });

  describe('calculatePercentCorrect', () => {
    it('should be a function', () => expect(calculatePercentCorrect).to.be.a('function'));
    it('should calculate and return the percentage of correct guesses', () => {
      takeTurn('sea otter', round1);
      const percentCorrect1 = calculatePercentCorrect(round1);
      expect(percentCorrect1).to.deep.equal(100);
      takeTurn('spleen', round1);
      const percentCorrect2 = calculatePercentCorrect(round1);
      expect(percentCorrect2).to.deep.equal(50);
    });
  });

  describe('endRound', () => {
    it('should be a function', () => expect(endRound).to.be.a('function'));
    it('should end round and print correct guess percentage', () => {
      takeTurn('sea otter', round1);
      const end1 = endRound(round1);
      expect(end1).to.deep.equal(`** Round over! ** You answered ${100}% of the questions correctly!`);
      takeTurn('array', round2);
      const end2 = endRound(round2);
      expect(end2).to.deep.equal(`** Round over! ** You answered ${0}% of the questions correctly!`);
    });
  });
});