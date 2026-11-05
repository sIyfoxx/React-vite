import { createContext, useCallback, useContext, useMemo, useState } from "react";
import dt from "./data.jsx";
import { hasXssPayload, sanitizeText } from "../../shared/sanitize.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback(async (email, password) => {
    if (hasXssPayload(email) || hasXssPayload(password)) {
      throw new Error("Некорректные данные входа");
    }

    const safeEmail = sanitizeText(String(email ?? ""), { maxLength: 120 });
    const safePassword = String(password ?? "");

    if (!safeEmail || !safePassword) {
      throw new Error("Некорректные данные входа");
    }

    const findeUser = dt.find(
      (u) => u.email === safeEmail && u.password === safePassword
    );

    if (!findeUser) {
      throw new Error("Пользователь не найден");
    }

    setUser(findeUser);
    return findeUser;
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
