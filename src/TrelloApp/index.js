function TrelloApp(currState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      const list = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const index = currState.currentBoard.lists.indexOf(list);
      const newList = Object.assign({}, list, {
        cards: [...list.cards, { id: '' + Math.random()*89793113, text: action.payload.text }]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, index),
            newList,
            ...currState.currentBoard.lists.slice(index+1)
          ]
        })
      });

    case 'EDIT_BOARD':
      // TODO:
      const board = currState.currentBoard;
      const index = currState.currentBoard.lists.indexOf(list);
      const newBoard = Object.assign({}, board, {
        name: payload.name
      });
      return Object.assign({}, currState, {
        currentBoard: newBoard
      });

    case 'CREATE_LIST':
      // TODO:
      const board = currState.currentBoard;
      const newBoard = Object.assign({}, board, {
        lists: [...board.lists, {id: ''+Math.random()*12345678, name: action.payload.name, cards: action.payload.cards}]
      });
      return Object1.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists,
            newBoard.lists
          ]
        })
      });
    case 'EDIT_LIST':
      // TODO:
    case 'MOVE_LIST':
      // TODO:

    case 'EDIT_CARD':
      // TODO:

    case 'MOVE_CARD':
      // TODO:
      const fromList = currState.currentBoard.lists.find(list => list.id === action.payload.fromListId);
      const toList = currState.currentBoard.lists.find(list => list.id === action.payload.toListId);
      const fromIndex = currState.currentBoard.lists.indexOf(fromList);
      const toIndex = currState.currentBoard.lists.indexOf(toList);
      const oldCardIndex = currState.currentBoard.lists[fromIndex].indexOf(action.payload.cardId);
      const newFromList = Object.assign({}, fromList, {
        cards: [...fromList.cards.slice(0, oldCardIndex), ...fromList.cards.slice(oldCardIndex + 1)]
      });
      const newToList = Object.assign({}, toList, {
        cards: [...toList.cards, { id: '' + Math.random()*89324234113, text: action.payload.text }]
      });
      
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists,
            Object.assign([], array, { [fromIndex]: newFromList }),
            Object.assign([], array, { [toIndex]: newToList })
          ]
        })
      });

    default:
      return currState;
  }
}

/*
  {
    currentBoard: {
      id: ,
      name: ,
      lists: [{
        id: ,
        name: ,
        text: 
      }]
    }
  }

  {
    type: 'ADD_CARD',
    payload: {
      listId: '',
      text: ''
    }
  }

  {
    type: 'CREATE_LIST',
    payload: {
      name: ''
    }
  }

  {
    type: 'EDIT_CARD',
    payload: {
      listId: ,
      cardId: ,
      newText: 
    }
  }

  {
    type: 'DELETE_CARD',
    payload: {
      listId: '',
      cardId: ''
    }
  }

  {
    type: 'DELETE_LIST',
    payload: {
      listId: ''
    }
  }

  {
    type: 'MOVE_CARD',
    payload: {
      fromListId: ,
      toListId: ,
      toListPosition: 
    }
  }

  {
    type: 'MOVE_LIST',
    payload: {
      fromPosition: '',
      toPosition: ''
    }
  }

  {
    type: 'EDIT_LIST',
    payload: {
      listId: '',
      newName:
    }
  }

  {
    type: 'EDIT_BOARD',
    payload: {
      newName:
    }
  }
*/

module.exports = TrelloApp;