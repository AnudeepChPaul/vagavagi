import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { DeviceLayerContext } from "src/context/StatusBarContext";
import { initiateListenrs } from "src/util/ResponsiveUtil";
import { RootNavigationController } from "src/pages/Root";
import { enableMapSet } from "immer";

enableMapSet();

export default function App() {
  React.useEffect(() => {
    const cleanup = initiateListenrs();
    return () => cleanup();
  }, []);

  return (
    <DeviceLayerContext>
      <NavigationContainer>
        <RootNavigationController />
      </NavigationContainer>
    </DeviceLayerContext>
  );
}
