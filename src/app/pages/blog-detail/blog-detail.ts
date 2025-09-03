import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location, NgOptimizedImage} from '@angular/common';
import {BlogService} from '../../services/blog-service';
import {Icon} from '../../components/icon/icon';

@Component({
  selector: 'app-blog-detail',
  imports: [
    NgOptimizedImage,
    Icon,
  ],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss'
})
export class BlogDetail implements OnInit, OnDestroy {
  constructor(
    private blogService: BlogService,
    private location: Location
  ) {

  }
  ngOnInit() {
    let rawBlog = sessionStorage.getItem('blog')
    if (rawBlog) {
      let sessionBlog = JSON.parse(rawBlog);
      this.blogService.setCurrentBlog(sessionBlog);
    }
  }
  getBlogTitle() {
    return this.blogService.currentBlogTitle;
  }
  getBlogSubtitle() {
    return this.blogService.currentBlogSubtitle;
  }
  getBlogImages() {
    return this.blogService.currentBlogImages;
  }
  getBlogParagraphs() {
    return this.blogService.currentBlogParagraphs;
  }
  getBlogUploadedAt() {
    return this.blogService.currentBlogUploadedAt;
  }
  getBlogAuthor() {
    return this.blogService.currentBlogAuthor;
  }
  goBack() {
    this.location.back();
  }
  ngOnDestroy() {
    sessionStorage.clear();
  }
}
