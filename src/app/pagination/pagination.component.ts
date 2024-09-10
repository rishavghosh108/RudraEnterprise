import { Component, OnInit, Output, Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() totalPages: any;
  // @Output() currentPage:number=1;
  // @Output() perPage: number=10;

  currentPage:any;
  perPage:number=10;

  pages: any;

  constructor(){
  }


  ngOnInit(): void {
    const total=Math.ceil(this.totalPages/this.perPage)
    this.pages=Array.from({ length: total }, (_, i) => i + 1);
  }

  PageChange(page: number){
    this.currentPage=page;
  }

  isDropdownOpen:boolean=false;

  toggleDropdown(){
    this.isDropdownOpen=!this.isDropdownOpen;
  }

  onChangePageSize(stranth: number){
    this.currentPage=1
    this.perPage=stranth;
    // this.cal()
  }

}