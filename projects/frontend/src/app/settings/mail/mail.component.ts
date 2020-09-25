import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadMail();
  }

  mail:any;

  loadMail(){
    this.mail =  { mail:"admin@gmail.com", password:""};
  }

  update(){

  }
  cancel(){
    window.history.back();
  }
}
