import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FaceDetectionModel } from '@home/data-access';
import { Store } from '@ngrx/store';
import { HomePageActions } from '@store/actions';
import { selectPastResults } from '@store/selectors/history.selectors';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  readonly store = inject(Store);
  pastResults$ = this.store.select(selectPastResults);

  selectPastResult(item: FaceDetectionModel) {
    this.store.dispatch(HomePageActions.loadOne({ data: item }));
  }
}
