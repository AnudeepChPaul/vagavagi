import { StatusBar } from 'expo-status-bar';
import React, { Context, createContext, useContext } from "react";
import { useImmer } from "use-immer";

type StatusBarContextType = {
  hidden: boolean;
}

export enum StatusBarContextActions {
  SHOW_STATUS_BAR = "SHOW_STATUS_BAR",
  HIDE_STATUS_BAR = "HIDE_STATUS_BAR"

}

type StatusBarContextValue = [
  StatusBarContextType,
  (action: { type: StatusBarContextActions }) => void
]

const initialData = (): StatusBarContextType => ({
  hidden: true
})


const StatusBarContext = createContext<StatusBarContextValue | null>(null) as Context<StatusBarContextValue>;

export const useStatusBarContext = (): StatusBarContextValue => {
  const ctx = useContext(StatusBarContext);

  if (!ctx) throw new Error("StatusBarContext has been used outside StatusBarContext.Provider")

  return ctx;
}


export const DeviceLayerContext = ({ children }) => {
  const [state, setState] = useImmer(initialData());

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
    <StatusBar
      animated={true}
      translucent={false}
      hidden={state.hidden}
    />
    {children}
  </StatusBarContext.Provider>)
}
