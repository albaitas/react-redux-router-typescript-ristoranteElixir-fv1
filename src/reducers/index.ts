import { combineReducers } from 'redux';
import { dishesReducer } from './dishesReducer';
import { leadersReducer } from './leadersReducer';
import { promotionsReducer } from './promotionsReducer';
import { commentsReducer } from './commentsReducer';

export const rootReducer = combineReducers({
  dishesReducer,
  leadersReducer,
  promotionsReducer,
  commentsReducer
});
export type RootState = ReturnType<typeof rootReducer>;
