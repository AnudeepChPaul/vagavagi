import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Icon } from '@rneui/themed'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppText } from 'src/atoms/AppText'
import { ApplicationContext } from 'src/context/AppContext'
import { useAuthContext } from 'src/context/AuthContext'
import {
  StatusBarContextActions,
  useStatusBarContext,
} from 'src/context/StatusBarContext'
import { ROOT_FONT_SIZE } from 'src/layouts/AppLayout'
import { AddEntry } from 'src/organisms/AddEntry'
import { ActivitiesScreen } from 'src/screens/Activities'
import { FriendsScreen } from 'src/screens/FriendsScreen'
import { OverviewSummaryScreen } from 'src/screens/OverviewScreen'
import { GroupsNavigator } from 'src/pages/GroupsNavigator'
import {
  BottomTabNavigationParamList,
  HomeStackedNavParamsList,
} from 'src/pages/navigation.types'

/*
 * Initialize the bottom tab navigator and the native stack navigator.
 */
const Tab = createBottomTabNavigator<BottomTabNavigationParamList>()
const Stack = createNativeStackNavigator<HomeStackedNavParamsList>()

export function HomeRouteStacks() {
  return (
    <ApplicationContext>
      <SafeAreaProvider>
        <Stack.Navigator id={undefined} initialRouteName="Home">
          <Stack.Screen name="Add" component={AddEntry} />

          <Stack.Screen name="Activities" component={ActivitiesScreen} />
          <Stack.Screen
            name="Home"
            component={TabbedBarStack}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </SafeAreaProvider>
    </ApplicationContext>
  )
}

export function TabbedBarStack() {
  const [authCtx] = useAuthContext()
  const [__, dispatchStatusbarOptions] = useStatusBarContext()

  const iosBottomTabScreenOptions: BottomTabNavigationOptions = {
    headerShown: false,
  }

  const androidBottomTabScreenOptions: BottomTabNavigationOptions = {
    headerTitle: '',
    headerLeft: () => (
      <AppText style={{ marginLeft: 10 }}>{authCtx.auth.name}</AppText>
    ),
  }

  useEffect(() => {
    dispatchStatusbarOptions({
      type: StatusBarContextActions.SHOW_STATUS_BAR,
    })
  }, [])

  return (
    <Tab.Navigator
      initialRouteName="Overview"
      id={undefined}
      screenOptions={({ route }) => {
        const osSpecificOptions =
          Platform.OS === 'android'
            ? androidBottomTabScreenOptions
            : iosBottomTabScreenOptions

        return {
          ...osSpecificOptions,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: (ROOT_FONT_SIZE * 95) / 100,
          },
          tabBarIcon: ({ focused }) => {
            const commonProps = {
              color: focused ? 'tomato' : '#ababab',
            }
            switch (route.name) {
              case 'Overview':
                return (
                  <Icon type="materialicon" name="dashboard" {...commonProps} />
                )
              case 'Groups':
                return (
                  <Icon type="font-awesome" name="group" {...commonProps} />
                )
              case 'Buddies':
                return (
                  <Icon
                    type="font-awesome-5"
                    name="user-tag"
                    {...commonProps}
                  />
                )
            }
          },
        }
      }}
    >
      <Tab.Screen name="Overview" component={OverviewSummaryScreen} />
      <Tab.Screen name="Groups" component={GroupsNavigator} />
      <Tab.Screen name="Buddies" component={FriendsScreen} />
    </Tab.Navigator>
  )
}
