import { historyReducer } from './history.reducers';
import { homeReducer } from './home.reducers';

export const appReducers = {
  home: homeReducer,
  history: historyReducer,
};

export * from './history.reducers';
export * from './home.reducers';
