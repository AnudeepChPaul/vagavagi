import { faker } from "@faker-js/faker";
import { useNavigation } from "@react-navigation/native";
import { Avatar, ButtonGroup, Icon } from "@rneui/themed";
import { useEffect } from "react";
import { Button, ScrollView, View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { Transaction, AppContextDispatchTypes, TransationTypes } from "src/data/types";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";
import { getAvatarText } from "src/util/Util";
import { useImmer } from "use-immer";

export function ExpenditureList() {
  const [appCtx, dispatch] = useAppContext();
  const navigation = useNavigation();

  const colors = ['green', 'red'];
  const type = ['Credited', 'Borrowed'];

  const [selectedFilter, setSelectedFilter] = useImmer([]);
  const [state, setState] = useImmer({
    ongoingUpdate: false
  });

  useEffect(() => {
    if (!appCtx.quickFilter?.transactionType) {
      return;
    }
    setState({ ongoingUpdate: true });
    if (appCtx.quickFilter?.transactionType
      === TransationTypes.CREDIT) {
      setSelectedFilter([1]);
    } else {
      setSelectedFilter([2]);
    }
  }, [appCtx.quickFilter])

  useEffect(() => {
    if (state.ongoingUpdate) {
      setState({
        ongoingUpdate: false
      });
      return;
    }
    if (selectedFilter[0] === undefined) {
      dispatch({
        type: AppContextDispatchTypes.SET_QUICKFILTER,
        payload: null
      })
    } else if (selectedFilter[0] === 1) {
      dispatch({
        type: AppContextDispatchTypes.SET_QUICKFILTER,
        payload: TransationTypes.CREDIT
      })
    } else {
      dispatch({
        type: AppContextDispatchTypes.SET_QUICKFILTER,
        payload: TransationTypes.DEBIT
      })
    }
  }, [selectedFilter])

  return <View style={{ width: '100%', flex: 1 }}>
    <View style={{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <View style={{ minWidth: 220, alignItems: 'center', justifyContent: 'center' }}>
        <ButtonGroup
          selectMultiple
          buttonStyle={{ padding: 10, flex: 1 }}
          selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
          disabled={[0]}
          buttons={[
            <Icon name="filter" type="font-awesome-5" size={16} style={{ paddingLeft: 0, paddingRight: 0 }} />,
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
        {appCtx.filteredActivities.slice(0, 5).map((activity: Transaction) => {
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
                color: '#a0a0a0',
                fontWeight: 'normal',
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
        <AppText
          style={{
            padding: 12,
            textAlign: 'center',
            borderBottomColor: '#a0a0a0'
          }}
          onPress={() => {
            // @ts-ignore
            navigation.push('Activities')
          }}>Showing only top 5 activities.</AppText>
      </View>
    </ScrollView>
  </View>
}
