import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";

const Home = () => {
  const navigate = useNavigate();

  const { loading, userInfo } = useSelector((states) => states.auth);

  // Check the user role and navigate accordingly
  useEffect(() => {
    if (!loading && userInfo) {
      if (userInfo.identity === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/leads");
      }
    }
  }, [loading, userInfo, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
};

export default Home;
