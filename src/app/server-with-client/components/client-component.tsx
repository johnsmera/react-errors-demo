"use client";

import { useEffect } from "react";

export function ClientComponent() {
  const data = { name: "John Smera" };

  const handleError = () => {
    throw new Error("Client Runtime Error");
  };

  useEffect(() => {
    handleError();
  }, []);

  return (
    <div>
      <h1>Client Component</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={handleError}
      >
        Handle Error
      </button>
    </div>
  );
}
