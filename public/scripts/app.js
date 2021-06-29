$(() => {
  // // using ajax to load the tasks
  const loadTasks = () => {
    $.get('/tasks')
      .then((tasks) => {
        renderTasks(tasks.reverse());
      });
  };

  // // creating the list article element
  const createTaskElement = (task) => {
    const $task = $(`
      <div class="category-card">
        <h5>${task.category_name}</h5>
        <ul>
        <li>${task.name}</li>
        </ul>
      </div>
    `);

    const $editForm = $(`
      <form>
        <label for="task-name">Task Name:</label>
        <input name="taskName" id="task-name" value="${task.name}"/>
        <br>
        <button type="submit">Update!</button>
      </form>
    `);

    $editForm.submit(function() {
      const data = $(this).serialize();

      $.post(`/tasks/${tasks.id}`, data)
        .then(() => {
          loadTasks();
        });
    });

    const $deleteButton = $('<button>Delete</button>')
      .click(() => {
        $.post(`/tasks/${tasks.id}/delete`)
          .then(() => {
            loadTasks();
          });
      });

    $task.append($editForm, $deleteButton);

    return $task;
  };

  // // renders the timeline in reverse-chronological order

  const renderTasks = (tasks) => {
    const $taskList = $('.category-card');
    $taskList.empty();

    for (const task of tasks) {
      $taskList.append(createTaskElement(task));
    }
  };

  loadTasks();

  // event listener for submit
  const $newTaskForm = $(`#new-task`);
  $newTaskForm.submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    $.post('/tasks', data)
      .then(() => {
        loadTasks();
        $newTaskForm[0].reset();
      });
  });
});