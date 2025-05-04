import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, ButtonGroup, Icon } from "@rneui/themed";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { AppActivity, AppContextDispatchTypes } from "src/data/types";
import { useImmer } from "use-immer";
import { faker } from "@faker-js/faker";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";


export const ActivitiesScreen = () => {
  const [appData] = useAppContext();
  const navigation = useNavigation();

  const colors = ['green', 'red'];
  const type = ['Credited', 'Borrowed'];

  const [selectedFilter, setSelectedFilter] = useImmer([]);

  useEffect(() => {
    navigation.setOptions({
      title: '',
      headerTintColor: 'tomato',
      headerBackTitle: 'Return',
      headerRight: () => (
        <Button onPress={() => { }} type='clear' color="royalblue" title="Search" icon={
          <Icon type="font-awesome-6" name='search' color="royalblue" />
        } />
      )
    })
  }, [])

  return <View style={{ width: '100%', height: '100%', flexDirection: 'column' }}>
    <ButtonGroup
      selectMultiple
      buttonStyle={{ padding: 10 }}
      selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
      buttons={[
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
    <ScrollView style={{ flex: 1, height: 200, width: '100%' }}>
      {appData.activities.map((activity: AppActivity) => {
        const backgroundColor = faker.color.human();
        const cOrD = activity.type === AppContextDispatchTypes.CREDIT ? 0 : 1;

        return <View key={activity.sid}
          style={{ width: '100%', margin: 'auto', paddingLeft: 16, paddingRight: 16 }}>
          <View style={{ width: '100%', borderBottomColor: '#ababab', borderBottomWidth: 1, flexDirection: 'row', paddingTop: 16, paddingBottom: 16, justifyContent: 'space-between', alignItems: 'center' }}>
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
        </View>
      })}
    </ScrollView>
  </View>
}
