
import { Context, createContext, useContext } from 'react';

type AuthContextType = {
  loggedIn: boolean,
  auth: {
    sid: string | null,
    username: string | null,
    name: string | null,
    token: string | null
  }
}

type AuthContextValue = [
  AuthContextType,
  (action: { type: "AUTHENTICATE" }) => void
]

export const initialAuthData = (): AuthContextType => ({
  loggedIn: false,
  auth: { sid: null, username: null, name: null, token: null }
})

export const AuthContext =
  createContext<AuthContextValue | null>(null) as Context<AuthContextValue>;

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);

  if (!ctx)
    throw new Error("AuthContext has been used outside AuthContext.Provider")

  return ctx;
}

