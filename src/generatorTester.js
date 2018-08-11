/**
 * Async method asyncRunner that takes generator method as input
 * getDetails method (Trello) takes boardId, listId, cardId as input
 * axios.get etc returns a promise. this is the datatype of return val.
 * check denormalize.db and normalizze db. need normalize db o work
 */
const axios = require('axios');

function asyncRunner(generator) {
    const promise = generator.next().value;
    //console.log(promise.value);
    promise.then(function(value) {
        const promise2 = generator.next(value).value;
        promise2.then(function(value2) {
            const promise3 = generator.next(value2).value;
            promise3.then(function(value3) {
                generator.next(value3);     
            });
        });
    });
}

function* getDetails(boardId, listId, cardId) {
   const board = yield axios.get(`http://localhost:3000/api/boards/${boardId}`).then(result => new Promise((resolve, reject) => {
        resolve(result.data);
   }));
   const list = yield axios.get(`http://localhost:3000/api/lists/${listId}`).then(result => new Promise((resolve, reject) => {
       resolve(result.data);
   }));
   const card = yield axios.get(`http://localhost:3000/api/cards/${cardId}`).then(result => new Promise((resolve, reject) => {
       resolve(result.data);
   }));
   console.log('board >> ', board);
   console.log('list >> ', list);
   console.log('card >> ', card);
}

asyncRunner(getDetails(1, 12, 23));

// const tempVal = getDetails(1, 12, 23);
// console.log(tempVal.next());
