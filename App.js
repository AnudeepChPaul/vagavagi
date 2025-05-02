import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatedApp, useAuthContext } from 'src/context/AuthContext';
import { HomeRouteStacks } from 'src/pages/home/HomeRootNavigation';
import { LoginScreen } from 'src/pages/auth/LoginScreen';
import { CustomizedStatusBar, StatusBarContextActions, useStatusBarContext } from 'src/context/StatusBarContext';

const Stack = createNativeStackNavigator();

function RootNavigationController() {
  const [authContext] = useAuthContext();
  const [_, dispatchStatusbarOptions] = useStatusBarContext();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        dispatchStatusbarOptions({
          type: StatusBarContextActions.SHOW_STATUS_BAR
        });
      } else {
        dispatchStatusbarOptions({
          type: authContext.loggedIn ? StatusBarContextActions.SHOW_STATUS_BAR : StatusBarContextActions.HIDE_STATUS_BAR
        })
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);



  return (
    <NavigationContainer>
      <Stack.Navigator headerBackButtonMenuEnabled={false}>
        {
          authContext.loggedIn
            ? <Stack.Screen
              name="Home"
              component={HomeRouteStacks}
            />
            : <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <CustomizedStatusBar>
    <AuthenticatedApp>
      <RootNavigationController />
    </AuthenticatedApp>
  </CustomizedStatusBar>
}
