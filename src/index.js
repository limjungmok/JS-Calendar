/* 
import calendar
main app
*/

(function() {
  'use strict';
  var KEY_CODE = {'ENTER': 13};
  var MONTH_LIST = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAY_LIST = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  

  var container = document.querySelector('#container');
  
  // left side
  var date_text = container.querySelector('.date_text');
  var date_num = container.querySelector('.date_num');

  // right side
  var date_year = container.querySelector('.select_date .year');
  var date_month = container.querySelector('.select_date .month');

  // calendar table
  var calendar_table = container.querySelector('.calendar_table');
  var calendar_tr = container.querySelectorAll('.calendar_tr');
  var calendar_td = container.querySelectorAll('.calendar_td');
  // 첫 줄 제거
  calendar_tr = Array.prototype.slice.call(calendar_tr, 1, calendar_tr.length);
  calendar_td = Array.prototype.slice.call(calendar_td, 7, calendar_td.length);
  
  // Prev, Next Buttons
  var btn_prev = container.querySelector('.btn.prev');
  var btn_next = container.querySelector('.btn.next');

  // todo
  var todo_area = container.querySelector('.todo');
  var todo_input = container.querySelector('.todo .input');
  var todo_ul = container.querySelector('.todo .list_area');

  // calendar func
  function getEndDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  
  function getFirstDayOfMonth (year, month) {
    return new Date(year, month, 1).getDay();
  } 

  function getDayTextValue(day) {
    return DAY_LIST[day];
  }

  function getMonthValue(month) {
    return MONTH_LIST[month];
  }

  function setCalendar(year, month) {
    var firstDay = getFirstDayOfMonth(year, month);
    var endDay = getEndDayOfMonth(year, month);
  
    // 다 지우고
    for(var i = 0; i<calendar_td.length; i++) {
      calendar_td[i].innerHTML = '';
    }
    
    // 그려주고
    for(var i = 0; i < endDay; i++) {
      if(calendar_td[firstDay + i]) calendar_td[firstDay + i].innerHTML = i+1;
    }
  }

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  function onHandleEdit(e) {
    var todo = app.access().todo();
    var calendar = app.access().calendar();
    var hash = calendar.getDayHash();
    
    // 수정하고싶은 li
    var edit_li = e.target.parentElement;
    var edit_uuid = edit_li.dataset.uuid;
    var edit_text = edit_li.firstChild.textContent;

    // 교체될 li
    var replaced_li = document.createElement('li');
    replaced_li.classList.add('list');
    replaced_li.dataset.uuid = edit_uuid;

    var replaced_input = document.createElement('input');
    replaced_input.classList.add('input_replaced');
    replaced_input.value = edit_text;

    var btn_edit_confirm = document.createElement('button');
    btn_edit_confirm.classList.add('btn', 'edit_confirm');
    btn_edit_confirm.innerHTML = '완료';

    replaced_li.appendChild(replaced_input);
    replaced_li.appendChild(btn_edit_confirm);
    
    // 수정할 li, 교체될 li replace
    todo_ul.replaceChild(replaced_li, edit_li);
    replaced_input.focus();

    replaced_input.addEventListener('keypress', function(e) {
      if(e.keyCode === KEY_CODE.ENTER) {
        var edit_index;
        
         for(var i = 0; i < todo.getStorage()[hash].length; i++) {
           if(todo.getStorage()[hash][i].uuid === edit_uuid) {
             edit_index = i;
           }
         }
         
         todo.editTodo(hash, edit_index, replaced_input.value);
         app.renderTodo();
      }
    });

    btn_edit_confirm.addEventListener('click', function(e) {
      e.preventDefault();

      var edit_index;
      
       for(var i = 0; i < todo.getStorage()[hash].length; i++) {
         if(todo.getStorage()[hash][i].uuid === edit_uuid) {
           edit_index = i;
         }
       }
       
       todo.editTodo(hash, edit_index, replaced_input.value);
       app.renderTodo();
    });
  }

  function onHandleRemove(e) {
    var remove_li = e.target.parentElement;
    var remove_uuid = remove_li.dataset.uuid;

    var todo = app.access().todo();
    var calendar = app.access().calendar();
    var hash = calendar.getDayHash();
    var remove_index;

    for(var i = 0; i < todo.getStorage()[hash].length; i++) {
      if(todo.getStorage()[hash][i].uuid === remove_uuid) {
        remove_index = i;
      }
    }

    todo.removeTodo(hash, remove_index);
    app.renderTodo();
  }

  var app = (function() {
    var calendar = new Calendar();
    var todo = new Todo();

    return {
      init: function() {
        date_text.innerHTML = getDayTextValue(calendar.getDayOfWeek());
        date_num.innerHTML = calendar.getDay();
        date_year.innerHTML = calendar.getYear();
        date_month.innerHTML = getMonthValue(calendar.getMonth());
        
        // 처음 달력을 그려줌
        setCalendar(calendar.getYear(), calendar.getMonth());

        // 버튼 리스너 추가
        btn_prev.addEventListener('click', function(e) {
          calendar.setDecreaseMonth();

          if(calendar.getMonth() < 0) {
            calendar.setMonth(11);
            calendar.setDecreaseYear();
          }
        
          calendar_td.forEach(function(td) {
            if(td.classList.contains('on')) td.classList.remove('on');
          });

          app.renderCalendar();
        });
      
        btn_next.addEventListener('click', function(e) {
          calendar.setIncreaseMonth();

          if(calendar.getMonth() > 11) {
            calendar.setMonth(0);
            calendar.setIncreaseYear();
          }
          
          calendar_td.forEach(function(td) {
            if(td.classList.contains('on')) td.classList.remove('on');
          });
          
          app.renderCalendar();
        });

        calendar_table.addEventListener('click', function(e) {
          e.stopPropagation();

          calendar_td.forEach(function(td) {
            if(td.classList.contains('on')) td.classList.remove('on');
          });

          if(e.target.textContent) {
            calendar.setDay(e.target.textContent);
            date_num.innerHTML = calendar.getDay();
            
            e.target.classList.add('on');
            todo_area.classList.add('on');
            
            app.renderTodo();
          }
        }, false);

        todo_input.addEventListener('keypress', function(e) {
          if(e.keyCode === KEY_CODE.ENTER) {
            var hash = calendar.getDayHash();
            var obj = {
              uuid: uuidv4(),
              title: e.target.value
            };

            // // todo 추가, input 초기화
            todo.createTodo(hash, obj);
            e.target.value = '';

            app.renderTodo();
          }
        });
      },
      renderCalendar: function() {
        date_year.innerHTML = calendar.getYear(); 
        date_text.innerHTML = getDayTextValue(calendar.getDayOfWeek());
        date_month.innerHTML = getMonthValue(calendar.getMonth());
                      
        setCalendar(calendar.getYear(), calendar.getMonth()); 
      },
      renderTodo: function() {
        // 처음에 다 지운다.
        while(todo_ul.firstChild) {
          todo_ul.removeChild(todo_ul.firstChild);
        }

        // 해당 날짜의 해시값과 일치하면, 리스트를 렌더링
        if((todo.getStorage()[calendar.getDayHash()])) {
          (todo.getStorage()[calendar.getDayHash()]).forEach(function(item) {
            var todo_li = document.createElement('li');
            todo_li.classList.add('list');
            todo_li.dataset.uuid = item.uuid;

            var todo_text = document.createElement('span');
            todo_text.textContent = item.title;

            var btn_edit = document.createElement('button');
            btn_edit.classList.add('btn', 'edit');
            btn_edit.innerHTML = '수정';
            btn_edit.addEventListener('click', onHandleEdit);       
        
            var btn_remove = document.createElement('button');
            btn_remove.classList.add('btn', 'remove');
            btn_remove.innerHTML = '삭제';
            btn_remove.addEventListener('click', onHandleRemove);

            todo_li.appendChild(todo_text);
            todo_li.appendChild(btn_edit);
            todo_li.appendChild(btn_remove);
            todo_ul.appendChild(todo_li);
          });
        }
      },
      access: function() {
        return {
          todo: function() {
            return todo;
          },
          calendar: function() {
            return calendar;
          }
        }
      }
    }
  })();

  app.init();
  
})();
