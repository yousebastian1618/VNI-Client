import {Component, Input} from '@angular/core';
import {MainBlog} from '../../components/main-blog/main-blog';
import {SubBlog} from '../../components/sub-blog/sub-blog';
import {Icon} from '../../components/icon/icon';
import {RouterLink} from '@angular/router';
import {BlogService} from '../../services/blog-service';

@Component({
  selector: 'app-blog-page',
  imports: [
    MainBlog,
    SubBlog,
    Icon,
    RouterLink
  ],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss'
})
export class BlogPage {
  @Input() mainBlog: any = {};
  @Input() subBlogs: any[] = [];

  constructor(
  ) {
  }
  getMainBlog() {
    return this.mainBlog;
  }
  getSubBlogs() {
    return this.subBlogs;
  }
}
