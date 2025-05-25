import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import { View } from 'react-native'
import { AppText } from 'src/atoms/AppText'
import { useAppContext } from 'src/context/AppContext'
import { Group } from 'src/data/types'
import { AppLayout } from 'src/layouts/AppLayout'
import { ExpenditureList } from 'src/organisms/ExpenditureList'
import { GroupNavigationParamList } from 'src/pages/navigation.types'

type Props = NativeStackScreenProps<GroupNavigationParamList, 'GroupView'>

export const GroupViewScreen = ({ navigation, route }: Props) => {
  const [appCtx] = useAppContext()
  const group = appCtx.groups.find((_g: Group) => _g.sid === route.params.sid)

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [])

  return (
    <AppLayout>
      <View style={{ width: '100%', flex: 1 }}>
        <AppText style={{fontSize: 20, textAlign: 'center'}}>{group.name}</AppText>
        <ExpenditureList list={group.activities} />
      </View>
    </AppLayout>
  )
}
