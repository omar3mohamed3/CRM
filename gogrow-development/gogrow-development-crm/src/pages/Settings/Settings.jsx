import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("lead/status"); // Navigate to "lead/status" relative to "settings"
  }, [navigate]);
  return <div></div>;
};

export default Settings;
