import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Engineer } from './hero';
import { HeroService } from './hero.service';
import { ENTERPAGE } from './page-enter';
// import { contentHeaders } from '../common/headers';

@Component({
  selector: 'enter',
  templateUrl: 'app/enter.component.html',
  styleUrls: [ 'app/enter.component.css' ]
})
export class EnterComponent implements OnInit {
  page=ENTERPAGE.find(page=>page.id == 1);

  engineer: Engineer;
  error: any;
  
  constructor(private heroService: HeroService,public router: Router, public http: Http) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('wic_language') ){
      let languageid=localStorage.getItem('wic_language');
      this.page=ENTERPAGE.find(page=>page.id == languageid);
    }
  }

  enter(event: any,city:string, building:string, name:string, password:string) {
    event.preventDefault();
    let body = JSON.stringify({ name, password,city,building });
    localStorage.setItem('engineer_token', body);
    console.log(localStorage.getItem('engineer_token'));
    this.engineer = new Engineer();
    console.log(this.engineer);
    this.engineer.name = JSON.parse(localStorage.getItem('engineer_token')).name;
    this.engineer.password = JSON.parse(localStorage.getItem('engineer_token')).password;
    this.engineer.city = JSON.parse(localStorage.getItem('engineer_token')).city;
    this.engineer.building = JSON.parse(localStorage.getItem('engineer_token')).building;

    this.router.navigate(['dashboard']);
    this.heroService
        .saveEngineer(this.engineer)
        .then(engineer => {
          this.engineer = engineer; // saved hero, w/ id if new
          // this.goBack(engineer);
        })
        .catch(error => this.error = error); // TODO: Display error message
    // this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
    //   .subscribe(
    //     response => {
    //       localStorage.setItem('id_token', response.json().id_token);
    //       this.router.navigate(['home']);
    //     },
    //     error => {
    //       alert(error.text());
    //       console.log(error.text());
    //     }
    //   );
  }

  signup(event: any) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}