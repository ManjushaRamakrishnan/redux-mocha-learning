function TrelloApp(currState, action) {
  switch(action.type) {
    case 'ADD_CARD':
      //Adds a card in the list of given ID
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
      //Edits the name of the current board
      const currBoard = currState.currentBoard;
      const newBoard = Object.assign({}, currBoard, {
        name: action.payload.name
      });
      return Object.assign({}, currState, {
        currentBoard: newBoard
      });

    case 'CREATE_LIST':
      //Creates a new list against the current board
      const board = currState.currentBoard;
      const newBoardLists = Object.assign({}, board, {
        lists: [...board.lists, {id: ''+Math.random()*12345678, name: action.payload.name, cards: action.payload.cards}]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
            lists: newBoardLists.lists
        })
      });
    case 'EDIT_LIST':
      //Edits the name of the current list
      const selectedList = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const listIndex = currState.currentBoard.lists.indexOf(selectedList);
      const editedList = Object.assign({}, selectedList, {
        name: action.payload.name
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, listIndex),
            editedList,
            ...currState.currentBoard.lists.slice(listIndex+1)
          ]
        })
      });
    case 'MOVE_LIST':
      // Moves a list from original index to new index given:
      //Adds a card in the list of given ID
      const thisBoard = currState.currentBoard;
      const thisList = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const thisListIndex = currState.currentBoard.lists.indexOf(thisList);
      const removeBoard = Object.assign({}, thisBoard, {
        lists: [...thisBoard.lists.slice(0, thisListIndex), ...thisBoard.lists.slice(thisListIndex+1)]
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...removeBoard.lists.slice(0, action.payload.moveToIndex),
            thisList,
            ...removeBoard.lists.slice(action.payload.moveToIndex + 1)
          ]
        })
      });

    case 'EDIT_CARD':
      //Edits the text in a card
      const currList = currState.currentBoard.lists.find(list => list.id === action.payload.listId);
      const currListIndex = currState.currentBoard.lists.indexOf(currList);
      const oldCard = currList.cards.find(card => card.id === action.payload.cardId);
      const oldCardIndex = currList.cards.indexOf(oldCard);
      const newCard = Object.assign({}, oldCard, {
        text: action.payload.text
      });
      const newListData = Object.assign({}, currList, {
        cards: [
          ...currList.cards.slice(0, oldCardIndex),
          newCard,
          ...currList.cards.slice(oldCardIndex+1)
        ]  
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: [
            ...currState.currentBoard.lists.slice(0, currListIndex),
            newListData,
            ...currState.currentBoard.lists.slice(currListIndex+1)
          ]
        })
      });

    case 'MOVE_CARD':
      // TODO:
      //from list, to list, to index, cardId
      
      const fromList = currState.currentBoard.lists.find(list => list.id === action.payload.fromListId);
      const fromListIndex = currState.currentBoard.lists.indexOf(fromList);
      const toList = currState.currentBoard.lists.find(list => list.id === action.payload.toListId);
      const toListIndex = currState.currentBoard.lists.indexOf(toList);
      const moveCard = currState.currentBoard.lists[fromListIndex].cards.find(card => card.id === action.payload.cardId);
      const moveCardIndex = currState.currentBoard.lists[fromListIndex].cards.indexOf(moveCard);
      const allList = currState.currentBoard.lists;

      const newFromList = Object.assign({}, fromList, {
        cards: [...fromList.cards.slice(0, moveCardIndex), ...fromList.cards.slice(moveCardIndex + 1)]
      });
      const newToList = Object.assign({}, toList, {
        cards: [...toList.cards.slice(0, action.payload.newCardIndex), moveCard, ...toList.cards.slice(0, action.payload.newCardIndex+1)]
      });
      const mappedList = allList.map(list => {
        if (allList.indexOf(list) === fromListIndex) {
          list = newFromList;
        } else if(allList.indexOf(list) === toListIndex) {
          list = newToList;
        }
        return list;
      });
      return Object.assign({}, currState, {
        currentBoard: Object.assign({}, currState.currentBoard, {
          lists: mappedList
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