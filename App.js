import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthenticatedApp } from 'src/context/AuthContext';
import { DeviceLayerContext } from 'src/context/StatusBarContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initiateListenrs } from 'src/util/ResponsiveUtil';
import { RootNavigationController } from 'src/pages/auth/Root';

export default function App() {
  React.useEffect(() => {
    const cleanup = initiateListenrs();
    return () => cleanup();
  }, []);

  return <SafeAreaProvider>
    <DeviceLayerContext>
      <AuthenticatedApp>
        <NavigationContainer>
          <RootNavigationController />
        </NavigationContainer>
      </AuthenticatedApp>
    </DeviceLayerContext>
  </SafeAreaProvider>
}
