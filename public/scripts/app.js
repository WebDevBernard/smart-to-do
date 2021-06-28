
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


  // // creating the list article element
  const createTaskElement = (task) {
    const $task = $(`
    <div class="category-card">
      <h5>${task.category_name}</h5>
      <ul>
      <li>${task.name}</li>
      </ul>
    </div>
    `);
  };

  // // renders the timeline in reverse-chronological order
  const renderTasks = function(tasks) {
    // $('.category-card').empty();
    //   tasks.forEach(function(task) {
    //     createTaskElement(task).appendTo('.category-card');
    //   });

    const $taskList = $('.category-card');
    $taskList.empty();

    for (const task of tasks) {
      $taskList.append(createTaskElement(task));
    }
  }

  // // using ajax to load the tasks
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

  // event listener for submit
  $('.task-button').on("click", function(event) {
    event.preventDefault();
    // console.log($('#text-box').val())
// console.log($('#task-text-1').val())
//  console.log($('#text-box').val().replace("text=", "").serialize());
    let data = { data :$('#text-box').val().replace("text=", "")};
    // console.log(data)
    postTasks(data);


    // clears task area
    $("#task-text-1").val('');
  })

  module.exports = { loadTasks };
});
