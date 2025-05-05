import { Avatar, Icon } from "@rneui/themed";
import { ScrollView, View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { useAppContext } from "src/context/AppContext";
import { Group } from "src/data/types";
import { ROOT_FONT_SIZE } from "src/layouts/AppLayout";
import { getAvatarText } from "src/util/Util";

export function GroupList() {
  const [appCtx] = useAppContext();


  return <View style={{ width: '100%', flex: 1 }}>
    <ScrollView style={{ flex: 1, width: '100%' }}>
      <View style={{
        width: '100%',
        margin: 'auto',
        paddingLeft: 16,
        paddingRight: 16
      }}>

        {appCtx.groups.map((group: Group) => {
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
              key={group.sid}
              rounded
              title={getAvatarText(group.name)}
              titleStyle={{ mixBlendMode: 'difference' }}
              containerStyle={{ backgroundColor: '#000' }}
            />
            <View style={{
              marginRight: 10,
              marginLeft: 10,
              flex: 1
            }}>
              <AppText style={{
                textAlign: 'left',
                textDecorationLine: 'underline'
              }} onPress={() => alert('yooo')}>
                {group.name}
              </AppText>
              {/* <AppText style={{ */}
              {/*   textAlign: 'left', */}
              {/*   fontSize: ROOT_FONT_SIZE * 0.9 */}
              {/* }}> */}
              {/*   {new Date(activity.createdDate).getDay()} days ago */}
              {/* </AppText> */}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                type="font-awesome"
                name="inr"
                style={{ marginLeft: 15, marginTop: 0, marginBottom: 0, marginRight: 4 }}
              />
              <AppText>
                {group.individuals.length} individuals
              </AppText>
            </View>
          </View>
        })}
      </View>
    </ScrollView>
  </View>
}
