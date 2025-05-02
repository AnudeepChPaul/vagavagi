
import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from 'src/context/AuthContext';
import { HomeRouteStacks } from 'src/pages/home/HomeRootNavigation';
import { StatusBarContextActions, useStatusBarContext } from 'src/context/StatusBarContext';
import { generateRandomId } from 'src/util/Util';
import { LoginScreen } from 'src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

export function RootNavigationController() {
  const [authContext] = useAuthContext();
  const [_, dispatchStatusbarOptions] = useStatusBarContext();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if (!authContext.loggedIn) {
      dispatchStatusbarOptions({
        type: StatusBarContextActions.HIDE_STATUS_BAR
      });
    }


    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // dispatchStatusbarOptions({
        //   type: StatusBarContextActions.SHOW_STATUS_BAR
        // });
      } else {
        dispatchStatusbarOptions({
          type: authContext.loggedIn
            ? StatusBarContextActions.SHOW_STATUS_BAR
            : StatusBarContextActions.HIDE_STATUS_BAR
        })
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack.Navigator id={generateRandomId()}
      screenOptions={{
        headerShown: false
      }} >
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
  );
}
