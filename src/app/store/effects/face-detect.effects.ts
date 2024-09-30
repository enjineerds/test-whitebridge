import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

import { FaceDetectApiActions, HomePageActions } from '@store/actions';
import { FaceDetectionService } from '@home/data-access';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FaceDetectEffects {
  private readonly actions$ = inject(Actions);
  private readonly faceDetectionService = inject(FaceDetectionService);

  detect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePageActions.detect),
      exhaustMap((action) =>
        this.faceDetectionService.detect(action.data.base64).pipe(
          map((response: any) =>
            FaceDetectApiActions.handleSuccess({
              image: action.data,
              rectangle: response.rectangle,
              confidence: response.confidence,
              age: response.age,
              gender: response.gender,
            })
          ),
          catchError((error) => {
            let errorMessage =
              typeof error === 'string' ? error : error.message;

            if (error instanceof HttpErrorResponse && error.status === 500) {
              errorMessage =
                "We're unable to process your request at the moment.";
            }

            return of(FaceDetectApiActions.handleFailure({ errorMessage }));
          })
        )
      )
    )
  );
}
