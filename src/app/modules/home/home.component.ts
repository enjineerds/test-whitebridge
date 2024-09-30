import {
  Component,
  ElementRef,
  inject,
  NO_ERRORS_SCHEMA,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { HomePageActions } from '@store/actions';

import { CommonModule } from '@angular/common';
import {
  selectFaceResult,
  selectFaceResultError,
  selectFaceResultLoading,
  selectPhoto,
} from '@store/selectors/home.selectors';
import { selectPastResults } from '@store/selectors/history.selectors';
import { UploadImageModel } from '@home/data-access';
import { FaceDetectDirective } from '@home/directives';
import { FileUploadComponent } from './ui';
import { ToastComponent } from 'app/shared/ui/toast/toast.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadComponent,
    ToastComponent,
    FaceDetectDirective,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('.image-preview') imageContainer!: ElementRef;

  readonly store = inject(Store);

  selectedImage$ = this.store.select(selectPhoto);
  result$ = this.store.select(selectFaceResult);
  error$ = this.store.select(selectFaceResultError);
  loading$ = this.store.select(selectFaceResultLoading);
  pastResults$ = this.store.select(selectPastResults);

  handleFileChange(data: UploadImageModel) {
    this.store.dispatch(HomePageActions.choosePhoto({ data }));
  }

  analyze(data: UploadImageModel | null) {
    if (!data) return;
    this.store.dispatch(HomePageActions.detect({ data }));
  }

  setError(message: string) {
    this.store.dispatch(HomePageActions.setError({ message }));
  }

  resetError() {
    this.store.dispatch(HomePageActions.resetError());
  }
}
