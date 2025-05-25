import { faker } from '@faker-js/faker'
import React, { Context, createContext, useContext, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useAuthContext } from 'src/context/AuthContext'
import {
  ActivitiesDispatch,
  Transaction,
  AppContextDispatchAction,
  AppContextDispatchTypes,
  TransationTypes,
  AppContextState,
  AppOverallsDispatch,
  Individual,
  IndividualDispatchPayload,
  OverallMonetaryStatus,
  TransactionDispatch,
  GroupDispatch,
  Group,
  IndividualDispatch,
} from 'src/data/types'
import { generateRandomId } from 'src/util/Util'
import { useImmerReducer } from 'use-immer'

export type AppContextValue = [
  AppContextState,
  (action: AppContextDispatchAction) => void,
]

export const mockUserPerson = new Individual(
  generateRandomId(),
  faker.person.fullName(),
  [],
  []
)

export const mockIndividuals: Array<Individual> = new Array(20).fill(0).map(
  () =>
    new Individual(
      generateRandomId(),
      faker.person.fullName(),
      // 'AAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAA',
      [],
      []
    )
)
mockIndividuals.unshift(mockUserPerson) as unknown as Array<Individual>

export const mockActivities: Array<Transaction> = new Array(20).fill(0).map(
  (_, index) =>
    ({
      sid: faker.string.uuid(),
      //TODO: to change to sid
      from: mockIndividuals[index].name,
      to: mockIndividuals[index].name,
      type: [TransationTypes.CREDIT, TransationTypes.DEBIT][
        Number(Math.random()).toFixed(0)
      ],
      amount: Number(faker.finance.amount({ min: 0, max: 5000 })),
      createdDate: faker.date.recent({ days: 4 }).toUTCString(),
    }) as Transaction
)

export const mockGroups: Array<Group> = new Array(5).fill(0).map(() => ({
  sid: faker.string.uuid(),
  name: faker.location.county(),
  individuals: mockIndividuals.slice(Number((Math.random() * 3).toFixed()), 5),
  activities: mockActivities.slice(Number((Math.random() * 3).toFixed()), 10),
}))

const initialData = (): AppContextState => ({
  overallStatus: OverallMonetaryStatus.NEUTRAL,
  overallMoney: null,
  totalBorrowed: null,
  totalLent: null,

  quickFilter: null,

  user: null,
  individuals: [],

  _activities: [],
  filteredActivities: [],
  groups: [],
})

const AppContext: Context<AppContextValue> =
  createContext<AppContextValue | null>(null)

export const useAppContext = (): AppContextValue => {
  const ctx = useContext(AppContext)

  if (!ctx)
    throw new Error('AppContext has been used outside AppContext.Provider')

  return ctx
}

export const ApplicationContext = ({ children }) => {
  const [authContext] = useAuthContext()

  const reducer = (
    draft: AppContextState,
    action: AppContextDispatchAction
  ) => {
    switch (action.type) {
      case AppContextDispatchTypes.LOAD_INDIVIDUALS:
        ;(action as IndividualDispatch).payload.forEach(
          (item: IndividualDispatchPayload) => {
            const individual = new Individual(
              item.individual.sid,
              item.individual.name,
              item.individual.activities,
              item.individual.groups
            )

            if (!item.destination) {
              if (item.individual.sid === authContext.auth.sid) {
                draft.user = individual
              } else {
                draft.individuals.push(individual)
              }
            }
          }
        )
        break
      case AppContextDispatchTypes.LOAD_ACTIVITIES:
        ;(action.payload as ActivitiesDispatch['payload'])
          .sort(
            (act1, act2) =>
              new Date(act1.createdDate).getTime() -
              new Date(act2.createdDate).getTime()
          )
          .forEach((activity: Transaction) => {
            draft._activities.push({ ...activity })
            if (
              !draft.quickFilter?.transactionType ||
              activity.type === draft.quickFilter.transactionType
            ) {
              draft.filteredActivities.push({ ...activity })
            }
          })
        break
      case AppContextDispatchTypes.LOAD_GROUPS:
        ;(action.payload as GroupDispatch['payload']).forEach(
          (group: Group) => {
            draft.groups.push({ ...group })
          }
        )
        break
      case AppContextDispatchTypes.SET_QUICKFILTER:
        draft.quickFilter = draft.quickFilter || {
          transactionType: null,
        }
        draft.quickFilter.transactionType =
          (action.payload as TransationTypes) ?? null

        draft.filteredActivities.splice(0, draft.filteredActivities.length)
        ;(!draft.quickFilter.transactionType
          ? draft._activities.concat()
          : draft._activities
              .filter(
                (activity: Transaction) =>
                  activity.type === draft.quickFilter?.transactionType
              )
              .concat()
        ).forEach((i) => draft.filteredActivities.push(i))
        break
      case AppContextDispatchTypes.CREDIT:
        draft.individuals
          .find(
            (i) =>
              i.sid === (action.payload as TransactionDispatch['payload']).from
          )
          .activities.unshift({
            sid: generateRandomId(),
            createdDate: new Date().toUTCString(),
            ...(action.payload as TransactionDispatch['payload']),
          })
        break
      case AppContextDispatchTypes.DEBIT:
        draft.individuals
          .find(
            (i) =>
              i.sid === (action.payload as TransactionDispatch['payload']).from
          )
          .activities.unshift({
            sid: generateRandomId(),
            createdDate: new Date().toUTCString(),
            ...(action.payload as TransactionDispatch['payload']),
          })
        break
      case AppContextDispatchTypes.SET_OVERALLS:
        const _payload = action.payload as AppOverallsDispatch['payload']
        draft.overallStatus = _payload.overallStatus
        draft.overallMoney = _payload.overallMoney
        draft.totalLent = _payload.totalLent
        draft.totalBorrowed = _payload.totalBorrowed
        break
    }
    return draft
  }

  const [state, dispatch] = useImmerReducer(reducer, initialData())

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: AppContextDispatchTypes.SET_OVERALLS,
        payload: {
          overallStatus: [
            OverallMonetaryStatus.LEND,
            OverallMonetaryStatus.BORROW,
            OverallMonetaryStatus.NEUTRAL,
          ][Number((Math.random() * 2).toFixed(0))],
          overallMoney: Number(faker.finance.amount({ min: 0, max: 10000 })),
          totalBorrowed: Number(faker.finance.amount({ min: 0, max: 20000 })),
          totalLent: Number(faker.finance.amount({ min: 0, max: 10000 })),
        },
      })
      dispatch({
        type: AppContextDispatchTypes.LOAD_INDIVIDUALS,
        payload: mockIndividuals.map((user: Individual) => ({
          individual: user,
          destination: null,
        })),
      })
      dispatch({
        type: AppContextDispatchTypes.LOAD_ACTIVITIES,
        payload: mockActivities,
      })
      dispatch({
        type: AppContextDispatchTypes.LOAD_GROUPS,
        payload: mockGroups,
      })
    }, 1000)
  }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {!state.user ? (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={{ flex: 1 }} />
        </View>
      ) : (
        children
      )}
    </AppContext.Provider>
  )
}
