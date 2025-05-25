import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export type HomeStackedNavParamsList = {
  Add: undefined
  Activities: undefined
  Home: undefined
}

export type BottomTabNavigationParamList = {
  Overview: undefined
  Groups: undefined
  Buddies: undefined
}

export type GroupNavigationParamList = {
  GroupList: undefined
  GroupView: {
    sid: string
  }
}

export type BuddyNavigationParamList = {
  BuddyList: undefined
  BuddyView: {
    sid: string
  }
}

export type RootScreenProps<T extends keyof HomeStackedNavParamsList> =
  NativeStackScreenProps<HomeStackedNavParamsList, T>

export type BottomScreenProps<T extends keyof BottomTabNavigationParamList> =
  BottomTabScreenProps<BottomTabNavigationParamList, T>

export type GroupsScreenProps<T extends keyof GroupNavigationParamList> =
  NativeStackScreenProps<GroupNavigationParamList, T>

export type BuddiesScreenProps<T extends keyof BuddyNavigationParamList> =
  NativeStackScreenProps<BuddyNavigationParamList, T>

export type HomeTabScreenProps<T extends keyof BottomTabNavigationParamList> =
  CompositeScreenProps<
    RootScreenProps<keyof HomeStackedNavParamsList>,
    CompositeScreenProps<
      BottomTabScreenProps<BottomTabNavigationParamList, T>,
      CompositeScreenProps<
        NativeStackScreenProps<GroupNavigationParamList>,
        NativeStackScreenProps<BuddyNavigationParamList>
      >
    >
  >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackedNavParamsList {}
  }
}
