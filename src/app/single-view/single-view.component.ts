import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  id!: string;
  loading = false;
  blog: any;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getBlog();
    });
  }
  getBlog() {
    this.apiService.getBlog(this.id).subscribe(response => {
      console.log(response);
      this.loading = false;
      this.blog = response;
    });
  }
}
