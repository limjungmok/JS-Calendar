/*
* Calendar.js
*/
'use strict';
function Calendar() {
  var date = new Date();
  
  var self = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    dayOfWeek: date.getDay()
  }

  return {
    getYear: function() {
      return self.year;
    },
    getMonth: function() {
      return self.month;
    },
    getDay: function() {
      return self.day;
    },
    getDayOfWeek: function() {
      return self.dayOfWeek;
    },
    getDayHash: function() {
      return self.year.toString() + (self.month+1).toString() + self.day.toString();
    },
    setIncreaseYear: function() {
      self.year++;
    },
    setDecreaseYear: function() {
      self.year--;
    },
    setYear: function(value) {
      self.year = value;
    },
    setIncreaseMonth: function() {
      self.month++;
    },
    setDecreaseMonth: function() {
      self.month--;
    },
    setMonth: function(value) {
      self.month = value;
    },
    setDay: function(value) {
      self.day = value;
    }
  };
}
