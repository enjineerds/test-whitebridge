import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HistoryState } from '@store/reducers';

const featureKey = 'history';
const selectFeature = createFeatureSelector<Readonly<HistoryState>>(featureKey);

export const selectPastResults = createSelector(
  selectFeature,
  (state: HistoryState) => state.pastResults
);
