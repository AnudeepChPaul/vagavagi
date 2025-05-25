import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View } from 'react-native'
import { useAppContext } from 'src/context/AppContext'
import { Group } from 'src/data/types'
import { AppLayout } from 'src/layouts/AppLayout'
import { GroupList } from 'src/organisms/GroupList'
import { GroupNavigationParamList } from 'src/pages/navigation.types'

type Props = NativeStackScreenProps<GroupNavigationParamList, 'GroupList'>

export const GroupListScreen = ({ navigation }: Props) => {
  const [appCtx] = useAppContext()

  const onGroupItemPress = (group: Group) => {
    navigation.navigate('GroupView', {
      sid: group.sid,
    })
  }

  return (
    <AppLayout>
      <View style={{ width: '100%', flex: 1 }}>
        <GroupList groups={appCtx.groups} onGroupItemPress={onGroupItemPress} />
      </View>
    </AppLayout>
  )
}
