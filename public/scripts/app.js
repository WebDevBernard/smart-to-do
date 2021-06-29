$(() => {
  const loadTasks = () => {
    $.get('/tasks')
      .then((tasks) => {
        renderTasks(tasks.reverse());
      });
  };
  // // creating the list article element
  const createTaskElement = (task) => {
    const newTask = `
    <div class="category-card">
      <h5>${task.category_name}</h5>
      <ul>
      <li>${task.name}</li>
      </ul>
    </div>`;

    return $(newTask)
  };

  // // renders the timeline in reverse-chronological order
  const renderTasks = function(tasks) {
    const $taskList = $('#category-card');
    $taskList.empty();
    for (const task of tasks) {
      $taskList.append(createTaskElement(task));
    }
  }

  // // using ajax to load the tasks



  const $newTextBox = $(".text-box")
  // event listener for submit
  $newTextBox.submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      url: "/tasks",
      method: "POST"
      data: data,
      success: function() {
        loadTasks();
      });
  }
      })
loadTasks();
});
