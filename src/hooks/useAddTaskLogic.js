import { useState, useCallback } from "react";
import axios from "axios";
import { useShop } from "../context/ShopContext";

const DEFAULT_ATHER_HUSAIN = "Ather Husain";
const VITE_BACKEND_URI="https://ke-backend.vercel.app"
const API_BASE_URL = `${VITE_BACKEND_URI}/api/admin-task`;

const initialFormData = {
  jobCreatedDate: new Date().toISOString().split("T")[0],
  inputField1: "",
  inputField2: "",
  inputField3: "",
  inputField4: "",
  inputField5: "",
  inputField6: "",
  inputField7: "",
  workCategory: "", // ✅ REQUIRED
  shift:"",
  status: "pending",
  atherHusain: DEFAULT_ATHER_HUSAIN,
};

export const useAddTaskLogic = (onClose) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { fetchJobs } = useShop();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formData.workCategory) {
        setMessage("❌ Please select work category");
        return;
      }

      setIsSubmitting(true);
      setMessage("");

      try {
        await axios.post(API_BASE_URL, formData, {
          headers: { "Content-Type": "application/json" },
        });

        await fetchJobs(); // ✅ refresh jobs everywhere
        setFormData(initialFormData);
        setMessage("✅ Task added successfully");

        setTimeout(onClose, 800);
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to add task");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, fetchJobs, onClose]
  );

  return {
    formData,
    isSubmitting,
    message,
    handleChange,
    handleSubmit,
  };
};
