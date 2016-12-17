import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

	private heroesUrl = 'app/heroes';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) { }

	getHeroes(): Promise<Hero[]> {
		return this.http.get(this.heroesUrl)
			.toPromise()
			.then(response => response.json().data as Hero[])
			.catch(this.handleError);
	}

	/*getHeroesSlowly(): Promise<Hero[]> {
		return new Promise<Hero[]>(resolve =>
			setTimeout(resolve, 3000))    // delay 3 seconds
			.then(() => this.getHeroes());
	}*/

	getHero(id: number): Promise<Hero> {
		return this.getHeroes()
			.then(heroes => heroes.find(hero => hero.id === id));
	}

	/**
	 * 使用HTTP的put方法来把修改持久化到服务端
	 * 通过一个编码在URL中的英雄id来告诉服务器应该更新哪个英雄。
	 * put的body是该英雄的JSON字符串，它是通过调用JSON.stringify得到的
	 * 并且在请求头中标记出的body的内容类型(application/json)
	 * @param  {Hero}          hero [description]
	 * @return {Promise<Hero>}      [description]
	 */
	update(hero: Hero): Promise<Hero> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
			.toPromise()
			.then(() => hero)
			.catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handleError);
	}

	/**
	 * hero服务的delete方法使用HTTP的delete方法来从服务器移除该英雄
	 * @param  {number}        id [description]
	 * @return {Promise<void>}    [description]
	 */
	delete(id: number): Promise<void> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred',error);  // for demo puposes only
		return Promise.reject(error.message || error);
	}
}