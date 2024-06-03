import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../models/person';
import { DashboardService } from './dashboard.service';
import { CADS } from '../models/cads';
import { Product } from '../models/list';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  person: Person | undefined;
  cads: CADS | undefined;
  error: string | undefined;
  displayedColumns: string[] = ['productTitle', 'materialNumber', 'gtinNumber', 'batchNumber', 'stock', 'expirationDate'];
  dataSource = new MatTableDataSource<Product>();
  length = 0;
  pageSize = 20;
  pageSizeOptions = [15, 20, 30, 40];
  currentPageData: Product[] = [];

  constructor( private dashboardService: DashboardService ) {}

  ngOnInit() {
    this.dashboardService.getPerson().subscribe({
      next: (response: Person) => {
        this.person = response;
        this.error = undefined; // Clear any previous error
      },
      error: (error: string) => {
        this.error = error;
        console.error('Person data not loading!', error);
      }
    });

    this.dashboardService.getcads().subscribe({
      next: (response: CADS) => {
        this.cads = response;
        this.error = undefined; // Clear any previous error
      },
      error: (error: string) => {
        this.error = error;
        console.error('CADS data not loading!', error);
      }
    });

    this.dashboardService.getProducts().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.length = data.length;
        this.updatePageData(0, this.pageSize);
      },
      error: (error) => {
        console.error('List data not loading!', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.updatePageData(event.pageIndex, event.pageSize);
  }

  private updatePageData(pageIndex: number, pageSize: number): void {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.currentPageData = this.dataSource.data.slice(startIndex, endIndex);
  }
}

