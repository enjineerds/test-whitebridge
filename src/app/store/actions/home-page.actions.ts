import { FaceDetectionModel } from '@home/data-access';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UploadImageModel } from 'app/modules/home/data-access/models/upload-image.model';

export const HomePageActions = createActionGroup({
  source: 'Home Page',
  events: {
    choosePhoto: props<{ data: UploadImageModel | null }>(),
    detect: props<{ data: UploadImageModel }>(),
    loadOne: props<{ data: FaceDetectionModel }>(),
    resetError: emptyProps(),
    setError: props<{ message: string }>(),
  },
});
