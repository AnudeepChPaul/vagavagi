import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, ButtonGroup, Icon } from '@rneui/themed'
import { useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { AppText } from 'src/atoms/AppText'
import { useAppContext } from 'src/context/AppContext'
import { Transaction, TransationTypes } from 'src/data/types'
import { useImmer } from 'use-immer'
import { faker } from '@faker-js/faker'
import { ROOT_FONT_SIZE } from 'src/layouts/AppLayout'
import { getAvatarText } from 'src/util/Util'
import { ExpenditureList } from 'src/organisms/ExpenditureList'

export const ActivitiesScreen = () => {
  const [appCtx, dispatch] = useAppContext()
  const navigation = useNavigation()

  const colors = ['green', 'red']
  const type = ['Credited', 'Borrowed']

  const [selectedFilter, setSelectedFilter] = useImmer([])

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: 'tomato',
      headerBackTitle: 'Return',
      headerRight: () => (
        <Button
          onPress={() => {}}
          type="clear"
          color="royalblue"
          title="Search"
          icon={<Icon type="font-awesome-6" name="search" color="royalblue" />}
        />
      ),
    })
  }, [])

  return (
    <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
      <ScrollView style={{ flex: 1, height: 200, width: '100%' }}>
        <View
          style={{
            width: '100%',
            margin: 'auto',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <ExpenditureList list={appCtx._activities} />
        </View>
      </ScrollView>
    </View>
  )
}
