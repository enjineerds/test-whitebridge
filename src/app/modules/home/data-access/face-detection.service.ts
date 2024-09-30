import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaceDetectionService {
  private readonly http = inject(HttpClient);

  detect(base64: string) {
    const url = 'api/detect';
    const params = { sourceUrl: base64 };
    return this.http.post(url, params).pipe(
      map((data: any) => {
        if (data.results.length == 0) {
          throw new Error("Hmmm, we didn't recognize any face. Try again");
        }

        if (data.results.length > 1) {
          throw new Error(
            'Hey, seems like you uploaded a group picture, or not 👻?'
          );
        }

        return data.results[0];
      })
    );
  }
}
