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
        // renderTasks();
        const result = [];
        for (const task of data) {
          result.push(createTaskElement(task));
          $(`#${task.category_name}`).html(result);
        }
      },
    });
  };
  loadTasks();

  // // renders the tasks in reverse-chronological order
  const renderTasks = function (tasks) {
    const $taskList = $(".category-card");
    // $taskList.empty();
    
    for (const task of tasks) {
      $taskList.append(createTaskElement(task));
    }
  };

  // reating the list article element
  const createTaskElement = (task) => {
    const $body = $(`<body></body>`);
    const newTask = `
    <div class="category-card">
      <h5>${task.category_name}</h5>
      <ul id="${task.category_name}">
      <li>${task.name}</li>
      </ul>
    </div>`;

    return $(newTask).appendTo($body);
  };

  const $newTextBox = $(".text-box");

  // event listener for submit
  $newTextBox.on("click", function(event) {
    event.preventDefault();
    const data = $(this).text();
    // posting the new task
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: data,

      success: function(result) {
        loadTasks();
        $("#text-box").val("");
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });
});
