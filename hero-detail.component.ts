import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { CATEGORIES } from './mock-data';
import { HERODETPAGE } from './page-herodetail';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  page=HERODETPAGE.find(page=>page.id == 1);

  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  categories=CATEGORIES;
  areas:any;
  subareas:any;
  selectedCategory:any=0;
  selectedArea:any=0;
  selectedSubArea:any=0;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=HERODETPAGE.find(page=>page.id == languageid);
      }

      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
            .then(hero => this.hero = hero);
      } else {
        this.navigated = false;
        this.hero = new Hero();
        this.hero.employee = JSON.parse(localStorage.getItem('id_token')).employee;
        this.hero.email = JSON.parse(localStorage.getItem('id_token')).email;
        this.hero.status = "{{page.heroDet_status}}";
        this.hero.statuscode = 0;
      }
    });

    
  }

  save(): void {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  updateCategory(selectedCategory:any):void {
      this.hero.categoryid=selectedCategory.id;
      this.hero.category=selectedCategory.name;
      this.areas=selectedCategory.areas
  }

  updateArea(selectedArea:any):void {
      this.hero.categoryid=selectedArea.id;
      this.hero.area=selectedArea.name;
      this.subareas=selectedArea.subareas
  }

  updateSubArea(selectedSubArea:any):void {
      this.hero.categoryid=selectedSubArea.id;
      this.hero.subarea=selectedSubArea.name;
  }

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}
