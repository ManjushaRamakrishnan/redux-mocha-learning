const { createStore } = require('redux');
const TrelloApp = require('.');
const should = require('chai').should();
const deepFreeze = require('deep-freeze');

describe('TrelloApp', function() {

  beforeEach(function() {
    
  });
  it.only('should ADD_CARD', function() {

    const currState = deepFreeze({
      currentBoard: {
        id: 'b1',
        name: 'MyBoard',
        lists: [{
          id: '111',
          name: 'Some List Name',
          cards: [{
            id: 'abc',
            text: 'def'
          }, {
            id: 'abc1',
            text: 'def1'
          }]
        }, {
          id: '112',
          name: 'Some List Name 1',
          cards: []
        }]
      }
    });

    const store = createStore(TrelloApp, currState);

    const action = {
      type: 'ADD_CARD',
      payload: {
        listId: '111',
        text: 'ghi'
      }
    };

    store.dispatch(action);

    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(2);
    store.getState().currentBoard.lists[0].should.have.property('cards').and.be.an('array').of.length(3);
    store.getState().currentBoard.lists[0].cards[2].should.have.property('id');
    store.getState().currentBoard.lists[0].cards[2].should.have.property('text').and.equal('ghi');
  });

  it('should EDIT_BOARD', function() {
    const action = {
      type: 'EDIT_BOARD',
      payload: {
        name: 'Board1'
      }
    };

    store.dispatch(action);
    console.log(store.getState());
    store.getState().should.have.property('currentBoard');
    store.getState().currentBoard.should.have.property('name').and.equal('Board1');
  });

  it('should CREATE_LIST', function() {
      const action = {
        type: 'CREATE_LIST',
        payload: {
          name: 'List 3',
          cards: []
        }
      };
  
      store.dispatch(action);
      console.log(store.getState());
      store.getState().should.have.property('currentBoard');
      store.getState().currentBoard.should.have.property('lists').and.be.an('array').of.length(3);
      store.getState().currentBoard.lists[2].should.have.property('cards').and.be.an('array').of.length(0);
      store.getState().currentBoard.lists[2].should.have.property('id');
      store.getState().currentBoard.lists[2].should.have.property('name').and.equal('List 3');
  });
/*
  it('should EDIT_LIST', function() {

  });

  it('should MOVE_LIST', function() {

  });


  it('should EDIT_CARD', function() {

  });

  it('should MOVE_CARD', function() {

  });*/
});