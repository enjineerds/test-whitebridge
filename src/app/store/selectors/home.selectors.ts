import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeState } from '@store/reducers/home.reducers';

const featureKey = 'home';

const selectFeature = createFeatureSelector<Readonly<HomeState>>(featureKey);

export const selectFaceResult = createSelector(
  selectFeature,
  (state: HomeState) => state.result
);

export const selectPhoto = createSelector(
  selectFeature,
  (state: HomeState) => state.photo
);

export const selectFaceResultError = createSelector(
  selectFeature,
  (state: HomeState) => state.error
);

export const selectFaceResultLoading = createSelector(
  selectFeature,
  (state: HomeState) => state.isLoading
);
