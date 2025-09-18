import React, { Component } from "react";
import { TodoItemsContext } from "../store/todo-items-store";

class WelcomeMessage extends Component {
  static contextType = TodoItemsContext;

  render() {
    const { todoItems } = this.context;

    if (todoItems.length > 0) return null;

    return (
      <div className="d-flex justify-content-center mt-5">
        <div
          className="welcome-card text-center p-2 rounded-4 shadow-lg"
          style={{
            background: "linear-gradient(to right, #4f46e5, #8b5cf6, #ec4899)",
            color: "white",
            maxWidth: "400px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            animation: "fadeIn 0.8s ease-in-out",
          }}
        >
          <h4 className="mb-2" style={{ fontSize: "1.2rem" }}>
            🌟 Enjoy Your Day!
          </h4>
          <p className="text-white-50 mb-0" style={{ fontSize: "0.85rem" }}>
            Stay productive and have fun with your tasks!
          </p>
        </div>

        {/* Inline CSS for hover effect and animation */}
        <style>{`
          .welcome-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
}

export default WelcomeMessage;
