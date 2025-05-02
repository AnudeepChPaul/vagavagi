import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Item } from 'react-navigation-header-buttons'
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
function OverviewSummaryScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
function GroupsScreen() {
  return (
    <View style={styles.container}>
      <Text>Groups Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}
function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text>Friends Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const Tab = createBottomTabNavigator();

export function HomeRouteStacks() {
  const navigation = useNavigation();
  const [__, dispatchStatusbarOptions] = useStatusBarContext();

  useEffect(() => {
    dispatchStatusbarOptions({ type: StatusBarContextActions.SHOW_STATUS_BAR });
    navigation.setOptions({
      headerTitle: (props: any) =>
        <FontAwesomeIcon icon={faReact} {...props} size={36} />,
      headerRight: () => (
        <Item onPress={() => alert('This is a button!')} title="Add"></Item>
      )
    });
  }, [])


  return (
    <Tab.Navigator initialRouteName='Overview'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 13
        },
        tabBarIcon: ({ focused }) => {
          let icon = null;

          switch (route.name) {
            case 'Overview':
              icon = focused ? faEye : faRegularEye;
              break;
            case 'Groups':
              icon = focused ? faUsersGear : faUsersGear;
              break;
            case 'Friends':
              icon = focused ? faUser : faRegularUser;
              break;
          }

          return <FontAwesomeIcon icon={icon} color={focused ? "tomato" : "#ababab"} />
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

