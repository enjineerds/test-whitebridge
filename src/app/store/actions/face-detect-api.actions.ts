import { FaceDetectionModel } from '@home/data-access';
import { createActionGroup, props } from '@ngrx/store';

export const FaceDetectApiActions = createActionGroup({
  source: 'Face Detect API',
  events: {
    handleSuccess: props<FaceDetectionModel | null>(),
    handleFailure: props<{ errorMessage: string }>(),
  },
});
