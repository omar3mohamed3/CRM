import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useFetchUser from "./Store/Auth/useFetchUser";
import Loader from "./components/Layout/Loader";
import { fetchUserRole } from "./Store/Auth/loginUser";
import { useDispatch } from "react-redux";

const Protection = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated } = useFetchUser();

  // Fetch the user role when the component mounts
  useEffect(() => {
    dispatch(fetchUserRole());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    <Loader />;
  }

  if (isAuthenticated) {
    return children;
  }

  return null; // Optionally return null or a fallback UI if not authenticated
};

export default Protection;
