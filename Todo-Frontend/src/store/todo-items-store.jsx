import { createContext, useEffect, useReducer } from "react";
import {
  addItemToServer,
  deleteItemFromServer,
  getItemsFromServer,
  markItemCompletedOnServer, // make sure it's imported
} from "../services/itemService";

export const TodoItemsContext = createContext({
  todoItems: [],
  addNewItem: () => {},
  deleteItem: () => {},
  markCompleted: () => {},
});

const todoItemsReducer = (currTodoItem, action) => {
  switch (action.type) {
    case "NEW_ITEM":
      return [
        ...currTodoItem,
        {
          id: action.payload.id,
          name: action.payload.itemName,
          dueDate: action.payload.itemDueDate,
          completed: false,
        },
      ];

    case "DELETE_ITEM":
      return currTodoItem.filter((item) => item.id !== action.payload.id);

    case "SET_ITEMS":
      return action.payload;

    case "MARK_COMPLETED":
      return currTodoItem.map((item) =>
        item.id === action.payload.id
          ? { ...item, completed: action.payload.completed }
          : item
      );

    default:
      return currTodoItem;
  }
};

const TodoItemsContextProvider = ({ children }) => {
  const [todoItems, dispatchTodoItems] = useReducer(todoItemsReducer, []);

  // Fetch items on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItemsFromServer();
        const formattedItems = items.map((item) => ({
          id: item._id,
          name: item.task,
          dueDate: item.date,
          completed: item.completed || false, // in case backend sends completed status
        }));
        dispatchTodoItems({ type: "SET_ITEMS", payload: formattedItems });
      } catch (error) {
        console.error("Failed to fetch todos", error);
      }
    };
    fetchItems();
  }, []);

  // Add item
  const addNewItem = async (itemName, itemDueDate) => {
    const savedItem = await addItemToServer(itemName, itemDueDate);
    dispatchTodoItems({
      type: "NEW_ITEM",
      payload: {
        id: savedItem._id,
        itemName: savedItem.task,
        itemDueDate: savedItem.date,
      },
    });
  };

  // Delete item
  const deleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    dispatchTodoItems({
      type: "DELETE_ITEM",
      payload: { id: deletedId },
    });
  };

  // Mark item as completed
  const markCompleted = async (id) => {
    try {
      const updatedItem = await markItemCompletedOnServer(id); // backend returns updated todo
      dispatchTodoItems({
        type: "MARK_COMPLETED",
        payload: {
          id: updatedItem._id,
          completed: updatedItem.completed, // toggle value from DB
        },
      });
    } catch (error) {
      console.error("Failed to mark todo completed", error);
    }
  };

  return (
    <TodoItemsContext.Provider
      value={{
        todoItems,
        addNewItem,
        deleteItem,
        markCompleted,
      }}
    >
      {children}
    </TodoItemsContext.Provider>
  );
};

export default TodoItemsContextProvider;
