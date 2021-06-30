$(() => {
  // creating the list article element
  const createTaskElement = (task) => {
    const $newTask = $(`
    <li>${task.name}
    </li>`);

    const $deleteButton = $(`<button class="deletetask" type="submit" taskid="${task.id}"><i class="far fa-trash-alt"></i>
    </button>`);

    $newTask.append($deleteButton);

    return $newTask;
  };
  console.log("this is before the function renderTasks");
  // // renders the tasks in reverse-chronological order
  const renderTasks = function (tasks) {
    // const $taskList = $("<div class='cards'></div>");
    const $towatch = $("#towatch");
    const $toread = $("#toread");
    const $tobuy = $("#tobuy");
    const $toeat = $("#toeat");
    // $taskList.empty();
    $towatch.empty();
    $toread.empty();
    $tobuy.empty();
    $toeat.empty();


    //console.log("CAN YOU SEE ME?");
    for (const task of tasks) {
      //console.log("HALO");
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

  // const deleteTask = function(event) {
  //   const taskElm = $(this).parents('li');
  //   const options = {
  //     method: 'DELETE',
  //     url: `/tasks/${taskElm.data('id')}`,
  //   };
  //   $.ajax(options)
  //     .done(function(res) {
  //       taskElm.remove();
  //     })
  //     .fail(function(err) {
  //       console.error('Failed to remove task from DB', err);
  //     });
  // };

  const $newTextBox = $("#textbox");

  // event listener for submit
  $(".taskbutton").on("click", function (event) {
    event.preventDefault();
    console.log($newTextBox.val());
    const data = { name: $newTextBox.val() };
    // add category_name to data object & have api use the data.category_name
    // const data = $(this).val();
    // posting the new task
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: data,

      success: function (result) {
        loadTasks();
        $("#textbox").val("");
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });

  // event listener for delete
  $(".cards").on("click", ".deletetask", function (event) {
    event.preventDefault();
    const data = loadTasks();

    $.ajax({
      method: "DELETE",
      url: `tasks/${$(this).attr("taskid")}`,
      data: data,

      success: function (result) {
        loadTasks();
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });

});
