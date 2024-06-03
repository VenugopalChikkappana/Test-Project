import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrl: './custom-pagination.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CustomPaginationComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageSizeOptions!: number[];

  @Output() page = new EventEmitter<PageEvent>();

  pageIndex = 0;

  get totalPages(): number {
    return Math.ceil(this.length / this.pageSize);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.emitPageEvent();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageIndex = 0;
    this.emitPageEvent();
  }

  private emitPageEvent(): void {
    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
    });
  }
}
