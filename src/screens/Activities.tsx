import { useNavigation } from "@react-navigation/native";
import { Avatar, Button, ButtonGroup, Icon } from "@rneui/themed";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { Transaction, TransationTypes } from "src/data/types";
import { useImmer } from "use-immer";
import { faker } from "@faker-js/faker";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";
import { getAvatarText } from "src/util/Util";


export const ActivitiesScreen = () => {
  const [appCtx, dispatch] = useAppContext();
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
      <View style={{
        width: '100%',
        margin: 'auto',
        paddingLeft: 16,
        paddingRight: 16
      }}>
        {appCtx.filteredActivities.map((activity: Transaction) => {
          const backgroundColor = faker.color.human();
          const cOrD = activity.type === TransationTypes.CREDIT
            ? 0
            : 1;

          return <View style={{
            width: '100%',
            borderBottomColor: '#f0f0f0',
            borderBottomWidth: 1,
            flexDirection: 'row',
            paddingTop: 16,
            paddingBottom: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            margin: 'auto'
          }}>
            <Avatar
              key={activity.sid}
              rounded
              title={getAvatarText(activity.from)}
              titleStyle={{ mixBlendMode: 'difference' }}
              containerStyle={{ backgroundColor }}
            />
            <View style={{
              marginRight: 10,
              marginLeft: 10,
              flex: 1
            }}>
              <AppText
                numberOfLines={1}
                ellipsizeMode="middle"
                style={{
                  flex: 1,
                  textAlign: 'left',
                  fontSize: ROOT_FONT_SIZE,
                  color: colors[cOrD],
                }}>
                {activity.from}
              </AppText>
              <AppText style={{
                textAlign: 'left',
                fontSize: ROOT_FONT_SIZE * 0.9
              }}>
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
      </View>
    </ScrollView>
  </View>
}
