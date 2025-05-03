import { useNavigation } from "@react-navigation/native";
import { Button, Card } from "@rneui/themed";
import { View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";

export const WelcomeCard = () => {
  const [appContext] = useAppContext();
  const navigation = useNavigation();

  return <Card containerStyle={{ width: '94%', height: 160, margin: 'auto', marginTop: 15 }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* <Card.Title style={{ textAlign: 'left' }}>Hey</Card.Title> */}
      <Card.Title h4 style={{ textAlign: 'left', marginLeft: 10 }}>
        {appContext.user.name}
      </Card.Title>
    </View>
    <Card.Divider style={{ marginBottom: 0 }} />
    <View style={{
      position: "relative",
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      flexDirection: 'row',
      padding: 10,
      marginTop: 0,
      marginBottom: 0,
    }}>
      <View>
        <AppText>You borrowed INR</AppText>
        <View>
          <AppText style={{
            fontWeight: 800,
            fontStyle: 'italic',
            fontSize: ROOT_FONT_SIZE * 1.2
          }}>
            {appContext.totalBorrowed}
          </AppText>
        </View>
      </View>
      <View>
        <AppText>You've lent INR</AppText>
        <View>
          <AppText style={{
            fontWeight: 800,
            fontStyle: 'italic',
            fontSize: ROOT_FONT_SIZE * 1.2
          }}>
            {appContext.totalLent}
          </AppText>
        </View>
      </View>
    </View>
    <Card.Divider style={{ marginBottom: 0 }} />
    <View style={{
      flexDirection: 'row',
      position: "relative",
      justifyContent: 'space-evenly',
      alignItems: 'flex-start',
      padding: 10,
      marginTop: 0,
    }}>
      <Button
        type="clear"
        size="sm"
        onPress={() => {
          // @ts-ignore
          return navigation.jumpTo('Groups');
        }}
        style={{ marginTop: 0, padding: 0 }}>
        <AppText style={{ width: 80 }}>
          {appContext.groups.length} groups
        </AppText>
      </Button>
      <Button
        type="clear"
        size="sm"
        onPress={() => {
          // @ts-ignore
          navigation.jumpTo('Friends')
        }}
        style={{ marginTop: 0, padding: 0 }}>
        <AppText style={{ width: 80 }}>
          {appContext.individuals.length} friends
        </AppText>
      </Button>
    </View>
  </Card>
}

