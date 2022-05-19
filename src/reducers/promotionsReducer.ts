import { IPromotions, PromotionsActionTypes, PromotionsAction } from '../actions/types';

interface PromotionsState {
  promotionsLoading: boolean;
  promotions: IPromotions[];
  promotionsError: null | string;
}

const defaultState: PromotionsState = {
  promotionsLoading: false,
  promotions: [],
  promotionsError: null
};

export const promotionsReducer = (state = defaultState, action: PromotionsAction): PromotionsState => {
  switch (action.type) {
    case PromotionsActionTypes.ADD_PROMOTIONS_STARTED:
      return { promotionsLoading: true, promotions: [], promotionsError: null };
    case PromotionsActionTypes.ADD_PROMOTIONS_SUCCESS:
      return { promotionsLoading: false, promotions: action.payload, promotionsError: null };
    case PromotionsActionTypes.ADD_PROMOTIONS_FAILURE:
      return { promotionsLoading: false, promotions: [], promotionsError: action.payload };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
