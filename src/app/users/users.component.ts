import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { ToasterService } from 'angular2-toaster/src/toaster.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = ["id", "firstName", "lastName"];

  data: any[] = [
    {
      id: 1,
      firstName: 'Tom',
      lastName: 'Jones'
    },
    {
      id: 2,
      firstName: 'Donald',
      lastName: 'Trump'
    }
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(protected toasterService: ToasterService) { }

  ngOnInit() {
    // NOTE: Normally you'd feed this from an Observable subscription, AFAIK it's even possible to plug in 
    // an Observable directly into dataSource.data
    this.dataSource.data = this.data;

    this.toasterService.pop('success', 'Hey hey');
  }

  /**
   * Quick filtering for the grid
   * @param filterValue
   */
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
