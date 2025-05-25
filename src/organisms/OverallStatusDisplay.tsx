import { Icon, Text } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import { AppContextValue, useAppContext } from 'src/context/AppContext'
import { OverallMonetaryStatus } from 'src/data/types'
import { ROOT_FONT_SIZE } from 'src/layouts/AppLayout'

type StatusText = {
  amount: number
}

const styles = StyleSheet.create({
  container: {
    width: '96%',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: ROOT_FONT_SIZE * 1.2,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 2,
    marginRight: 8,
  },
  bold: {
    fontSize: ROOT_FONT_SIZE * 1.2,
    fontWeight: 800,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 2,
    marginRight: 2,
  },
})

const CreditText: React.FC<StatusText> = (props: StatusText) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { color: 'mediumseagreen' }]}>
        Overall, you've given credit of
      </Text>
      <Icon
        type="font-awesome"
        name="inr"
        style={{ marginRight: 3 }}
        color="mediumseagreen"
      />
      <Text style={[styles.text, styles.bold, { color: 'mediumseagreen' }]}>
        {props.amount}
      </Text>
    </View>
  )
}

const DebitText: React.FC<StatusText> = (props: StatusText) => {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, { color: 'tomato' }]}>
        Overall, you're in debt of
      </Text>
      <Icon
        type="font-awesome"
        name="inr"
        style={{ marginRight: 3 }}
        color="tomato"
      />
      <Text style={[styles.text, styles.bold, { color: 'tomato' }]}>
        {props.amount}
      </Text>
    </View>
  )
}

const NeutralText: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: 'royalblue' }]}>
        All set! You neither lent nor in debt.
      </Text>
    </View>
  )
}

export const OverallStatusDisplay = () => {
  const [appCtx] = useAppContext() as AppContextValue

  const getStatusText = () => {
    switch (appCtx.overallStatus) {
      case OverallMonetaryStatus.LEND:
        return <CreditText amount={appCtx.overallMoney} />
      case OverallMonetaryStatus.BORROW:
        return <DebitText amount={appCtx.overallMoney} />
      default:
        return <NeutralText />
    }
  }

  return getStatusText()
}
