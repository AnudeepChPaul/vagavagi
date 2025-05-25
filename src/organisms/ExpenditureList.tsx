import { faker } from '@faker-js/faker'
import { useNavigation } from '@react-navigation/native'
import { Avatar, ButtonGroup, Icon } from '@rneui/themed'
import { ScrollView, View } from 'react-native'
import { AppText } from 'src/atoms/AppText'
import {
  Transaction,
  TransationTypes,
} from 'src/data/types'
import { ROOT_FONT_SIZE } from 'src/layouts/AppLayout'
import { getAvatarText } from 'src/util/Util'
import { useImmer } from 'use-immer'
import { FilterButtonGroup } from './FilterButtonGroup'
import { JSX } from 'react'

export type ExpenditureListProps = {
  list: Array<Transaction>
  footer?: JSX.Element
}

export function ExpenditureList(props: ExpenditureListProps) {
  const navigation = useNavigation()

  const colors = ['green', 'red']
  const type = ['Credited', 'Borrowed']

  const [selectedFilter, setSelectedFilter] = useImmer([])

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <FilterButtonGroup
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        </View>
      </View>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            width: '100%',
            margin: 'auto',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {props.list.filter((_t: Transaction) => {
            if (!selectedFilter[0]) {
              return true;
            }

            if (selectedFilter[0] === 1) {
              return _t.type === TransationTypes.CREDIT
            }

            if (selectedFilter[0] === 2) {
              return _t.type === TransationTypes.DEBIT
            }
          }).map((transaction: Transaction) => {
            const backgroundColor = faker.color.human()
            const cOrD = transaction.type === TransationTypes.CREDIT ? 0 : 1

            return (
              <View
                key={transaction.sid}
                style={{
                  width: '100%',
                  borderBottomColor: '#f0f0f0',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  paddingTop: 16,
                  paddingBottom: 16,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  margin: 'auto',
                }}
              >
                <Avatar
                  key={transaction.sid}
                  rounded
                  title={getAvatarText(transaction.from)}
                  titleStyle={{ mixBlendMode: 'difference' }}
                  containerStyle={{ backgroundColor }}
                />
                <View
                  style={{
                    marginRight: 10,
                    marginLeft: 10,
                    flex: 1,
                  }}
                >
                  <AppText
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    style={{
                      flex: 1,
                      textAlign: 'left',
                      fontSize: ROOT_FONT_SIZE,
                      color: colors[cOrD],
                    }}
                  >
                    {transaction.from}
                  </AppText>
                  <AppText
                    style={{
                      textAlign: 'left',
                      color: '#a0a0a0',
                      fontWeight: 'normal',
                      fontSize: ROOT_FONT_SIZE * 0.9,
                    }}
                  >
                    {new Date(transaction.createdDate).getDay()} days ago
                  </AppText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <AppText style={{ color: colors[cOrD] }}>
                    {type[cOrD]}
                  </AppText>
                  <Icon
                    type="font-awesome"
                    name="inr"
                    color={colors[cOrD]}
                    style={{
                      marginLeft: 15,
                      marginTop: 0,
                      marginBottom: 0,
                      marginRight: 4,
                    }}
                  />
                  <AppText style={{ color: colors[cOrD] }}>
                    {transaction.amount}
                  </AppText>
                </View>
              </View>
            )
          })}
          {props.footer}
        </View>
      </ScrollView>
    </View>
  )
}
