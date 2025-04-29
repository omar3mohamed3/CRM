import { useState, useEffect } from "react";
import axios from "axios";
import { token, URL } from "../../Url/url";
import { getToken } from "../DashBoard/dashboardSlice";

function useFetchUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user data from the API
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${URL}me`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        // Check if the response is success
        if (response.data.status === "success") {
          setUser(response.data.data);
          setIsAuthenticated(true);
        } else {
          // Handle the case where the response is not successful
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, isLoading, isAuthenticated };
}

export default useFetchUser;
