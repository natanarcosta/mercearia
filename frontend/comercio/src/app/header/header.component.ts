import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('search') searchForm!: NgForm;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSearch(form: NgForm){
    let searchTerms = form.value.search;
    this.searchForm.reset();
    this.router.navigate(['boletos'], {queryParams: { searched: searchTerms}})
  }
}
