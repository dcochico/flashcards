const chai = require('chai');
const expect = chai.expect;
const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');
const { prototypeData } = require('../src/data');

describe('createDeck', () => {
  it('should be a function', () => expect(createDeck).to.be.a('function'));
  it('should create a deck of cards', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck = createDeck([card1, card2, card3]);
    expect(deck.cards[0]).to.deep.equal(card1);
    expect(deck.cards[1]).to.deep.equal(card2);
    expect(deck.cards[2]).to.deep.equal(card3);
    expect(deck.cards).to.deep.equal([card1, card2, card3]);
  });
});

describe('countCards', () => {
  it('should be a function', () => expect(countCards).to.be.a('function'));
  it('should know how many cards are in the deck', () => {
    const card1 = createCard(1, 'What is Robbie\'s favorite animal', ['sea otter', 'pug', 'capybara'], 'sea otter');
    const card2 = createCard(14, 'What organ is Khalid missing?', ['spleen', 'appendix', 'gallbladder'], 'gallbladder');
    const card3 = createCard(12, 'What is Travis\'s middle name?', ['Lex', 'William', 'Fitzgerald'], 'Fitzgerald');
    const deck1 = createDeck([card1, card2, card3]);
    const deck2 = createDeck(prototypeData);
    const count1 = countCards(deck1);
    const count2 = countCards(deck2);
    expect(count1).to.deep.equal(3);
    expect(count2).to.deep.equal(30);
  });
});