import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseData } from '../models/response.model';
import { environment } from 'src/environments/environment';

export class BaseService {
  constructor(public http: HttpClient) {}

  public get<T>(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .get(environment.api_url + url, { params, headers })
      .pipe(map((result: ResponseData<T>) => result.data as T));
  }

  public post<T>(url: string, data?: any, headers?: any): Observable<any> {
    return this.http
      .post(environment.api_url + url, data, { headers })
      .pipe(map(result => result));
  }

  public put<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .put(environment.api_url + url, data, { headers })
      .pipe(map(result => result as T));
  }

  public patch<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .patch(environment.api_url + url, data, { headers })
      .pipe(map(result => result as T));
  }

  public delete<T>(url: string, data: any, headers?: any): Observable<T> {
    return this.http
      .delete(environment.api_url + url, {
        headers,
        params: data
      })
      .pipe(map(result => result as T));
  }

  public getDetail<T>(
    url: string,
    id: string,
    nameParam: string,
    headers?: any
  ): Observable<T> {
    const httpParams = new HttpParams().set(nameParam, id);
    return this.http
      .get(environment.api_url + url, {
        headers,
        params: httpParams
      })
      .pipe(map(result => result as T));
  }

  public getImageArrayBuffer(url: string): Observable<any> {
    return this.http.get(environment.api_url + url, {
      responseType: 'arraybuffer'
    });
  }
}
