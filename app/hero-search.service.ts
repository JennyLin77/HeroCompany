/**
 * HeroSearchService服务
 * 它会把搜索请求发送到我们服务器上的Web API
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

	constructor(private http: Http) {}

	/**
	 * 搜索功能
	 * 这次不再调用toPromise，而是直接返回可观察对象
	 * @param  {string}             term [description]
	 * @return {Observable<Hero[]>}      [description]
	 */
	search(term: string): Observable<Hero[]> {
		return this.http.get(`app/heroes/?name=${term}`)
			.map((r: Response) => r.json().data as Hero[]);
	}
}