import { StyleSheet, View, Button } from 'react-native'
import {
  StatusBarContextActions,
  useStatusBarContext,
} from 'src/context/StatusBarContext'
import { useEffect } from 'react'
import { useAuthContext } from 'src/context/AuthContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export function LoginScreen() {
  const [_, authenticate] = useAuthContext()
  const [__, dispatchStatusbarOptions] = useStatusBarContext()

  useEffect(() => {
    // dispatchStatusbarOptions({
    //   type: StatusBarContextActions.HIDE_STATUS_BAR,
    // });
  }, [])

  const doLogin = () => {
    dispatchStatusbarOptions({
      type: StatusBarContextActions.SHOW_STATUS_BAR,
    })
    authenticate({ type: 'AUTHENTICATE' })
  }

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => doLogin()} />
    </View>
  )
}
