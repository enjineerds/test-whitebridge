import { FaceDetectionModel } from '@home/data-access';
import { createReducer, on } from '@ngrx/store';
import { FaceDetectApiActions, HomePageActions } from '@store/actions';
import { UploadImageModel } from 'app/modules/home/data-access/models/upload-image.model';

export interface HomeState {
  photo: UploadImageModel | null;
  result: FaceDetectionModel | null;
  error: string | null;
  isLoading: boolean;
}
const initialState: HomeState = {
  photo: null,
  result: null,
  error: null,
  isLoading: false,
};

export const homeReducer = createReducer(
  initialState,
  on(HomePageActions.choosePhoto, (state, { data }) => ({
    ...state,
    photo: data,
    result: null,
  })),
  on(HomePageActions.loadOne, (state, { data }) => ({
    ...state,
    result: data,
  })),
  on(HomePageActions.detect, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(HomePageActions.resetError, (state) => ({
    ...state,
    error: null,
  })),
  on(HomePageActions.setError, (state, { message }) => ({
    ...state,
    error: message,
  })),
  on(FaceDetectApiActions.handleSuccess, (state, result) => ({
    ...state,
    result,
    isLoading: false,
  })),
  on(FaceDetectApiActions.handleFailure, (state, { errorMessage }) => ({
    ...state,
    result: null,
    error: errorMessage,
    isLoading: false,
  }))
);
