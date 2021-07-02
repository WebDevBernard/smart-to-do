/* eslint-disable no-undef */
$(() => {
  // creating the list article element
  const createTaskElement = (task) => {
    const $newTask = $(`
    <li>${task.name}
    </li>`);

    const $deleteButton =
      $(`<button class="deletetask" type="submit" taskid="${task.id}"><i class="far fa-trash-alt"></i>
    </button>`);

    $newTask.append($deleteButton);

    return $newTask;
  };

  // renders the tasks in reverse-chronological order
  const renderTasks = function (tasks) {

    const $towatch = $("#towatch");
    const $toread = $("#toread");
    const $tobuy = $("#tobuy");
    const $toeat = $("#toeat");
    const $todo = $("#todo");

    $towatch.empty();
    $toread.empty();
    $tobuy.empty();
    $toeat.empty();
    $todo.empty();

    for (const task of tasks) {
      if (task.category_name === "to-watch") {
        $towatch.append(createTaskElement(task));
      }
      if (task.category_name === "to-read") {
        $toread.append(createTaskElement(task));
      }
      if (task.category_name === "to-buy") {
        $tobuy.append(createTaskElement(task));
      }
      if (task.category_name === "to-eat") {
        $toeat.append(createTaskElement(task));
      }
      if (task.category_name === "to-do") {
        $todo.append(createTaskElement(task));
      }
    }
  };

  // using ajax to load the tasks
  const loadTasks = () => {
    $.ajax({
      method: "GET",
      url: "/tasks",
      success: (data) => {
        renderTasks(data);
      },
    });
  };
  loadTasks();

  const $newTextBox = $("#textbox");

  // event listener for submit
  $(".taskbutton").on("click", function (event) {
    event.preventDefault();
    console.log($newTextBox.val());
    const data = { name: $newTextBox.val() };
    
    if ($("#textbox").val().length > 0) {
      // posting the new task
      $.ajax({
        method: "POST",
        url: "/tasks",
        data: data,

        success: function () {
          loadTasks();
          $("#textbox").val("");
        },
        error: function (err) {
          console.log("error:", err);
        },
      });
    } else {
      alert("you forgot to enter an actual task!");
    }
  });

  // testing if enter key works
  $("#textbox").keydown(function (event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode === 13 && ($("#textbox").val().length > 0)) {
      $.ajax({
        method: "POST",
        url: "/tasks",
        data: data,

        success: function () {
          loadTasks();
          $("#textbox").val("");
        },
        error: function (err) {
          console.log("error:", err);
        },
      });
    }
  });

  // event listener for delete
  $(".cards").on("click", ".deletetask", function (event) {
    event.preventDefault();
    const data = loadTasks();

    $.ajax({
      method: "DELETE",
      url: `tasks/${$(this).attr("taskid")}`,
      data: data,

      success: function () {
        loadTasks();
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });
});
