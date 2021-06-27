$(document).ready(function() {
  // creating the list article element
  const createTaskElement = function({task: {id, name, category_name, date_created}}) {
    const $task = $(`<article class="tweet-container"></article>`);
    const $categoryCard = $(`<div class="category-card></div>`).appendTo($task);
    const $categoryName = $(`<h5>${category_name}</h5>`).appendTo($categoryCard);
    const $text = $(`<ul><li>${name}</li><ul>`).text(content.text).appendTo($categoryCard);

    return $task;
  };

  // renders the timeline in reverse-chronological order
  const renderTasks = function(tasks) {
    $('.tasks-timeline').empty();
      tasks.forEach(function(tweet) {
        createTaskElement(task).appendTo('.tasks-timeline');
      });
  }

  // using ajax to load the tasks
  const loadTasks = function() {
    $.ajax({
      method: 'GET',
      url: '/',
      data: $('#tasksform').serialize(),
      dataType: 'json',
      success: function (data) {
        renderTasks(data);
      }
    });
  };
  loadTasks;

  // using ajax to submit the tasks
  const postTweet = function(data) {
    $.ajax({
      method: 'POST',
      data: data,
      url: '/:id',

      success: function (result) {
        loadTasks();
        $('.add-task textarea').val('');
      },
      error: function (err) {
        console.log('error');
      }
    });
  };

  // event listener for submit
  $('#tasksform').on("submit", function(event) {
    event.preventDefault();

    let data = $("#task-text").serialize().replace("text=", "");

    postTweet(data);


    // clears task area
    $("#task-text").val('');
  })

});
