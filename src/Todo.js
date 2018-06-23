/*
* Todo.js
*/
'use strict';
function Todo() {
  var myStorage = localStorage;
  var storage = {};

  return {
    getStorage: function() {
      if(myStorage) storage = JSON.parse(myStorage.data);
      
      return storage;
    },
    createTodo: function(hash, obj) {
      if(!storage[hash]) storage[hash] = [];
      storage[hash].push(obj);
      
      if(myStorage) myStorage.data = JSON.stringify(storage);
    },
    removeTodo: function(key, index) {      
      storage[key].splice(index, 1);
      
      if(myStorage) myStorage.data = JSON.stringify(storage)
    },
    editTodo: function(key, index, title) {
      storage[key][index].title = title;
      
      if(myStorage) myStorage.data = JSON.stringify(storage);
    }
  };
}
