import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Hero,Engineer } from './hero';
import { HeroService } from './hero.service';
import { STATUSTYPE } from './mock-data';
import { STATUSTYPE2 } from './mock-data';
import { INCIDENTPAGE } from './page-incident';

@Component({
  moduleId: module.id,
  selector: 'my-incident',
  templateUrl: 'incident.component.html',
  styleUrls: ['incident.component.css']
})
export class IncidentComponent implements OnInit {
  page = INCIDENTPAGE.find(page=>page.id == 1);
  statusType = STATUSTYPE.find(statusType=>statusType.id == 1);


  @Input() hero: Hero;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  engineers:Engineer[];
  selectedAssignee :any = 0;
  selectedStatus :any = 0;
  //statustype = STATUSTYPE;
  //stautstype = STATUSTYPE2;   
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=INCIDENTPAGE.find(page=>page.id == languageid);
    }

    if(localStorage.getItem('wic_statusType') ){
      let statusTypeid=localStorage.getItem('wic_statusType');
      this.statusType=STATUSTYPE.find(statusType=>statusType.id == statusTypeid);
    }

    this.route.params.forEach((params: Params) => {
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
        this.hero.status = 'new';
        this.hero.statuscode = 0;
      }
    });

    this.heroService.getEngineers()
      .then(engineers => this.engineers = engineers);

  }

  updateAssignee(selectedAssignee:Engineer):void {
      this.hero.assigneeid=selectedAssignee.id;
      this.hero.assignee=selectedAssignee.name;
  }

  updateStatus(selectedStatus:any):void {
      this.hero.status=selectedStatus.status;
      this.hero.statuscode=selectedStatus.statuscode;
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

  goBack(savedHero: Hero = null): void {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
}
