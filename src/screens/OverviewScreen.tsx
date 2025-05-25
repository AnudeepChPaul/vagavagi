import { useEffect } from 'react'
import { Button, View } from 'react-native'
import { AppText } from 'src/atoms/AppText'
import { useAppContext } from 'src/context/AppContext'
import { AppLayout } from 'src/layouts/AppLayout'
import { ExpenditureList } from 'src/organisms/ExpenditureList'
import { OverallStatusDisplay } from 'src/organisms/OverallStatusDisplay'
import { WelcomeCard } from 'src/organisms/WelcomeCard'
import { HomeTabScreenProps } from 'src/pages/navigation.types'

export function OverviewSummaryScreen(props: HomeTabScreenProps<'Overview'>) {
  const [appCtx] = useAppContext()

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Button
            onPress={() => props.navigation.navigate('Add')}
            title="Add"
          />
        </View>
      ),
    })
  }, [])

  return (
    <AppLayout>
      <OverallStatusDisplay />
      <WelcomeCard />
      <ExpenditureList list={appCtx._activities.slice(0, 5)} footer={
        <AppText
          style={{
            padding: 12,
            textAlign: 'center',
            borderBottomColor: '#a0a0a0',
          }}
          onPress={() => {
            // @ts-ignore
            navigation.push('Activities')
          }}
        >
          Showing only top 5 activities.
        </AppText>
      }/>
      </AppLayout>
  )
}
