import { useContext } from "react";
import Todoitem from "./Todoitem";
import { TodoItemsContext } from "../store/todo-items-store";

const TodoItems = () => {
  const { todoItems } = useContext(TodoItemsContext);

  if (todoItems.length === 0) {
    return null; // Optionally hide container if empty
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {todoItems.map((item) => (
            <Todoitem
              key={item.id}
              id={item.id}
              todoName={item.name}
              todoDate={item.dueDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoItems;
