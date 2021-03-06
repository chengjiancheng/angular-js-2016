import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { QUEUEPAGE } from './page-queue';

@Component({
  moduleId: module.id,
  selector: 'my-queue',
  templateUrl: 'queue.component.html',
  styleUrls: ['queue.component.css']
})
export class QueueComponent implements OnInit {
  page=QUEUEPAGE.find(page=>page.id == 1);
  
  heroes: Hero[];
  selectedHero: Hero;
  addingHero = false;
  latestid = 18;
  error: any;

  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .then(heroes => this.heroes = heroes)
      .catch(error => this.error = error);
  }

  addHero(): void {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero): void {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }

  deleteHero(hero: Hero, event: any): void {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getHeroes();

    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=QUEUEPAGE.find(page=>page.id == languageid);
    }
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.addingHero = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/incident', this.selectedHero.id]);
  }
}
