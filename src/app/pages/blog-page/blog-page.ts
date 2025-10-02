import {Component, Input} from '@angular/core';
import {MainBlog} from '../../components/main-blog/main-blog';
import {SubBlog} from '../../components/sub-blog/sub-blog';
import {Icon} from '../../components/icon/icon';
import {RouterLink} from '@angular/router';
import {UserService} from '../../services/user-service';

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
  @Input() blogs: any[] = [];

  constructor(
    private userService: UserService
  ) {
  }
  getMainBlog() {
    return this.blogs[0];
  }
  getSubBlogs() {
    return this.blogs.slice(1, 4);
  }
  isAdmin() {
    return this.userService.isAdmin();
  }
}
