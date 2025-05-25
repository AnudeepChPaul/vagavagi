import { Avatar } from '@rneui/themed'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { AppText } from 'src/atoms/AppText'
import { Group } from 'src/data/types'
import { getAvatarText } from 'src/util/Util'

export type GroupListProps = {
  groups: Array<Group>
  onGroupItemPress: (g: Group) => void
}

export function GroupList(props: GroupListProps) {
  return (
    <View style={{ width: '100%', flex: 1 }}>
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            width: '100%',
            margin: 'auto',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {props.groups.map((group: Group) => {
            return (
              <View
                key={group.sid}
                style={{
                  width: '100%',
                  borderBottomColor: '#ababab',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  paddingTop: 16,
                  paddingBottom: 16,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 'auto',
                }}
              >
                <Avatar
                  key={group.sid}
                  rounded
                  title={getAvatarText(group.name)}
                  titleStyle={{ mixBlendMode: 'difference' }}
                  containerStyle={{ backgroundColor: '#000' }}
                />
                <View
                  style={{
                    marginRight: 10,
                    marginLeft: 10,
                    flex: 1,
                  }}
                >
                  <AppText
                    style={{
                      textAlign: 'left',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => {
                      props.onGroupItemPress(group)
                    }}
                  >
                    {group.name}
                  </AppText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <AppText>{group.individuals.length} individuals</AppText>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}
