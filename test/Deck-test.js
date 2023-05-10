const chai = require('chai');
const expect = chai.expect;
const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');
const { prototypeData } = require('../src/data');

describe('', () => {
  let card1, card2, card3, deck1, deck2;

  beforeEach(() => {
    card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    deck1 = createDeck([card1, card2, card3]);
    deck2 = createDeck(prototypeData);
  });

  describe('createDeck', () => {
    it('should be a function', () => expect(createDeck).to.be.a('function'));
    it('should create a deck of cards', () => {
      expect(deck1.cards[0]).to.deep.equal(card1);
      expect(deck1.cards[1]).to.deep.equal(card2);
      expect(deck1.cards[2]).to.deep.equal(card3);
      expect(deck1.cards).to.deep.equal([card1, card2, card3]);
    });
  });

  describe('countCards', () => {
    it('should be a function', () => expect(countCards).to.be.a('function'));
    it('should know how many cards are in the deck', () => {
      const count1 = countCards(deck1);
      const count2 = countCards(deck2);
      expect(count1).to.deep.equal(3);
      expect(count2).to.deep.equal(30);
    });
  });
});