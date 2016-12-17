import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	moduleId: module.id,
  	selector: 'my-heroes',
  	templateUrl: 'heroes.component.html',
  	styleUrls: [ 'heroes.component.css' ]
})

export class HeroesComponent implements OnInit {
	heroes : Hero[];
	selectedHero: Hero;

	constructor(
		private heroService: HeroService,
		private router: Router){}

	getHeroes(): void {
		this.heroService.getHeroes()
			.then(heroes => this.heroes = heroes);
		//this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
	}

	ngOnInit(): void {
		this.getHeroes();
	}
	
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetail(): void {
		this.router.navigate(['/detail', this.selectedHero.id]);
	}

	/**
	 * 当指定的名字不为空时，点击处理器就会委托hero服务来创建一个具有此名字的英雄，并把这个新英雄添加到我们的数组中
	 * @param {string} name [description]
	 */
	add(name: string): void {
		name = name.trim();
		if(!name) { return; }

		this.heroService.create(name)
			.then(hero => {
				this.heroes.push(hero);
				this.selectedHero = null;
			});
	}

	/**
	 * 仍把删除英雄的操作委托给hero服务，组件仍负责更新显示
	 * 组件的工作：它从数组中移除了被删除的英雄（利用filter方法）
	 * 如果删除的是选中的英雄，还要清空选择
	 * @param {Hero} hero [description]
	 */
	delete(hero: Hero): void {
		this.heroService.delete(hero.id)
			.then(() => {
				this.heroes = this.heroes.filter(h => h !== hero);
				if(this.selectedHero === hero) { this.selectedHero = null; }
			});
	}
}
