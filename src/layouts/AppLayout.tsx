import { StyleSheet, View } from "react-native"

export const ROOT_FONT_SIZE = 14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: ROOT_FONT_SIZE
  }
})

export const AppLayout = ({ children }) => {
  return <View style={styles.container}>
    {children}
  </View>
}

