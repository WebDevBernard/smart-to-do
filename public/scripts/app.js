
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($(".tasks-timeline"));
    }
  });

  $.ajax({
    method: 'GET',
    url: '/tasks/:id',
    data: $('#tasksform').serialize(),
    dataType: 'json',
  }).done((tasks) => {
    for(task of tasks) {
      $("<section class='to-watch-list'></section>").text(task.name).appendTo($("<div class='category-card'></div>"));
    }
  });

  $.ajax({
    method:'GET',
    url: "/tasks",
    success: (data) => {
      for (task of data) {
        const result=`<td>${task[1].name}</td>`
        $("#result").html(result);
      }
    },
  });


  // creating the list article element
  const createTaskElement = (task) {
    const $task = $(`
    <div class="category-card">
    </div>
    `);
    const $catName = $(`<h5>${task.category_name}</h5>`).appendTo($task);
    const $taskList = $(`<ul></ul>`).appendTo($task);
    const $taskName = $(`<li>${task.name}</li>`).appendTo($taskList);
    const deleteIcon = `<i class="far fa-trash-alt"></i>`;
    const $icon = $(`<div class="icons">${deleteIcon}</div>`).appendTo($taskName);
    ;
  };

  // // renders the timeline in reverse-chronological order
  const renderTasks = function(tasks) {
    // $('.category-card').empty();
    //   tasks.forEach(function(task) {
    //     createTaskElement(task).appendTo('.category-card');
    //   });

    const $tasksList = $('.category-card');
    $tasksList.empty();

    for (const task of tasks) {
      $tasksList.append(createTaskElement(task));
    }
  }

  // using ajax to load the tasks
  const loadTasks = () => {
    // $.ajax({
    //   method: 'GET',
    //   url: '/tasks/:id',
    //   data: $('#tasksform').serialize(),
    //   dataType: 'json',
    //   success: function (data) {
    //     renderTasks(data);
    //   }
    // });

    $.get('/tasks')
      .then((tasks) => {
        renderTasks(tasks.reverse());
      });
  };

  loadTasks();

  // using ajax to submit the tasks
  const postTasks = function(data) {
    $.ajax({
      method: 'POST',
      data: data,
      url: '/tasks',

      success: () => {
        loadTasks();
        $('.add-task textarea').val('');
      },
      error: function (err) {
        console.log('error', err);
      }
    });
  };

  // event listener for submitting a new task
  $('.task-button').on("click", function(event) {
    event.preventDefault();

    let data = { data :$('#text-box').val().replace("text=", "") };

    postTasks(data);

    // clears task area
    $("#task-text-1").val('');
  });

  // delete button

  module.exports = { loadTasks };
});
