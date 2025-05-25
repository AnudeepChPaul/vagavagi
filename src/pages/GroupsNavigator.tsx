import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { GroupListScreen } from 'src/screens/groups/GroupListScreen'
import { GroupNavigationParamList } from 'src/pages/navigation.types'
import { GroupViewScreen } from 'src/screens/groups/GroupViewScreen'

const options: NativeStackNavigationOptions = {
  headerShown: false,
}
export const StackedNav = createNativeStackNavigator<GroupNavigationParamList>()

export function GroupsNavigator() {
  return (
    <StackedNav.Navigator id={undefined} initialRouteName="GroupList">
      <StackedNav.Screen name="GroupView" component={GroupViewScreen} />
      <StackedNav.Screen
        name="GroupList"
        component={GroupListScreen}
        options={options}
      />
    </StackedNav.Navigator>
  )
}
