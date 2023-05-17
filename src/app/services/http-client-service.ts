import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {
  }

  httpGet(path: string, query: string = ''): Observable<any> {
    return this.httpClient.get(path + '?' + query, this.httpHeaders)
      .pipe(
        catchError(err => {
            console.error(err);
          return err;
        })
      );
  }
}