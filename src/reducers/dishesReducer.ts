import { IDishes, DishesActionTypes, DishesAction } from '../actions/types';

interface DishesState {
  dishesLoading: boolean;
  dishes: IDishes[];
  dishesError: null | string;
}

const defaultState: DishesState = {
  dishesLoading: false,
  dishes: [],
  dishesError: null
};

export const dishesReducer = (state = defaultState, action: DishesAction): DishesState => {
  switch (action.type) {
    case DishesActionTypes.ADD_DISHES_STARTED:
      return { dishesLoading: true, dishes: [], dishesError: null };
    case DishesActionTypes.ADD_DISHES_SUCCESS:
      return { dishesLoading: false, dishes: action.payload, dishesError: null };
    case DishesActionTypes.ADD_DISHES_FAILURE:
      return { dishesLoading: false, dishes: [], dishesError: action.payload };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
