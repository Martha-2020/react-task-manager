import { useState, useEffect} from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [];
});

const [filter, setFilter] = useState("all");
const [search, setSearch] = useState("");

const [editingId, setEditingId] = useState(null);
const [editText, setEditText] = useState("");

  function addTask(newTask, priority, dueDate) {
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority,
      dueDate,
    };

    setTasks([...tasks, task]);
  }

  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function clearCompleted() {
  const updatedTasks = tasks.filter((task) => !task.completed);
  setTasks(updatedTasks);
}

  function toggleComplete(id) {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed,
      };
    }

    return task;
  });

  setTasks(updatedTasks);
}

function startEditing(task) {
  setEditingId(task.id);
  setEditText(task.text);
}

function saveEdit() {
  if (!editText.trim()) return;

  const updatedTasks = tasks.map((task) => {
    if (task.id === editingId) {
      return {
        ...task,
        text: editText.trim(),
      };
    }

    return task;
  });

  setTasks(updatedTasks);
  setEditingId(null);
  setEditText("");
}

      useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }, [tasks]);

      const filteredTasks = tasks.filter((task) => {
         const matchesSearch = task.text
              .toLowerCase()
              .includes(search.toLowerCase());

      if (filter === "completed") {
        return task.completed && matchesSearch;
      }

      if (filter === "pending") {
        return !task.completed && matchesSearch;
      }

      return matchesSearch;
    });

      const totalTasks = tasks.length;

      const completedTasks = tasks.filter(
        (task) => task.completed
      ).length;

      const pendingTasks = tasks.filter(
        (task) => !task.completed
      ).length;

  return (
    <div className="container">
      <Header />
      <TaskForm addTask={addTask} />
      <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      <div className="filter-buttons">
        <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All   
      </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <div className="task-stats">
      <p>Total: {totalTasks}</p>
      <p>Completed: {completedTasks}</p>
      <p>Pending: {pendingTasks}</p>
    </div>
    <button
      className="clear-btn"
      onClick={clearCompleted}
    >
      Clear Completed
    </button>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
        startEditing={startEditing}
        saveEdit={saveEdit}
        editingId={editingId}
        editText={editText}
        setEditText={setEditText}
      />
      
    </div>
  );
}

export default App;