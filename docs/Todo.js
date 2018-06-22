/*
* Todo.js
*/
'use strict';
function Todo() {
  var storage = {}

  return {
    getStorage: function() {
      return storage;
    },
    createTodo: function(hash, obj) {
      if(!storage[hash]) storage[hash] = [];
      storage[hash].push(obj);
    },
    removeTodo: function(key, index) {
      storage[key].splice(index, 1);
    },
    editTodo: function(key, index, title) {
      storage[key][index].title = title;
    }
  };
}
