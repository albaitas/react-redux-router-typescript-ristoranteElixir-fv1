import { ILeaders, LeadersActionTypes, LeadersAction } from '../actions/types';

interface LeadersState {
  leadersLoading: boolean;
  leaders: ILeaders[];
  leadersError: null | string;
}

const defaultState: LeadersState = {
  leadersLoading: false,
  leaders: [],
  leadersError: null
};

export const leadersReducer = (state = defaultState, action: LeadersAction): LeadersState => {
  switch (action.type) {
    case LeadersActionTypes.ADD_LEADERS_STARTED:
      return { leadersLoading: true, leaders: [], leadersError: null };
    case LeadersActionTypes.ADD_LEADERS_SUCCESS:
      return { leadersLoading: false, leaders: action.payload, leadersError: null };
    case LeadersActionTypes.ADD_LEADERS_FAILURE:
      return { leadersLoading: false, leaders: [], leadersError: action.payload };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
