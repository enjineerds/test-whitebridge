import { FaceDetectionModel } from '@home/data-access';
import { createReducer, on } from '@ngrx/store';
import { FaceDetectApiActions } from '@store/actions';

export interface HistoryState {
  pastResults: FaceDetectionModel[];
}
const initialState: HistoryState = {
  pastResults: [],
};

export const historyReducer = createReducer(
  initialState,
  on(FaceDetectApiActions.handleSuccess, (state, result) => {
    const matchIndex = state.pastResults.findIndex(
      (item) => item.image.name === result.image.name
    );

    if (matchIndex >= 0) return { ...state };

    return {
      ...state,
      pastResults: [...state.pastResults, result],
    };
  })
);
