
export enum OverallMonetaryStatus {
  BORROW = 'BORROW',
  LEND = 'LEND',
  NEUTRAL = 'NEUTRAL'
}

export enum AppContextDispatchTypes {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  LOAD_INDIVIDUALS = 'LOAD_INDIVIDUALS',
  LOAD_ACTIVITIES = 'LOAD_ACTIVITIES',
  SET_OVERALLS = 'SET_OVERALLS'
}

export type Group = {
  sid: string;
  name: string;
  individuals: Array<Individual>
  activities: Array<AppActivity>
}

export class Individual {
  sid: string = '';
  name: string = '';
  activities: Array<AppActivity> = [];
  groups: Array<Group> = [];

  constructor(
    sid: string,
    name: string,
    activities: Array<AppActivity> = [],
    groups: Array<Group> = []
  ) {
    this.sid = sid;
    this.name = name;
    this.groups = groups;
    this.activities = activities;
  }
}

export type AppActivity = {
  sid: string;
  from: string;
  to: string;
  type: AppContextDispatchTypes;
  amount: number;
  createdDate: string;
}

export type AppContextState = {
  user: Individual | null,
  overallStatus: OverallMonetaryStatus;
  overallMoney: number | null;
  totalBorrowed: number | null;
  totalLent: number | null;
  // TODO: convert to map instead sid, Individual
  individuals: Array<Individual>;
  // TODO: convert to map instead sid, Group
  groups: Array<Group>;
  // TODO: convert to map instead sid, AppActivity
  activities: Array<AppActivity>;
}

export type TransactionDispatch = {
  type: AppContextDispatchTypes,
  payload: Pick<AppActivity, "amount" | "from" | "to" | "type">
}

export type IndividualDispatchPayload = { individual: Individual, destination: null | string }

export type UserGroupDispatch = {
  type: AppContextDispatchTypes,
  payload: Array<IndividualDispatchPayload>
}

export type ActivitiesDispatch = {
  type: AppContextDispatchTypes,
  payload: Array<AppActivity>
}


export type AppOverallsDispatch = {
  type: AppContextDispatchTypes,
  payload: Pick<AppContextState,
    | 'totalLent'
    | 'totalBorrowed'
    | 'overallStatus'
    | 'overallMoney'>
}

export type AppContextDispatchAction =
  | TransactionDispatch
  | UserGroupDispatch
  | ActivitiesDispatch
  | AppOverallsDispatch;


