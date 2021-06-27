
$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

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
    $('.category-card').empty();
      tasks.forEach(function(tweet) {
        createTaskElement(task).appendTo('.category-card');
      });
  }

  // using ajax to load the tasks
  const loadTasks = function() {
    $.ajax({
      method: 'GET',
      url: '/tasks/:id',
      data: $('#tasksform').serialize(),
      dataType: 'json',
      success: function (data) {
        renderTasks(data);
      }
    });
  };

  loadTasks;

  module.exports = { loadTasks };
});
