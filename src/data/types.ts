
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
  LOAD_GROUPS = 'LOAD_GROUPS',
  SET_OVERALLS = 'SET_OVERALLS',
  SET_QUICKFILTER = 'SET_QUICKFILTER',
}

export enum TransationTypes {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export type Group = {
  sid: string;
  name: string;
  individuals: Array<Individual>
  activities: Array<Transaction>
}

export class Individual {
  sid: string = '';
  name: string = '';
  activities: Array<Transaction> = [];
  groups: Array<Group> = [];

  constructor(
    sid: string,
    name: string,
    activities: Array<Transaction> = [],
    groups: Array<Group> = []
  ) {
    this.sid = sid;
    this.name = name;
    this.groups = groups;
    this.activities = activities;
  }
}

export type Transaction = {
  sid: string;
  from: string;
  to: string;
  type: TransationTypes;
  amount: number;
  createdDate: string;
}

export type AppContextState = {
  user: Individual | null,
  overallStatus: OverallMonetaryStatus;
  overallMoney: number | null;
  totalBorrowed: number | null;
  totalLent: number | null;
  quickFilter: {
    transactionType: TransationTypes | null
  },
  // TODO: convert to map instead sid, Individual
  individuals: Array<Individual>;
  // TODO: convert to map instead sid, Group
  groups: Array<Group>;
  // TODO: convert to map instead sid, AppActivity
  _activities: Array<Transaction>;
  filteredActivities: Array<Transaction>;
}

export type TransactionDispatch = {
  type: AppContextDispatchTypes,
  payload: Pick<Transaction, "amount" | "from" | "to" | "type">
}

export type IndividualDispatchPayload = { individual: Individual, destination: null | string }

export type IndividualDispatch = {
  type: AppContextDispatchTypes.LOAD_INDIVIDUALS,
  payload: Array<IndividualDispatchPayload>
}

export type GroupDispatch = {
  type: AppContextDispatchTypes.LOAD_GROUPS,
  payload: Array<Group>
}

export type ActivitiesDispatch = {
  type: AppContextDispatchTypes.LOAD_ACTIVITIES,
  payload: Array<Transaction>
}

export type QuickFilterDispatch = {
  type: AppContextDispatchTypes.SET_QUICKFILTER,
  payload: TransationTypes
}

export type AppOverallsDispatch = {
  type: AppContextDispatchTypes.SET_OVERALLS,
  payload: Pick<AppContextState,
    | 'totalLent'
    | 'totalBorrowed'
    | 'overallStatus'
    | 'overallMoney'>
}

export type AppContextDispatchAction =
  | TransactionDispatch
  | IndividualDispatch
  | ActivitiesDispatch
  | GroupDispatch
  | AppOverallsDispatch
  | QuickFilterDispatch;


