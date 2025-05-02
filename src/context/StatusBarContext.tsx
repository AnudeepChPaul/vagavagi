import React, { Context, createContext, useContext, useState } from "react";
import { StatusBar } from 'expo-status-bar';


type StatusBarConextType = {
  hidden: boolean;
}

export enum StatusBarContextActions {
  SHOW_STATUS_BAR = "SHOW_STATUS_BAR",
  HIDE_STATUS_BAR = "HIDE_STATUS_BAR"

}

type StatusBarContextValue = [
  StatusBarConextType,
  (action: { type: StatusBarContextActions }) => void
]

const initialData = (): StatusBarConextType => ({
  hidden: false
})


const StatusBarContext = createContext<StatusBarContextValue | null>(null) as Context<StatusBarContextValue>;

export const useStatusBarContext = (): StatusBarContextValue => {
  const ctx = useContext(StatusBarContext);

  if (!ctx) throw new Error("StatusBarContext has been used outside StatusBarContext.Provider")

  return ctx;
}


export const CustomizedStatusBar = ({ children }) => {
  const [state, setState] = useState(initialData());

  const dispatch = (action: { type: StatusBarContextActions }) => {
    switch (action.type) {
      case StatusBarContextActions.HIDE_STATUS_BAR:
        setState({
          hidden: true
        });
        break;
      case StatusBarContextActions.SHOW_STATUS_BAR:
        setState({ hidden: false });
        break;
    }
  }

  return (<StatusBarContext.Provider value={[state, dispatch]}>
    {children}
    <StatusBar
      animated={true}
      backgroundColor="#61dafb"
      hidden={state.hidden}
    />
  </StatusBarContext.Provider>)
}
