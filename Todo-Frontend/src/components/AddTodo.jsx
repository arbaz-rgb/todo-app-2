import { useContext, useRef } from "react";
import { BiMessageAdd } from "react-icons/bi";
import { TodoItemsContext } from "../store/todo-items-store";

function AddTodo() {
  const todoNameElement = useRef(null);
  const dueDateElement = useRef(null);

  const { addNewItem } = useContext(TodoItemsContext);

  const handleAddButtonClicked = (event) => {
    event.preventDefault();
    const todoName = todoNameElement.current.value.trim();
    const dueDate = dueDateElement.current.value;
    if (!todoName) return; // Prevent empty todos
    addNewItem(todoName, dueDate);
    todoNameElement.current.value = "";
    dueDateElement.current.value = "";
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <form
        onSubmit={handleAddButtonClicked}
        className="d-flex flex-column flex-md-row gap-2 w-100"
        style={{ maxWidth: "735px" }}
      >
        {/* Todo Input */}
        <input
          type="text"
          ref={todoNameElement}
          placeholder="Enter Todo Here"
          className="form-control shadow-sm border rounded p-3"
          style={{ fontSize: "1rem" }}
        />

        {/* Date Picker */}
        <input
          type="date"
          ref={dueDateElement}
          className="form-control shadow-sm border rounded p-3"
          style={{ fontSize: "1rem" }}
        />

        {/* Add Button */}
        <button
          type="submit"
          className="btn d-flex align-items-center justify-content-center shadow text-white"
          style={{
            background: "linear-gradient(45deg, #6366f1, #a855f7, #ec4899)",
            border: "none",
            fontWeight: "600",
            fontSize: "1rem",
            padding: "0.5rem 1.2rem",
            borderRadius: "12px",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
          }}
        >
          <BiMessageAdd size={22} className="me-2" />
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
