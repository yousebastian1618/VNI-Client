import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {BlogService} from '../../services/blog-service';
import {Buttons} from '../buttons/buttons';
import {ADMIN_MANAGE_BLOG_BUTTONS} from '../../objects/buttons';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-sub-blog',
  imports: [
    NgOptimizedImage,
    RouterLink,
    Buttons
  ],
  templateUrl: './sub-blog.html',
  styleUrl: './sub-blog.scss'
})
export class SubBlog {
  @Input() blog: any = {};
  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private router: Router
  ){
  }
  getBlog() {
    return this.blog;
  }
  getMainImage() {
    return this.blogService.getBlogImageSrc(this.blog.paragraphs[0].image);
  }
  getTitle() {
    return this.blog.title;
  }
  getSubTitle() {
    return this.blog.subtitle;
  }
  selectBlog(blog: any) {
    if (this.blogService.selectingBlogs) {
      this.blogService.toggleSelectBlogs(blog);
      return;
    }
    sessionStorage.setItem('blog', JSON.stringify(blog));
    this.blogService.setCurrentBlog(blog);
  }
  getCurrentRoute() {
    return this.router.url;
  }
  isAdmin() {
    return this.userService.isAdmin();
  }
  showAdminCrudBlog() {
    return this.isAdmin() && this.getCurrentRoute() === '/blogs';
  }
  goToBlog(blog: any) {
    if (this.blogService.selectingBlogs || this.blogService.sortingBlogs) return;
    return `/blog/${blog.id.slice(0, 10)}`;
  }
  getAdminManageBlogButtons() {
    return ADMIN_MANAGE_BLOG_BUTTONS;
  }
  isSortingBlogs() {
    return this.blogService.sortingBlogs;
  }
  toggleSelectClass() {
    if (this.blogService.selectingBlogs) {
      if (this.blogService.isBlogSelected(this.blog)) {
        return '';
      }
      return 'white-opacity';
    }
    if (this.blogService.sortingBlogs) {

    }
    return '';
  }
}
