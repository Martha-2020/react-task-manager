import { useState } from "react";

function TaskForm({ addTask }) {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (task.trim() === "") return;

    addTask(task, priority,  dueDate);

    setTask("");
    setDueDate("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;