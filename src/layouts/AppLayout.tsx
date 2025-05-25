import { StyleSheet, View, SafeAreaView, Platform } from 'react-native'

export const ROOT_FONT_SIZE = 14

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // fontSize: ROOT_FONT_SIZE
  },
})

export const AppLayout = ({ children }) => {
  if (Platform.OS === 'ios') {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
  }

  return <View style={[styles.container, { marginTop: 25 }]}>{children}</View>
}
