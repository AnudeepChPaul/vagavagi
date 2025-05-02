import { Card } from "@rneui/themed";
import { View } from "react-native";
import { AppText } from "src/atoms/AppText";
import { AppLayout } from "src/layouts/AppLayout";

const WelcomeCard = () => {
  return <Card containerStyle={{ width: '94%', height: 190, margin: 'auto', marginTop: 15 }}>
    <Card.Title h4 style={{ textAlign: 'left' }}>Anudeep Chandra Paul</Card.Title>
    <Card.Divider style={{ marginBottom: 0 }} />
    <View style={{
      position: "relative",
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 10,
      marginTop: 0,
      marginBottom: 0,
      height: 60
    }}>
      <AppText>You've borrowed INR
        <AppText style={{ fontWeight: 800, fontStyle: 'italic' }}>
          2000
        </AppText>
      </AppText>
      <AppText>You've lent INR
        <AppText style={{ fontWeight: 800, fontStyle: 'italic' }}>
          5000
        </AppText>
      </AppText>
    </View>
    <Card.Divider />
    <View style={{
      position: "relative",
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: 0,
      padding: 10,
      marginTop: 0,
      height: 50
    }}>
      <AppText>You're part of 5 groups </AppText>
      <AppText>You've 21 friends </AppText>
    </View>
  </Card>
}


export function OverviewSummaryScreen() {
  return (
    <AppLayout>
      <WelcomeCard />
    </AppLayout>
  );
}

