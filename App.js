import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@react-navigation/elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthenticatedApp, useAuthContext } from './db';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons/faReact';

function OverviewSummaryScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
      {/* <BottomTabbar /> */}
    </View>
  );
}
function GroupsScreen() {
  return (
    <View style={styles.container}>
      <Text>Groups Screen</Text>
      <StatusBar style="auto" />
      {/* <BottomTabbar /> */}
    </View>
  );
}
function FriendsScreen() {
  return (
    <View style={styles.container}>
      <Text>Friends Screen</Text>
      <StatusBar style="auto" />
      {/* <BottomTabbar /> */}
    </View>
  );
}
function LoginScreen() {
  const [abcd, authenticate] = useAuthContext();

  return (
    <View style={styles.container}>
      <Button onPressIn={() => authenticate({ type: "AUTHENTICATE" })}>Login</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator({});
const Tab = createBottomTabNavigator();

function HomeRouteStacks() {
  return (
    <Tab.Navigator initialRouteName='Overview'>
      <Tab.Screen name="Overview" component={OverviewSummaryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Groups" component={GroupsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Friends" component={FriendsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}


function RootNavigationController() {
  const [authContext, dispatch] = useAuthContext();

  return (
    <NavigationContainer>
      <Stack.Navigator headerBackButtonMenuEnabled={false}>
        {
          authContext.loggedIn
            ? <Stack.Screen
              name="Home"
              component={HomeRouteStacks}
              options={{
                headerTitle: props => <FontAwesomeIcon icon={faReact} />,
                headerRight: () => (
                  <Button onPress={() => alert('This is a button!')}>Info</Button>
                ),
              }}
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
  return <AuthenticatedApp>
    <RootNavigationController />
  </AuthenticatedApp>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
