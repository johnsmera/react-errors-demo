import { useEffect } from "react";

export function ClientError() {
  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber % 2 === 0) {
      throw new Error("Client Runtime Error");
    }
  }, []);

  return (
    <div>
      <h1>Client Error</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => {
          throw new Error("Client Event Error");
        }}
      >
        Handle Error
      </button>
    </div>
  );
}
