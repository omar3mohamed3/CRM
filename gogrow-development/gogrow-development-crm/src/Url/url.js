export const URL = "https://backcrm.growcrm.tech/api/";
export const token =
  localStorage.getItem("access_token") ||
  sessionStorage.getItem("access_token");

export const module_id = () => localStorage.getItem("module_id");

export const formatNumber = (num) => {
  return num >= 1000 ? (num / 1000).toFixed(3) + "K" : num;
};

import * as Yup from "yup";

// Reusable password validation schema
export const passwordValidation = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );
