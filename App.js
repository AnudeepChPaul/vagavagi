import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DeviceLayerContext } from 'src/context/StatusBarContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initiateListenrs } from 'src/util/ResponsiveUtil';
import { RootNavigationController } from 'src/pages/auth/Root';
import { enableMapSet } from "immer"

enableMapSet();

export default function App() {
  React.useEffect(() => {
    const cleanup = initiateListenrs();
    return () => cleanup();
  }, []);

  return <SafeAreaProvider>
    <DeviceLayerContext>
      <NavigationContainer>
        <RootNavigationController />
      </NavigationContainer>
    </DeviceLayerContext>
  </SafeAreaProvider>
}
