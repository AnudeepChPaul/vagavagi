import { useNavigation } from "@react-navigation/native";
import { Avatar, ButtonGroup, Icon, ListItem } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { AppActivity, AppContextDispatchTypes } from "src/data/types";
import { useImmer } from "use-immer";
import { Button } from 'react-native';
import { faker } from "@faker-js/faker";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";

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
    </View>
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <View style={{
        width: '100%',
        margin: 'auto',
        paddingLeft: 16,
        paddingRight: 16
      }}>

        {appData.activities.slice(0, 5).map((activity: AppActivity) => {
          const backgroundColor = faker.color.human();
          const cOrD = activity.type === AppContextDispatchTypes.CREDIT ? 0 : 1;

          return <View style={{
            width: '100%',
            borderBottomColor: '#ababab',
            borderBottomWidth: 1,
            flexDirection: 'row',
            paddingTop: 16,
            paddingBottom: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 'auto'
          }}>
            <Avatar
              key={activity.sid}
              rounded
              title={activity.from.split(" ").map(c => c[0]).join("")}
              titleStyle={{ mixBlendMode: 'difference' }}
              containerStyle={{ backgroundColor }}
            />
            <View style={{ marginRight: 10, marginLeft: 10, flex: 1 }}>
              <AppText style={{ textAlign: 'left', fontSize: ROOT_FONT_SIZE * 1.3, color: colors[cOrD] }}>
                {activity.from}
              </AppText>
              <AppText style={{ textAlign: 'left' }}>
                {new Date(activity.createdDate).getDay()} days ago
              </AppText>
            </View>
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
          </View>
        })}
        <Button
          title="Showing only top 5 activities. See more"
          onPress={() => {
            // @ts-ignore
            navigation.push('Activities')
          }} />
      </View>
    </ScrollView>
  </View>
}
