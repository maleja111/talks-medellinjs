import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SpeakerService {

  constructor(private http: Http) {

  }

  // saveSpeaker(): Observable<any> {
  //   // const headers = new Headers()
  //   const options = '';
  //   return this.http.post('http://localhost:8081/talks', options)
  //     .map( (res: Response) => {
  //       console.log(res.json());
  //       return res.json();
  //     })
  //     .catch(this.handleError);
  // }

  saveSpeaker(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/speakers', data)
      .map( (res: Response) => {
        console.log('saveSpeakers', res.json());
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log('handleError', errMsg);
    return Observable.throw(errMsg);
  }
}
