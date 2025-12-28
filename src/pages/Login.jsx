import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

// 1. ✅ Sahi Import: Hook ko uske naam (useLogin) se import karein
import useLogin from "../hooks/useLogin"; 

// ❌ GHALLAT THA: const onsubmit = onsubmit()  <-- Yeh line hata di gayi hai

// Variants (Unchanged)
const containerVariants = {
// ... (Variants code remains the same) ...
};

const itemVariants = {
// ... (Variants code remains the same) ...
};

function AnimatedLoginPage() {
    
    // 2. ✅ Sahi Hook Call: Hook ko component ke Top Level par call karein
    const loginFunction = useLogin(); // useLogin hook ko call kiya gaya
    
    const { 
        handleSubmit, 
        control, 
        watch, 
        formState: { errors } 
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange" 
    });
    
    const watchedPassword = watch("password", "");

    const [showPassword, setShowPassword] = useState(false);
    const [isIconHovered, setIsIconHovered] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 3. ✅ Sahi onSubmit Function: Isko define karein, taakey RHF validated data isko de sake
    const onSubmit = (data) => {
        // RHF se data milne ke baad, yeh data humare hook function ko de diya jayega
        loginFunction(data); 
    };

    const currentIconStyle = {
        ...styles.eyeIcon,
        color: isIconHovered ? styles.eyeIconHover.color : styles.eyeIcon.color,
        transform: isIconHovered ? styles.eyeIconHover.transform : styles.eyeIcon.transform,
    };

    return (
        <div style={styles.container}>
            {/* Use handleSubmit to wrap the form submission */}
            <motion.form
                // 4. ✅ Sahi Call: handleSubmit, upar define kiye gaye onSubmit function ko call karega
                onSubmit={handleSubmit(onSubmit)} 
                style={styles.form}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h2 className="text-lg font-semibold" style={styles.title} variants={itemVariants}>
                    Hi, Ather!
                </motion.h2>

                {/* --- Email Input using RHF Controller --- */}
                {/* ... (Email Controller code remains the same) ... */}
                <Controller
                    name="email"
                    control={control}
                    rules={{ 
                        required: "Email is required", 
                        minLength: {
                            value: 5,
                            message: "Email must be at least 5 characters",
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address"
                        }
                    }}
                    render={({ field }) => (
                        <>
                            <motion.input
                                {...field}
                                type="email"
                                placeholder="Email"
                                style={{ ...styles.input, marginBottom: errors.email ? "5px" : "20px" }}
                                required
                                variants={itemVariants}
                                whileFocus={styles.inputFocus}
                            />
                            {errors.email && (
                                <motion.p 
                                    style={styles.error} 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </>
                    )}
                />
                
                {/* --- Password Input using RHF Controller --- */}
                <div style={styles.passwordContainer}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ 
                            required: "Password is required", 
                            minLength: {
                                value: 5,
                                message: "Password must be at least 5 characters",
                            }
                        }}
                        render={({ field }) => (
                            <>
                                <motion.input
                                    {...field}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    style={{ 
                                        ...styles.passwordInputBase, 
                                        marginBottom: errors.password ? "5px" : "0", 
                                    }}
                                    required
                                    variants={itemVariants}
                                    whileFocus={styles.inputFocus}
                                />

                                {/* Conditional Icon Rendering (Uses RHF watched value) */}
                                {watchedPassword.length >= 2 && (
                                    <span
                                        style={currentIconStyle}
                                        onClick={togglePasswordVisibility}
                                        onMouseEnter={() => setIsIconHovered(true)}
                                        onMouseLeave={() => setIsIconHovered(false)}
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                )}
                            </>
                        )}
                    />
                
                </div>
                
                <motion.button
                    type="submit"
                    style={styles.button}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05,}}
                    whileTap={{ scale: 0.95 }}
                >
                    Log In
                </motion.button>
            </motion.form>
        </div>
    );
}


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    transformStyle: "preserve-3d",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    width: "420px",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  inputFocus: {
    borderColor: "#007bff",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.4)",
  },
  input: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  passwordContainer: {
    position: "relative",
    marginBottom: "20px",
  },
  passwordInputBase: {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    marginBottom: "0",
    paddingRight: "40px", // Space for the icon
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  error: {
    color: "#ff3333",
    fontSize: "12px",
    marginTop: "0px",
    marginBottom: "15px", // Spacing after the error message
    textAlign: "left",
    fontWeight: "bold",
  },
  eyeIcon: {
    position: "absolute",
    top: "50%",
    right: "12px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#888",
    fontSize: "18px",
    zIndex: 2,
    pointerEvents: "auto",
    transition: "color 0.2s, transform 0.2s",
  },
  eyeIconHover: {
    color: "#007bff",
    transform: "translateY(-50%) scale(1.1)",
  },
  button: {
    padding: "14px",
    fontSize: "18px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
};



export default AnimatedLoginPage;
