import { Component,OnInit } from '@angular/core';
import { LANGUAGETYPE } from './mock-data';
import { APPPAGE } from './page-app';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <h1>{{page.app_title}}</h1>
    <label>语言/Language</label>
      <select class="form-control" name="sel" 
        [(ngModel)]="selectedLanguage" 
        (ngModelChange)="updateLanguage($event)">
        <option disabled value="0" class="hideoption">中文/English</option>
        <option *ngFor="let language of languages" [ngValue]="language">
        {{language.name}}
      </option>
      </select>
    <div class="header-bar"></div>
    <nav>
      <a routerLink="/login" routerLinkActive="active">{{page.app_a1}}</a>
      <a routerLink="/myticket" routerLinkActive="active">{{page.app_a2}}</a>
      <a routerLink="/enter" routerLinkActive="active">{{page.app_a3}}</a>
      <a routerLink="/dashboard" routerLinkActive="active">{{page.app_a4}}</a>
      <a routerLink="/queue" routerLinkActive="active">{{page.app_a5}}</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit{
  page=APPPAGE.find(page=>page.id == 1);
  selectedLanguage:any=0;
  languages=LANGUAGETYPE;
  title = 'Walk In Center';

  ngOnInit(): void {
    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=APPPAGE.find(page=>page.id == languageid);
    }
  }


  updateLanguage(selectedLanguage:any): void {
    console.log(selectedLanguage);

    localStorage.setItem('wic_language', selectedLanguage.id);
    this.page=APPPAGE.find(page=>page.id == selectedLanguage.id);
    location.reload();
  }
    //jason test
    
   updateStatusType(selectedStatusType:any): void {
    console.log(selectedStatusType);
    localStorage.setItem('wic_status', selectedStatusType.id);
    this.status=APPPAGE.find(status=>status.id == selectedStatusType.id);
    location.reload();
  }
  
}
