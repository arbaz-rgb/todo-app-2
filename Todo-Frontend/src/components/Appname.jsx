function AppName() {
  return (
    <h1
      className="text-center fw-bold mb-4"
      style={{
        fontSize: "3.5rem", // increased size for more length
        background: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", // subtle shadow
      }}
    >
      Todo App
    </h1>
  );
}

export default AppName;
