import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {BlogService} from '../../services/blog-service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-main-blog',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './main-blog.html',
  styleUrl: './main-blog.scss'
})
export class MainBlog {
  @Input() blog: any = {};
  constructor(
    private blogService: BlogService
  ) {
  }
  getBlog() {
    return this.blog;
  }
  getMainImage() {
    return this.blog.mainImage;
  }
  getTitle() {
    return this.blog.title;
  }
  getSubTitle() {
    return this.blog.subtitle;
  }
  getAuthor() {
    return this.blog.author;
  }
  selectBlog(blog: any) {
    sessionStorage.setItem('blog', JSON.stringify(blog));
    this.blogService.setCurrentBlog(blog);
  }
  goToBlog(blog: any) {
    return `/blog/${blog.id.slice(0, 10)}`;
  }
}
