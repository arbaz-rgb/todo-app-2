import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { TodoItemsContext } from "../store/todo-items-store";

function Todoitem({ todoName, todoDate, id, completed }) {
  const { deleteItem, markCompleted } = useContext(TodoItemsContext);

  const formatDateOnly = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`todo-card d-flex align-items-center border rounded-3 p-3 mb-2`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => markCompleted(id)}
        className="form-check-input me-3"
      />

      <div style={{ flex: 2, textAlign: "left" }}>
        <span
          className={`fw-medium text-truncate ${
            completed ? "text-decoration-line-through text-success" : ""
          }`}
          style={{ fontSize: "1.05rem" }}
        >
          {todoName}
        </span>
      </div>

      <div style={{ flex: 1, textAlign: "left" }}>
        <span className="text-muted">{formatDateOnly(todoDate)}</span>
      </div>

      <div style={{ flex: "0 0 auto" }}>
        <button
          type="button"
          onClick={() => deleteItem(id)}
          className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
        >
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
}

export default Todoitem;
