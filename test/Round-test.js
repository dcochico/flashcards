const chai = require('chai');
const expect = chai.expect;
const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound } = require('../src/round');
const { prototypeData } = require('../src/data');

describe('createRound', () => {
  const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
  const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
  const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
  const deck1 = createDeck([card1, card2, card3]);
  const deck2 = createDeck(prototypeData);
  const round1 = createRound(deck1);
  const round2 = createRound(deck2);
  it('should be a function', () => expect(createRound).to.be.a('function'));
  it('should hold a deck of cards', () => {
    expect(round1.deck).to.deep.equal(deck1);
    expect(round2.deck).to.deep.equal(deck2);
  });
  it('should start at the first card in the deck', () => {
    expect(round1.currentCard).to.deep.equal(card1);
    expect(round2.currentCard).to.deep.equal(prototypeData[0]);
  });
  it('should start with 0 turns', () => expect(round2.turns).to.deep.equal(0));
  it('should start with an empty array of incorrectly guessed cards', () => expect(round2.incorrectGuesses).to.deep.equal([]));
});