import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons/faReact';

import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faUser as faRegularUser } from '@fortawesome/free-regular-svg-icons/faUser';

import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEye as faRegularEye } from '@fortawesome/free-regular-svg-icons/faEye';

import { faUsersGear } from '@fortawesome/free-solid-svg-icons/faUsersGear';

import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBarContextActions, useStatusBarContext } from "src/context/StatusBarContext";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { generateRandomId } from "src/util/Util";
import { AddEntry } from "src/organisms/AddEntry";
import { GroupsScreen } from "src/screens/GroupsScreen";
import { FriendsScreen } from "src/screens/FriendsScreen";
import { OverviewSummaryScreen } from "src/screens/OverviewScreen";
import { Tab } from '@rneui/themed';
import { Icon } from '@rneui/themed'

const TabN = createBottomTabNavigator();
const StackN = createNativeStackNavigator();

export function HomeRouteStacks() {
  return <StackN.Navigator
    id={generateRandomId()}
    initialRouteName="LandingPage"
  >
    <StackN.Screen
      name="Add"
      component={AddEntry}
    />
    <StackN.Screen
      name="LandingPage"
      component={TabbedBarStack}
    ></StackN.Screen>
  </StackN.Navigator>
}

export function TabbedBarStack() {
  const navigation = useNavigation();
  const [__, dispatchStatusbarOptions] = useStatusBarContext();

  useEffect(() => {
    dispatchStatusbarOptions({ type: StatusBarContextActions.SHOW_STATUS_BAR });
    navigation.setOptions({
      headerTitle: (props: any) =>
        <FontAwesomeIcon icon={faReact} {...props} size={36} color="tomato" />,
      headerRight: () => (
        <Button onPress={() => navigation.navigate('Add')} title="Add" />
      )
    });
  }, [])


  return (
    <TabN.Navigator
      initialRouteName='Overview'
      id={generateRandomId()}
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
      <TabN.Screen
        name="Overview"
        component={OverviewSummaryScreen}
        options={{ headerShown: false }} />
      <TabN.Screen
        name="Groups"
        component={GroupsScreen}
        options={{ headerShown: false }} />
      <TabN.Screen
        name="Friends"
        component={FriendsScreen}
        options={{ headerShown: false }} />
    </TabN.Navigator>
  );
}

