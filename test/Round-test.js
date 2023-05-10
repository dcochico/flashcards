const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound, takeTurn, calculatePercentCorrect, endRound } = require('../src/round');
const { prototypeData } = require('../src/data');

describe('', function() {
  let card1, card2, card3, deck1, deck2, round1, round2;

  beforeEach(function() {
    card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    deck1 = createDeck([card1, card2, card3]);
    deck2 = createDeck(prototypeData);
    round1 = createRound(deck1);
    round2 = createRound(deck2);
  });

  describe('createRound', function() {
    it('should be a function', function() {
      expect(createRound).to.be.a('function');
    });

    it('should hold a deck of cards', function() {
      expect(round1.deck).to.deep.equal(deck1);
      expect(round2.deck).to.deep.equal(deck2);
    });

    it('should start at the first card in the deck', function() {
      expect(round1.currentCard).to.deep.equal(card1);
      expect(round2.currentCard).to.deep.equal(prototypeData[0]);
    });

    it('should start with 0 turns', function() {
      expect(round2.turns).to.deep.equal(0);
    });

    it('should start with an empty array of incorrectly guessed cards', function() {
      expect(round2.incorrectGuesses).to.deep.equal([]);
    });
  });

  describe('takeTurn', function() {
    it('should be a function', function() {
      expect(takeTurn).to.be.a('function');
    });

    it('should update the turns count', function () {
      expect(round1.turns).to.deep.equal(0);

      takeTurn('sea otter', round1);

      expect(round1.turns).to.deep.equal(1);

      takeTurn('gallbladder', round1);

      expect(round1.turns).to.deep.equal(2);
    });

    it('should replace current card with next card', function() {
      expect(round1.currentCard).to.deep.equal(card1);

      takeTurn('sea otter', round1);

      expect(round1.currentCard).to.deep.equal(card2);

      takeTurn('gallbladder', round1);

      expect(round1.currentCard).to.deep.equal(card3);
    });

    it('should store each incorrectly guessed card', function() {
      expect(round1.incorrectGuesses).to.deep.equal([]);

      takeTurn('pug', round1);

      expect(round1.incorrectGuesses).to.deep.equal([card1]);

      takeTurn('spleen', round1);

      expect(round1.incorrectGuesses).to.deep.equal([card1, card2]);

      takeTurn('Fitzgerald', round1);

      expect(round1.incorrectGuesses).to.deep.equal([card1, card2]);
    });

    it('should return feedback whether guess is correct or not', function() {
      const turn1 = takeTurn('pug', round1);

      expect(turn1).to.deep.equal('incorrect!')

      const turn2 = takeTurn('gallbladder', round1);

      expect(turn2).to.deep.equal('correct!');
    });
  });

  describe('calculatePercentCorrect', function() {
    it('should be a function', function() {
      expect(calculatePercentCorrect).to.be.a('function');
    });

    it('should calculate and return the percentage of correct guesses', function() {
      takeTurn('sea otter', round1);

      const percentCorrect1 = calculatePercentCorrect(round1);

      expect(percentCorrect1).to.deep.equal(100);

      takeTurn('spleen', round1);

      const percentCorrect2 = calculatePercentCorrect(round1);

      expect(percentCorrect2).to.deep.equal(50);
    });
  });

  describe('endRound', function() {
    it('should be a function', function() {
      expect(endRound).to.be.a('function');
    });

    it('should end round and print correct guess percentage', function() {
      takeTurn('sea otter', round1);

      const end1 = endRound(round1);

      expect(end1).to.deep.equal(`** Round over! ** You answered ${100}% of the questions correctly!`);

      takeTurn('array', round2);

      const end2 = endRound(round2);

      expect(end2).to.deep.equal(`** Round over! ** You answered ${0}% of the questions correctly!`);
    });
  });
});