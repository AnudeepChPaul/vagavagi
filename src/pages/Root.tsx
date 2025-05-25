import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import { mockUserPerson } from 'src/context/AppContext'
import { AuthContext, initialAuthData } from 'src/context/AuthContext'
import { HomeRouteStacks } from 'src/pages/HomeNavigator'
import { LoginScreen } from 'src/screens/LoginScreen'
import { generateRandomId } from 'src/util/Util'
import { useImmer } from 'use-immer'

const Stack = createNativeStackNavigator()

export function RootNavigationController() {
  const [state, setState] = useImmer(initialAuthData())

  const dispatch = (action: { type: 'AUTHENTICATE' }) => {
    switch (action.type) {
      case 'AUTHENTICATE':
        setState({
          loggedIn: true,
          auth: {
            sid: mockUserPerson.sid,
            name: mockUserPerson.name,
            username: mockUserPerson.sid,
            token: generateRandomId().toString(),
          },
        })
        break
    }
  }
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // dispatchStatusbarOptions({
        //   type: StatusBarContextActions.SHOW_STATUS_BAR
        // });
      } else {
        // dispatchStatusbarOptions({
        //   type: state.loggedIn
        //     ? StatusBarContextActions.SHOW_STATUS_BAR
        //     : StatusBarContextActions.HIDE_STATUS_BAR
        // })
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return (
    <AuthContext.Provider value={[state, dispatch]}>
      {!state.loggedIn ? (
        <Stack.Navigator
          id={undefined}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <HomeRouteStacks />
      )}
    </AuthContext.Provider>
  )
}
