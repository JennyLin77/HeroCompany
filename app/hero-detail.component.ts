import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	moduleId: module.id,
	selector: 'my-hero-detail',
	templateUrl: 'hero-detail.component.html',
	styleUrls: [ 'hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
	hero: Hero;

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.heroService.getHero(+params['id']))  //英雄的id是数字，而路由参数的值总是字符串，故需要通过JS的(+)操作符把路由参数的值转成数字
			.subscribe(hero => this.hero = hero);
	}

	goBack(): void {
		this.location.back();
	}
}