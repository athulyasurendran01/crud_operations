import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

let todos = [
  { _id: 1, title: 'Install Angular CLI', isDone: true },
  { _id: 2, title: 'Style app', isDone: true },
  { _id: 3, title: 'Finish service functionality', isDone: false },
  { _id: 4,  title: 'Setup API', isDone: false },
];
@Injectable()
export class TodoService {

		private serverURL = 'http://18.222.191.7/';

		constructor(private http: HttpClient) { }
		

		apiTokenRequestGet(url): Observable<any> {
			let appurl = this.serverURL+url ;
			return this.http.get(appurl);
		}

		apiTokenRequestPost(url, data): Observable<any> {
			let appurl = this.serverURL+url ;
			return this.http.post(appurl, data);
		}

		apiTokenRequestPut(url, data): Observable<any> {
			let appurl = this.serverURL+url ;
			return this.http.put(appurl, data);
		}
		
		apiTokenRequestDelete(url, id): Observable<any> {
			let appurl = this.serverURL+url ;
			return this.http.delete(appurl, id);
		}
}