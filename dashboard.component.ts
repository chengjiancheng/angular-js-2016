import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { DASHPAGE } from './page-dashboard';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page=DASHPAGE.find(page=>page.id == 1);

  heroes: Hero[] = [];
  workingheroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }
 
  ngOnInit(): void {
     if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=DASHPAGE.find(page=>page.id == languageid);
    }
    
    this.heroService.getHeroes()
      // .then(heroes => this.heroes = heroes.slice(0, 6));
      .then(heroes => 
        {this.heroes = heroes.filter(hero => hero.statuscode ==0 ).slice(0, 6);
          this.workingheroes = heroes.filter(hero => hero.statuscode > 0 && hero.statuscode < 4);}
        );
  }

  gotoDetail(hero: Hero): void {
    let link = ['/incident', hero.id];
    this.router.navigate(link);
  }
}
