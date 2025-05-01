import React, { Context, createContext, useContext, useState } from "react";


type AuthContextType = {
  loggedIn: boolean,
  auth: {
    username: string | null,
    name: string | null,
    token: string | null
  }
}


type AuthContextValue = [
  AuthContextType,
  (action: { type: "AUTHENTICATE" }) => void
]

const initialData = (): AuthContextType => ({
  loggedIn: false,
  auth: { username: null, name: null, token: null }
})


const AuthContext = createContext<AuthContextValue | null>(null) as Context<AuthContextValue>;

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("AuthContext has been used outside AuthContext.Provider")

  return ctx;
}


export const AuthenticatedApp = ({ children }) => {
  const [state, setState] = useState(initialData());

  const dispatch = (action: { type: "AUTHENTICATE" }) => {
    switch (action.type) {
      case "AUTHENTICATE":
        setState({
          loggedIn: true,
          auth: {
            name: "Anudeep Chandra Paul",
            username: 'acpaul',
            token: 'sofsadfiahwiofh29734hefiuwabsdkjfn'
          }
        });
        break;
    }
  }

  return (<AuthContext.Provider value={[state, dispatch]}>
    {children}
  </AuthContext.Provider>)
}
