import React, { PropsWithChildren, ReactNode } from "react"
import { StyleSheet, View } from "react-native"

const styles = StyleSheet.create({
  pill: {
    margin: 'auto',
    marginTop: 0,
    marginBottom: 9,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  }
})

export const AppPill = ({ children }) => (
  <View style={styles.pill}>
    {children}
  </View>
);
