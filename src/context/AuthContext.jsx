import { createContext, useContext, useState } from "react";

 const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const storedEmail = localStorage.getItem("currentUserEmail");

    const [user, setUser] = useState(
        storedEmail ? { email: storedEmail } : null
    );

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);

        setUser({ email });

        return { success: true };
    }

    function login(email, password) {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const existingUser = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!existingUser) {
            return { success: false, error: "Invalid email or password" };
        }

        localStorage.setItem("currentUserEmail", email);
        setUser({ email });

        return { success: true };
    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ signUp, login, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;

}