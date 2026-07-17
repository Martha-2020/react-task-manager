function TaskList({ 
      tasks, 
      deleteTask, 
      toggleComplete,  
      startEditing, 
      saveEdit,
      editingId,
      editText,
      setEditText,}) 
      
  {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet.</p>;
  }

    function getPriorityIcon(priority) {
  if (priority === "High") {
    return "🔴";
  }

  if (priority === "Medium") {
    return "🟡";
  }

  return "🟢";
}

    function isOverdue(dueDate) {
  if (!dueDate) {
    return false;
  }

  const today = new Date();
  const deadline = new Date(dueDate);

  return today > deadline;
}

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-item" key={task.id}>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <p className={`priority ${(task.priority || "Low").toLowerCase()}`}>
              {getPriorityIcon(task.priority)} {task.priority}
            </p>
            {task.dueDate && (
                <p className="due-date">
                  📅{" "}
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}

                  {isOverdue(task.dueDate) && (
                    <span className="overdue"> ⚠️ Overdue</span>
                  )}
                </p>
              )}

              {editingId === task.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}  /> 
                ) : (
                <span className={task.completed ? "completed" : ""}>
                  
                  {task.text}
                </span>
              )}


          </div>

          {editingId === task.id ? (
              <button
                className="edit-btn"
                onClick={saveEdit}  
                 > Save</button>
            ) : (

              <button
                className="edit-btn"
                onClick={() => startEditing(task)}
                 >Edit</button>
            )}

          <button
            className="delete-btn"
            onClick={() => deleteTask(task.id)} >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;