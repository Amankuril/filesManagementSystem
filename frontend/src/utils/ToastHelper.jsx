// src/utils/toastHelper.js
import { toast } from "react-toastify";
import { SuccessToast, ErrorToast } from "../Components/CustomToasts.jsx";

const baseStyle = {
  background: "#1E1E1E",
  border: "1px solid #3A3A3A",
  borderRadius: "14px",
  padding: "12px 16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
};

export const showSuccess = (msg, opts = {}) => {
  toast(<SuccessToast message={msg} />, {
    style: baseStyle,
    progressStyle: { background: "#D4AA7D" },
    autoClose: 1800,
    ...opts,
  });
};

export const showError = (msg, opts = {}) => {
  toast(<ErrorToast message={msg} />, {
    style: baseStyle,
    progressStyle: { background: "red" },
    autoClose: 2400,
    ...opts,
  });
};
