import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TalkService {

  constructor(private http: Http) {

  }

  getTalks(): Observable<any> {
    return this.http.get('http://localhost:8081/talks')
      .map( (res: Response) => {
        console.log('getTalks', res.json());
        return res.json();
      })
      .catch(this.handleError);
  }

  saveTalk(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/talks', data)
      .map( (res: Response) => {
        console.log('saveTalk', res.json());
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
