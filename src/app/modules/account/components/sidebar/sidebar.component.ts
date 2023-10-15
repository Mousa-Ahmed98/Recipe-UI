import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from 'src/app/modules/account/services/nav.service';
import { NavItem } from './nav-item/nav-item';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls:[
    './sidebar.component.css'
  ]
})
export class SidebarComponent implements OnInit {
  navItems = navItems;
  selected = navItems[0];
  
  constructor(public navService: NavService) {}

  ngOnInit(): void {}
}
