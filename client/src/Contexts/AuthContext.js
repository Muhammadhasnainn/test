import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(
    Cookies.get("token")
      ? jwt_decode(Cookies.get("token"))?.user ||
          jwt_decode(Cookies.get("token"))
      : null
  );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
