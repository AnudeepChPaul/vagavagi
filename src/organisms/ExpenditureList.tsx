import { useNavigation } from "@react-navigation/native";
import { Avatar, ButtonGroup, Icon, ListItem } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { AppActivity, AppContextDispatchTypes } from "src/data/types";
import { useImmer } from "use-immer";
import { Button } from 'react-native';

export function ExpenditureList() {
  const [appData] = useAppContext();
  const navigation = useNavigation();

  const colors = ['green', 'red'];
  const type = ['Credited', 'Borrowed'];

  const [selectedFilter, setSelectedFilter] = useImmer([]);

  return <View style={{ width: '100%', flex: 1 }}>
    <View style={{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <View style={{ width: '50%' }}>
        <ButtonGroup
          selectMultiple
          buttonStyle={{ padding: 10 }}
          selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
          disabled={[0]}
          buttons={[
            <Icon name="filter" type="font-awesome-5" />,
            <AppText>Credit</AppText>,
            <AppText>Debit</AppText>
          ]}
          selectedIndexes={selectedFilter}
          onPress={(selectedIndexes: Array<number>) => {
            if (!selectedIndexes.length) {
              setSelectedFilter([])
            }

            const _currentSelection = selectedFilter[0];
            const _selectedIndexes = selectedIndexes.concat();
            if (selectedFilter.includes(_currentSelection)) {
              _selectedIndexes.splice(
                _selectedIndexes.indexOf(_currentSelection), 1
              );
            }

            setSelectedFilter(_selectedIndexes);
          }}
        />
      </View>
      {/* <Button */}
      {/*   title="Show all" */}
      {/*   onPress={() => { */}
      {/*     // @ts-ignore */}
      {/*     navigation.navigate('Activities') */}
      {/*   }} */}
      {/* /> */}
    </View>
    <ScrollView style={{ flex: 1, width: '100%' }}>
      {appData.activities.slice(0, 5).map((activity: AppActivity) => {
        const cOrD = activity.type === AppContextDispatchTypes.CREDIT ? 0 : 1;
        return <ListItem key={activity.sid} bottomDivider>
          <Avatar
            key={activity.sid}
            rounded
            source={{ uri: `https://randomuser.me/api/portraits/men/36.jpg` }}
          />
          <ListItem.Content key={activity.sid} style={{ flex: 5 }}>
            <ListItem.Title style={{ color: colors[cOrD] }}>
              {activity.from}
            </ListItem.Title>
            <ListItem.Subtitle>
              {new Date(activity.createdDate).getDay()} days ago
            </ListItem.Subtitle>
          </ListItem.Content>
          <View style={{ flexDirection: 'row' }}>
            <AppText style={{ color: colors[cOrD] }}>{type[cOrD]}</AppText>
            <Icon
              type="font-awesome"
              name="inr"
              color={colors[cOrD]}
              style={{ marginLeft: 15, marginTop: 0, marginBottom: 0, marginRight: 4 }}
            />
            <AppText style={{ color: colors[cOrD] }}>
              {activity.amount}
            </AppText>
          </View>
        </ListItem>
      })}

      <ListItem>
        <ListItem.Content style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlignVertical: 'center',
        }}>
          <Button
            title="Showing only top 5 activities. See more"
            onPress={() => {
              // @ts-ignore
              navigation.push('Activities')
            }} />
        </ListItem.Content>
      </ListItem>
    </ScrollView>
  </View>
}
