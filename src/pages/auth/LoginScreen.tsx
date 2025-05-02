import { useAuthContext } from "src/context/AuthContext";
import { StyleSheet, View } from 'react-native';
import { Button } from '@react-navigation/elements'
import { StatusBarContextActions, useStatusBarContext } from "src/context/StatusBarContext";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export function LoginScreen() {
  const [_, authenticate] = useAuthContext();
  const [__, dispatchStatusbarOptions] = useStatusBarContext();

  useEffect(() => {
    dispatchStatusbarOptions({ type: StatusBarContextActions.HIDE_STATUS_BAR });
  }, []);

  return (
    <View style={styles.container}>
      <Button onPressIn={() => authenticate({ type: "AUTHENTICATE" })}>Login</Button>
    </View>
  );
}

