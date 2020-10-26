import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'app/services/resource.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  loading = false;
  blogData: any;
  page = 1;

  constructor(private apiService: ApiService, private resource: ResourceService) { }

  ngOnInit(): void {
    this.getAllBlog();
  }
  getAllBlog() {
    if (!this.resource.blogs) {
      this.loading = true;
      this.apiService.getBlogs().subscribe(response => {
        this.loading = false;
        this.blogData = response;
        this.resource.blogs = response;
      });
    } else {
      this.blogData = this.resource.blogs;
    }
  }


  next() {
    this.page ++;
    this.apiService.getPageBlog(this.page).subscribe(data => {
      if (data) {
        this.blogData = data;
      }
    });
  }
  previous() {
    if (this.page > 1) {
      this.page --;
      this.apiService.getPageBlog(this.page).subscribe(data => {
        if (data) {
          this.blogData = data;
        }
      });
    }
  }

  combineSlug(slug: string, id: string) {
    return  id;
  }
}
