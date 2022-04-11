import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Usuários',
        icon:'pi pi-fw pi-user',
        routerLink: ['/users'],
      },
      {
        label:'Jobs',
        icon:'pi pi-fw pi-flag-fill',
        routerLink: ['/jobs'],
      }
  ];

  }

}
