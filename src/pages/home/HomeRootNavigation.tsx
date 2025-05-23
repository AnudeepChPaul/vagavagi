import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from '@rneui/themed';
import { useEffect } from "react";
import { Button, Platform } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppText } from "src/atoms/AppText";
import { ApplicationContext } from "src/context/AppContext";
import { useAuthContext } from 'src/context/AuthContext';
import { StatusBarContextActions, useStatusBarContext } from "src/context/StatusBarContext";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";
import { AddEntry } from "src/organisms/AddEntry";
import { ActivitiesScreen } from 'src/screens/Activities';
import { FriendsScreen } from "src/screens/FriendsScreen";
import { GroupsScreen } from "src/screens/GroupsScreen";
import { OverviewSummaryScreen } from "src/screens/OverviewScreen";

/*
 * Initialize the bottom tab navigator and the native stack navigator.
 */
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function HomeRouteStacks() {
  return <ApplicationContext>
    <SafeAreaProvider>
      <Stack.Navigator
        id={undefined}
        initialRouteName="LandingPage"
      >
        <Stack.Screen
          name="Activities"
          component={ActivitiesScreen}
        />
        <Stack.Screen
          name="Add"
          component={AddEntry}
        />
        <Stack.Screen
          name="LandingPage"
          component={TabbedBarStack}
        ></Stack.Screen>
      </Stack.Navigator>
    </SafeAreaProvider>
  </ApplicationContext>
}

export function TabbedBarStack() {
  const navigation = useNavigation();
  const [authCtx] = useAuthContext();
  const [__, dispatchStatusbarOptions] = useStatusBarContext();

  useEffect(() => {
    dispatchStatusbarOptions({ type: StatusBarContextActions.SHOW_STATUS_BAR });
    if (Platform.OS === 'android') {
      navigation.setOptions({
        headerShown: false
      });
    }

    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => <AppText>{authCtx.auth.name}</AppText>,
      headerRight: () => (
        // @ts-ignore
        <Button onPress={() => navigation.navigate('Add')} title="Add" />
      )
    });
  }, [])


  return (
    <Tab.Navigator
      initialRouteName='Overview'
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: ROOT_FONT_SIZE * 95 / 100
        },
        tabBarIcon: ({ focused }) => {
          const commonProps = {
            color: focused ? 'tomato' : '#ababab'
          }
          switch (route.name) {
            case 'Overview':
              return <Icon type="materialicon" name="dashboard" {...commonProps} />
            case 'Groups':
              return <Icon type="font-awesome" name="group" {...commonProps} />
            case 'Friends':
              return <Icon type="font-awesome-5" name="user-tag" {...commonProps} />
          }
        }
      })}>
      <Tab.Screen
        name="Overview"
        component={OverviewSummaryScreen}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
