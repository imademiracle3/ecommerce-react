import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const [mode, setMode] = useState("signup");
    const [message, setMessage] = useState("");

    const { signUp, login, user, logout } = useContext(AuthContext);

    const navigate = useNavigate(); // ✅ THIS WAS MISSING

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmit(data) {
        let result;

        if (mode === "signup") {
            result = signUp(data.email, data.password);
        } else {
            result = login(data.email, data.password);
        }

        if (!result.success) {
            setMessage(result.error);
        } else {
            setMessage(
                mode === "signup"
                    ? "Signup successful!"
                    : "Login successful!"
            );

            // ✅ Redirect to home page
            navigate("/");
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">

                    {user && (
                        <>
                            <p>User logged in: {user.email}</p>
                            <button onClick={logout}>Logout</button>
                        </>
                    )}

                    <h1 className="page-auth">
                        {mode === "signup" ? "Sign Up" : "Login"}
                    </h1>

                    {message && <p className="form-error">{message}</p>}

                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                            {errors.email && (
                                <span className="form-error">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters",
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="form-error">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        <button type="submit">
                            {mode === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>
                                Already have an account?{" "}
                                <span onClick={() => setMode("login")}>
                                    Login
                                </span>
                            </p>
                        ) : (
                            <p>
                                Don’t have an account?{" "}
                                <span onClick={() => setMode("signup")}>
                                    Sign Up
                                </span>
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}