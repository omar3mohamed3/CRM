import axios from "axios";
import { useEffect, useState } from "react";

const TestServerConnection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get("http://localhost:8000/test-endpoint"); // Use the correct port
        setData(response.data); // Set the data from the response
      } catch (err) {
        setError(err.message); // Capture any error
        console.error("Error connecting to the server:", err);
      }
    };

    testConnection(); // Call the function when the component mounts
  }, []);

  return (
    <div>
      <h1>Server Connection Test</h1>
      {data ? <p>Data from server: {data.message}</p> : <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default TestServerConnection;
