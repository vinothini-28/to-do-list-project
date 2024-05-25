window.addEventListener('load', () => {
    const form = document.querySelector("#newtask");
    const input = document.querySelector("#new-task");
    const list_el = document.querySelector("#tasks");

    // Function to save tasks to local storage
    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return tasks;
    };

    // Function to create a task element
    const createTaskElement = (task) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);
        task_el.appendChild(task_content_el);

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("action");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerText = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerText = "Delete";

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);
        task_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        // Edit functionality
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
                updateTask(task, task_input_el.value);
            }
        });

        // Delete functionality
        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            deleteTask(task_input_el.value);
        });
    };

    // Function to update a task in local storage
    const updateTask = (oldTask, newTask) => {
        const tasks = loadTasks();
        const taskIndex = tasks.indexOf(oldTask);
        if (taskIndex !== -1) {
            tasks[taskIndex] = newTask;
            saveTasks(tasks);
        }
    };

    // Function to delete a task from local storage
    const deleteTask = (task) => {
        let tasks = loadTasks();
        tasks = tasks.filter(t => t !== task);
        saveTasks(tasks);
    };

    // Load tasks from local storage when the page loads
    const tasks = loadTasks();
    tasks.forEach(task => {
        createTaskElement(task);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const plan = input.value;
        if (!plan) {
            alert("Please fill out the task");
            return;
        }

        createTaskElement(plan);

        // Save task to local storage
        const tasks = loadTasks();
        tasks.push(plan);
        saveTasks(tasks);

        // Clear the input field after adding the task
        input.value = '';
    });
});
