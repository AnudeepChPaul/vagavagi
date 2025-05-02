import { useAuthContext } from "src/context/AuthContext";
import { StyleSheet, View, Button } from 'react-native';
import { StatusBarContextActions, useStatusBarContext } from "src/context/StatusBarContext";
import { useEffect } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});

export function LoginScreen() {
  const [_, authenticate] = useAuthContext();
  const [__, dispatchStatusbarOptions] = useStatusBarContext();

  useEffect(() => {
    dispatchStatusbarOptions({
      type: StatusBarContextActions.SHOW_STATUS_BAR,
      payload: true
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => authenticate({ type: "AUTHENTICATE" })} />
    </View>
  );
}

