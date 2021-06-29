$(() => {
  // creating the list article element
  const createTaskElement = (task) => {
    const newTask = `
      <li>${task.name}</li>
    </div>`;

    return $(newTask);
  };
  
  // // renders the tasks in reverse-chronological order
  const renderTasks = function(tasks) {
    const $taskList = $("<div class='cards'></div>");
    const $towatch = $("#to-watch");
    const $toread = $("#to-read");
    const $tobuy = $("#to-buy");
    const $toeat = $("#to-eat");
    $taskList.empty();
    $towatch.empty();
    $toread.empty();
    $tobuy.empty();
    $toeat.empty();

    
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
    }
  };

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
        renderTasks(data);
        // const result = [];
        // for (const task of data) {
        //   result.push(`<li>${task.name}</li>`);
        //   $(`#${task.category_name}`).html(result);
        // }
      },
    });
  };
  loadTasks();

  const $newTextBox = $("#textbox");

  // event listener for submit
  $('.taskbutton').on("click", function(event) {
    event.preventDefault();
    console.log($newTextBox.val());
    const data = {name: $newTextBox.val()};
    // add category_name to data object & have api use the data.category_name
    // const data = $(this).val();
    // posting the new task
    $.ajax({
      method: "POST",
      url: "/tasks",
      data: data,

      success: function(result) {
        loadTasks();
        $("#textbox").val("");
      },
      error: function (err) {
        console.log("error:", err);
      },
    });
  });
});
