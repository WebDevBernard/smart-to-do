$(() => {
  // using ajax to load the tasks
  const loadTasks = () => {
    // $.get('/tasks')
    //   .then((tasks) => {
    //     renderTasks(tasks.reverse());
    //   });
    // $.ajax({
    //   method: "GET",
    //   url: "/tasks",
    //   data: $("#text-box").text(),
    //   dataType: "json",
    //   success: function(data) {
    //     renderTasks(data);
    //   },
    // });

    $.ajax({
      method: 'GET',
      url: "/tasks",
      success: (data) => {
        const result = [];
        for (const task of data) {
          result.push(`<li>${task.name}</li>`);
          $(`#${task.category_name}`).html(result);
        }
      },
    });
  };
  loadTasks();

  // reating the list article element
  const createTaskElement = (task) => {
    const newTask = `
    <div class="category-card">
      <h5>${task.category_name}</h5>
      <ul>
      <li>${task.name}</li>
      </ul>
    </div>`;

    return $(newTask);
  };

  // // renders the tasks in reverse-chronological order
  const renderTasks = function (tasks) {
    const $taskList = $("#category-card");
    $taskList.empty();
    for (const task of tasks) {
      $taskList.append(createTaskElement(task));
    }
  };

  const $newTextBox = $(".text-box");

  // event listener for submit
  $newTextBox.on("click", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    // posting the new task
    $.ajax({
      url: "/tasks",
      method: "POST",
      data: data,

      success: function (result) {
        loadTasks();
        $("#text-box").val("");
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });
});
