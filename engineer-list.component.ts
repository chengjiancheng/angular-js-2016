import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DASHPAGE } from './page-dashboard';

// import { HeroSearchService } from './hero-search.service';
import { Engineer } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'engineer-list',
  templateUrl: 'engineer-list.component.html',
  styleUrls: ['engineer-list.component.css']
  // providers: [HeroSearchService]
})
export class EngineerListComponent implements OnInit {
  engineers:Engineer[];
  // heroes: Observable<Hero[]>;
  // private searchTerms = new Subject<string>();

  page=DASHPAGE.find(page=>page.id == 1);
  constructor(
    private heroService: HeroService,
    private router: Router) { }

  // search(term: string): void {
  //   // Push a search term into the observable stream.
  //   this.searchTerms.next(term);
  // }

  ngOnInit(): void {
    this.heroService.getEngineers()
      .then(engineers => this.engineers = engineers);

    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=DASHPAGE.find(page=>page.id == languageid);
    }
  }

  gotoDetail(engineer: Engineer): void {
    let link = ['/engineer', engineer.id];
    this.router.navigate(link);
  }
  
}
