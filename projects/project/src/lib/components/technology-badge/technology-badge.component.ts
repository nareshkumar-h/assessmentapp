import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-technology-badge',
  templateUrl: './technology-badge.component.html',
  styleUrls: ['./technology-badge.component.css']
})
export class TechnologyBadgeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  style='flat-square';

  badgeUrlPrefix = "https://img.shields.io/badge/"
  badges=[
    { key: "", name:"JavaScript", badgeUrl: "https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript"},
  ];
  getBadge(key){
    return `![$key](${this.badgeUrlPrefix}-${key}?style=${this.style}&`;
  }
  /*
![Nodejs](https://img.shields.io/badge/-Nodejs-black?style=flat-square&logo=Node.js)
![Python](https://img.shields.io/badge/-Python-black?style=flat-square&logo=Python)
![React](https://img.shields.io/badge/-React-black?style=flat-square&logo=react)
![Java](https://img.shields.io/badge/-java-E34A86?style=flat-square&logo=java)
![C++](https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=bootstrap)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/-MongoDB-black?style=flat-square&logo=mongodb)
![Redis](https://img.shields.io/badge/-Redis-black?style=flat-square&logo=Redis)
![ElasticSearch](https://img.shields.io/badge/-ElasticSearch-005571?style=flat-square&logo=elasticsearch)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=graphql)
![Apollo GraphQL](https://img.shields.io/badge/-Apollo%20GraphQL-311C87?style=flat-square&logo=apollo-graphql)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql)
![MySQL](https://img.shields.io/badge/-MySQL-black?style=flat-square&logo=mysql)
![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku)
![Docker](https://img.shields.io/badge/-Docker-black?style=flat-square&logo=docker)
![DigitalOcean](https://img.shields.io/badge/-Digital%20Ocean-darkblue?style=flat-square&logo=digitalocean)
![Amazon AWS](https://img.shields.io/badge/Amazon%20AWS-232F3E?style=flat-square&logo=amazon-aws)
![Microsoft Azure](https://img.shields.io/badge/Microsoft%20Azure-232F7E?style=flat-square&logo=microsoft-azure)
  ]
*/
}
